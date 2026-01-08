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
  Zap 
} from 'lucide-react';

interface PageMenuNavProps {
  onOpenCommunityModal: () => void;
}

export function PageMenuNav({ onOpenCommunityModal }: PageMenuNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">
      <a href="/dev">
        <div className="flex items-center space-x-2">
          <div className="bg-red-500 rounded-full p-1.5 sm:p-2">
            <HeartPulse className="h-7 w-7 fill-white stroke-red-500 sm:h-9 sm:w-9" />
          </div>
          <span className="text-2xl font-bold text-red-500 sm:text-2xl">poetiq</span>
        </div>
      </a>

      {/* Desktop Navigation Buttons */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="items-center flex justify-center space-x-2">
          
          {/* START: Caregiving Tools Dropdown Menu */}
          <div className="relative group">
            {/* Menu Header - Caregiving Tools */}
            <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Caregiving Tools 🩺
            </button>

            {/* Mega Menu Dropdown - Full Width 3 Column */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-5xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                
                {/* Card 1: Caregiver Agency Finder */}
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
                    Simple tool to help you find rated caregiver agencies close to you. Search 12,500 caregiving agencies. Get summary reports and book a call.
                  </p>
                </Link>

                {/* Card 2: Nursing Home Finder */}
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
                    Discover highly-rated nursing homes and assisted living facilities in your area. Compare ratings, amenities, and care quality to make informed decisions.
                  </p>
                </Link>

                {/* Card 3: Dementia Assessment Test */}
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
                    Take a comprehensive cognitive test to evaluate memory and thinking skills. Get insights and recommendations for next steps in care planning.
                  </p>
                </Link>

              </div>
            </div>
          </div>
          {/* END: Caregiving Tools Dropdown Menu */}

          {/* START: Executive Services Dropdown Menu */}
          <div className="relative group">
            {/* Menu Header - Executive Services */}
            <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Executive Services ⚙️
            </button>

            {/* Mega Menu Dropdown - Full Width 3 Column Grid */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-6xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
              {/* Grid Container - 6 items in 2 rows */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                
                {/* Card 1: Logistics Engine */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <FileText className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Logistics Engine
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Outsource the administrative maze of broken bureaucracy and insurance claims. Our AI-Human hybrid system handles the "chaser" emails and phone marathons that stall your workday.
                  </p>
                </a>

                {/* Card 2: Financial Defense */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <Shield className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Financial Defense
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Stop hemorrhaging cash and protect your parents' hard-earned legacy. Access proprietary spend-down models and elite legal audits to stop predatory facility contracts.
                  </p>
                </a>

                {/* Card 3: Career Protection */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <Briefcase className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Career Protection
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Maintain your professional presence while ensuring mom and dad are safe. Never miss a strategic travel opportunity or boardroom event with our on-demand emergency caregiver network.
                  </p>
                </a>

                {/* Card 4: Family Advocacy */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <Users className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Family Advocacy
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A safe space to vent and resolve high-stakes sibling friction. Join a confidential circle of peers and clinical coaches to share the mental load of being the "responsible one."
                  </p>
                </a>

                {/* Card 5: Clinical Insight */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <Activity className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Clinical Insight
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Replace medical guesswork with executive-grade data and audits. Leverage cognitive health assessments and provider benchmarking to make decisions with absolute confidence.
                  </p>
                </a>

                {/* Card 6: Tactical Response */}
                <a
                  href="/dev/#OperationalSupport"
                  className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                    <Zap className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                    Tactical Response
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Real-time support for the unplanned logistics that keep you on high-alert. Activate standby assistance for hospital transport and pharmacy runs so you can finally sleep better tonight.
                  </p>
                </a>

              </div>
            </div>
          </div>
          {/* END: Executive Services Dropdown Menu */}

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

          <button
            onClick={() => {
              window.location.href = '/dev#FAQ';
            }}
            className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            FAQ ❓
          </button>

        </div>

        <button
          onClick={onOpenCommunityModal}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
        >
          <span>Join Community</span>
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

          {/* START: Caregiving Tools Dropdown Menu */}
          <div className="relative group">
            {/* Menu Header - Caregiving Tools */}
            <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Caregiving Tools 🩺
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
                  <span>Take Dementia Assessment</span>
                </Link>
              </div>
            </div>
          </div>
          {/* END: Caregiving Tools Dropdown Menu */}

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
            Executive Services ⚙️
          </button>

          <button
            onClick={() => {
              window.location.href = '#FAQ';
              setIsMobileMenuOpen(false);
            }}
            className="w-11/12 max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            FAQ ❓
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
            <span>Join Community</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      )}

    </nav>
  );
}
