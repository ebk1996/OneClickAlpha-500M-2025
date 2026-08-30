'use client';

import { AlphaButton } from '@/components/AlphaButton';
import { ScaleButton } from '@/components/ScaleButton';
import { ProfitCard } from '@/components/ProfitCard';
import { QuadfectaPanel } from '@/components/QuadfectaPanel';
import { AdvancedOrderPanel } from '@/components/AdvancedOrderPanel';
import { MarketDataPanel } from '@/components/MarketDataPanel';
import { PortfolioAnalytics } from '@/components/PortfolioAnalytics';
import { SecurityPanel } from '@/components/SecurityPanel';
import { TradingInterface } from '@/components/TradingInterface';
import { NotificationCenter } from '@/components/NotificationCenter';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { StakingPanel } from '@/components/StakingPanel';
import { ApiManagementPanel } from '@/components/ApiManagementPanel';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            OneClickAlpha Pro
          </h1>
          <p className="text-2xl mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">
            The Ultimate Trading Platform - Better than Kraken, Binance & Coinbase
          </p>
          <p className="text-lg mt-2 text-gray-400">Advanced Features • Institutional Grade • Maximum Security</p>
        </div>

        {/* Performance Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <ProfitCard title="Live PnL" value="+2,847%" color="text-green-400" />
          <ProfitCard title="Win Rate" value="99.7%" color="text-blue-400" />
          <ProfitCard title="Total Volume" value="$1.2B" color="text-purple-400" />
          <ProfitCard title="Active Users" value="500K+" color="text-yellow-400" />
        </div>

        {/* Quick Trade Buttons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <ScaleButton amount={10_000_000} label="$10M Snipe" strategy="whale-sniper-v2" />
          <ScaleButton amount={100_000_000} label="$100M Scale" strategy="quadfecta" />
          <ScaleButton amount={500_000_000} label="$500M God" strategy="quadfecta" />
        </div>

        {/* Notifications */}
        <NotificationCenter />

        {/* Main Trading Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TradingInterface />
          <AdvancedOrderPanel />
        </div>

        {/* Data & Analytics */}
        <MarketDataPanel />
        <PortfolioAnalytics />
        
        {/* Leaderboard & Social Trading */}
        <LeaderboardPanel />

        {/* Staking & Yield */}
        <StakingPanel />
        
        {/* Original Quadfecta Panel */}
        <QuadfectaPanel />

        {/* Security Features */}
        <SecurityPanel />

        {/* API Management */}
        <ApiManagementPanel />

        {/* Feature Highlights */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-700">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Why OneClickAlpha Pro is Superior
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Sub-millisecond execution with MEV protection and smart order routing across 50+ exchanges</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Maximum Security</h3>
              <p className="text-gray-300">Military-grade encryption, 2FA, withdrawal whitelist, and insurance fund protection</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">AI-Powered Intelligence</h3>
              <p className="text-gray-300">Quadfecta™ engine aggregates signals from Nansen, Dune, DeBank & Arkham for 99.7% accuracy</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Advanced Analytics</h3>
              <p className="text-gray-300">Real-time portfolio tracking, P&L analytics, and institutional-grade reporting tools</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">Pro Trading Tools</h3>
              <p className="text-gray-300">Spot, Margin, Futures trading with up to 100x leverage and advanced order types</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Multi-Chain Support</h3>
              <p className="text-gray-300">Trade on Ethereum, Solana, BSC, Polygon, Avalanche and 20+ other chains seamlessly</p>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Passive Income</h3>
              <p className="text-gray-300">Earn up to 127% APY through staking and yield farming with flexible or fixed-term options</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Social Trading</h3>
              <p className="text-gray-300">Copy top traders automatically and learn from the best performers on the platform</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-lg">
              <div className="text-4xl mb-3">🔑</div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">Developer Friendly</h3>
              <p className="text-gray-300">Comprehensive REST & WebSocket APIs with detailed documentation for seamless integration</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Platform Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 text-left text-gray-400">Feature</th>
                  <th className="py-4 text-center text-green-400 font-bold">OneClickAlpha Pro</th>
                  <th className="py-4 text-center text-gray-400">Binance</th>
                  <th className="py-4 text-center text-gray-400">Kraken</th>
                  <th className="py-4 text-center text-gray-400">Coinbase</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Advanced Order Types</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ 5 Types</td>
                  <td className="py-3 text-center text-yellow-400">✓ 3 Types</td>
                  <td className="py-3 text-center text-yellow-400">✓ 4 Types</td>
                  <td className="py-3 text-center text-red-400">✗ 2 Types</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Max Leverage (Futures)</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ 100x</td>
                  <td className="py-3 text-center text-yellow-400">✓ 125x</td>
                  <td className="py-3 text-center text-yellow-400">✓ 50x</td>
                  <td className="py-3 text-center text-red-400">✗ N/A</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">AI-Powered Signals</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ Quadfecta™</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">MEV Protection</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ Jito Bundle</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Copy Trading</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ Leaderboard</td>
                  <td className="py-3 text-center text-yellow-400">✓ Limited</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                  <td className="py-3 text-center text-red-400">✗</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Staking APY</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ Up to 127%</td>
                  <td className="py-3 text-center text-yellow-400">✓ Up to 20%</td>
                  <td className="py-3 text-center text-yellow-400">✓ Up to 15%</td>
                  <td className="py-3 text-center text-yellow-400">✓ Up to 5%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Real-time Notifications</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ Multi-channel</td>
                  <td className="py-3 text-center text-yellow-400">✓ Email only</td>
                  <td className="py-3 text-center text-yellow-400">✓ Email only</td>
                  <td className="py-3 text-center text-yellow-400">✓ Limited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 text-white">Multi-chain Support</td>
                  <td className="py-3 text-center text-green-400 font-bold">✓ 20+ Chains</td>
                  <td className="py-3 text-center text-yellow-400">✓ 10+ Chains</td>
                  <td className="py-3 text-center text-yellow-400">✓ 8 Chains</td>
                  <td className="py-3 text-center text-yellow-400">✓ 5 Chains</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 OneClickAlpha Pro. Built for professional traders.</p>
          <p className="mt-2">⚠️ Trading cryptocurrencies involves risk. Only trade with funds you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
}