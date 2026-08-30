'use client';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'trade' | 'security' | 'system' | 'whale';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'whale',
      title: 'Whale Alert',
      message: 'Large ETH transfer detected: 50,000 ETH moved to Binance',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: '2',
      type: 'trade',
      title: 'Order Filled',
      message: 'Your limit order for 2.5 ETH was filled at $2,280',
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: '3',
      type: 'security',
      title: 'New Login Detected',
      message: 'Login from new device in San Francisco, CA',
      timestamp: new Date(Date.now() - 1200000),
      read: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'whale': return '🐋';
      case 'trade': return '💹';
      case 'security': return '🔒';
      case 'system': return '⚙️';
      default: return '📬';
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'whale': return 'from-blue-900/30 to-cyan-900/30 border-blue-700';
      case 'trade': return 'from-green-900/30 to-emerald-900/30 border-green-700';
      case 'security': return 'from-red-900/30 to-orange-900/30 border-red-700';
      case 'system': return 'from-purple-900/30 to-pink-900/30 border-purple-700';
      default: return 'from-gray-900/30 to-gray-800/30 border-gray-700';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-cyan-400">Notification Center</h3>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors text-sm"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              !notification.read 
                ? `bg-gradient-to-r ${getColor(notification.type)} hover:opacity-90` 
                : 'bg-gray-800 border-gray-700 opacity-60 hover:opacity-80'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-white">{notification.title}</h4>
                  <span className="text-xs text-gray-400">{formatTime(notification.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-300">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
}
