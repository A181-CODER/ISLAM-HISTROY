import { useState } from 'react';
import { rooms, type Room } from '../data/museumData';
import { AudioButton } from './AudioButton';

export function VirtualRooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="min-h-screen islamic-pattern-dense page-enter">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-gold mb-4 text-glow"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          القاعات الافتراضية
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-l from-gold/60 to-transparent" />
          <span className="text-gold/60 text-2xl">◆</span>
          <div className="h-px w-20 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>
        <p className="text-ivory/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
          اختر قاعة لاستكشاف كنوز الحضارة الإسلامية في تجربة تفاعلية غامرة
        </p>
      </div>

      {/* Room Grid */}
      {!selectedRoom && (
        <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="room-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
            >
              <button
                onClick={() => setSelectedRoom(room)}
                className="room-card-inner w-full text-right rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 group"
              >
                {/* Card Header with gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${room.gradient} flex items-center justify-center overflow-hidden`}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 islamic-pattern opacity-30" />
                  {/* Arch shape */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 border-t-2 border-x-2 border-gold/20 rounded-t-full" />
                  <div className="relative text-7xl group-hover:scale-110 transition-transform duration-500">
                    {room.icon}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60" />
                </div>

                {/* Card Body */}
                <div className="p-6 bg-navy-light">
                  <h3 className="text-xl font-bold text-gold mb-1" style={{ fontFamily: "'Amiri', serif" }}>
                    {room.title}
                  </h3>
                  <p className="text-gold/60 text-sm mb-3">{room.subtitle}</p>
                  <p className="text-ivory/50 text-sm leading-relaxed">{room.description}</p>

                  {/* Enter indicator */}
                  <div className="mt-4 flex items-center gap-2 text-gold/50 group-hover:text-gold transition-colors">
                    <span className="text-sm">ادخل القاعة</span>
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected Room Detail */}
      {selectedRoom && (
        <RoomDetail room={selectedRoom} onBack={() => setSelectedRoom(null)} />
      )}
    </div>
  );
}

function RoomDetail({ room, onBack }: { room: Room; onBack: () => void }) {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gold/70 hover:text-gold mb-8 transition-colors group"
      >
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span>العودة إلى القاعات</span>
      </button>

      {/* Room Header */}
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${room.gradient} p-8 md:p-12 mb-12 border border-gold/10`}>
        <div className="absolute inset-0 islamic-pattern opacity-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="text-8xl animate-float">{room.icon}</div>
          <div className="text-center md:text-right flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-3" style={{ fontFamily: "'Amiri', serif" }}>
              {room.title}
            </h2>
            <p className="text-ivory/70 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
              {room.longDescription}
            </p>
            <div className="mt-4">
              <AudioButton text={room.longDescription} />
            </div>
          </div>
        </div>
      </div>

      {/* Room Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {room.items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(activeItem === index ? null : index)}
            className={`text-right rounded-2xl p-6 border transition-all duration-500 group ${
              activeItem === index
                ? 'bg-gold/10 border-gold/40 shadow-lg shadow-gold/10'
                : 'bg-navy-lighter/50 border-gold/10 hover:border-gold/25 hover:bg-navy-lighter'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={`text-4xl transition-transform duration-300 ${activeItem === index ? 'scale-110' : 'group-hover:scale-105'}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gold mb-2" style={{ fontFamily: "'Amiri', serif" }}>
                  {item.title}
                </h4>
                <p className="text-ivory/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
            {activeItem === index && (
              <div className="mt-4 pt-4 border-t border-gold/20 animate-fade-in">
                <AudioButton text={`${item.title}. ${item.description}`} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
