//import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Target } from 'lucide-react';

interface PageFooterProps {
  onOpenOnboardingModal: () => void;
}

export function PageFooter({ onOpenOnboardingModal }: PageFooterProps) {
  return (
    <footer className="mt-24 border-t border-gray-300 text-left">
      <div className="max-w-7xl mx-auto px-4 py-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {/* Company Info */}
        <Link to="/">
          <div className="space-y-2 space-x-1">
          
            <div className="inline-flex bg-red-100 rounded-full p-0.5">
              <Target className="h-5 w-5 fill-white stroke-red-500" />
            </div>
            <span className="text-xl font-bold text-gray-700 sm:text-xl">poetiq</span>
                           
            <p className="text-sm text-gray-600">
              
              {/*The all-in-one platform for managing Mom and Dad's long-term care affairs!*/}
              The care operating system for family caregivers. <br/><br/>
              Close care gaps, qualify for Medicaid and manage your parent's care journey with zero stress.
            </p>
            {/* Social links */}
          </div>
           </Link> 

        

          {/* Combined 3-Column Grid Section*/} 
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          
               {/* Legal */}
              <div>
                {/*<h3 className="font-semibold mb-4">Legal</h3>*/}
                <h3 className="text-xl mb-4 font-bold text-gray-700 sm:text-xl">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/privacy.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      privacy policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      terms of service
                    </a>
                  </li>
                  <li>
                    <a href="/cookie.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      cookie policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-4 font-bold text-gray-700 sm:text-xl">resources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="https://app.poetiq.io/elder-care-checklist" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                        elder care document checklist
                    </a>
                  </li>
                  <li>
                    <a href="https://app.poetiq.io/personal-care-agreement" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                        personal care agreement
                    </a>
                  </li>
                  <li>
                    <a href="https://app.poetiq.io/personal-patient-property-record" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                        personal property record
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="hidden sm:block  mt-6 pt-8">
          <div className="flex flex-col space-x-2 sm:flex-row items-center text-sm text-gray-600">
            <p className="order-2 sm:order-1">&copy; 2026 poetiq.io All rights reserved.</p>
            <div className="flex space-x-6 order-1 sm:order-2">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                {/*We make it super easy for family caregivers to qualify their parents for Medicaid. */}
                Connect with
                <a href="mailto:team@poetiq.io" className="text-red-500 hover:text-red-600 font-medium transition-colors">
                  {' '}<u>The Poetiq Team</u>{' '}
                </a>
                via Email.
              </p>
            </div>
          </div>
        </div>

{/*===============Start Mobile Version ======================*/}
        <div className="sm:hidden mt-6">
          <div className="flex flex-col space-x-2 sm:flex-row items-center text-sm text-gray-600">
            <p className="order-2 sm:order-1">&copy; 2026 poetiq.io All rights reserved.</p>
            <div className="flex space-x-6 order-1">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Connect with
                <a href="mailto:team@poetiq.io" className="text-red-500 hover:text-red-600 font-medium transition-colors">
                  {' '}<u>The Poetiq Team</u>{' '}
                </a>
                via Email.
              </p>
            </div>
          </div>
        </div>
{/*=================== End Mobile Version ===================== */}        
      </div>
    </footer>
  );
}
