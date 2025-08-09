import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Star,
  MessageCircle,
  Eye,
  Filter,
  Search,
  Briefcase,
  Target,
  Shield,
  Sparkles,
  Zap
} from 'lucide-react';
import { BuyerProfile } from '../types';

const BuyerDashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<BuyerProfile | null>(null);

  // Mock buyer profiles data
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
    },
    {
      id: '4',
      name: 'David Thompson',
      company: 'Manufacturing Capital',
      industry: 'Manufacturing',
      experience: 20,
      location: 'Detroit, MI',
      avatar: undefined,
      bio: 'Manufacturing expert seeking established manufacturing businesses with strong supply chain relationships.',
      investmentRange: { min: 5000000, max: 25000000 },
      preferredIndustries: ['Manufacturing', 'Industrial', 'Technology'],
      dealExperience: 10,
      verificationStatus: 'verified',
      responseRate: 85,
      averageResponseTime: 3,
      completedDeals: 6,
      rating: 4.7,
      reviews: 18
    }
  ];

  const filteredProfiles = buyerProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || profile.industry.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const BuyerProfileCard: React.FC<{ profile: BuyerProfile }> = ({ profile }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="glass-card p-6 hover-lift cursor-pointer relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedProfile(profile)}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gradient">{profile.name}</h3>
                <p className="text-neutral-600">{profile.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {profile.verificationStatus === 'verified' && (
                <Shield className="w-5 h-5 text-success-500" />
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{profile.rating}</span>
              </div>
            </div>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-600">{profile.industry}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-600">{profile.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-600">
                {formatCurrency(profile.investmentRange.min)} - {formatCurrency(profile.investmentRange.max)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-600">{profile.dealExperience} deals</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{profile.bio}</p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gradient">{profile.responseRate}%</div>
                <div className="text-xs text-neutral-500">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gradient">{profile.averageResponseTime}h</div>
                <div className="text-xs text-neutral-500">Avg Response</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="glass-button px-4 py-2 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="glass-button px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-success-400/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          className="glass-card p-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Buyer Profiles</h1>
              <p className="text-neutral-600">Discover potential buyers for your business</p>
            </div>
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-gradient">{buyerProfiles.length}</div>
              <div className="text-sm text-neutral-600">Total Buyers</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-gradient">95%</div>
              <div className="text-sm text-neutral-600">Avg Response Rate</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-gradient">2.5h</div>
              <div className="text-sm text-neutral-600">Avg Response Time</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-gradient">4.7</div>
              <div className="text-sm text-neutral-600">Avg Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search buyers..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="input-field"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Industries</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
        </motion.div>

        {/* Buyer Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BuyerProfileCard profile={profile} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Selected Profile Modal */}
        <AnimatePresence>
          {selectedProfile && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProfile(null)}
            >
              <motion.div
                className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gradient">{selectedProfile.name}</h2>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="glass-button p-2 rounded-full"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-600">Company</label>
                      <p className="text-lg font-semibold">{selectedProfile.company}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-600">Industry</label>
                      <p className="text-lg font-semibold">{selectedProfile.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-600">Location</label>
                      <p className="text-lg font-semibold">{selectedProfile.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-600">Experience</label>
                      <p className="text-lg font-semibold">{selectedProfile.experience} years</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Investment Range</label>
                    <p className="text-lg font-semibold">
                      {formatCurrency(selectedProfile.investmentRange.min)} - {formatCurrency(selectedProfile.investmentRange.max)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Bio</label>
                    <p className="text-neutral-700">{selectedProfile.bio}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Preferred Industries</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProfile.preferredIndustries.map((industry) => (
                        <span key={industry} className="glass-button px-3 py-1 text-sm">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <motion.button
                      className="glass-button px-6 py-3 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                    <motion.button
                      className="glass-button px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyerDashboard;
