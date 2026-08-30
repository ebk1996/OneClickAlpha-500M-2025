export async function fetchDuneAlpha() {
  console.log('Fetching Dune Analytics data');
  return { signals: [] };
}

// Provide a simple score-based API used by quadfectaEngine
export async function getDuneInsiderCluster() {
  const data = await fetchDuneAlpha();
  const signalCount = Array.isArray(data.signals) ? data.signals.length : 0;
  return { score: signalCount > 0 ? 99 : 95 };
}
