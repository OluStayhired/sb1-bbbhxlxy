import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Calendar, PenSquare, Clock, Users, PenTool, Briefcase, Plus, Minus,Menu, MailCheck,
  Bot, CheckCircle,X, Send,Timer, Zap, ArrowRight, HeartPulse, Brain, Target, MapPin,
  Lightbulb, Sparkles, CircleDollarSign, Star, Search } from 'lucide-react';
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

  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);

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

  const openEligibilityModal = () => {
    setIsEligibilityModalOpen(true);
  };
  
      const closeEligibilityModal = () => {
    setIsEligibilityModalOpen(false);
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
         <div className="hidden sm:flex items-center space-x-4">
          <div className="items-center flex justify-center space-x-2">

              {/* START: Eldercare Tools Dropdown Menu */}
              <div className="relative group">
                {/* Menu Header - Eldercare Tools */}
                <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Caregiving Tools 🩺
                  </button>

                    {/* Dropdown Content - Hidden by default, shown on group hover */}
                    <div
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 transition-opacity duration-150 ease-out"
      >
                        <div className="py-1">
                          {/* Caregivers Near Me */}
                            <a href="https://poetiq.io/dev/home-health-care"
                                className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Caregivers Near Me</span>
                    
                            </a>
                            {/* Nursing Home Finder */}
                              <a
                                  href="https://poetiq.io/dev/nursing-home"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                  <Search className="w-3.5 h-3.5" />
                                  <span>Nursing Home Finder</span>
                              </a>

                              {/* Dementia Assessment Tool */}
                              <a
                                  href="https://poetiq.io/dev/dementia-assessment"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Dementia Assessment</span>
                              </a>
                          </div>
                        </div>
                      </div>
                      {/* END: Eldercare Tools Dropdown Menu */}

            {/*Remaining Menu Buttons */}
              <button
              onClick={() => {
              window.location.href = '#Community';
              }}
              className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Community 💛
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
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Join Community</span>
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

           {/* START: Eldercare Tools Dropdown Menu */}
           <div className="relative group">
                {/* Menu Header - Eldercare Tools */}
                <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  Caregiving Tools 🩺
                  </button>

                    {/* Dropdown Content - Hidden by default, shown on group hover */}
                    <div
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 transition-opacity duration-150 ease-out"
      >
                        <div className="py-1">
                          {/* Caregivers Near Me */}
                            <a href="https://poetiq.io/dev/home-health-care"
                                className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Caregivers Near Me</span>
                    
                            </a>
                            {/* Nursing Home Finder */}
                              <a
                                  href="https://poetiq.io/dev/nursing-home"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                  <Search className="w-3.5 h-3.5" />
                                  <span>Nursing Home Finder</span>
                              </a>

                              {/* Dementia Assessment Tool */}
                              <a
                                  href="https://poetiq.io/dev/dementia-assessment"
                                  className="flex text-sm items-center space-x-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Dementia Assessment</span>
                              </a>
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
            Community 💛
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
           
           <span>Join Community</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        
        </div>
      )}
        
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-6 md:py-20 lg:py-24 rounded-lg">
          
        <span className="sm:hidden text-xs sm:text-lg p-3 font-semibold bg-red-100 rounded-full text-red-500 border-8 border-red-50">A Community Fixing ElderCare</span>


        {/*<span className="hidden sm:inline text-xs sm:text-lg p-3 font-semibold bg-red-100 rounded-full text-red-500 border-8 border-red-50">Community of Professionals Supporting Aging Parents</span>*/}
        <span className="hidden sm:inline text-xs sm:text-lg p-3 font-semibold bg-red-100 rounded-full text-red-500 border-8 border-red-50">Frictionless Care for Your Aging Parents</span>
          
           {/*start alternative header */}
    

           {/*start alternative header */}
           <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl leading-tight font-bold mb-2 sm:mb-3"> 
            <p>
              <span className="inline-block bg-gradient-to-l from-red-300 via-red-400 to-red-500 text-transparent bg-clip-text mt-12">
              
                {/*Strive for Balance <br className="sm:hidden" /> in Eldercare <br className="sm:hidden" /> */}
                eldercare support <br className="sm:hidden" /> without <br className="hidden sm:block"/> career <br className="sm:hidden" /> sacrifices 
                {/* This is the key change! */}
                
       <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-3">
         
       <span className="sm:hidden font-normal">A network of career professionals <br/> fixing eldercare together</span>     
        
                  {/*<span className="hidden sm:inline font-normal">We're a community of career professionals solving the overwhelming challenges of eldercare together</span>*/} 

                  <span className="hidden sm:inline font-normal">
                    We're a closed community of career professionals solving caregiving challenges 
                    <br/> with battle-tested systems that generate predictable results.
                  </span> 
         </p>
              </span>
            </p>
          </h1>
          {/*end alternative header*/}

