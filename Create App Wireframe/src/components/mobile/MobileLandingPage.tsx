import { Mic, TrendingUp, Zap, Menu } from 'lucide-react';

interface MobileLandingPageProps {
  onGetStarted: () => void;
}

export function MobileLandingPage({ onGetStarted }: MobileLandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <span>FluentPath</span>
          </div>
          <button className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 text-center">
        <div className="inline-block px-3 py-1.5 bg-gray-200 rounded-full mb-4">
          <span className="text-xs">MOBILE WIREFRAME</span>
        </div>
        <h1 className="text-3xl mb-4">
          Become Fluent in English
        </h1>
        <p className="text-gray-600 mb-6">
          AI-powered grammar analysis for ESL learners. Get feedback from your conversations.
        </p>
        <button 
          onClick={onGetStarted}
          className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg active:bg-gray-700"
        >
          Get Started →
        </button>
      </section>

      {/* Features */}
      <section className="px-4 py-8 bg-gray-50">
        <h2 className="text-2xl text-center mb-6">How It Works</h2>
        <div className="space-y-4">
          <MobileFeatureCard
            icon={<Mic className="w-6 h-6" />}
            title="Record or Connect"
            description="Works with Zoom or voice recordings. Multi-speaker support."
          />
          <MobileFeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="AI Analysis"
            description="Identifies grammar errors and non-native patterns."
          />
          <MobileFeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Track Progress"
            description="Get actionable feedback and see improvement over time."
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-4 py-8">
        <h2 className="text-2xl text-center mb-4">The Challenge</h2>
        <div className="space-y-3">
          <ProblemCard text="Limited contact with native speakers" />
          <ProblemCard text="Unfamiliar with slang and idioms" />
          <ProblemCard text="Difficulty expressing yourself naturally" />
          <ProblemCard text="Lack of consistent practice" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-8 pb-12 text-center">
        <h2 className="text-2xl mb-4">Ready to Improve?</h2>
        <button 
          onClick={onGetStarted}
          className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg active:bg-gray-700"
        >
          Start Free Trial
        </button>
      </section>
    </div>
  );
}

function MobileFeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg bg-white">
      <div className="flex items-start gap-3">
        <div className="text-gray-800 mt-1">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ text }: { text: string }) {
  return (
    <div className="border border-gray-300 p-3 rounded bg-white">
      <p className="text-sm text-gray-700">• {text}</p>
    </div>
  );
}
