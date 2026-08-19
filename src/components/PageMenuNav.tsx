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
  UserCheck,
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
  TrendingDown,
  Workflow,
  Ambulance,
  Glasses,
  Microscope,
  TextSearch,
  Calculator,
  FileSearch,
  RotateCcw,
  FolderLock,
  BrainCircuit,
  Cog,
  HelpCircle,
} from 'lucide-react';


interface PageMenuNavProps {
  onOpenCommunityModal: () => void;
  onOpenOnboardingModal: () => void;
}

export function PageMenuNav({ onOpenCommunityModal, onOpenOnboardingModal }: PageMenuNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = 'https://app.poetiq.io/login';
  };

  // Mobile Accordion Component for nested menus
function MobileAccordion({ title, items }: { 
  title: string; 
  items: Array<{
    section: string;
    cards: Array<{
      title: string;
      icon: React.ReactNode;
      description: string;
      link?: string;
      onClick: () => void;
      badge?: boolean;
    }>;
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-900 font-semibold bg-white hover:bg-gray-50 transition-all duration-500"
      >
        <span>{title}</span>
        <ArrowRight 
          className={`w-4 h-4 text-gray-600 transition-transform duration-500 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gray-50 px-2 py-3 space-y-4">
          {items.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2">
              {/* Section Header */}
              <div className="px-3 py-1">
                <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">
                  {section.section}
                </h4>
              </div>

              {/* Section Cards */}
              {section.cards.map((card, cardIdx) => (
                card.link ? (
                  <Link
                    key={cardIdx}
                    to={card.link}
                    onClick={card.onClick}
                    className="block bg-white rounded-lg p-3 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-500"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-gray-700">
                            {card.title}
                          </h5>
                          {card.badge && (
                            <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={cardIdx}
                    onClick={card.onClick}
                    className="w-full bg-white rounded-lg p-3 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-500 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-gray-700">
                            {card.title}
                          </h5>
                          {card.badge && (
                            <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


  return (
  
    <nav className="px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">
      {/*<nav className="sticky top-0 z-9999 bg-white px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">*/}

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
            className="flex items-center max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Workflow className='w-3.5 h-3.5 mr-2'/>
            How it Works
          </Link>

        {/* ----------------------- START: Executive Services Dropdown Menu -----------------------*/}
<div className="relative group">
  {/* Menu Header - Executive Services */}
  <button className="flex items-center px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
    <Cog className='w-3.5 h-3.5 mr-2'/>
  Operating System
  </button>

    {/* Mega Menu Dropdown - Full Width 3 Column Grid */}
  <div className="absolute right-0 top-full mt-[-0.5] w-screen max-w-6xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
       {/* Grid Container - 6 items in 2 rows */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      
      {/* ========== COLUMN 1: Crisis Readiness ========== */}
      <div className="col-span-1 space-y-6 group/col1">
        {/* Column 1 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col1:text-red-500 transition-colors duration-300">
          
            {/*🆘 Crisis Readiness*/}
            {/* 🏁 START HERE     */}
            {/*🚀 START HERE */}
            
            🆘 Start Here
          </h4>
        </div>

        {/* Card 1: Eldercare Data Vault */}
        <Link
          //to="/eldercare-private-data-store"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Activity className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Pulse Checker
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Identify legal, financial and medical gaps in 60 seconds! Get your elder care readiness score. 
          </p>
        </Link>

        {/* Card 4: Care Benefits Automator */}
        <Link
          //to="/healthcare-benefits-application-automation"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <UserCheck className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Care Tracker
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {/*Avoid application denials. Pre-fill all required state and federal care benefits form with AI*/}
            Improve your care readiness score. Track and close care gaps to qualify for Medicaid.
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 2: Financial Protection ========== */}
      <div className="col-span-1 space-y-6 group/col2">
        {/* Column 2 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col2:text-red-500 transition-colors duration-300">💵 Financial Protection</h4>
        </div>

        {/* Card 2: Spend-Down Calculator */}
        <Link
         //to="/medicaid-spenddown-calculator"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <TrendingDown className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Spend-Down Genius
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {/*Track asset and income thresholds to trigger financial support so you're never out-of-pocket.*/}
            Generate personalized income & asset spend-down strategies for instant Medicaid eligibility. 
          </p>
        </Link>

        {/* Card 5: Claims Recovery Engine */}
        <Link
          //to="/healthcare-insurance-claims-recovery"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <CircleDollarSign className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Medicaid Planner
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {/*Scan denial letters, identify look-back and gifting errors, automate your insurance appeal.*/}
            Manage documents, run what-if scenarios and lock-in asset & income protection strategies.
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 3: Operational Support ========== */}
      <div className="col-span-1 space-y-6 group/col3">
        {/* Column 3 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col3:text-red-500 transition-colors duration-300">{/*🤝 Executive Assistance*/}
          ❤️ FIND CARE SERVICES   
          </h4>
        </div>

        {/* Card 3: Nursing Home Contract Analyzer */}
        <Link
          //to="/nursing-home-contract-analyzer"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Search className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Care Services Finder
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {/*Detect predatory contracts that inflate monthly care bills for Mom and Dad after admission.*/}
            Audit in-home care, assisted living, nursing homes & long term care hospitals with 1-click.
          </p>
        </Link>

        {/* Card 6: Healthcare Virtual Assistants */}
        <Link
          //to="/virtual-healthcare-assistant"
          to="/login"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Scale className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Attorney Finder
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {/*HIPAA-trained VAs who take over insurance calls, provider logistics, and email follow ups.*/}
            Find Medicaid and elder law attorneys in your state for asset protection and appeals.
          </p>
        </Link>
      </div>
      
    </div>

  </div>
</div>
{/* ---------------------END Executive Services Dropdown Menu --------------------*/}

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
            className="flex items-center max-w-sm px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            {/*FAQ ❓*/}

            <HelpCircle className='w-3.5 h-3.5 mr-2' strokeWidth={2.5}/>
            Frequently Asked Questions
          </Link>
        </div>

        <button
          onClick={handleLoginClick}
          //onClick={onOpenCommunityModal}
          //onClick= {() => {window.location.href='/login'}}

          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
        >
          {/*<span>Join Waitlist</span>*/}
          <span>Get Started</span>
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
  <div className="sm:hidden fixed inset-0 bg-white z-40 overflow-y-auto">
    {/* Header with Close Button */}
    <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-50">
      <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
        <div className="flex items-center space-x-2">
          <div className="bg-red-100 rounded-full p-1">
            <Target className="h-6 w-6 fill-white stroke-red-500" />
          </div>
          <span className="text-xl font-bold text-gray-700">poetiq</span>
        </div>
      </Link>
      <button
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
        aria-label="Close navigation"
      >
        <X className="h-6 w-6" />
      </button>
    </div>

    {/* Menu Content */}
    <div className="px-4 py-6 space-y-2">
      
      {/* How it Works */}
      <Link
        to="/#HowItWorks"
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('HowItWorks');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        className="block  items-center flex w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
        {/*How it Works ❤️*/}
        How it Works
      </Link>


      {/* Premium Services Accordion */}
      <MobileAccordion
        //title="Operating System 💚"
        title="Operating System"
        items={[
          {
            //section: "🆘 CRISIS READINESS",
            //section: "🏁 START HERE",
            section: "🆘 START HERE",
            
            cards: [
              {
                title: "Pulse Checker",
                icon: <Activity className="w-5 h-5 text-red-600" />,
                description: "Uncover critical care gaps fast",
                //link: "/eldercare-private-data-store",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Care Tracker",
                icon: <UserCheck className="w-5 h-5 text-red-600" />,
                description: "Seamlessly track and close care gaps",
                //link: "/healthcare-benefits-application-automation",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "💵 FINANCIAL PROTECTION",
            cards: [
              {
                title: "Spend-Down Genius",
                icon: <TrendingDown className="w-5 h-5 text-red-600" />,
                description: "Get qualified for Medicaid",
                //link: "/medicaid-spenddown-calculator",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Medicaid Planner",
                icon: <CircleDollarSign className="w-5 h-5 text-red-600" />,
                description: "Generate instant Medicaid plans",
                //link: "/healthcare-insurance-claims-recovery",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "❤️ FIND CARE SERVICES",
            cards: [
              {
                title: "Audit Care Services",
                icon: <Search className="w-5 h-5 text-red-600" />,
                description: "Search & Audit Care Providers",
                //link: "/nursing-home-contract-analyzer",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Attorney Finder",
                icon: <Scale className="w-5 h-5 text-red-600" />,
                description: "Locate Elder Law Attorneys",
                //link: "/virtual-healthcare-assistant",
                link: "https://app.poetiq.io/login",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          }
        ]}
      />

      {/* FAQ */}
      <Link
        to="/#FAQ"
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('FAQ');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        className="flex items-center block w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
      {/*Frequent Questions ❓*/}

        Frequent Questions
      </Link>

      {/* Join Waitlist CTA */}
      <div className="pt-4">
        <button
          onClick={() => {
            //onOpenCommunityModal();
            //window.location.href='/login';
            handleLoginClick();
            setIsMobileMenuOpen(false);
          }}
          className="group flex items-center justify-center space-x-2 w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-base font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-500 shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </div>
)}


    </nav>
  );
}
