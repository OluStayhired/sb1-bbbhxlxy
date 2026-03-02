import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  ClipboardCheck, 
  Heart, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Activity,
  LifeBuoy,
  Briefcase,
  UserCheck,
  FileCheck,
  BookOpen,
  MessageSquare,
  HeartHandshake
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { EligibilityFreeTool } from '../components/EligibilityFreeTool';
import { CommunityModal } from '../components/CommunityModal';
import { TooltipExtended } from '/src/utils/TooltipExtended';

import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';


export function MedicaidCoPilotPage() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };

  const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  const openOnboardingModal = () => {
  setIsOnboardingModalOpen(true);
};

const closeOnboardingModal = () => {
  setIsOnboardingModalOpen(false);
};

  return (
    <>
      <div id="top_page" className="min-h-screen bg-white">
      
      <div className="hidden sm:block sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        <div className="sm:hidden">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        <main className="max-w-7xl mx-auto px-6 pb-32">
          {/* Hero Section */}
          <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-2 rounded-lg">
            <h1 className="mt-24 text-3xl sm:text-5xl font-bold text-gray-700 mb-4">
              {/*Navigate*/}
              Instant
              <span className="space-x-1">

                <span className="bg-gradient-to-l from-red-300 via-red-400 to-red-500 bg-clip-text text-transparent"> Long-Term <br className="sm:hidden"/> Care Support </span> 
                {/*Support*/}
              </span>
              <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-3">
                <span className="sm:hidden font-normal">Quick eligibility answers . Expert guidance . Free AI assistant</span>   
                <span className="hidden sm:inline font-normal">Get quick answers to complex Medicaid, VA, and state-specific eligibility rules.</span> 
                
                
              </p>
            </h1>
          </div>

             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  <span className="font-semibold">Join Our Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#HowItWorks'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
                >
                  See How it Works
                </button>
              </div>

        
          {/* Main Tool Section - EligibilityFreeTool Integration */}
          <section className="mt-4 pt-4">
            
              
            {/* Embedded EligibilityFreeTool */}
            <EligibilityFreeTool />
          </section>

          {/* How It Works Section */}
          <section id="HowItWorks" className="mt-24 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Three simple steps to get the support you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <BookOpen className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Ask Your Questions
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Start chatting with Ellie about your coverage options and eligibility concerns
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <Activity className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Get Expert Insights
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Receive personalized guidance based on your specific situation and needs
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <Target className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Take Action
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Move forward with confidence knowing exactly what steps to take next
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mt-24 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Care Guide?
              </h2>
              <p className="text-gray-600 text-lg">
                Everything you need to navigate long-term care insurance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit 1 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Always Available</h4>
                  <p className="text-sm text-gray-600">Get answers 24/7, whenever you need them</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Completely Free</h4>
                  <p className="text-sm text-gray-600">No hidden fees or subscription costs</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <UserCheck className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Expert Knowledge</h4>
                  <p className="text-sm text-gray-600">Backed by long-term care specialists</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <HeartHandshake className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Personalized Support</h4>
                  <p className="text-sm text-gray-600">Tailored guidance for your unique situation</p>
                </div>
              </div>

              {/* Benefit 5 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <LifeBuoy className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Confidential & Secure</h4>
                  <p className="text-sm text-gray-600">Your information stays private & protected</p>
                </div>
              </div>

              {/* Benefit 6 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <TrendingUp className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Up-to-Date Info</h4>
                  <p className="text-sm text-gray-600">Latest policies and eligibility criteria</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-16 py-16 bg-gradient-to-t from-red-500 via-red-100 to-white text-gray-900 text-center rounded-xl">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl text-red-400 sm:text-4xl md:text-6xl font-bold leading-tight mb-8">
                Ready to take control of your long-term care journey?
              </h2>
              <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                Get instant access to exclusive resources
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <TooltipExtended text="⚡Join Poetiq - Protect Mom and Dad's estate without sacrificing your personal savings">
                  <button
                    onClick={openCommunityModal}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-lg font-semibold shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
                  >
                    <span>Join Our Waitlist</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </TooltipExtended>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-all text-lg font-semibold shadow-lg hover:shadow-xl group"
                >
                  <span>Start Chatting Now</span>
                  <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-50" />
                  <span className="text-sm font-medium">100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-50" />
                  <span className="text-sm font-medium">Trusted by Thousands</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-red-50" />
                  <span className="text-sm font-medium">Expert Verified</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
            <PageFooter 
              onOpenOnboardingModal={openOnboardingModal}
            />  
        </main>

        {/* Community Modal */}
        <CommunityModal
          isOpen={isCommunityModalOpen}
          onClose={closeCommunityModal}
        />

        {/* Onboarding Questions Modal */}
        <OnboardingQuestionsModal
          isOpen={isOnboardingModalOpen}
          onClose={closeOnboardingModal}
          />

      </div>
    </>
  );
}

export default MedicaidCoPilotPage;
