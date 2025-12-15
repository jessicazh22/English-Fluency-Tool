import { ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, BookOpen } from 'lucide-react';

interface AnalysisPageProps {
  sessionId: string | null;
  onBack: () => void;
}

export function AnalysisPage({ onBack }: AnalysisPageProps) {
  const grammarIssues = [
    {
      id: 1,
      timestamp: '2:34',
      category: 'Article Usage',
      severity: 'medium',
      original: 'I went to store yesterday',
      corrected: 'I went to the store yesterday',
      explanation: 'Use "the" before specific nouns that both you and the listener know about. Since you\'re referring to a specific store, the article "the" is needed.',
      nativeTip: 'Native speakers always use articles with singular countable nouns. Practice: "I\'m going to THE store" vs "I\'m going to stores" (general/multiple).'
    },
    {
      id: 2,
      timestamp: '5:12',
      category: 'Preposition',
      severity: 'low',
      original: 'We discussed about the project',
      corrected: 'We discussed the project',
      explanation: 'The verb "discuss" is transitive and doesn\'t need the preposition "about". You discuss something directly.',
      nativeTip: 'Common mistake! Remember: "discuss something" (no about), but "talk about something" (with about). The verb changes the pattern.'
    },
    {
      id: 3,
      timestamp: '8:45',
      category: 'Verb Tense',
      severity: 'high',
      original: 'If I would have known, I would come earlier',
      corrected: 'If I had known, I would have come earlier',
      explanation: 'This is a third conditional sentence (past unreal situation). Use "had + past participle" in the if-clause, and "would have + past participle" in the main clause.',
      nativeTip: 'This is tricky even for advanced learners! Pattern: "If I had [done], I would have [done]". Practice with different verbs to internalize the structure.'
    },
    {
      id: 4,
      timestamp: '12:20',
      category: 'Word Choice',
      severity: 'medium',
      original: 'The weather is very hot today',
      corrected: 'It\'s very hot today',
      explanation: 'When talking about weather, native speakers typically use "it" as the subject rather than "the weather".',
      nativeTip: 'Native pattern: "It\'s hot/cold/sunny/rainy". Saying "the weather is..." sounds formal/textbook-like. Using "it" is more natural and conversational.'
    },
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
        {/* Session Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Session Analysis</h1>
          <p className="text-gray-600">Team Meeting • 45 minutes • Analyzed 2 hours ago</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
            label="Grammar Points"
            value="12"
            color="orange"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5 text-green-500" />}
            label="Accuracy Rate"
            value="87%"
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
            label="Improvement"
            value="+12%"
            color="blue"
          />
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-purple-500" />}
            label="New Patterns"
            value="3"
            color="purple"
          />
        </div>

        {/* Key Insights */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-blue-50 mb-8">
          <h2 className="text-xl mb-3">✨ Key Insights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• You've improved significantly with past tense usage compared to last week!</li>
            <li>• Article usage (a/an/the) remains a common pattern - let's focus on this</li>
            <li>• Your vocabulary is expanding nicely - keep up the great work</li>
          </ul>
        </div>

        {/* Grammar Issues */}
        <div>
          <h2 className="text-2xl mb-4">Grammar Analysis</h2>
          <div className="space-y-4">
            {grammarIssues.map((issue) => (
              <GrammarIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8 border-2 border-dashed border-gray-400 rounded-lg p-6 bg-white">
          <h2 className="text-xl mb-4">📚 Recommended Next Steps</h2>
          <div className="space-y-3">
            <ActionItem text="Practice conditional sentences with our interactive exercises" />
            <ActionItem text="Review article usage rules in your learning library" />
            <ActionItem text="Schedule another practice session this week to track improvement" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-2">
        {icon}
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}

function GrammarIssueCard({ issue }: { issue: any }) {
  const severityColors = {
    high: 'border-red-300 bg-red-50',
    medium: 'border-orange-300 bg-orange-50',
    low: 'border-yellow-300 bg-yellow-50'
  };

  const severityLabels = {
    high: 'High Priority',
    medium: 'Medium',
    low: 'Minor'
  };

  return (
    <div className={`border-2 ${severityColors[issue.severity as keyof typeof severityColors]} rounded-lg p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
              {issue.timestamp}
            </span>
            <span className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
              {issue.category}
            </span>
            <span className={`px-3 py-1 rounded text-sm ${
              issue.severity === 'high' ? 'bg-red-200 text-red-800' :
              issue.severity === 'medium' ? 'bg-orange-200 text-orange-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>
              {severityLabels[issue.severity as keyof typeof severityLabels]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* What you said */}
        <div>
          <div className="text-sm text-gray-600 mb-1">What you said:</div>
          <div className="p-3 bg-white border border-gray-300 rounded">
            <span className="line-through text-gray-500">{issue.original}</span>
          </div>
        </div>

        {/* Correction */}
        <div>
          <div className="text-sm text-gray-600 mb-1">✓ Corrected version:</div>
          <div className="p-3 bg-green-50 border border-green-300 rounded">
            <span className="text-green-800">{issue.corrected}</span>
          </div>
        </div>

        {/* Explanation */}
        <div>
          <div className="text-sm text-gray-600 mb-1">📖 Why this matters:</div>
          <div className="p-3 bg-white border border-gray-300 rounded">
            {issue.explanation}
          </div>
        </div>

        {/* Native Speaker Tip */}
        <div>
          <div className="text-sm text-gray-600 mb-1">💡 Native speaker tip:</div>
          <div className="p-3 bg-blue-50 border border-blue-300 rounded">
            {issue.nativeTip}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
