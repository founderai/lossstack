"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, PlusCircle, Trash2 } from "lucide-react";
import InternalCTA from "@/components/seo/InternalCTA";
import Breadcrumb from "@/components/seo/Breadcrumb";

interface LineItem {
  id: number;
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
}

export default function InsuranceEstimateCalculator() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "Roofing — arch comp shingles", quantity: "28", unit: "SQ", unitPrice: "220" },
    { id: 2, description: "Remove roofing — comp shingles", quantity: "28", unit: "SQ", unitPrice: "75" },
  ]);
  const [overhead, setOverhead] = useState("10");
  const [profit, setProfit] = useState("10");
  const nextId = Math.max(0, ...items.map((i) => i.id)) + 1;

  function addItem() {
    setItems([...items, { id: nextId, description: "", quantity: "", unit: "SQ", unitPrice: "" }]);
  }

  function removeItem(id: number) {
    setItems(items.filter((i) => i.id !== id));
  }

  function updateItem(id: number, field: keyof LineItem, value: string) {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  const oh = subtotal * ((parseFloat(overhead) || 0) / 100);
  const profit_ = (subtotal + oh) * ((parseFloat(profit) || 0) / 100);
  const total = subtotal + oh + profit_;

  return (
    <main>
      <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Free Tools", href: "/claims-library" }, { name: "Insurance Estimate Calculator" }]} />
          <div className="mt-6 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">
              <Calculator className="w-3.5 h-3.5" /> Free Tool
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Insurance Estimate Calculator</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Build a line-item insurance estimate with automatic overhead & profit calculation. Free for roofers, contractors, and adjusters.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Line items */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-4">Line items</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold w-24">Qty</th>
                    <th className="text-left px-4 py-3 font-semibold w-20">Unit</th>
                    <th className="text-left px-4 py-3 font-semibold w-28">Unit Price</th>
                    <th className="text-left px-4 py-3 font-semibold w-28">Total</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => {
                    const rowTotal = (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);
                    return (
                      <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-3 py-2">
                          <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Line item description" className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                        </td>
                        <td className="px-3 py-2">
                          <input value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                        </td>
                        <td className="px-3 py-2">
                          <input value={item.unit} onChange={(e) => updateItem(item.id, "unit", e.target.value)} placeholder="SQ" className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                        </td>
                        <td className="px-3 py-2">
                          <input value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)} type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                        </td>
                        <td className="px-3 py-2 font-semibold text-teal-700">${rowTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2">
                          <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button onClick={addItem} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1e3c] border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <PlusCircle className="w-4 h-4" /> Add line item
            </button>
          </div>

          {/* O&P */}
          <div className="bg-[#f5f0e8] border border-slate-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-4">Overhead & Profit</h2>
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-sm">
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">Overhead %</label>
                <input type="number" value={overhead} onChange={(e) => setOverhead(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1e3c] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">Profit %</label>
                <input type="number" value={profit} onChange={(e) => setProfit(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1e3c] bg-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 max-w-sm">
              {[
                { label: "Subtotal", value: subtotal },
                { label: `Overhead (${overhead}%)`, value: oh },
                { label: `Profit (${profit}%)`, value: profit_ },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-semibold text-[#0f1e3c]">${row.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div className="flex justify-between text-base font-bold border-t border-slate-300 pt-2 mt-1">
                <span className="text-[#0f1e3c]">Total Estimate</span>
                <span className="text-teal-700 text-lg">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <InternalCTA app="appraisly" context="Compare this estimate against the insurance company's Xactimate scope line by line — find what's missing and supplement with confidence." />
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-base font-bold text-[#0f1e3c] mb-4">More free tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
              { label: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
              { label: "Water Mitigation Calculator", href: "/tools/water-mitigation-calculator" },
              { label: "Claims Library →", href: "/claims-library" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#0f1e3c] bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
