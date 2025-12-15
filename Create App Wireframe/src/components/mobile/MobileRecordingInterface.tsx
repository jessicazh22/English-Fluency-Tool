import { useState, useEffect } from 'react';
import { Mic, Square, Users, ArrowLeft } from 'lucide-react';

interface MobileRecordingInterfaceProps {
  onEndRecording: () => void;
  onBack: () => void;
}

export function MobileRecordingInterface({ onEndRecording, onBack }: MobileRecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [speakersDetected, setSpeakersDetected] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0">
        <div className="px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <span>Recording</span>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Recording Interface */}
      <div className="px-4 py-8 flex flex-col min-h-[calc(100vh-64px)]">
        {!isRecording ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Mic className="w-20 h-20 mb-6 text-gray-400" />
            <h2 className="text-2xl mb-3">Ready to Record</h2>
            <p className="text-gray-600 mb-8 px-4">
              Tap the button below to start recording your conversation.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <Mic className="w-20 h-20 text-red-500" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-sm text-gray-600 mb-2">Recording</div>
            <div className="text-5xl mb-8">{formatTime(duration)}</div>
            
            {/* Waveform */}
            <div className="flex items-center justify-center gap-1 h-16 mb-8 w-full max-w-xs">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-800 rounded"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animation: 'pulse 0.5s ease-in-out infinite',
                    animationDelay: `${i * 0.05}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Speakers */}
            {speakersDetected.length > 0 && (
              <div className="w-full mb-8">
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Speakers Detected</span>
                </div>
                <div className="space-y-2">
                  {speakersDetected.map((speaker, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm">{speaker}</span>
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          ESL
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pb-8">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg active:bg-gray-700 flex items-center justify-center gap-3"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="w-full px-6 py-4 bg-red-500 text-white rounded-lg active:bg-red-600 flex items-center justify-center gap-3"
            >
              <Square className="w-5 h-5" />
              Stop & Analyze
            </button>
          )}
        </div>

        {/* Tips */}
        {!isRecording && (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm">
            <div className="mb-2">Tips for Best Results:</div>
            <ul className="space-y-1 text-gray-700">
              <li>• Speak clearly and naturally</li>
              <li>• Minimize background noise</li>
              <li>• Best sessions: 5-60 minutes</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
