import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Calendar, PenSquare, Clock, Users, PenTool, Briefcase, Plus, Minus,Menu, MailCheck,
  Bot, CheckCircle,X, Send,Timer, Zap, ArrowRight, HeartPulse, Brain, MapPin, Target,
  Lightbulb, Sparkles, CircleDollarSign, Star, Search, Activity, FileText, Shield, TrendingUp, ShieldAlert, User, CheckCircle2, Headset, Dumbbell, UserSearch, DatabaseZap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';
import BlueskyLogo from '../images/bluesky-logo.svg';
import BlueskyLogoWhite from '../images/bluesky-logo-white.svg';
import LinkedInLogo from '../images/linkedin-logo.svg';
import LinkedInSolidLogo from '../images/linkedin-solid-logo.svg';
import LinkedInSolidLogoWhite from '../images/linkedin-solid-logo-white.svg';
import XLogo from '../images/x-logo.svg';
import googleLogo from '../images/google-logo-48.svg';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import { WaitlistModal } from '../components/WaitlistModal.tsx';
import { NewsletterModal } from '../components/NewsletterModal.tsx';
import { CommunityModal } from '../components/CommunityModal.tsx';
import { Link } from 'react-router-dom';
import { OurStoryTimeline } from '../components/OurStoryTimeline';
import { EligibilityModal } from '../components/EligibilityModal.tsx';
import { StressCoachModal } from '../components/StressCoachModal.tsx';
import { MentallyBroken } from '../components/MentallyBroken.tsx';
import { NavigateSystems } from '../components/NavigateSystems.tsx';
import { ConsumedByBills } from '../components/ConsumedByBills.tsx';
import { CareerOpps } from '../components/CareerOpps';
import { BrokenByFamily } from '../components/BrokenByFamily';
import { OnCallStress } from '../components/OnCallStress';
import { TooltipHelp } from '/src/utils/TooltipHelp';

// Add to imports at the top
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';

import { EldercareGapDashboardModal } from '../components/EldercareGapDashboardModal';  // ADD THIS LINE







function LandingPageDev() {
  const navigate = useNavigate();
  //const { isAuthenticated } = useAuth();
  const { signIn } = useAuth();
  const { signInWithGoogle } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isNewsletterSuccessModalOpen, setIsNewsletterSuccessModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isCommunitySuccessModalOpen, setIsCommunitySuccessModalOpen] = useState(false);

  // Constants for the AI Assistants
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isStressCoachModalOpen, setIsStressCoachModalOpen] = useState(false);
 
  // Add state near line 28 with other modal states
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);  // ADD THIS LINE


  //constants for the grid buttons
  const [isMentallyBrokenModalOpen, setIsMentallyBrokenModalOpen] = useState(false);
  const [isNavigateSystemsModalOpen, setIsNavigateSystemsModalOpen] = useState(false);
  const [isConsumedByBillsModalOpen, setIsConsumedByBillsModalOpen] = useState(false);
  const [isCareerOppsModalOpen, setIsCareerOppsModalOpen] = useState(false);
  const [isBrokenByFamilyModalOpen, setIsBrokenByFamilyModalOpen] = useState(false);
  const [isOnCallStressModalOpen, setIsOnCallStressModalOpen] = useState(false);




const handleLoginClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = 'https://app.sosavvy.so/login';
  };

  const handleBlogClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = '/blog';
  };

   const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true);
  };

  const closeWaitlistModal = () => {
    setIsWaitlistModalOpen(false);
  };

  const openNewsletterModal = () => {
    setIsNewsletterModalOpen(true);
  };

    const closeNewsletterModal = () => {
    setIsNewsletterModalOpen(false);
  };

    const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };


    const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  // Open and Close constants for AI Modals
    const openEligibilityModal = () => {
  setIsEligibilityModalOpen(true);
};

    const closeEligibilityModal = () => {
  setIsEligibilityModalOpen(false);
};

   const openStressCoachModal = () => {
  setIsStressCoachModalOpen(true);
};

    const closeStressCoachModal = () => {
  setIsStressCoachModalOpen(false);
};

  //Open and Close const for 6 Scenarios Modal
  const openMentallyBrokenModal = () => {
  setIsMentallyBrokenModalOpen(true);
};

const closeMentallyBrokenModal = () => {
  setIsMentallyBrokenModalOpen(false);
};

const handleMentallyBrokenToCommunity = () => {
  setIsMentallyBrokenModalOpen(false);
  setIsCommunityModalOpen(true);
};
  
const openNavigateSystemsModal = () => {
  setIsNavigateSystemsModalOpen(true);
};

const closeNavigateSystemsModal = () => {
  setIsNavigateSystemsModalOpen(false);
};

const handleNavigateSystemsToCommunity = () => {
  setIsNavigateSystemsModalOpen(false);
  setIsCommunityModalOpen(true);
};

const openConsumedByBillsModal = () => {
  setIsConsumedByBillsModalOpen(true);
};

const closeConsumedByBillsModal = () => {
  setIsConsumedByBillsModalOpen(false);
};

const handleConsumedByBillsToCommunity = () => {
  setIsConsumedByBillsModalOpen(false);
  setIsCommunityModalOpen(true);
};
  
const openCareerOppsModal = () => {
  setIsCareerOppsModalOpen(true);
};

const closeCareerOppsModal = () => {
  setIsCareerOppsModalOpen(false);
};

const handleCareerOppsToCommunity = () => {
  setIsCareerOppsModalOpen(false);
  setIsCommunityModalOpen(true);
};

  const openBrokenByFamilyModal = () => {
  setIsBrokenByFamilyModalOpen(true);
};

const closeBrokenByFamilyModal = () => {
  setIsBrokenByFamilyModalOpen(false);
};

const handleBrokenByFamilyToCommunity = () => {
  setIsBrokenByFamilyModalOpen(false);
  setIsCommunityModalOpen(true);
};

