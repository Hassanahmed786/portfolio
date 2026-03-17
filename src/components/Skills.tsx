import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, categoryColors } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// Simple force-directed layout positions (precomputed)
const NODE_POSITIONS = [
  // Languages (top left cluster)
  { x: -280, y: -120 }, { x: -220, y: -180 }, { x: -160, y: -100 }, { x: -240, y: -60 },
  { x: -180, y: -160 }, { x: -300, y: -180 }, { x: -130, y: -200 },
  // Frontend (top right)
  { x: 120, y: -180 }, { x: 200, y: -120 }, { x: 180, y: -200 }, { x: 260, y: -150 },
  { x: 140, y: -80 }, { x: 220, y: -60 },
  // AI/ML (bottom left)
  { x: -220, y: 100 }, { x: -160, y: 160 }, { x: -280, y: 60 }, { x: -130, y: 60 },
  { x: -200, y: 200 }, { x: -260, y: 160 },
  // Blockchain (bottom right)
  { x: 160, y: 80 }, { x: 230, y: 130 }, { x: 180, y: 190 }, { x: 120, y: 160 }, { x: 270, y: 80 },
  // Cloud (center)
  { x: 0, y: -240 }, { x: 60, y: -160 }, { x: -60, y: -160 }, { x: 0, y: -120 },
  { x: 40, y: -200 }, { x: -40, y: -200 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 8, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    gsap.fromTo(
      graphRef.current,
      { opacity: 0, scale: 0.7, filter: 'blur(10px)' },
      {
        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      }
    );
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, rotX: rotation.x, rotY: rotation.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({ x: dragStart.current.rotX - dy * 0.3, y: dragStart.current.rotY + dx * 0.3 });
  };

  const onMouseUp = () => setIsDragging(false);

  // Categories for legend
  const categories = Object.entries(categoryColors);

  return (
    <section ref={sectionRef} className="section flex-col px-4 py-24">
      <div className="text-center mb-12 z-10">
        <div
          className="font-pixel inline-block mb-4 px-4 py-1"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', color: '#00ff9d', border: '1px solid rgba(0,255,157,0.3)', letterSpacing: '0.3em' }}
        >
          // SKILL_MATRIX
        </div>
        <h2
          className="font-pixel"
          style={{ fontSize: 'clamp(18px, 4vw, 40px)', color: '#00ff9d', textShadow: '0 0 20px rgba(0,255,157,0.5)' }}
        >
          SKILLS
        </h2>
        <div className="font-mono mt-2" style={{ fontSize: '11px', color: 'rgba(0,255,157,0.5)' }}>
          DRAG TO ROTATE NODE GRAPH
        </div>
      </div>

      {/* 3D Node Graph */}
      <div
        ref={graphRef}
        className="relative z-10 mx-auto overflow-hidden"
        style={{
          width: '100%', maxWidth: 700, height: 500,
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: 0,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <svg
          className="w-full h-full"
          viewBox="-350 -270 700 540"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.5s ease-out',
          }}
        >
          {/* Connection lines to center */}
          {skills.map((skill, i) => {
            const pos = NODE_POSITIONS[i] || { x: 0, y: 0 };
            const color = categoryColors[skill.category];
            return (
              <line
                key={`line-${i}`}
                x1={0} y1={0}
                x2={pos.x} y2={pos.y}
                stroke={color}
                strokeWidth={0.5}
                strokeOpacity={0.2}
              />
            );
          })}

          {/* Central hub */}
          <circle cx={0} cy={0} r={20} fill="#00ff9d20" stroke="#00ff9d" strokeWidth={1.5} />
          <text x={0} y={4} textAnchor="middle" fill="#00ff9d" fontSize={10} fontFamily="Share Tech Mono">HUB</text>
          <circle cx={0} cy={0} r={30} fill="none" stroke="#00ff9d" strokeWidth={0.5} strokeOpacity={0.3} strokeDasharray="4 4" />

          {/* Skill nodes */}
          {skills.map((skill, i) => {
            const pos = NODE_POSITIONS[i] || { x: i * 30 - 200, y: i * 20 - 150 };
            const color = categoryColors[skill.category];
            const radius = 4 + (skill.level / 100) * 8;
            return (
              <g key={skill.name} style={{ cursor: 'pointer' }}>
                <circle
                  cx={pos.x} cy={pos.y} r={radius + 4}
                  fill={color}
                  fillOpacity={0.08}
                />
                <circle
                  cx={pos.x} cy={pos.y} r={radius}
                  fill={color}
                  fillOpacity={0.3}
                  stroke={color}
                  strokeWidth={1}
                  filter={`drop-shadow(0 0 4px ${color})`}
                />
                <text
                  x={pos.x} y={pos.y - radius - 4}
                  textAnchor="middle"
                  fill={color}
                  fontSize={7}
                  fontFamily="Share Tech Mono"
                >
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 z-10">
        {categories.map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{ width: 10, height: 10, background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="font-pixel" style={{ fontSize: '8px', color }}>
              {cat.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
