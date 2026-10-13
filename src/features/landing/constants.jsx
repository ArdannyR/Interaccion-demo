export const CLINIC_INFO = {
  name: "INTERACCIÓN",
  tagline: "Estimulación del lenguaje, pensamiento y aprendizaje",
  contact: {
    phone: "0994039343",
    phoneHref: "tel:+593994039343",
    whatsappHref: "https://wa.me/593994039343",
  },
  location: {
    address: "Calle Atahualpa y Estadio Jaracilb - Ciudadela Rumiñahui - Otavalo", // TODO: verificar nombre exacto de la calle
    city: "Otavalo, Imbabura, Ecuador",
    mapUrl: `https://www.google.com/maps?q=${encodeURIComponent('Calle Atahualpa y Estadio Jaracilb, Ciudadela Rumiñahui, Otavalo, Ecuador')}&output=embed`,
  },
  // TODO: horario genérico PROVISIONAL, actualizar cuando se defina el definitivo
  schedule: [
    { days: "Lunes a viernes", hours: "08:00 – 18:00" },
    { days: "Sábados", hours: "09:00 – 13:00" },
    { days: "Domingos y feriados", hours: "Cerrado" },
  ],
};

export const LANDING_CONTENT = {
  about: "Somos un equipo interdisciplinar apasionado por el desarrollo infantil y juvenil. Acompañamos a niños, niñas, adolescentes y a sus familias en su proceso de crecimiento, brindando herramientas especializadas para potenciar su lenguaje, pensamiento y aprendizaje en un entorno seguro, cálido y empático.",
  objectives: [
    "Estimular el desarrollo del lenguaje y la comunicación efectiva.",
    "Fortalecer los procesos de pensamiento y facilitar el aprendizaje.",
    "Acompañar y orientar a las familias con estrategias prácticas.",
    "Intervenir de forma individualizada y basada en evaluación continua.",
    "Promover la inclusión y el bienestar emocional integral."
  ],
  specialties: [
    {
      name: "Terapia de lenguaje",
      description: "Evaluación e intervención en dificultades de pronunciación, comprensión y expresión.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
    },
    {
      name: "Psicología infantil y educativa",
      description: "Apoyo emocional y conductual para un desarrollo pleno y saludable.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      name: "Psicopedagogía",
      description: "Estrategias para superar dificultades de aprendizaje y potenciar habilidades escolares.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    {
      name: "Estimulación temprana",
      description: "Actividades lúdicas para maximizar el desarrollo cognitivo y motor en los primeros años.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
    },
    {
      name: "Terapia ocupacional",
      description: "Desarrollo de autonomía, motricidad fina e integración sensorial.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
    },
    {
      name: "Orientación a familias",
      description: "Asesoramiento y pautas para el manejo en casa y la crianza respetuosa.",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    }
  ],
  process: [
    { step: 1, title: "Evaluación inicial", desc: "Conocemos las necesidades del paciente mediante sesiones diagnósticas." },
    { step: 2, title: "Plan personalizado", desc: "Diseñamos un plan de tratamiento único basado en los resultados." },
    { step: 3, title: "Intervención", desc: "Sesiones periódicas enfocadas en alcanzar los objetivos propuestos." },
    { step: 4, title: "Acompañamiento", desc: "Trabajo continuo junto a la familia y la escuela para generalizar aprendizajes." }
  ],
  values: [
    { title: "Respeto", desc: "Valoramos la individualidad y los ritmos de cada persona." },
    { title: "Empatía", desc: "Escuchamos y comprendemos a las familias con calidez." },
    { title: "Trabajo en equipo", desc: "Colaboramos de manera interdisciplinar." },
    { title: "Compromiso", desc: "Nos mantenemos actualizados para brindar la mejor atención." }
  ],
  audience: [
    "Niños, niñas y adolescentes que requieren apoyo en su desarrollo.",
    "Familias buscando orientación y estrategias de crianza.",
    "Derivaciones de instituciones educativas para evaluación y seguimiento."
  ]
};
