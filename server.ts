import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_live_778aef6c70eedce9448aad89b917f0ea668db4b5';
const PAYSTACK_PUBLIC_KEY = process.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_d29362f1048547f4bc49e7082922d8143c8f8ec5';

// API route to provide safe public configuration
app.get('/api/paystack/config', (_req, res) => {
  res.json({
    publicKey: PAYSTACK_PUBLIC_KEY,
  });
});

// API route to initialize transaction securely on backend
app.post('/api/paystack/initialize', async (req, res) => {
  try {
    const { email, amountNaira, stationName, planName, cycle } = req.body;

    if (!email || !amountNaira) {
      return res.status(400).json({ status: false, message: 'Email and amount are required' });
    }

    const amountInKobo = Math.round(Number(amountNaira) * 100);
    const reference = `RDX-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: String(email).trim(),
        amount: amountInKobo,
        currency: 'NGN',
        reference,
        channels: ['card'],
        metadata: {
          station_name: stationName,
          plan_name: planName,
          billing_cycle: cycle,
        },
      }),
    });

    const data = await paystackRes.json();
    return res.status(paystackRes.status).json(data);
  } catch (err: any) {
    console.error('Paystack initialization error:', err);
    return res.status(500).json({ status: false, message: err.message || 'Internal server error' });
  }
});

// API route to verify transaction via live secret key
app.get('/api/paystack/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) {
      return res.status(400).json({ status: false, message: 'Reference is required' });
    }

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await paystackRes.json();
    return res.status(paystackRes.status).json(data);
  } catch (err: any) {
    console.error('Paystack verification error:', err);
    return res.status(500).json({ status: false, message: err.message || 'Verification failed' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