{/*---------------- Start Adding the main hero image ------------------*/}          

{/* Hero Image */}
<div className="hidden sm:inline mt-12 mb-8 w-full max-w-6xl mx-auto px-4">
  <img
    //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq-community-hero.png"
    src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq-hero-big-image.png"
    alt="Poetiq Community"
    className="w-full h-auto rounded-2xl shadow-2xl object-cover"
    //className="w-full h-auto object-cover"
  />
</div>


{/*---------------- End Adding the main hero image ----------------*/}

      <p className="mt-16 mb-1 text-sm sm:text-sm md:text-lg text-red-400 font-normal">
        {/*<span className="font-normal">Join Our Newsletter 🔥</span>*/}
            <span> Get the latest Eldercare Guide 💌</span>
        </p>
        

  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    {/* Adjusted button layout for mobile */}

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

  <h2 className="text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-16 mb-4">
    {/*Community for Career Professionals 👩‍💻*/}
       Caregiving Support for Busy Execs 
  </h2>
  {/*<p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto hover:text-red-500">*/}
  <p className="text-xl sm:text-2xl text-gray-600 mb-12 mx-auto hover:text-red-500">  
       {/*We empower the modern workforce to make better caregiving decisions.*/}
       Get instant eldercare support without spending hours on phone calls.
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
                <h3 className="text-xl font-bold drop-shadow-lg">Book Emergency <br/> Caregivers</h3>
            </div>
          </div>
        </div>
    </div>
  </div>
          
