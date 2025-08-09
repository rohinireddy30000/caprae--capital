import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    deals: true,
    messages: true,
    updates: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showContactInfo: true,
    showFinancialInfo: false,
    allowMessages: true
  });
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon className="w-4 h-4" /> }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Email Notifications</h4>
                        <p className="text-sm text-neutral-600">Receive notifications via email</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('email')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.email ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.email ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Push Notifications</h4>
                        <p className="text-sm text-neutral-600">Receive notifications in your browser</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('push')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.push ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.push ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">SMS Notifications</h4>
                        <p className="text-sm text-neutral-600">Receive notifications via SMS</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('sms')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.sms ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.sms ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Deal Updates</h4>
                        <p className="text-sm text-neutral-600">Updates about your active deals</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('deals')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.deals ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.deals ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Messages</h4>
                        <p className="text-sm text-neutral-600">New messages from other users</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('messages')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.messages ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.messages ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Platform Updates</h4>
                        <p className="text-sm text-neutral-600">News and updates about the platform</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('updates')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.updates ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.updates ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="input-field"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="registered">Registered Users Only</option>
                        <option value="private">Private - Only you can view</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Show Contact Information</h4>
                        <p className="text-sm text-neutral-600">Allow others to see your contact details</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange('showContactInfo', !privacy.showContactInfo)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          privacy.showContactInfo ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacy.showContactInfo ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Show Financial Information</h4>
                        <p className="text-sm text-neutral-600">Display financial metrics on your profile</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange('showFinancialInfo', !privacy.showFinancialInfo)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          privacy.showFinancialInfo ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacy.showFinancialInfo ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Allow Messages</h4>
                        <p className="text-sm text-neutral-600">Allow other users to send you messages</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange('allowMessages', !privacy.allowMessages)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          privacy.allowMessages ? 'bg-primary-600' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacy.allowMessages ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="input-field pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        value="user@example.com"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Language
                      </label>
                      <select className="input-field">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Timezone
                      </label>
                      <select className="input-field">
                        <option value="utc-8">Pacific Time (UTC-8)</option>
                        <option value="utc-7">Mountain Time (UTC-7)</option>
                        <option value="utc-6">Central Time (UTC-6)</option>
                        <option value="utc-5">Eastern Time (UTC-5)</option>
                        <option value="utc+0">UTC</option>
                        <option value="utc+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <button className="w-full btn-secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export My Data
                    </button>
                    <button className="w-full btn-secondary">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </button>
                    <button className="w-full text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Display Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Theme
                      </label>
                      <select className="input-field">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Currency
                      </label>
                      <select className="input-field">
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="cad">CAD (C$)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Show Analytics</h4>
                        <p className="text-sm text-neutral-600">Display analytics and insights on dashboard</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900">Auto-save Drafts</h4>
                        <p className="text-sm text-neutral-600">Automatically save message drafts</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Deal Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Default Deal Timeline
                      </label>
                      <select className="input-field">
                        <option value="3-6">3-6 months</option>
                        <option value="6-12">6-12 months</option>
                        <option value="12-24">1-2 years</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Preferred Communication Method
                      </label>
                      <select className="input-field">
                        <option value="platform">Platform Messages</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="video">Video Call</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
