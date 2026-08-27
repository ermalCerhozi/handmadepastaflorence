// English — the source-of-truth dictionary. Its shape (`typeof en`) is the type
// every other locale must satisfy (see ../types.ts). Copy that used to live as
// inline `lang === 'it' ? … : …` ternaries in components now lives here; each
// section maps to one component. Non-translatable data (image paths, sizes,
// landing-page keys) stays in the component and is zipped with this copy by index.

const en = {
  meta: {
    // The homepage carries exactly ONE keyword ("cooking class in Florence" — the
    // category head term no other page targets) across four slots: title, the H1
    // subline, this description's opener, and the hero image alt. Everything else
    // here is conversion copy. Do not re-target "pasta making class in Florence":
    // that belongs to /pasta-making-class-florence/ and was de-cannibalized on purpose.
    homeTitle: 'Cooking Classes in Florence: Hands-On Pasta, Two Chefs',
    homeDescription: 'Small-group pasta classes in Florence\'s Oltrarno, from €95. Roll fresh pasta by hand with two Tuscan head chefs. Market-tour and private options.',
    blogTitle: 'Florence Pasta & Food Guides',
    blogDescription: 'Guides to fresh pasta and eating well in Florence, written by two Tuscan agriturismo head chefs: pasta shapes, where to eat, gluten-free tips and the Oltrarno neighbourhood.',
  },

  nav: {
    classes: 'Classes',
    pasta: 'Pasta Shapes',
    story: 'Our Story',
    business: 'For Business',
    guides: 'Guides',
    book: 'Book a class',
    menu: 'Menu',
  },

  footer: {
    headline: 'Come get your hands<br /><span class="font-golden" style="font-size: 1.3em; display: inline-block; margin-left: 0.1em; color: var(--yolk);">a little floury.</span>',
    book: 'Book your class',
    hours: 'Open every day · classes 10:00, 14:30 & 18:00',
    desc: 'Two agriturismo chefs, cooking with you in person & online in the heart of Florence.',
    by: 'By',
    classes: 'Classes',
    visit: 'Visit',
    pastaClass: 'Pasta Class in Florence',
    marketTour: 'Market Tour & Cook',
    agriturismo: 'Agriturismo Class',
    private: 'Private Events',
    online: 'Live Online',
    team: 'Team Building',
    glutenFree: 'Gluten-Free Class',
    forTwo: 'Pasta Class for Two',
    gift: 'Gift a class',
    guides: 'Guides & Stories',
    faq: 'FAQ & Allergens',
    made: 'Rolled by hand 🤌 in Firenze',
  },

  // Class landing page (ClassLanding.astro) chrome labels.
  lp: {
    home: 'Home',
    pastaCrumb: 'Pasta',
    updated: 'Prices and times checked in',
    galleryStation: 'Your station, set out before you arrive: your own board, rolling pin and flour. Nobody shares a bowl.',
    galleryTable: 'Where it ends: what you made, a Tuscan board alongside it, and the two glasses that are already in the price.',
    faqPre: 'Good to ',
    faqItal: 'know.',
    relPre: 'Looking for something ',
    relItal: 'else?',
  },

  lang: {
    switch: 'Language',
  },

  hero: {
    eyebrow: 'Firenze · newly opened · two chefs, one long table',
    titleL1: 'Flour, eggs,',
    titleL2: 'and your two',
    titleItal: 'hands.',
    // Keyword slot 2 of 4. Sits inside the <h1> at a smaller size so the emotive
    // line above it still does the conversion work.
    titleKw: 'Hands-on cooking classes in Florence, from €95.',
    imgAlt: 'Guests at a hands-on cooking class in Florence, rolling fresh pasta in our Oltrarno kitchen',
    lede: 'Roll real Tuscan pasta beside two agriturismo head chefs.',
    ctaReserve: 'Book a pasta class',
    ctaSee: 'See the classes',
    proofOpened: 'our kitchen just opened',
    proofHands: 'hands-on, then you eat it all',
    proofTable: 'at the table, never more',
  },

  fab: {
    eyebrow: 'In Florence & online',
    when: 'Small-group pasta classes',
    book: 'Book now',
  },

  online: {
    live: 'Live',
    eyebrow: 'Can’t make it to Florence?',
    titlePre: 'Cook with us ',
    titleItal: 'live online.',
    desc: 'Same chefs, same kitchen. A live online pasta making class with an ingredient kit shipped to your door. A lovely option (or gift) if Italy isn’t on the calendar yet.',
    cta: 'Join an online class',
    from: 'from',
    person: 'person',
    more: 'Full details',
  },

  why: {
    srHeading: 'Why cook with us',
    points: [
      { t: 'Learn by doing', d: 'No demos from a distance. From minute one your hands are in the flour, shaping every piece yourself.' },
      { t: 'Eat what you make', d: 'Every class ends at the table with your fresh pasta, a Tuscan sauce, and a glass of local wine.' },
      { t: 'Small groups only', d: 'Never more than eight at the board, so there’s always a chef at your elbow to fix your fold.' },
      { t: 'From the farm to Florence', d: 'We run agriturismo kitchens in the hills outside town. This is the pasta we cook for our guests every single day.' },
    ],
  },

  story: {
    eyebrow: 'Our story',
    titlePre: 'Two head chefs,',
    titleMid: 'two ',
    titleItal: 'Tuscan agriturismi.',
    body1: 'We’re Endri and Marsel, friends and longtime colleagues, and the head chefs of two agriturismi in the hills just outside Florence. Between wedding feasts for two hundred, live pasta shows, and long farmhouse lunches for our guests, we’ve rolled more pasta by hand than we could ever count.',
    body2: 'Endri spent six years as an artisan baker before joining Agriturismo Borgo Divino, where he has been head chef since 2024; Marsel runs the kitchen of a neighbouring estate. In June 2026 we opened a little kitchen of our own in the Oltrarno and brought the farmhouse table to Florence, for anyone who wants to get their hands floury with us, in person or live online.',
    stats: [
      { n: '2026', l: 'newly opened in Florence' },
      { n: '2', l: 'agriturismo head chefs' },
      { n: '8', l: 'guests at the table, max' },
    ],
  },

  faq: {
    eyebrow: 'Good to know',
    titlePre: 'Questions,',
    titleItal: 'answered.',
    items: [
      { q: 'Who teaches the classes?', a: 'Endri and Marsel, two friends and the head chefs of two agriturismi in the hills outside Florence. Pasta for weddings, feasts and live shows is our day job; classes run in English or Italian.' },
      { q: 'Where are the classes held?', a: 'In our kitchen in the Oltrarno, near Piazza Santo Spirito in the heart of Florence. We send the full address when you book.' },
      { q: 'How long does a handmade pasta workshop take?', a: 'The Chef’s Table runs about 3 hours; Mercato & Mani (with the dawn market walk) runs about 5 hours. Every class ends with a sit-down lunch of what you made.' },
      { q: 'How many people are in each class?', a: "Small groups only. Never more than 8 at the table (max 6 for the market class), so there’s always a chef at your elbow to fix your fold." },
      { q: 'Do we eat the pasta we make?', a: 'Yes. Every class ends at the table with your fresh pasta, a Tuscan sauce, and a glass of local wine.' },
      { q: 'Are there private pasta cooking classes in Florence?', a: 'Yes. Companies and groups can book the whole kitchen for a private Family Long-Table class (6–14 people). We also offer partner rates and referral booking for hotels, agriturismi and tour operators.' },
      { q: 'How much does a pasta making class in Florence cost?', a: 'Our signature Chef’s Table class is €95 per person, and the Mercato & Mani class is €145. Private group classes start from €680.' },
      { q: 'Where can I find gluten-free handmade pasta in Florence?', a: 'Right here in our kitchen! We can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. Just tell us about any allergies when you book.' },
      { q: 'When do classes run?', a: 'Classes start at 10:00, 14:30 and 18:00 (Florence time), every day of the week.' },
      { q: 'How do I book and pay?', a: "Use the “Book a class” button to build your request. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest." },
    ],
  },

  exp: {
    eyebrow: 'Pasta making classes · Florence',
    titlePre: 'Pull up a chair',
    titleMid: 'at our ',
    titleItal: 'kitchen table.',
    intro: 'Every class is hands-in-the-flour from the first minute. Small groups, no demos to watch, and you eat the lunch you just rolled.',
    book: 'Book this',
    more: 'Full details',
    cards: [
      { tag: 'Signature', name: 'The Chef’s Table', desc: 'Three hours, four shapes, one long lunch. Roll pici, fold tortelli, then sit down to eat everything you made with a glass of Chianti.', price: '€95', meta: '3 hrs · max 8 guests · Oltrarno', alt: 'The Chef’s Table, hands-on pasta-making class in our Florence kitchen' },
      { tag: 'Market + cook', name: 'Mercato & Mani', desc: 'Shop Sant’Ambrogio market at dawn with Endri or Marsel, then turn the basket into ravioli, a ragù, and a seasonal dolce back in the kitchen.', price: '€145', meta: '5 hrs · max 6 guests · market walk', alt: 'Mercato & Mani, market tour and pasta class in Florence' },
      { tag: 'Private', name: 'The Family Long-Table', desc: "Book the whole kitchen for birthdays, proposals, reunions. The long-table feast we’ve cooked at our agriturismi for years, now in the heart of Florence.", price: 'from €680', meta: 'flexible · 6–14 guests · evenings', alt: 'The Family Long-Table, private group pasta experience in Florence' },
    ],
  },

  gallery: {
    eyebrow: 'A shape for every story',
    titlePre: 'Meet the ',
    hint: 'Drag, swipe, or use the arrows. Tap any shape to hear where it comes from.',
    more: 'Tap for its story',
    taughtIn: 'Taught in',
    book: 'Book this class →',
    back: 'back to shape',
    allShapes: 'All pasta shapes, explained',
    shapes: [
      { name: 'Pappardelle', region: 'Florence · Tuscany', alt: 'Broad ribbons of fresh egg pappardelle, hand-cut and dusted with flour', blurb: 'Broad, velvety ribbons named from “pappare”, meaning to gobble up.', history: 'Born in the Tuscan countryside to cradle rich game ragùs of wild boar and hare. The width is the point: every strand carries a spoonful of sauce.', teaches: 'The Chef’s Table' },
      { name: 'Ravioli', region: 'All of Italy', alt: 'Rows of freshly made square ravioli with hand-pinched edges on a floured board', blurb: 'Little parcels, pinched shut around ricotta, spinach or squash.', history: "Mentioned in a 14th-century merchant’s letters from Tuscany, ravioli were a way to stretch precious cheese. Sealing them well is a craft: air is the enemy.", teaches: 'Mercato & Mani' },
      { name: 'Pici', region: 'Siena · Val d’Orcia', alt: 'Thick, irregular strands of hand-rolled pici pasta on a wooden board', blurb: "Fat, hand-rolled strands, like spaghetti’s rustic cousin.", history: 'A poor man’s pasta of just flour and water, rolled by hand on wooden boards. No two are identical, and that irregularity is exactly why sauce clings to them.', teaches: 'The Chef’s Table' },
      { name: 'Tortelli', region: 'Mugello', alt: 'Plump potato-filled tortelli pasta parcels, sealed by hand and laid out in rows', blurb: 'Plump potato-filled pillows from the hills north of Florence.', history: 'The Mugello’s answer to a cold evening: potato, parmigiano and nutmeg sealed in pasta, dressed simply in butter and sage or a meat ragù.', teaches: 'The Family Long-Table' },
      { name: 'Tagliatelle', region: 'Emilia & Tuscany', alt: 'Loose nests of golden egg tagliatelle, rolled thin and cut by hand', blurb: 'The classic egg ribbon, cut to a precise finger’s width.', history: 'Legend ties its golden ribbons to Renaissance hair; the truth is humbler. Rolled thin, folded, and cut by hand. The first shape every nonna teaches.', teaches: 'Live Online · Fresh Egg Pasta' },
    ],
  },

  b2b: {
    eyebrow: 'For businesses',
    titlePre: 'Work ',
    titleItal: 'with us.',
    intro: 'We partner with hotels, tour operators and companies to bring the farmhouse table to their guests and teams, in our Oltrarno kitchen or live online.',
    ctaText: 'Tell us about your guests, group or team. We reply within one working day.',
    ctaLabel: 'Start a partnership',
    ctaMailto: 'mailto:ciao@handmadepastaflorence.com?subject=Business%20partnership%20enquiry',
    offers: [
      { t: 'Hotels, B&Bs & agriturismi', d: 'Give your guests a pasta class to remember. Partner rates, easy referral booking, and classes in English or Italian. Five minutes from the Ponte Vecchio.', points: ['Partner & referral rates', 'Priority booking for your guests', 'Co-branded gift vouchers'], hrefLabel: '' },
      { t: 'Corporate team building', d: 'Aprons on, laptops away. A private hands-on class where your team rolls, folds, laughs and then sits down to a long lunch it made itself.', points: ['Private kitchen buyout, 6–14 people', 'English-speaking chefs', 'Wine pairing & dietary options'], hrefLabel: 'Team building details' },
      { t: 'Tour operators & travel planners', d: 'A reliable, small-group food experience for your Florence itineraries. Fixed time slots, fast confirmation, and two head chefs who host every class themselves.', points: ['Fixed schedule, fast confirmation', 'Group & series pricing', 'Market-walk add-on available'], hrefLabel: '' },
    ],
  },

  reviews: {
    eyebrow: 'Kind words',
    titlePre: 'Straight from',
    titleMid: 'our ',
    titleItal: 'guests.',
  },

  blogIndex: {
    eyebrow: 'Guides & stories',
    h1: 'From the flour-dusted ',
    h1Ital: 'notebook.',
    lede: 'What we know about pasta, Florence and eating well here, written between classes by the two chefs who teach them.',
    readGuide: 'Read the guide',
  },

  blogPost: {
    homeCrumb: 'Home',
    guidesCrumb: 'Guides',
    by: 'By',
    faqTitle: 'Frequently asked',
    bioIs: 'is head chef at Agriturismo Borgo Divino (Montespertoli) and co-founder of Handmade Pasta Florence, where he teaches',
    bioLink: 'small-group pasta making classes',
    bioEnd: 'in the Oltrarno.',
    ctaH2: 'Rather learn it with your hands?',
    ctaP: 'Roll, fold and eat it yourself: in our Florence kitchen or live online.',
    ctaBtn: 'Book a class',
    ctaLink: 'See the classes',
  },

  // BookingDrawer — server-rendered markup labels.
  bk: {
    ariaLabel: 'Book a pasta class',
    step1Label: 'Experience',
    step2Label: 'When & who',
    step3Label: 'Customize',
    step1Kicker: 'Step 1',
    step1H: 'Choose your experience',
    florenceT: 'In-Person · Florence',
    florenceD: 'Three hands-on hours in our Oltrarno kitchen, ending in a long lunch.',
    onlineT: 'Live Online',
    onlineD: 'Cook live from anywhere with a kit shipped to your door.',
    person: 'person',
    guestsQ: 'How many guests?',
    step2Kicker: 'Step 2',
    step2H: 'Date, time & guests',
    availableTimes: 'Available times',
    florence: 'Florence',
    yourTime: 'Your time',
    step3Kicker: 'Step 3',
    step3H: 'Make it yours',
    step3Sub: 'Optional. Everything here is add-on only.',
    kitT: 'Ship me the ingredient kit',
    kitD: '00 flour, semola, rolling pin & recipe cards, chilled to your door.',
    wineT: 'Ship me the wine too',
    wineD: 'A bottle of Tuscan wine with your kit, chosen to match what you’ll cook. (In Florence, two pours are already included.)',
    gfT: 'Gluten-free preference',
    gfD: 'We’ll prep a dedicated GF flour blend and a clean station. No charge.',
    free: 'Free',
    orderSummary: 'Order summary',
    total: 'Total',
    back: 'Back',
    continue: 'Continue',
  },

  // BookingDrawer — strings used by the client-side script. Emitted for every
  // locale as a JSON payload the script indexes by the live document lang.
  bkJs: {
    continue: 'Continue',
    send: 'Send request',
    perPerson: 'per person',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    sendClassFlorence: 'In-Person, Florence',
    sendClassOnline: 'Live Online',
    classLabel: 'Class',
    guestsLabel: 'Guests',
    dateTime: 'Date & time',
    addonLabels: { kit: 'Ingredient kit', wine: 'Wine pairing', gf: 'Gluten-free' },
    freeLower: 'free',
    addonsLabel: 'Add-ons',
    estTotal: 'Estimated total',
    msgIntro: 'Hi, I would like to book the "{class}" pasta class for {guests}.',
    msgOutro: 'Thank you!',
    freeCap: 'Free',
    sumClassFlorence: 'In Florence',
    sumClassOnline: 'Live Online',
    guest: 'guest',
    guestsPlural: 'guests',
  },
};

export default en;
