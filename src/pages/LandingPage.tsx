import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  MessageCircle,
  FileText,
  Zap,
  Sparkles,
  Target,
  Globe,
  Award
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);
  const [isHovered, setIsHovered] = useState<'buyer' | 'seller' | null>(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Smart Matching",
      description: "AI-powered matching connects you with the perfect business partners"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: "Verified Profiles",
      description: "All users are thoroughly vetted for your peace of mind"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary-500" />,
      title: "Streamlined Process",
      description: "Complete deals faster with our guided acquisition workflow"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary-500" />,
      title: "Direct Communication",
      description: "Connect directly with potential partners through our secure platform"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Business Buyer",
      company: "Tech Ventures LLC",
      content: "Found my perfect acquisition in just 2 weeks. The platform made the entire process seamless.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Business Seller",
      company: "Green Solutions Inc",
      content: "Sold my business in record time. The buyer matching was incredibly accurate.",
      rating: 5
    }
  ];

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
    setTimeout(() => {
      navigate('/onboarding', { state: { userType: type } });
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-success-400/20 to-primary-400/20 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-success-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Building2 className="w-8 h-8 text-primary-500 neon-glow" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gradient">Caprae Business</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/onboarding" className="glass-button text-primary-700 font-semibold px-6 py-2">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 text-primary-400 mx-auto mb-4 float" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-gradient text-glow"
            >
              Where Deals Happen
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-neutral-700 max-w-3xl mx-auto"
            >
              Connect with the perfect business partner. Sellers reach out to buyers, 
              making the acquisition process smoother than ever.
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className={`relative overflow-hidden glass-button text-lg font-semibold px-12 py-6 rounded-2xl transition-all duration-500 ${
                  isHovered === 'buyer' 
                    ? 'scale-110 shadow-2xl bg-white/50' 
                    : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered('buyer')}
                onHoverEnd={() => setIsHovered(null)}
                onClick={() => handleUserTypeSelect('buyer')}
              >
                <AnimatePresence>
                  {isHovered === 'buyer' && (
                    <motion.div
                      className="absolute inset-0 shimmer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-10 flex items-center space-x-3">
                  <Target className="w-6 h-6" />
                  <span>I'm Looking to Buy</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>

              <motion.button
                className={`relative overflow-hidden glass-button text-lg font-semibold px-12 py-6 rounded-2xl transition-all duration-500 ${
                  isHovered === 'seller' 
                    ? 'scale-110 shadow-2xl bg-white/50' 
                    : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered('seller')}
                onHoverEnd={() => setIsHovered(null)}
                onClick={() => handleUserTypeSelect('seller')}
              >
                <AnimatePresence>
                  {isHovered === 'seller' && (
                    <motion.div
                      className="absolute inset-0 shimmer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-10 flex items-center space-x-3">
                  <Building2 className="w-6 h-6" />
                  <span>I'm Looking to Sell</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="glass-card text-center p-6 hover-lift">
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <div className="text-neutral-600">Successful Deals</div>
              </div>
              <div className="glass-card text-center p-6 hover-lift">
                <div className="text-3xl font-bold text-gradient mb-2">$2B+</div>
                <div className="text-neutral-600">Total Value</div>
              </div>
              <div className="glass-card text-center p-6 hover-lift">
                <div className="text-3xl font-bold text-gradient mb-2">95%</div>
                <div className="text-neutral-600">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">Why Choose Caprae Business?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with human expertise to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-8 text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-gradient">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">What Our Users Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="glass-card p-8 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gradient">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="glass-card p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join thousands of successful business owners who have found their perfect match.
            </p>
            <motion.button
              className="glass-button text-lg font-semibold px-8 py-4 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
