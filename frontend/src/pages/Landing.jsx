import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🗂️',
    title: 'Kanban Boards',
    desc: 'Visualize your workflow with drag-and-drop task boards. Move tasks from Todo → In Progress → Done effortlessly.',
  },
  {
    icon: '👥',
    title: 'Team Collaboration',
    desc: 'Invite teammates, assign roles, and work together in real-time on any project from anywhere in the world.',
  },
  {
    icon: '🔐',
    title: 'Role-Based Access',
    desc: 'Admins manage projects and members. Members focus on their tasks. Clear boundaries, zero confusion.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Built with React + Vite on the frontend and Django REST Framework on the backend for blazing-fast performance.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: `Get a bird's-eye view of all your tasks — how many are done, in progress, or still waiting.`,
  },
  {
    icon: '🔑',
    title: 'Secure JWT Auth',
    desc: 'Industry-standard JSON Web Token authentication keeps your data safe and your sessions smooth.',
  },
];

const steps = [
  { step: '01', title: 'Create an Account', desc: 'Sign up in seconds. No credit card required.' },
  { step: '02', title: 'Build a Project', desc: 'Create your first project and invite your team.' },
  { step: '03', title: 'Assign Tasks', desc: 'Break work into tasks, set priorities and deadlines.' },
  { step: '04', title: 'Ship Faster', desc: 'Track progress and deliver results on time, every time.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0a0a0f', color: '#fff', overflowX: 'hidden' }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2.5rem',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>TaskFlow</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent', color: '#fff',
              fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: 8,
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none', color: '#fff',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '8rem 2rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '35%', left: '15%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '25%', right: '15%',
          width: 250, height: 250, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div ref={heroRef} style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: 100,
            border: '1px solid rgba(99,102,241,0.4)',
            background: 'rgba(99,102,241,0.1)',
            fontSize: '0.82rem', fontWeight: 500, color: '#a5b4fc',
            marginBottom: '1.8rem',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
            Now live — Full-stack Team Task Manager
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.5) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Ship projects.<br />
            <span style={{
              background: 'linear-gradient(135deg,#6366f1,#a78bfa,#ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Faster, together.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem', color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.5rem',
            fontWeight: 400,
          }}>
            TaskFlow is a full-stack project management tool built for modern teams.
            Kanban boards, role-based access, and real-time task tracking — all in one place.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '0.85rem 2rem', borderRadius: 12,
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                border: 'none', color: '#fff',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(99,102,241,0.6)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(99,102,241,0.45)'; }}
            >
              Start for Free →
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '0.85rem 2rem', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff', fontSize: '1rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >
              View Dashboard
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            marginTop: '4rem', display: 'flex', gap: '2.5rem',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[['Django + DRF', 'Backend'], ['React + Vite', 'Frontend'], ['PostgreSQL', 'Database'], ['JWT Auth', 'Security']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a5b4fc' }}>{val}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Everything you need</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Built for real teams</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '0.75rem', fontSize: '1.05rem' }}>Every feature designed to help your team move faster with less friction.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                padding: '1.75rem', borderRadius: 16,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'all 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: '6rem 2rem',
        background: 'rgba(99,102,241,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Simple process</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.3))',
                  border: '1px solid rgba(99,102,241,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc',
                }}>
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 27, left: 'calc(50% + 28px)',
                    width: 'calc(100% - 56px)', height: 1,
                    background: 'linear-gradient(90deg,rgba(99,102,241,0.4),transparent)',
                    display: window.innerWidth > 640 ? 'block' : 'none',
                  }} />
                )}
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', marginBottom: '1rem',
          }}>
            Ready to build something<br />
            <span style={{
              background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>great together?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            Join your team on TaskFlow and start shipping faster today.
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '1rem 2.5rem', borderRadius: 14,
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none', color: '#fff',
              fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 40px rgba(99,102,241,0.5)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 16px 48px rgba(99,102,241,0.6)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 40px rgba(99,102,241,0.5)'; }}
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '2rem 2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 24, height: 24, borderRadius: 7,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>⚡</div>
          <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>TaskFlow</span>
        </div>
        <span>© 2026 TaskFlow. Built with Django + React.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com/Abhineshlodhi/team-task-manager" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >GitHub</a>
          <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
          >Login</span>
        </div>
      </footer>
    </div>
  );
}
