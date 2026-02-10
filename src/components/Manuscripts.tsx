import { useState } from 'react';
import { manuscripts, type Manuscript } from '../data/museumData';
import { AudioButton } from './AudioButton';

const categoryColors: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export function Manuscripts() {
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
  const [filter, setFilter] = useState<string>('الكل');

  const categories = ['الكل', ...new Set(manuscripts.map((m) => m.category))];
  const filtered = filter === 'الكل' ? manuscripts : manuscripts.filter((m) => m.category === filter);

  return (
    <div className="min-h-screen islamic-pattern-dense page-enter">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-gold mb-4 text-glow"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          المخطوطات القديمة
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-l from-gold/60 to-transparent" />
          <span className="text-gold/60 text-2xl">◆</span>
          <div className="h-px w-20 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>
        <p className="text-ivory/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
          كنوز المعرفة المحفوظة عبر القرون — مخطوطات نادرة غيّرت مسار التاريخ
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${
                filter === cat
                  ? 'bg-gold/20 text-gold border-gold/40'
                  : 'bg-navy-lighter/50 text-ivory/50 border-gold/10 hover:border-gold/25 hover:text-ivory/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Manuscript Detail Modal */}
      {selectedManuscript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedManuscript(null)}>
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" />
          <div
            className="relative max-w-3xl w-full glass rounded-3xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative header */}
            <div className="relative h-48 bg-gradient-to-br from-navy-lighter to-navy overflow-hidden">
              <div className="absolute inset-0 islamic-pattern opacity-30" />
              {/* Manuscript illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-44 bg-gradient-to-b from-amber-900/40 to-amber-950/60 rounded-sm border border-gold/30 flex items-center justify-center shadow-2xl">
                    <div className="text-center p-3">
                      <div className="text-4xl mb-2">📜</div>
                      <div className="w-16 h-px bg-gold/30 mx-auto mb-1" />
                      <div className="w-12 h-px bg-gold/20 mx-auto mb-1" />
                      <div className="w-14 h-px bg-gold/20 mx-auto mb-1" />
                      <div className="w-10 h-px bg-gold/20 mx-auto" />
                    </div>
                  </div>
                  {/* Glow */}
                  <div className="absolute -inset-8 bg-gold/5 rounded-full blur-2xl" />
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setSelectedManuscript(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-navy/50 backdrop-blur border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors z-10"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              {/* Category badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs border ${categoryColors[selectedManuscript.categoryColor]}`}>
                  {selectedManuscript.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gold mb-2" style={{ fontFamily: "'Amiri', serif" }}>
                {selectedManuscript.title}
              </h3>
              <p className="text-gold/60 text-sm mb-1">{selectedManuscript.author}</p>
              <p className="text-ivory/40 text-sm mb-6">{selectedManuscript.period}</p>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-l from-gold/20 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent" />
              </div>

              <p
                className="text-ivory/70 text-lg leading-loose mb-8"
                style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
              >
                {selectedManuscript.details}
              </p>

              <div className="flex justify-center">
                <AudioButton
                  text={`${selectedManuscript.title}. من تأليف ${selectedManuscript.author}. ${selectedManuscript.details}`}
                  label="استمع للوصف"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manuscripts Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((manuscript, index) => (
          <button
            key={manuscript.id}
            onClick={() => setSelectedManuscript(manuscript)}
            className="manuscript-card text-right rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/25 group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className="p-6">
              {/* Top row */}
              <div className="flex items-start gap-4 mb-4">
                {/* Manuscript icon */}
                <div className="w-16 h-20 bg-gradient-to-b from-amber-900/30 to-amber-950/40 rounded border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition-colors">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📜</div>
                    <div className="space-y-0.5 px-2">
                      <div className="h-px bg-gold/20" />
                      <div className="h-px bg-gold/15 w-3/4 mx-auto" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] border mb-2 ${categoryColors[manuscript.categoryColor]}`}>
                    {manuscript.category}
                  </span>
                  <h3 className="text-lg font-bold text-gold mb-1 group-hover:text-gold-light transition-colors" style={{ fontFamily: "'Amiri', serif" }}>
                    {manuscript.title}
                  </h3>
                  <p className="text-gold/50 text-xs">{manuscript.author}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-ivory/40 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                {manuscript.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <span className="text-ivory/30 text-xs">{manuscript.period}</span>
                <span className="text-gold/40 group-hover:text-gold/70 transition-colors text-xs flex items-center gap-1">
                  اقرأ المزيد
                  <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
