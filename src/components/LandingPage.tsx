import { useEffect, useState } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy islamic-pattern">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Geometric Ornament - rotating */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-rotate-slow opacity-10" style={{ width: '800px', height: '800px' }}>
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="160" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="130" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" stroke="#c9a84c" strokeWidth="0.3" />
            {[0, 30, 60, 90, 120, 150].map((angle) => (
              <line
                key={angle}
                x1={200 + 190 * Math.cos((angle * Math.PI) / 180)}
                y1={200 + 190 * Math.sin((angle * Math.PI) / 180)}
                x2={200 - 190 * Math.cos((angle * Math.PI) / 180)}
                y2={200 - 190 * Math.sin((angle * Math.PI) / 180)}
                stroke="#c9a84c"
                strokeWidth="0.3"
              />
            ))}
            <polygon
              points="200,10 370,110 370,290 200,390 30,290 30,110"
              stroke="#c9a84c"
              strokeWidth="0.5"
              fill="none"
            />
            <polygon
              points="200,40 340,130 340,270 200,360 60,270 60,130"
              stroke="#c9a84c"
              strokeWidth="0.3"
              fill="none"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={`dot-${angle}`}
                cx={200 + 160 * Math.cos((angle * Math.PI) / 180)}
                cy={200 + 160 * Math.sin((angle * Math.PI) / 180)}
                r="3"
                fill="#c9a84c"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Crescent and Star */}
        <div
          className={`mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-block animate-float">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mx-auto">
              <path
                d="M50 5C30 5 15 22 15 45C15 68 30 85 50 85C35 80 25 65 25 45C25 25 35 12 50 5Z"
                fill="#c9a84c"
                opacity="0.9"
              />
              <circle cx="60" cy="25" r="4" fill="#c9a84c" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Bismillah */}
        <div
          className={`mb-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-gold/70 text-lg font-amiri" style={{ fontFamily: "'Amiri', serif" }}>
            بسم الله الرحمن الرحيم
          </p>
        </div>

        {/* Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-gold mb-6 text-glow transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: "'Amiri', serif" }}
        >
          المتحف الإسلامي
        </h1>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gold-light/80 mb-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: "'Amiri', serif" }}
        >
          الرقمي التفاعلي
        </h2>

        {/* Ornamental divider */}
        <div
          className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="h-px w-24 md:w-40 bg-gradient-to-l from-gold/60 to-transparent" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#c9a84c" opacity="0.7" />
          </svg>
          <div className="h-px w-24 md:w-40 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        {/* Description */}
        <p
          className={`text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          رحلة تفاعلية عبر الزمن لاستكشاف روائع الحضارة الإسلامية
          <br />
          قاعات افتراضية • مخطوطات نادرة • سرد صوتي • خط زمني للأنبياء
        </p>

        {/* Enter Button */}
        <div
          className={`transition-all duration-1000 delay-1200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-l from-gold-dark via-gold to-gold-light text-navy font-bold text-xl rounded-2xl hover:shadow-[0_0_60px_rgba(201,168,76,0.4)] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <span>ادخل المتحف</span>
            <svg
              className="w-6 h-6 transition-transform group-hover:-translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          </button>
        </div>

        {/* Features */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-[1400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {[
            { icon: '🏛️', label: 'قاعات افتراضية' },
            { icon: '🎙️', label: 'سرد صوتي' },
            { icon: '📜', label: 'مخطوطات قديمة' },
            { icon: '📅', label: 'خط زمني للأنبياء' },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-light rounded-xl p-4 text-center hover:bg-gold/10 transition-colors duration-300"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="text-ivory/80 text-sm font-medium">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
