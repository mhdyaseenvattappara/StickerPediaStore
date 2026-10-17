'use client';

import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#000000] text-[#F4F5F6] min-h-screen flex items-center justify-center p-4 font-sans antialiased">
        <div className="w-full max-w-md p-8 rounded-[40px] sm:rounded-[48px] bg-[#141619] border border-[#26282E] text-center shadow-2xl">
          <div className="mx-auto w-14 h-14 rounded-[28px] bg-[#1E2227] border border-[#26282E] flex items-center justify-center text-[#E2F832] mb-5">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-sans text-white mb-2">
            Critical Factory RIP Halt
          </h2>
          <p className="text-xs font-mono text-[#8E929B] mb-6">
            A root-level layout exception occurred. Please reset the session.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-full bg-[#E2F832] text-black font-bold text-xs font-sans hover:bg-[#D2E824] transition-all"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
