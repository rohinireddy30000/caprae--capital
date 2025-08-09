import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Edit, 
  Save, 
  X,
  Star,
  TrendingUp,
  Calendar,
  CheckCircle,
  Shield,
  BarChart3,
  MessageCircle,
  Eye
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    company: user?.profile?.company || '',
    industry: user?.profile?.industry || '',
    location: user?.profile?.location || '',
    bio: user?.profile?.bio || ''
  });

  const handleSave = () => {
    updateProfile({
      company: editForm.company,
      industry: editForm.industry,
      location: editForm.location,
      bio: editForm.bio
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      company: user?.profile?.company || '',
      industry: user?.profile?.industry || '',
      location: user?.profile?.location || '',
      bio: user?.profile?.bio || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">User not found</h3>
          <p className="text-neutral-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-3xl">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-neutral-900">{user.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-5 h-5 text-success-500" />
                      <span className="text-sm text-success-600 font-medium">Verified</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-2">{user.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {user.profile?.location || 'Location not set'}
                    </span>
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {user.type === 'buyer' ? 'Business Buyer' : 'Business Seller'}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editForm.industry}
                      onChange={(e) => setEditForm({...editForm, industry: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={handleSave} className="btn-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Company</h3>
                    <p className="text-neutral-600">{user.profile?.company || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Industry</h3>
                    <p className="text-neutral-600">{user.profile?.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Location</h3>
                    <p className="text-neutral-600">{user.profile?.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Bio</h3>
                    <p className="text-neutral-600">{user.profile?.bio || 'No bio provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm text-neutral-600">Profile Views</span>
                  </div>
                  <span className="font-semibold text-neutral-900">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-success-600" />
                    </div>
                    <span className="text-sm text-neutral-600">Messages</span>
                  </div>
                  <span className="font-semibold text-neutral-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-warning-600" />
                    </div>
                    <span className="text-sm text-neutral-600">Rating</span>
                  </div>
                  <span className="font-semibold text-neutral-900">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-secondary-600" />
                    </div>
                    <span className="text-sm text-neutral-600">Completed Deals</span>
                  </div>
                  <span className="font-semibold text-neutral-900">3</span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">Profile viewed by Tech Ventures LLC</p>
                    <p className="text-xs text-neutral-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">New message from Green Solutions Inc</p>
                    <p className="text-xs text-neutral-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">Deal status updated</p>
                    <p className="text-xs text-neutral-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Identity</span>
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Business</span>
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Financial</span>
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Legal</span>
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
