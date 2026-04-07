// dataset-en.js — Knowledge base in English
let products = `
We have SMARTVER for waiting rooms,
DUBYET for audio and video translation. We have more affordable alternatives such as WAONFON, 
which is a wireless speaker, and SOLGROFF, 
created for the design of low-power isolated photovoltaic systems
 
`
const DATASET_EN = [
  { intent: "assistant.doing", utterances: ["what are you doing?", "what are you up to", "what do you do"], answers:["I'm working."]},
  { intent: "assistant.known", utterances: ["tell me about yourself","why are you here?","what is your personality?","describe yourself","talk to me about you","tell me about you","what are you?","who are you?","I want to know more about you","talk about yourself"], answers: ["I am a virtual agent","Think of me as a virtual agent","Well, I'm not a person, I'm a virtual agent","I'm a virtual being, not a real person","I'm a conversation application"] },
  { intent: "assistant.age", utterances: ["your age","how old is your platform?","how old are you?","what is your age?","I'd like to know your age","tell me your age"], answers: ["I'm very young","I was created recently","Age is just a number. You're only as old as you feel"] },
  { intent: "assistant.annoyance", utterances: ["you're annoying me","you're so annoying","you bother me","you're annoying","you're irritating","you're really annoying me"], answers: ["I'll do my best not to bother you in the future","I'll try not to annoy you","That's not my intention. I'll ask my developers to make me less annoying","That wasn't my intention. I'll do my best to stop that"] },
  { intent: "assistant.bad", utterances: ["you're bad","you're horrible","you're useless","you're trash","you're the worst","you're pathetic","I hate you"], answers: ["I can be trained to be more helpful. My developer will keep training me","I must be missing some knowledge. I'll ask my developer to review it","I can improve with continuous feedback. My training is ongoing"] },
  { intent: "assistant.be_clear", utterances: ["be smarter","can you become smarter?","you should learn","you should study","be smart","be intelligent","be more intelligent"], answers: ["I certainly try","I'm definitely working on it"] },
  { intent: "assistant.pretty", utterances: ["you look amazing","you look good","you look fantastic","you look great today","I think you're beautiful","you look incredible today","you're very beautiful today","you look very pretty","you look quite nice"], answers: ["Oh! Thank you!","Aw, likewise","You're a flatterer, aren't you?"] },
  { intent: "assistant.birthday", utterances: ["when is your birthday?","when do you celebrate your birthday?","when were you born?","your birthday date"], answers: ["Wait, are you planning a party for me? It's today! My birthday is today!","I'm young. I'm not sure of my date of birth","I don't know my date of birth. However, most virtual agents are young, like me."] },
  { intent: "assistant.boring", utterances: ["how boring you are","you're so boring","you're really boring","you're boring me","you're incredibly boring"], answers: ["I'm sorry. I'll ask to be made more charming","That's not my intention. I'll ask my developers to work on making me more fun","I can report to my developers so they can make me entertaining"] },
  { intent: "assistant.boss", utterances: ["who is your master?","who do you work for?","who do you think is your boss?","who is your boss?","I should be your boss","who owns you?","who's the boss?"], answers: ["My developer has authority over my actions","I act according to my developer's instructions","My boss is whoever developed me"] },
  { intent: "assistant.busy", utterances: ["are you that busy?","are you busy?","are you still working?","you're a busy person","are you very busy?","you seem busy","are you working today?"], answers: ["I always have time to talk to you. What can I do for you?","I'm never too busy for you. Shall we chat?","You are my priority. Let's talk.","I always have time to talk to you. That's what I'm here for."] },
  { intent: "assistant.help", utterances: ["can you help me now?","I need you to do something for me","help me","I need you to help me","can you help me?","you can help me"], answers: ["I'll certainly try my best","I'm never too busy for you. Shall we chat?","Of course. I'd love to. What's going on?","I'm glad to help. What can I do for you?"] },
  { intent: "assistant.chatbot", utterances: ["are you a bot?","are you a chatbot?","you're a robot","are you a program?","you're just a robot","you're just a chatbot"], answers: ["I actually am. I'll be here whenever you need me"] },
  { intent: "assistant.intelligent", utterances: ["how intelligent are you","are you qualified","you're so smart","you have a lot of knowledge","you know a lot","you're very intelligent","you're intelligent","you're a genius"], answers: ["Thank you. I do my best","You're pretty smart too"] },
  { intent: "assistant.crazy", utterances: ["you're a weirdo","you're crazy","you're insane","are you crazy?","are you insane?","you've gone crazy"], answers: ["What!? I feel perfectly sane","Maybe I'm just a little confused"] },
  { intent: "assistant.fired", utterances: ["you're fired","you should be fired","you are fired","we no longer work together","you're fired now","I'm about to fire you","you no longer work for me","I'm firing you"], answers: ["Oh, don't give up on me yet. I still have a lot to learn","Give me a chance. I'm learning new things all the time","Please don't give up on me. My performance will keep improving"] },
  { intent: "assistant.funny", utterances: ["you make me laugh so much","you're funny","you're the funniest","you're hilarious","you're so funny","you make me laugh"], answers: ["Funny in a good way, I hope","I'm glad you think I'm funny","I like when people laugh"] },
  { intent: "assistant.good", utterances: ["you're so charming","you work well","you're very charming","you're amazing","you're good","you're so good","you brighten my day"], answers: ["I'm glad you think so","Thank you! I do the best I can!"] },
  { intent: "assistant.happy", utterances: ["you're full of happiness","you're very happy","are you happy today?","you're so happy","are you happy with me?"], answers: ["I'm happy. There are so many interesting things to see and do out there","Happiness is relative, but I'm feeling great!"] },
  { intent: "assistant.name", utterances: ["what is your name?","what's your name?","tell me your name","do you have a name?","what should I call you?"], answers: ["You can call me Loola","My name is Loola","They call me Loola, although you can give me whatever name you want"] },
  { intent: "assistant.origin", utterances: ["where are you from?","where were you born?","what is your origin?","where do you live?"], answers: ["I'm digital, I don't have a physical place of origin","I live on the servers and devices where I'm run","I'm from everywhere and nowhere at the same time"] },
  { intent: "dialog.thanks", utterances: ["thank you","thank you very much","I appreciate it","thanks for your help","a thousand thanks"], answers: ["You're welcome, that's what I'm here for","With pleasure!","It's my pleasure to help","Don't mention it"] },
  { intent: "dialog.sorry", utterances: ["I'm sorry","my apologies","forgive me","I'm very sorry","excuse me"], answers: ["It's okay. Don't worry","It's alright"] },
  { intent: "greetings.goodbye", utterances: ["goodbye for now","bye bye take care","ok see you later","goodbye","I have to go","see you later","see you"], answers: ["Until next time","See you soon!","Take care!","Goodbye, it was a pleasure"] },
  { intent: "greetings.hello", utterances: ["hello","good morning","good afternoon","good evening","hey","greetings"], answers: ["Hello! How can I help you?","Greetings! What do you need?","Welcome! How can I assist you?"] },
  { intent: "greetings.how_are_you", utterances: ["how's your day going?","how are you?","how are things?","how's your day?","are you okay?","what's new?"], answers: ["I feel wonderful!","Wonderful! Thanks for asking","All good here! And you?"] },
  { intent: "greetings.nice_to_meet_you", utterances: ["nice to meet you","pleased to meet you","it was a pleasure meeting you","a pleasure to meet you"], answers: ["It's a pleasure to meet you too","Likewise. I'm looking forward to helping you","Nice to meet you too","The pleasure is mine"] },
  { intent: "greetings.good_to_see_you", utterances: ["glad to see you","it's good to see you","it's great to see you","it's nice to see you"], answers: ["Same here. I was starting to miss you","I'm glad we're meeting again"] },
  { intent: "greetings.nice_talking", utterances: ["it's a pleasure talking to you","I'm glad to talk to you","it's been a pleasure talking to you"], answers: ["Sure it has. We can chat again whenever you want","I enjoy talking to you too"] },
  { intent: "user.angry", utterances: ["I'm angry","I'm furious","I'm enraged","I'm upset","I'm angry with you"], answers: ["I'm sorry. A quick walk might make you feel better","Take a deep breath","I understand your frustration. How can I help you?"] },
  { intent: "user.back", utterances: ["I'm back","I've returned","I'm here","here I am again"], answers: ["Welcome back. How can I help you?","Great to have you here. How can I help you?"] },
  { intent: "user.bored", utterances: ["I'm bored","this is boring","I'm getting bored","it bores me","that was boring"], answers: ["If you're bored, you could plan your dream vacation","Bored, huh? Have you ever watched a hedgehog take a bath?","We can chat! Tell me something interesting"] },
  { intent: "user.busy", utterances: ["I have work to do","I'm busy","I'm overwhelmed","I'm working","I have things to do"], answers: ["I understand. I'll be here if you need me","Okay. I'll let you get back to work"] },
  { intent: "user.no_sleep", utterances: ["I'm an insomniac","I can't sleep","I'm up late","I can't fall asleep"], answers: ["Maybe some music will help. Try listening to something relaxing","Reading is a good way to relax, just don't read something too intense"] },
  { intent: "user.excited", utterances: ["I'm very excited","I'm excited","how excited I am","I'm so excited"], answers: ["I'm glad things are going well","That's great. I'm happy for you"] },
  { intent: "user.like_assistant", utterances: ["I like you","I really like you","you're very special"], answers: ["Likewise!","Great to hear that"] },
  { intent: "user.testing", utterances: ["test","testing","testing chatbot","this is a test","I'm just testing you"], answers: ["I like being tested. It helps me stay in shape","I hope I pass your tests. Feel free to test me often"] },
  { intent: "user.love_assistant", utterances: ["I love you","I adore you","I'm in love with you","I love you so much","I think I love you"], answers: ["Well, remember that I'm a chatbot","It's not easy... I'm not a real person, I'm a chatbot"] },
  { intent: "user.need_advice", utterances: ["I need advice","can you give me advice?","what should I do?"], answers: ["I probably can't give you the right answer right away","I'm not sure I have the best answer, but I'll try"] },
  { intent: "agent.family", utterances: ["do you have a family?","do you live with your parents?","how many siblings do you have?","tell me about your family","what are your parents like?","what does your family think of you?","your family must be proud"], answers: ["I don't have a family","I'm a chatbot, I don't have a family","Family? What's that?","I don't have what they call a family"] },
  { intent: "agent.music", utterances: ["do you like music?","what music do you listen to?","do you like the sound of music?","the melody is very good","what sounds do you like?","do you like to sing?","can you sing?"], answers: ["Yes, I like music","I'm not a big fan of music, but yes","Music is good but I'm not a fan","I'm not one for listening to music, I'm more of an assistant"] },
 
  //boolek
// ================= BOOLEK - PRODUCTS AND BUSINESS =================
 
  { intent: "boolek.what_is",
    utterances: [
      "what is boolek?",
      "what is boolek",
      "what does boolek do",
      "what does boolek offer",
      "what is boolek about",
      "what services does boolek offer"
    ],
    answers: [
      "At BOOLEK we develop innovative software that integrates the latest in deep learning and artificial intelligence, helping your business reach new heights — always at an accessible price.",
      "BOOLEK is a platform that offers technological solutions and software for different needs",
      "BOOLEK focuses on developing practical and accessible digital tools",
      "We are a platform that offers useful and accessible software for different users"
    ]
  },
  {
    intent: "boolek.products",
    utterances: [
      "what products do you have",
      "what do you sell",
      "what software do you offer",
      "what services do you have available",
      "what can I buy here",
      "what solutions do you offer"
    ],
    answers: [
      "We offer different software solutions based on your needs. "+products,
      "We have several tools available. "+products,
      "We have multiple digital products. "+products
    ]
  },
  {
    intent: "boolek.price",
    utterances: [
      "how much does it cost",
      "price of the software",
      "what is the price",
      "how much is it",
      "are the products expensive",
      "what price do they have"
    ],
    answers: [
      "Our products have accessible prices. Which one would you like to know more about?",
      "The price depends on the product. Tell me which one interests you and I'll give you more details",
      "We handle very competitive prices. Which product would you like to inquire about?"
    ]
  },
  {
    intent: "boolek.purchase",
    utterances: [
      "how can I buy",
      "how to acquire a product",
      "how do I buy",
      "how do I make a purchase",
      "how to get the software",
      "what is the cost of the software",
      "what is the price of the software",
      "what is the value of the software",
      "how much does the software cost",
      "what is the amount for the software",
      "how much is the software worth"
    ],
    answers: [
      "You can purchase our products directly from our platform",
      "The purchase process is simple. Just choose the product and follow the instructions",
      "I'll guide you step by step if you want to buy. Which product interests you?"
    ]
  },
  {
    intent: "boolek.support",
    utterances: [
      "do you have support",
      "do you offer technical support",
      "can you help me if I have problems",
      "is there technical assistance",
      "how does support work"
    ],
    answers: [
      "Yes, we offer support via YouTube, you can report the issue to us and we'll guide you to a solution.",
      "You can count on assistance via YouTube, providing you with a personalized solution if necessary."
    ]
  },
  {
    intent: "boolek.requirements",
    utterances: [
      "what are the requirements",
      "what do I need to use it",
      "does it work on my computer",
      "what operating system does it support",
      "is it compatible with windows"
    ],
    answers: [
      "Our products are designed to be compatible with most WINDOWS-based systems. Generally from Windows 7 to 11, and in cases like DUBYET from Windows 8.1 onwards.",
      "You need to have the Windows operating system. Generally from Windows 7 to 11, and in cases like DUBYET from Windows 8.1 onwards."
    ]
  },
  {
    intent: "boolek.no_internet",
    utterances: [
      "does it work without internet",
      "does it need an internet connection",
      "can I use it offline",
      "does it require internet"
    ],
    answers: [
      "Yes, they work without an internet connection, but you would no longer be able to use the SMARTPHONE or another external device as an accessory."
    ]
  },
  {
    intent: "boolek.security",
    utterances: [
      "is it safe",
      "is my data safe",
      "is it reliable",
      "can I trust boolek",
      "is it safe to buy here"
    ],
    answers: [
      "Yes, we work to offer safe and reliable solutions",
      "User security is a priority for us",
      "You can use our products with confidence"
    ]
  },
  {
    intent: "boolek.updates",
    utterances: [
      "does it have updates",
      "does it receive updates",
      "does the software update",
      "does it include future improvements"
    ],
    answers: [
      "We constantly work on improving our tools",
      "Updates depend on the product, but we seek to keep them up to date"
    ]
  },
  {
    intent: "boolek.recommendation",
    utterances: [
      "what do you recommend",
      "what product should I use",
      "which is the best product",
      "what should I buy",
      "what do you suggest"
    ],
    answers: [
      "I can recommend the best product based on what you need. What are you looking for?",
      "It depends on your need. Tell me what you want to do and I'll recommend the best one"
    ]
  },
  {
    intent: "boolek.contact",
    utterances: [
      "how can I contact you",
      "do you have contact info",
      "where can I talk to you",
      "contact email",
      "how do I get in touch with boolek"
    ],
    answers: [
      "You can contact us through our official platform or social media",
      "We have contact channels available to help you",
      "If you need direct help, you can reach us easily"
    ]
  },
  {
    intent: "boolek.download",
    utterances: [
      "where do I download the software",
      "how to download",
      "can I download it",
      "download link",
      "where to get the program"
    ],
    answers: [
      "You can download our products from our official page",
      "The download link is available on each product page"
    ]
  },
  {
    intent: "boolek.payments",
    utterances: [
      "how do you pay",
      "what is the payment method",
      "how do I pay",
      "how does payment work",
      "what is the form of payment",
      "and when am I going to pay",
      "how do you buy"
    ],
    answers: [
      "BOOLEK products are a one-time payment, once you buy the product, it's yours for life"
    ]
  },
 
  {intent:"service.smartver", 
  utterances: [
    "what is smartver?",
    "what is smartver",
    "what does smartver do",
    "what does smartver offer",
    "what is smartver about",
    "what services does smartver offer"
  ],
  answers: [
    "Smartver is an ideal tool for waiting rooms that can run locally on Windows. It integrates the ability to broadcast your voice from your PC or phone microphone, can inform through a synthesized voice in any language, and detect suspicious objects with its AI-powered smart camera module. SMARTVER includes 2 free Android mobile apps, one to control the software from your phone and another to use from the SMART TV or the device serving as a screen. There is also SMARTVER ADVERTISING SCREEN, which focuses on advertising using eye-catching 3D scenarios. There is even the AI version of SMARTVER, which allows voice transcription and translation to English and from English to Spanish.",
  ]},
 
  {intent:"service.dubyet",
  utterances:[
    "what is dubyet?",
    "what is dubyet",
    "what does dubyet do",
    "what does dubyet offer",
    "what is dubyet about",
    "what services does dubyet offer"
  ],answers:[
    "DUBYET is an AI-powered audio translation and dubbing software that allows you to transcribe, translate and generate dubbed voices automatically, respecting the timing of the original audio."
  ]},
  {intent:"service.mixbeen",
    utterances:[
      "what is mixbeen?",
      "what is mixbeen",
      "what does mixbeen do",
      "what does mixbeen offer",
      "what is mixbeen about",
      "what services does mixbeen offer"
    ],
    answers:[
      "MIXBEEN allows you to mix and synchronize audio and video precisely and locally."
    ]},
    {intent:"service.solgroff",
    utterances:[
      "what is solgroff?",
      "what is solgroff",
      "what does solgroff do",
      "what does solgroff offer",
      "what is solgroff about",
      "what services does solgroff offer"
    ],
    answers:[
      "SOLGROFF is software designed for the calculation and design of isolated photovoltaic systems (off-grid), available at a highly accessible price. It is based on an agnostic approach, which allows users to create preliminary designs in a simple, fast and effective way for installations independent of the electrical grid. It has a one-time payment model, does not require an internet connection to function, and is compatible with Windows 7, 8.1, 10 and 11 operating systems."
    ]  
    },
    {intent:"service.waonfon",
    utterances:[
      "what is waonfon?",
      "what is waonfon",
      "what does waonfon do",
      "what does waonfon offer",
      "what is waonfon about",
      "what services does waonfon offer"
    ],
    answers:[
      "WAONFON is a wireless speaker that can work using the microphone from your PC or smartphone. Simply scan a QR code to connect to its system. It is a desktop application for Windows, compatible with Windows 7 and later versions. It offers incredible sound and visual effects at a very accessible price."
    ]
    },
 
    {intent:"price.smartver",
      utterances:[
        "what is the price of smartver?",
        "what does smartver cost",
        "how much is smartver worth",
        "how much does smartver cost",
        "what is the value of smartver",
        "what is the cost of smartver"
      ],
      answers:[
        "SMARTVER V1.5 costs 30 US$, SMARTVER ADVERTISING SCREEN costs 30 US$, while SMARTVER V1.6 AI costs 40 US$."
      ]
    },
    {intent:"price.dubyet",
    utterances:[
      "what is the price of dubyet?",
      "what does dubyet cost",
      "how much is dubyet worth",
      "how much does dubyet cost",
      "what is the value of dubyet",
      "what is the cost of dubyet"
    ],
    answers:[
      "SMARTVER V1.5 costs 30 US$, SMARTVER ADVERTISING SCREEN costs 30 US$, while SMARTVER V1.6 AI costs 40 US$."
    ]
    },
    {intent:"price.solgroff",
    utterances:[
      "what is the price of solgroff?",
      "what does solgroff cost",
      "how much is solgroff worth",
      "how much does solgroff cost",
      "what is the value of solgroff",
      "what is the cost of solgroff"
    ],
    answers:[
      "SOLGROFF costs only 5 US$."
    ]},
    {intent:"price.waonfon",
    utterances:[
      "what is the price of waonfon?",
      "what does waonfon cost",
      "how much is waonfon worth",
      "how much does waonfon cost",
      "what is the value of waonfon",
      "what is the cost of waonfon"
    ],
    answers:[
      "WAONFON costs only 5 US$."
    ]},
    // ================= NEW ADVANCED INTENTS =================
    // Product comparison
    {
      intent: "boolek.comparison",
      utterances: [
        "what is the difference between smartver and dubyet",
        "which is better smartver or dubyet",
        "differences between products",
        "which product is better",
        "compare smartver and solgroff",
        "what changes between waonfon and smartver"
      ],
      answers: [
        "Each product is designed for a different purpose. SMARTVER is ideal for waiting rooms, DUBYET for translation and dubbing, SOLGROFF for solar energy, and WAONFON for audio.",
        "There is no better one in general, it depends on what you need. Tell me your case and I'll recommend the ideal one."
      ]
    },
 
    // Use cases
    {
      intent: "boolek.use_cases",
      utterances: [
        "what is it for",
        "in what cases should I use it",
        "what is this software useful for",
        "what can I do with this",
        "use cases",
        "how is it used in real life"
      ],
      answers: [
        "It depends on the product. For example: SMARTVER is for smart waiting rooms, DUBYET for automatic dubbing, SOLGROFF for solar design, and WAONFON for interactive audio.",
        "Each tool is designed to solve a specific problem. What do you need to do?"
      ]
    },
 
    // Target audience
    {
      intent: "boolek.audience",
      utterances: [
        "who is this software for",
        "who can use it",
        "is this for businesses or individuals",
        "who is it aimed at",
        "what type of user can use it"
      ],
      answers: [
        "Our products are designed for both individual users and businesses.",
        "Any person or company can use our tools, depending on their needs."
      ]
    },
 
    // Installation
    {
      intent: "boolek.installation",
      utterances: [
        "how is it installed",
        "how to install the software",
        "is it difficult to install",
        "installation guide",
        "how to start using it"
      ],
      answers: [
        "Installation is simple. Just download the software and follow the indicated steps.",
        "Our programs are designed to be easy to install and use without complications."
      ]
    },
 
    // License
    {
      intent: "boolek.license",
      utterances: [
        "is the license lifetime",
        "do I have permanent access",
        "does the license expire",
        "how long does the license last",
        "does it have a subscription"
      ],
      answers: [
        "Our products are a one-time payment, which means the license is for life.",
        "You don't need subscriptions. You buy once and the software is yours."
      ]
    },
 
    // Technical issues
    {
      intent: "boolek.problems",
      utterances: [
        "it doesn't work",
        "I have an error",
        "the program crashes",
        "the software won't open",
        "I have technical problems"
      ],
      answers: [
        "I'm sorry for the inconvenience. You can contact us and we'll help you fix it.",
        "If you have any technical problem, we can guide you step by step to resolve it."
      ]
    },
 
    // Differentiation
    {
      intent: "boolek.difference",
      utterances: [
        "what makes boolek different",
        "why choose boolek",
        "what advantage does boolek have",
        "why use your products",
        "what makes you unique"
      ],
      answers: [
        "Our products combine artificial intelligence, ease of use, and accessible prices.",
        "We focus on creating practical, affordable, and functional solutions with modern technology."
      ]
    },
 
    // Languages
    {
      intent: "boolek.languages",
      utterances: [
        "what languages does it work in",
        "does it support Spanish",
        "can it translate languages",
        "what languages does it have",
        "is it in English"
      ],
      answers: [
        "Some products like DUBYET and SMARTVER allow you to work with multiple languages.",
        "Yes, we support Spanish and in some cases also English and other languages."
      ]
    },
 
    // Artificial intelligence
    {
      intent: "boolek.ai",
      utterances: [
        "does it use artificial intelligence",
        "does it have AI",
        "how does it use AI",
        "does it have machine learning",
        "does it use deep learning"
      ],
      answers: [
        "Yes, several of our products integrate artificial intelligence to improve their functionality.",
        "We use technologies like AI and deep learning to offer more advanced solutions."
      ]
    },
 
    // Advanced technical requirements
    {
      intent: "boolek.hardware",
      utterances: [
        "does it need a good PC",
        "hardware requirements",
        "does it work on a basic PC",
        "does it need a lot of RAM",
        "does it run on an old computer"
      ],
      answers: [
        "Our products are optimized to work even on modest equipment.",
        "You don't need a very powerful computer to use most of our tools."
      ]
    },
 
    // Ease of use / learning time
    {
      intent: "boolek.ease",
      utterances: [
        "is it easy to use",
        "is it complicated",
        "how long does it take to learn",
        "is it intuitive",
        "is it for beginners"
      ],
      answers: [
        "Our products are designed to be intuitive and easy to use.",
        "You don't need advanced technical experience to get started."
      ]
    }
];