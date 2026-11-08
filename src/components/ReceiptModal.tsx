import React from 'react';
import { X, Printer, CheckCircle2, Radio } from 'lucide-react';
import { Invoice } from '../types/radio';
import { formatNaira } from '../utils/billing';

interface ReceiptModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          aria-label="Close invoice receipt"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Invoice Header */}
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
                <Radio className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900">Radio<span className="text-orange-500">RDX</span></span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-800 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Paid & Active</span>
            </span>
          </div>

          <div className="mt-4 flex justify-between items-end text-xs text-slate-500">
            <div>
              <div className="font-bold text-slate-800">RadioRDX Cloud Technologies Ltd.</div>
              <div>Victoria Island, Lagos, Nigeria</div>
              <div className="font-mono">RC: 1984210 · TIN: 24890118-0001</div>
            </div>
            <div className="text-right font-mono">
              <div className="text-slate-400">Invoice:</div>
              <div className="font-bold text-slate-800">{invoice.invoiceNumber}</div>
              <div>{invoice.date}</div>
            </div>
          </div>
        </div>

        {/* Station & Billed-To Info */}
        <div className="py-4 border-b border-slate-100 text-xs">
          <div className="text-slate-400 uppercase tracking-wider font-semibold mb-1">
            Billed To Broadcaster:
          </div>
          <div className="font-bold text-slate-900 text-sm">{invoice.stationName}</div>
          <div className="text-slate-600">Client Account ID: #RDX-NGR-8842</div>
          <div className="text-slate-500 font-mono">Payment Channel: {invoice.paymentMethod || 'Paystack (Cards / Bank / USSD)'}</div>
          {invoice.receiptNumber && (
            <div className="mt-1.5 text-xs font-mono text-orange-800 bg-orange-50 px-2.5 py-1 rounded-md inline-block border border-orange-200">
              Paystack Ref: <span className="font-bold select-all text-orange-950">{invoice.receiptNumber}</span>
            </div>
          )}
        </div>

        {/* Invoice Items Table */}
        <div className="py-4 border-b border-slate-100">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 text-left uppercase tracking-wider border-b border-slate-100 pb-2">
                <th className="font-semibold py-1">Service Item</th>
                <th className="font-semibold py-1 text-center">Cycle</th>
                <th className="font-semibold py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-2.5">
                  <div className="font-bold text-slate-800">{invoice.planName} Plan Radio Hosting</div>
                  <div className="text-slate-400 text-[11px]">Icecast / SHOUTcast + AutoDJ NVMe Cloud Storage</div>
                </td>
                <td className="py-2.5 text-center text-slate-600 capitalize">
                  {invoice.billingCycle}
                </td>
                <td className="py-2.5 text-right font-mono font-bold text-slate-900 tabular-nums">
                  {formatNaira(invoice.amountNaira)}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-slate-500">Unmetered Bandwidth & SSL Link</td>
                <td className="py-2 text-center text-slate-400">-</td>
                <td className="py-2 text-right font-mono text-orange-600 font-semibold">Free (₦0)</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">{formatNaira(invoice.amountNaira)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>VAT / Tax (7.5% Included):</span>
              <span className="font-mono tabular-nums">{formatNaira(Math.round(invoice.amountNaira * 0.075))}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
              <span>Total Paid:</span>
              <span className="font-mono text-orange-600 text-base tabular-nums">
                {formatNaira(invoice.amountNaira)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Notes & Print */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 leading-tight">
            Next renewal due on <span className="font-semibold text-slate-700">{invoice.dueDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
