import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatNaira,
  calculateSubscriptionCost,
  calculateProratedUpgrade,
  calculateBandwidthEstimate,
  validateStationConfig,
  RADIO_PLANS
} from './billing';

test('formatNaira properly formats amounts with symbol and comma grouping', () => {
  assert.equal(formatNaira(7500), '₦7,500');
  assert.equal(formatNaira(13750), '₦13,750');
  assert.equal(formatNaira(25000), '₦25,000');
  assert.equal(formatNaira(45000), '₦45,000');
  assert.equal(formatNaira(0), '₦0');
});

test('RADIO_PLANS has exact prices requested by user', () => {
  const starter = RADIO_PLANS.find(p => p.id === 'starter');
  const standard = RADIO_PLANS.find(p => p.id === 'standard');
  const premium = RADIO_PLANS.find(p => p.id === 'premium');
  const enterprise = RADIO_PLANS.find(p => p.id === 'enterprise');

  assert.ok(starter, 'Starter plan should exist');
  assert.equal(starter?.monthlyPriceNaira, 13750); // Starter pack is ₦13,750
  assert.equal(starter?.annualPriceNaira, 165000); // ₦165,000 for 12 months (no discount)

  assert.ok(standard, 'Standard plan should exist');
  assert.equal(standard?.monthlyPriceNaira, 19500);

  assert.ok(premium, 'Premium plan should exist');
  assert.equal(premium?.monthlyPriceNaira, 25000); // ₦25,000

  assert.ok(enterprise, 'Enterprise plan should exist');
  assert.equal(enterprise?.monthlyPriceNaira, 45000);
});

test('calculateSubscriptionCost calculates monthly starter pack accurately', () => {
  const result = calculateSubscriptionCost('starter', 'monthly');
  assert.equal(result.total, 13750);
  assert.equal(result.discount, 0);
  assert.equal(result.plan.id, 'starter');
});

test('calculateSubscriptionCost calculates annual billing without discount (165,000 for Starter)', () => {
  const result = calculateSubscriptionCost('starter', 'annual');
  // Monthly 13,750 * 12 = 165,000 (no discount)
  assert.equal(result.total, 165000);
  assert.equal(result.discount, 0);
  assert.equal(result.savingsNaira, 0);
});

test('calculateSubscriptionCost handles add-ons properly', () => {
  const result = calculateSubscriptionCost('premium', 'monthly', {
    extraStorageGb: 20, // 20 * 250 = 5000
    dedicatedIp: true // 5000
  });
  // Premium base 25000 + 5000 + 5000 = 35000
  assert.equal(result.total, 35000);
  assert.equal(result.addonsCost, 10000);
});

test('calculateProratedUpgrade calculates proper upgrade difference', () => {
  // Upgrade from Starter (13750) to Standard (19500) with 15 days remaining (half month)
  const diff = calculateProratedUpgrade('starter', 'standard', 15);
  assert.equal(diff.currentMonthly, 13750);
  assert.equal(diff.newMonthly, 19500);
  assert.equal(diff.difference, 5750);
  assert.equal(diff.proratedDue, 2875); // 5750 * 15 / 30
});

test('calculateBandwidthEstimate generates valid bandwidth calculations', () => {
  // 128 kbps, 100 listeners, 24 hours
  const estimate = calculateBandwidthEstimate(128, 100, 24);
  assert.ok(estimate.hourlyGb > 0);
  assert.ok(estimate.dailyGb > 0);
  assert.ok(estimate.monthlyGb > 0);
});

test('validateStationConfig validates station requirements correctly', () => {
  const invalid = validateStationConfig({
    stationName: 'A',
    genre: '',
    adminPassword: '123'
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.stationName);
  assert.ok(invalid.errors.genre);
  assert.ok(invalid.errors.adminPassword);

  const valid = validateStationConfig({
    stationName: 'Lagos City FM',
    genre: 'Afrobeats & Urban Talk',
    adminPassword: 'securePassword99!'
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
