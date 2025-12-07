import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Calendar, PenSquare, Clock, Users, PenTool, Briefcase, Plus, Minus,Menu, MailCheck,
  Bot, CheckCircle,X, Send,Timer, Zap, ArrowRight, HeartPulse, Rocket, Search, Heart, PlusCircle,
  Lightbulb, Sparkles, CircleDollarSign, Star } from 'lucide-react';
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
//import { Helmet } from 'react-helmet-async'; // CRITICAL: For dynamic meta tags
import { OurStoryTimeline } from '../components/OurStoryTimeline';
import { NursingHomeProviderUS } from '../components/NursingHomeProviderUS.tsx';

export function NursingHomeSearchPage() {
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


const handleLoginClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = 'https://app.sosavvy.so/login';
  };

  const handleBlogClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = 'https://www.sosavvy.so/blog';
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
        {/*Desktop Navigation Buttons */}
        {/*  <div className="hidden flex space-x-2 space-x-4 sm:space-y-0 sm:space-x-2">*/}

        <div className="hidden sm:flex items-center space-x-4">

              <a href="/home-health-care" className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">    
                    Caregivers Near Me 📌
                </a> 

                <a href="/nursing-home" className="no-underline px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"> 
                Nursing Home Finder 🎯
                </a>

         
          <button
           
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors              
            shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group"
          >
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Join Waitlist</span>
           <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
               
        </div>
        
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

 {/* Mobile Menu Overlay */}
      {/* This part of the code is generally correct for the overlay. */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-4 py-6"> 

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
           
           <span>Join Waitlist</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        
        </div>
      )}
        
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-2 rounded-lg">

    <h1 className="mt-24 text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Book 
    {/*<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Unstoppable Brands</span>*/}
            <span>
             <span className="bg-gradient-to-l from-red-300 via-red-400 to-red-500  bg-clip-text text-transparent"> Nursing <br className="sm:hidden"/> Homes </span> 
              Faster🔥
              </span>
             <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-3">

               {/*<span className="sm:hidden font-normal">Join a network of career professionals navigating eldercare together</span>  */}
            <span className="sm:hidden font-normal">Search 14,700 homes . Get detailed reports . Book Consultation </span>   
          <span className="hidden sm:inline font-normal">Search 14,700 nursing homes. Get summary reports and book a consultation today</span> 
         </p>
            
          </h1>
          
          {/*end alternative header*/}

          
  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    {/* Adjusted button layout for mobile */}

  </div>

          
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
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
                <h3 class="text-xl font-bold drop-shadow-lg">Book Emergency <br/> Caregivers</h3>
            </div>
          </div>
        </div>
    </div>
  </div>
          
</div>


{/*----------------- Start Nursing Home Provider ----------------------- */}
  <section className="mt-2 border-t border-gray-200">

     <NursingHomeProviderUS />
     {/* Buttons */}
     <div className="flex flex-col sm:mr-10 items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">

<TooltipExtended text="⚡Data Access - Get Access to all the data and analysis when you join The Poetiq Community 💛">
  <button
    onClick={openCommunityModal}
    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-base font-semibold sm:px-4 sm:py-3 sm:text-base
                 shadow-lg shadow-gray-500/60       
     hover:shadow-xl hover:shadow-gray-500/80 group" // Adjusted mobile button size/text for consistency
  >
    
  <PlusCircle className="w-4 h-4 transition-transform duration-300" />
   <span>See More Data</span>
   
  </button>
  </TooltipExtended>


</div>
    
</section>
     
{/*-------------------------- End Nursing Home Provider -------------------------------- */}            
       
         
  {/* ------------------------------ Start Final Call to Action Section --------------------------*/}    

<section className="mt-16 py-16 bg-gradient-to-t from-red-500 via-red-100 to-white text-gray-900 text-center rounded-xl">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-2xl text-red-400 sm:text-4xl md:text-6xl font-bold leading-tight mb-8">
      You don't have to navigate parental care alone
    </h2>
    <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
      Let’s find a home for your loved one today 💪
      
    </p> 

        {/* Buttons */}
      <div className="flex flex-col sm:mr-10  sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"> 
          <button
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-base font-semibold sm:px-4 sm:py-3 sm:text-base
                         shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group" // Adjusted mobile button size/text for consistency
          >
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Join Waitlist</span>
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
          The best community for career professionals struggling with eldercare!
        </p>
        {/* Social links */}
      </div>

      {/* Product Links*/}
      <div className="col-span-1">
        <h3 className="font-semibold mb-4">About Poetiq</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li> <a href="/dev#Community" className="no-underline hover:text-red-400 transition-colors">Community</a></li>
          <li> <a href="/dev#FAQ" className="no-underline hover:text-red-400 transition-colors">Frequently Asked Questions</a></li>
          <li> <a href="#" className="no-underline hover:text-red-400 transition-colors">Roadmap (Coming Soon)</a></li>
        </ul>
      </div>
      

  {/* Care Tools & Resources */}
      <div className="col-span-1">
        <h3 className="font-semibold mb-4">Care Tools & Resources</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li> <a href="https://poetiq.io/dev/nursing-home" className="no-underline hover:text-red-400 transition-colors">Nursing Home Finder 🎯</a></li>
          <li> <a href="https://poetiq.io/dev/home-health-care" className="no-underline hover:text-red-400 transition-colors">Caregivers Near Me 📌 </a></li>    
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
      <p className="order-2 sm:order-1">&copy; 2025 poetiq.io All rights reserved.</p> {/* Order for mobile */}
        <div className="flex space-x-6 order-1 sm:order-2"> 
          {/* Order for mobile */}
          <p class="text-sm text-gray-700 text-center leading-relaxed">
    Community for executive professionals striving to build a career while caring for aging parents. 
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

export default NursingHomeSearchPage;