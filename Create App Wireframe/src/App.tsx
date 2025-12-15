import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { RecordingInterface } from './components/RecordingInterface';
import { AnalysisPage } from './components/AnalysisPage';
import { ProgressPage } from './components/ProgressPage';
import { MobileLandingPage } from './components/mobile/MobileLandingPage';
import { MobileDashboard } from './components/mobile/MobileDashboard';
import { MobileRecordingInterface } from './components/mobile/MobileRecordingInterface';
import { MobileAnalysisPage } from './components/mobile/MobileAnalysisPage';
import { MobileProgressPage } from './components/mobile/MobileProgressPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'dashboard' | 'recording' | 'analysis' | 'progress'>('landing');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true); // Toggle to switch between mobile/desktop

  const handleStartSession = () => {
    setCurrentScreen('recording');
  };

  const handleViewAnalysis = (sessionId: string) => {
    setSelectedSession(sessionId);
    setCurrentScreen('analysis');
  };

  const handleEndRecording = () => {
    // Simulate processing and go to analysis
    setCurrentScreen('analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile/Desktop Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white border-2 border-gray-800 rounded-lg p-1 shadow-lg">
        <button
          onClick={() => setIsMobile(false)}
          className={`px-3 py-1 rounded text-sm ${!isMobile ? 'bg-gray-800 text-white' : 'text-gray-600'}`}
        >
          Desktop
        </button>
        <button
          onClick={() => setIsMobile(true)}
          className={`px-3 py-1 rounded text-sm ${isMobile ? 'bg-gray-800 text-white' : 'text-gray-600'}`}
        >
          Mobile
        </button>
      </div>

      {/* Mobile Version */}
      {isMobile && (
        <div className="max-w-md mx-auto shadow-2xl">
          {currentScreen === 'landing' && (
            <MobileLandingPage onGetStarted={() => setCurrentScreen('dashboard')} />
          )}
          {currentScreen === 'dashboard' && (
            <MobileDashboard 
              onStartSession={handleStartSession}
              onViewAnalysis={handleViewAnalysis}
              onViewProgress={() => setCurrentScreen('progress')}
            />
          )}
          {currentScreen === 'recording' && (
            <MobileRecordingInterface 
              onEndRecording={handleEndRecording}
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}
          {currentScreen === 'analysis' && (
            <MobileAnalysisPage 
              sessionId={selectedSession}
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}
          {currentScreen === 'progress' && (
            <MobileProgressPage onBack={() => setCurrentScreen('dashboard')} />
          )}
        </div>
      )}

      {/* Desktop Version */}
      {!isMobile && (
        <>
          {currentScreen === 'landing' && (
            <LandingPage onGetStarted={() => setCurrentScreen('dashboard')} />
          )}
          {currentScreen === 'dashboard' && (
            <Dashboard 
              onStartSession={handleStartSession}
              onViewAnalysis={handleViewAnalysis}
              onViewProgress={() => setCurrentScreen('progress')}
            />
          )}
          {currentScreen === 'recording' && (
            <RecordingInterface 
              onEndRecording={handleEndRecording}
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}
          {currentScreen === 'analysis' && (
            <AnalysisPage 
              sessionId={selectedSession}
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}
          {currentScreen === 'progress' && (
            <ProgressPage onBack={() => setCurrentScreen('dashboard')} />
          )}
        </>
      )}
    </div>
  );
}