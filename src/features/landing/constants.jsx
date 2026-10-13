export const CLINIC_INFO = {
  name: "INTERACCIÓN",
  tagline: "Estimulación del lenguaje, pensamiento y aprendizaje",
  heroSubtitle: "Acompañamos a tu familia en cada etapa del desarrollo infantil con calidez, evidencia y dedicación profesional.",
  contact: {
    phone: "0994039343",
    phoneHref: "tel:+593994039343",
  },
  location: {
    address: "Calle Atahualpa y Estadio Jaracilb - Ciudadela Rumiñahui", // TODO: verificar nombre exacto de la calle
    city: "Otavalo, Imbabura",
    fullCity: "Otavalo, Imbabura, Ecuador",
    mapUrl: `https://www.google.com/maps?q=${encodeURIComponent('Calle Atahualpa y Estadio Jaracilb, Ciudadela Rumiñahui, Otavalo, Ecuador')}&output=embed`,
    directionsUrl: `https://www.google.com/maps?q=${encodeURIComponent('Calle Atahualpa y Estadio Jaracilb, Ciudadela Rumiñahui, Otavalo, Ecuador')}`,
  },
  // TODO: horario genérico PROVISIONAL, actualizar cuando se defina el definitivo
  schedule: [
    { days: "Lunes a viernes", hours: "08:00 – 18:00" },
    { days: "Sábados", hours: "09:00 – 13:00" },
    { days: "Domingos", hours: "Cerrado" },
  ],
};

export const LANDING_CONTENT = {
  about: "Somos un equipo interdisciplinar especializado en potenciar el desarrollo integral infantil en un entorno cálido, seguro y empático. Acompañamos a cada niño, niña y a sus familias con estrategias terapéuticas personalizadas e innovadoras.",
  values: ["Respeto", "Empatía", "Trabajo en equipo", "Compromiso"],
  objectives: [
    "Estimular el desarrollo del lenguaje y la comunicación efectiva.",
    "Fortalecer los procesos de pensamiento y facilitar el aprendizaje.",
    "Acompañar y orientar a las familias con herramientas prácticas.",
    "Intervenir de forma individualizada mediante evaluación continua."
  ],
  specialties: [
    {
      id: "lenguaje",
      name: "Terapia de lenguaje",
      description: "Evaluación e intervención en dificultades de pronunciación, comprensión y expresión.",
    },
    {
      id: "ocupacional",
      name: "Terapia ocupacional",
      description: "Desarrollo de autonomía, motricidad fina e integración sensorial.",
    },
    {
      id: "psicologia",
      name: "Psicología y psicopedagogía",
      description: "Apoyo emocional y conductual, y estrategias para superar dificultades de aprendizaje.",
    }
  ],
  process: [
    { step: 1, title: "Evaluación inicial", desc: "Conocemos las necesidades mediante sesiones diagnósticas integrales." },
    { step: 2, title: "Plan personalizado", desc: "Diseñamos metas y estrategias a la medida de cada paciente." },
    { step: 3, title: "Intervención", desc: "Sesiones periódicas para desarrollar habilidades y autonomía." },
    { step: 4, title: "Acompañamiento", desc: "Trabajo continuo junto a la familia para consolidar los avances." }
  ]
};
