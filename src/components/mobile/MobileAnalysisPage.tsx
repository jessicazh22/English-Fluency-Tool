import { ArrowLeft, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MobileAnalysisPageProps {
  sessionId: string | null;
  onBack: () => void;
}

export function MobileAnalysisPage({ onBack }: MobileAnalysisPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const grammarIssues = [
    {
      id: 1,
      timestamp: '2:34',
      category: 'Article Usage',
      severity: 'medium',
      original: 'I went to store yesterday',
      corrected: 'I went to the store yesterday',
      explanation: 'Use "the" before specific nouns that both you and the listener know about.',
      nativeTip: 'Native speakers always use articles with singular countable nouns.'
    },
    {
      id: 2,
      timestamp: '5:12',
      category: 'Preposition',
      severity: 'low',
      original: 'We discussed about the project',
      corrected: 'We discussed the project',
      explanation: 'The verb "discuss" is transitive and doesn\'t need "about".',
      nativeTip: 'Remember: "discuss something" (no about), but "talk about something".'
    },
    {
      id: 3,
      timestamp: '8:45',
      category: 'Verb Tense',
      severity: 'high',
      original: 'If I would have known, I would come',
      corrected: 'If I had known, I would have come',
      explanation: 'Third conditional: use "had + past participle" in if-clause.',
      nativeTip: 'Pattern: "If I had [done], I would have [done]".'
    },
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
          <span>Analysis</span>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="pb-8">
        {/* Session Info */}
        <div className="px-4 py-4 bg-white border-b border-gray-300">
          <h1 className="text-xl mb-1">Team Meeting</h1>
          <p className="text-sm text-gray-600">45 min • 2 hours ago</p>
        </div>

        {/* Stats */}
        <div className="px-4 py-4 grid grid-cols-2 gap-3">
          <StatCard
            icon={<AlertTriangle className="w-4 h-4 text-orange-500" />}
            value="12"
            label="Grammar Points"
          />
          <StatCard
            icon={<CheckCircle className="w-4 h-4 text-green-500" />}
            value="87%"
            label="Accuracy"
          />
        </div>

        {/* Insights */}
        <div className="px-4 py-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-blue-50">
            <h2 className="text-lg mb-2">✨ Key Insights</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Great improvement with past tense!</li>
              <li>• Focus on article usage (a/an/the)</li>
              <li>• Vocabulary is expanding nicely</li>
            </ul>
          </div>
        </div>

        {/* Grammar Issues */}
        <div className="px-4 py-4">
          <h2 className="text-lg mb-3">Grammar Analysis</h2>
          <div className="space-y-3">
            {grammarIssues.map((issue) => (
              <MobileGrammarCard
                key={issue.id}
                issue={issue}
                isExpanded={expandedId === issue.id}
                onToggle={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
              />
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="px-4 py-4">
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white">
            <h2 className="text-lg mb-3">📚 Next Steps</h2>
            <div className="space-y-2">
              <ActionItem text="Practice conditional sentences" />
              <ActionItem text="Review article usage rules" />
              <ActionItem text="Schedule another session" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="border-2 border-gray-300 p-3 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-1">
        {icon}
      </div>
      <div className="text-xl mb-0.5">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function MobileGrammarCard({ issue, isExpanded, onToggle }: { issue: any; isExpanded: boolean; onToggle: () => void }) {
  const severityColors = {
    high: 'border-red-300 bg-red-50',
    medium: 'border-orange-300 bg-orange-50',
    low: 'border-yellow-300 bg-yellow-50'
  };

  const severityLabels = {
    high: 'High',
    medium: 'Med',
    low: 'Low'
  };

  return (
    <div className={`border-2 ${severityColors[issue.severity as keyof typeof severityColors]} rounded-lg overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full p-4 text-left active:opacity-70"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
              {issue.timestamp}
            </span>
            <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
              {issue.category}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              issue.severity === 'high' ? 'bg-red-200 text-red-800' :
              issue.severity === 'medium' ? 'bg-orange-200 text-orange-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>
              {severityLabels[issue.severity as keyof typeof severityLabels]}
            </span>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
        </div>
        <div className="text-sm">
          <span className="line-through text-gray-500">{issue.original}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Correction */}
          <div>
            <div className="text-xs text-gray-600 mb-1">✓ Corrected:</div>
            <div className="p-2 bg-green-50 border border-green-300 rounded text-sm">
              <span className="text-green-800">{issue.corrected}</span>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <div className="text-xs text-gray-600 mb-1">📖 Why:</div>
            <div className="p-2 bg-white border border-gray-300 rounded text-sm">
              {issue.explanation}
            </div>
          </div>

          {/* Tip */}
          <div>
            <div className="text-xs text-gray-600 mb-1">💡 Native tip:</div>
            <div className="p-2 bg-blue-50 border border-blue-300 rounded text-sm">
              {issue.nativeTip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded text-sm">
      <div className="w-4 h-4 border-2 border-gray-400 rounded flex-shrink-0"></div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
