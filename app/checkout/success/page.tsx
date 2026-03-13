import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Footer from "@/components/sections/Footer";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f1e3c] mb-3">You&apos;re in.</h1>
          <p className="text-slate-500 text-base mb-8">
            Your LossStack bundle subscription is confirmed. Check your email for your receipt and next steps from each app.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1a3060] transition-colors text-sm"
          >
            Back to LossStack
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
