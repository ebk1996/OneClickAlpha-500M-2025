'use client';
import { useEffect, useState } from 'react';
import { getQuadfectaSignal } from '@/lib/quadfectaEngine';

export function QuadfectaPanel() {
  const [status, setStatus] = useState({ token: '', confidence: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const signal = await getQuadfectaSignal();
      if (signal) setStatus({ token: signal.token, confidence: signal.confidence });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 p-6 bg-gray-900 rounded-xl">
      <h3 className="text-2xl font-bold text-green-400">Quadfecta™ Live</h3>
      <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
        <div>Whale: 96%</div><div>Nansen: 98%</div><div>Dune: 99%</div><div>DeBank: +1240%</div>
      </div>
      {status.confidence > 99 && <p className="mt-4 text-yellow-400 font-bold">AUTO-$500M: {status.token}</p>}
    </div>
  );
}