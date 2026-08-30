'use client';
import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: Date;
  lastUsed: Date;
  status: 'active' | 'disabled';
}

export function ApiManagementPanel() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Trading Bot',
      key: 'sk_live_51Hx***************************xyz',
      permissions: ['trade', 'read'],
      created: new Date('2025-01-01'),
      lastUsed: new Date(Date.now() - 3600000),
      status: 'active',
    },
    {
      id: '2',
      name: 'Portfolio Tracker',
      key: 'sk_live_42Qm***************************abc',
      permissions: ['read'],
      created: new Date('2025-01-10'),
      lastUsed: new Date(Date.now() - 300000),
      status: 'active',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const allPermissions = [
    { id: 'read', label: 'Read Data', description: 'View account and market data' },
    { id: 'trade', label: 'Execute Trades', description: 'Place and cancel orders' },
    { id: 'withdraw', label: 'Withdraw Funds', description: 'Initiate withdrawals' },
    { id: 'manage', label: 'Account Management', description: 'Modify account settings' },
  ];

  const handleCreateKey = () => {
    if (!newKeyName || selectedPermissions.length === 0) return;

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: 'sk_live_' + Math.random().toString(36).substring(2, 34) + '***',
      permissions: selectedPermissions,
      created: new Date(),
      lastUsed: new Date(),
      status: 'active',
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setSelectedPermissions([]);
    setShowCreateForm(false);
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const deleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(k => k.id !== id));
    }
  };

  const toggleKeyStatus = (id: string) => {
    setApiKeys(apiKeys.map(k => 
      k.id === id ? { ...k, status: k.status === 'active' ? 'disabled' : 'active' } : k
    ));
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-400">🔑 API Management</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-colors"
        >
          + Create New API Key
        </button>
      </div>

      {/* Create API Key Form */}
      {showCreateForm && (
        <div className="mb-6 p-5 bg-gray-800 rounded-xl border border-indigo-600">
          <h4 className="text-lg font-semibold text-white mb-4">Create New API Key</h4>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Key Name</label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g., My Trading Bot"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-3">Permissions</label>
            <div className="space-y-2">
              {allPermissions.map((perm) => (
                <label key={perm.id} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm.id)}
                    onChange={() => togglePermission(perm.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-white">{perm.label}</div>
                    <div className="text-xs text-gray-400">{perm.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCreateKey}
              disabled={!newKeyName || selectedPermissions.length === 0}
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create API Key
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="p-5 bg-gray-800 rounded-xl border border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-white">{apiKey.name}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    apiKey.status === 'active' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {apiKey.status.toUpperCase()}
                  </span>
                </div>
                <div className="font-mono text-sm text-gray-400 bg-gray-900 px-3 py-2 rounded">
                  {apiKey.key}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-gray-400">Created:</span>
                <span className="ml-2 text-white">{apiKey.created.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-400">Last Used:</span>
                <span className="ml-2 text-white" suppressHydrationWarning>{apiKey.lastUsed.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-2">Permissions:</div>
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map((perm) => (
                  <span key={perm} className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-xs font-semibold rounded-full">
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleKeyStatus(apiKey.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  apiKey.status === 'active'
                    ? 'bg-orange-600 hover:bg-orange-500'
                    : 'bg-green-600 hover:bg-green-500'
                }`}
              >
                {apiKey.status === 'active' ? 'Disable' : 'Enable'}
              </button>
              <button
                onClick={() => deleteKey(apiKey.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {apiKeys.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-2">🔑</div>
          <p>No API keys created yet</p>
          <p className="text-sm mt-1">Create one to start using the API</p>
        </div>
      )}

      {/* API Documentation Link */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700 rounded-lg">
        <h4 className="font-semibold text-indigo-400 mb-2">📚 API Documentation</h4>
        <p className="text-sm text-gray-300 mb-3">
          Access our comprehensive API documentation to integrate OneClickAlpha into your applications.
        </p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-colors text-sm">
          View API Docs
        </button>
      </div>
    </div>
  );
}
