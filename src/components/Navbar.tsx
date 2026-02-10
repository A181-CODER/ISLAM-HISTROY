interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'rooms', label: 'القاعات', icon: '🏛️' },
  { id: 'timeline', label: 'الأنبياء', icon: '📅' },
  { id: 'manuscripts', label: 'المخطوطات', icon: '📜' },
];

export function Navbar({ currentSection, onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-navy font-bold text-lg shadow-lg shadow-gold/20">
              <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 5C30 5 15 22 15 45C15 68 30 85 50 85C35 80 25 65 25 45C25 25 35 12 50 5Z"
                  fill="#0a1628"
                />
              </svg>
            </div>
            <span
              className="text-gold font-bold text-lg hidden sm:block group-hover:text-gold-light transition-colors"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              المتحف الإسلامي
            </span>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'text-ivory/60 hover:text-ivory hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
