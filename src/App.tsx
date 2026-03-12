import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';
import LinkedInAuthRedirect from './components/LinkedInAuthRedirect'; 
import { ThemeProvider } from './context/ThemeContext';
import { HooksProvider } from './context/HooksContext';
import { BlogListPage } from './components/BlogListPage'; 
import { BlogPostPage } from './components/BlogPostPage';
import { NursingHomeSearchPage } from './pages/NursingHomeSearchPage';
import { HomeHealthCareSearchPage } from './pages/HomeHealthCareSearchPage';
import { DementiaAssessmentPage } from './pages/DementiaAssessmentPage';
import { DementiaReportView } from './pages/DementiaReportView';
//import LandingPageDev from './pages/LandingPageDev';
import { MedicaidCoPilotPage } from './pages/MedicaidCoPilotPage';
import { EldercareStressCoachPage } from './pages/EldercareStressCoachPage';
import { VirtualHealthCareAssistant } from './pages/VirtualHealthCareAssistant';
import { MedicaidSpenddownCalculator } from './pages/MedicaidSpenddownCalculator';
import { NursingHomeContractAnalyzer } from './pages/NursingHomeContractAnalyzer';
import { HealthcareBenefitsApplicationAutomation } from './pages/HealthcareBenefitsApplicationAutomation';
import { EldercareDataVault } from './pages/EldercareDataVault';
import { HealthcareInsuranceClaimsRecovery } from './pages/HealthcareInsuranceClaimsRecovery';
import { EldercareCaseStudies } from './pages/EldercareCaseStudies';
import { SeniorPlacementAgentPartners } from './pages/SeniorPlacementAgentPartners';
import { EldercarePartnerPage } from './pages/EldercarePartnerPage';




function PrivateRoute({ children }: { children: React.ReactNode }) {
  //const { isAuthenticated } = useAuth();
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  //if (isLoading)  {
    //return <div>Loading...</div>;
  //}

  // **Show loading state while authentication status is being determined**
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }


  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

// AppRoutes component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<BlogListPage />} />    
      <Route path="blog/:slug" element={<BlogPostPage />} /> 
      <Route path="/medicaid-co-pilot" element={<MedicaidCoPilotPage />} />
      <Route path="/eldercare-stress-management" element={<EldercareStressCoachPage />} />
      <Route path="/virtual-healthcare-assistant" element={<VirtualHealthCareAssistant />} />
      <Route path="/medicaid-spenddown-calculator" element={<MedicaidSpenddownCalculator/>} />
      <Route path="/nursing-home-contract-analyzer" element={<NursingHomeContractAnalyzer/>} />
      <Route path="/healthcare-benefits-application-automation" element={<HealthcareBenefitsApplicationAutomation/>} />
      <Route path="/eldercare-private-data-store" element={<EldercareDataVault/>} />
      <Route path="/healthcare-insurance-claims-recovery" element={<HealthcareInsuranceClaimsRecovery/>} />
      <Route path="/eldercare-case-studies" element={<EldercareCaseStudies/>} />
      <Route path="/senior-placement-agent-partner" element={<SeniorPlacementAgentPartners/>} />
      <Route path="/partner-program" element={<EldercarePartnerPage/>} />
      <Route path="/nursing-home" element={<NursingHomeSearchPage />} />
      <Route path="/home-health-care" element={<HomeHealthCareSearchPage />} />
      <Route path="/dementia-assessment" element={<DementiaAssessmentPage />} />
      <Route path="/report/:slug" element={<DementiaReportView />} />
    
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            {/*
              Wrap Dashboard with HooksProvider here.
              Dashboard and its children (like ContentCalendarModal)
              will now have access to hooksData via useHooks().
            */}
            <HooksProvider>
              <Dashboard />
            </HooksProvider>
          </PrivateRoute>
        }
      />
      {/*<Route path="/linkedin-auth" element={<LinkedInAuthRedirect />} />  If you still need this route */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;