export interface BuyerProfile {
  id: string;
  name: string;
  company: string;
  industry: string;
  experience: number;
  location: string;
  avatar?: string;
  bio?: string;
  investmentRange: {
    min: number;
    max: number;
  };
  preferredIndustries: string[];
  dealExperience: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  responseRate: number;
  averageResponseTime: number;
  completedDeals: number;
  rating: number;
  reviews: number;
}

export interface SellerProfile {
  id: string;
  name: string;
  company: string;
  industry: string;
  experience: number;
  location: string;
  avatar?: string;
  bio?: string;
  businessValue: number;
  annualRevenue: number;
  profitMargin: number;
  employeeCount: number;
  yearsInBusiness: number;
  reasonForSelling: string;
  timeline: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  responseRate: number;
  averageResponseTime: number;
  completedDeals: number;
  rating: number;
  reviews: number;
}

export interface Deal {
  id: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  businessValue: number;
  industry: string;
  location: string;
  timeline: string;
  documents: Document[];
  messages: Message[];
  tasks: Task[];
  milestones: Milestone[];
}

export interface Document {
  id: string;
  name: string;
  type: 'financial' | 'legal' | 'operational' | 'other';
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  aiAnalysis?: AIAnalysis;
}

export interface AIAnalysis {
  summary: string;
  keyMetrics: {
    revenue?: number;
    profit?: number;
    growth?: number;
    risk?: string;
  };
  insights: string[];
  recommendations: string[];
  confidence: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'document' | 'system';
  attachments?: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: 'due_diligence' | 'legal' | 'financial' | 'operational';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  tasks: string[];
}

export interface OnboardingQuestion {
  id: string;
  type: 'text' | 'select' | 'multiselect' | 'number' | 'textarea';
  question: string;
  options?: string[];
  required: boolean;
  category: 'personal' | 'business' | 'preferences' | 'goals' | 'investment' | 'selling';
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  questions: OnboardingQuestion[];
  isCompleted: boolean;
}
