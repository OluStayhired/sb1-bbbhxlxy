import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  HeartPulse, 
  MapPin, 
  Search, 
  CheckCircle, 
  FileText, 
  Shield, 
  Briefcase, 
  Users, 
  Activity, 
  Zap,
  CheckCircle2,
  User,
  ShieldAlert,
  ShieldCheck,
  Headset,
  Dumbbell,
  UserSearch,
  DatabaseZap,
  CircleDollarSign,
  Scale,
  Brain,
  Target,
  Workflow,
  Ambulance,
  Glasses,
  Microscope,
  TextSearch,
  Calculator,
  FileSearch,
  RotateCcw,
  FolderLock,
  BrainCircuit
} from 'lucide-react';


interface PageMenuNavProps {
  onOpenCommunityModal: () => void;
  onOpenOnboardingModal: () => void;
}

export function PageMenuNav({ onOpenCommunityModal, onOpenOnboardingModal }: PageMenuNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <div className="bg-red-100 rounded-full p-1 sm:p-2">
            <Target className="h-7 w-7 fill-white stroke-red-500 sm:h-9 sm:w-9" />
          </div>
          {/*<span className="text-2xl font-bold text-red-500 sm:text-3xl">poetiq</span>*/}
          <span className="text-2xl font-bold text-gray-700 sm:text-3xl">poetiq</span>
        </div>
      </Link>

      
      {/* Desktop Navigation Buttons */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="items-center flex justify-center space-x-2">
          {/*
          <button
            onClick={() => {
              window.location.href = '/dev#HowItWorks';
              setIsMobileMenuOpen(false);
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            How it Works ❤️
          </button>
        */}
          
          <Link
            to="/#HowItWorks"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('HowItWorks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            How it Works ❤️
          </Link>


          {/*
          <button
            onClick={() => {
              window.location.href = '/dev#OperationalSupport';
              setIsMobileMenuOpen(false);
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Quick Tools 💛
          </button>
          */}

            <Link
            to="/#OperationalSupport"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('OperationalSupport');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
              Quick Tools 💛

            </Link>    
          
          {/* START: Care Tools Dropdown Menu */}
          <div className="relative group">
            
            {/* Menu Header - Care Tools */}
            <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Free Care Tools 🧡
            </button>

                      {/* Mega Menu Dropdown - Full Width 3 Column */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-5xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

                {/* ========== COLUMN 1: YOUR STARTING POINT ========== */}
                <div className="col-span-1 space-y-6 group/col1">
                  {/* Column 1 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col1:text-red-500 transition-colors duration-300">🏁 YOUR STARTING POINT</h4>
                  </div>

                  {/* Card 1: Readiness Audit */}
                  <div
                    onClick={onOpenOnboardingModal}
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent cursor-pointer hover:border-teal-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4 group-hover/card:bg-teal-200 transition-colors duration-300">
                      <ShieldCheck className="w-7 h-7 text-teal-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-teal-600 transition-colors duration-300">
                      Eldercare Gap Finder
                      <CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center align-top text-white ml-1 inline"/>
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Identify legal and financial gaps in your parents' healthcare before a crisis hits. 
                    </p>
                  </div>

                  {/* Card 4: Dementia Assessment Test */}
                  <Link
                    to="/dementia-assessment"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <TextSearch className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Cognitive Baseline Test
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Identify early signs of cognitive decline using validated clinical screening tools.
                    </p>
                  </Link>
                </div>

                {/* ========== COLUMN 2: PROFESSIONAL SUPPORT ========== */}
                <div className="col-span-1 space-y-6 group/col2">
                  {/* Column 2 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col2:text-red-500 transition-colors duration-300">👩‍⚕️ PROFESSIONAL SUPPORT</h4>
                  </div>

                  {/* Card 2: Medicaid Co-Pilot */}
                  <Link
                    to="/medicaid-co-pilot"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <img
                        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                        alt="Image 1"
                        className="relative rounded-full w-full h-full border-4 border-red-100 aspect-square group-hover/card:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Long-Term Care Assistant
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get answers to complex Medicaid, VA & state-specific eligibility rules with <b>Ellie</b>.
                    </p>
                  </Link>

                  {/* Card 5: Conflict Coach */}
                  <Link
                    to="/eldercare-stress-management"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <img
                        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sophia_ai_coach.png"
                        alt="Image 1"
                        className="relative rounded-full w-full h-full border-4 border-red-100 aspect-square group-hover/card:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Family Conflict Advisor
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Resolve sibling friction and caregiving disputes with advice from <b>Sophia</b>.
                    </p>
                  </Link>
                </div>

                {/* ========== COLUMN 3: INSTANT DUE DILIGENCE ========== */}
                <div className="col-span-1 space-y-6 group/col3">
                  {/* Column 3 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col3:text-red-500 transition-colors duration-300">🕵️‍♀️ INSTANT DUE DILIGENCE</h4>
                  </div>

                  {/* Card 3: Caregiver Agency Finder */}
                  <Link
                    to="/home-health-care"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <Microscope className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Care Agency Inspector
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Inspect agencies by clinical outcomes in mobility, safety and patient dignity.
                    </p>
                  </Link>

                  {/* Card 6: Nursing Home Finder */}
                  <Link
                    to="/nursing-home"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <Ambulance className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Nursing Home Auditor
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Audit facilities by staff attentiveness, health inspection ratings and more.
                    </p>
                  </Link>
                </div>

              </div>
            </div>

          </div>
          {/* END: Care Tools Dropdown Menu */}

        {/* ----------------------- START: Executive Services Dropdown Menu -----------------------*/}
<div className="relative group">
  {/* Menu Header - Executive Services */}
  <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
  Premium Services 💚
  </button>

    {/* Mega Menu Dropdown - Full Width 3 Column Grid */}
  <div className="absolute right-0 top-full mt-[-0.5] w-screen max-w-6xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
       {/* Grid Container - 6 items in 2 rows */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      
      {/* ========== COLUMN 1: Crisis Readiness ========== */}
      <div className="col-span-1 space-y-6 group/col1">
        {/* Column 1 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col1:text-red-500 transition-colors duration-300">🆘 Crisis Readiness</h4>
        </div>

        {/* Card 1: Eldercare Data Vault */}
        <Link
          to="/eldercare-private-data-store"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <FolderLock className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Eldercare Data Vault
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Replace fragmented unsecure personal data stores with structured searchable data vaults.
          </p>
        </Link>

        {/* Card 4: Care Benefits Automator */}
        <Link
          to="/healthcare-benefits-application-automation"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <BrainCircuit className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Care Benefits Automator
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Avoid application denials. Pre-fill all required state and federal care benefits form with AI
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 2: Financial Protection ========== */}
      <div className="col-span-1 space-y-6 group/col2">
        {/* Column 2 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col2:text-red-500 transition-colors duration-300">💰 Financial Protection</h4>
        </div>

        {/* Card 2: Spend-Down Calculator */}
        <Link
          to="/medicaid-spenddown-calculator"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Calculator className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Spend-Down Calculator
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Track asset and income thresholds to trigger financial support so you're never out-of-pocket.
          </p>
        </Link>

        {/* Card 5: Claims Recovery Engine */}
        <Link
          to="/healthcare-insurance-claims-recovery"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <RotateCcw className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Claims Recovery Engine
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Scan denial letters, identify look-back and gifting errors, automate your insurance appeal.
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 3: Operational Support ========== */}
      <div className="col-span-1 space-y-6 group/col3">
        {/* Column 3 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col3:text-red-500 transition-colors duration-300">🛠️ Operational Support</h4>
        </div>

        {/* Card 3: Nursing Home Contract Analyzer */}
        <Link
          to="/nursing-home-contract-analyzer"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <FileSearch className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Nursing Home Contract Analyzer
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Detect predatory contracts that inflate monthly care bills for Mom and Dad after admission.
          </p>
        </Link>

        {/* Card 6: Healthcare Virtual Assistants */}
        <Link
          to="/virtual-healthcare-assistant"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Headset className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Healthcare Virtual Assistants
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            HIPAA-trained VAs who take over insurance calls, provider logistics, and email follow ups.
          </p>
        </Link>
      </div>
      
    </div>

  </div>
</div>
{/* ---------------------END Executive Services Dropdown Menu --------------------*/}

        {/*
          <button
            onClick={() => {
              window.location.href = '/dev#Community';
            }}
            className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Community 🧡
          </button>

          <button
            onClick={() => {
              window.location.href = '/dev#our_story';
            }}
            className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Our Story 👋
          </button>
        */}

 
          
          {/*<button
            onClick={() => {
              window.location.href = '/dev#FAQ';
            }}
            className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >*/}

          <Link
            to="/#FAQ"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('FAQ');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            FAQ ❓
          </Link>
        </div>

        <button
          onClick={onOpenCommunityModal}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
        >
          <span>Join Waitlist</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>

      {/* Mobile Menu Button (Hamburger) */}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-4 py-6">
           <button
            onClick={() => {
              window.location.href = '#OperationalSupport';
              setIsMobileMenuOpen(false);           
              }}
              className="mx-auto px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
            Ask Ellie 💛
          </button>

          <Link
            to="/#HowItWorks"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('HowItWorks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            How it Works ❤️
          </Link>



          {/* START: Care Tools Dropdown Menu */}
          <div className="relative group">
            {/* Menu Header - Care Tools */}
            <button className="mx-auto px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Free Care Tools 🧡
            </button>

            {/* Dropdown Content - Hidden by default, shown on group hover */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 transition-opacity duration-150 ease-out">
              <div className="py-1">
                {/* Caregivers Near Me */}
                <Link
                  to="/home-health-care"
                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Caregivers</span>
                </Link>
                {/* Nursing Home Finder */}
                <Link
                  to="/nursing-home"
                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Nursing Homes</span>
                </Link>

                <Link
                  to="/dementia-assessment"
                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Take Cognitive Test</span>
                </Link>
              </div>
            </div>
          </div>
          {/* END: Care Tools Dropdown Menu */}
          
          {/*
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
          */}

          <button
            onClick={() => {
              window.location.href = '#OperationalSupport';
              setIsMobileMenuOpen(false);
            }}
            className="mx-auto px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
           Premium Services 💚
          </button>

          <button
            onClick={() => {
              window.location.href = '/#FAQ';
              setIsMobileMenuOpen(false);
            }}
            className="mx-auto px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Frequent Questions ❓
          </button>

          {/* Close button within the overlay */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Close navigation"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={onOpenCommunityModal}
            className="group flex items-center justify-center space-x-2 w-1/2 sm:w-auto p-4 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      )}

    </nav>
  );
}
