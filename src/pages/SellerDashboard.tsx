import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Star,
  MessageCircle,
  Eye,
  Search,
  Briefcase,
  Shield,
  Plus,
  BarChart3,
  FileText,
  Users
} from 'lucide-react';
import { BuyerProfile } from '../types';

const SellerDashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('buyers');

  // Mock buyer profiles data (same as buyer dashboard but from seller perspective)
  const buyerProfiles: BuyerProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      company: 'Tech Ventures LLC',
      industry: 'Technology',
      experience: 8,
      location: 'San Francisco, CA',
      avatar: undefined,
      bio: 'Experienced tech executive looking to acquire SaaS businesses with strong recurring revenue.',
      investmentRange: { min: 1000000, max: 5000000 },
      preferredIndustries: ['Technology', 'SaaS', 'E-commerce'],
      dealExperience: 3,
      verificationStatus: 'verified',
      responseRate: 95,
      averageResponseTime: 2,
      completedDeals: 2,
      rating: 4.8,
      reviews: 12
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      company: 'Green Solutions Inc',
      industry: 'Healthcare',
      experience: 12,
      location: 'Austin, TX',
      avatar: undefined,
      bio: 'Healthcare entrepreneur seeking established medical practices and healthcare technology companies.',
      investmentRange: { min: 500000, max: 2000000 },
      preferredIndustries: ['Healthcare', 'Medical', 'Technology'],
      dealExperience: 5,
      verificationStatus: 'verified',
      responseRate: 88,
      averageResponseTime: 4,
      completedDeals: 3,
      rating: 4.6,
      reviews: 8
    },
    {
      id: '3',
      name: 'Jennifer Park',
      company: 'Retail Partners Group',
      industry: 'Retail',
      experience: 15,
      location: 'New York, NY',
      avatar: undefined,
      bio: 'Retail expansion specialist looking for established brick-and-mortar businesses with strong local presence.',
      investmentRange: { min: 2000000, max: 10000000 },
      preferredIndustries: ['Retail', 'Food & Beverage', 'Services'],
      dealExperience: 7,
      verificationStatus: 'verified',
      responseRate: 92,
      averageResponseTime: 1,
      completedDeals: 4,
      rating: 4.9,
      reviews: 15
    }
  ];

  const filters = [
    { id: 'all', label: 'All Buyers', count: buyerProfiles.length },
    { id: 'verified', label: 'Verified', count: buyerProfiles.filter(b => b.verificationStatus === 'verified').length },
    { id: 'high-response', label: 'High Response Rate', count: buyerProfiles.filter(b => b.responseRate >= 90).length },
    { id: 'experienced', label: 'Experienced', count: buyerProfiles.filter(b => b.dealExperience >= 3).length }
  ];

  const filteredProfiles = buyerProfiles.filter(profile => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'verified' && profile.verificationStatus === 'verified') ||
      (selectedFilter === 'high-response' && profile.responseRate >= 90) ||
      (selectedFilter === 'experienced' && profile.dealExperience >= 3);
    
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const BuyerProfileCard: React.FC<{ profile: BuyerProfile }> = ({ profile }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card hover:shadow-lg transition-shadow cursor-pointer"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-lg">
                {profile.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-neutral-900">{profile.name}</h3>
              <p className="text-sm text-neutral-600">{profile.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {profile.verificationStatus === 'verified' && (
              <Shield className="w-5 h-5 text-success-500" />
            )}
            <div className="flex items-center">
              <Star className="w-4 h-4 text-warning-400 fill-current" />
              <span className="text-sm font-medium ml-1">{profile.rating}</span>
              <span className="text-xs text-neutral-500 ml-1">({profile.reviews})</span>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-neutral-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{profile.industry}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{formatCurrency(profile.investmentRange.min)} - {formatCurrency(profile.investmentRange.max)}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>{profile.dealExperience} deals completed</span>
          </div>
        </div>

        {/* Response Rate */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-neutral-500" />
            <span className="text-neutral-600">Response rate: {profile.responseRate}%</span>
          </div>
          <div className="text-sm text-neutral-500">
            {profile.averageResponseTime}h avg
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {profile.bio}
        </p>

        {/* Preferred Industries */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Preferred Industries:</h4>
          <div className="flex flex-wrap gap-1">
            {profile.preferredIndustries.slice(0, 3).map(industry => (
              <span
                key={industry}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {industry}
              </span>
            ))}
            {profile.preferredIndustries.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                +{profile.preferredIndustries.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex items-center justify-between transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
              <Eye className="w-4 h-4" />
              <span>View Profile</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-neutral-600 hover:text-neutral-700">
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors">
              <CheckCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Seller Dashboard</h1>
          <p className="text-neutral-600">
            Manage your business listing and connect with potential buyers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Profile Views</p>
                <p className="text-2xl font-bold text-neutral-900">1,247</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-success-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Messages</p>
                <p className="text-2xl font-bold text-neutral-900">23</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-warning-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Interested Buyers</p>
                <p className="text-2xl font-bold text-neutral-900">8</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-neutral-900">2.4h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-neutral-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('buyers')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'buyers'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Browse Buyers
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'deals'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Active Deals
          </button>
          <button
            onClick={() => setActiveTab('listing')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'listing'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            My Listing
          </button>
        </div>

        {activeTab === 'buyers' && (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search buyers by name, company, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-300'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => (
                <BuyerProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No buyers found</h3>
                <p className="text-neutral-600">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'deals' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Active Deals</h3>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Deal
                </button>
              </div>
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No active deals</h3>
                <p className="text-neutral-600">Start connecting with buyers to create deals</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listing' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">My Business Listing</h3>
                <button className="btn-secondary">Edit Listing</button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-neutral-900 mb-4">Business Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-neutral-600">Company Name</label>
                      <p className="text-neutral-900">Green Solutions Inc</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Industry</label>
                      <p className="text-neutral-900">Healthcare</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Location</label>
                      <p className="text-neutral-900">Austin, TX</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Years in Business</label>
                      <p className="text-neutral-900">8 years</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-neutral-900 mb-4">Financial Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-neutral-600">Annual Revenue</label>
                      <p className="text-neutral-900">$2.5M</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Profit Margin</label>
                      <p className="text-neutral-900">25%</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Employee Count</label>
                      <p className="text-neutral-900">15 employees</p>
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Asking Price</label>
                      <p className="text-neutral-900">$1.8M</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-neutral-900 mb-4">Business Description</h4>
                <p className="text-neutral-600">
                  Established healthcare technology company specializing in patient management software. 
                  Strong recurring revenue model with 95% customer retention rate. Looking for strategic 
                  buyer to help scale operations and expand market reach.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
