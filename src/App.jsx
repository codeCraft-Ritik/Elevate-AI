import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- IMPORT YOUR COMPONENTS ---
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import ServicesDiscovery from "./pages/ServicesDiscovery";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import ResumeBuilder from "./pages/ResumeBuilder";
import MockInterview from "./pages/MockInterview";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AptitudeQuiz from "./pages/AptitudeQuiz";
import Dashboard from "./pages/Dashboard";
import AptitudePractice from "./pages/AptitudePractice"; 
import CodingPractice from "./pages/CodingPractice"; 
import HRBehavioral from "./pages/HRBehavioral"; 

// --- IMPORT THE SECURITY HOOK ---
import { useSecurity } from './hooks/useSecurity'; 

function App() {
  const [currentStep, setCurrentStep] = useState('loading');
  useSecurity();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentStep('dashboard');
    } else {
      setCurrentStep('landing');
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.step) {
        setCurrentStep(event.state.step);
      } else {
        const token = localStorage.getItem('token');
        setCurrentStep(token ? 'dashboard' : 'landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeStep = (newStep) => {
    window.history.pushState({ step: newStep }, '', '');
    setCurrentStep(newStep);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    window.history.pushState({ step: 'landing' }, '', '/'); 
    setCurrentStep('landing');
  };

  if (currentStep === 'loading') return null;

  return (
    <div className="w-full overflow-x-hidden no-copy">
      <AnimatePresence mode="wait">
        
        {currentStep === 'landing' && (
          <LandingPage key="landing" onNext={() => changeStep('intro')} />
        )}
        
        {currentStep === 'intro' && (
          <ServicesDiscovery 
            key="intro" 
            onStart={() => changeStep('signup')} 
            onLogin={() => changeStep('login')} 
          />
        )}

        {currentStep === 'login' && (
          <Login 
            key="login" 
            onLoginSuccess={() => changeStep('dashboard')} 
            onSwitch={() => changeStep('signup')} 
          />
        )}

        {currentStep === 'signup' && (
          <Signup 
            key="signup" 
            onSignupSuccess={() => changeStep('login')} 
            onSwitch={() => changeStep('login')} 
          />
        )}
        
        {currentStep === 'dashboard' && (
          <Router key="app-router">
            <DashboardLayout onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume" element={<ResumeBuilder />} />
                <Route path="/mock-test" element={<MockInterview />} />
                
                {/* ASSESSMENT PRACTICE ROUTES */}
                <Route path="/quiz/practice/:topic" element={<AptitudePractice />} /> 
                <Route path="/coding/practice/:topic" element={<CodingPractice />} /> 
                <Route path="/hr/practice/:culture" element={<HRBehavioral />} /> {/* NEW HR ROUTE */}
                
                <Route path="/quiz/aptitude" element={<AptitudeQuiz />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;