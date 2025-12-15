import { Mic, TrendingUp, Users, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <span>FluentPath</span>
          </div>
          <nav className="flex gap-6">
            <a href="#" className="text-gray-600">Features</a>
            <a href="#" className="text-gray-600">Pricing</a>
            <a href="#" className="text-gray-600">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-gray-200 rounded-full mb-6">
          <span className="text-sm">WIREFRAME / PRODUCT CONCEPT</span>
        </div>
        <h1 className="text-5xl mb-6">
          Become Fluent in English<br />Through Real Conversations
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered grammar analysis for ESL learners. Get real-time feedback from your Zoom calls and voice recordings to speak like a native.
        </p>
        <button 
          onClick={onGetStarted}
          className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Get Started →
        </button>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Record or Connect"
            description="Integrate with Zoom meetings or upload voice recordings. Works seamlessly with multiple speakers."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="AI Analysis"
            description="Our AI identifies grammar errors, awkward phrases, and non-native patterns in your speech."
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Actionable Feedback"
            description="Get specific, genuine suggestions on how to improve. Track your progress over time."
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl text-center mb-8">The Challenge</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ProblemCard text="Limited contact with native speakers" />
            <ProblemCard text="Unfamiliar with slang and idioms" />
            <ProblemCard text="Difficulty expressing yourself naturally" />
            <ProblemCard text="Lack of consistent practice and input" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl mb-6">Ready to Improve Your English?</h2>
        <button 
          onClick={onGetStarted}
          className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Start Your Free Trial
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border-2 border-gray-300 p-6 rounded-lg bg-white">
      <div className="mb-4 text-gray-800">{icon}</div>
      <h3 className="text-xl mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProblemCard({ text }: { text: string }) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded bg-white">
      <p className="text-gray-700">• {text}</p>
    </div>
  );
}