const openOnCallStressModal = () => {
  setIsOnCallStressModalOpen(true);
};

const closeOnCallStressModal = () => {
  setIsOnCallStressModalOpen(false);
};

const handleOnCallStressToCommunity = () => {
  setIsOnCallStressModalOpen(false);
  setIsCommunityModalOpen(true);
};

// Add modal open/close functions near line 54
const openOnboardingModal = () => {
  setIsOnboardingModalOpen(true);
};

const closeOnboardingModal = () => {
  setIsOnboardingModalOpen(false);
};  

const openDashboardModal = () => {
  setIsDashboardModalOpen(true);
};

const closeDashboardModal = () => {
  setIsDashboardModalOpen(false);
};  

  // GET SESSION ID FROM SESSION STORAGE
const getSessionId = (): string => {
  return sessionStorage.getItem('eldercare_session_id') || '';
};
  
  const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle(); // This would be the new function from AuthContext
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

  const handleEmailLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
  setIsAuthModalOpen(false);
  // Consider resetting any modal-related state here if needed
};

  
  return (
      <>

      <div id="top_page" className="min-h-screen bg-white">
        <nav className="px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">
        <a href="/dev">
        <div className="flex items-center space-x-2">

         <div className="bg-red-500 rounded-full p-1.5 sm:p-2">
            <HeartPulse className="h-7 w-7 fill-white stroke-red-500 sm:h-9 sm:w-9" />
          </div>
          <span className="text-2xl  font-bold text-red-500 sm:text-2xl">poetiq</span>
        </div>
        </a>
        {/*----------- Start Desktop Navigation Buttons ------------------*/}          
        <div className="hidden sm:flex items-center space-x-4">
          <div className="items-center flex justify-center space-x-2">

    {/*---------------------------- Start the new Mega-Width Dropdown Menu --------------------------*/}

            {/* START: Eldercare Tools Dropdown Menu */}
<div className="relative group">
  {/* Menu Header - Eldercare Tools */}
  <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
    Care Tools 🩺
  </button>

  {/* Mega Menu Dropdown - Full Width 3 Column */}
  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-5xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
    {/* Grid Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

      {/* Card 1: Readiness Audit*/}
      <div
        onClick={openOnboardingModal}
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-teal-200 cursor-pointer"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4 group-hover/card:bg-teal-200 transition-colors duration-300">
          <ShieldAlert className="w-7 h-7 text-teal-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-teal-600 transition-colors duration-300">
          Eldercare Gap Analyzer
        <CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center align-top text-white ml-1 inline"/>
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Identify legal and financial gaps in your parents' healthcare before a crisis hits. 
        </p>
      </div>


      {/* Card 2: Medicaid Co-Pilot */}
      <Link
        to="/dev/medicaid-co-pilot"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <HeartPulse className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Medicaid Assistant
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Navigate complex Long-Term Care Insurance eligibility issues in real-time. 
        </p>
      </Link>

       {/* Card 3: Conflict Coach */}
      <Link
        to="/dev/eldercare-stress-management"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <User className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Conflict Advisor
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Manage family disagreements empathetically without emotional drain. 
        </p>
      </Link>
      
      {/* Card 4: Caregiver Agency Finder */}
      <Link
        to="/dev/home-health-care"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <MapPin className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Caregivers Near Me
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Discover rated caregiving agencies close to you. Search 12,500 providers 
          
        </p>
      </Link>

      {/* Card 5: Nursing Home Finder */}
      <Link
        to="/dev/nursing-home"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <Search className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Nursing Home Finder
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Find highly-rated nursing homes and assisted living facilities in your area. 
        </p>
      </Link>

      {/* Card 6: Dementia Assessment Test */}
      <Link
        to="/dev/dementia-assessment"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <CheckCircle className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Dementia Assessment Test
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Take a comprehensive cognitive test to evaluate memory and thinking skills.
        </p>
      </Link>

    </div>
  </div>
</div>
{/* END: Eldercare Tools Dropdown Menu */}

{/*--------------------------- End the new Mega-Width Dropdown Menu -----------------------------*/}            

{/* ----------------------- START: Executive Services Dropdown Menu -----------------------*/}
<div className="relative group">
  {/* Menu Header - Executive Services */}
  <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
    Care Services ⚙️
  </button>

  {/* Mega Menu Dropdown - Full Width 3 Column Grid */}
  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-6xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
    {/* Grid Container - 6 items in 2 rows */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      
      {/* Card 1: Logistics Engine */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <Headset className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Virtual Eldercare Assistants
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Outsource "chaser" emails and phone marathons that stall your workday. Avoid the broken bureaucracy and insurance claims. Let us do the heavy lifting while you focus on work.  
        </p>
      </a>

      {/* Card 2: Financial Defense */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <Shield className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Financial & Legal Defense
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Access proprietary spend-down models and elite legal audits to protect your family from predatory care-home facility contracts. Your wages are not for paying eldercare bills.
        </p>
      </a>

      {/* Card 3: Career Protection */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <UserSearch className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Emergency Care
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Never miss a work event or travel opportunity with our emergency caregiver search service. Maintain your professional presence while ensuring mom and dad are safe.
        </p>
      </a>

      {/* Card 4: Family Advocacy */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <Dumbbell className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Mental Health Gym
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Join a confidential circle of peers and clinical coaches to share the mental stress of balancing work with eldercare support. A safe space to vent, discuss and resolve family conflicts. 
        </p>
      </a>

      {/* Card 5: Clinical Insight */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <DatabaseZap className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Eldercare Vault
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Replace fragmented unsecure personal data stores with structured searchable high-grade data vaults. Instantly connect personal, public and community insights for better decisions.  
        </p>
      </a>

      {/* Card 6: Tactical Response */}
      <a
        href="#OperationalSupport"
        className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
          <Zap className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
          Tactical Response Services
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Real-time support for the unplanned errands that keep you on high-alert. Activate standby assistance for hospital transport and pharmacy runs so you can finish that sales presentation.
        </p>
      </a>

    </div>
  </div>
</div>
{/* ---------------------END Executive Services Dropdown Menu --------------------*/}

            
              <button
              onClick={() => {
              window.location.href = '#Community';
              }}
              className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                Community 🧡
              </button> 

             <button
                onClick={() => {
                window.location.href = '#our_story';
              }}
            className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Our Story 👋
            </button> 
       
          <button
            onClick={() => {
              window.location.href = '#FAQ';
              }}
              className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
>
            FAQ ❓
          </button> 
           
     
      </div> 
          
          
          <button
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors              
            shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group"
          >
           <span>Get Started</span>
           <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
               
        </div>
  {/*---------------- End Desktop Navigation Menu --------------*/}    
        
     {/* Mobile Menu Button (Hamburger) (Visible on mobile, hidden on sm and up) */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
          

 {/* -------------  Start Mobile Menu Overlay ----------------- */}
      {/* This part of the code is generally correct for the overlay. */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-4 py-6"> 

          {/* START: Eldercare Tools Dropdown Menu */}
              <div className="relative group">
                {/* Menu Header - Eldercare Tools */}
                <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Care Tools 🩺
                  </button>

                    {/* Dropdown Content - Hidden by default, shown on group hover */}
                    <div
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 transition-opacity duration-150 ease-out"
      >
                        <div className="py-1">
                          {/* Caregivers Near Me */}
                            <Link
                                to="/dev/home-health-care"
                                className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                              >
                              <MapPin className="w-3.5 h-3.5" />
                                <span>Find Caregivers</span>
                            </Link>
                            {/* Nursing Home Finder */}
                              <Link
                                  to="/dev/nursing-home"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                  <Search className="w-3.5 h-3.5" />
                                  <span>Search Nursing Homes</span>
                              </Link>

                              <Link 
                                  to="/dev/dementia-assessment"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Take Dementia Assessment</span>
                              </Link>
                          </div>
                        </div>
                      </div>
                      {/* END: Eldercare Tools Dropdown Menu */}
         
          
          <button
            onClick={() => {
              window.location.href = '#Community';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Community 🧡
          </button>
           
          <button
            onClick={() => {
              window.location.href = '#our_story';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Our Story 👋
          </button>

          <button
            onClick={() => {
              window.location.href = '#OperationalSupport';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Care Services ⚙️
          </button>
          {/*
          <button
            onClick={() => {
              window.location.href = '#testimonial';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Testimonials
          </button>
        */}
          <button
            onClick={() => {
              window.location.href = '#FAQ';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            FAQ ❓
          </button>
          {/*
          <button
            onClick={() => {
              window.location.href = '#pricing';
              setIsMobileMenuOpen(false);           
              }}
              className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Pricing
          </button>
          */}
          {/* Close button within the overlay */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Close navigation"
          >
            <X className="h-6 w-6" />
          </button>
          
          <button
            onClick={openCommunityModal}
            className="group flex items-center justify-center space-x-2 w-1/2 sm:w-auto p-4 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg">
           
           <span>Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        
        </div>
      )}

    {/*---------------- End Mobile Menu -------------------- */}          
        
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 rounded-lg">
   
        <span className="sm:hidden text-xs sm:text-lg p-3 font-semibold bg-red-100 rounded-full text-red-500 border-8 border-red-50">    
          Eldercare Planning For Career Professionals
        </span>

      <span className="hidden sm:inline text-xs sm:text-lg p-3 font-semibold bg-red-100 hover:bg-red-200 hover:text-red-600 rounded-full text-red-500 border-8 border-red-50 duration-500">Eldercare Planning For Career Professionals</span>

               
          
           {/*start alternative header */}
    

           {/*start alternative header */}
           <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl leading-tight font-bold mb-2 sm:mb-3"> 
            <p>
              <span className="inline-block bg-gradient-to-l from-red-300 via-red-400 to-red-500 text-transparent bg-clip-text mt-6">
              
                {/* This is the key change! */}

                Eldercare Protection <br className="sm:hidden" /> Planner <br className="hidden sm:block"/>
                
       <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-3">
         
             <span className="sm:hidden font-normal">Get legal and financial documents in place for mom and dad before a health crisis hits.</span> 

          <span className="hidden text-2xl sm:inline font-normal">

          Get legal and financial documents in place for mom and dad before a health crisis hits.
            
          </span>
         
         </p>
                
              </span>
            </p>

            <p className="flex hidden text-red-400 sm:inline mt-4 sm:text-2xl md:text-2xl text-gray-600 sm:font-bold mb-8 sm:mb-10">
              Simple 👌 Organized ⏰ Stress-Free ⚡
              
              {/*Simple<span><CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center text-white inline"/></span>Organized<span><CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center text-white inline"/></span>Stress-Free<span><CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center text-white inline"/></span>
              */}
            
            </p>
          </h1>
          {/*end alternative header*/}


{/*------------------- Start Images Added for Effect -----------------------------*/}

 {/* Background Images - Absolutely positioned for "scattered" effect with animations */}
      {/* IMPORTANT: These images now have a higher z-index (z-30) to appear on top of the content div (z-20) */}
      {/* Replace placeholder URLs with your actual image URLs (e.g., from Supabase)  */}

      {/* Image 1: Top-left, floating circle */}
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sign_lpa_v2.png"
        //alt="Abstract blue shape"
        className="hidden sm:block absolute top-8 left-1/4 animate-float opacity-90 w-40 h-40 sm:w-40 sm:h-40 rounded-md  z-30"
        style={{ animationDelay: '0s', animationDuration: '6s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sign_lpa_v2.png"; }}
      />
      {/* Image 2: Bottom-right, floating rounded rectangle 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/investor_image.png"
        alt="Abstract pink shape"
        className="hidden sm:block absolute bottom-16 right-1/4 animate-float opacity-80 w-32 h-32 sm:w-32 sm:h-32 rounded-xl transform rotate-12 z-30"
        style={{ animationDelay: '2s', animationDuration: '7s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/investor_image.png"; }}
      />
      */}
      {/* Image 3: Mid-right, smaller floating circle */}
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/funding_status.png"
        alt="Abstract green shape"
        className="hidden sm:block absolute top-1/3 right-10 animate-float opacity-90 w-36 h-36 sm:w-40 sm:h-40 rounded-md z-30"
        style={{ animationDelay: '4s', animationDuration: '5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/funding_status.png"; }}
      />
        {/* Image 4: Bottom-left, larger floating rectangle 
        <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/the_startup_founder.png"
        alt="Abstract orange shape"
        className="hidden sm:block absolute bottom-12 left-1/4 animate-float opacity-80 w-40 h-40 sm:w-40 sm:h-40 rounded-xl transform -rotate-6 z-30"
        style={{ animationDelay: '1s', animationDuration: '8s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/the_startup_founder.png"; }}
      />
      */}
      {/* Image 5: Mid-left, medium floating circle */}
      <img
        
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/proof_of_id_v2.png"
        alt="Abstract red shape"
        className="hidden sm:block absolute top-1/2 left-10 transform -translate-y-1/2 animate-float opacity-90 w-28 h-28 sm:w-40 sm:h-40 rounded-full z-30"
        style={{ animationDelay: '3s', animationDuration: '6.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/proof_of_id_v2.png"; }}
      />
      {/* Image 6: Top-right, smaller floating shape (rounded-lg rotated 45deg for a diamond look) */}
      <img
        //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/law_practice_owner.png"
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/capital_at_risk.png"
        alt="Abstract purple shape"
        className="hidden sm:block absolute top-16 right-1/4 animate-float opacity-90 w-46 h-46 sm:w-40 sm:h-40 rounded-lg transform rotate-15 z-30"
        style={{ animationDelay: '5s', animationDuration: '5.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/capital_at_risk.png"; }}
      />

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg); /* Move up and slightly rotate */
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite; /* Keeps repeating indefinitely */
          animation-timing-function: ease-in-out; /* Smooth start and end */
          animation-direction: alternate; /* Plays forward then backward for a smooth loop */
        }
      `}</style>



        
{/*-------------------- End images Added for effect -----------------------------*/}          

{/*---------------- Start Adding the main hero image ------------------*/}    

<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    {/* Adjusted button layout for mobile */}          
<div className="mt-12 mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
  <button
    onClick={openOnboardingModal}
    type="submit"
    className="flex items-center space-x-2 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-10 shadow-red-500/60 hover:shadow-red-500/80 group"
  >    
    <span className="hidden sm:inline"> Get Started for Free </span>
    <span className="sm:hidden items-center"> Get Started for Free </span>
    <span><ArrowRight className="w-4 h-4 sm:w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></span>  
  </button>
</div> 
</div>  

{/*------------ start poetiq image design image ----------------------*/}

<div className="hidden sm:inline mt-12 mb-8 w-full max-w-6xl mx-auto px-4">

<div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 hover:shadow-red-500/60 group">
  
  <img   
    src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v2.png"
    alt="Poetiq Community"
    className="w-full h-auto rounded-2xl object-cover"
  />
  
  
</div>   

</div> 

{/*---------- end poetiq main image design image ----------------------------*/}        


{/*----------- starting adding main hero image (mobile)-----------*/}          

{/*Image for Mobile Devices*/}
<div className="sm:hidden w-full p-4 mt-2">
  <div className="grid grid-cols-1 h-[450px]">
     {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1">
          <div className="relative overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105  h-full group">
            <img
              src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_small_v2.png"
              alt="Caregivers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    </div>
  </div>

{/*------------ end adding main hero image (mobile) --------------*/}             

          
          
          <p className="hidden sm:block text-center text-gray-700 font-bold text-xl sm:text-2xl text-gray-600 mx-auto">  
             Trusted by <b className="text-red-400">120+ Family Caregivers</b> Actively Supporting Elderly Parents
          </p>  

          <p className="sm:hidden text-xs text-center text-gray-700 font-semibold text-xl sm:text-2xl text-gray-600 mx-auto">  
            Trusted by <b className="text-red-400">120+ Family Members</b> <br/> Supporting Elderly Parents
          </p> 

          {/*--------------- start Social Proof Section ---------------- */}
          <div className="justify-center relative flex items-center sm:gap-6 gap-2 mt-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                  className="hidden sm:block w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 4"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="User 5"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=6"
                  alt="User 6"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
          </div>

            {/* Stars and Text */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                    <p className="text-sm font-medium text-gray-700">1,200 hrs saved</p>
                </div>
            </div>


          {/*----- end social proof section here -------------*/}          

          
          
{/*------------ end new poetiq dashboard image --------------------------*/}

{/*          
<div className="hidden sm:inline mt-12 mb-8 w-full max-w-6xl mx-auto px-4">

<div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 group">
  
  <img   
    src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v1.png"
    alt="Poetiq Community"
    className="w-full h-auto rounded-2xl object-cover"
  />
  
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
  
</div> 

  {/* Video Template  
<div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
   <video
              //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-videos/sosavvy_video_no_intro.mp4"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/readiness_dashboard.mp4"
              poster="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-videos/sosavvy_video_cover_image.png"
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls           // Shows playback controls (play/pause, volume, fullscreen)
              //autoPlay           // Starts playing automatically (often requires 'muted')
              loop               // Loops the video automatically
              muted              // Essential for autoplay to work in most browsers
              playsInline        // Recommended for mobile browsers to play video inline
      >
    
             
             </video>   
</div>
// end of video commented out
  
</div>

end of old hero image */}

{/*---------------- End Adding the main hero image ----------------*/}          

{/*---------------- Start Newsletter Section ----------------*/}            

{/*
      <p className="mt-16 mb-1 text-sm sm:text-sm md:text-lg text-red-400 font-normal">
            <span> Get the latest Eldercare Guide 💌</span>
        </p>

<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    // Adjusted button layout for mobile 

<div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
  <button
    onClick={openNewsletterModal}
    type="submit"
    className="flex items-center space-x-2 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-400 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    
    <span className="hidden sm:inline"> Join Our Newsletter </span>
    <span className="sm:hidden"> Join Newsletter </span>
    <span> <MailCheck className="w-4 h-4 sm:w-5 h-5"/> </span>
    
  </button>
</div>
    
</div>

{/*----------------------- End Newsletter Section ----------------------*/}
        
</div>

{/*----------------- Start The Struggle Support ----------------------- */}
<section id="TheStruggle" className="text-center">
  
 <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
   {/*Care shouldn't cost you your Career*/}
    Sacrificing your career to care for mom?
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-8 mb-4">
    {/*Care shouldn't cost you <br/> your Career*/}
    Sacrificing your career <br/> to care for mom?
  </h2>
  
  <p className="text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
    {/*We empower the modern workforce to make better caregiving decisions.*/}
    {/*Get instant community support without wasting hours on calls.*/}  
  If you recognize yourself in any of these scenarios, you need a reset.
  </p>  

  {/* 3x2 Grid of Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
    
    {/* Card 1: Feeling Mentally Broken */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Brain className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Feeling Mentally Broken
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You project authority in meetings but you're silently breaking. You context switch between strategic work and eldercare firefighting, pushing your mental capacity to breaking point.
      </p>
      <button
        onClick={openMentallyBrokenModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Restore your Focus</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 2: Managing Inefficient Systems */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Target className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Navigating Inefficient Systems
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        At work, you optimize and delegate. In caregiving, you're trapped in a maze of broken bureaucracy, chasing insurance claims and care agencies that don't share your sense of urgency or standards.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openNavigateSystemsModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Fix the Logistics</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 3: Consumed by $10k/mo Bills */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <CircleDollarSign className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Consumed by $10k/mo Bills
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You watch your parents' hard-earned legacy and your own financial peace of mind evaporate into monthly care costs. Every agency invoice feels like a countdown you simply can't stop.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openConsumedByBillsModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Protect your Legacy</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 4: Skipping Career Opportunities */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Briefcase className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Skipping Career Opportunities
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You've started saying "no" to the travel, the dinners, and the golf days that would have opened doors for you. Your career is stalling because you simply can't be in two places at once.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openCareerOppsModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Reclaim your Career</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 5: Broken by Family Responsibilities */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Users className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Broken by Family Responsibilities
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        It's not just the parent, it's the sibling infighting, the lack of support, and the weight of being the "responsible one." You're the pillar everyone leans on, but you have no one to lean on yourself.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openBrokenByFamilyModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Share the Burden</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 6: Being Permanently On-Call */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Timer className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Being Permanently On-Call
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You live in a constant state of high-alert. Every late-night call or unexpected text is a potential day-off at work, leaving you in a cycle of chronic stress that means you now wake up at 3 a.m. every day.
      </p>
      <button
        //onClick={openCommunityModal}
         onClick={openOnCallStressModal}
        className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Find your Peace</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

  </div>
</section>
{/*------------------- End the Struggle ---------------------*/}    


{/*----------------- Start The Reset Support ----------------------- */}
<section id="TheReset" className="mt-32 text-center">
  
 <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    What a Strategic Reset looks like
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    What a Strategic Reset <br/> looks like
  </h2>
  
  <p className="text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
  Real results from senior leaders who reclaimed their careers.
  </p>  

   {/* Testimonials Grid - 3 Columns */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    
    {/* Testimonial Card 1: David Simmons */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="David Simmons"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            David Simmons
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Managing Director, Global FinTech
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "I was essentially running two full-time companies my actual firm and my parents' care team. The context switching was eroding my performance and my health. This service didn't just 'help' with the logistics; it gave me back my executive bandwidth. I'm back to leading my team with 100% focus, knowing the 'home front' is handled by experts who move at my speed."
        </p>
      </div>
    </div>

    {/* Testimonial Card 2: Judy Walters */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="Judy Walters"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            Judy Walters
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            EVP of Operations
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "Before I found this 'reset,' I was one phone call away from a burnout-induced leave of absence. I was managing $12k monthly care invoices and navigating insurance red tape at 11 PM. Now, I have a strategic partner who manages the friction. For the first time in three years, I can actually take a business trip without the constant dread of an emergency I can't handle from 3,000 miles away."
        </p>
      </div>
    </div>

    {/* Testimonial Card 3: Debbie Richardson */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=45"
          alt="Debbie Richardson"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            Debbie Richardson
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Chief Marketing Officer
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "The hardest part wasn't the money; it was the fact that I had stopped being a daughter and had become a full-time project manager. My relationship with my siblings was strained and my career was sidelined. This service acted as the 'COO' of my parents' care, allowing me to step back into my role as an executive and more importantly, as a daughter. It saved my career and my family dynamic."
        </p>
      </div>
    </div>
  </div>

  <button
    onClick={openCommunityModal}
    className="mt-8 items-center group flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg mx-auto">
    <span>Get Started</span>
      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
   </button> 
</section>

{/*----------------- End The Reset Support ----------------------- */}     


{/*----------------- Start Caregiving Support ----------------------- */}
<section id="OperationalSupport" className="text-center mt-32">
  
  <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    Move from Chaos to Systems
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    Move from Chaos <br/> to Systems
  </h2>
  <p className="sm:hidden text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
   Unlock a care planning ecosystem of vetted services and tools built for career professionals 
  </p>          

  <p className="hidden sm:inline text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
   Don't start from zero. Unlock a care ecosystem of vetted services and tools <br/>
    built for busy family caregivers struggling to care for mom and dad
  </p>   

{/*Image for Mobile Devices*/}
<div className="sm:hidden w-full p-4 mt-8">
  <div className="grid grid-cols-1 h-[450px]">
     {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1">
          <div className="relative overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-red-500/60 hover:shadow-red-500/80 h-full group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_patient.png"
              alt="Caregivers"
              className="w-full h-full object-cover object-[30%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
                <h3 className="text-xl font-bold drop-shadow-lg">Medicaid Assistant</h3>
            </div>
          </div>
        </div>
    </div>
  </div>
          
<div className="hidden sm:block w-full p-4 mt-8">

  {/* Main grid container with 5 columns */}
  {/*simple and easy way to reduce the entire grid by 20%*/}
  <div className="grid grid-cols-5 gap-3 h-[520px] grid-rows-2">
          
        {/*---- Column 1: Two stacked images---*/}
        <div className="col-span-1 flex flex-col gap-4 h-[520px]">
          {/*------ start first top left image -------*/}
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-checker.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">

    <TooltipHelp text="👋 Try it Now!">
          <button
            onClick={openEligibilityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
    </TooltipHelp>       
                <h3 className="text-xl font-bold drop-shadow-lg">Medicaid Assistant</h3>
            </div>
          </div>

          {/*
          <div className="relative h-full overflow-hidden rounded-xl">
            <img
              //keeping for future use
            />
          </div>
          */}

          
          {/*------ end first left image -------*/}
          <div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_son.png"
              alt="Person working"
              className="w-full h-full rounded-xl object-cover aspect-square" // Square aspect ratio for stacked images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">

          <TooltipHelp text="🤫 Coming Soon!">
              <button
            onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
      </TooltipHelp>   
                <h3 className="text-xl font-bold drop-shadow-lg">Asset Calculator</h3>
            </div>
          </div>
        </div>
        
        {/* Column 2: One image, spanning two rows */}
        <div className="col-span-1 row-span-2 h-full"> {/* 'row-span-2' makes this grid item span two rows */}
          <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/daughter_father.png"
              alt="Meeting in progress"
              className="w-full h-full rounded-xl object-cover object-[40%_70%]" // 'h-full' ensures the image fills the row-span-2 container
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
          <TooltipHelp text="🤫 Coming Soon!">
              <button
            onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          </TooltipHelp>   
                <h3 className="text-xl font-bold drop-shadow-lg">Search Caregivers</h3>
            </div>
          </div>
           
        </div>

        {/* Column 3: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-3 h-[520px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_daughter.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <TooltipHelp text="👋 Try it Now!">
              <button
            onClick={openStressCoachModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>    
                <h3 className="text-xl font-bold drop-shadow-lg">Conflict Advisor</h3>
            </div>
          </div>
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/magnifying-glass.png"
              alt="Brainstorming session"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
        <TooltipHelp text="🤫 Coming Soon!">
           <button
            onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Screen for Dementia</h3>
            </div>
          </div>
        </div>

        {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1 row-span-2">
          <div className="relative border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_patient.png"
              alt="Laptop on desk"
              className="w-full h-full rounded-xl object-cover object-[30%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <TooltipHelp text="🤫 Coming Soon!">
              <button
                  onClick={openCommunityModal}
                  className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Secure Health Vault</h3>
            </div>
          </div>
        </div>

        {/* Column 5: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-4 h-[520px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/black_mother_daughter.png"
              alt="People discussing"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
        <TooltipHelp text="🤫 Coming Soon!">
          <button
            onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Hire an Attorney</h3>
            </div>
          </div>
          
     {/*------ start last bottom top right image -------*/}
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/push-wheelchair.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
          <TooltipHelp text="🤫 Coming Soon!">
              <button
                onClick={openCommunityModal}
                className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          </TooltipHelp>
          
              {/*<h3 className="text-xl font-bold drop-shadow-lg">Residential Care Benchmarking</h3>*/}
              <h3 className="text-xl font-bold drop-shadow-lg">Book Care Homes</h3>
            </div>
          </div>

          {/*
          <div className="relative h-full overflow-hidden rounded-xl">
            <img
              //keeping for future use
            />
          </div>
          */}

          
          {/*------ end last bottom right image -------*/}
        </div>
      </div>
    </div>  

              <button
                onClick={openCommunityModal}
                className="mt-8 flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 border border-red-500 bg-white text-red-500 text-base font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg group mx-auto">
                <span>Get Started</span>
                {/* Placeholder for ArrowRight icon or similar */}
               <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button> 

</section>      
{/*----------------- End Caregiving Support ----------------------- */}           
          

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg); /* Move up and slightly rotate */
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite; /* Keeps repeating indefinitely */
          animation-timing-function: ease-in-out; /* Smooth start and end */
          animation-direction: alternate; /* Plays forward then backward for a smooth loop */
        }
      `}</style>
 
{/*-------------------- End images Added for effect -----------------------------*/}
        
        
 {/*------------------------------start of the FAQ Section -------------------------------------*/}    

<section id="FAQ" className="mt-24 text-center">
  <div className="inline-flex items-center border-8 border-red-200 space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white rounded-full text-lg mb-6 cursor-pointer"
         
            onClick={() => {
              window.location.href = '#top_page';
              setIsMobileMenuOpen(false);           
              }}
    >
    <Sparkles className="w-4 h-4" />
    <span>Frequently Asked Questions</span>
  </div>
  <h2 className="text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
    Have Questions? 🤔
  </h2>
  <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto hover:text-red-500">
   Find out how The Poetiq community supports you with eldercare. 
  </p>

  <div className="max-w-3xl mx-auto space-y-4 text-left">
    {/* FAQ Item 0.1 */}
<details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    Is the community just a general support group, or is this an executive-level council?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>
      This is a private, high-integrity council, not a general support forum. We reject the noise and low-signal advice that plagues social media. We are built for action and efficiency. Our sole mandate is to pool the collective executive knowledge of our members to build definitive solutions for each member's shared, yet unique challenges. . You join to exchange unfiltered intelligence with peers who share the same time constraints and ethical standards, ensuring every interaction is high-value and directly contributes to fixing the system.
    </p>
  </div>
</details>


    {/* FAQ Item 1 */}
  <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    How does focusing on my career and efficiency help my aging parent's dignity?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>The link is direct: Administrative chaos is the primary source of compromised care. When you are stressed, isolated, and forced to make rapid decisions due to lack of time, you compromise on quality. It can become a doom loop when the time demands then threaten the careers that provide required financial stability. By joining Poetiq, you are building the professional logistics layer that eliminates that chaos, giving you the time and clarity to make informed decisions that uphold your parent's dignity and honor your duty, without sacrificing your professional standing. 
    </p>
  </div>
</details>


    {/* FAQ Item 2 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   What is the "definitive solution" we are pioneering, and what is my role in building it?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>We are pioneering the professional blueprint for dignified parental care. This blueprint is the high-integrity framework - from data standards and vendor vetting protocols to administrative automation - that should exist but doesn't. Your role is crucial: by sharing your specific logistical failures and successes, you provide the essential, real-world data that allows the community to stress-test and finalize this professional-grade solution, turning your personal agony into systemic change.
    </p>
  </div>
</details>

    {/* FAQ Item 3 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   How much time will membership demand from my already impossible schedule?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>We are acutely aware that your time is your most valuable resource. The community is structured for asynchronous, high-signal engagement. There are no mandatory meetings. Your contribution is prioritized through structured prompts (e.g., sharing a 10-minute breakdown of your biggest logistical failure this week). The primary value is in accessing the combined intelligence of others, allowing you to instantly reclaim the hours you would have spent navigating the crisis alone.</p>
  </div>
</details>

     {/* FAQ Item 4 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   Who exactly are the other members? Is the community strictly vetted?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>The community is strictly reserved for executive professionals - individuals operating in high-pressure, high-responsibility roles in knowledge work.  This tight focus ensures that every member understands the stakes (career stability, time constraints) and can contribute strategic insights rather than just general complaints. Our integrity relies on a membership of peers who value discretion and professional execution above all else.
</p>
  </div>
</details>

     {/* FAQ Item 5 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    How do I know my family's sensitive personal or financial details are protected?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Confidentiality is paramount. The Poetiq Community operates under explicit rules regarding privacy and disclosure. While you are encouraged to share the administrative failure (e.g., "I spent 4 hours on a caregiver assessment form"), you are never required to share specific personal or financial identifiers. Our system is designed to extract actionable unfiltered intelligence (the failure point) while preserving the anonymity and sensitive details of your personal life.
    </p>
  </div>
</details>

     {/* FAQ Item 6 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   Is the founder qualified to lead a solution of this magnitude?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Olu's primary qualification is shared experiences and decades of executive-level competence. The solution is not driven by clinical expertise, but by logistical mastery. Olu faced the same crisis you face and applied corporate strategy to solve those personal care challenges. He leads the mission, but the ultimate authority and expertise reside within the collective professional intelligence of the executive members.
    </p>
  </div>
</details>

     {/* FAQ Item 7 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    What is the financial investment for membership, and how is the ROI measured?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Membership requires a modest subscription fee, structured to ensure the community remains high-signal and dedicated. The Return on Investment (ROI) is measured in two ways:Time Reclaimed: The hours saved by accessing the collective blueprint and avoiding painful, low-signal searches.Compromise Avoided: The value of making high-quality, informed decisions that protect your parent's dignity and your own professional standing an invaluable asset.</p>
  </div>
</details>

     {/* FAQ Item 8 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    If we succeed, what will the final "professional blueprint" we forge actually look like?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>While the community will determine the final product, the blueprint is the operational logic for the future. It will be the logic behind a high-integrity system that automatically executes the administrative chaos: the authoritative, evidence-based process for vetting care quality, the seamless data transfer protocols, and the accelerated logistical execution that transforms your 40-hour administrative drain into a single, executive-level dashboard.</p>
  </div>
</details>
    
  </div>
</section>


  {/*------------------------------- end of the FAQ Section --------------------------------------*/}       


  {/* ------------------------------ Start Final Call to Action Section --------------------------*/}    

<section className="mt-24 py-16 bg-gradient-to-t from-red-500 via-red-100 to-white text-gray-900 text-center rounded-xl">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-2xl text-red-400 sm:text-4xl md:text-6xl font-bold leading-tight mb-8">
      {/*You don't have to navigate parental care alone*/}
      The easiest way to fix care gaps for mom and dad
      
    </h2>
    <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
      {/*Let’s find uncompromising clarity together 💪*/}
      Built for family caregivers with demanding careers 💪
    </p>

          {/*--------------- start Social Proof Section ---------------- */}
          <div className="mb-4 justify-center relative flex items-center sm:gap-6 gap-2 mt-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                  className="hidden sm:block w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 4"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="User 5"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=6"
                  alt="User 6"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
          </div>

            {/* Stars and Text */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                  </div>
                    <p className="text-sm font-medium text-white">1,200 hrs saved</p>
                </div>
            </div>

          {/*----- end social proof section here -------------*/}   

        {/* Buttons */}
      <div className="flex flex-col sm:mr-10  sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"> 
          <button
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-base font-semibold sm:px-4 sm:py-3 sm:text-base
                         shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group" // Adjusted mobile button size/text for consistency
          >
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Get Started</span>
           <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>


        </div>
   
  </div>
</section>

  {/*---------------------------------End Final Call to Action Section-----------------------------*/}      

{/*----------------------Start Footer - Full Foot Breakdown ------------------------------ */}

<footer className="mt-24 border-t border-gray-300 text-left">
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> {/* Responsive grid */}
      {/* Company Info */}
      <div className="space-y-4 space-x-1">

              <div className="inline-flex bg-red-500 rounded-full p-0.5">
                <HeartPulse className="h-5 w-5 fill-white stroke-red-500" />
              </div>
        <span className="text-xl  font-bold text-red-500 sm:text-xl">poetiq</span>
        
        <p className="text-sm text-gray-600">
          The best platform for unpaid family caregivers struggling with eldercare!
        </p>
        {/* Social links */}
      </div>

      {/* Product Links*/}
      <div className="col-span-1">
        <h3 className="font-semibold mb-4">About Poetiq</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li> <a href="#Community" className="no-underline hover:text-red-400 transition-colors">Community</a></li>
          <li> <a href="#FAQ" className="no-underline hover:text-red-400 transition-colors">Frequently Asked Questions</a></li>
          <li> <a href="#" className="no-underline hover:text-red-400 transition-colors">Roadmap (Coming Soon)</a></li>
        </ul>
      </div>
      

  {/* Care Tools & Resources */}
      <div className="col-span-1">
        <h3 className="font-semibold mb-4">Care Tools & Resources</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li> <a href="dev/nursing-home" className="no-underline hover:text-red-400 transition-colors">Nursing Home Finder 👩‍⚕️</a></li>
          <li> <a href="dev/home-health-care" className="no-underline hover:text-red-400 transition-colors">Caregivers Near Me 📌 </a></li>       
          <li> <a href="dev/dementia-assessment" className="no-underline hover:text-red-400 transition-colors">Dementia Screening Test 🧠 </a></li>       
          <li> <a href="#" className="no-underline hover:text-red-400 transition-colors">Blogs (coming soon) ✍️</a></li>
        </ul>
      </div>
      
      {/* Legal */}
      <div className="col-span-1">
        <h3 className="font-semibold mb-4">Legal</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li> <a href="/privacy.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">Privacy Policy</a></li>
          <li><a href="/terms.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">Terms of Service</a></li>
          <li><a href="/cookie.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">Cookie Policy</a></li>
        </ul>
      </div>
    </div>

   {/*-------------------------------------- End Footer -------------------------------------------*/} 

    {/* Bottom bar */}
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600"> {/* Responsive flex */}
      <p className="order-2 sm:order-1">&copy; 2026 poetiq.io All rights reserved.</p> {/* Order for mobile */}
        <div className="flex space-x-6 order-1 sm:order-2"> 

          

          <p className="text-sm text-gray-700 text-center leading-relaxed">
    We make it insanely easy for family caregivers to fix legal and financial gaps for mom and dad.        
    Connect with 
    <a href="https://www.linkedin.com/in/oluadedeji" className="text-red-500 hover:text-red-600 font-medium transition-colors"> <u>Olu</u> </a>
    on LinkedIn.
</p>
        </div>
      </div>
    </div>
  </div>
</footer>
</main>

      
        
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
      />

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={closeWaitlistModal}
      />

    <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={closeNewsletterModal}
      />

    <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={closeCommunityModal}
      />
     
    <OnboardingQuestionsModal 
      isOpen={isOnboardingModalOpen}
      onClose={closeOnboardingModal}
      onDashboardOpen={openDashboardModal} 
    />

    <EldercareGapDashboardModal
  isOpen={isDashboardModalOpen}
  onClose={closeDashboardModal}
  sessionId={getSessionId()}
/>        
                
    <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={closeEligibilityModal}
      />

      <StressCoachModal
        isOpen={isStressCoachModalOpen}
        onClose={closeStressCoachModal}
      />      

    <MentallyBroken
        isOpen={isMentallyBrokenModalOpen}
        onClose={closeMentallyBrokenModal}
        onOpenCommunity={handleMentallyBrokenToCommunity}
      />

      <NavigateSystems
  isOpen={isNavigateSystemsModalOpen}
  onClose={closeNavigateSystemsModal}
  onOpenCommunity={handleNavigateSystemsToCommunity}
/>

    <ConsumedByBills
  isOpen={isConsumedByBillsModalOpen}
  onClose={closeConsumedByBillsModal}
  onOpenCommunity={handleConsumedByBillsToCommunity}
/>

<CareerOpps
  isOpen={isCareerOppsModalOpen}
  onClose={closeCareerOppsModal}
  onOpenCommunity={handleCareerOppsToCommunity}
/>
        
<BrokenByFamily
  isOpen={isBrokenByFamilyModalOpen}
  onClose={closeBrokenByFamilyModal}
  onOpenCommunity={handleBrokenByFamilyToCommunity}
/>

<OnCallStress
  isOpen={isOnCallStressModalOpen}
  onClose={closeOnCallStressModal}
  onOpenCommunity={handleOnCallStressToCommunity}
/>


{isWaitlistSuccessModalOpen ? (
  <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-green-100 p-4 flex items-center space-x-3 animate-fade-in z-[9999]">
    <div className="bg-green-100 rounded-full p-2">
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <p className="font-medium text-gray-900">Congratulations! 🎉 </p>
      <p className="text-sm text-gray-500">
        You've joined our waitlist. Expect an email in a few days!
      </p>
    </div>
  </div>
) : null} 

{isNewsletterSuccessModalOpen ? (
  <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-green-100 p-4 flex items-center space-x-3 animate-fade-in z-[9999]">
    <div className="bg-green-100 rounded-full p-2">
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <p className="font-medium text-gray-900">Congratulations! 🎉 </p>
      <p className="text-sm text-gray-500">
        You've joined our Newsletter. Expect an email Soon!
      </p>
    </div>
  </div>
) : null}         
        
    </div>
  
  </>
  
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPageDev;