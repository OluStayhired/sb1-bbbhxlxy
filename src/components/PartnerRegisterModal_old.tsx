import React, { useState } from 'react';
import { X, CheckCircle, Briefcase, MapPin, TrendingUp, Award, Handshake } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import LinkedInSolidLogo from '../images/linkedin-solid-logo.svg';

interface PartnerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// State to Region mapping
const stateToRegionMap: Record<string, string> = {
  // Northeast
  'CT': 'Northeast', 'ME': 'Northeast', 'MA': 'Northeast', 'NH': 'Northeast', 
  'RI': 'Northeast', 'VT': 'Northeast', 'NJ': 'Northeast', 'NY': 'Northeast', 
  'PA': 'Northeast',

  // Midwest
  'IL': 'Midwest', 'IN': 'Midwest', 'IA': 'Midwest', 'KS': 'Midwest', 
  'MI': 'Midwest', 'MN': 'Midwest', 'MS': 'Midwest', 'NE': 'Midwest', 
  'ND': 'Midwest', 'OH': 'Midwest', 'SD': 'Midwest', 'WI': 'Midwest',

  // South
  'AL': 'South', 'AR': 'South', 'DE': 'South', 'FL': 'South', 'GA': 'South', 
  'KY': 'South', 'LA': 'South', 'MD': 'South', 'NC': 'South', 'OK': 'South', 
  'SC': 'South', 'TN': 'South', 'TX': 'South', 'VA': 'South', 'WV': 'South', 
  'DC': 'South',

  // West
  'AK': 'West', 'AZ': 'West', 'CA': 'West', 'CO': 'West', 'HI': 'West', 
  'ID': 'West', 'MT': 'West', 'NV': 'West', 'NM': 'West', 'OR': 'West', 
  'UT': 'West', 'WA': 'West', 'WY': 'West'
};

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];

const professionalProfiles = [
  'Senior Placement Agent',
  'Elder Law Attorney',
  'Fiduciary / Care Manager',
  'Estate Planner'
];

const caseVolumes = [
  '1–2 (Emerging)',
  '3–5 (Established)',
  '6–10 (High Volume)',
  '10+ (Enterprise)'
];

const partnerSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'Name must be at least 2 characters'),
  linkedinProfile: z.string()
    .url('LinkedIn URL must be a valid URL')
    .refine(
      (val) => val.includes('linkedin.com/in/'),
      'LinkedIn URL must be a profile link (e.g., https://www.linkedin.com/in/yourprofile)'
    ),
  usState: z.string().min(2, 'Please select a state'),
  professionalProfile: z.string().min(1, 'Please select a professional profile'),
  caseVolume: z.string().min(1, 'Please select a case volume')
});

