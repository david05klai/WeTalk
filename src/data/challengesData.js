// challengesData.js - 50 Retos Interactivos 🔥

export const allChallenges = [
  // BLOQUE 1 (0-2)
  {
    id: 0,
    title: "Tu canción favorita",
    description: "Escribe el nombre de tu canción favorita en este momento",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text", // text, photo, longText
    placeholder: "Ej: Despacito - Luis Fonsi"
  },
  {
    id: 1,
    title: "Foto que te hizo sonreír",
    description: "Sube una foto de algo que te hizo sonreír hoy",
    category: "romance",
    difficulty: "facil",
    estimatedTime: "5 min",
    points: 10,
    responseType: "photo"
  },
  {
    id: 2,
    title: "Tu comida favorita",
    description: "¿Cuál es tu comida favorita y por qué?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Pizza porque..."
  },

  // BLOQUE 2 (3-5)
  {
    id: 3,
    title: "Carta de amor",
    description: "Escribe una carta corta (mínimo 50 palabras) expresando tu amor",
    category: "romance",
    difficulty: "media",
    estimatedTime: "15 min",
    points: 20,
    responseType: "longText",
    placeholder: "Querido/a..."
  },
  {
    id: 4,
    title: "Recuerdo favorito",
    description: "Describe tu recuerdo favorito con tu pareja",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "5 min",
    points: 10,
    responseType: "longText",
    placeholder: "Mi recuerdo favorito es cuando..."
  },
  {
    id: 5,
    title: "Tu artista favorito",
    description: "¿Quién es tu cantante o artista musical favorito?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Bad Bunny"
  },

  // BLOQUE 3 (6-8)
  {
    id: 6,
    title: "Selfie del momento",
    description: "Tómate una selfie ahora mismo y compártela",
    category: "romance",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },
  {
    id: 7,
    title: "Lugar soñado",
    description: "¿A qué lugar del mundo te gustaría viajar con tu pareja?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: París, Francia"
  },
  {
    id: 8,
    title: "Película favorita",
    description: "¿Cuál es tu película favorita de todos los tiempos?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Titanic"
  },

  // BLOQUE 4 (9-11)
  {
    id: 9,
    title: "Por qué te amo",
    description: "Escribe 5 cosas que amas de tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "1. Me encanta cuando...\n2. Amo su..."
  },
  {
    id: 10,
    title: "Tu hobbie favorito",
    description: "¿Qué te gusta hacer en tu tiempo libre?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Jugar videojuegos"
  },
  {
    id: 11,
    title: "Foto de tu mascota o algo que amas",
    description: "Comparte una foto de tu mascota, planta o algo que te gusta mucho",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 5 (12-14)
  {
    id: 12,
    title: "Sueño compartido",
    description: "Escribe un sueño o meta que quieres cumplir con tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "Me gustaría que algún día nosotros..."
  },
  {
    id: 13,
    title: "Tu color favorito",
    description: "¿Cuál es tu color favorito y por qué?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Azul porque me relaja"
  },
  {
    id: 14,
    title: "Libro o serie favorita",
    description: "¿Cuál es tu libro o serie favorita actualmente?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Breaking Bad"
  },

  // BLOQUE 6 (15-17)
  {
    id: 15,
    title: "Mensaje de amor",
    description: "Escribe un mensaje de amor como si fuera el último que le enviarías",
    category: "romance",
    difficulty: "dificil",
    estimatedTime: "15 min",
    points: 30,
    responseType: "longText",
    placeholder: "Si este fuera mi último mensaje..."
  },
  {
    id: 16,
    title: "Tu mayor logro",
    description: "¿Cuál ha sido tu mayor logro en la vida?",
    category: "comunicacion",
    difficulty: "media",
    estimatedTime: "5 min",
    points: 15,
    responseType: "text",
    placeholder: "Mi mayor logro fue..."
  },
  {
    id: 17,
    title: "Foto de tu comida favorita",
    description: "Comparte una foto de tu comida favorita (puede ser de internet)",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 7 (18-20)
  {
    id: 18,
    title: "Apodo cariñoso",
    description: "Escribe un apodo cariñoso nuevo para tu pareja",
    category: "romance",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Mi cielo"
  },
  {
    id: 19,
    title: "Tu mayor miedo",
    description: "Comparte algo que te da miedo (es momento de ser vulnerable)",
    category: "comunicacion",
    difficulty: "dificil",
    estimatedTime: "5 min",
    points: 25,
    responseType: "text",
    placeholder: "Tengo miedo de..."
  },
  {
    id: 20,
    title: "Tu deporte favorito",
    description: "¿Cuál es tu deporte favorito para practicar o ver?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Fútbol"
  },

  // Continuamos con más bloques...
  // BLOQUE 8 (21-23)
  {
    id: 21,
    title: "Poema corto",
    description: "Escribe un poema de 4 líneas para tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "En tus ojos veo...\n"
  },
  {
    id: 22,
    title: "Tu ciudad favorita",
    description: "¿Cuál es tu ciudad favorita y por qué?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Nueva York porque..."
  },
  {
    id: 23,
    title: "Foto de tu outfit favorito",
    description: "Comparte una foto tuya con tu outfit favorito",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "5 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 9 (24-26)
  {
    id: 24,
    title: "Lo que más admiras",
    description: "¿Qué es lo que más admiras de tu pareja?",
    category: "romance",
    difficulty: "media",
    estimatedTime: "5 min",
    points: 15,
    responseType: "longText",
    placeholder: "Lo que más admiro es..."
  },
  {
    id: 25,
    title: "Tu animal favorito",
    description: "¿Cuál es tu animal favorito?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Perro"
  },
  {
    id: 26,
    title: "Tu videojuego favorito",
    description: "¿Cuál es tu videojuego favorito de todos los tiempos?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Minecraft"
  },

  // BLOQUE 10 (27-29)
  {
    id: 27,
    title: "Promesa de amor",
    description: "Escribe una promesa que le haces a tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "Te prometo que siempre..."
  },
  {
    id: 28,
    title: "Tu postre favorito",
    description: "¿Cuál es tu postre favorito?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Helado de chocolate"
  },
  {
    id: 29,
    title: "Foto de tu lugar favorito en casa",
    description: "Comparte una foto de tu rincón favorito de tu casa",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 11 (30-32)
  {
    id: 30,
    title: "Primera impresión",
    description: "Escribe cuál fue tu primera impresión cuando conociste a tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "Cuando te conocí pensé que..."
  },
  {
    id: 31,
    title: "Tu marca favorita",
    description: "¿Cuál es tu marca de ropa, tecnología o producto favorita?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Nike"
  },
  {
    id: 32,
    title: "Tu emoji favorito",
    description: "¿Cuál es tu emoji favorito y por qué?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: 😂 porque..."
  },

  // BLOQUE 12 (33-35)
  {
    id: 33,
    title: "Momento más romántico",
    description: "Describe el momento más romántico que han vivido juntos",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "El momento más romántico fue..."
  },
  {
    id: 34,
    title: "Tu bebida favorita",
    description: "¿Cuál es tu bebida favorita?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Café con leche"
  },
  {
    id: 35,
    title: "Foto de tu vista favorita",
    description: "Comparte una foto de la vista más bonita que hayas visto",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 13 (36-38)
  {
    id: 36,
    title: "Carta al futuro",
    description: "Escribe una carta para tu 'yo' del futuro (en 5 años)",
    category: "romance",
    difficulty: "dificil",
    estimatedTime: "15 min",
    points: 30,
    responseType: "longText",
    placeholder: "Querido yo del futuro..."
  },
  {
    id: 37,
    title: "Tu app favorita",
    description: "¿Cuál es tu aplicación favorita del celular?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Instagram"
  },
  {
    id: 38,
    title: "Tu meme favorito",
    description: "Describe o envía tu meme favorito",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "text",
    placeholder: "Mi meme favorito es..."
  },

  // BLOQUE 14 (39-41)
  {
    id: 39,
    title: "Razones para estar juntos",
    description: "Escribe 3 razones por las que quieres seguir con tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "1. Quiero seguir contigo porque...\n2..."
  },
  {
    id: 40,
    title: "Tu estación del año favorita",
    description: "¿Cuál es tu estación del año favorita y por qué?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Verano porque..."
  },
  {
    id: 41,
    title: "Foto de tu atardecer favorito",
    description: "Comparte una foto de un atardecer (tuya o de internet)",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 15 (42-44)
  {
    id: 42,
    title: "Agradecimiento profundo",
    description: "Escribe por qué estás agradecido/a de tener a tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "Estoy agradecido/a porque..."
  },
  {
    id: 43,
    title: "Tu día de la semana favorito",
    description: "¿Cuál es tu día favorito de la semana?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Viernes"
  },
  {
    id: 44,
    title: "Tu foto de perfil favorita",
    description: "Comparte tu foto de perfil favorita que has tenido",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 10,
    responseType: "photo"
  },

  // BLOQUE 16 (45-47)
  {
    id: 45,
    title: "Plan perfecto",
    description: "Describe tu plan de cita perfecta con tu pareja",
    category: "romance",
    difficulty: "media",
    estimatedTime: "10 min",
    points: 20,
    responseType: "longText",
    placeholder: "Mi cita perfecta sería..."
  },
  {
    id: 46,
    title: "Tu superhéroe favorito",
    description: "¿Cuál es tu superhéroe favorito?",
    category: "comunicacion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Spider-Man"
  },
  {
    id: 47,
    title: "Tu país favorito",
    description: "¿Cuál es tu país favorito (aparte del tuyo)?",
    category: "diversion",
    difficulty: "facil",
    estimatedTime: "2 min",
    points: 10,
    responseType: "text",
    placeholder: "Ej: Japón"
  },

  // BLOQUE 17 FINAL (48-49)
  {
    id: 48,
    title: "Declaración final",
    description: "Escribe una declaración de amor como si fuera la primera vez",
    category: "romance",
    difficulty: "dificil",
    estimatedTime: "15 min",
    points: 30,
    responseType: "longText",
    placeholder: "Quiero decirte que..."
  },
  {
    id: 49,
    title: "Foto de ustedes juntos favorita",
    description: "Comparte tu foto favorita de los dos juntos",
    category: "romance",
    difficulty: "facil",
    estimatedTime: "3 min",
    points: 15,
    responseType: "photo"
  }
];
