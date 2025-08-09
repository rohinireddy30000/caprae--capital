import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  User, 
  MessageCircle, 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  Upload,
  Download,
  Eye,
  BarChart3,
  Calendar,
  Users,
  Target,
  Bot,
  Shield,
  Star,
  Send,
  Paperclip,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Deal, Document, Message, Task, Milestone, AIAnalysis } from '../types';

const DealRoom: React.FC = () => {
  const { dealId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  // Mock deal data
  const deal: Deal = {
    id: dealId || '1',
    buyerId: 'buyer-1',
    sellerId: 'seller-1',
    status: 'in_progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    businessValue: 2500000,
    industry: 'Healthcare Technology',
    location: 'Austin, TX',
    timeline: '3-6 months',
    documents: [
      {
        id: '1',
        name: 'Financial Statements Q4 2023',
        type: 'financial',
        url: '#',
        uploadedAt: new Date('2024-01-18'),
        uploadedBy: 'seller-1',
        status: 'reviewed',
        aiAnalysis: {
          summary: 'Strong financial performance with 25% revenue growth and 30% profit margins. Healthy cash flow and low debt levels.',
          keyMetrics: {
            revenue: 2500000,
            profit: 750000,
            growth: 25,
            risk: 'Low'
          },
          insights: [
            'Consistent revenue growth over 3 years',
            'Strong customer retention rate (95%)',
            'Efficient cost management',
            'Positive cash flow trends'
          ],
          recommendations: [
            'Consider valuation premium for growth trajectory',
            'Review customer concentration risk',
            'Assess scalability of current model'
          ],
          confidence: 0.92
        }
      },
      {
        id: '2',
        name: 'Legal Structure Review',
        type: 'legal',
        url: '#',
        uploadedAt: new Date('2024-01-19'),
        uploadedBy: 'seller-1',
        status: 'pending',
        aiAnalysis: {
          summary: 'Clean legal structure with proper entity formation and minimal litigation risk. All contracts are current and enforceable.',
          keyMetrics: {
            risk: 'Low'
          },
          insights: [
            'Proper LLC formation and governance',
            'All contracts are current and valid',
            'No pending litigation',
            'Intellectual property properly protected'
          ],
          recommendations: [
            'Conduct thorough IP due diligence',
            'Review employment contracts',
            'Verify regulatory compliance'
          ],
          confidence: 0.88
        }
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'buyer-1',
        content: 'Thanks for sharing the financial documents. The growth trajectory looks promising. Do you have any projections for the next 12 months?',
        timestamp: new Date('2024-01-20T10:30:00'),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'seller-1',
        content: 'Yes, I can share our projections. We\'re expecting 30% growth based on current pipeline and market expansion plans.',
        timestamp: new Date('2024-01-20T11:15:00'),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'system',
        content: 'AI Analysis completed for Financial Statements Q4 2023',
        timestamp: new Date('2024-01-20T11:20:00'),
        type: 'system'
      }
    ],
    tasks: [
      {
        id: '1',
        title: 'Complete Financial Due Diligence',
        description: 'Review all financial documents and prepare analysis report',
        assignedTo: 'buyer-1',
        dueDate: new Date('2024-01-25'),
        status: 'in_progress',
        priority: 'high',
        category: 'financial'
      },
      {
        id: '2',
        title: 'Legal Structure Review',
        description: 'Conduct legal due diligence and identify any potential issues',
        assignedTo: 'buyer-1',
        dueDate: new Date('2024-01-28'),
        status: 'pending',
        priority: 'high',
        category: 'legal'
      },
      {
        id: '3',
        title: 'Customer Interviews',
        description: 'Schedule and conduct interviews with key customers',
        assignedTo: 'buyer-1',
        dueDate: new Date('2024-01-30'),
        status: 'pending',
        priority: 'medium',
        category: 'due_diligence'
      }
    ],
    milestones: [
      {
        id: '1',
        title: 'Due Diligence Complete',
        description: 'All due diligence activities completed and documented',
        dueDate: new Date('2024-02-15'),
        status: 'pending',
        tasks: ['1', '2', '3']
      },
      {
        id: '2',
        title: 'Letter of Intent',
        description: 'Sign letter of intent with agreed terms',
        dueDate: new Date('2024-02-28'),
        status: 'pending',
        tasks: []
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-50';
      case 'in_progress': return 'text-warning-600 bg-warning-50';
      case 'pending': return 'text-neutral-600 bg-neutral-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-warning-600 bg-warning-50';
      case 'low': return 'text-success-600 bg-success-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const AIAnalysisCard: React.FC<{ analysis: AIAnalysis }> = ({ analysis }) => (
    <div className="card border-l-4 border-l-primary-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary-600" />
          <h4 className="font-semibold text-neutral-900">AI Analysis</h4>
          <span className="text-sm text-neutral-500">({Math.round(analysis.confidence * 100)}% confidence)</span>
        </div>
        <Shield className="w-5 h-5 text-success-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-medium text-neutral-900 mb-2">Summary</h5>
          <p className="text-sm text-neutral-600">{analysis.summary}</p>
        </div>
        
        {analysis.keyMetrics && (
          <div>
            <h5 className="font-medium text-neutral-900 mb-2">Key Metrics</h5>
            <div className="grid grid-cols-2 gap-4">
              {analysis.keyMetrics.revenue && (
                <div>
                  <span className="text-sm text-neutral-600">Revenue</span>
                  <p className="font-semibold text-neutral-900">{formatCurrency(analysis.keyMetrics.revenue)}</p>
                </div>
              )}
              {analysis.keyMetrics.profit && (
                <div>
                  <span className="text-sm text-neutral-600">Profit</span>
                  <p className="font-semibold text-neutral-900">{formatCurrency(analysis.keyMetrics.profit)}</p>
                </div>
              )}
              {analysis.keyMetrics.growth && (
                <div>
                  <span className="text-sm text-neutral-600">Growth</span>
                  <p className="font-semibold text-neutral-900">{analysis.keyMetrics.growth}%</p>
                </div>
              )}
              {analysis.keyMetrics.risk && (
                <div>
                  <span className="text-sm text-neutral-600">Risk Level</span>
                  <p className="font-semibold text-neutral-900">{analysis.keyMetrics.risk}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div>
          <h5 className="font-medium text-neutral-900 mb-2">Key Insights</h5>
          <ul className="space-y-1">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="text-sm text-neutral-600 flex items-start">
                <CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-neutral-900 mb-2">Recommendations</h5>
          <ul className="space-y-1">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-neutral-600 flex items-start">
                <Target className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Deal Room</h1>
              <p className="text-neutral-600">
                Healthcare Technology Acquisition • {formatCurrency(deal.businessValue)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-neutral-600">Timeline</p>
                <p className="font-semibold text-neutral-900">{deal.timeline}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}`}>
                {deal.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Documents</p>
                <p className="text-2xl font-bold text-neutral-900">{deal.documents.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Tasks Complete</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {deal.tasks.filter(t => t.status === 'completed').length}/{deal.tasks.length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-warning-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Messages</p>
                <p className="text-2xl font-bold text-neutral-900">{deal.messages.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">Days Remaining</p>
                <p className="text-2xl font-bold text-neutral-900">45</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-neutral-100 rounded-lg p-1 mb-8">
          {['overview', 'documents', 'tasks', 'messages', 'timeline'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {deal.messages.slice(-3).map(message => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-sm">
                          {message.senderId === 'buyer-1' ? 'B' : message.senderId === 'seller-1' ? 'S' : 'AI'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-neutral-900">
                            {message.senderId === 'buyer-1' ? 'Buyer' : message.senderId === 'seller-1' ? 'Seller' : 'System'}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {message.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                  <button className="w-full btn-secondary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                  <button className="w-full btn-secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </button>
                  <button className="w-full btn-secondary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Documents</h3>
              <button className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deal.documents.map(document => (
                <div key={document.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">{document.name}</h4>
                        <p className="text-sm text-neutral-600">
                          Uploaded {document.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                      <button className="p-1 text-neutral-400 hover:text-neutral-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-neutral-600 hover:text-neutral-700">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                    {document.aiAnalysis && (
                      <button 
                        onClick={() => setSelectedDocument(document)}
                        className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        <Bot className="w-4 h-4" />
                        <span>AI Analysis</span>
                      </button>
                    )}
                  </div>

                  {document.aiAnalysis && selectedDocument?.id === document.id && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <AIAnalysisCard analysis={document.aiAnalysis} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Tasks</h3>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {deal.tasks.map(task => (
                <div key={task.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-neutral-900">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <span>Due: {task.dueDate.toLocaleDateString()}</span>
                        <span>Category: {task.category.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Messages</h3>
            </div>

            <div className="card">
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {deal.messages.map(message => (
                  <div key={message.id} className={`flex items-start space-x-3 ${
                    message.senderId === 'system' ? 'justify-center' : ''
                  }`}>
                    {message.senderId !== 'system' && (
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-sm">
                          {message.senderId === 'buyer-1' ? 'B' : 'S'}
                        </span>
                      </div>
                    )}
                    <div className={`flex-1 ${message.senderId === 'system' ? 'text-center' : ''}`}>
                      {message.senderId !== 'system' && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-neutral-900">
                            {message.senderId === 'buyer-1' ? 'Buyer' : 'Seller'}
                          </span>
                          <span className="text-sm text-neutral-500">
                            {message.timestamp.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className={`p-3 rounded-lg ${
                        message.senderId === 'system' 
                          ? 'bg-neutral-100 text-neutral-600 text-sm'
                          : message.senderId === 'buyer-1'
                          ? 'bg-primary-50 text-neutral-900'
                          : 'bg-neutral-50 text-neutral-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600">
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                <button className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Timeline & Milestones</h3>
            </div>

            <div className="space-y-6">
              {deal.milestones.map(milestone => (
                <div key={milestone.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-neutral-900">{milestone.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500">
                        <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                        <span>{milestone.tasks.length} tasks</span>
                      </div>
                    </div>
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealRoom;
