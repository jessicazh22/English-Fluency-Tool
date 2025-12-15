import { ArrowLeft, TrendingDown, Minus } from 'lucide-react';

interface MobileProgressPageProps {
  onBack: () => void;
}

export function MobileProgressPage({ onBack }: MobileProgressPageProps) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <span>Progress</span>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="pb-8">
        {/* Header Info */}
        <div className="px-4 py-4 bg-white border-b border-gray-300">
          <h1 className="text-xl mb-1">Your Progress</h1>
          <p className="text-sm text-gray-600">Last 4 weeks</p>
        </div>

        {/* Overall Stats */}
        <div className="px-4 py-4 grid grid-cols-2 gap-3">
          <StatCard
            value="17"
            label="Total Sessions"
            subtext="Last 4 weeks"
          />
          <StatCard
            value="12.5h"
            label="Practice Time"
            subtext="Avg 45 min"
          />
        </div>

        <div className="px-4">
          <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
            <div className="text-2xl mb-1">-38%</div>
            <div className="text-sm">Overall Improvement</div>
            <div className="text-xs text-gray-500">Fewer errors per session</div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="px-4 py-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
            <h2 className="text-lg mb-4">Weekly Error Trend</h2>
            <div className="space-y-3">
              {weeklyData.map((week, index) => {
                const maxErrors = 50;
                const barWidth = (week.errors / maxErrors) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>{week.week}</span>
                      <span className="text-xs text-gray-600">{week.sessions} sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-7 relative">
                      <div 
                        className="bg-blue-500 h-7 rounded flex items-center justify-end pr-2 text-white text-sm"
                        style={{ width: `${barWidth}%` }}
                      >
                        {week.errors}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="px-4 py-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
            <h2 className="text-lg mb-4">Progress by Category</h2>
            <div className="space-y-3">
              {categoryProgress.map((item, index) => (
                <MobileCategoryCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4 py-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-green-50">
            <h2 className="text-lg mb-3">🎉 Achievements</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Article errors reduced by 67%!</li>
              <li>• Verb tense improving steadily</li>
              <li>• On track for Q2 2024 goals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, subtext }: { value: string; label: string; subtext: string }) {
  return (
    <div className="border-2 border-gray-300 p-3 rounded-lg bg-white">
      <div className="text-xl mb-0.5">{value}</div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-xs text-gray-500">{subtext}</div>
    </div>
  );
}

function MobileCategoryCard({ item }: { item: any }) {
  const getTrendIcon = () => {
    if (item.change < -20) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (item.change < -20) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm">{item.category}</h3>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-sm ${getTrendColor()}`}>
            {item.change}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-600">Was:</span>
        <span className="px-2 py-1 bg-gray-200 rounded">{item.baseline}</span>
        <span className="text-gray-400">→</span>
        <span className="text-gray-600">Now:</span>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{item.current}</span>
      </div>
    </div>
  );
}
