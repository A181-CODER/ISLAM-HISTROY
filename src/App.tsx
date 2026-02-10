import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { VirtualRooms } from './components/VirtualRooms';
import { Timeline } from './components/Timeline';
import { Manuscripts } from './components/Manuscripts';

type Section = 'landing' | 'rooms' | 'timeline' | 'manuscripts';

export function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (section: string) => {
    if (section === currentSection) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section as Section);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 300);
  };

  const handleEnter = () => {
    navigate('rooms');
  };

  // Preload speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-navy text-ivory" dir="rtl">
      {currentSection !== 'landing' && (
        <Navbar currentSection={currentSection} onNavigate={navigate} />
      )}

      <main
        className={`transition-opacity duration-300 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentSection === 'landing' && <LandingPage onEnter={handleEnter} />}
        {currentSection === 'rooms' && <VirtualRooms />}
        {currentSection === 'timeline' && <Timeline />}
        {currentSection === 'manuscripts' && <Manuscripts />}
      </main>

      {/* Footer - only visible in inner pages */}
      {currentSection !== 'landing' && (
        <footer className="border-t border-gold/10 py-8 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-l from-gold/30 to-transparent" />
              <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 5C30 5 15 22 15 45C15 68 30 85 50 85C35 80 25 65 25 45C25 25 35 12 50 5Z"
                  fill="#c9a84c"
                  opacity="0.5"
                />
              </svg>
              <div className="h-px w-16 bg-gradient-to-r from-gold/30 to-transparent" />
            </div>
            <p className="text-gold/40 text-sm" style={{ fontFamily: "'Amiri', serif" }}>
              المتحف الإسلامي الرقمي التفاعلي
            </p>
            <p className="text-ivory/20 text-xs mt-2">
              تجربة تعليمية تفاعلية لاستكشاف تراث الحضارة الإسلامية
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
