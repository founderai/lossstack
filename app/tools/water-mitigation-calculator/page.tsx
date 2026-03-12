"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, PlusCircle, Trash2 } from "lucide-react";
import InternalCTA from "@/components/seo/InternalCTA";
import Breadcrumb from "@/components/seo/Breadcrumb";

interface Room {
  id: number;
  name: string;
  sqft: string;
  category: "1" | "2" | "3";
  daysToDocument: string;
}

export default function WaterMitigationCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: "Living Room", sqft: "300", category: "2", daysToDocument: "4" },
    { id: 2, name: "Hallway", sqft: "80", category: "2", daysToDocument: "3" },
  ]);
  const nextId = Math.max(0, ...rooms.map((r) => r.id)) + 1;

  const airMoverRate = 40;
  const dehumRate = 110;
  const monitoringRate = 65;

  function addRoom() {
    setRooms([...rooms, { id: nextId, name: "", sqft: "", category: "2", daysToDocument: "4" }]);
  }

  function removeRoom(id: number) {
    setRooms(rooms.filter((r) => r.id !== id));
  }

  function updateRoom(id: number, field: keyof Room, value: string) {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, [field]: value as Room[keyof Room] } : r)));
  }

  const results = rooms.map((room) => {
    const sf = parseFloat(room.sqft) || 0;
    const days = parseFloat(room.daysToDocument) || 0;
    const airMovers = Math.ceil(sf / 50);
    const dehums = Math.ceil(sf / 150);
    const airMoverCost = airMovers * airMoverRate * days;
    const dehumCost = dehums * dehumRate * days;
    const monitoringCost = days * monitoringRate;
    const roomTotal = airMoverCost + dehumCost + monitoringCost;
    return { ...room, airMovers, dehums, airMoverCost, dehumCost, monitoringCost, roomTotal };
  });

  const grandTotal = results.reduce((s, r) => s + r.roomTotal, 0);
  const totalAirMovers = results.reduce((s, r) => s + r.airMovers, 0);
  const totalDehums = results.reduce((s, r) => s + r.dehums, 0);

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <main>
      <section className="bg-[#0f1e3c] text-white px-6 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ name: "LossStack", href: "/" }, { name: "Free Tools", href: "/claims-library" }, { name: "Water Mitigation Calculator" }]} />
          <div className="mt-6 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/70">
              <Calculator className="w-3.5 h-3.5" /> Free Tool
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Water Mitigation Equipment Calculator</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Calculate IICRC-standard air mover and dehumidifier placement counts and daily equipment costs for water mitigation jobs.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f5f0e8] border border-slate-100 rounded-2xl p-4 mb-6 text-sm text-slate-600">
            <strong className="text-[#0f1e3c]">Calculation basis:</strong> Air movers at 1 per 50 SF, dehumidifiers at 1 per 150 SF (IICRC S500 standard). Daily rates: air movers ${airMoverRate}/day, LGR dehumidifiers ${dehumRate}/day, monitoring visits ${monitoringRate}/day.
          </div>

          <h2 className="text-lg font-bold text-[#0f1e3c] mb-4">Affected rooms</h2>
          <div className="flex flex-col gap-4 mb-4">
            {rooms.map((room) => (
              <div key={room.id} className="bg-[#f5f0e8] border border-slate-200 rounded-xl p-4 grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Room name</label>
                  <input value={room.name} onChange={(e) => updateRoom(room.id, "name", e.target.value)} placeholder="e.g. Kitchen" className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Square feet</label>
                  <input type="number" value={room.sqft} onChange={(e) => updateRoom(room.id, "sqft", e.target.value)} placeholder="200" className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Water category</label>
                  <select value={room.category} onChange={(e) => updateRoom(room.id, "category", e.target.value as Room["category"])} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]">
                    <option value="1">Category 1 (Clean)</option>
                    <option value="2">Category 2 (Gray)</option>
                    <option value="3">Category 3 (Black)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Drying days</label>
                  <input type="number" value={room.daysToDocument} onChange={(e) => updateRoom(room.id, "daysToDocument", e.target.value)} placeholder="4" className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0f1e3c]" />
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={() => removeRoom(room.id)} className="text-red-400 hover:text-red-600 transition-colors p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addRoom} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1e3c] border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors mb-8">
            <PlusCircle className="w-4 h-4" /> Add room
          </button>

          {/* Results */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[#0f1e3c] mb-5">Equipment summary</h2>
            <div className="overflow-x-auto rounded-xl border border-teal-200 mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1e3c] text-white">
                    <th className="text-left px-4 py-2.5">Room</th>
                    <th className="text-left px-4 py-2.5">Air Movers</th>
                    <th className="text-left px-4 py-2.5">Dehums</th>
                    <th className="text-left px-4 py-2.5">Days</th>
                    <th className="text-left px-4 py-2.5">Room Total</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-teal-50/50"}>
                      <td className="px-4 py-2.5 font-medium text-[#0f1e3c]">{r.name || `Room ${r.id}`}</td>
                      <td className="px-4 py-2.5 text-slate-600">{r.airMovers}</td>
                      <td className="px-4 py-2.5 text-slate-600">{r.dehums}</td>
                      <td className="px-4 py-2.5 text-slate-600">{r.daysToDocument}</td>
                      <td className="px-4 py-2.5 font-semibold text-teal-700">{fmt(r.roomTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Air Movers", value: totalAirMovers.toString() },
                { label: "Total Dehumidifiers", value: totalDehums.toString() },
                { label: "Estimated Equipment Total", value: fmt(grandTotal) },
              ].map((item) => (
                <div key={item.label} className="text-center bg-white rounded-xl border border-teal-200 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-[#0f1e3c]">{item.value}</div>
                </div>
              ))}
            </div>
            <p className="text-teal-700 text-xs mt-4">* This estimate covers equipment and monitoring only. Demo, extraction, antimicrobial, and reconstruction are separate line items.</p>
          </div>

          <InternalCTA app="restorecam" context="RestoreCam captures daily equipment placement photos, moisture readings, and drying logs — the documentation you need to defend every line item on your mitigation invoice." />
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-base font-bold text-[#0f1e3c] mb-4">More free tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Roof Pitch Calculator", href: "/tools/roof-pitch-calculator" },
              { label: "Roof Waste Calculator", href: "/tools/roof-waste-calculator" },
              { label: "Insurance Estimate Calculator", href: "/tools/insurance-estimate-calculator" },
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
