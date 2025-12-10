// src/components/DementiaAssessmentModal.tsx
import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Mail,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronRight,
  Phone,
  Calendar,
  FileText,
  Heart,
  Brain,
  Copy,
  Loader2,
  Share2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateReportHTML } from '../utils/reportGenerator';
import { generateUniqueSlug } from '../utils/slugGenerator';
import { useAuth } from '../context/AuthContext';


interface AssessmentResult {
  level: 'low' | 'mild' | 'moderate' | 'high';
  severity: string;
  urgency: string;
  color: string;
  icon: any;
  bgColor: string;
  borderColor: string;
  textColor: string;
  message: string;
  recommendation: string;
  nextSteps: string[];
}

interface DementiaAssessmentModalProps {
  result: AssessmentResult;
  score: number;
  totalQuestions: number;
  patientName: string;
  relationshipToPatient: string;
  onClose: () => void;
}

export function DementiaAssessmentModal({
  result,
  score,
  totalQuestions,
  patientName,
  relationshipToPatient,
  onClose,
}: DementiaAssessmentModalProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reportSaved, setReportSaved] = useState(false);
  const [reportSlug, setReportSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const { user } = useAuth();

  //const handleSendReport = () => {
    // Placeholder for send functionality (not implemented per requirements)
    //if (email) {
     // setEmailSent(true);
      //setTimeout(() => {
       // setEmailSent(false);
        //setEmail('');
      //}, 3000);
    //}
  //};

  const handleSendReport = async () => {
    // Validate patient name
    if (!patientName || patientName.trim() === '') {
      setError('Please provide a patient name before saving the report.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Generate current date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generate HTML content
      const htmlContent = generateReportHTML(
        result,
        score,
        totalQuestions,
        patientName,
        relationshipToPatient,
        currentDate
      );

      // Generate unique slug
      const slug = generateUniqueSlug();

      // Prepare data for insert
      const reportData = {
        patient_name: patientName.trim(),
        slug: slug,
        content: htmlContent,
        relationship: relationshipToPatient || null,
        user_id: user?.id || null,
        email_sent: false,
        email_address: email 
      };

      // Insert into Bolt Database
      const { data, error: insertError } = await supabase
        .from('dementia_report')
        .insert([reportData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      
     

      // Success
      setReportSlug(slug);
      setReportSaved(true);
       setEmailSent(true);
      
      
    } catch (err: any) {
      console.error('Error saving report:', err);
      setError(err.message || 'Failed to save report. Please try again.');
    } finally {
      //
      setTimeout(() => {
        setEmailSent(false);
        setIsSaving(false);
        setEmail('');
      }, 3000);    
    }
  };

const copyLinkToClipboard = () => {
    if (reportSlug) {
      const reportUrl = `${window.location.origin}/report/${reportSlug}`;
      navigator.clipboard.writeText(reportUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const ResultIcon = result.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Brain className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Assessment Report</h2>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{currentDate}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Information */}
          {(patientName || relationshipToPatient) && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Assessment Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {patientName && (
                  <div>
                    <span className="text-gray-600">Patient Name:</span>
                    <p className="font-semibold text-gray-900">{patientName}</p>
                  </div>
                )}
                {relationshipToPatient && (
                  <div>
                    <span className="text-gray-600">Completed By:</span>
                    <p className="font-semibold text-gray-900">
                      {relationshipToPatient.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Assessment Date:</span>
                  <p className="font-semibold text-gray-900">{currentDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Questions Completed:</span>
                  <p className="font-semibold text-gray-900">{totalQuestions} of {totalQuestions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Result Hero Section */}
          <div className={`${result.bgColor} rounded-xl p-6 border-2 ${result.borderColor}`}>
            <div className="flex items-start space-x-4">
              <div className={`p-4 ${result.bgColor} rounded-full border-2 ${result.borderColor}`}>
                <ResultIcon className={`w-8 h-8 text-${result.color}-600`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-sm font-semibold text-${result.color}-700 uppercase tracking-wide`}>
                    Assessment Result
                  </span>
                </div>
                <h3 className={`text-2xl font-bold text-${result.color}-900 mb-2`}>
                  {result.severity}
                </h3>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border-2 ${result.borderColor} mb-4`}>
                  <AlertTriangle className={`w-4 h-4 text-${result.color}-600`} />
                  <span className={`text-sm font-semibold text-${result.color}-700`}>
                    {result.urgency}
                  </span>
                </div>
                <p className={`text-${result.color}-800 leading-relaxed`}>
                  {result.message}
                </p>
              </div>
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Assessment Score</span>
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Concern Score</p>
                <p className="text-3xl font-bold text-gray-900">{score} points</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${result.color}-100 text-${result.color}-700 border border-${result.color}-200`}>
                  {result.severity}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>About this score:</strong> This assessment combines elements from the AD8 
                (Eight-item Informant Interview) and GPCOG (General Practitioner Assessment of Cognition) 
                screening tools. Higher scores indicate more concerning cognitive changes that warrant 
                professional evaluation.
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`bg-white rounded-lg p-5 border-2 ${result.borderColor}`}>
            <h3 className={`font-bold mb-3 flex items-center space-x-2 text-${result.color}-900`}>
              <Phone className="w-5 h-5" />
              <span>Professional Recommendation</span>
            </h3>
            <p className={`text-${result.color}-800 leading-relaxed mb-4`}>
              {result.recommendation}
            </p>
            <div className={`bg-${result.color}-50 rounded-lg p-4 border ${result.borderColor}`}>
              <h4 className={`font-semibold text-${result.color}-900 mb-3`}>Recommended Next Steps:</h4>
              <ul className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <ChevronRight className={`w-4 h-4 mt-0.5 text-${result.color}-600 flex-shrink-0`} />
                    <span className={`text-sm text-${result.color}-800`}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-amber-50 rounded-lg p-5 border-2 border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">Important Disclaimer</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  This screening tool is designed to help identify cognitive changes that may warrant professional 
                  evaluation. <strong>It is not a diagnostic tool and cannot diagnose dementia.</strong> Only a 
                  qualified healthcare professional can provide a proper diagnosis after comprehensive evaluation. 
                  If you have concerns about cognitive changes, please consult with a physician, neurologist, 
                  geriatrician, or memory specialist.
                </p>
              </div>
            </div>
          </div>

          {/* Email Report Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>Share This Report</span>
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Enter your email address to receive a copy of this assessment report. You can share it with 
              healthcare providers during consultations.
            </p>
            <div className="flex space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSendReport}
                disabled={isSaving || !email || emailSent || !patientName}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                  isSaving
                    ? 'bg-emerald-500 text-white'
                    : email
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Send Report</span>
                  </>
                )}
              </button>
            </div>
            {emailSent && (
              <p className="text-sm text-emerald-600 mt-2 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Report sent successfully to {email}</span>
              </p>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold text-gray-900">Need Help Navigating Care Options?</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Our care specialists can help you understand these results and connect you with appropriate 
                  resources, from finding memory specialists to exploring care options for your loved one.
                </p>
              </div>
              <a
                href="https://meetings.hubspot.com/olu-adedeji"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/50 font-semibold whitespace-nowrap flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DementiaAssessmentModal;
