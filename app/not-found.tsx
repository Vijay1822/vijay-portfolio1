import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center border border-slate-200/80 shadow-lg">
        <span className="text-4xl font-extrabold text-blue-600 block mb-2 font-mono">404</span>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Page Not Found</h1>
        <p className="text-xs text-slate-600 mb-6">
          The requested section or page does not exist. Let&apos;s head back to the main portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
