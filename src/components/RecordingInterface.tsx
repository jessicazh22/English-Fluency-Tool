import { useState, useEffect } from 'react';
import { Mic, Square, Users } from 'lucide-react';

interface RecordingInterfaceProps {
  onEndRecording: () => void;
  onBack: () => void;
}

export function RecordingInterface({ onEndRecording, onBack }: RecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [speakersDetected, setSpeakersDetected] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        // Simulate speaker detection
        if (duration === 3) {
          setSpeakersDetected(['Speaker 1 (You)']);
        }
        if (duration === 8) {
          setSpeakersDetected(['Speaker 1 (You)', 'Speaker 2']);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setSpeakersDetected([]);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    onEndRecording();
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-300 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded"></div>
            <span>FluentPath</span>
          </div>
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Recording Interface */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8 text-center">New Recording Session</h1>

        {/* Main Recording Area */}
        <div className="border-2 border-gray-300 rounded-lg p-12 bg-white text-center mb-8">
          {!isRecording ? (
            <>
              <Mic className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h2 className="text-2xl mb-4">Ready to Record</h2>
              <p className="text-gray-600 mb-8">
                Click the button below to start recording your conversation.<br />
                Our AI will automatically detect speakers and analyze your grammar.
              </p>
              <button
                onClick={handleStartRecording}
                className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center gap-3"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            </>
          ) : (
            <>
              <div className="relative inline-block mb-6">
                <Mic className="w-20 h-20 text-red-500" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl mb-2">Recording in Progress</h2>
              <div className="text-5xl mb-8 text-gray-800">{formatTime(duration)}</div>
              
              {/* Live Waveform Simulation */}
              <div className="flex items-center justify-center gap-1 h-16 mb-8">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gray-800 rounded"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: 'pulse 0.5s ease-in-out infinite',
                      animationDelay: `${i * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>

              <button
                onClick={handleStopRecording}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors inline-flex items-center gap-3"
              >
                <Square className="w-5 h-5" />
                Stop & Analyze
              </button>
            </>
          )}
        </div>

        {/* Speaker Detection Panel */}
        {isRecording && speakersDetected.length > 0 && (
          <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" />
              <h3 className="text-xl">Speakers Detected</h3>
            </div>
            <div className="space-y-3">
              {speakersDetected.map((speaker, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <span>{speaker}</span>
                  </div>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      ESL Speaker
                    </span>
                  )}
                </div>
              ))}
            </div>
            {speakersDetected.length === 1 && (
              <p className="text-sm text-gray-500 mt-4">
                💡 Waiting for additional speakers to join the conversation...
              </p>
            )}
          </div>
        )}

        {/* Instructions */}
        {!isRecording && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg mb-3">Tips for Best Results:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Speak clearly and at a natural pace</li>
              <li>• Minimize background noise when possible</li>
              <li>• If multiple speakers, the system will automatically identify who is speaking</li>
              <li>• Sessions work best between 5-60 minutes</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
