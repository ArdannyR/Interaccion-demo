import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CLINIC_INFO, LANDING_CONTENT } from './constants';
import { useReveal } from '../../hooks/useReveal';

function RevealBlock({ children, className = '' }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-300 ${isVisible ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}

export function WelcomePage() {
  return (
    <div className="min-h-dvh bg-transparent relative overflow-x-clip flex flex-col">
      {/* Background blobs decorativos */}
      <div className="fixed inset-0 bg-linear-to-br from-(--color-primary-50) via-(--color-background) to-(--color-secondary-50)/30 -z-30 pointer-events-none" />
      <div className="hidden sm:block fixed top-[-5%] left-[-5%] w-64 h-64 sm:w-96 sm:h-96 bg-(--color-accent-200)/20 rounded-full blur-3xl animate-float -z-20 pointer-events-none" />
      <div className="hidden sm:block fixed top-[30%] right-[-10%] w-64 h-64 sm:w-[32rem] sm:h-[32rem] bg-(--color-secondary-200)/20 rounded-full blur-3xl animate-float -z-20 pointer-events-none" style={{ animationDelay: '-7s' }} />

      {/* 1. Header sticky: INTERACCIÓN a la izquierda, Ingresar a la derecha */}
      <header className="bg-(--color-surface)/90 backdrop-blur-md border-b border-(--color-border) sticky top-0 z-50 shadow-xs pt-safe">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center gap-3">
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-(--color-primary-800) truncate">
            {CLINIC_INFO.name}
          </span>
          <Link to="/login" className="shrink-0">
            <Button className="text-base sm:text-lg py-2 sm:py-2.5 px-4 sm:px-6 min-h-11">
              Ingresar
            </Button>
          </Link>
        </div>
      </header>

      {/* Contenedor principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 flex-1 w-full space-y-10 sm:space-y-12">
        
        {/* 2. Hero en 2 columnas desde lg (asimétrico: texto a la izquierda, decoración a la derecha) */}
        <section id="hero" className="pt-6 sm:pt-10 pb-4 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Columna Izquierda: Texto */}
            <div className="lg:col-span-7 text-left space-y-4">
              <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-(--color-primary-800) to-(--color-primary-600) leading-tight pb-1 break-words">
                {CLINIC_INFO.name}
              </h1>
              <p className="text-lg min-[360px]:text-xl sm:text-2xl font-bold text-(--color-secondary-700) leading-snug break-words">
                {CLINIC_INFO.tagline}
              </p>
              <p className="text-base sm:text-lg text-(--color-text-muted) max-w-xl leading-relaxed break-words">
                {CLINIC_INFO.heroSubtitle}
              </p>

              {/* 3 datos: teléfono, ciudad y horario (en columna en móvil, fila desde sm) */}
              <div className="pt-4 border-t border-(--color-border) flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-6 gap-y-2.5 text-sm sm:text-base">
                <a
                  href={CLINIC_INFO.contact.phoneHref}
                  className="min-h-11 inline-flex items-center gap-2 font-bold text-(--color-primary-700) hover:text-(--color-primary-900) underline underline-offset-4 transition-colors"
                >
                  <svg className="w-4 h-4 text-(--color-primary-600) shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{CLINIC_INFO.contact.phone}</span>
                </a>

                <span className="min-h-11 sm:min-h-0 inline-flex items-center gap-2 text-(--color-text-muted) font-medium">
                  <svg className="w-4 h-4 text-(--color-secondary-600) shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{CLINIC_INFO.location.city}</span>
                </span>

                <span className="min-h-11 sm:min-h-0 inline-flex items-center gap-2 text-(--color-text-muted) font-medium">
                  <svg className="w-4 h-4 text-(--color-primary-500) shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lun–Vie 08:00–18:00</span>
                </span>
              </div>
            </div>

            {/* Columna Derecha: Composición decorativa solo con CSS y SVG inline */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm h-40 sm:h-64 lg:h-80 flex items-center justify-center">
                {/* Trama de puntos con radial-gradient */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
                  style={{ 
                    backgroundImage: 'radial-gradient(var(--color-primary-400) 1.5px, transparent 1.5px)', 
                    backgroundSize: '16px 16px' 
                  }}
                  aria-hidden="true"
                />

                {/* Cuadrado redondeado rotado con degradado accent-200 a secondary-200 */}
                <div 
                  className="w-32 h-32 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-3xl rotate-12 bg-linear-to-br from-(--color-accent-200) to-(--color-secondary-200) shadow-lg opacity-85 border border-(--color-accent-300)/40"
                  aria-hidden="true"
                />

                {/* Círculo flotante 1: Lenguaje */}
                <div 
                  className="absolute top-1 left-4 sm:top-4 sm:left-8 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-(--color-surface) shadow-md border border-(--color-accent-200) flex items-center justify-center text-(--color-primary-800) animate-float"
                  title="Terapia de Lenguaje"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Círculo flotante 2: Ocupacional */}
                <div 
                  className="absolute bottom-1 left-8 sm:bottom-4 sm:left-12 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-(--color-surface) shadow-md border border-(--color-secondary-200) flex items-center justify-center text-(--color-primary-800) animate-float"
                  style={{ animationDelay: '-6s' }}
                  title="Terapia Ocupacional"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>

                {/* Círculo flotante 3: Psicología y Psicopedagogía */}
                <div 
                  className="absolute top-4 right-4 sm:top-10 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-(--color-surface) shadow-md border border-(--color-primary-200) flex items-center justify-center text-(--color-primary-800) animate-float"
                  style={{ animationDelay: '-12s' }}
                  title="Psicología y Psicopedagogía"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Divisor curvo (SVG) del hero al contenido */}
        <div className="w-full overflow-hidden leading-none -my-2" aria-hidden="true">
          <svg 
            className="w-full h-6 sm:h-10 text-(--color-primary-200)/50" 
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none" 
            fill="none"
          >
            <path 
              d="M0,25 C300,55 900,5 1200,35" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        {/* 4. Cuadrícula tipo Bento (grid-cols-12 desde lg, 1 columna en móvil) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Fila 1 - Col 1: Quiénes somos (col-span-7, con chips de valores) */}
          <RevealBlock className="lg:col-span-7">
            <section className="h-full bg-(--color-surface) rounded-2xl p-6 sm:p-7 shadow-xs border border-(--color-border) relative overflow-hidden flex flex-col justify-between before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-linear-to-r before:from-(--color-accent-400) before:to-(--color-secondary-400)">
              <div>
                <h2 className="text-2xl font-bold text-(--color-primary-800) mb-3 text-left">
                  Quiénes somos
                </h2>
                <p className="text-base sm:text-lg text-(--color-text-muted) leading-relaxed text-left">
                  {LANDING_CONTENT.about}
                </p>
              </div>

              {/* Chips de valores integrados */}
              <div className="mt-6 pt-4 border-t border-(--color-border)/70 flex flex-wrap gap-2">
                {LANDING_CONTENT.values.map((val) => (
                  <span 
                    key={val} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-(--color-secondary-100) text-(--color-primary-900) border border-(--color-secondary-200)"
                  >
                    <span className="text-(--color-secondary-600)">✦</span>
                    {val}
                  </span>
                ))}
              </div>
            </section>
          </RevealBlock>

          {/* Fila 1 - Col 2: Objetivos (col-span-5, lista de 4 ítems con check) */}
          <RevealBlock className="lg:col-span-5">
            <section className="h-full bg-(--color-surface) rounded-2xl p-6 sm:p-7 shadow-xs border border-(--color-border) relative overflow-hidden flex flex-col justify-between before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-linear-to-r before:from-(--color-secondary-400) before:to-(--color-accent-400)">
              <div>
                <h2 className="text-2xl font-bold text-(--color-primary-800) mb-4 text-left">
                  Nuestros Objetivos
                </h2>
                <ul className="space-y-3.5">
                  {LANDING_CONTENT.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-(--color-text-main) text-left">
                      <span className="w-5 h-5 rounded-full bg-(--color-primary-100) text-(--color-primary-800) flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-(--color-primary-200)">
                        ✓
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealBlock>

          {/* Fila 2: Especialidades (3 tarjetas compactas en una fila, col-span-4 c/u en lg) */}
          {LANDING_CONTENT.specialties.map((spec) => (
            <RevealBlock key={spec.id} className="lg:col-span-4">
              <section className="h-full bg-(--color-surface) rounded-2xl p-6 sm:p-7 shadow-xs border border-(--color-border) relative overflow-hidden text-left hover:border-(--color-primary-300) transition-all before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-linear-to-r before:from-(--color-accent-400) before:to-(--color-secondary-400)">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-(--color-accent-100) to-(--color-secondary-100) border border-(--color-accent-200) text-(--color-primary-800) flex items-center justify-center mb-4">
                  {spec.id === 'lenguaje' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  )}
                  {spec.id === 'ocupacional' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  )}
                  {spec.id === 'psicologia' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-(--color-text-main) mb-2">
                  {spec.name}
                </h3>
                <p className="text-sm text-(--color-text-muted) leading-relaxed">
                  {spec.description}
                </p>
              </section>
            </RevealBlock>
          ))}

          {/* Fila 3: ¿Cómo trabajamos? (tira horizontal de 4 pasos con línea conectora) */}
          <RevealBlock className="lg:col-span-12">
            <section className="bg-(--color-surface) rounded-2xl p-6 sm:p-8 shadow-xs border border-(--color-border) relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-linear-to-r before:from-(--color-accent-400) before:to-(--color-secondary-400)">
              <h2 className="text-2xl font-bold text-(--color-primary-800) mb-6 sm:mb-8 text-left">
                ¿Cómo trabajamos?
              </h2>

              <div className="relative">
                {/* Línea conectora entre pasos (visible en pantallas grandes) */}
                <div 
                  className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-linear-to-r from-(--color-accent-300) via-(--color-secondary-300) to-(--color-primary-300) z-0" 
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {LANDING_CONTENT.process.map((step) => (
                    <div key={step.step} className="text-left space-y-2">
                      {/* Número de paso en degradado accent-300->accent-400 con texto primary-900 (NUNCA texto blanco) */}
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-(--color-accent-300) to-(--color-accent-400) text-(--color-primary-900) font-black text-xl flex items-center justify-center shadow-xs border border-(--color-accent-400)/30">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-(--color-text-main) pt-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-(--color-text-muted) leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealBlock>

          {/* Fila 4: Contacto y horarios (col-span-5) + Mapa (col-span-7) */}
          
          {/* Tarjeta de Contacto y horarios con degradado azul */}
          <RevealBlock className="lg:col-span-5">
            <section className="h-full bg-linear-to-br from-(--color-primary-700) to-(--color-primary-900) text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between text-left">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Contacto y horarios
                </h2>

                <div className="space-y-3 text-sm sm:text-base">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/70 font-semibold block mb-0.5">
                      Teléfono
                    </span>
                    <a
                      href={CLINIC_INFO.contact.phoneHref}
                      className="text-white hover:text-(--color-secondary-200) font-bold text-lg underline underline-offset-4 transition-colors min-h-11 inline-flex items-center"
                    >
                      {CLINIC_INFO.contact.phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/70 font-semibold block mb-0.5">
                      Dirección
                    </span>
                    <p className="text-white/90 leading-snug">
                      {CLINIC_INFO.location.address}
                    </p>
                    <p className="text-xs text-white/75 mt-0.5">
                      {CLINIC_INFO.location.city}
                    </p>
                  </div>

                  <div className="pt-1">
                    <a
                      href={CLINIC_INFO.location.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-secondary-300) hover:text-(--color-secondary-100) underline underline-offset-4 transition-colors"
                    >
                      <span>Cómo llegar en Google Maps</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Lista de horarios */}
              <div className="mt-6 pt-4 border-t border-white/15">
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold block mb-2">
                  Horarios de atención
                </span>
                <ul className="space-y-1.5 text-sm">
                  {CLINIC_INFO.schedule.map((s, i) => (
                    <li key={i} className="flex flex-wrap justify-between items-center text-white/90 gap-1">
                      <span className="font-medium">{s.days}</span>
                      <span className="text-white/75">{s.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </RevealBlock>

          {/* Mapa con rounded-2xl, h-64, iframe lazy */}
          <RevealBlock className="lg:col-span-7">
            <section className="h-64 sm:h-72 lg:h-full min-h-[16rem] rounded-2xl overflow-hidden border border-(--color-border) shadow-xs bg-(--color-surface)">
              <iframe
                src={CLINIC_INFO.location.mapUrl}
                className="w-full h-full min-h-[16rem]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación de INTERACCIÓN"
              />
            </section>
          </RevealBlock>

        </div>
      </main>

      {/* 5. Footer compacto de una sola fila */}
      <footer className="mt-12 py-5 pb-safe border-t border-(--color-border) bg-(--color-surface)/70 text-sm text-(--color-text-muted)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. Todos los derechos reservados.
          </span>
          <span>
            {CLINIC_INFO.location.city} ·{' '}
            <a href={CLINIC_INFO.contact.phoneHref} className="min-h-11 inline-flex items-center hover:text-(--color-primary-700) underline underline-offset-2">
              {CLINIC_INFO.contact.phone}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
