import { useState } from 'react';
import { prophets, type Prophet } from '../data/museumData';
import { AudioButton } from './AudioButton';

export function Timeline() {
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);

  return (
    <div className="min-h-screen islamic-pattern-dense page-enter">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-gold mb-4 text-glow"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          الخط الزمني للأنبياء
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-l from-gold/60 to-transparent" />
          <span className="text-gold/60 text-2xl">◆</span>
          <div className="h-px w-20 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>
        <p className="text-ivory/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
          رحلة عبر التاريخ مع أنبياء الله ورسله عليهم الصلاة والسلام
        </p>
      </div>

      {/* Prophet Detail Modal */}
      {selectedProphet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProphet(null)}>
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" />
          <div
            className="relative max-w-2xl w-full glass rounded-3xl p-8 border border-gold/20 animate-fade-in-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedProphet(null)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="text-center mb-6">
              <div className="inline-block text-6xl mb-4 animate-float">{selectedProphet.icon}</div>
              <h3 className="text-3xl font-bold text-gold" style={{ fontFamily: "'Amiri', serif" }}>
                {selectedProphet.arabicName}
              </h3>
              <p className="text-gold/60 mt-2">{selectedProphet.period}</p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-gold/40" />
              <div className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
            </div>

            {/* Content */}
            <p
              className="text-ivory/80 text-lg leading-loose text-right"
              style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
            >
              {selectedProphet.details}
            </p>

            {/* Audio */}
            <div className="mt-6 flex justify-center">
              <AudioButton text={`${selectedProphet.arabicName}. ${selectedProphet.details}`} label="استمع للسيرة" />
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 pb-20 relative">
        {/* Central Line */}
        <div className="absolute top-0 bottom-0 right-1/2 w-0.5 timeline-line hidden md:block" />

        {prophets.map((prophet, index) => (
          <div
            key={prophet.id}
            className="relative mb-12 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
          >
            {/* Timeline dot - desktop */}
            <div className="hidden md:block absolute top-8 right-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold timeline-dot z-10" />

            {/* Card */}
            <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
              <button
                onClick={() => setSelectedProphet(prophet)}
                className={`w-full text-right group rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/10 bg-navy-light hover:-translate-y-1`}
              >
                <div className="p-6">
                  {/* Top row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {prophet.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gold" style={{ fontFamily: "'Amiri', serif" }}>
                        {prophet.arabicName}
                      </h3>
                      <span className="text-gold/50 text-sm">{prophet.period}</span>
                    </div>
                    {/* Sequence number */}
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                      {prophet.id}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-ivory/50 text-sm leading-relaxed" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                    {prophet.description}
                  </p>

                  {/* Read more */}
                  <div className="mt-4 flex items-center gap-2 text-gold/40 group-hover:text-gold/70 transition-colors text-sm">
                    <span>اقرأ المزيد</span>
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-l from-gold/0 via-gold/30 to-gold/0 group-hover:via-gold/50 transition-all" />
              </button>
            </div>
          </div>
        ))}

        {/* End ornament */}
        <div className="text-center mt-8">
          <div className="inline-flex flex-col items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 2L26 14L38 20L26 26L20 38L14 26L2 20L14 14L20 2Z" fill="#c9a84c" opacity="0.4" />
            </svg>
            <p className="text-gold/40 text-sm" style={{ fontFamily: "'Amiri', serif" }}>
              عليهم أفضل الصلاة والسلام
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
