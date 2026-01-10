import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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
  MessageCircle,
  UserCheck,
  BookOpen,
  HeartHandshake,
  MessageSquare,
  HandHeart,
  UsersRound,
  ShieldCheck,
  Headphones,
  CircleDot,
  Handshake,
  Shield,
  BrainCircuit
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { StressCoachFreeTool } from '../components/StressCoachFreeTool';
import { CommunityModal } from '../components/CommunityModal';
import { TooltipExtended } from '/src/utils/TooltipExtended';

export function EldercareStressCoachPage() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };

  const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  return (
    <>
      <div id="top_page" className="min-h-screen bg-white">
        <PageMenuNav onOpenCommunityModal={openCommunityModal} />

        <main className="max-w-7xl mx-auto px-6 pb-32">
          {/* Hero Section */}
          <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-2 rounded-lg">
            <h1 className="mt-24 text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Manage 
              <span className="space-x-1">
                <span className="bg-gradient-to-l from-red-300 via-red-400 to-red-500 bg-clip-text text-transparent"> Family <br className="sm:hidden"/> Conflicts </span> 
                with empathy
              </span>
              <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-3">
                <span className="sm:hidden font-normal">Resolve family tensions . Expert coaching . Free AI support</span>   
                <span className="hidden sm:inline font-normal">Get expert conflict resolution, family mediation support, and free AI-powered guidance</span> 
              </p>
            </h1>
          </div>

          {/* Feature Highlights - Above the Tool */}
          <section className="mt-16 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {/* Feature 1 */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                    <HandHeart className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      Conflict Resolution
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get practical strategies to resolve family disagreements about eldercare decisions
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                    <BrainCircuit className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      Live Conflict Advisor
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Chat with Sophia, our specialized family conflict advisor available 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                    <Handshake className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      Family Mediation
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Learn techniques to facilitate constructive conversations among family members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Tool Section - StressCoachFreeTool Integration */}
          <section className="mt-8 border-t border-gray-200 pt-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Free AI Conflict Advisor</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Meet Your Family Conflict Advisor
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Navigate family conflicts with compassionate, expert-backed guidance
              </p>
            </div>

            {/* Embedded StressCoachFreeTool */}
            <StressCoachFreeTool />
          </section>

          {/* How It Works Section */}
          <section className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Three simple steps to restore family harmony
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
                      <MessageCircle className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Share Your Challenges
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Describe the family conflict or caregiving stress you're experiencing
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
                      <Lightbulb className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Receive Expert Guidance
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Get personalized strategies to address your specific family dynamics
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
                      <HeartHandshake className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      Rebuild Harmony
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Apply proven techniques to restore cooperation and understanding
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
                Why Choose Our Conflict Advisor?
              </h2>
              <p className="text-gray-600 text-lg">
                Everything you need to navigate caregiving disagreements s with confidence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit 1 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <Headphones className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Always Available</h4>
                  <p className="text-sm text-gray-600">Get support 24/7, whenever tensions arise</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
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
                  <h4 className="font-semibold text-gray-900 mb-1">Expert-Backed</h4>
                  <p className="text-sm text-gray-600">Guided by family mediation specialists</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <CircleDot className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Personalized Support</h4>
                  <p className="text-sm text-gray-600">Tailored advice for your family situation</p>
                </div>
              </div>

              {/* Benefit 5 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <LifeBuoy className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Confidential & Secure</h4>
                  <p className="text-sm text-gray-600">Your family matters stay private & protected</p>
                </div>
              </div>

              {/* Benefit 6 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors duration-300 group">
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Compassionate Approach</h4>
                  <p className="text-sm text-gray-600">Understanding and empathy at every step</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-16 py-16 bg-gradient-to-t from-red-500 via-red-100 to-white text-gray-900 text-center rounded-xl">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl text-red-400 sm:text-4xl md:text-6xl font-bold leading-tight mb-8">
                Ready to restore peace in your caregiving journey?
              </h2>
              <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                Join families who've found clarity and connection
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <TooltipExtended text="⚡Join The Community and get connected with family conflict resolution experts">
                  <button
                    onClick={openCommunityModal}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-lg font-semibold shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
                  >
                    <span>Join Our Community</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </TooltipExtended>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-all text-lg font-semibold shadow-lg hover:shadow-xl group"
                >
                  <span>Start Your Conversation</span>
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
                  <span className="text-sm font-medium">Trusted by Families</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersRound className="w-5 h-5 text-red-50" />
                  <span className="text-sm font-medium">Expert Mediation</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <PageFooter />
        </main>

        {/* Community Modal */}
        <CommunityModal
          isOpen={isCommunityModalOpen}
          onClose={closeCommunityModal}
        />
      </div>
    </>
  );
}

export default EldercareStressCoachPage;
