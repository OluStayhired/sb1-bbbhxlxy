// src/components/DementiaAssessment.tsx
import React, { useState } from 'react';
import { 
  Brain, 
  ClipboardCheck, 
  AlertTriangle,
  Info,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Heart
} from 'lucide-react';
import { DementiaAssessmentModal } from './DementiaAssessmentModal';

interface AssessmentQuestion {
  id: string;
  category: 'memory' | 'judgment' | 'function' | 'orientation' | 'language';
  question: string;
  helpText?: string;
  options: Array<{ value: string; label: string; score: number }>;
}

interface AssessmentAnswers {
  [key: string]: string;
}

export function DementiaAssessment() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'review'>('intro');
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showModal, setShowModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [relationshipToPatient, setRelationshipToPatient] = useState('');

  // Combined questions based on AD8 and GPCOG-Part 2
  const questions: AssessmentQuestion[] = [
    // Memory & Cognitive Function (AD8-inspired)
    {
      id: 'q1',
      category: 'memory',
      question: 'Does the person have problems with memory or thinking?',
      helpText: 'Consider if they repeat questions, forget recent conversations, or lose track of important dates.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q2',
      category: 'memory',
      question: 'Does the person repeat the same question, story, or statement multiple times during the same day?',
      helpText: 'This indicates short-term memory difficulties.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q3',
      category: 'function',
      question: 'Has the person had difficulty managing their finances (e.g., paying bills, managing bank accounts)?',
      helpText: 'Look for unpaid bills, unusual purchases, or confusion with money.',
      options: [
        { value: 'no_difficulty', label: 'No difficulty', score: 0 },
        { value: 'some_difficulty', label: 'Some difficulty', score: 1 },
        { value: 'significant_difficulty', label: 'Significant difficulty or unable to do', score: 2 }
      ]
    },
    {
      id: 'q4',
      category: 'function',
      question: 'Does the person have trouble managing their medications independently?',
      helpText: 'Missing doses, taking wrong amounts, or confusion about medication schedule.',
      options: [
        { value: 'no_difficulty', label: 'No difficulty', score: 0 },
        { value: 'some_difficulty', label: 'Some difficulty', score: 1 },
        { value: 'significant_difficulty', label: 'Significant difficulty or unable to do', score: 2 }
      ]
    },
    {
      id: 'q5',
      category: 'function',
      question: 'Does the person have trouble using common household appliances or technology they previously used without difficulty?',
      helpText: 'Examples: phone, TV remote, microwave, coffee maker.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q6',
      category: 'judgment',
      question: 'Has the person shown poor judgment or made decisions that seem unusual or risky?',
      helpText: 'Such as giving money to strangers, falling for scams, or unsafe behaviors.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q7',
      category: 'function',
      question: 'Has the person lost interest in hobbies, activities, or social engagements they previously enjoyed?',
      helpText: 'Withdrawal from activities may indicate cognitive or emotional changes.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q8',
      category: 'orientation',
      question: 'Does the person have difficulty finding their way in familiar places (e.g., their neighborhood, regularly visited stores)?',
      helpText: 'Getting lost or disoriented in places they know well.',
      options: [
        { value: 'no_difficulty', label: 'No difficulty', score: 0 },
        { value: 'some_difficulty', label: 'Some difficulty', score: 1 },
        { value: 'significant_difficulty', label: 'Significant difficulty', score: 2 }
      ]
    },
    {
      id: 'q9',
      category: 'language',
      question: 'Does the person have trouble finding the right words or names for familiar objects or people?',
      helpText: 'Word-finding difficulties, using wrong words, or calling things by incorrect names.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q10',
      category: 'function',
      question: 'Does the person need help with transportation (driving or arranging to go places)?',
      helpText: 'Consider if they have stopped driving, gotten lost while driving, or need assistance arranging travel.',
      options: [
        { value: 'no_difficulty', label: 'No difficulty', score: 0 },
        { value: 'some_difficulty', label: 'Some difficulty', score: 1 },
        { value: 'significant_difficulty', label: 'Significant difficulty or unable to do', score: 2 }
      ]
    },
    {
      id: 'q11',
      category: 'memory',
      question: 'Does the person forget important dates, appointments, or family events?',
      helpText: 'Missing scheduled appointments, forgetting birthdays, or losing track of important dates.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    },
    {
      id: 'q12',
      category: 'function',
      question: 'Has there been a change in the person\'s ability to complete familiar tasks at home or work?',
      helpText: 'Tasks they have done for years now take longer or are done incorrectly.',
      options: [
        { value: 'no_change', label: 'No change from before', score: 0 },
        { value: 'yes_change', label: 'Yes, a noticeable change', score: 1 }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
      }
    });
    return totalScore;
  };

  const getAssessmentResult = () => {
    const score = calculateScore();
    const maxScore = questions.reduce((sum, q) => {
      const maxOptionScore = Math.max(...q.options.map(o => o.score));
      return sum + maxOptionScore;
    }, 0);

    // Risk assessment based on scoring thresholds
    // AD8: 2+ indicates concern; GPCOG: 0-3 out of 6 indicates impairment
    // Our combined scale: adjusted for 12 questions with mixed scoring
    
    if (score >= 10) {
      return {
        level: 'high',
        severity: 'High Concern',
        urgency: 'Immediate Professional Assessment Recommended',
        color: 'rose',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        textColor: 'text-rose-900',
        message: 'The assessment indicates significant cognitive changes that warrant immediate evaluation by a healthcare professional. These changes suggest possible dementia or other serious cognitive impairment.',
        recommendation: 'Schedule an appointment with a neurologist, geriatrician, or memory specialist within the next 1-2 weeks. Early diagnosis is crucial for accessing treatment, planning care, and addressing safety concerns.',
        nextSteps: [
          'Contact their primary care physician immediately to request a referral',
          'Document specific incidents and changes you\'ve noticed',
          'Arrange for someone to accompany them to appointments',
          'Begin researching local memory care resources and support groups'
        ]
      };
    } else if (score >= 6) {
      return {
        level: 'moderate',
        severity: 'Moderate Concern',
        urgency: 'Professional Evaluation Advised Soon',
        color: 'amber',
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-900',
        message: 'The assessment shows noticeable cognitive changes that should be evaluated by a healthcare provider. While not an emergency, these changes merit professional attention to determine the cause and appropriate interventions.',
        recommendation: 'Schedule a comprehensive cognitive evaluation with their primary care doctor or a specialist within the next 2-4 weeks. Many cognitive changes are treatable if identified early.',
        nextSteps: [
          'Make an appointment with their primary care physician',
          'Keep a journal of specific examples of concerning behaviors',
          'Review all current medications with their doctor (some cause cognitive side effects)',
          'Consider a baseline cognitive assessment to track future changes'
        ]
      };
    } else if (score >= 3) {
      return {
        level: 'mild',
        severity: 'Mild Concern',
        urgency: 'Monitoring and Check-up Recommended',
        color: 'blue',
        icon: Info,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-900',
        message: 'The assessment indicates some cognitive changes that could be related to normal aging, but should be monitored. A professional evaluation can help distinguish normal age-related changes from early signs of dementia.',
        recommendation: 'Discuss these observations with their primary care doctor at the next routine visit, or schedule a check-up within the next 1-2 months. Continue monitoring for any progression of symptoms.',
        nextSteps: [
          'Bring this assessment to their next doctor\'s appointment',
          'Monitor for any worsening or new symptoms over the next few months',
          'Encourage mentally stimulating activities and social engagement',
          'Ensure they are maintaining overall health (sleep, nutrition, exercise)'
        ]
      };
    } else {
      return {
        level: 'low',
        severity: 'Low Concern',
        urgency: 'Continue Normal Monitoring',
        color: 'emerald',
        icon: CheckCircle2,
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-900',
        message: 'The assessment does not indicate significant cognitive concerns at this time. The person appears to be functioning well cognitively, consistent with healthy aging.',
        recommendation: 'Continue with regular health check-ups and maintain awareness of any future changes. Preventive measures like staying mentally and physically active, maintaining social connections, and managing chronic health conditions are beneficial.',
        nextSteps: [
          'Maintain regular annual check-ups with their primary care physician',
          'Encourage continued engagement in mentally stimulating activities',
          'Support healthy lifestyle habits (exercise, balanced diet, social activities)',
          'Stay alert to any future changes and reassess if concerns develop'
        ]
      };
    }
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id]);
  const completedCount = Object.keys(answers).length;
  const progressPercentage = (completedCount / questions.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'memory': return <Brain className="w-4 h-4" />;
      case 'judgment': return <AlertTriangle className="w-4 h-4" />;
      case 'function': return <ClipboardCheck className="w-4 h-4" />;
      case 'orientation': return <ChevronRight className="w-4 h-4" />;
      case 'language': return <Clock className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const renderIntroScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-8 border border-red-100">
        <div className="flex items-start space-x-4">
          <div className="p-2 sm:p-3 bg-red-100 rounded-full">
            <Brain className="w-5 h-5 sm:w-8 sm:h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This questionnaire is designed to help caregivers and family members identify potential early signs 
              of dementia or cognitive changes in their loved ones. Based on validated screening tools (AD8 and 
              GPCOG), this assessment takes about 5-10 minutes to complete.
            </p>
            <div className="bg-white shadow shadow-2xl rounded-lg p-4 border border-red-100">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <Info className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Important Information</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white fill-red-500 mt-0.5 flex-shrink-0" />
                  <span>Compare the person's current abilities to how they functioned 3-5 years ago</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white fill-red-500 mt-0.5 flex-shrink-0" />
                  <span>Answer based on your observations as a caregiver or close family member</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white fill-red-500 mt-0.5 flex-shrink-0" />
                  <span>This is a screening tool only - not a diagnosis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white fill-red-500 mt-0.5 flex-shrink-0" />
                  <span>The results will include recommendations on whether professional evaluation is needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-red-300">
        <h3 className="font-semibold text-gray-900 mb-4">Before You Begin</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient's Name (Optional)
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient's name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Relationship to Patient
            </label>
            <select
              value={relationshipToPatient}
              onChange={(e) => setRelationshipToPatient(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select relationship</option>
              <option value="spouse">Spouse/Partner</option>
              <option value="adult_child">Adult Child</option>
              <option value="sibling">Sibling</option>
              <option value="caregiver">Professional Caregiver</option>
              <option value="other_family">Other Family Member</option>
              <option value="friend">Friend</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentStep('questions')}
        className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 font-semibold"
      >
        <span>Begin Assessment</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderQuestionsScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completedCount} of {questions.length} questions
          </span>
          <span className="text-sm font-semibold text-red-600">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`bg-white rounded-xl p-6 border-2 transition-all ${
              answers[question.id]
                ? 'border-red-200 bg-red-50/30'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-red-600">{getCategoryIcon(question.category)}</span>
                  <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
                    {question.category.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {question.question}
                </h4>
                {question.helpText && (
                  <p className="text-sm text-gray-600 mb-4 flex items-start space-x-2">
                    <Info className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span>{question.helpText}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 ml-11">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[question.id] === option.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-4 h-4 text-red-600 accent-red-600 border-gray-300 focus:ring-red-500"
                  />
                  <span className={`text-sm font-medium ${
                    answers[question.id] === option.value ? 'text-red-900' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report Button */}
      <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 pb-4">
        <button
          onClick={() => setShowModal(true)}
          disabled={!allQuestionsAnswered}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all ${
            allQuestionsAnswered
              ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          <span>Generate Assessment Report</span>
        </button>
        {!allQuestionsAnswered && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Please answer all questions to generate your report
          </p>
        )}
      </div>
    </div>
  );

  return (
    /*<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">*/
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/*
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-4">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Cognitive Assessment Tool</span>
          </div>
          */}
          {/*
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Early Dementia Screening Assessment
          </h1>
          <p className="text-lg text-gray-600">
            A validated caregiver questionnaire to identify cognitive changes
          </p>
          
        </div>
        */}

        {/* Content */}
        {currentStep === 'intro' && renderIntroScreen()}
        {currentStep === 'questions' && renderQuestionsScreen()}

        {/* Modal */}
        {showModal && (
          <DementiaAssessmentModal
            result={getAssessmentResult()}
            score={calculateScore()}
            totalQuestions={questions.length}
            patientName={patientName}
            relationshipToPatient={relationshipToPatient}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default DementiaAssessment;