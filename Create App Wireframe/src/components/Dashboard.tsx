import { Mic, TrendingUp, Clock, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onStartSession: () => void;
  onViewAnalysis: (sessionId: string) => void;
  onViewProgress: () => void;
}

export function Dashboard({ onStartSession, onViewAnalysis, onViewProgress }: DashboardProps) {
  const recentSessions = [
    { id: '1', title: 'Team Meeting', date: '2 hours ago', errorCount: 12, duration: '45 min' },
    { id: '2', title: 'Practice Session', date: 'Yesterday', errorCount: 8, duration: '20 min' },
    { id: '3', title: 'Client Call', date: '2 days ago', errorCount: 15, duration: '60 min' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-300 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <span>FluentPath</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-gray-800">Dashboard</a>
            <button onClick={onViewProgress} className="text-gray-600">Progress</button>
            <button className="text-gray-600">Settings</button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">Ready to practice your English?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Total Practice Time"
            value="12.5 hours"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Improvement Rate"
            value="+23%"
          />
          <StatCard
            icon={<Mic className="w-6 h-6" />}
            label="Sessions This Week"
            value="5"
          />
        </div>

        {/* Quick Action */}
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 mb-8 text-center bg-white">
          <Mic className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl mb-3">Start New Session</h2>
          <p className="text-gray-600 mb-6">Record audio, upload a file, or connect to Zoom</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onStartSession}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Start Recording
            </button>
            <button className="px-6 py-3 border-2 border-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
              Upload File
            </button>
            <button className="px-6 py-3 border-2 border-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
              Connect Zoom
            </button>
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Recent Sessions</h2>
            <button className="text-gray-600 hover:text-gray-800">View All →</button>
          </div>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewAnalysis={() => onViewAnalysis(session.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg bg-white">
      <div className="flex items-center gap-3 mb-2 text-gray-600">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-3xl">{value}</div>
    </div>
  );
}

function SessionCard({ session, onViewAnalysis }: { session: any; onViewAnalysis: () => void }) {
  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg bg-white hover:border-gray-400 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl mb-2">{session.title}</h3>
          <div className="flex gap-6 text-gray-600">
            <span>📅 {session.date}</span>
            <span>⏱️ {session.duration}</span>
            <span>⚠️ {session.errorCount} grammar points</span>
          </div>
        </div>
        <button 
          onClick={onViewAnalysis}
          className="px-4 py-2 border-2 border-gray-800 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          View Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
