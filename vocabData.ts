export interface TextSection {
  id: string;
  title: string;
  titleEsp: string;
  sentences: {
    esp: string;
    arm: string;
  }[];
}

export interface Question {
  id: string;
  textId: string;
  question: string;
  options: string[];
  correct: string;
}

export const TEXTS: TextSection[] = [
  {
    id: "ana",
    title: "Անայի պատմությունը",
    titleEsp: "La historia de Ana",
    sentences: [
        { esp: "Hola, soy Ana.", arm: "Ողջույն, ես Անան եմ:" },
        { esp: "Vivo en Madrid.", arm: "Ես ապրում եմ Մադրիդում:" },
        { esp: "Tengo una familia pequeña.", arm: "Ես ունեմ փոքր ընտանիք:" },
        { esp: "Cada mañana desayuno pan y té.", arm: "Ամեն առավոտ ես նախաճաշում եմ հաց և թեյ:" },
        { esp: "Después estudio español.", arm: "Դրանից հետո ես ուսումնասիրում եմ իսպաներեն:" },
        { esp: "Por la noche leo un libro.", arm: "Գիշերը ես գիրք եմ կարդում:" }
    ]
  },
  {
    id: "today",
    title: "Իմ օրը",
    titleEsp: "Hoy",
    sentences: [
        { esp: "Hoy he estudiado español.", arm: "Այսօր ես իսպաներեն եմ սովորել:" },
        { esp: "He leído un texto corto.", arm: "Ես կարդացել եմ մի կարճ տեքստ:" },
        { esp: "He escrito cinco frases.", arm: "Ես հինգ նախադասություն եմ գրել:" },
        { esp: "También he escuchado música en español.", arm: "Նաև իսպաներեն երաժշտություն եմ լսել:" },
        { esp: "Después he hablado con mi amiga.", arm: "Դրանից հետո ես խոսել եմ իմ ընկերուհու հետ:" },
        { esp: "Esta noche he cenado en casa.", arm: "Այս գիշեր ես ընթրել եմ տանը:" }
    ]
  }
];

export const EXERCISES: Question[] = [
  {
    id: "q1",
    textId: "ana",
    question: "Ինչպե՞ս կլինի իսպաներեն «Ես ապրում եմ Մադրիդում»:",
    options: ["Vivo en Madrid.", "Hola, soy Ana.", "Leo un libro."],
    correct: "Vivo en Madrid."
  },
  {
    id: "q2",
    textId: "ana",
    question: "Ինչպե՞ս կլինի իսպաներեն «Ես ունեմ փոքր ընտանիք»:",
    options: ["Tengo una casa grande.", "Después estudio español.", "Tengo una familia pequeña."],
    correct: "Tengo una familia pequeña."
  },
  {
    id: "q3",
    textId: "ana",
    question: "Ի՞նչ է նշանակում «Cada mañana»:",
    options: ["Ամեն առավոտ", "Ամեն երեկո", "Այսօր"],
    correct: "Ամեն առավոտ"
  },
  {
    id: "q4",
    textId: "today",
    question: "Ինչպե՞ս կլինի իսպաներեն «Այսօր ես իսպաներեն եմ սովորել»:",
    options: ["Leo un libro.", "Hoy he estudiado español.", "Vivo en Madrid."],
    correct: "Hoy he estudiado español."
  },
  {
    id: "q5",
    textId: "today",
    question: "Քանի՞ նախադասություն է նա գրել (cinco frases):",
    options: ["3", "5", "10"],
    correct: "5"
  },
  {
    id: "q6",
    textId: "today",
    question: "Որտե՞ղ է նա ընթրել (he cenado en casa):",
    options: ["Ռեստորանում", "Տանը", "Ընկերոջ մոտ"],
    correct: "Տանը"
  }
];