export function PartnerRegisterModal({ isOpen, onClose }: PartnerRegisterModalProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [usState, setUsState] = useState('');
  const [professionalProfile, setProfessionalProfile] = useState('');
  const [caseVolume, setCaseVolume] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  if (!isOpen) return null;

  const resetFormAndModal = () => {
    setEmail('');
    setFirstName('');
    setLinkedinProfile('');
    setUsState('');
    setProfessionalProfile('');
    setCaseVolume('');
    setError('');
    setLoading(false);
    setShowSuccessScreen(false);
    onClose();
  };

  const handlePartnerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input using Zod
      partnerSchema.parse({ 
        email, 
        firstName, 
        linkedinProfile, 
        usState, 
        professionalProfile, 
        caseVolume 
      });

      // Auto-map region based on state
      const usRegion = stateToRegionMap[usState] || 'Unknown';

      // Insert data into supabase partner_register table
      const { error: supabaseError } = await supabase.from('partner_register').insert({
        email: email,
        first_name: firstName,
        linkedin_profile: linkedinProfile,
        us_state: usState,
        us_region: usRegion,
        customer_type: professionalProfile,
        placement_vol: caseVolume,
        project_name: 'GTM Phase 1',
        email_sent: false,
        approved: false
      });

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("You're already registered as a partner!");
        } else {
          console.error("Supabase Error:", supabaseError);
          setError(`Failed to register: ${supabaseError.message || 'An unexpected database error occurred.'}`);
        }
        return;
      }

      // On successful insertion, show the success screen
      setShowSuccessScreen(true);

    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetFormAndModal}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {showSuccessScreen ? (
          // Success Screen Content
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-200/50">
              <CheckCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Aboard!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              You've successfully registered as a Poetiq Partner.<br />
              <span className="font-semibold text-red-600">Expect an email soon with next steps!</span>
            </p>
            <button
              onClick={resetFormAndModal}
              className="px-8 py-3 border border-transparent rounded-lg shadow-lg shadow-red-500/40 hover:shadow-red-500/60 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          // Registration Form Content
          <>
            {/* Header */}
            <div className="text-center mb-8">
              {/*
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mb-4">
                <Handshake className="w-9 h-9 text-red-500" />
              </div>
              */}
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                Partner with <span className="text-red-500">Poetiq</span>
              </h2>
              <p className="text-gray-600 text-base max-w-xl mx-auto">
                Join a network of eldercare professionals simplifying long-term care solutions
              </p>
            </div>

            {/* Data Privacy Note */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-red-600">Your data helps us serve you better.</span> We use this information solely to match you with the most relevant cases and resources in your region.
                </p>
              </div>
            </div>

            <form onSubmit={handlePartnerRegister} className="space-y-5">
              {/* Email and Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="your.email@example.com"
                    className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    placeholder="John"
                    className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white"
                    required
                  />
                </div>
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label htmlFor="linkedinProfile" className="block text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                  LinkedIn Profile{' '}
                  <img src={LinkedInSolidLogo} alt="LinkedIn" className="inline-block rounded-sm w-3.5 h-3.5 align-middle ml-1" />
                </label>
                <input
                  type="url"
                  id="linkedinProfile"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  disabled={loading}
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white"
                  required
                />
              </div>

              {/* Professional Profile and State Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="professionalProfile" className="flex items-center text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                    <Briefcase className="w-4 h-4 mr-1.5 text-red-500" />
                    Professional Profile
                  </label>
                  <select
                    id="professionalProfile"
                    value={professionalProfile}
                    onChange={(e) => setProfessionalProfile(e.target.value)}
                    disabled={loading}
                    className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select profile</option>
                    {professionalProfiles.map((profile) => (
                      <option key={profile} value={profile}>
                        {profile}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="usState" className="flex items-center text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 mr-1.5 text-red-500" />
                    US State
                  </label>
                  <select
                    id="usState"
                    value={usState}
                    onChange={(e) => setUsState(e.target.value)}
                    disabled={loading}
                    className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select state</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Case Volume */}
              <div>
                <label htmlFor="caseVolume" className="flex items-center text-left px-1 text-sm font-semibold text-gray-700 mb-1">
                  <TrendingUp className="w-4 h-4 mr-1.5 text-red-500" />
                  Monthly Case Volume
                </label>
                <select
                  id="caseVolume"
                  value={caseVolume}
                  onChange={(e) => setCaseVolume(e.target.value)}
                  disabled={loading}
                  className="text-left text-sm px-3 py-2.5 block w-full rounded-lg border-2 border-red-100 hover:border-red-200 outline-none focus:border-red-500 focus:ring-0 transition-colors bg-white cursor-pointer"
                  required
                >
                  <option value="">Select volume</option>
                  {caseVolumes.map((volume) => (
                    <option key={volume} value={volume}>
                      {volume}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Display (Auto-calculated) */}
              {usState && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Your Region:</span>
                    <span className="text-sm font-bold text-red-600 bg-white px-3 py-1 rounded-full border border-red-200">
                      {stateToRegionMap[usState]}
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 border border-transparent rounded-lg text-base font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    'Register as Partner'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
