import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  User, 
  DollarSign,
  MapPin,
  Briefcase,
  Target,
  Clock,
  TrendingUp,
  Shield,
  FileText,
  Sparkles,
  Zap,
  Star,
  Heart,
  Circle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { OnboardingQuestion, OnboardingStep } from '../types';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(
    location.state?.userType || null
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isHovered, setIsHovered] = useState<'buyer' | 'seller' | null>(null);

  const buyerSteps: OnboardingStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      isCompleted: false,
      questions: [
        {
          id: 'name',
          type: 'text',
          question: 'What\'s your full name?',
          required: true,
          category: 'personal'
        },
        {
          id: 'email',
          type: 'text',
          question: 'What\'s your email address?',
          required: true,
          category: 'personal'
        },
        {
          id: 'phone',
          type: 'text',
          question: 'What\'s your phone number?',
          required: false,
          category: 'personal'
        },
        {
          id: 'location',
          type: 'text',
          question: 'Where are you located?',
          required: true,
          category: 'personal'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Background',
      description: 'Share your business experience',
      isCompleted: false,
      questions: [
        {
          id: 'company',
          type: 'text',
          question: 'What company do you represent?',
          required: true,
          category: 'business'
        },
        {
          id: 'role',
          type: 'text',
          question: 'What\'s your role in the company?',
          required: true,
          category: 'business'
        },
        {
          id: 'experience',
          type: 'number',
          question: 'How many years of business experience do you have?',
          required: true,
          category: 'business'
        },
        {
          id: 'industry',
          type: 'select',
          question: 'What industry are you most interested in?',
          options: ['Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 'Food & Beverage', 'Other'],
          required: true,
          category: 'business'
        }
      ]
    },
    {
      id: 'investment',
      title: 'Investment Preferences',
      description: 'Define your investment criteria',
      isCompleted: false,
      questions: [
        {
          id: 'investmentRange',
          type: 'select',
          question: 'What\'s your investment range?',
          options: ['$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M - $10M', '$10M+'],
          required: true,
          category: 'investment'
        },
        {
          id: 'dealExperience',
          type: 'number',
          question: 'How many deals have you completed?',
          required: true,
          category: 'investment'
        },
        {
          id: 'timeline',
          type: 'select',
          question: 'What\'s your preferred timeline?',
          options: ['3-6 months', '6-12 months', '1-2 years', '2+ years'],
          required: true,
          category: 'investment'
        }
      ]
    }
  ];

  const sellerSteps: OnboardingStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      isCompleted: false,
      questions: [
        {
          id: 'name',
          type: 'text',
          question: 'What\'s your full name?',
          required: true,
          category: 'personal'
        },
        {
          id: 'email',
          type: 'text',
          question: 'What\'s your email address?',
          required: true,
          category: 'personal'
        },
        {
          id: 'phone',
          type: 'text',
          question: 'What\'s your phone number?',
          required: false,
          category: 'personal'
        },
        {
          id: 'location',
          type: 'text',
          question: 'Where are you located?',
          required: true,
          category: 'personal'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Information',
      description: 'Tell us about your business',
      isCompleted: false,
      questions: [
        {
          id: 'company',
          type: 'text',
          question: 'What\'s your company name?',
          required: true,
          category: 'business'
        },
        {
          id: 'industry',
          type: 'select',
          question: 'What industry is your business in?',
          options: ['Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 'Food & Beverage', 'Other'],
          required: true,
          category: 'business'
        },
        {
          id: 'annualRevenue',
          type: 'select',
          question: 'What\'s your annual revenue?',
          options: ['Under $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M+'],
          required: true,
          category: 'business'
        },
        {
          id: 'employeeCount',
          type: 'number',
          question: 'How many employees do you have?',
          required: true,
          category: 'business'
        }
      ]
    },
    {
      id: 'selling',
      title: 'Selling Details',
      description: 'Why are you selling?',
      isCompleted: false,
      questions: [
        {
          id: 'reasonForSelling',
          type: 'textarea',
          question: 'Why are you looking to sell your business?',
          required: true,
          category: 'selling'
        },
        {
          id: 'timeline',
          type: 'select',
          question: 'What\'s your preferred timeline for selling?',
          options: ['3-6 months', '6-12 months', '1-2 years', 'Flexible'],
          required: true,
          category: 'selling'
        },
        {
          id: 'businessValue',
          type: 'select',
          question: 'What\'s your estimated business value?',
          options: ['Under $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M+'],
          required: true,
          category: 'selling'
        }
      ]
    }
  ];

  const steps = userType === 'buyer' ? buyerSteps : sellerSteps;

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      const userData = {
        id: '1',
        name: answers.name || 'User',
        email: answers.email || '',
        type: userType!,
        profile: {
          company: answers.company || '',
          industry: answers.industry || '',
          experience: answers.experience || 0,
          location: answers.location || '',
        },
        onboarding: {
          completed: true,
          currentStep: steps.length,
          totalSteps: steps.length
        }
      };
      login(userData);
      navigate(`/dashboard/${userType}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    const currentQuestions = steps[currentStep]?.questions || [];
    return currentQuestions.every(q => !q.required || answers[q.id]);
  };

  const renderQuestion = (question: OnboardingQuestion) => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input-field"
            placeholder="Enter your answer..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className="input-field"
            placeholder="Enter a number..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
          />
        );
      case 'select':
        return (
          <select
            className="input-field"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          >
            <option value="">Select an option...</option>
            {question.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            className="input-field min-h-[120px] resize-none"
            placeholder="Enter your answer..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-success-400/30 to-primary-400/30 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-success-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              } as React.CSSProperties}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Animated Stars */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              } as React.CSSProperties}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            >
              <Star className="w-3 h-3" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="glass-card p-12 max-w-2xl w-full text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-16 h-16 text-primary-400 mx-auto mb-6 float" />
              <h1 className="text-4xl font-bold text-gradient mb-4">Welcome to Caprae Business</h1>
              <p className="text-xl text-neutral-600 mb-12">
                Let's get to know you better. Are you looking to buy or sell a business?
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className={`relative overflow-hidden glass-button text-lg font-semibold px-12 py-8 rounded-2xl transition-all duration-500 ${
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
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <Target className="w-8 h-8" />
                  <span>I'm Looking to Buy</span>
                  <p className="text-sm text-neutral-600">Find the perfect business to acquire</p>
                </div>
              </motion.button>

              <motion.button
                className={`relative overflow-hidden glass-button text-lg font-semibold px-12 py-8 rounded-2xl transition-all duration-500 ${
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
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <Building2 className="w-8 h-8" />
                  <span>I'm Looking to Sell</span>
                  <p className="text-sm text-neutral-600">Connect with qualified buyers</p>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-success-400/30 to-primary-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-success-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            } as React.CSSProperties}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            } as React.CSSProperties}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Circle className="w-8 h-8" />
          </motion.div>
        ))}
        
        {/* Pulsing Hearts */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-primary-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            } as React.CSSProperties}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          className="glass-card p-8 max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gradient">
                {steps[currentStep]?.title}
              </h2>
              <span className="text-neutral-600">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {steps[currentStep]?.description}
                </h3>
              </div>

              <div className="space-y-6">
                {steps[currentStep]?.questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-lg font-medium text-neutral-700">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderQuestion(question)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <motion.button
              className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>

            <motion.button
              className={`glass-button px-8 py-3 rounded-xl flex items-center space-x-2 ${
                canProceed() ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={canProceed() ? { scale: 1.05 } : {}}
              whileTap={canProceed() ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
