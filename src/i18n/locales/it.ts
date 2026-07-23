// Italian. Must satisfy the English dictionary's shape (Dict) — the compiler
// flags any missing or misnamed key against ./en.ts. Values use backticks so
// Italian apostrophes/quotes need no escaping.
import type { Dict } from '../types';

const it: Dict = {
  meta: {
    homeTitle: `Handmade Pasta Florence — Corsi di Cucina e Pasta Fresca in Oltrarno`,
    homeDescription: `Corsi pratici di pasta fresca a Firenze con due chef toscani di agriturismo. Max 8 ospiti nella nostra cucina in Oltrarno da €95, tour del mercato e opzioni private, o in diretta online con kit ingredienti da €68.`,
    blogTitle: `Guide alla Pasta & al Cibo di Firenze | Handmade Pasta Florence`,
    blogDescription: `Guide alla pasta fresca e a mangiare bene a Firenze, scritte da due chef toscani — formati di pasta, dove mangiare, consigli senza glutine e il quartiere dell'Oltrarno.`,
  },

  nav: {
    classes: `Corsi`,
    pasta: `Tipi di Pasta`,
    story: `La Nostra Storia`,
    business: `Per le Aziende`,
    guides: `Guide`,
    book: `Prenota un corso`,
  },

  footer: {
    headline: `Vieni a sporcarti le mani<br /><span class="ital">di farina.</span>`,
    book: `Prenota il tuo corso`,
    hours: `Mar–Dom · corsi 10:00, 14:30 & 18:00 · lunedì chiusi`,
    desc: `Due chef di agriturismo, cucinano con te di persona e online nel cuore di Firenze.`,
    by: `Di`,
    classes: `Corsi`,
    visit: `Visita`,
    pastaClass: `Corso di Pasta a Firenze`,
    marketTour: `Tour del Mercato & Cucina`,
    private: `Eventi Privati`,
    online: `In diretta Online`,
    team: `Team Building`,
    gift: `Regala un corso`,
    guides: `Guide & Storie`,
    faq: `FAQ & Allergeni`,
    made: `Fatto a mano 🤌 a Firenze`,
  },

  lp: {
    home: `Home`,
    faqPre: `Buono a `,
    faqItal: `sapersi.`,
    relPre: `Cerchi qualcos'`,
    relItal: `altro?`,
  },

  lang: {
    switch: `Lingua`,
  },

  hero: {
    eyebrow: `Firenze · appena aperto · due chef, un grande tavolo`,
    titleL1: `Farina, uova,`,
    titleL2: `e le tue`,
    titleItal: `mani.`,
    lede: `Prepara la vera pasta toscana insieme a due chef di agriturismo, nella nostra cucina soleggiata in Oltrarno o in diretta online con un kit spedito a casa tua.`,
    ctaReserve: `Prenota il tuo tavolo`,
    ctaSee: `Vedi i corsi`,
    proofOpened: `cucina appena aperta`,
    proofHands: `pratica, poi mangi tutto`,
    proofTable: `a tavola, mai di più`,
  },

  fab: {
    eyebrow: `A Firenze & online`,
    when: `Corsi di pasta in piccoli gruppi`,
    book: `Prenota ora`,
  },

  scrollTop: {
    label: `Torna su`,
  },

  whatsapp: {
    label: `Chatta con noi`,
    text: `Ciao,%20vorrei%20prenotare%20un%20corso%20di%20pasta%20a%20Firenze`,
  },

  online: {
    live: `In diretta`,
    eyebrow: `Non puoi venire a Firenze?`,
    titlePre: `Cucina con noi `,
    titleItal: `in diretta online.`,
    desc: `Stessi chef, stessa cucina. Un corso di pasta fresca in diretta online con un kit di ingredienti spedito a casa tua. Una splendida opzione (o regalo) se l'Italia non è ancora in programma.`,
    cta: `Partecipa a un corso online`,
    from: `da`,
    person: `persona`,
    more: `Dettagli completi`,
  },

  why: {
    srHeading: `Perché cucinare con noi`,
    points: [
      { t: `Impara facendo`, d: `Nessuna dimostrazione a distanza. Fin dal primo minuto le tue mani sono nella farina, per modellare ogni pezzo da solo.` },
      { t: `Mangia ciò che prepari`, d: `Ogni lezione finisce a tavola con la tua pasta fresca, un sugo toscano e un bicchiere di vino locale.` },
      { t: `Solo piccoli gruppi`, d: `Mai più di otto al tavolo, quindi c'è sempre uno chef al tuo fianco per sistemare la tua piega.` },
      { t: `Dalla fattoria a Firenze`, d: `Gestiamo cucine di agriturismo sulle colline fuori città. Questa è la pasta che cuciniamo per i nostri ospiti ogni singolo giorno.` },
    ],
  },

  story: {
    eyebrow: `La nostra storia`,
    titlePre: `Due chef,`,
    titleMid: `due `,
    titleItal: `agriturismi toscani.`,
    body1: `Siamo Endri e Marsel, amici e colleghi da tempo, e chef di due agriturismi sulle colline appena fuori Firenze. Tra banchetti nuziali per duecento persone, spettacoli dal vivo sulla pasta e lunghi pranzi contadini per i nostri ospiti, abbiamo steso a mano più pasta di quanta potremmo mai contare.`,
    body2: `Endri ha lavorato per sei anni come panettiere artigianale prima di prendere in gestione la cucina dell'Agriturismo Borgo Divino nel 2021; Marsel gestisce la cucina di una tenuta vicina. A giugno 2026 abbiamo aperto una piccola cucina tutta nostra in Oltrarno e abbiamo portato il tavolo di fattoria a Firenze, per chiunque voglia sporcarsi le mani di farina con noi, di persona o in diretta online.`,
    stats: [
      { n: `2026`, l: `appena aperto a Firenze` },
      { n: `2`, l: `chef di agriturismo` },
      { n: `8`, l: `ospiti a tavola, max` },
    ],
  },

  faq: {
    eyebrow: `Buono a sapersi`,
    titlePre: `Domande,`,
    titleItal: `risposte.`,
    items: [
      { q: `Chi insegna nei corsi?`, a: `Endri e Marsel, due amici e chef di due agriturismi sulle colline appena fuori Firenze. La pasta per matrimoni, feste ed eventi dal vivo è il nostro lavoro quotidiano; i corsi si tengono in inglese o in italiano.` },
      { q: `Dove si tengono i corsi?`, a: `Nella nostra cucina in Oltrarno, vicino a Piazza Santo Spirito nel cuore di Firenze. Inviamo l'indirizzo completo al momento della prenotazione.` },
      { q: `Quanto dura un corso?`, a: `Il Tavolo dello Chef dura circa 3 ore; Mercato & Mani (con il giro al mercato all'alba) dura circa 5 ore. Ogni corso si conclude con un pranzo al tavolo con ciò che hai preparato.` },
      { q: `Quante persone ci sono in ogni corso?`, a: `Solo piccoli gruppi. Mai più di 8 a tavola (max 6 per il corso al mercato), quindi c'è sempre uno chef al tuo fianco per correggere la tua piega.` },
      { q: `Mangiamo la pasta che prepariamo?`, a: `Sì. Ogni lezione finisce a tavola con la tua pasta fresca, un sugo toscano e un bicchiere di vino locale.` },
      { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì, possiamo preparare una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. Basta segnalarci eventuali allergie al momento della prenotazione.` },
      { q: `Non posso venire a Firenze. Posso comunque fare un corso?`, a: `Assolutamente sì. I nostri corsi online in diretta vengono trasmessi dalla stessa cucina, con un kit di ingredienti per la pasta fresca spedito a casa tua, a partire da €68 a persona.` },
      { q: `Ospitate team building aziendali o lavorate con hotel e tour operator?`, a: `Sì. Le aziende possono prenotare l'intera cucina per un corso di team building privato (6-14 persone), e offriamo tariffe partner e prenotazioni su segnalazione per hotel, agriturismi e tour operator. Invia un'email a ciao@handmadepastaflorence.com con oggetto "Partnership commerciale" e ti risponderemo entro un giorno lavorativo.` },
      { q: `Quando si svolgono i corsi?`, a: `I corsi iniziano alle 10:00, 14:30 e 18:00 (ora di Firenze). Siamo chiusi il lunedì.` },
      { q: `Come faccio a prenotare e pagare?`, a: `Usa il pulsante "Prenota un corso" per creare la tua richiesta. Si aprirà una chat di WhatsApp con i dettagli precompilati, ti confermeremo la disponibilità e ti guideremo per il resto.` },
    ],
  },

  exp: {
    eyebrow: `Corsi di pasta fresca · Firenze`,
    titlePre: `Accomodati al nostro`,
    titleMid: `tavolo in `,
    titleItal: `cucina.`,
    intro: `Ogni classe è con le mani in pasta dal primo minuto. Piccoli gruppi, nessuna dimostrazione da guardare, e mangi il pranzo che hai appena preparato.`,
    book: `Prenota ora`,
    more: `Dettagli completi`,
    cards: [
      { tag: `Firma`, name: `Il Tavolo dello Chef`, desc: `Tre ore, quattro formati, un lungo pranzo. Tira i pici, chiudi i tortelli, poi siediti a mangiare tutto ciò che hai preparato con un bicchiere di Chianti.`, price: `€95`, meta: `3 ore · max 8 ospiti · Oltrarno`, alt: `Il Tavolo dello Chef — corso pratico di pasta fresca nella nostra cucina a Firenze` },
      { tag: `Mercato + cucina`, name: `Mercato & Mani`, desc: `Fai la spesa al mercato di Sant’Ambrogio all’alba con Endri o Marsel, poi trasforma il cesto in ravioli, ragù e un dolce di stagione tornando in cucina.`, price: `€145`, meta: `5 ore · max 6 ospiti · giro al mercato`, alt: `Mercato & Mani — tour del mercato e corso di pasta a Firenze` },
      { tag: `Privato`, name: `Il Lungo Tavolo di Famiglia`, desc: `Prenota l'intera cucina per compleanni, proposte, ritrovi. Il banchetto al lungo tavolo che abbiamo cucinato nei nostri agriturismi per anni, ora nel cuore di Firenze.`, price: `da €680`, meta: `flessibile · 6–14 ospiti · serate`, alt: `Il Lungo Tavolo di Famiglia — esperienza di pasta per gruppi privati a Firenze` },
    ],
  },

  gallery: {
    eyebrow: `Un formato per ogni storia`,
    titlePre: `Incontra la `,
    hint: `Trascina, scorri o usa le frecce. Tocca qualsiasi formato per scoprire da dove proviene.`,
    more: `Tocca per la sua storia`,
    taughtIn: `Insegnato in`,
    book: `Prenota questo corso →`,
    back: `torna al formato`,
    shapes: [
      { name: `Pappardelle`, region: `Firenze · Toscana`, alt: `Larghi nastri di pappardelle fresche all'uovo, tagliate a mano e spolverate di farina`, blurb: `Nastri larghi e vellutati che prendono il nome da "pappare".`, history: `Nate nella campagna toscana per accogliere ricchi ragù di cinghiale e lepre. La larghezza è essenziale: ogni filo trasporta un cucchiaio di sugo.`, teaches: `Il Tavolo dello Chef` },
      { name: `Ravioli`, region: `Tutta Italia`, alt: `File di ravioli quadrati appena fatti, con i bordi pizzicati a mano, su una tavola infarinata`, blurb: `Piccoli fagottini, chiusi pizzicando la pasta attorno a ricotta, spinaci o zucca.`, history: `Menzionati nelle lettere di un mercante toscano del XIV secolo, i ravioli erano un modo per far durare il formaggio prezioso. Sigillarli bene è un'arte: l'aria è il nemico.`, teaches: `Mercato & Mani` },
      { name: `Pici`, region: `Siena · Val d’Orcia`, alt: `Grossi fili irregolari di pici stesi a mano su una tavola di legno`, blurb: `Fili grossi e stesi a mano, come i rustici cugini degli spaghetti.`, history: `Una pasta povera di sola acqua e farina, stesa a mano su tavole di legno. Non ce ne sono due identici, e quell'irregolarità è esattamente il motivo per cui il sugo vi si aggrappa.`, teaches: `Il Tavolo dello Chef` },
      { name: `Tortelli`, region: `Mugello`, alt: `Paffuti tortelli ripieni di patate, sigillati a mano e disposti in file`, blurb: `Paffuti cuscini ripieni di patate dalle colline a nord di Firenze.`, history: `La risposta del Mugello a una serata fredda: patate, parmigiano e noce moscata sigillati nella pasta, conditi semplicemente con burro e salvia o un ragù di carne.`, teaches: `Il Lungo Tavolo di Famiglia` },
      { name: `Tagliatelle`, region: `Emilia & Toscana`, alt: `Morbidi nidi di tagliatelle dorate all'uovo, stese sottili e tagliate a mano`, blurb: `Il classico nastro all'uovo, tagliato alla larghezza precisa di un dito.`, history: `La leggenda lega questi nastri dorati ai capelli del Rinascimento; la verità è più umile. Stese sottili, piegate e tagliate a mano. Il primo formato che ogni nonna insegna.`, teaches: `In diretta online · Pasta Fresca all'Uovo` },
    ],
  },

  b2b: {
    eyebrow: `Per le aziende`,
    titlePre: `Lavora `,
    titleItal: `con noi.`,
    intro: `Collaboriamo con hotel, tour operator e aziende per portare la tavola della fattoria ai loro ospiti e team, nella nostra cucina in Oltrarno o in diretta online.`,
    ctaText: `Parlaci dei tuoi ospiti, gruppo o team. Rispondiamo entro un giorno lavorativo.`,
    ctaLabel: `Inizia una collaborazione`,
    ctaMailto: `mailto:ciao@handmadepastaflorence.com?subject=Richiesta%20partnership%20commerciale`,
    offers: [
      { t: `Hotel, B&B e agriturismi`, d: `Regala ai tuoi ospiti un corso di pasta da ricordare. Tariffe partner, facile prenotazione per segnalazione e lezioni in inglese o italiano. A cinque minuti dal Ponte Vecchio.`, points: [`Tariffe partner e commissioni`, `Prenotazione prioritaria per gli ospiti`, `Voucher regalo co-branded`], hrefLabel: `` },
      { t: `Team building aziendale`, d: `Grembiuli addosso, via i computer. Un corso pratico privato in cui il tuo team impasta, piega, ride e poi si siede per un lungo pranzo preparato con le proprie mani.`, points: [`Uso esclusivo della cucina, 6-14 persone`, `Chef che parlano inglese e italiano`, `Abbinamento vini e opzioni dietetiche`], hrefLabel: `Dettagli team building` },
      { t: `Tour operator e travel planner`, d: `Un'esperienza gastronomica affidabile per piccoli gruppi nei tuoi itinerari fiorentini. Orari fissi, conferma rapida e due chef che conducono personalmente ogni corso.`, points: [`Orari fissi, conferma veloce`, `Tariffe per gruppi e serie`, `Aggiunta tour al mercato disponibile`], hrefLabel: `` },
    ],
  },

  reviews: {
    eyebrow: `Parole gentili`,
    titlePre: `Direttamente dai`,
    titleMid: `nostri `,
    titleItal: `ospiti.`,
  },

  blogIndex: {
    eyebrow: `Guide & storie`,
    h1: `Dal taccuino `,
    h1Ital: `infarinato.`,
    lede: `Quello che sappiamo sulla pasta, su Firenze e su come mangiare bene qui — scritto tra un corso e l'altro dai due chef che li tengono.`,
    readGuide: `Leggi la guida`,
  },

  blogPost: {
    homeCrumb: `Home`,
    guidesCrumb: `Guide`,
    by: `Di`,
    faqTitle: `Domande frequenti`,
    bioIs: `è capo chef all'Agriturismo Borgo Divino (Montespertoli) e co-fondatore di Handmade Pasta Florence, dove insegna`,
    bioLink: `corsi di pasta fresca per piccoli gruppi`,
    bioEnd: `in Oltrarno.`,
    ctaH2: `Preferisci impararlo con le tue mani?`,
    ctaP: `Stendi, piega e mangia tu stesso — nella nostra cucina a Firenze o in diretta online.`,
    ctaBtn: `Prenota un corso`,
    ctaLink: `Scopri i corsi`,
  },

  bk: {
    ariaLabel: `Prenota un corso di pasta`,
    step1Label: `Esperienza`,
    step2Label: `Data e ora`,
    step3Label: `Personalizza`,
    step1Kicker: `Passo 1`,
    step1H: `Scegli la tua esperienza`,
    florenceT: `In presenza · Firenze`,
    florenceD: `Tre ore pratiche nella nostra cucina in Oltrarno, che terminano in un lungo pranzo.`,
    onlineT: `In diretta online`,
    onlineD: `Cucina in diretta da ovunque con un kit spedito a casa tua.`,
    person: `persona`,
    guestsQ: `Quanti ospiti?`,
    step2Kicker: `Passo 2`,
    step2H: `Scegli data e ora`,
    availableTimes: `Orari disponibili`,
    florence: `Firenze`,
    yourTime: `La tua ora`,
    step3Kicker: `Passo 3`,
    step3H: `Fallo tuo`,
    step3Sub: `Opzionale. Tutto qui è solo aggiuntivo.`,
    kitT: `Spediscimi il kit ingredienti`,
    kitD: `Farina 00, semola, mattarello e schede ricette, refrigerati a casa tua.`,
    wineT: `Aggiungi abbinamento vini`,
    wineD: `Due calici toscani scelti per il tuo menù (in presenza) o una bottiglia spedita (online).`,
    gfT: `Preferenza senza glutine`,
    gfD: `Prepareremo una miscela GF dedicata e una postazione pulita. Gratuito.`,
    free: `Gratis`,
    orderSummary: `Riepilogo ordine`,
    total: `Totale`,
    back: `Indietro`,
    continue: `Continua`,
  },

  bkJs: {
    continue: `Continua`,
    send: `Invia richiesta`,
    perPerson: `a persona`,
    months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    sendClassFlorence: `In presenza, Firenze`,
    sendClassOnline: `In diretta online`,
    classLabel: `Corso`,
    guestsLabel: `Ospiti`,
    dateTime: `Data e ora`,
    addonLabels: { kit: `Kit ingredienti`, wine: `Abbinamento vini`, gf: `Senza glutine` },
    freeLower: `gratis`,
    addonsLabel: `Aggiunte`,
    estTotal: `Totale stimato`,
    msgIntro: `Ciao, vorrei prenotare un corso di pasta.`,
    msgOutro: `Per favore, confermate la disponibilità. Grazie!`,
    freeCap: `Gratis`,
    sumClassFlorence: `A Firenze`,
    sumClassOnline: `In diretta online`,
    guest: `ospite`,
    guestsPlural: `ospiti`,
  },
};

export default it;
