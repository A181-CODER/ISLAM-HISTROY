import { useState, useCallback, useEffect, useRef } from 'react';

interface AudioButtonProps {
  text: string;
  label?: string;
}

export function AudioButton({ text, label = 'استمع' }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Try to find an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [text, isPlaying]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        togglePlay();
      }}
      className={`audio-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
        isPlaying
          ? 'playing border-gold/50 text-gold bg-gold/15'
          : 'border-gold/20 text-gold/70 hover:text-gold hover:border-gold/40'
      }`}
    >
      {isPlaying ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
          <span>إيقاف</span>
          {/* Sound wave animation */}
          <div className="flex items-center gap-0.5 mr-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-gold rounded-full"
                style={{
                  height: '12px',
                  animation: `soundWave 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes soundWave {
              from { height: 4px; }
              to { height: 14px; }
            }
          `}</style>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
