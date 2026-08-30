'use client';
import { useState } from 'react';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  withdrawalWhitelist: string[];
  antiPhishingCode: string;
  sessionTimeout: number;
}

export function SecurityPanel() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    withdrawalWhitelist: ['0x1234...5678', '0xabcd...efgh'],
    antiPhishingCode: 'ALPHA2025',
    sessionTimeout: 30,
  });

  const [newAddress, setNewAddress] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleAddAddress = () => {
    if (newAddress && !settings.withdrawalWhitelist.includes(newAddress)) {
      setSettings({
        ...settings,
        withdrawalWhitelist: [...settings.withdrawalWhitelist, newAddress],
      });
      setNewAddress('');
      setShowAddAddress(false);
    }
  };

  const handleRemoveAddress = (address: string) => {
    setSettings({
      ...settings,
      withdrawalWhitelist: settings.withdrawalWhitelist.filter(a => a !== address),
    });
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-red-400 mb-6">🔒 Security & Protection</h3>

      {/* Two-Factor Authentication */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-lg font-semibold text-white">Two-Factor Authentication (2FA)</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, twoFactorEnabled: !settings.twoFactorEnabled })}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              settings.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                settings.twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {settings.twoFactorEnabled && (
          <div className="mt-3 p-3 bg-green-900/30 border border-green-700 rounded-lg">
            <p className="text-sm text-green-400">✓ 2FA is enabled and protecting your account</p>
          </div>
        )}
      </div>

      {/* Withdrawal Whitelist */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-2">Withdrawal Whitelist</h4>
        <p className="text-sm text-gray-400 mb-4">Only whitelisted addresses can receive withdrawals</p>
        
        <div className="space-y-2 mb-4">
          {settings.withdrawalWhitelist.map((address, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="font-mono text-sm text-white">{address}</span>
              <button
                onClick={() => handleRemoveAddress(address)}
                className="px-3 py-1 text-sm font-semibold bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {showAddAddress ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddAddress}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddAddress(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddAddress(true)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Anti-Phishing Code */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-2">Anti-Phishing Code</h4>
        <p className="text-sm text-gray-400 mb-4">Verify official communications with your unique code</p>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg">
          <div>
            <div className="text-xs text-gray-400">Your Anti-Phishing Code</div>
            <div className="text-2xl font-bold text-purple-400 font-mono">{settings.antiPhishingCode}</div>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">
            Change Code
          </button>
        </div>
      </div>

      {/* Session Settings */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-2">Session Security</h4>
        <p className="text-sm text-gray-400 mb-4">Automatically log out after period of inactivity</p>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-400">Timeout (minutes):</label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>
      </div>

      {/* Security Score */}
      <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold text-white">Security Score</h4>
          <div className="text-3xl font-bold text-green-400">95/100</div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full" style={{ width: '95%' }}></div>
        </div>
        <p className="text-sm text-gray-400 mt-2">Your account is well protected. Enable all features for maximum security.</p>
      </div>
    </div>
  );
}
