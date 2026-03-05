import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Shield, 
  Users, 
  PhoneCall,
  FileText,
  Brain,
  Smile,
  ArrowRight,
  Sparkles,
  Timer,
  Target,
  Award,
  Calendar,
  Zap,
  HandHeart,
  Home,
  CircleDollarSign,
  Activity,
  HeartHandshake,
  UserCheck,
  ClipboardCheck,
  Lightbulb,
  MessageCircleHeart,
  ShieldAlert,
  BookHeart
} from 'lucide-react';
import { WaitlistModal } from '../components/WaitlistModal';
import { PageFooter } from '../components/PageFooter';
import { PageMenuNav } from '../components/PageMenuNav';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { CommunityModal } from '../components/CommunityModal';

export function EldercareCaseStudies() {
  const navigate = useNavigate();
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openOnboardingModal = () => {
    setIsOnboardingModalOpen(true);
  };

  const closeOnboardingModal = () => {
    setIsOnboardingModalOpen(false);
  };

  const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };

  const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.observe-animation').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const impactStats = [
    {
      icon: Clock,
      number: "15+",
      label: "Hours Reclaimed",
      description: "Average time reclaimed per month for emotional connection",
      color: "red"
    },
    {
      icon: TrendingUp,
      number: "70%",
      label: "Success Rate",
      description: "Increased rate of overturning care denials via professional appeals",
      color: "red"
    },
    {
      icon: HeartHandshake,
      number: "40%",
      label: "Better Coordination",
      description: "Improvement in Relational Coordination between families and care facilities",
      color: "red"
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Removed Unnecessary Paperwork",
      //subtitle: "Restoring the relationship between a daughter and her father in Memory Care",
      subtitle: "Automated insurance claims. Restored broken family relationships.",
      persona: {
        name: "Maria Chen",
        age: 47,
        profession: "Healthcare Administrator",
        location: "Seattle, WA",
        situation: "Father in Memory Care facility"
      },
      problem: {
        headline: "The Breaking Point",
        description: "Maria spent 12+ hours a week fighting insurance denials, leaving her emotionally depleted and reactive during her father's visits.",
        painPoints: [
          "Spent entire visits on the phone with insurance companies",
          "Father sat alone while she handled administrative tasks",
          "Felt like an unpaid secretary instead of a daughter",
          "Constant state of administrative overwhelm"
        ],
        icon: FileText
      },
      intervention: {
        headline: "The Poetiq Solution",
        description: "Our platform automated her father's long-term care insurance claims and managed the monthly eligibility verification.",
        actions: [
          "Automated long-term care insurance claims processing",
          "Monthly eligibility verification management",
          "Real-time claim status updates",
          "Professional appeals handling"
        ],
        icon: Zap
      },
      result: {
        headline: "The Transformation",
        metric: "15 hours",
        metricLabel: "reclaimed per month",
        description: "Maria now arrives at the facility as a daughter, not an administrator.",
        outcomes: [
          "No more phone calls during visits",
          "Fully present with her father",
          "Restored emotional connection",
          "Peace of mind knowing claims are handled"
        ],
        icon: Heart
      },
      emotionalWin: "I used to arrive at the facility and spend my entire visit on the phone with the insurance company while my dad sat right in front of me. Now, I'm his daughter again, not his unpaid secretary.",
      //image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800",
      image: "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/maria-chen-dad.png",
      bgGradient: "from-red-50 via-white to-red-50"
    },
    {
      id: 2,
      title: "Overturned Coverage Denials",
      subtitle: "Secured critical Medicaid coverage after initial claims rejection",
      //subtitle: "Secure critical Medicaid coverage. through a comprehensive forensic appeal after an initial denial."
      persona: {
        name: "David Martinez",
        age: 42,
        profession: "Senior Engineering Manager",
        location: "Austin, TX",
        situation: "Mother denied Medicaid home-care coverage"
      },
      problem: {
        headline: "The Crisis Mode",
        description: "David's mother was denied Medicaid coverage for home-care assistance, creating a major crisis and financial panic.",
        painPoints: [
          "Initial Medicaid denial for home-care assistance",
          "Constant financial panic and uncertainty",
          "Unable to be emotionally present with mother",
          "The 'what if' wall preventing connection"
        ],
        icon: ShieldAlert
      },
      intervention: {
        headline: "The Professional Appeal",
        description: "Our team audited the filing and submitted a professional appeal, overturning the denial in 21 days.",
        actions: [
          "Complete audit of initial Medicaid filing",
          "Professional appeal preparation and submission",
          "Expert documentation and evidence gathering",
          "21-day turnaround on appeal approval"
        ],
        icon: ClipboardCheck
      },
      result: {
        headline: "The Relief",
        metric: "70%",
        metricLabel: "higher success rate on appeals",
        description: "David could finally walk into his mother's room with a clear head.",
        outcomes: [
          "Medicaid coverage approved",
          "Financial panic eliminated",
          "Emotional presence restored",
          "Professional expertise delivered results"
        ],
        icon: CheckCircle2
      },
      emotionalWin: "Having a team handle the appeal meant I could walk into her room with a clear head. I could finally be 'present' because I wasn't panicked.",
      //image: "https://images.unsplash.com/photo-1559839914-17aae19338d3?w=800",
      image: "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_son.png",
      bgGradient: "from-red-50 via-white to-red-50"
    },
    {
      id: 3,
      title: "Unblocked Communication Challenges",
      subtitle: "Used a HIPAA Assistant to improve communication with facility staff",
      persona: {
        name: "Sarah Hernandez",
        age: 44,
        profession: "Marketing Director",
        location: "Boston, MA",
        situation: "Mother in assisted living facility"
      },
      problem: {
        headline: "The Communication Barrier",
        description: "Sarah felt shut out of her mother's care plan, leading to a 40% higher stress level due to medical jargon and missed updates.",
        painPoints: [
          "Felt excluded from mother's care plan",
          "Medical jargon created confusion",
          "Missed critical care updates",
          "Administrative frustration leaked into relationship"
        ],
        icon: PhoneCall
      },
      intervention: {
        headline: "The HIPAA Assistant",
        description: "A dedicated HIPAA Assistant was assigned to coordinate with the facility and translate medical updates into a weekly digest.",
        actions: [
          "Dedicated HIPAA Assistant assigned",
          "Direct coordination with facility staff",
          "Medical jargon translated to plain language",
          "Weekly digest of care plan updates"
        ],
        icon: UserCheck
      },
      result: {
        headline: "The Connection",
        metric: "40%",
        metricLabel: "increase in Relational Coordination",
        description: "Sarah could finally focus on holding her mother's hand and listening.",
        outcomes: [
          "Clear understanding of care plan",
          "Weekly updates in plain language",
          "Reduced stress and confusion",
          "Improved family satisfaction"
        ],
        icon: MessageCircleHeart
      },
      emotionalWin: "I didn't realize how much my 'administrative frustration' was leaking into my relationship with my mom. My assistant gave me the peace of mind to just hold her hand and listen.",
      //image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800",
      image: "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sara-patel-image.png",
      bgGradient: "from-red-50 via-white to-red-50"
    },
    {
      id: 4,
      title: "Automated Spend-Down Accounting",
      subtitle: "Seamlessly navigated the Medicaid Look-Back for Dad's transition",
      persona: {
        name: "James Thompson",
        age: 45,
        profession: "Financial Analyst",
        location: "Chicago, IL",
        situation: "Father entering nursing home"
      },
      problem: {
        headline: "The Avoidance Pattern",
        description: "James was avoiding visits because the facility felt like a place of chores where he had to collect 5 years of bank statements.",
        painPoints: [
          "Facility became a 'place of chores'",
          "5-year financial document collection required",
          "Avoided visits due to task association",
          "Medicaid look-back period overwhelming"
        ],
        icon: CircleDollarSign
      },
      intervention: {
        headline: "The Complete Support",
        description: "Poetiq handled the Medicaid application process, including the secure collection and filing of historical financial data.",
        actions: [
          "Complete Medicaid application management",
          "Secure financial document collection",
          "5-year look-back period handled",
          "Historical data organized and filed"
        ],
        icon: Shield
      },
      result: {
        headline: "The Reconnection",
        metric: "30%",
        metricLabel: "decrease in caregiver depression",
        description: "The nursing home became a place of connection again, not a place of tasks.",
        outcomes: [
          "No more document collection stress",
          "Visits became about connection",
          "Reduced depression and anxiety",
          "Facility association transformed"
        ],
        icon: Smile
      },
      emotionalWin: "I was avoiding the home because I associated it with the stress of the look-back period. By outsourcing the filing, my visits to the nursing home became a place of connection again, not a place of tasks.",
      //image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      image: "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/james-financial-analyst.png",
      bgGradient: "from-red-50 via-white to-red-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-white">
      <div className="hidden sm:block sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
        <PageMenuNav 
          onOpenOnboardingModal={openOnboardingModal}
        />
      </div>

      <div className="sm:hidden">
        <PageMenuNav 
          onOpenOnboardingModal={openOnboardingModal}
        />
      </div>
      
      <main className="max-w-7xl mx-auto px-6 pb-32">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-red-50 via-red-50 to-white rounded-3xl mt-8">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border-2 border-red-200 mb-6 shadow-sm">
              <BookHeart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-gray-700">Real Stories of Relief</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
              The Science of{' '}
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Being Present
              </span>
              {/*
              <br className="hidden sm:inline"/>
              <span className="block sm:inline text-3xl sm:text-5xl md:text-6xl mt-2">
                The Science of Being Present
              </span>
              */}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Research shows that <span className="font-bold text-gray-900">92% of adult children</span> find "navigating the system" more stressful than providing actual care. We don't just file paperwork, we remove the administrative noise that stands between you and your parents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                //onClick={() => setIsWaitlistModalOpen(true)}
                onClick={openCommunityModal}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-2xl shadow-red-500 hover:shadow-4xl hover:shadow-red-600 hover:-translate-y-0.5"
              >
                <span className="font-semibold">Join the Waitlist</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
              >
                Read the Stories
              </button>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-4 py-2">
                  <Brain className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-red-600">The Science Behind It</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 leading-tight">
                  Reconnecting <br className ="sm:hidden"/> <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"> with Mom & Dad</span>
                </h2>
                
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    When you are buried under insurance denials and Medicaid look-back periods, your brain stays in <span className="font-bold text-red-600">"threat mode."</span> You aren't just losing time, you're losing the ability to be emotionally present.
                  </p>
                  
                  <p>
                    We built Poetiq on a simple data point. Families who outsource the "administrative 2nd job" report a <span className="font-bold text-red-600">30% decrease in depression</span> and a significant increase in the quality of their visits.
                  </p>
                  
                  <p className="text-gray-900 font-semibold">
                    By handling the claims, the appeals, and the HIPAA hurdles, we ensure that when you walk into that room, you aren't a stressed-out family care coordinator, you become a family member again.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl opacity-60 blur-2xl"></div>
                <img 
                  //src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800" 
                  src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/family_picture_v1.png"
                  alt="Family connection"
                  className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border-4 border-red-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-500 rounded-xl">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">92%</div>
                      <div className="text-sm text-gray-600">Feel Heard</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-white rounded-3xl border-2 border-red-100 shadow-xl shadow-red-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white border-2 border-red-200 rounded-full px-6 py-3 mb-6 shadow-sm">
                <Activity className="w-5 h-5 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Proven Impact</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-700 mb-4">
                Our Impact by the <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Numbers</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real results from real families who chose to prioritize connection over paperwork
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {impactStats.map((stat, index) => (
                <div 
                  key={index}
                  className="observe-animation opacity-0 bg-white border-2 border-red-100 rounded-2xl p-8 hover:border-red-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/20"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-red-50 rounded-2xl">
                      <stat.icon className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="text-5xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xl font-bold text-red-600">{stat.label}</div>
                    <p className="text-gray-600 leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={openCommunityModal}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5 inline-flex items-center space-x-3 font-semibold"
              >
                <span>Experience This Relief</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                <Award className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Proven Success Stories</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-700 mb-6">
                Real Families, Real <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Transformation</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These aren't hypothetical scenarios. These are real career professionals who reclaimed their relationships and found peace of mind.
              </p>
            </div>

            <div className="space-y-24">
              {caseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="observe-animation opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Case Study Card */}
                  <div className={`bg-gradient-to-br ${study.bgGradient} rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100`}>
                    
                    {/* Header */}
                    <div className="bg-white/50 backdrop-blur-sm border-b-2 border-red-100 p-8">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1">
                          <div className="inline-flex items-center space-x-2 bg-red-500 text-white rounded-full px-4 py-1 mb-4">
                            <span className="text-sm font-bold">Case Study {study.id}</span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            {study.title}
                          </h3>
                          <p className="text-lg text-gray-700">{study.subtitle}</p>
                        </div>
                        
                        {/* Persona Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 border-2 border-red-100 min-w-[250px] sm:min-w-[280px]">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-red-500 rounded-full">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <span  className="font-bold text-gray-900">Profile</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="font-bold text-lg text-red-600">{study.persona.name}</div>
                            <div className="text-gray-700">{study.persona.age} years old</div>
                            <div className="text-gray-700">{study.persona.profession}</div>
                            <div className="text-gray-600">{study.persona.location}</div>
                            <div className="pt-2 border-t border-red-100 text-gray-700 font-medium">
                              {study.persona.situation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        
                        {/* Problem */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-red-50 rounded-xl">
                              <study.problem.icon className="w-6 h-6 text-red-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{study.problem.headline}</h4>
                          </div>
                          
                          <p className="bg-red-50/60 border p-2 border-red-200 rounded-md text-gray-500 mb-4 hover:border-red-300 hover:bg-red-50 leading-relaxed">
                            {study.problem.description}
                          </p>
                          
                          <div className="space-y-2">
                            {study.problem.painPoints.map((point, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <div className="mt-1 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-600">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Intervention */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-red-500 rounded-xl">
                              <study.intervention.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{study.intervention.headline}</h4>
                          </div>
                          
                          <p className="bg-green-50/60 border p-2 border-green-200 rounded-md text-gray-500 mb-4 hover:border-green-300 hover:bg-green-50 leading-relaxed">
                            {study.intervention.description}
                          </p>
                          
                          <div className="space-y-2">
                            {study.intervention.actions.map((action, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Result */}
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 border-2 border-red-300 hover:scale-105 transition-all duration-300">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                              <study.result.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">{study.result.headline}</h4>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                            <div className="text-4xl font-bold text-white mb-1">{study.result.metric}</div>
                            <div className="text-red-50 font-semibold">{study.result.metricLabel}</div>
                          </div>
                          
                          <p className="text-white mb-4 leading-relaxed font-medium">
                            {study.result.description}
                          </p>
                          
                          <div className="space-y-2">
                            {study.result.outcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-red-50">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                     

{/* Emotional Win Quote with Image */}
<div className="relative bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl overflow-hidden border-2 border-red-200">
  <div className="grid md:grid-cols-5 gap-0">
    {/* Image Section - Takes up 2 columns */}
    <div className="md:col-span-2 relative h-64 md:h-auto">
      <img 
        src={study.image} 
        alt={`${study.persona.name}'s story`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/10 via-white/10 to-transparent md:from-transparent md:via-transparent md:to-red-50/80"></div>
    </div>
    
    {/* Quote Section - Takes up 3 columns */}
    <div className="md:col-span-3 p-8 relative">
      <div className="absolute -top-4 left-8 md:static md:mb-4">
        <div className="p-3 bg-red-500 rounded-full shadow-lg inline-block">
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="mt-8 md:mt-0">
        <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3">
          The Emotional Win
        </div>
        <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
          "{study.emotionalWin}"
        </blockquote>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-1 bg-red-500 rounded-full"></div>
          <div>
            <div className="text-sm font-bold text-gray-900">{study.persona.name}</div>
            <div className="text-xs text-gray-600">{study.persona.profession}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
                   

                    {/* CTA Footer */}
                    {/*<div className="bg-gradient-to-r from-red-500 to-red-600 p-8">*/}
                    <div className="p-8">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-white">
                          <h5 className="text-xl font-bold text-gray-700 mb-2">Ready for your own transformation?</h5>
                          <p className="text-gray-500">Join the families who've reclaimed their peace of mind</p>
                        </div>
                        <button
                          onClick={openCommunityModal}
                          className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/50 rounded-xl font-semibold text-lg shadow-3xl hover:shadow-red-500 hover:scale-105 transition-all duration-500 flex items-center space-x-3 whitespace-nowrap"
                        >
                          <span>Join Waitlist</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-b from-red-50 via-red-50 to-white rounded-3xl mt-20 border-2 border-red-100 shadow-xl shadow-red-500/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white border-2 border-red-200 rounded-full px-6 py-3 mb-8 shadow-sm">
              <HandHeart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">Your Story Starts Here</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-700 mb-6 leading-tight">
              Stop Managing. <br />
              Start <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Connecting.</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              You didn't sign up to be a healthcare administrator. You signed up to be there for your parents. Let us handle the paperwork so you can reclaim what matters most.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button
                onClick={openCommunityModal}
                className="group px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-2xl shadow-red-500 hover:shadow-3xl hover:shadow-red-600 hover:-translate-y-0.5 flex items-center space-x-3 font-bold text-xl"
              >
                <span>Join the Waitlist</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-bold text-xl shadow-sm"
              >
                Learn More
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 bg-white rounded-2xl p-6 border-2 border-red-100 shadow-lg">
                <div className="p-3 bg-red-50 rounded-xl">
                  <Clock className="w-10 h-10 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">15+ Hours</div>
                <div className="text-gray-600 text-sm">Reclaimed Monthly</div>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-white rounded-2xl p-6 border-2 border-red-100 shadow-lg">
                <div className="p-3 bg-red-50 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">70% Success</div>
                <div className="text-gray-600 text-sm">On Appeals</div>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-white rounded-2xl p-6 border-2 border-red-100 shadow-lg">
                <div className="p-3 bg-red-50 rounded-xl">
                  <Heart className="w-10 h-10 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">40% Better</div>
                <div className="text-gray-600 text-sm">Family Coordination</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter onOpenOnboardingModal={openOnboardingModal} />

      {/* Modals */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />

      <OnboardingQuestionsModal
        isOpen={isOnboardingModalOpen}
        onClose={closeOnboardingModal}
      />

      {/* Modals */}
        <CommunityModal
          isOpen={isCommunityModalOpen}
          onClose={closeCommunityModal}
        />

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default EldercareCaseStudies;
