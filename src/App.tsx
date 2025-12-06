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
import { NursingHomeProviderUS } from './components/NursingHomeProviderUS';
import { NursingHomeSearchPage } from './pages/NursingHomeSearchPage';
import { HomeHealthCareSearchPage } from './pages/HomeHealthCareSearchPage';
import LandingPageDev from './pages/LandingPageDev';




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
      <Route path="/dev" element={<LandingPageDev />} />
      <Route path="dev/nursing-home" element={<NursingHomeSearchPage />} />
      <Route path="dev/home-health-care" element={<HomeHealthCareSearchPage />} />
      
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