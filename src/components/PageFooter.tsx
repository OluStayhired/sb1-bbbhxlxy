import React from 'react';
import { HeartPulse, Target } from 'lucide-react';

export function PageFooter() {
  return (
    <footer className="mt-24 border-t border-gray-300 text-left">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="space-y-4 space-x-1">
            <div className="inline-flex bg-red-100 rounded-full p-0.5">
              <Target className="h-5 w-5 fill-white stroke-red-500" />
            </div>
            <span className="text-xl font-bold text-red-500 sm:text-xl">poetiq</span>
            
            <p className="text-sm text-gray-600">
              {/*The best community for career professionals struggling with eldercare!*/}
              The all-in-one platform for managing Mom and Dad's long-term care affairs!
            </p>
            {/* Social links */}
          </div>

          {/* Product Links*/}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">About Poetiq</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#Community" className="no-underline hover:text-red-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#FAQ" className="no-underline hover:text-red-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:text-red-400 transition-colors">
                  Roadmap (Coming Soon)
                </a>
              </li>
            </ul>
          </div>

          {/* Care Tools & Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Care Tools & Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/dev/nursing-home" className="no-underline hover:text-red-400 transition-colors">
                  Nursing Home Finder 🎯
                </a>
              </li>
              <li>
                <a href="/dev/home-health-care" onClick={() => false} className="no-underline hover:text-red-400 transition-colors">
                  Caregivers Near Me 📌
                </a>
              </li>
              <li> 
                <a href="/dev/dementia-assessment" className="no-underline hover:text-red-400 transition-colors">
                  Dementia Screening Test ✅
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:text-red-400 transition-colors">
                  Blogs (coming soon) ✍️
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/privacy.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookie.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <p className="order-2 sm:order-1">&copy; 2026 poetiq.io All rights reserved.</p>
            <div className="flex space-x-6 order-1 sm:order-2">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
              We make it insanely easy for family caregivers to fix legal and financial gaps for Mom and Dad.
                Connect with
                <a href="https://www.linkedin.com/in/oluadedeji" className="text-red-500 hover:text-red-600 font-medium transition-colors">
                  {' '}<u>Olu</u>{' '}
                </a>
                {/*
                and
                <a href="https://www.linkedin.com/in/jeffreymbaumgarten/" className="text-red-500 hover:text-red-600 font-medium transition-colors">
                  {' '}<u>Jeff</u>{' '}
                </a>
              */}
                on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
