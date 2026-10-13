import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CLINIC_INFO, LANDING_CONTENT } from './constants';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-linear-to-br from-(--color-primary-50) via-(--color-background) to-(--color-secondary-50)/40 -z-20 pointer-events-none" />
      <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-(--color-accent-300)/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-(--color-secondary-300)/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none" style={{ animationDelay: '-5s' }} />
      <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-(--color-primary-300)/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none" style={{ animationDelay: '-10s' }} />

      {/* Header */}
      <header className="bg-(--color-surface)/80 backdrop-blur-md border-b border-(--color-border) sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black tracking-tight text-(--color-primary-800)">
            {CLINIC_INFO.name}
          </span>
          <Link to="/login">
            <Button>Ingresar</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24 animate-fade-up">
        
        {/* 1. Hero */}
        <section id="hero" className="text-center space-y-6 pt-10 pb-4 relative">
          <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-(--color-primary-800) to-(--color-primary-600) tracking-tight pb-2">
            {CLINIC_INFO.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-(--color-secondary-600) max-w-3xl mx-auto leading-relaxed">
            {CLINIC_INFO.tagline}
          </h2>
          <p className="text-lg text-(--color-text-muted) max-w-2xl mx-auto">
            Te damos la bienvenida a nuestro espacio. Estamos aquí para acompañarte en cada paso del desarrollo.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-6 text-(--color-primary-700) font-medium text-lg">
            <a href={CLINIC_INFO.contact.phoneHref} className="hover:text-(--color-accent-600) transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {CLINIC_INFO.contact.phone}
            </a>
            <span className="flex items-center gap-2 text-(--color-text-muted)">
              <svg className="w-5 h-5 text-(--color-primary-500)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {CLINIC_INFO.location.city}
            </span>
          </div>
        </section>

        {/* 2. ¿Quiénes somos? */}
        <section id="quienes-somos" className="bg-(--color-surface)/80 backdrop-blur-lg p-10 rounded-2xl shadow-sm border border-(--color-border) text-center">
          <h3 className="text-3xl font-bold text-(--color-primary-800) mb-6">Quiénes somos</h3>
          <p className="text-xl text-(--color-text-muted) leading-relaxed max-w-4xl mx-auto">
            {LANDING_CONTENT.about}
          </p>
        </section>

        {/* 3. ¿Qué hacemos? / Objetivos */}
        <section id="objetivos">
          <h3 className="text-3xl font-bold text-center text-(--color-primary-800) mb-10">Nuestros Objetivos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {LANDING_CONTENT.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-(--color-primary-50) rounded-xl border border-(--color-primary-100)">
                <div className="mt-1 bg-(--color-primary-200) text-(--color-primary-800) rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  ✓
                </div>
                <p className="text-lg text-(--color-primary-900)">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Especialidades */}
        <section id="especialidades">
          <h3 className="text-3xl font-bold text-center text-(--color-primary-800) mb-4">Especialidades</h3>
          <p className="text-center text-(--color-text-muted) mb-10 text-lg">// TODO: sincronizar con las especialidades reales de los terapeutas</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDING_CONTENT.specialties.map((spec, i) => (
              <div key={i} className="bg-(--color-surface) p-8 rounded-2xl shadow-sm border border-(--color-border) hover:shadow-md transition-shadow hover:border-(--color-secondary-300) group">
                <div className="text-(--color-secondary-500) mb-6 group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <h4 className="text-xl font-bold text-(--color-text-main) mb-3">{spec.name}</h4>
                <p className="text-(--color-text-muted) leading-relaxed">{spec.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. ¿Cómo trabajamos? (Proceso) */}
        <section id="proceso" className="bg-linear-to-b from-(--color-surface) to-(--color-primary-50)/50 p-10 rounded-2xl border border-(--color-border)">
          <h3 className="text-3xl font-bold text-center text-(--color-primary-800) mb-12">¿Cómo trabajamos?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {LANDING_CONTENT.process.map((step) => (
              <div key={step.step} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-linear-to-br from-(--color-accent-300) to-(--color-accent-500) text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-6 shadow-md rotate-3">
                  <div className="-rotate-3">{step.step}</div>
                </div>
                <h4 className="text-xl font-bold text-(--color-primary-900) mb-3">{step.title}</h4>
                <p className="text-(--color-text-muted)">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Nuestros valores */}
        <section id="valores">
          <h3 className="text-3xl font-bold text-center text-(--color-primary-800) mb-10">Nuestros Valores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LANDING_CONTENT.values.map((val, i) => (
              <div key={i} className="bg-(--color-surface) p-6 rounded-2xl border border-(--color-border) text-center shadow-sm hover:-translate-y-1 transition-transform">
                <h4 className="text-lg font-bold text-(--color-secondary-600) mb-2">{val.title}</h4>
                <p className="text-sm text-(--color-text-muted)">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ¿A quién atendemos? */}
        <section id="a-quien-atendemos" className="bg-(--color-accent-50) p-10 rounded-2xl border border-(--color-accent-100)">
          <h3 className="text-3xl font-bold text-center text-(--color-primary-900) mb-8">¿A quién atendemos?</h3>
          <ul className="max-w-2xl mx-auto space-y-4">
            {LANDING_CONTENT.audience.map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-(--color-primary-800) bg-(--color-surface)/60 p-4 rounded-xl">
                <span className="text-(--color-accent-500)">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Horario de atención y Contacto */}
        <div id="horarios-contacto" className="grid md:grid-cols-2 gap-8">
          <section className="bg-(--color-surface) p-8 rounded-2xl shadow-sm border border-(--color-border)">
            <h3 className="text-2xl font-bold text-(--color-primary-800) mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-(--color-primary-500)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Horarios de atención
            </h3>
            <ul className="space-y-4 text-lg">
              {CLINIC_INFO.schedule.map((s, i) => (
                <li key={i} className="flex justify-between items-center border-b border-(--color-border) pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-(--color-text-main)">{s.days}</span>
                  <span className="text-(--color-text-muted)">{s.hours}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-linear-to-br from-(--color-primary-600) to-(--color-primary-800) text-white p-8 rounded-2xl shadow-md flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
            <div className="space-y-6">
              <a href={CLINIC_INFO.contact.phoneHref} className="flex items-center gap-4 text-xl hover:text-(--color-secondary-200) transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span>{CLINIC_INFO.contact.phone}</span>
              </a>
              <a 
                href={CLINIC_INFO.contact.whatsappHref}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-(--color-success-500) hover:bg-(--color-success-600) text-white font-bold py-3 px-6 rounded-xl transition-colors w-max"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </section>
        </div>

        {/* 9. Ubicación */}
        <section id="ubicacion" className="bg-(--color-surface) rounded-2xl shadow-sm border border-(--color-border) overflow-hidden">
          <div className="p-8 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-(--color-primary-800) mb-2">Ubicación</h3>
              <p className="text-lg text-(--color-text-muted)">{CLINIC_INFO.location.address}</p>
              <p className="text-md text-(--color-text-muted) opacity-70">// TODO: verificar nombre exacto de la calle</p>
            </div>
            <a 
              href={CLINIC_INFO.location.mapUrl.replace('&output=embed', '')}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-(--color-primary-600) hover:text-(--color-primary-800) font-medium underline"
            >
              Ver en Google Maps
            </a>
          </div>
          <div className="w-full h-[400px] bg-(--color-surface-hover)">
            <iframe 
              src={CLINIC_INFO.location.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de INTERACCIÓN"
            ></iframe>
          </div>
        </section>

      </main>

      {/* 10. Footer */}
      <footer className="bg-(--color-primary-900) py-12 text-center text-white/70">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <p className="text-xl font-bold text-white tracking-widest">{CLINIC_INFO.name}</p>
          <p>{CLINIC_INFO.tagline}</p>
          <p className="pt-4 border-t border-white/10 text-sm">
            © {new Date().getFullYear()} {CLINIC_INFO.name}. Todos los derechos reservados.<br/>
            {CLINIC_INFO.location.city} | Tel: {CLINIC_INFO.contact.phone}
          </p>
        </div>
      </footer>
    </div>
  );
}
