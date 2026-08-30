import { QuadfectaEngine } from '../lib/quadfectaEngine';

const engine = new QuadfectaEngine();

async function main() {
  console.log('Quadfecta Sniper Bot Started');
  const alpha = await engine.aggregateAlpha();
  console.log('Alpha aggregated:', alpha);
}

main();
