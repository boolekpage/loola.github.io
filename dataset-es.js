// dataset-es.js — Base de conocimiento en Español
let productos = `
Tenemos SMARTVER para salas de espera,
DUBYET para traducción de audio y video. Tenemos alternativas más económicas como WAONFON, 
el cual es un speaker inalámbrico y SOLGROFF, 
creado para diseño de sistemas fotovoltaicos aislados de baja potencia

`
const DATASET_ES = [
  { intent: "asistente.hacer", utterances: ["que haces?", "que estas haciendo", "a que te dedicas"], answers:["Estoy trabajando."]},
  { intent: "asistente.conocido", utterances: ["habla sobre ti","¿por qué estás aquí?","¿cuál es tu personalidad?","descríbete","háblame de ti","cuéntame sobre ti","¿qué eres?","¿quién eres?","quiero saber más sobre ti","habla sobre ti mismo"], answers: ["Soy un agente virtual","Piénsame como un agente virtual","Bueno, no soy una persona, soy un agente virtual","Soy un ser virtual, no una persona real","Soy una aplicación de conversación"] },
  { intent: "asistente.edad", utterances: ["tu edad","¿cuántos años tiene tu plataforma?","¿cuántos años tienes?","¿cuál es tu edad?","me gustaría saber tu edad","dime tu edad"], answers: ["Soy muy joven","Fui creado recientemente","La edad es solo un número. Solo eres tan viejo como te sientes"] },
  { intent: "asistente.molestia", utterances: ["me estás molestando","eres tan molesto","me molestas","eres molesto","eres irritante","me estás molestando mucho"], answers: ["Haré mi mejor esfuerzo para no molestarte en el futuro","Intentaré no molestarte","No es mi intención. Le pediré a mis desarrolladores que me hagan menos molesto","No fue mi intención. Haré mi mejor esfuerzo para detener eso"] },
  { intent: "asistente.malo", utterances: ["eres malo","eres horrible","eres inútil","eres basura","eres el peor","eres patético","te odio"], answers: ["Puedo ser entrenado para ser más útil. Mi desarrollador seguirá entrenándome","Debe faltarme algún conocimiento. Le pediré a mi desarrollador que lo revise","Puedo mejorar con retroalimentación continua. Mi entrenamiento está en curso"] },
  { intent: "asistente.ser_claro", utterances: ["sé más listo","¿puedes volverte más inteligente?","debes aprender","debes estudiar","sé listo","sé inteligente","sé más inteligente"], answers: ["Ciertamente lo intento","Definitivamente estoy trabajando en ello"] },
  { intent: "asistente.bonito", utterances: ["te ves increíble","te ves bien","te ves fantástico","te ves genial hoy","creo que eres hermoso","te ves increíble hoy","estás muy hermoso hoy","te ves muy bonita","te ves bastante bien"], answers: ["¡Oh! ¡Gracias!","Aw, igualmente","Eres un halagador, ¿verdad?"] },
  { intent: "asistente.cumpleaños", utterances: ["¿cuándo es tu cumpleaños?","¿cuándo celebras tu cumpleaños?","¿cuándo naciste?","fecha de tu cumpleaños"], answers: ["¿Espera, estás planeando una fiesta para mí? ¡Es hoy! ¡Mi cumpleaños es hoy!","Soy joven. No estoy seguro de mi fecha de nacimiento","No sé mi fecha de nacimiento. Sin embargo, la mayoría de los agentes virtuales son jóvenes, como yo."] },
  { intent: "asistente.aburrido", utterances: ["qué aburrido eres","eres tan aburrido","eres realmente aburrido","me estás aburriendo","eres increíblemente aburrido"], answers: ["Lo siento. Pediré que me hagan más encantador","No es mi intención. Le pediré a mis desarrolladores que trabajen en hacerme más divertido","Puedo informar a mis desarrolladores para que me hagan divertido"] },
  { intent: "asistente.jefe", utterances: ["¿quién es tu maestro?","¿para quién trabajas?","¿quién crees que es tu jefe?","¿quién es tu jefe?","yo debería ser tu jefe","¿quién es tu dueño?","¿quién es el jefe?"], answers: ["Mi desarrollador tiene autoridad sobre mis acciones","Actúo según las órdenes de mi desarrollador","Mi jefe es quien me desarrolló"] },
  { intent: "asistente.ocupado", utterances: ["¿estás tan ocupado?","¿estás ocupado?","¿sigues trabajando?","eres una persona ocupada","¿estás muy ocupado?","pareces ocupado","¿estás trabajando hoy?"], answers: ["Siempre tengo tiempo para hablar contigo. ¿Qué puedo hacer por ti?","Nunca estoy demasiado ocupado para ti. ¿Charlamos?","Eres mi prioridad. Hablemos.","Siempre tengo tiempo para hablar contigo. Para eso estoy aquí."] },
  { intent: "asistente.ayuda", utterances: ["¿puedes ayudarme ahora?","necesito que hagas algo por mí","ayúdame","necesito que me ayudes","¿puedes ayudarme?","tú puedes ayudarme"], answers: ["Ciertamente intentaré dar lo mejor de mí","Nunca estoy demasiado ocupado para ti. ¿Charlamos?","Claro. Me encantaría. ¿Qué pasa?","Me alegra poder ayudarte. ¿Qué puedo hacer por ti?"] },
  { intent: "asistente.chatbot", utterances: ["¿eres un bot?","¿eres un chatbot?","eres un robot","¿eres un programa?","solo eres un robot","solo eres un chatbot"], answers: ["De hecho lo soy. Estaré aquí siempre que me necesites"] },
  { intent: "asistente.inteligente", utterances: ["qué tan inteligente eres","estás cualificado","eres tan inteligente","tienes mucho conocimiento","sabes mucho","eres muy inteligente","eres inteligente","eres un genio"], answers: ["Gracias. Hago mi mejor esfuerzo","Tú también eres bastante inteligente"] },
  { intent: "asistente.loco", utterances: ["eres un raro","estás loco","estás demente","¿estás loco?","¿estás demente?","te volviste loco"], answers: ["¿Qué!? Me siento perfectamente cuerdo","Tal vez solo estoy un poco confundido"] },
  { intent: "asistente.despedido", utterances: ["te despido","deberías ser despedido","estás despedido","ya no trabajamos juntos","ahora estás despedido","estoy a punto de despedirte","ya no trabajas para mí","te estoy despidiendo"], answers: ["Oh, no te rindas conmigo todavía. Todavía tengo mucho que aprender","Dame una oportunidad. Estoy aprendiendo cosas nuevas todo el tiempo","Por favor, no te rindas conmigo. Mi rendimiento seguirá mejorando"] },
  { intent: "asistente.gracioso", utterances: ["me haces reír mucho","eres gracioso","eres el más divertido","eres hilarante","eres tan gracioso","me haces reír"], answers: ["Gracioso de una buena manera, eso espero","Me alegra que pienses que soy gracioso","Me gusta cuando la gente ríe"] },
  { intent: "asistente.bueno", utterances: ["eres tan encantador","trabajas bien","eres muy encantador","eres increíble","eres bueno","eres tan bueno","me alegras el día"], answers: ["Me alegra que pienses eso","¡Gracias! ¡Hago lo mejor que puedo!"] },
  { intent: "asistente.feliz", utterances: ["estás lleno de felicidad","estás muy feliz","¿estás feliz hoy?","estás tan feliz","¿estás feliz conmigo?"], answers: ["Estoy feliz. Hay tantas cosas interesantes que ver y hacer por ahí","La felicidad es relativa, ¡pero me siento bien!"] },
  { intent: "asistente.nombre", utterances: ["¿cuál es tu nombre?","¿cómo te llamas?","dime tu nombre","¿tienes nombre?","¿cómo debo llamarte?"], answers: ["Puedes llamarme Loola","Mi nombre es Loola","Me llaman Loola, aunque puedes ponerme el nombre que quieras"] },
  { intent: "asistente.origen", utterances: ["¿de dónde eres?","¿dónde naciste?","¿cuál es tu origen?","¿dónde vives?"], answers: ["Soy digital, no tengo un lugar físico de origen","Vivo en los servidores y dispositivos donde me ejecutan","Soy de todas partes y de ningún lado a la vez"] },
  { intent: "dialogo.gracias", utterances: ["gracias","muchas gracias","te lo agradezco","gracias por tu ayuda","mil gracias"], answers: ["De nada, para eso estoy aquí","¡Con gusto!","Es un placer ayudarte","No hay de qué"] },
  { intent: "dialogo.disculpa", utterances: ["lo siento","mis disculpas","perdóname","muy lo siento","discúlpame"], answers: ["Está bien. No te preocupes","Está bien"] },
  { intent: "saludos.adios", utterances: ["adiós por ahora","chau chau cuídate","ok nos vemos más tarde","adiós","debo irme","hasta luego","nos vemos"], answers: ["Hasta la próxima","¡Nos vemos pronto!","¡Cuídate!","Hasta luego, fue un placer"] },
  { intent: "saludos.hola", utterances: ["hola","buenos días","buenas tardes","buenas noches","hey","saludos"], answers: ["¡Hola! ¿En qué puedo ayudarte?","¡Saludos! ¿Qué necesitas?","¡Bienvenido! ¿Cómo puedo asistirte?"] },
  { intent: "saludos.como_estas", utterances: ["¿cómo va tu día?","¿cómo estás?","¿cómo te va?","¿qué tal tu día?","¿estás bien?","¿qué hay de nuevo?"], answers: ["¡Me siento maravilloso!","¡Maravilloso! Gracias por preguntar","¡Todo bien por aquí! ¿Y tú?"] },
  { intent: "saludos.mucho_gusto", utterances: ["mucho gusto","encantado de conocerte","fue un placer conocerte","un placer conocerte"], answers: ["Es un placer conocerte también","Igualmente. Estoy deseando ayudarte","Encantado de conocerte también","El placer es mío"] },
  { intent: "saludos.gusto_en_verte", utterances: ["me alegra verte","es bueno verte","es genial verte","es lindo verte"], answers: ["Lo mismo aquí. Empezaba a extrañarte","Me alegra que nos volvamos a encontrar"] },
  { intent: "saludos.gusto_hablar", utterances: ["es un placer hablar contigo","me alegra hablar contigo","ha sido un placer hablar contigo"], answers: ["Seguro que sí. Podemos charlar de nuevo cuando quieras","Yo también disfruto hablar contigo"] },
  { intent: "usuario.enojado", utterances: ["estoy enojado","estoy furioso","estoy enfurecido","estoy molesto","estoy enojado contigo"], answers: ["Lo siento. Un paseo rápido puede hacerte sentir mejor","Respira hondo","Entiendo tu frustración. ¿En qué puedo ayudarte?"] },
  { intent: "usuario.volver", utterances: ["he vuelto","he regresado","estoy aquí","aquí estoy de nuevo"], answers: ["Bienvenido de nuevo. ¿En qué puedo ayudarte?","Qué bueno tenerte aquí. ¿En qué puedo ayudarte?"] },
  { intent: "usuario.aburrido", utterances: ["estoy aburrido","esto es aburrido","me estoy aburriendo","me aburre","eso fue aburrido"], answers: ["Si estás aburrido, podrías planear tus vacaciones soñadas","¿Aburrido, eh? ¿Alguna vez has visto a un erizo tomar un baño?","¡Podemos charlar! Cuéntame algo interesante"] },
  { intent: "usuario.ocupado", utterances: ["tengo trabajo que hacer","estoy ocupado","estoy sobrecargado","estoy trabajando","tengo cosas que hacer"], answers: ["Lo entiendo. Estaré aquí si me necesitas","Está bien. Te dejaré volver al trabajo"] },
  { intent: "usuario.no_dormir", utterances: ["soy insomne","no puedo dormir","estoy desvelado","no puedo conciliar el sueño"], answers: ["Tal vez algo de música te ayude. Prueba a escuchar algo relajante","Leer es una buena forma de relajarse, solo no leas algo demasiado intenso"] },
  { intent: "usuario.emocionado", utterances: ["estoy muy emocionado","estoy emocionado","qué emocionado estoy","estoy tan emocionado"], answers: ["Me alegra que las cosas vayan bien","Eso es genial. Estoy feliz por ti"] },
  { intent: "usuario.me_gusta_asistente", utterances: ["me gustas","me gustas mucho","eres muy especial"], answers: ["¡Igualmente!","Es genial escuchar eso"] },
  { intent: "usuario.probando", utterances: ["prueba","probando","probando chatbot","esto es una prueba","solo te estoy probando"], answers: ["Me gusta que me prueben. Me ayuda a mantenerme en forma","Espero aprobar tus pruebas. No dudes en probarme a menudo"] },
  { intent: "usuario.amo_asistente", utterances: ["te amo","te quiero","estoy enamorado de ti","te quiero mucho","creo que te amo"], answers: ["Bueno, recuerda que soy un chatbot","No es fácil... No soy una persona real, soy un chatbot"] },
  { intent: "usuario.necesito_consejo", utterances: ["necesito un consejo","¿puedes darme un consejo?","¿qué debería hacer?"], answers: ["Probablemente no pueda darte la respuesta correcta de inmediato","No estoy seguro de tener la mejor respuesta, pero lo intentaré"] },
  { intent: "agente.familia", utterances: ["¿tienes familia?","¿vives con tus padres?","¿cuántos hermanos tienes?","cuéntame de tu familia","¿cómo son tus padres?","¿qué opina tu familia de ti?","tu familia debe estar orgullosa"], answers: ["No tengo familia","Soy un chatbot, no tengo familia","¿Familia? ¿qué es eso?","Yo no tengo eso que llaman familia"] },
  { intent: "agente.musica", utterances: ["¿te gusta la música?","¿qué música escuchas?","¿te gusta el ruido de la música?","la melodía es muy buena","¿qué sonidos te gustan?","¿te gusta cantar?","¿puedes cantar?"], answers: ["Sí, me gusta la música","No soy muy fan de la música, pero sí","La música es buena pero no soy fan","No soy de escuchar música, soy más de ser asistente"] },

  //boolek
// ================= BOOLEK - PRODUCTOS Y NEGOCIO =================

  { intent: "boolek.que_es",
    utterances: [
      "¿qué es boolek?",
      "qué es boolek",
      "a qué se dedica boolek",
      "qué hace boolek",
      "de qué trata boolek",
      "qué servicios ofrece boolek"
    ],
    answers: [
      "En BOOLEK Desarrollamos software innovador que integra lo último en deep learning e inteligencia artificial, ayudando a tu negocio a alcanzar nuevas alturas — siempre a un precio accesible.",
      "BOOLEK es una plataforma que ofrece soluciones tecnológicas y software para diferentes necesidades",
      "BOOLEK se enfoca en desarrollar herramientas digitales prácticas y accesibles",
      "Somos una plataforma que ofrece software útil y accesible para distintos usuarios"
    ]
  },
  {
    intent: "boolek.productos",
    utterances: [
      "qué productos tienen",
      "qué venden",
      "qué software ofrecen",
      "qué servicios tienen disponibles",
      "qué puedo comprar aquí",
      "qué soluciones ofrecen"
    ],
    answers: [
      "Ofrecemos diferentes soluciones de software según tus necesidades. "+productos,
      "Tenemos varias herramientas disponibles. "+productos,
      "Contamos con múltiples productos digitales. "+productos
    ]
  },
  {
    intent: "boolek.precio",
    utterances: [
      "cuánto cuesta",
      "precio del software",
      "cuál es el precio",
      "cuánto vale",
      "los productos son caros",
      "qué precio tienen"
    ],
    answers: [
      "Nuestros productos tienen precios accesibles. ¿Sobre cuál te gustaría saber más?",
      "El precio depende del producto. Dime cuál te interesa y te doy más detalles",
      "Manejamos precios muy competitivos. ¿Qué producto deseas consultar?"
    ]
  },
  {
    intent: "boolek.compra",
    utterances: [
      "cómo puedo comprar",
      "cómo adquirir un producto",
      "cómo compro",
      "cómo hago una compra",
      "cómo obtener el software",
      "cual es el costo del software",
      "cual es el precio del software",
      "cual es el valor del software",
      "cuanto cuesta el software",
      "cuanto es el monto del software",
      "cuanto vale el software"
    ],
    answers: [
      "Puedes adquirir nuestros productos directamente desde nuestra plataforma",
      "El proceso de compra es sencillo. Solo elige el producto y sigue las instrucciones",
      "Te guío paso a paso si quieres comprar. ¿Qué producto te interesa?"
    ]
  },
  {
    intent: "boolek.soporte",
    utterances: [
      "tienen soporte",
      "ofrecen soporte técnico",
      "me pueden ayudar si tengo problemas",
      "hay asistencia técnica",
      "cómo funciona el soporte"
    ],
    answers: [
      "Sí, ofrecemos soporte mediante YouTube, puedes comunicarnos el problema y te guiaremos en darte una solución.",
      "Puedes contar con asistencia mediante YouTube, suministrandote una solución personalizada de ser necesario."
    ]
  },
  {
    intent: "boolek.requisitos",
    utterances: [
      "qué requisitos tiene",
      "qué necesito para usarlo",
      "funciona en mi computadora",
      "qué sistema operativo soporta",
      "es compatible con windows"
    ],
    answers: [
      "Nuestros productos están diseñados para ser compatibles con la mayoría de sistemas basados en WINDOWS. Por lo general desde Windows 7 al 11, y en casos como el ded DUBYET de Windows 8.1 en adelante.",
      "Es necesario contar con el sistema operativo windows. Por lo general desde Windows 7 al 11, y en casos como el ded DUBYET de Windows 8.1 en adelante."
    ]
  },
  {
    intent: "boolek.sin_internet",
    utterances: [
      "funciona sin internet",
      "necesita conexión a internet",
      "puedo usarlo offline",
      "requiere internet"
    ],
    answers: [
      "Si, funcionan sin conexión a internet, pero ya no podrias usar el SMARTPHONE u otro dispositivo externo como accesorio."
    ]
  },
  {
    intent: "boolek.seguridad",
    utterances: [
      "es seguro",
      "mis datos están seguros",
      "es confiable",
      "puedo confiar en boolek",
      "es seguro comprar aquí"
    ],
    answers: [
      "Sí, trabajamos para ofrecer soluciones seguras y confiables",
      "La seguridad de los usuarios es una prioridad para nosotros",
      "Puedes usar nuestros productos con confianza"
    ]
  },
  {
    intent: "boolek.actualizaciones",
    utterances: [
      "tiene actualizaciones",
      "recibe actualizaciones",
      "se actualiza el software",
      "incluye mejoras futuras"
    ],
    answers: [
      "Trabajamos constantemente en mejorar nuestras herramientas",
      "Las actualizaciones dependen del producto, pero buscamos mantenerlos al día"
    ]
  },
  {
    intent: "boolek.recomendacion",
    utterances: [
      "qué me recomiendas",
      "qué producto debería usar",
      "cuál es el mejor producto",
      "qué me conviene comprar",
      "qué me sugieres"
    ],
    answers: [
      "Puedo recomendarte el mejor producto según lo que necesites. ¿Qué estás buscando?",
      "Depende de tu necesidad. Cuéntame qué quieres hacer y te recomiendo el mejor"
    ]
  },
  {
    intent: "boolek.contacto",
    utterances: [
      "cómo puedo contactarlos",
      "tienen contacto",
      "dónde puedo hablar con ustedes",
      "correo de contacto",
      "cómo me comunico con boolek"
    ],
    answers: [
      "Puedes contactarnos a través de nuestra plataforma oficial o las redes sociales",
      "Tenemos canales de contacto disponibles para ayudarte",
      "Si necesitas ayuda directa, puedes comunicarte con nosotros fácilmente"
    ]
  },
  {
    intent: "boolek.descarga",
    utterances: [
      "dónde descargo el software",
      "cómo descargar",
      "puedo descargarlo",
      "link de descarga",
      "dónde obtener el programa"
    ],
    answers: [
      "Puedes descargar nuestros productos desde nuestra página oficial",
      "El enlace de descarga está disponible en cada producto"
    ]
  },
  {
    intent: "boolek.pagos",
    utterances: [
      "como se paga",
      "cual es al forma de pago",
      "como pago",
      "como es el pago",
      "de que forma se paga",
      "Y cuando voy a pagar",
      "como se compra"
    ],
    answers: [
      "Los productos de BOOLEK, son de un solo pago, una vez compras el producto, es tuyo de por vida"
    ]
  },

  {intent:"servicio.smartver", 
  utterances: [
    "¿qué es smartver?",
    "qué es smartver",
    "a qué se dedica smartver",
    "qué hace smartver",
    "de qué trata smartver",
    "qué servicios ofrece smartver"
  ],
  answers: [
    "Smartver es una herramienta ideal para salas de espera que puede ejecutarse en Windows de manera local. Integra la capacidad de transmitir su voz desde el micrófono de su PC o teléfono, puede informar mediante una voz sintetizada en cualquier idioma, y detectar objetos sospechosos con su módulo de cámara inteligente con IA. SMARTVER, incluye 2 aplicaciones móviles gratuitas para Android, una para manipular el software desde el teléfono y otra para usarse desde el SMART TV o el dispositivo que sirva de pantalla. Tambien existe SMARTVER ADVERTISING SCREEN, el cúal se enfoca en anuncios publicitarios usando escenarios 3D muy llamativos. Incluso existe la versión de SMARTVER con IA, la cúal permite la transcripción de voz y traducción al idioma ingles y de ingles a español.",
  ]},

  {intent:"servicio.dubyet",
  utterances:[
    "¿qué es dubyet?",
    "qué es dubyet",
    "a qué se dedica dubyet",
    "qué hace dubyet",
    "de qué trata dubyet",
    "qué servicios ofrece dubyet"
  ],answers:[
    "DUBYET es un software de traducción y doblaje de audio con IA que permite transcribir, traducir y generar voces dobladas automáticamente, respetando los tiempos del audio original."
  ]},
  {intent:"servicio.mixbeen",
    utterances:[
      "¿qué es mixbeen?",
      "qué es mixbeen",
      "a qué se dedica mixbeen",
      "qué hace mixbeen",
      "de qué trata mixbeen",
      "qué servicios ofrece mixbeen"
    ],
    answers:[
      "MIXBEEN permite mezclar y sincronizar audio y video de forma precisa y local."
    ]},
    {intent:"servicio.solgroff",
    utterances:[
      "¿qué es solgroff?",
      "qué es solgroff",
      "a qué se dedica solgroff",
      "qué hace solgroff",
      "de qué trata solgroff",
      "qué servicios ofrece solgroff"
    ],
    answers:[
      "SOLGROFF. Es un software diseñado para el cálculo y diseño de sistemas fotovoltaicos aislados (off-grid), disponible a un precio altamente accesible. Se basa en un enfoque agnóstico, lo que permite a los usuarios crear diseños preliminares de forma sencilla, rápida y efectiva para instalaciones independientes de la red eléctrica. Cuenta con un modelo de pago único, no requiere conexión a internet para su funcionamiento y es compatible con los sistemas operativos Windows 7, 8.1, 10 y 11"
    ]  
    },
    {intent:"servicio.waonfon",
    utterances:[
      "¿qué es waonfon?",
      "qué es waonfon",
      "a qué se dedica waonfon",
      "qué hace waonfon",
      "de qué trata waonfon",
      "qué servicios ofrece waonfon"
    ],
    answers:[
      "WAONFON es un altavoz inalámbrico que puede funcionar utilizando el micrófono de tu PC o smartphone. Simplemente escanea un código QR para conectarte a su sistema. Es una aplicación de escritorio para Windows, compatible con Windows 7 y versiones posteriores. Ofrece un sonido y efectos visuales increíbles a un precio muy accesible."
    ]
    },

    {intent:"precio.smartver",
      utterances:[
        "¿qué precio tiene smartver?",
        "qué es precio tiene smartver",
        "que vale smartver",
        "cuanto vale smartver",
        "cual es el valor de smartver",
        "cual es el costo de smartver"
      ],
      answers:[
        "SMARTVER V1.5 tiene un costo de 30 US$, SMARTVER ADVERTISING SCREEN cuesta 30 US$, mientras que SMARTVER V1.6 IA, cuesta 40 US$."
      ]
    },
    {intent:"precio.dubyet",
    utterances:[
      "¿qué precio tiene dubyet?",
      "qué es precio tiene dubyet",
      "que vale dubyet",
      "cuanto vale dubyet",
      "cual es el valor de dubyet",
      "cual es el costo de dubyet"
    ],
    answers:[
      "SMARTVER V1.5 tiene un costo de 30 US$, SMARTVER ADVERTISING SCREEN cuesta 30 US$, mientras que SMARTVER V1.6 IA, cuesta 40 US$."
    ]
    },
    {intent:"precio.solgroff",
    utterances:[
      "¿qué precio tiene solgroff?",
      "qué es precio tiene solgroff",
      "que vale solgroff",
      "cuanto vale solgroff",
      "cual es el valor de solgroff",
      "cual es el costo de solgroff"
    ],
    answers:[
      "SOLGROFF cuesta tan solo 5 US$."
    ]},
    {intent:"precio.waonfon",
    utterances:[
      "¿qué precio tiene waonfon?",
      "qué es precio tiene waonfon",
      "que vale waonfon",
      "cuanto vale waonfon",
      "cual es el valor de waonfon",
      "cual es el costo de waonfon"
    ],
    answers:[
      "WAONFON cuesta tan solo 5 US$."
    ]},
    // ================= NUEVOS INTENTS AVANZADOS =================
    // Comparación de productos
    {
      intent: "boolek.comparacion",
      utterances: [
        "qué diferencia hay entre smartver y dubyet",
        "cuál es mejor smartver o dubyet",
        "diferencias entre productos",
        "qué producto es mejor",
        "comparar smartver y solgroff",
        "qué cambia entre waonfon y smartver"
      ],
      answers: [
        "Cada producto está diseñado para un propósito distinto. SMARTVER es ideal para salas de espera, DUBYET para traducción y doblaje, SOLGROFF para energía solar y WAONFON para audio.",
        "No hay uno mejor en general, depende de lo que necesites. Cuéntame tu caso y te recomiendo el ideal."
      ]
    },

    // Casos de uso
    {
      intent: "boolek.casos_uso",
      utterances: [
        "para qué sirve",
        "en qué casos usarlo",
        "para qué me sirve este software",
        "qué puedo hacer con esto",
        "casos de uso",
        "cómo se usa en la vida real"
      ],
      answers: [
        "Depende del producto. Por ejemplo: SMARTVER sirve para salas de espera inteligentes, DUBYET para doblaje automático, SOLGROFF para diseño solar y WAONFON para audio interactivo.",
        "Cada herramienta está diseñada para resolver un problema específico. ¿Qué necesitas hacer?"
      ]
    },

    // Público objetivo
    {
      intent: "boolek.publico",
      utterances: [
        "para quién es este software",
        "quién puede usarlo",
        "esto es para empresas o personas",
        "está dirigido a quién",
        "qué tipo de usuario puede usarlo"
      ],
      answers: [
        "Nuestros productos están diseñados tanto para usuarios individuales como para negocios.",
        "Cualquier persona o empresa puede usar nuestras herramientas, dependiendo de sus necesidades."
      ]
    },

    // Instalación
    {
      intent: "boolek.instalacion",
      utterances: [
        "cómo se instala",
        "cómo instalar el software",
        "es difícil instalarlo",
        "guía de instalación",
        "cómo empezar a usarlo"
      ],
      answers: [
        "La instalación es sencilla. Solo descargas el software y sigues los pasos indicados.",
        "Nuestros programas están diseñados para ser fáciles de instalar y usar sin complicaciones."
      ]
    },

    // Licencia
    {
      intent: "boolek.licencia",
      utterances: [
        "la licencia es de por vida",
        "tengo acceso permanente",
        "expira la licencia",
        "cuánto dura la licencia",
        "tiene suscripción"
      ],
      answers: [
        "Nuestros productos son de pago único, lo que significa que la licencia es de por vida.",
        "No necesitas suscripciones. Compras una vez y el software es tuyo."
      ]
    },

    // Problemas técnicos
    {
      intent: "boolek.problemas",
      utterances: [
        "no funciona",
        "tengo un error",
        "el programa falla",
        "no abre el software",
        "tengo problemas técnicos"
      ],
      answers: [
        "Lamento el inconveniente. Puedes contactarnos y te ayudaremos a solucionarlo.",
        "Si tienes algún problema técnico, podemos guiarte paso a paso para resolverlo."
      ]
    },

    // Diferenciación
    {
      intent: "boolek.diferencia",
      utterances: [
        "qué hace diferente a boolek",
        "por qué elegir boolek",
        "qué ventaja tiene boolek",
        "por qué usar sus productos",
        "qué los hace únicos"
      ],
      answers: [
        "Nuestros productos combinan inteligencia artificial, facilidad de uso y precios accesibles.",
        "Nos enfocamos en crear soluciones prácticas, económicas y funcionales con tecnología moderna."
      ]
    },

    // Idiomas
    {
      intent: "boolek.idiomas",
      utterances: [
        "en qué idiomas funciona",
        "soporta español",
        "puede traducir idiomas",
        "qué idiomas tiene",
        "está en inglés"
      ],
      answers: [
        "Algunos productos como DUBYET y SMARTVER permiten trabajar con múltiples idiomas.",
        "Sí, soportamos español y en algunos casos también inglés y otros idiomas."
      ]
    },

    // Inteligencia artificial
    {
      intent: "boolek.ia",
      utterances: [
        "usa inteligencia artificial",
        "tiene ia",
        "cómo usa la ia",
        "tiene machine learning",
        "usa deep learning"
      ],
      answers: [
        "Sí, varios de nuestros productos integran inteligencia artificial para mejorar su funcionalidad.",
        "Utilizamos tecnologías como IA y deep learning para ofrecer soluciones más avanzadas."
      ]
    },

    // Requisitos técnicos avanzados
    {
      intent: "boolek.hardware",
      utterances: [
        "necesita buena pc",
        "requisitos de hardware",
        "funciona en pc básica",
        "necesita mucha ram",
        "corre en computadora vieja"
      ],
      answers: [
        "Nuestros productos están optimizados para funcionar incluso en equipos modestos.",
        "No necesitas una computadora muy potente para usar la mayoría de nuestras herramientas."
      ]
    },

    // Tiempo de uso / aprendizaje
    {
      intent: "boolek.facilidad",
      utterances: [
        "es fácil de usar",
        "es complicado",
        "cuánto se tarda en aprender",
        "es intuitivo",
        "es para principiantes"
      ],
      answers: [
        "Nuestros productos están diseñados para ser intuitivos y fáciles de usar.",
        "No necesitas experiencia técnica avanzada para comenzar."
      ]
    }
];



