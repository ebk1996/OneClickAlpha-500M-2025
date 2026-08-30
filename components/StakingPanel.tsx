'use client';
import { useState } from 'react';

interface StakingPool {
  id: string;
  token: string;
  apy: number;
  totalStaked: number;
  userStaked: number;
  rewards: number;
  lockPeriod: string;
  status: 'active' | 'full' | 'ended';
}

export function StakingPanel() {
  const [pools] = useState<StakingPool[]>([
    { id: '1', token: 'ETH', apy: 5.2, totalStaked: 125000000, userStaked: 5.5, rewards: 0.0234, lockPeriod: 'Flexible', status: 'active' },
    { id: '2', token: 'AIFLOW', apy: 42.8, totalStaked: 45000000, userStaked: 12500, rewards: 1847.3, lockPeriod: '30 days', status: 'active' },
    { id: '3', token: 'SOL', apy: 7.8, totalStaked: 89000000, userStaked: 125, rewards: 2.34, lockPeriod: 'Flexible', status: 'active' },
    { id: '4', token: 'USDC', apy: 12.5, totalStaked: 230000000, userStaked: 50000, rewards: 1245.67, lockPeriod: '90 days', status: 'active' },
    { id: '5', token: 'BTC', apy: 3.8, totalStaked: 310000000, userStaked: 0.125, rewards: 0.00123, lockPeriod: 'Flexible', status: 'active' },
  ]);

  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [action, setAction] = useState<'stake' | 'unstake'>('stake');

  const handleStake = (poolId: string) => {
    setSelectedPool(poolId);
    setAction('stake');
  };

  const handleUnstake = (poolId: string) => {
    setSelectedPool(poolId);
    setAction('unstake');
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
    return `$${value.toFixed(2)}`;
  };

  const totalStaked = pools.reduce((sum, pool) => sum + pool.userStaked * 1000, 0); // Mock calculation
  const totalRewards = pools.reduce((sum, pool) => sum + pool.rewards * 100, 0); // Mock calculation

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-emerald-400 mb-6">🌱 Staking & Yield Farming</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Total Staked Value</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalStaked)}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Total Rewards Earned</div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalRewards)}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Average APY</div>
          <div className="text-2xl font-bold text-yellow-400">
            {(pools.reduce((sum, p) => sum + p.apy, 0) / pools.length).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className="space-y-3">
        {pools.map((pool) => (
          <div key={pool.id} className="p-5 bg-gray-800 rounded-xl border border-gray-700 hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {pool.token.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{pool.token} Staking Pool</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>Lock: {pool.lockPeriod}</span>
                    <span>•</span>
                    <span>Total Staked: {formatCurrency(pool.totalStaked)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">{pool.apy}%</div>
                <div className="text-xs text-gray-400">APY</div>
              </div>
            </div>

            {pool.userStaked > 0 && (
              <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-700 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-400">Your Stake:</span>
                    <span className="ml-2 font-semibold text-white">{pool.userStaked} {pool.token}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Rewards:</span>
                    <span className="ml-2 font-bold text-green-400">+{pool.rewards} {pool.token}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleStake(pool.id)}
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors"
              >
                {pool.userStaked > 0 ? 'Stake More' : 'Start Staking'}
              </button>
              {pool.userStaked > 0 && (
                <>
                  <button
                    onClick={() => handleUnstake(pool.id)}
                    className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg font-semibold transition-colors"
                  >
                    Unstake
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                    Claim Rewards
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Yield Farming Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700 rounded-lg">
        <h4 className="font-semibold text-emerald-400 mb-2">💰 About Yield Farming</h4>
        <p className="text-sm text-gray-300 mb-2">
          Earn passive income by staking your crypto assets. Higher APY pools may have longer lock periods but offer greater rewards.
        </p>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Flexible pools allow withdrawal anytime</li>
          <li>• Fixed-term pools offer higher APY</li>
          <li>• Rewards are auto-compounded every hour</li>
          <li>• No minimum stake required</li>
        </ul>
      </div>
    </div>
  );
}
