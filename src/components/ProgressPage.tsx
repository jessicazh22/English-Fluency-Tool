import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProgressPageProps {
  onBack: () => void;
}

export function ProgressPage({ onBack }: ProgressPageProps) {
  const weeklyData = [
    { week: 'Week 1', errors: 45, sessions: 3 },
    { week: 'Week 2', errors: 38, sessions: 4 },
    { week: 'Week 3', errors: 32, sessions: 5 },
    { week: 'Week 4', errors: 28, sessions: 5 },
  ];

  const categoryProgress = [
    { category: 'Article Usage', baseline: 12, current: 4, change: -67 },
    { category: 'Verb Tense', baseline: 15, current: 8, change: -47 },
    { category: 'Prepositions', baseline: 8, current: 3, change: -63 },
    { category: 'Word Choice', baseline: 10, current: 9, change: -10 },
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
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your improvement over time</p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Sessions"
            value="17"
            subtext="Last 4 weeks"
          />
          <StatCard
            label="Total Practice Time"
            value="12.5 hrs"
            subtext="Average 45 min/session"
          />
          <StatCard
            label="Overall Improvement"
            value="-38%"
            subtext="Fewer errors per session"
            positive={true}
          />
        </div>

        {/* Weekly Progress Chart */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-white mb-8">
          <h2 className="text-xl mb-6">Weekly Error Trend</h2>
          <div className="space-y-4">
            {weeklyData.map((week, index) => {
              const maxErrors = 50;
              const barWidth = (week.errors / maxErrors) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-20">{week.week}</span>
                    <span className="text-sm text-gray-600">{week.sessions} sessions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-8 relative">
                    <div 
                      className="bg-blue-500 h-8 rounded flex items-center justify-end pr-3 text-white"
                      style={{ width: `${barWidth}%` }}
                    >
                      {week.errors} errors
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-white mb-8">
          <h2 className="text-xl mb-6">Progress by Category</h2>
          <div className="space-y-4">
            {categoryProgress.map((item, index) => (
              <CategoryProgressCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-green-50">
          <h2 className="text-xl mb-4">🎉 Achievements & Insights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• You've reduced article errors by 67% - excellent progress!</li>
            <li>• Your verb tense usage is improving steadily week over week</li>
            <li>• You're on track to reach fluency goals by Q2 2024</li>
            <li>• Consider focusing more on word choice and idioms next</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subtext, positive }: { label: string; value: string; subtext: string; positive?: boolean }) {
  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg bg-white">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="text-3xl mb-1">{value}</div>
      <div className="text-sm text-gray-500">{subtext}</div>
    </div>
  );
}

function CategoryProgressCard({ item }: { item: any }) {
  const getTrendIcon = () => {
    if (item.change < -20) return <TrendingDown className="w-5 h-5 text-green-500" />;
    if (item.change > 20) return <TrendingUp className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (item.change < -20) return 'text-green-600';
    if (item.change > 20) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg">{item.category}</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`${getTrendColor()}`}>
            {item.change > 0 ? '+' : ''}{item.change}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Baseline:</span>
          <span className="px-2 py-1 bg-gray-200 rounded">{item.baseline} errors</span>
        </div>
        <span className="text-gray-400">→</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Current:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{item.current} errors</span>
        </div>
      </div>
    </div>
  );
}