<div className="hidden sm:block w-full p-4 mt-8">

      {/* Main grid container with 5 columns */}
      <div className="grid grid-cols-5 gap-4 h-[650px] grid-rows-2">
          
        {/* Column 1: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-4 h-[650px]">
           {/*------ start first top left image -------*/}
           <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-checker.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            onClick={openEligibilityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Verify Insurance <br/> Eligibility</h3>
            </div>
          </div>

          {/*
          <div className="relative h-full overflow-hidden rounded-xl">
            <img
              //keeping for future use
            />
          </div>
          */}
 
          {/*------ end first left image-------*/}
         
          <div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_son.png"
              alt="Person working"
              className="w-full h-full rounded-xl object-cover aspect-square" // Square aspect ratio for stacked images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Get Early <br/> Financial Planning</h3>
            </div>
          </div>
        </div>
        
        {/* Column 2: One image, spanning two rows */}
        <div className="col-span-1 row-span-2"> {/* 'row-span-2' makes this grid item span two rows */}
          <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/daughter_father.png"
              alt="Meeting in progress"
              className="w-full h-full rounded-xl object-cover object-[40%_70%]" // 'h-full' ensures the image fills the row-span-2 container
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Book Emergency Respite Care</h3>
            </div>
          </div>
           
        </div>

        {/* Column 3: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-4 h-[650px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_daughter.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Manage <br/> Parental Stress</h3>
            </div>
          </div>
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_daughter_blue.png"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/magnifying-glass.png"
              alt="Brainstorming session"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
              <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Get Dementia Assessment</h3>
            </div>
          </div>
        </div>

        {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1 row-span-2">
          <div className="relative border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full group">
            <img
              //src="https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_patient.png"
              alt="Laptop on desk"
              className="w-full h-full rounded-xl object-cover object-[30%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Find Home Caregivers</h3>
            </div>
          </div>
        </div>

        {/* Column 5: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-4 h-[650px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              //src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/black_mother_daughter.png"
              alt="People discussing"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Start <br/> Living Well</h3>
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
            <button
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Support</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
                <h3 className="text-xl font-bold drop-shadow-lg">Compare Residential <br/> Care Homes</h3>
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
          <p className="text-center text-gray-700 font-bold text-xl sm:text-2xl text-gray-600 mx-auto">  
             Trusted by <b className="text-red-400">150+</b> Senior Executives Supporting Elderly Parents
          </p>       
 </div>
        
{/*----------------- Start The Community ----------------------- */}
<section id="Community" className="mt-6 text-center">
          <div className="inline-flex items-center border-8 border-red-200 space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white rounded-full text-lg mb-4 cursor-pointer"
                 
            onClick={() => {
              window.location.href = '#top_page';
              setIsMobileMenuOpen(false);           
              }}
            >
            
            <Sparkles className="w-4 h-4" />
                <span>The Poetiq Community</span>
          </div>
  </section> 

{/*----------------- Start Why Join Community ----------------------- 
  <section className="mt-2 text-center items-center">



    <div className="items-center">

         <div class="flex inset-0 opacity-70 
             [background-image:radial-gradient(circle_at_center,rgba(239,68,68,0.4)_0%,rgba(234,179,8,0.3)_35%,transparent_70%)]">
        </div>
      
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-red-400">
            Why join our <br className="sm:hidden"/> Community
        </h2> 
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto">
            
            The poetiq Community is where career professionals go to restore strategic focus and reclaim the hours required to execute their parental duty without compromising parental dignity. <br/><br/>
          
          It’s a private, high-integrity network where you'll get direct access to experienced peers who share unfiltered insights on the crisis. They help each other dismantle a system designed for the 19th Century. <br/><br/>
          
          The poetiq Community is where to find clarity, control, and the professional blueprint for dignified parental care
          
          </p>

      <button
              onClick={handleLoginClick}
             className="group flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg mx-auto">
      
           <span>Join Community</span>
           <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>        
      
        </div>
    
      </section>
        */}
{/*-------------------------- End Why Join Community Section -------------------------------- */}   


{/*---------------------- Start Gradient Version for Testing --------------------------------*/}        

<section className="mt-2 text-center">

    {/* CONTAINER: This now acts as the bounding box for the absolute gradient. Added relative. */}
    <div className="relative items-center py-6"> 

        {/* GRADIENT LAYER: Changed back to 'absolute' so it fills the height/width of the relative parent. */}
        <div className="absolute inset-0 opacity-20 
             [background-image:radial-gradient(ellipse_at_center,rgba(239,68,68,0.4)_0%,rgba(234,179,8,0.3)_55%,transparent_80%)]">
        </div>

        {/* CONTENT WRAPPER: Added relative z-10 to ensure text and button are visible above the absolute gradient. */}
        <div className="relative z-10 max-w-5xl mx-auto">
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-red-400">
                Why join our <br className="sm:hidden"/> Community
            </h2> 
            <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
              {/*The Poetiq Community is where career professionals go to restore strategic focus and reclaim the hours needed to provide parental care without sacrificing their careers or compromising parental dignity. */}
            The Poetiq Community is where career professionals go to find the best eldercare solution and reclaim the hours spent supporting their aging parents without compromising their careers or their parents dignity <br/><br/>
                It’s a private, high-integrity network where you'll get direct access to experienced peers who share unfiltered insights on the unique and tremendous challenges of caring for aging family members.<br/><br/> 
              They help each other navigate a labyrinth of eldercare choices that can threaten to overwhelm us as we struggle to maintain the delicate balance between our careers and families. <br/><br/>
                The Poetiq Community is where to find clarity, control, and the professional blueprint for dignified eldercare.
            </p>

            <button
                //onClick={handleLoginClick}
                onClick={openCommunityModal}
                className="group flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg mx-auto">
                <span>Join Community</span>
                {/* Placeholder for ArrowRight icon or similar */}
              {/*<span className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>*/}
               <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button> 

        </div>
    </div>
</section>        

{/*------------------------End Gradient version for Testing ----------------------------------*/}        


{/*----------------- Start Two Friends Started Community ----------------------- */}
  <section id="our_story" className="mt-16 text-center items-center">

    <div className="items-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-red-400 mb-4">
            Started by two friends 👋
        </h2> 

      <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto hover:text-red-500">
          Passionate about fixing the Eldercare Crisis Together
      </p>

      <div className="w-full p-4 mb-10">

       <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 sm:gap-4 h-[450px] grid-rows-2 sm:mx-[20%]">

        {/* Column 1: Two stacked images */}
        <div className="hidden sm:block col-span-1 flex flex-col gap-4 h-[450px]">
          <div className="relative rotate-[-5deg] h-1/2 overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-red-500/60 hover:shadow-red-500/90">
            <img
              //src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/olu_profile_dark.png"
              alt="Image 1"
              className="w-full h-full object-cover aspect-square" // Square aspect ratio for stacked images
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            
            {/* --- TEXT OVERLAY ADDED HERE --- */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white text-left">
            <h3 className="text-lg sm:text-xl font-bold drop-shadow-lg">Olu </h3>
              <p className="text-sm sm:text-base mt-1 drop-shadow-lg opacity-90">Co-Founder</p>
             </div>
          </div>
          <div className="relative h-1/2 overflow-hidden">
            <img
              //src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              //alt="Image 2"
              //className="w-full h-full object-cover aspect-square" // Square aspect ratio for stacked images
            />
          </div>
        </div>

        {/* Column 2: One image, spanning two rows to match Column 1's height */}
        <div className="sm:col-span-2 col-span-2 row-span-2"> 
          <div className="relative border-2 p-4 border-red-400 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full sm:rotate-[5deg]">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/jeff_and_olu.png"
              alt="Image 3"
              className="w-full h-full object-cover sm:object-[50%_60%] object-[20%_50%] rounded-xl"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>  


              {/* --- TEXT OVERLAY ADDED HERE --- */}
                    <div className="sm:hidden absolute bottom-4 left-0 right-0 p-4 sm:p-6 text-white text-center">
                        <h3 className="text-xl sm:text-xl font-bold drop-shadow-lg">Jeff & Olu </h3>
                        <p className="text-base sm:text-base mt-1 drop-shadow-lg opacity-90">The Founders</p>
                    </div>
          </div>
        </div>

        {/* Column 3: Two stacked images (to meet the total of 5 images) */}
        <div className="hidden sm:block col-span-1 flex flex-col gap-4 h-[450px]">
          <div className="relative h-1/2 overflow-hidden transform transition-all duration-300">
            {/*saving this*/}
          </div>
          <div className="relative rotate-[7deg] h-1/2 overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-red-500/60 hover:shadow-red-500/90">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/jeff_profile.png"
              alt="Image 5"
              className="w-full h-full object-cover aspect-square"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    
                    {/* --- TEXT OVERLAY ADDED HERE --- */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white text-left">
                        <h3 className="text-lg sm:text-xl font-bold drop-shadow-lg">Jeff </h3>
                        <p className="text-sm sm:text-base mt-1 drop-shadow-lg opacity-90">Co-Founder</p>
                    </div>
          </div>
        </div>
      </div>
    </div>
      {/*
      <button
              onClick={handleLoginClick}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg                             hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/60 hover:shadow-xl hover:shadow-blue-500/80 sm:px-8 sm:py-4 sm:text-lg                         group mx-auto"
        >
      
           <span>Join Community</span>
           <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>   

       */}   

    </div>
    
  </section>
     
{/*-------------------------- End Two Friends Started Community -------------------------------- */}   


{/*----------------- Start Two Friends Started Community ----------------------- */}
  <section className="mt-2 text-center">

     <OurStoryTimeline />
    <button
      //onClick={handleLoginClick}
      onClick={openCommunityModal}
      className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 border border-red-500 bg-white text-red-500 text-base font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg group mx-auto"
        >
      
            <span>Join Community</span>
           <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </button>   
</section>
     
{/*-------------------------- End Two Friends Started Community -------------------------------- */} 


        
        

{/*------------------- Start Images Added for Effect -----------------------------*/}

 {/* Background Images - Absolutely positioned for "scattered" effect with animations */}
      {/* IMPORTANT: These images now have a higher z-index (z-30) to appear on top of the content div (z-20) */}
      {/* Replace placeholder URLs with your actual image URLs (e.g., from Supabase)  */}

      {/* Image 1: Top-left, floating circle 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/agency_owner_img.png"
        //alt="Abstract blue shape"
        className="hidden sm:block absolute top-8 left-1/4 animate-float opacity-80 w-40 h-40 sm:w-40 sm:h-40 rounded-md  z-30"
        style={{ animationDelay: '0s', animationDuration: '6s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/agency_owner_img.png"; }}
      />
      */}
        
      {/* Image 2: Bottom-right, floating rounded rectangle 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/investor_image.png"
        alt="Abstract pink shape"
        className="hidden sm:block absolute bottom-16 right-1/4 animate-float opacity-80 w-32 h-32 sm:w-32 sm:h-32 rounded-xl transform rotate-12 z-30"
        style={{ animationDelay: '2s', animationDuration: '7s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/investor_image.png"; }}
      />
      */}
      {/* Image 3: Mid-right, smaller floating circle 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/marketing_exec.png"
        alt="Abstract green shape"
        className="hidden sm:block absolute top-1/3 right-10 animate-float opacity-80 w-32 h-32 sm:w-32 sm:h-32 rounded-full z-30"
        style={{ animationDelay: '4s', animationDuration: '5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/marketing_exec.png"; }}
      />
      */}
        {/* Image 4: Bottom-left, larger floating rectangle 
        <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/the_startup_founder.png"
        alt="Abstract orange shape"
        className="hidden sm:block absolute bottom-12 left-1/4 animate-float opacity-80 w-40 h-40 sm:w-40 sm:h-40 rounded-xl transform -rotate-6 z-30"
        style={{ animationDelay: '1s', animationDuration: '8s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/the_startup_founder.png"; }}
      />
      */}
      {/* Image 5: Mid-left, medium floating circle 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/accountant_image.png"
        alt="Abstract red shape"
        className="hidden sm:block absolute top-1/2 left-10 transform -translate-y-1/2 animate-float opacity-80 w-28 h-28 sm:w-36 sm:h-36 rounded-full z-30"
        style={{ animationDelay: '3s', animationDuration: '6.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/accountant_image.png"; }}
      />
      */}
      {/* Image 6: Top-right, smaller floating shape (rounded-lg rotated 45deg for a diamond look) 
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-images/law_practice_owner.png"
        alt="Abstract purple shape"
        className="hidden sm:block absolute top-16 right-1/4 animate-float opacity-80 w-40 h-40 sm:w-40 sm:h-40 rounded-lg transform rotate-15 z-30"
        style={{ animationDelay: '5s', animationDuration: '5.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/eef2ff/4338ca?text=Shape6"; }}
      />
      */}

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
    <p>We are pioneering the professional blueprint for dignified eldercare services. This blueprint is the high-integrity framework - from data standards and vendor vetting protocols to administrative automation - that should exist but doesn't. Your role is crucial: by sharing your specific logistical failures and successes, you provide the essential, real-world data that allows the community to stress-test and finalize this professional-grade solution, turning your personal agony into systemic change.
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
    Are the founders, Jeff and Olu, qualified to lead a solution of this magnitude?
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
    <p>Our founders' primary qualification is shared experience and decades of combined executive-level competence. The solution is not driven by clinical expertise, but by logistical mastery. Jeff and Olu faced the exact crisis you face and applied their corporate strategy to solve their personal care chaos. They lead the mission, but the ultimate authority and expertise reside within the collective professional intelligence of the executive members.
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
      You don't have to navigate Eldercare alone
    </h2>
    <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
      Let’s find uncompromising clarity together 💪
    </p>

        {/* Buttons */}
      <div className="flex flex-col sm:mr-10  sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"> 
          <button
            //onClick={handleLoginClick}
            //onClick={openWaitlistModal}
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-base font-semibold sm:px-4 sm:py-3 sm:text-base
                         shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group" // Adjusted mobile button size/text for consistency
          >
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Join Community</span>
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
      <p className="order-2 sm:order-1">&copy; 2025 poetiq.io All rights reserved.</p> {/* Order for mobile */}
        <div className="flex space-x-6 order-1 sm:order-2"> 

          

          <p class="text-sm text-gray-700 text-center leading-relaxed">
    Community for executive professionals striving to build a career while caring for aging parents. 
    Connect with 
    <a href="https://www.linkedin.com/in/oluadedeji" class="text-red-500 hover:text-red-600 font-medium transition-colors"> <u>Olu</u> </a>
    and 
    <a href="https://www.linkedin.com/in/jeffreymbaumgarten/" class="text-red-500 hover:text-red-600 font-medium transition-colors"> <u>Jeff</u> </a>
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
      
      <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={closeEligibilityModal}
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