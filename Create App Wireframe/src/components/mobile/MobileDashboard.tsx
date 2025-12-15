import { Mic, TrendingUp, Clock, ArrowRight, User, BarChart3 } from 'lucide-react';

interface MobileDashboardProps {
  onStartSession: () => void;
  onViewAnalysis: (sessionId: string) => void;
  onViewProgress: () => void;
}

export function MobileDashboard({ onStartSession, onViewAnalysis, onViewProgress }: MobileDashboardProps) {
  const recentSessions = [
    { id: '1', title: 'Team Meeting', date: '2h ago', errorCount: 12, duration: '45m' },
    { id: '2', title: 'Practice Session', date: 'Yesterday', errorCount: 8, duration: '20m' },
    { id: '3', title: 'Client Call', date: '2 days ago', errorCount: 15, duration: '60m' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <span>FluentPath</span>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-20">
        {/* Welcome */}
        <div className="px-4 py-6 bg-white">
          <h1 className="text-2xl mb-1">Welcome back, Alex!</h1>
          <p className="text-sm text-gray-600">Ready to practice?</p>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              value="12.5h"
              label="Practice Time"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              value="+23%"
              label="Improvement"
            />
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-xl">5</div>
                  <div className="text-xs text-gray-600">Sessions This Week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="px-4 py-4">
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center bg-white">
            <Mic className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <h2 className="text-xl mb-2">Start New Session</h2>
            <p className="text-sm text-gray-600 mb-4">Record or upload audio</p>
            <button 
              onClick={onStartSession}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg active:bg-gray-700 mb-2"
            >
              Start Recording
            </button>
            <button className="w-full px-4 py-3 border-2 border-gray-800 rounded-lg active:bg-gray-100">
              Upload File
            </button>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Recent Sessions</h2>
          </div>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <MobileSessionCard
                key={session.id}
                session={session}
                onViewAnalysis={() => onViewAnalysis(session.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 safe-area-inset-bottom">
        <div className="grid grid-cols-3 h-16">
          <button className="flex flex-col items-center justify-center gap-1 text-gray-800">
            <Mic className="w-5 h-5" />
            <span className="text-xs">Sessions</span>
          </button>
          <button 
            onClick={onViewProgress}
            className="flex flex-col items-center justify-center gap-1 text-gray-500"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Progress</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-1 text-gray-600">
        {icon}
      </div>
      <div className="text-xl mb-0.5">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function MobileSessionCard({ session, onViewAnalysis }: { session: any; onViewAnalysis: () => void }) {
  return (
    <div 
      onClick={onViewAnalysis}
      className="border-2 border-gray-300 p-4 rounded-lg bg-white active:bg-gray-50"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg">{session.title}</h3>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <div>📅 {session.date}</div>
        <div className="flex gap-4">
          <span>⏱️ {session.duration}</span>
          <span>⚠️ {session.errorCount} grammar points</span>
        </div>
      </div>
    </div>
  );
}
