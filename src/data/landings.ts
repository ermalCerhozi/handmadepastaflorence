// Content for every bookable-class landing page, keyed by a stable page key and
// then by locale. A single template (src/pages/[...slug].astro) renders these,
// so ADDING A LANGUAGE = adding a locale entry here — no new page files.
//
// Slugs are per-locale and SEO-translated (e.g. it: corso-pasta-fresca-firenze).
// String values use backticks so Italian apostrophes/quotes need no escaping.
import { defaultLocale, type Locale } from '../i18n/config';
import * as img from '../assets/images';

/** Keys into ClassLanding.astro's FACT_ICONS line-icon set. */
export type FactIcon =
  | 'clock'
  | 'people'
  | 'calendar'
  | 'map-pin'
  | 'globe'
  | 'leaf'
  | 'chef-hat'
  | 'home'
  | 'laptop'
  | 'package'
  | 'table'
  | 'gift'
  | 'tag'
  | 'mail';

interface LandingContent {
  eyebrow: string;
  heading: string;
  headingItal: string;
  lede: string;
  /** src is a build-time-imported ImageMetadata (see src/assets/images/index.ts), not a URL string. */
  image: { src: ImageMetadata; alt: string; w: number; h: number };
  price: string;
  priceNote?: string;
  facts: { label: string; value: string; icon?: FactIcon }[];
  sections: { title: string; paras: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  related: { title: string; href: string; desc: string }[];
  ctaLabel: string;
  prefill?: 'florence' | 'online';
  emailSubject?: string;
  breadcrumbName: string;
  /** When set, inserts a "Pasta" crumb (linking to the pasta-shapes hub) between Home and breadcrumbName. */
  showPastaCrumb?: boolean;
  product?: { name: string; description: string; price: string };
  service?: { name: string; description: string };
}

interface LandingLocale {
  slug: string;
  title: string;
  description: string;
  cl: LandingContent;
}

export interface LandingPage {
  /** FloatingCTA is shown on booking pages but not the email-CTA team page. */
  floatingCta: boolean;
  /**
   * Set only on genuinely distinct taught experiences (not the gluten-free/
   * for-two/gift marketing variants, which sell the same underlying class —
   * giving those their own Course entry would be near-duplicate structured
   * data for the same offering). Drives a Course JSON-LD block in
   * ClassLanding.astro, derived from each locale's existing `product` field.
   */
  courseMode?: 'Onsite' | 'Online';
  /**
   * ISO 8601 duration for the Course JSON-LD's CourseInstance, only set where
   * the copy states a fixed length (the "Length" fact below) — left
   * undefined for pages like `private`/`online` that are explicitly flexible
   * rather than inventing a number that isn't in the copy.
   */
  courseDuration?: string;
  locales: Partial<Record<Locale, LandingLocale>>;
}

/** URL for a landing page in a given locale (used by nav/footer links). */
export function landingPath(pageKey: string, locale: Locale): string {
  const entry = landings[pageKey]?.locales[locale] ?? landings[pageKey]?.locales[defaultLocale];
  if (!entry) return '/';
  const loc = landings[pageKey]?.locales[locale] ? locale : defaultLocale;
  return `${loc === defaultLocale ? '' : '/' + loc}/${entry.slug}/`;
}

export const landings: Record<string, LandingPage> = {
  'pasta-making': {
    floatingCta: true,
    courseMode: 'Onsite',
    courseDuration: 'PT3H',
    locales: {
      en: {
        slug: 'pasta-making-class-florence',
        title: `Pasta Making Class in Florence: 4 Shapes + Wine Included (€95) | Handmade Pasta Florence`,
        description: `A 3-hour hands-on pasta making class in Florence’s Oltrarno. Roll four classic shapes with two Tuscan agriturismo head chefs, then sit down to eat what you made with two Tuscan wines included. Max 8 guests, €95 per person.`,
        cl: {
          eyebrow: `The Chef’s Table · Oltrarno, Florence`,
          heading: `A pasta making class in Florence,`,
          headingItal: `around one table.`,
          lede: `Three hands-on hours in our Oltrarno kitchen. You’ll mix, knead, roll and fold four classic pasta shapes with a chef at your elbow, then sit down together to eat everything you made, with a Tuscan sauce and two Tuscan wines, included in the price.`,
          image: { src: img.cookingClassGuests, alt: `Guests rolling fresh pasta at The Chef’s Table class in our Florence kitchen`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `per person · two wines included`,
          facts: [
            { label: `Local Products`, value: `Seasonal Tuscan produce`, icon: 'leaf' },
            { label: `Length`, value: `about 3 hours`, icon: 'clock' },
            { label: `Group size`, value: `max 8 guests`, icon: 'people' },
            { label: `Starts`, value: `10:00 · 14:30 · 18:00`, icon: 'calendar' },
            { label: `Days`, value: `Every day, incl. Mondays`, icon: 'calendar' },
            { label: `Where`, value: `Oltrarno, near Santo Spirito`, icon: 'map-pin' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
          ],
          sections: [
            {
              title: `What will you actually do in the class?`,
              paras: [
                `This is a hands-in-the-flour class from the first minute, no demos to watch from a stool. You’ll make your own dough, learn to feel when it’s ready, and work it into four classic shapes: hand-rolled pici, ribbon-cut tagliatelle and pappardelle, and filled tortelli, following the season.`,
                `You’ll also make the sauces that belong with them: a slow <strong>ragù</strong>, <strong>burro e salvia</strong> foamed with sage, fresh <strong>pomodorini</strong>, or <strong>pesto</strong> pounded by hand, depending on the day and the season.`,
                `Most Florence classes call twelve people a small group. Ours never seats more than eight, which is the whole reason a chef is at your elbow when a fold goes wrong instead of demonstrating at the front of the room. When the pasta is done we cook it together and sit down to a proper Tuscan lunch: what you just made, your sauce, and two Tuscan wines included in the price.`,
              ],
            },
            {
              title: `Who’s teaching`,
              paras: [
                `Your hosts are <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> and Marsel, two lifelong friends who are the head chefs of two agriturismi in the hills outside Florence. Pasta for weddings, feasts and live shows is their day job; this kitchen is where they teach it. You can read more <a href="/#story">in our story</a>.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Gluten-free? We prepare a dedicated flour blend and a clean station at no extra charge; just tell us when you book.`,
                `Two Tuscan pours are included in the €95: a white with the table, a red with the ragù. No upsell at the end.`,
                `We email you the recipes for everything you made, so the dough you learned by feel is still there next month.`,
                `Whatever you don’t eat, you take with you: we dry it, bag it, and it goes back to the hotel with you.`,
                `The kitchen is in the Oltrarno, near Piazza Santo Spirito; we send the exact address when you book.`,
                `Want the same class with a dawn market walk first? That’s <a href="/market-tour-cooking-class-florence/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `How booking works`,
              paras: [
                `Hit “Book this class” and pick your date, time and guests; it opens a WhatsApp chat with everything filled in, and we confirm availability personally. No account, no forms. You can also write to us at ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Is this class suitable for complete beginners?`, a: `Yes. Everything is taught from zero (dough, rolling, shaping), and with never more than 8 guests there’s always a chef at your elbow. Most guests have never made fresh pasta before.` },
            { q: `Do we eat the pasta we make?`, a: `Yes. Every class ends at the table with your fresh pasta, a Tuscan sauce, and a glass of local wine.` },
            { q: `Which pasta shapes will we make?`, a: `Four classic shapes per class: typically hand-rolled pici, tagliatelle, pappardelle and filled tortelli, following the season.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes: we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. Just tell us about any allergies when you book.` },
            { q: `How do I book and pay?`, a: `Use the “Book this class” button to build your request. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
            { q: `How much does a pasta making class in Florence cost overall?`, a: `The Chef’s Table is €95 per person. If you’re weighing it against the market tour, private buyout or online option, see our <a href="/blog/how-much-does-a-pasta-making-class-in-florence-cost/">full price breakdown</a> for all four.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Shop Sant’Ambrogio market at dawn, then cook the basket. 5 hours, max 6 guests, €145.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen, privately yours. Birthdays, proposals, reunions, from €680.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Cook with us from anywhere, live from this same kitchen, from €68.` },
            { title: `The four shapes, explained`, href: `/pasta-shapes/`, desc: `Pici, pappardelle, tagliatelle, tortelli: what each one is and the sauce it was built for.` },
          ],
          ctaLabel: `Book this class`,
          prefill: 'florence',
          breadcrumbName: `Pasta Making Class in Florence`,
          showPastaCrumb: true,
          product: {
            name: `The Chef’s Table: Pasta Making Class in Florence`,
            description: `A 3-hour hands-on pasta making class in Florence’s Oltrarno: four classic shapes, max 8 guests, ending in a sit-down Tuscan lunch with two wines included. Taught by two agriturismo head chefs.`,
            price: '95',
          },
        },
      },
      it: {
        slug: 'corso-pasta-fresca-firenze',
        title: `Corso di Pasta Fresca a Firenze: 4 Formati + Vino Incluso (€95) | Handmade Pasta Florence`,
        description: `Un corso pratico di pasta fresca di 3 ore in Oltrarno a Firenze. Prepara quattro formati classici con due chef toscani, poi siediti a mangiare ciò che hai fatto con due calici toscani inclusi. Max 8 ospiti, €95 a persona.`,
        cl: {
          eyebrow: `Il Tavolo dello Chef · Oltrarno, Firenze`,
          heading: `Un corso di pasta a Firenze,`,
          headingItal: `attorno a un tavolo.`,
          lede: `Tre ore pratiche nella nostra cucina in Oltrarno. Mescolerai, impasterai, stenderai e piegherai quattro formati classici di pasta con uno chef al tuo fianco, per poi sederti insieme agli altri a mangiare tutto ciò che hai preparato, con un sugo toscano e due calici toscani, inclusi nel prezzo.`,
          image: { src: img.cookingClassGuests, alt: `Ospiti che stendono la pasta fresca al corso Il Tavolo dello Chef nella nostra cucina fiorentina`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `a persona · due calici inclusi`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani di stagione`, icon: 'leaf' },
            { label: `Durata`, value: `circa 3 ore`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max 8 ospiti`, icon: 'people' },
            { label: `Inizio`, value: `10:00 · 14:30 · 18:00`, icon: 'calendar' },
            { label: `Giorni`, value: `Tutti i giorni, lunedì compreso`, icon: 'calendar' },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'map-pin' },
            { label: `Lingua`, value: `Inglese o Italiano`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Cosa farai effettivamente durante il corso?`,
              paras: [
                `Questo è un corso con "le mani in pasta" dal primo minuto, nessuna dimostrazione da guardare su uno sgabello. Preparerai il tuo impasto, imparerai a sentire quando è pronto e lo lavorerai in quattro formati classici: pici fatti a mano, tagliatelle e pappardelle tagliate a nastro, e tortelli ripieni, seguendo la stagione.`,
                `Preparerai anche i sughi che gli appartengono: un <strong>ragù</strong> lento, <strong>burro e salvia</strong> schiumato con le foglie, <strong>pomodorini</strong> freschi o <strong>pesto</strong> pestato a mano, secondo il giorno e la stagione.`,
                `A Firenze quasi tutti i corsi chiamano «piccolo gruppo» dodici persone. Il nostro non supera mai gli otto, ed è esattamente per questo che quando una piega non viene hai uno chef al fianco e non una dimostrazione in fondo alla stanza. Quando la pasta è finita la cuciniamo insieme e ci sediamo per un vero pranzo toscano: ciò che hai appena preparato, il tuo sugo e due calici toscani inclusi nel prezzo.`,
              ],
            },
            {
              title: `Chi insegna`,
              paras: [
                `I tuoi ospiti sono <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> e Marsel, due amici di una vita che sono i capi chef di due agriturismi sulle colline di Firenze. La pasta per matrimoni, feste e spettacoli dal vivo è il loro lavoro quotidiano; questa cucina è dove la insegnano. Puoi leggere di più <a href="/it/#story">nella nostra storia</a>.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Senza glutine? Prepariamo una miscela dedicata e una postazione pulita senza costi aggiuntivi; diccelo quando prenoti.`,
                `Due calici toscani sono inclusi nei €95: un bianco a tavola, un rosso con il ragù. Nessun supplemento a fine corso.`,
                `Ti mandiamo per email le ricette di tutto quello che hai preparato, così l'impasto che hai imparato a sentire c'è ancora il mese prossimo.`,
                `Quello che non mangi te lo porti via: lo facciamo asciugare, lo insacchettiamo e torna in albergo con te.`,
                `La cucina è in Oltrarno, vicino a Piazza Santo Spirito; ti invieremo l'indirizzo esatto al momento della prenotazione.`,
                `Vuoi lo stesso corso ma con una passeggiata al mercato all'alba? Dai un'occhiata a <a href="/it/corso-cucina-tour-mercato-firenze/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Come funziona la prenotazione`,
              paras: [
                `Premi "Prenota questo corso" e scegli data, ora e numero di ospiti; si aprirà una chat WhatsApp con tutto già compilato e ti confermeremo personalmente la disponibilità. Nessun account, nessun modulo. Puoi anche scriverci a ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Questo corso è adatto a principianti assoluti?`, a: `Sì. Tutto viene insegnato da zero (impasto, stesura, formatura), e con non più di 8 ospiti c'è sempre uno chef al tuo fianco. La maggior parte degli ospiti non ha mai fatto la pasta fresca prima.` },
            { q: `Mangiamo la pasta che facciamo?`, a: `Sì. Ogni corso termina a tavola con la tua pasta fresca, un sugo toscano e un bicchiere di vino locale.` },
            { q: `Quali formati di pasta faremo?`, a: `Quattro formati classici per corso: in genere pici, tagliatelle, pappardelle e tortelli ripieni, seguendo la stagione.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì: possiamo preparare una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. Devi solo segnalarci eventuali allergie al momento della prenotazione.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota questo corso" per creare la tua richiesta. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Fai la spesa al mercato di Sant'Ambrogio all'alba, poi cucina il cesto. 5 ore, max 6 ospiti, €145.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina, privata per voi. Compleanni, proposte, ritrovi, da €680.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Cucina con noi da ovunque, in diretta da questa stessa cucina, da €68.` },
          ],
          ctaLabel: `Prenota questo corso`,
          prefill: 'florence',
          breadcrumbName: `Corso di Pasta Fresca a Firenze`,
          showPastaCrumb: true,
          product: {
            name: `Il Tavolo dello Chef: Corso di Pasta Fresca a Firenze`,
            description: `Un corso pratico di pasta fresca di 3 ore in Oltrarno a Firenze: quattro formati classici, max 8 ospiti, si conclude con un pranzo toscano seduti con vino. Tenuto da due chef di agriturismo.`,
            price: '95',
          },
        },
      },
      fr: {
        slug: 'cours-de-pates-fraiches-florence',
        title: `Cours de Pâtes Fraîches à Florence: 4 Formes + Vin Inclus (€95) | Handmade Pasta Florence`,
        description: `Un cours pratique de pâtes fraîches de 3 heures dans l'Oltrarno à Florence. Préparez quatre formes classiques avec deux chefs toscans, puis asseyez-vous pour déguster ce que vous avez préparé avec deux vins toscans inclus. Max 8 personnes, 95 € par personne.`,
        cl: {
          eyebrow: `La Table du Chef · Oltrarno, Florence`,
          heading: `Un cours de pâtes à Florence,`,
          headingItal: `autour d'une table.`,
          lede: `Trois heures de pratique dans notre cuisine de l'Oltrarno. Vous mélangerez, pétrirez, étalerez et plierez quatre formes classiques de pâtes avec un chef à vos côtés, puis vous vous assiérez ensemble pour manger tout ce que vous avez préparé, avec une sauce toscane et deux verres toscans, compris dans le prix.`,
          image: { src: img.cookingClassGuests, alt: `Des invités étalant des pâtes fraîches lors du cours La Table du Chef dans notre cuisine de Florence`, w: 800, h: 1067 },
          price: `95 €`,
          priceNote: `par personne · deux verres inclus`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans de saison`, icon: 'leaf' },
            { label: `Durée`, value: `environ 3 heures`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max 8 personnes`, icon: 'people' },
            { label: `Départ`, value: `10:00 · 14:30 · 18:00`, icon: 'calendar' },
            { label: `Jours`, value: `Tous les jours, lundi inclus`, icon: 'calendar' },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito`, icon: 'map-pin' },
            { label: `Langue`, value: `Anglais ou Italien`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Que ferez-vous concrètement pendant le cours ?`,
              paras: [
                `C'est un cours où vous mettez la main à la pâte dès la première minute, pas de démonstrations à regarder sur un tabouret. Vous préparerez votre propre pâte, apprendrez à sentir quand elle est prête, et la travaillerez en quatre formes classiques : pici roulés à la main, tagliatelles et pappardelles coupées en ruban, et tortelli farcis, selon la saison.`,
                `Vous préparerez aussi les sauces qui leur reviennent: un <strong>ragù</strong> mijoté, un <strong>burro e salvia</strong> mousseux à la sauge, des <strong>pomodorini</strong> frais ou un <strong>pesto</strong> pilé à la main, selon le jour et la saison.`,
                `À Florence, la plupart des cours appellent « petit groupe » douze personnes. Le nôtre ne dépasse jamais huit, et c'est précisément pour cela qu'un chef est à votre coude quand un pliage rate, au lieu de faire une démonstration au fond de la salle. Quand les pâtes sont prêtes, nous les cuisinons ensemble et nous asseyons pour un vrai déjeuner toscan: ce que vous venez de faire, votre sauce, et deux vins toscans compris dans le prix.`,
              ],
            },
            {
              title: `Qui enseigne`,
              paras: [
                `Vos hôtes sont <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> et Marsel, deux amis de toujours qui sont les chefs cuisiniers de deux agritourismes dans les collines autour de Florence. Les pâtes pour les mariages, les fêtes et les spectacles en direct sont leur travail quotidien ; cette cuisine est l'endroit où ils l'enseignent. Vous pouvez en lire plus <a href="/fr/#story">dans notre histoire</a>.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `Sans gluten ? Nous préparons un mélange de farine dédié et un poste de travail propre sans frais supplémentaires; dites-le-nous simplement lors de votre réservation.`,
                `Deux verres toscans sont compris dans les 95 €: un blanc à table, un rouge avec le ragù. Aucun supplément à la fin.`,
                `Nous vous envoyons par email les recettes de tout ce que vous avez préparé, pour que la pâte apprise au toucher soit encore là le mois prochain.`,
                `Ce que vous ne mangez pas, vous l'emportez: nous le faisons sécher, le mettons en sachet, et il rentre à l'hôtel avec vous.`,
                `La cuisine est dans l'Oltrarno, près de la Piazza Santo Spirito; nous vous envoyons l'adresse exacte lors de votre réservation.`,
                `Vous voulez le même cours avec une promenade au marché à l'aube d'abord ? C'est <a href="/fr/cours-cuisine-visite-marche-florence/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Comment fonctionne la réservation`,
              paras: [
                `Appuyez sur "Réserver ce cours" et choisissez votre date, heure et le nombre d'invités; cela ouvre une discussion WhatsApp avec tout pré-rempli, et nous confirmons la disponibilité personnellement. Pas de compte, pas de formulaires. Vous pouvez également nous écrire à ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Ce cours convient-il aux débutants complets ?`, a: `Oui. Tout est enseigné de zéro (la pâte, l'étalage, le façonnage), et avec jamais plus de 8 personnes, il y a toujours un chef à vos côtés. La plupart des invités n'ont jamais fait de pâtes fraîches auparavant.` },
            { q: `Mange-t-on les pâtes que l'on fait ?`, a: `Oui. Chaque cours se termine à table avec vos pâtes fraîches, une sauce toscane et un verre de vin local.` },
            { q: `Quelles formes de pâtes allons-nous faire ?`, a: `Quatre formes classiques par cours: généralement des pici roulés à la main, des tagliatelles, des pappardelles et des tortelli farcis, selon la saison.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui: nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Parlez-nous simplement de vos allergies lors de la réservation.` },
            { q: `Comment puis-je réserver et payer ?`, a: `Utilisez le bouton "Réserver ce cours" pour formuler votre demande. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Faites vos courses au marché de Sant'Ambrogio à l'aube, puis cuisinez votre panier. 5 heures, max 6 personnes, 145 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine, pour vous en privé. Anniversaires, demandes en mariage, réunions, à partir de 680 €.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Cuisinez avec nous d'où vous voulez, en direct de cette même cuisine, à partir de 68 €.` },
          ],
          ctaLabel: `Réserver ce cours`,
          prefill: 'florence',
          breadcrumbName: `Cours de Pâtes Fraîches à Florence`,
          showPastaCrumb: true,
          product: {
            name: `La Table du Chef: Cours de Pâtes Fraîches à Florence`,
            description: `Un cours pratique de pâtes fraîches de 3 heures dans l'Oltrarno à Florence : quatre formes classiques, max 8 personnes, se terminant par un déjeuner toscan assis avec du vin. Enseigné par deux chefs d'agritourisme.`,
            price: '95',
          },
        },
      },
      de: {
        slug: 'pasta-kurs-florenz',
        title: `Pasta-Kurs in Florenz: 4 Formen + Wein inklusive (€95) | Handmade Pasta Florence`,
        description: `Ein 3-stündiger praktischer Pasta-Kurs in Florenz' Oltrarno. Rollen Sie vier klassische Formen mit zwei toskanischen Agriturismo-Küchenchefs und setzen Sie sich dann, um das Gekochte mit zwei inbegriffenen toskanischen Weinen zu essen. Max. 8 Gäste, 95 € pro Person.`,
        cl: {
          eyebrow: `Der Tisch des Küchenchefs · Oltrarno, Florenz`,
          heading: `Ein Pasta-Kurs in Florenz,`,
          headingItal: `rund um einen Tisch.`,
          lede: `Drei praktische Stunden in unserer Küche im Oltrarno. Sie werden vier klassische Pasta-Formen mit einem Koch an Ihrer Seite mischen, kneten, ausrollen und falten und sich dann zusammensetzen, um alles zu essen, was Sie gemacht haben, mit einer toskanischen Sauce und zwei toskanischen Weinen, im Preis enthalten.`,
          image: { src: img.cookingClassGuests, alt: `Gäste rollen frische Pasta beim Kurs „Der Tisch des Küchenchefs“ in unserer Küche in Florenz aus`, w: 800, h: 1067 },
          price: `95 €`,
          priceNote: `pro Person · zwei Gläser inklusive`,
          facts: [
            { label: `Lokale Produkte`, value: `Saisonale toskanische Produkte`, icon: 'leaf' },
            { label: `Dauer`, value: `etwa 3 Stunden`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. 8 Gäste`, icon: 'people' },
            { label: `Beginn`, value: `10:00 · 14:30 · 18:00`, icon: 'calendar' },
            { label: `Tage`, value: `Täglich, auch montags`, icon: 'calendar' },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito`, icon: 'map-pin' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Was werden Sie im Kurs tatsächlich tun?`,
              paras: [
                `Dies ist ein Kurs mit den Händen im Mehl von der ersten Minute an, keine Vorführungen, die man von einem Hocker aus beobachtet. Sie machen Ihren eigenen Teig, lernen zu fühlen, wann er fertig ist, und verarbeiten ihn zu vier klassischen Formen: handgerollte Pici, bandgeschnittene Tagliatelle und Pappardelle sowie gefüllte Tortelli, je nach Saison.`,
                `Sie machen auch die Saucen, die dazugehören: ein langsames <strong>Ragù</strong>, mit Salbei aufgeschäumte <strong>burro e salvia</strong>, frische <strong>Pomodorini</strong> oder von Hand gestoßenes <strong>Pesto</strong>, je nach Tag und Saison.`,
                `In Florenz nennen die meisten Kurse zwölf Personen eine kleine Gruppe. Bei uns sitzen nie mehr als acht am Tisch, und genau deshalb steht ein Koch neben Ihnen, wenn eine Faltung misslingt, statt vorne etwas vorzuführen. Wenn die Nudeln fertig sind, kochen wir sie gemeinsam und setzen uns zu einem echten toskanischen Mittagessen: was Sie gerade gemacht haben, Ihre Sauce und zwei toskanische Weine, im Preis enthalten.`,
              ],
            },
            {
              title: `Wer unterrichtet`,
              paras: [
                `Ihre Gastgeber sind <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> und Marsel, zwei lebenslange Freunde, die Küchenchefs von zwei Agriturismi in den Hügeln außerhalb von Florenz sind. Pasta für Hochzeiten, Feste und Live-Shows ist ihr Tagesgeschäft; diese Küche ist der Ort, an dem sie es unterrichten. Sie können mehr <a href="/de/#story">in unserer Geschichte</a> lesen.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Glutenfrei? Wir bereiten ohne Aufpreis eine spezielle Mehlmischung und eine saubere Station vor; sagen Sie es uns einfach bei der Buchung.`,
                `Zwei toskanische Gläser sind in den 95 € enthalten: ein Weißer zu Tisch, ein Roter zum Ragù. Kein Aufpreis am Ende.`,
                `Wir schicken Ihnen die Rezepte für alles, was Sie gemacht haben, per E-Mail, damit der Teig, den Sie im Gefühl haben, nächsten Monat noch da ist.`,
                `Was Sie nicht essen, nehmen Sie mit: wir trocknen es, füllen es ab, und es fährt mit Ihnen ins Hotel zurück.`,
                `Die Küche befindet sich im Oltrarno, in der Nähe der Piazza Santo Spirito; wir senden Ihnen bei der Buchung die genaue Adresse.`,
                `Möchten Sie denselben Kurs mit einem morgendlichen Marktspaziergang davor? Das ist <a href="/de/markt-tour-kochkurs-florenz/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Wie die Buchung funktioniert`,
              paras: [
                `Klicken Sie auf "Diesen Kurs buchen" und wählen Sie Ihr Datum, Ihre Uhrzeit und die Anzahl der Gäste; es öffnet sich ein WhatsApp-Chat mit allen ausgefüllten Details, und wir bestätigen die Verfügbarkeit persönlich. Kein Konto, keine Formulare. Sie können uns auch unter ciao@handmadepastaflorence.com schreiben.`,
              ],
            },
          ],
          faqs: [
            { q: `Ist dieser Kurs für absolute Anfänger geeignet?`, a: `Ja. Alles wird von Null an gelehrt (Teig, Rollen, Formen), und mit nie mehr als 8 Gästen ist immer ein Koch an Ihrer Seite. Die meisten Gäste haben noch nie zuvor frische Pasta gemacht.` },
            { q: `Essen wir die Pasta, die wir machen?`, a: `Ja. Jeder Kurs endet am Tisch mit Ihrer frischen Pasta, einer toskanischen Sauce und einem Glas Wein aus der Region.` },
            { q: `Welche Nudelformen werden wir machen?`, a: `Vier klassische Formen pro Kurs: typischerweise handgerollte Pici, Tagliatelle, Pappardelle und gefüllte Tortelli, je nach Saison.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja: wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Teilen Sie uns bei der Buchung einfach eventuelle Allergien mit.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Diesen Kurs buchen", um Ihre Anfrage zu erstellen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Kaufen Sie im Morgengrauen auf dem Sant'Ambrogio-Markt ein und kochen Sie dann den Korb. 5 Stunden, max. 6 Gäste, 145 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche, ganz privat für Sie. Geburtstage, Heiratsanträge, Treffen, ab 680 €.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Kochen Sie mit uns von überall aus, live aus derselben Küche, ab 68 €.` },
          ],
          ctaLabel: `Diesen Kurs buchen`,
          prefill: 'florence',
          breadcrumbName: `Pasta-Kurs in Florenz`,
          showPastaCrumb: true,
          product: {
            name: `Der Tisch des Küchenchefs: Pasta-Kurs in Florenz`,
            description: `Ein 3-stündiger praktischer Pasta-Kurs in Florenz' Oltrarno: vier klassische Formen, max. 8 Gäste, endend mit einem gemeinsamen toskanischen Mittagessen mit Wein. Geleitet von zwei Agriturismo-Küchenchefs.`,
            price: '95',
          },
        },
      },
      zh: {
        slug: 'foluolunsa-yidali-mian-kecheng',
        title: `佛罗伦萨手工意面课程：主厨餐桌 (€95) | Handmade Pasta Florence`,
        description: `在佛罗伦萨奥特拉诺区进行的3小时手工意面制作课程。与两位托斯卡纳农庄主厨一起揉制四种经典形状，然后坐下来品尝您制作的美食和一杯基安蒂葡萄酒。最多8位客人，每人95欧元。`,
        cl: {
          eyebrow: `主厨餐桌 · 佛罗伦萨奥特拉诺`,
          heading: `佛罗伦萨的意面课程，`,
          headingItal: `围坐在一桌。`,
          lede: `在我们的奥特拉诺厨房进行三小时的动手实践。您将与身旁的主厨一起混合、揉捏、擀平并折叠四种经典的意面形状，然后大家坐在一起，配以托斯卡纳酱汁和一杯基安蒂葡萄酒，享用您制作的所有美食。`,
          image: { src: img.cookingClassGuests, alt: `客人们在佛罗伦萨厨房的“主厨餐桌”课程中擀制新鲜意面`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `每人 · 含两杯葡萄酒`,
          facts: [
            { label: `本地食材`, value: `托斯卡纳时令食材`, icon: 'leaf' },
            { label: `时长`, value: `约3小时`, icon: 'clock' },
            { label: `团队规模`, value: `最多8位客人`, icon: 'people' },
            { label: `开始时间`, value: `10:00 · 14:30 · 18:00`, icon: 'calendar' },
            { label: `开课日`, value: `每天开课，周一照常`, icon: 'calendar' },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'map-pin' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
          ],
          sections: [
            {
              title: `您在课程中将真正学到什么？`,
              paras: [
                `这是一门从第一分钟起就“双手沾满面粉”的实践课程，不需要坐在凳子上看演示。您将制作自己的面团，学会感受它何时准备好，并将其制作成四种经典形状：手工揉制的pici，切成条状的tagliatelle和pappardelle，以及填馅的tortelli，具体取决于季节。`,
                `您还会亲手制作与之相配的酱汁：慢炖的<strong>肉酱 (ragù)</strong>、用鼠尾草打发的<strong>黄油鼠尾草酱 (burro e salvia)</strong>、新鲜的<strong>小番茄酱 (pomodorini)</strong>，或手工捣制的<strong>青酱 (pesto)</strong>，视当天与时令而定。`,
                `在佛罗伦萨，多数课程把十二人称作“小班”。我们每桌从不超过八人，正因如此，当您的折叠出了问题时，身边站着的是一位厨师，而不是教室前方的一场演示。意面做好后我们一起烹饪，然后坐下来享用一顿正宗的托斯卡纳午餐：您刚刚做的意面、您的酱汁，以及价格中已包含的两杯托斯卡纳葡萄酒。`,
              ],
            },
            {
              title: `谁来教`,
              paras: [
                `您的主持人是 <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> 和 Marsel，两人是一生的挚友，也是佛罗伦萨郊外山上两家农庄的首席主厨。为婚礼、宴会和现场表演制作意面是他们的日常工作；而这个厨房是他们教学的地方。您可以在<a href="/zh/#story">我们的故事</a>中了解更多。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `无麸质？我们免费准备专门的面粉混合物和干净的操作台，只需在预订时告知我们。`,
                `95欧元已包含两杯托斯卡纳葡萄酒：佐餐白葡萄酒一杯，配肉酱红葡萄酒一杯。课程结束后不再加收任何费用。`,
                `我们会把您做过的所有菜谱发到您的邮箱，让您凭手感学会的那团面，下个月依然还在。`,
                `没吃完的，您带走，我们帮您晾干、装袋，让它跟您一起回酒店。`,
                `厨房位于奥特拉诺，靠近圣斯皮里托广场，我们会在您预订时发送确切地址。`,
                `想在课程前先逛一逛清晨的菜市场吗？请查看 <a href="/zh/shichang-daolan-pengren-kecheng-foluolunsa/">Mercato &amp; Mani</a>。`,
              ],
            },
            {
              title: `如何预订`,
              paras: [
                `点击“预订此课程”并选择您的日期、时间和人数，这将打开一个自动填好信息的WhatsApp聊天，我们将亲自确认可用性。无需注册账号，也无需填写表格。您也可以发送邮件至 ciao@handmadepastaflorence.com 联系我们。`,
              ],
            },
          ],
          faqs: [
            { q: `这门课适合完全的初学者吗？`, a: `是的。一切都从零开始教起：揉面、擀面、塑形，而且客人从不超过8人，总有一位厨师在您身旁指导。大多数客人以前从未做过新鲜的意面。` },
            { q: `我们会吃自己做的意面吗？`, a: `是的。每节课都会以您的新鲜意面、托斯卡纳酱汁和一杯当地葡萄酒的餐桌时光结束。` },
            { q: `我们将制作哪些意面形状？`, a: `每节课制作四种经典形状：通常是手工揉制的pici、tagliatelle、pappardelle和填馅的tortelli，具体取决于季节。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的，我们可以免费准备专门的无麸质面粉混合物和干净的操作台。预订时请告诉我们任何过敏情况。` },
            { q: `我该如何预订和付款？`, a: `使用“预订此课程”按钮创建您的请求。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨在圣安布罗焦市场购物，然后烹饪购买的食材。5小时，最多6位客人，145欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `为您私人包场的整个厨房。生日、求婚、聚会，680欧元起。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `无论在哪里，都可以与我们一起在同一个厨房进行在线烹饪，68欧元起。` },
          ],
          ctaLabel: `预订此课程`,
          prefill: 'florence',
          breadcrumbName: `佛罗伦萨手工意面课程`,
          showPastaCrumb: true,
          product: {
            name: `主厨餐桌：佛罗伦萨手工意面课程`,
            description: `佛罗伦萨奥特拉诺区3小时实践手工意面课程：四种经典形状，最多8位客人，以包含葡萄酒的托斯卡纳午餐结束。由两位农庄主厨授课。`,
            price: '95',
          },
        },
      },
    },
  },

  'market-tour': {
    floatingCta: true,
    courseMode: 'Onsite',
    courseDuration: 'PT5H',
    locales: {
      en: {
        slug: 'market-tour-cooking-class-florence',
        title: `Market Tour & Cooking Class in Florence: Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Shop Sant’Ambrogio market with a Tuscan chef, then turn the basket into ravioli, a ragù and a seasonal dolce in our Oltrarno kitchen. About 5 hours, max 6 guests, €145 per person.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant’Ambrogio + Oltrarno`,
          heading: `A market tour & cooking class`,
          headingItal: `in Florence.`,
          lede: `Start the day the way our chefs do: at Sant’Ambrogio market, tasting and choosing what looks best. Then carry the basket back to our Oltrarno kitchen and turn it into ravioli, a slow ragù and a seasonal dolce, and sit down to eat it all together.`,
          image: { src: img.aperitivo, alt: `Fresh market produce and aperitivo before the Mercato & Mani cooking class in Florence`, w: 800, h: 1067 },
          price: `€145`,
          priceNote: `per person`,
          facts: [
            { label: `Local Products`, value: `Picked that morning at Sant’Ambrogio`, icon: 'leaf' },
            { label: `Length`, value: `about 5 hours`, icon: 'clock' },
            { label: `Group size`, value: `max 6 guests`, icon: 'people' },
            { label: `Starts`, value: `morning, with the market`, icon: 'calendar' },
            { label: `Market`, value: `Sant’Ambrogio`, icon: 'map-pin' },
            { label: `Kitchen`, value: `Oltrarno, near Santo Spirito`, icon: 'home' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
          ],
          sections: [
            {
              title: `First, the market`,
              paras: [
                `Sant’Ambrogio is the market where Florentines actually shop: smaller and quieter than the Mercato Centrale, and full of the stallholders our chefs buy from. You’ll walk it with Endri or Marsel, learn what to look for in this week’s produce, and build the menu from what’s good today. No fixed shopping list: the season decides.`,
              ],
            },
            {
              title: `Then, the kitchen`,
              paras: [
                `Back in the Oltrarno, the basket becomes lunch. You’ll make fresh egg dough and fold it into ravioli, start a ragù and let it work while you cook, and finish with a seasonal dolce. With never more than six guests, this is the closest thing we offer to cooking side-by-side with a chef at home.`,
                `Like every class we run, it ends at the table: your pasta, your ragù, your dolce, and a glass of local wine.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `This is our longest and smallest-group class; it books out first.`,
                `Gluten-free and allergy-friendly at no extra charge; tell us when you book.`,
                `Comfortable shoes help: the market walk is part of the fun.`,
                `Short on time? The 3-hour <a href="/pasta-making-class-florence/">Chef’s Table class</a> skips the market and goes straight to the flour.`,
              ],
            },
          ],
          faqs: [
            { q: `How is this different from The Chef’s Table class?`, a: `Mercato & Mani is longer (about 5 hours vs 3), starts with the Sant’Ambrogio market walk, and the menu is built from what you find: ravioli, a ragù and a seasonal dolce. It’s also smaller: max 6 guests instead of 8.` },
            { q: `What will we cook?`, a: `Fresh ravioli, a slow-cooked ragù and a seasonal dolce, built around what looks best at Sant’Ambrogio market that morning. Then we all sit down to eat it, with a glass of local wine.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes: we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. Just tell us about any allergies when you book.` },
            { q: `How do I book and pay?`, a: `Use the “Book this class” button to build your request. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature 3-hour pasta class: four shapes, one long lunch. €95.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen, privately yours. Birthdays, proposals, reunions, from €680.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Cook with us from anywhere, live from this same kitchen, from €68.` },
            { title: `Where to eat handmade pasta in Florence`, href: `/blog/where-to-eat-handmade-pasta-in-florence/`, desc: `A pasta chef’s guide to ordering well in the city.` },
          ],
          ctaLabel: `Book this class`,
          prefill: 'florence',
          breadcrumbName: `Market Tour & Cooking Class`,
          product: {
            name: `Mercato & Mani: Market Tour & Cooking Class in Florence`,
            description: `A 5-hour Florence food experience: shop Sant’Ambrogio market with a Tuscan agriturismo chef, then cook ravioli, a ragù and a seasonal dolce in our Oltrarno kitchen. Max 6 guests.`,
            price: '145',
          },
        },
      },
      it: {
        slug: 'corso-cucina-tour-mercato-firenze',
        title: `Tour del Mercato e Corso di Cucina a Firenze: Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Fai la spesa al mercato di Sant'Ambrogio con uno chef toscano, poi trasforma il cesto in ravioli, ragù e un dolce di stagione nella nostra cucina in Oltrarno. Circa 5 ore, max 6 ospiti, €145 a persona.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant’Ambrogio + Oltrarno`,
          heading: `Tour del mercato & corso di cucina`,
          headingItal: `a Firenze.`,
          lede: `Inizia la giornata come fanno i nostri chef: al mercato di Sant'Ambrogio, assaggiando e scegliendo ciò che sembra migliore. Poi porta il cesto nella nostra cucina in Oltrarno e trasformalo in ravioli, un ragù a lenta cottura e un dolce di stagione, e sediamoci a mangiare tutto insieme.`,
          image: { src: img.aperitivo, alt: `Prodotti freschi del mercato e aperitivo prima del corso di cucina Mercato & Mani a Firenze`, w: 800, h: 1067 },
          price: `€145`,
          priceNote: `a persona`,
          facts: [
            { label: `Prodotti Locali`, value: `Scelti quella mattina al mercato di Sant’Ambrogio`, icon: 'leaf' },
            { label: `Durata`, value: `circa 5 ore`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max 6 ospiti`, icon: 'people' },
            { label: `Inizio`, value: `mattina, con il mercato`, icon: 'calendar' },
            { label: `Mercato`, value: `Sant’Ambrogio`, icon: 'map-pin' },
            { label: `Cucina`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'home' },
            { label: `Lingua`, value: `Inglese o Italiano`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Prima di tutto, il mercato`,
              paras: [
                `Sant’Ambrogio è il mercato dove i fiorentini fanno davvero la spesa: più piccolo e tranquillo del Mercato Centrale, e pieno dei banchi da cui comprano i nostri chef. Ci camminerai con Endri o Marsel, imparerai cosa cercare nei prodotti di questa settimana e costruirai il menù in base a ciò che è buono oggi. Nessuna lista della spesa fissa: decide la stagione.`,
              ],
            },
            {
              title: `Poi, la cucina`,
              paras: [
                `Tornati in Oltrarno, il cesto diventa pranzo. Preparerai l'impasto fresco all'uovo e lo piegherai nei ravioli, inizierai un ragù e lo lascerai cuocere mentre cucini, per finire con un dolce di stagione. Con mai più di sei ospiti, questa è la cosa più vicina che offriamo al cucinare fianco a fianco con uno chef a casa sua.`,
                `Come ogni corso che teniamo, finisce a tavola: la tua pasta, il tuo ragù, il tuo dolce e un bicchiere di vino locale.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Questo è il nostro corso più lungo e con il gruppo più piccolo; si prenota per primo.`,
                `Opzioni senza glutine e per allergie senza costi aggiuntivi; comunicacelo quando prenoti.`,
                `Scarpe comode aiutano: la passeggiata al mercato è parte del divertimento.`,
                `Poco tempo a disposizione? Il corso di 3 ore <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> salta il mercato e va dritto alla farina.`,
              ],
            },
          ],
          faqs: [
            { q: `In cosa differisce dal corso Il Tavolo dello Chef?`, a: `Mercato & Mani è più lungo (circa 5 ore contro 3), inizia con la passeggiata al mercato di Sant'Ambrogio, e il menù è costruito su ciò che trovi: ravioli, un ragù e un dolce di stagione. È anche più intimo: max 6 ospiti invece di 8.` },
            { q: `Cosa cucineremo?`, a: `Ravioli freschi, un ragù a lenta cottura e un dolce di stagione, costruiti attorno a ciò che sembra migliore al mercato di Sant'Ambrogio quella mattina. Poi ci sediamo tutti insieme a mangiarlo, con un bicchiere di vino locale.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì: possiamo preparare una miscela dedicata di farine senza glutine e una postazione pulita senza costi aggiuntivi. Devi solo segnalarci eventuali allergie al momento della prenotazione.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota questo corso" per creare la tua richiesta. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro corso di pasta di 3 ore: quattro formati, un lungo pranzo. €95.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina, privata per voi. Compleanni, proposte, ritrovi, da €680.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Cucina con noi da ovunque, in diretta da questa stessa cucina, da €68.` },
          ],
          ctaLabel: `Prenota questo corso`,
          prefill: 'florence',
          breadcrumbName: `Tour del Mercato & Corso`,
          product: {
            name: `Mercato & Mani: Tour del Mercato & Corso di Cucina a Firenze`,
            description: `Un'esperienza enogastronomica a Firenze di 5 ore: fai la spesa al mercato di Sant'Ambrogio con uno chef di un agriturismo toscano, poi cucina ravioli, un ragù e un dolce di stagione nella nostra cucina in Oltrarno. Max 6 ospiti.`,
            price: '145',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-visite-marche-florence',
        title: `Visite du Marché et Cours de Cuisine à Florence: Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Faites vos courses au marché de Sant'Ambrogio avec un chef toscan, puis transformez votre panier en raviolis, ragoût et un dessert de saison dans notre cuisine de l'Oltrarno. Environ 5 heures, max 6 personnes, 145 € par personne.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant'Ambrogio + Oltrarno`,
          heading: `Visite du marché & cours de cuisine`,
          headingItal: `à Florence.`,
          lede: `Commencez la journée comme nos chefs : au marché de Sant'Ambrogio, en goûtant et en choisissant ce qui semble le meilleur. Ensuite, rapportez le panier à notre cuisine de l'Oltrarno et transformez-le en raviolis, un ragoût mijoté et un dessert de saison, et asseyez-vous pour manger tout cela ensemble.`,
          image: { src: img.aperitivo, alt: `Produits frais du marché et apéritif avant le cours de cuisine Mercato & Mani à Florence`, w: 800, h: 1067 },
          price: `145 €`,
          priceNote: `par personne`,
          facts: [
            { label: `Produits Locaux`, value: `Choisis le matin même au marché de Sant'Ambrogio`, icon: 'leaf' },
            { label: `Durée`, value: `environ 5 heures`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max 6 personnes`, icon: 'people' },
            { label: `Départ`, value: `matin, avec le marché`, icon: 'calendar' },
            { label: `Marché`, value: `Sant'Ambrogio`, icon: 'map-pin' },
            { label: `Cuisine`, value: `Oltrarno, près de Santo Spirito`, icon: 'home' },
            { label: `Langue`, value: `Anglais ou Italien`, icon: 'globe' },
          ],
          sections: [
            {
              title: `D'abord, le marché`,
              paras: [
                `Sant'Ambrogio est le marché où les Florentins font réellement leurs courses: plus petit et plus calme que le Mercato Centrale, et plein des marchands chez qui nos chefs s'approvisionnent. Vous vous y promènerez avec Endri ou Marsel, apprendrez quoi chercher dans les produits de cette semaine, et construirez le menu à partir de ce qui est bon aujourd'hui. Pas de liste de courses fixe : c'est la saison qui décide.`,
              ],
            },
            {
              title: `Ensuite, la cuisine`,
              paras: [
                `De retour dans l'Oltrarno, le panier devient le déjeuner. Vous préparerez de la pâte fraîche aux œufs et la plierez en raviolis, commencerez un ragoût et le laisserez mijoter pendant que vous cuisinez, et terminerez avec un dessert de saison. Avec jamais plus de six personnes, c'est ce que nous offrons de plus proche de cuisiner côte à côte avec un chef à la maison.`,
                `Comme tous nos cours, il se termine à table : vos pâtes, votre ragoût, votre dessert, et un verre de vin local.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `C'est notre cours le plus long et en plus petit groupe; il est complet en premier.`,
                `Sans gluten et adapté aux allergies sans frais supplémentaires; dites-le-nous lors de la réservation.`,
                `Des chaussures confortables aident : la promenade au marché fait partie du plaisir.`,
                `Peu de temps ? Le cours de 3 heures <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> saute le marché et passe directement à la farine.`,
              ],
            },
          ],
          faqs: [
            { q: `En quoi est-ce différent du cours La Table du Chef ?`, a: `Mercato & Mani est plus long (environ 5 heures contre 3), commence par la promenade au marché de Sant'Ambrogio, et le menu est construit à partir de ce que vous trouvez: des raviolis, un ragoût et un dessert de saison. C'est aussi plus intime : max 6 personnes au lieu de 8.` },
            { q: `Qu'allons-nous cuisiner ?`, a: `Des raviolis frais, un ragoût longuement mijoté et un dessert de saison, construits autour de ce qui est le meilleur au marché de Sant'Ambrogio ce matin-là. Ensuite, nous nous asseyons tous ensemble pour le manger, avec un verre de vin local.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui: nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Parlez-nous simplement de vos allergies lors de la réservation.` },
            { q: `Comment puis-je réserver et payer ?`, a: `Utilisez le bouton "Réserver ce cours" pour formuler votre demande. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours de pâtes signature de 3 heures: quatre formes, un long déjeuner. 95 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine, pour vous en privé. Anniversaires, demandes en mariage, réunions, à partir de 680 €.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Cuisinez avec nous d'où vous voulez, en direct de cette même cuisine, à partir de 68 €.` },
          ],
          ctaLabel: `Réserver ce cours`,
          prefill: 'florence',
          breadcrumbName: `Visite du Marché & Cours`,
          product: {
            name: `Mercato & Mani: Visite du Marché et Cours de Cuisine à Florence`,
            description: `Une expérience culinaire florentine de 5 heures : faites vos courses au marché de Sant'Ambrogio avec un chef toscan, puis cuisinez des raviolis, un ragoût et un dessert de saison dans notre cuisine de l'Oltrarno. Max 6 personnes.`,
            price: '145',
          },
        },
      },
      de: {
        slug: 'markt-tour-kochkurs-florenz',
        title: `Markttour & Kochkurs in Florenz: Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Kaufen Sie mit einem toskanischen Koch auf dem Sant'Ambrogio-Markt ein und verwandeln Sie den Korb dann in unserer Küche im Oltrarno in Ravioli, ein Ragù und ein saisonales Dessert. Etwa 5 Stunden, max. 6 Gäste, 145 € pro Person.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant'Ambrogio + Oltrarno`,
          heading: `Eine Markttour & Kochkurs`,
          headingItal: `in Florenz.`,
          lede: `Beginnen Sie den Tag so, wie es unsere Köche tun: auf dem Markt von Sant'Ambrogio, indem Sie probieren und auswählen, was am besten aussieht. Tragen Sie dann den Korb zurück in unsere Küche im Oltrarno und verwandeln Sie ihn in Ravioli, ein langsames Ragù und ein saisonales Dessert, und setzen Sie sich, um alles gemeinsam zu essen.`,
          image: { src: img.aperitivo, alt: `Frische Marktprodukte und Aperitivo vor dem Kochkurs Mercato & Mani in Florenz`, w: 800, h: 1067 },
          price: `145 €`,
          priceNote: `pro Person`,
          facts: [
            { label: `Lokale Produkte`, value: `Am selben Morgen auf dem Sant'Ambrogio-Markt ausgesucht`, icon: 'leaf' },
            { label: `Dauer`, value: `etwa 5 Stunden`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. 6 Gäste`, icon: 'people' },
            { label: `Beginn`, value: `Morgens, mit dem Markt`, icon: 'calendar' },
            { label: `Markt`, value: `Sant'Ambrogio`, icon: 'map-pin' },
            { label: `Küche`, value: `Oltrarno, nahe Santo Spirito`, icon: 'home' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Zuerst der Markt`,
              paras: [
                `Sant'Ambrogio ist der Markt, auf dem die Florentiner tatsächlich einkaufen: kleiner und ruhiger als der Mercato Centrale und voller Standbesitzer, bei denen unsere Köche einkaufen. Sie gehen mit Endri oder Marsel darüber, lernen, worauf Sie bei den Produkten dieser Woche achten müssen, und stellen das Menü aus dem zusammen, was heute gut ist. Keine feste Einkaufsliste: Die Jahreszeit entscheidet.`,
              ],
            },
            {
              title: `Dann die Küche`,
              paras: [
                `Zurück im Oltrarno wird der Korb zum Mittagessen. Sie machen frischen Eierteig und falten ihn zu Ravioli, beginnen ein Ragù und lassen es arbeiten, während Sie kochen, und schließen mit einem saisonalen Dessert ab. Mit nie mehr als sechs Gästen ist dies das Nächste, was wir anbieten können, um mit einem Koch zu Hause Seite an Seite zu kochen.`,
                `Wie jeder von uns durchgeführte Kurs endet er am Tisch: Ihre Pasta, Ihr Ragù, Ihr Dessert und ein Glas Wein aus der Region.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Dies ist unser längster Kurs in der kleinsten Gruppe; er ist als Erster ausgebucht.`,
                `Glutenfrei und allergiefreundlich ohne Aufpreis; sagen Sie es uns bei der Buchung.`,
                `Bequeme Schuhe helfen: Der Marktspaziergang ist Teil des Spaßes.`,
                `Wenig Zeit? Der 3-stündige Kurs <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> überspringt den Markt und geht direkt zum Mehl.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie unterscheidet sich das vom Kurs „Der Tisch des Küchenchefs“?`, a: `Mercato & Mani ist länger (ca. 5 Stunden statt 3), beginnt mit dem Spaziergang über den Sant'Ambrogio-Markt, und das Menü wird aus dem zusammengestellt, was Sie finden: Ravioli, ein Ragù und ein saisonales Dessert. Es ist auch kleiner: max. 6 Gäste statt 8.` },
            { q: `Was werden wir kochen?`, a: `Frische Ravioli, ein langsam gekochtes Ragù und ein saisonales Dessert, das darauf aufbaut, was an diesem Morgen auf dem Markt von Sant'Ambrogio am besten aussieht. Dann setzen wir uns alle zusammen, um es mit einem Glas Wein aus der Region zu essen.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja: wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Teilen Sie uns bei der Buchung einfach eventuelle Allergien mit.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Diesen Kurs buchen", um Ihre Anfrage zu erstellen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser 3-stündiger Signature-Pasta-Kurs: vier Formen, ein langes Mittagessen. 95 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche, ganz privat für Sie. Geburtstage, Heiratsanträge, Treffen, ab 680 €.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Kochen Sie mit uns von überall aus, live aus derselben Küche, ab 68 €.` },
          ],
          ctaLabel: `Diesen Kurs buchen`,
          prefill: 'florence',
          breadcrumbName: `Markttour & Kochkurs`,
          product: {
            name: `Mercato & Mani: Markttour & Kochkurs in Florenz`,
            description: `Ein 5-stündiges kulinarisches Florenz-Erlebnis: Kaufen Sie mit einem toskanischen Koch auf dem Sant'Ambrogio-Markt ein und kochen Sie dann in unserer Küche im Oltrarno Ravioli, ein Ragù und ein saisonales Dessert. Max. 6 Gäste.`,
            price: '145',
          },
        },
      },
      zh: {
        slug: 'shichang-daolan-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨市场导览与烹饪课程：Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `与托斯卡纳厨师一起在圣安布罗焦市场购物，然后在我们奥特拉诺的厨房里将购物篮里的食材变成意式饺子、慢炖肉酱和时令甜点。约5小时，最多6位客人，每人145欧元。`,
        cl: {
          eyebrow: `Mercato & Mani · 圣安布罗焦 + 奥特拉诺`,
          heading: `市场导览与烹饪课程`,
          headingItal: `在佛罗伦萨。`,
          lede: `像我们的厨师一样开始新的一天：在圣安布罗焦市场品尝并挑选最美味的食材。然后带着购物篮回到我们奥特拉诺的厨房，将其变成意式饺子、慢炖肉酱和时令甜点，并坐下来一起享用。`,
          image: { src: img.aperitivo, alt: `在佛罗伦萨的Mercato & Mani烹饪课程之前的新鲜市场农产品和开胃酒`, w: 800, h: 1067 },
          price: `€145`,
          priceNote: `每人`,
          facts: [
            { label: `本地食材`, value: `当天清晨精选自圣安布罗焦市场`, icon: 'leaf' },
            { label: `时长`, value: `约5小时`, icon: 'clock' },
            { label: `团队规模`, value: `最多6位客人`, icon: 'people' },
            { label: `开始时间`, value: `早晨，与市场同步`, icon: 'calendar' },
            { label: `市场`, value: `圣安布罗焦 (Sant'Ambrogio)`, icon: 'map-pin' },
            { label: `厨房`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'home' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
          ],
          sections: [
            {
              title: `首先，逛市场`,
              paras: [
                `圣安布罗焦是佛罗伦萨人真正购物的市场，比中央市场更小、更安静，而且到处都是我们厨师光顾的摊主。您将与Endri或Marsel一起漫步其中，了解本周农产品中该寻找什么，并根据今天的好食材来确定菜单。没有固定的购物清单：由季节决定。`,
              ],
            },
            {
              title: `然后，进厨房`,
              paras: [
                `回到奥特拉诺，篮子里的食材成了午餐。您将制作新鲜的鸡蛋面团并将其包成意式饺子，开始炖肉酱并让它在您烹饪时发挥作用，最后以时令甜点结束。因为客人从不超过六人，这是我们提供的最接近于在家里与厨师并肩烹饪的体验。`,
                `就像我们举办的每一堂课一样，它在餐桌上结束：您的意面、您的肉酱、您的甜点，以及一杯当地葡萄酒。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `这是我们时间最长、人数最少的课程，它总是最先被订满。`,
                `免费提供无麸质和过敏友好选项，请在预订时告知我们。`,
                `穿舒适的鞋子会有帮助：逛市场是乐趣的一部分。`,
                `时间不够？3小时的 <a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌课程</a> 会跳过市场，直接开始面粉制作。`,
              ],
            },
          ],
          faqs: [
            { q: `这与主厨餐桌课程有何不同？`, a: `Mercato & Mani 课程时间更长（约5小时对3小时），从圣安布罗焦市场漫步开始，菜单根据您找到的食材构建：意式饺子、肉酱和时令甜点。而且更私密：最多6位客人，而不是8位。` },
            { q: `我们将烹饪什么？`, a: `新鲜意式饺子、慢炖肉酱和时令甜点，这些都是围绕那天早上在圣安布罗焦市场看起来最美味的食材构建的。然后我们坐在一起，配着一杯当地葡萄酒享用它。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的，我们可以免费准备专门的无麸质面粉混合物和干净的操作台。预订时请告诉我们任何过敏情况。` },
            { q: `我该如何预订和付款？`, a: `使用“预订此课程”按钮创建您的请求。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们招牌的3小时意面课程：四种形状，一顿丰盛的午餐。95欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `为您私人包场的整个厨房。生日、求婚、聚会，680欧元起。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `无论在哪里，都可以与我们一起在同一个厨房进行在线烹饪，68欧元起。` },
          ],
          ctaLabel: `预订此课程`,
          prefill: 'florence',
          breadcrumbName: `市场导览与烹饪课程`,
          product: {
            name: `Mercato & Mani：佛罗伦萨市场导览与烹饪课程`,
            description: `5小时佛罗伦萨美食体验：与托斯卡纳农庄厨师一起在圣安布罗焦市场购物，然后在我们奥特拉诺的厨房里烹饪意式饺子、慢炖肉酱和时令甜点。最多6位客人。`,
            price: '145',
          },
        },
      },
    },
  },

  'private': {
    floatingCta: true,
    courseMode: 'Onsite',
    locales: {
      en: {
        slug: 'private-cooking-class-florence',
        title: `Private Cooking Class in Florence: The Family Long-Table | Handmade Pasta Florence`,
        description: `Book the whole kitchen for a private pasta-making feast in Florence: birthdays, proposals, reunions. 6–14 guests, evenings, two Tuscan chefs all to yourselves. From €680.`,
        cl: {
          eyebrow: `The Family Long-Table · private events`,
          heading: `A private cooking class in Florence,`,
          headingItal: `all to yourselves.`,
          lede: `The whole kitchen, one long table, and two chefs cooking with your people only. This is the farmhouse feast we’ve hosted at our agriturismi for years (birthdays, proposals, reunions), brought to the heart of Florence.`,
          image: { src: img.weddingCake, alt: `A celebration cake at a private Family Long-Table event in Florence`, w: 1080, h: 1433 },
          price: `from €680`,
          priceNote: `private kitchen buyout`,
          facts: [
            { label: `Local Products`, value: `Seasonal, tailored to your menu`, icon: 'leaf' },
            { label: `Group size`, value: `6–14 guests`, icon: 'people' },
            { label: `When`, value: `evenings · flexible`, icon: 'calendar' },
            { label: `Format`, value: `whole-kitchen buyout`, icon: 'home' },
            { label: `Where`, value: `Oltrarno, near Santo Spirito`, icon: 'map-pin' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
            { label: `Enquiries`, value: `answered within a day`, icon: 'mail' },
          ],
          sections: [
            {
              title: `The long-table feast`,
              paras: [
                `At our agriturismi, the long table is where every celebration ends up: everyone cooking, everyone eating, nobody checking the time. The Family Long-Table brings that evening to our Oltrarno kitchen: your group rolls and folds fresh pasta together with Endri and Marsel, then sits down to the feast it just made, with local wine on the table.`,
              ],
            },
            {
              title: `Made for occasions`,
              paras: [
                `Birthdays, proposals, anniversaries, family reunions, friends who finally got the same week off; if it deserves a table, it fits here. Because the kitchen is exclusively yours, we can shape the evening around the occasion. Tell us what you’re celebrating when you book and we’ll plan it with you over WhatsApp.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `From €680 for the private kitchen, for groups of 6–14; tell us your group size and we’ll confirm a quote.`,
                `Evenings work best, and timing is flexible for private bookings.`,
                `Gluten-free and allergy-friendly at no extra charge; tell us about your group when you book.`,
                `Just the two of you? Most couples book <a href="/pasta-making-class-florence/">The Chef’s Table</a> (max 8 guests, €95 each), or email us for a private quote for two.`,
                `Company outing instead of a family one? See our <a href="/team-building-cooking-class-florence/">team building cooking class</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `How many people can the private class host?`, a: `The Family Long-Table hosts groups of 6 to 14 around one long table, with the whole kitchen, and both chefs, exclusively yours.` },
            { q: `How does pricing work?`, a: `The private buyout starts at €680 for the kitchen. Send us your group size and date on WhatsApp or email and we’ll confirm a quote for your evening.` },
            { q: `Can you help with a surprise, a proposal or a birthday?`, a: `Yes: proposals, birthdays and reunions are exactly what this format is for. Tell us the plan when you book and we’ll shape the evening around it.` },
            { q: `Can two people book a private cooking class?`, a: `The private buyout is priced for groups of 6–14, so for two it rarely makes sense. Most couples book The Chef’s Table (max 8 guests, €95 per person) which stays intimate. If you’d like the kitchen truly to yourselves, email ciao@handmadepastaflorence.com and we’ll quote a private session for two.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes: we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. With a private group, just send us everyone’s needs when you book.` },
            { q: `How do I book?`, a: `Use the “Plan your evening” button to start a WhatsApp chat, or email ciao@handmadepastaflorence.com. Private evenings are planned personally, so we’ll confirm details together.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature 3-hour small-group pasta class, €95 per person.` },
            { title: `Team Building Class`, href: `/team-building-cooking-class-florence/`, desc: `The private kitchen for companies: aprons on, laptops away.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Dawn market walk + cooking class. 5 hours, max 6 guests, €145.` },
            { title: `Things to do in the Oltrarno`, href: `/blog/things-to-do-in-oltrarno-florence/`, desc: `Make an evening of it: our neighbourhood, hour by hour.` },
          ],
          ctaLabel: `Plan your evening`,
          prefill: 'florence',
          breadcrumbName: `Private Cooking Class`,
          product: {
            name: `The Family Long-Table: Private Cooking Class in Florence`,
            description: `A private pasta-making feast in Florence for 6–14 guests: the whole Oltrarno kitchen, two agriturismo head chefs, one long table. Birthdays, proposals, reunions.`,
            price: '680',
          },
        },
      },
      it: {
        slug: 'corso-cucina-privato-firenze',
        title: `Corso di Cucina Privato a Firenze: Il Lungo Tavolo di Famiglia | Handmade Pasta Florence`,
        description: `Prenota l'intera cucina per una festa privata a base di pasta fresca a Firenze: compleanni, proposte, ritrovi. 6–14 ospiti, serate, due chef toscani tutti per voi. Da €680.`,
        cl: {
          eyebrow: `Il Lungo Tavolo di Famiglia · eventi privati`,
          heading: `Un corso di cucina privato a Firenze,`,
          headingItal: `tutto per voi.`,
          lede: `L'intera cucina, un lungo tavolo e due chef che cucinano solo per le tue persone. Questa è la festa in fattoria che abbiamo ospitato nei nostri agriturismi per anni (compleanni, proposte, riunioni di famiglia), portata nel cuore di Firenze.`,
          image: { src: img.weddingCake, alt: `Una torta celebrativa in un evento privato Il Lungo Tavolo di Famiglia a Firenze`, w: 1080, h: 1433 },
          price: `da €680`,
          priceNote: `uso esclusivo cucina`,
          facts: [
            { label: `Prodotti Locali`, value: `Di stagione, su misura per il tuo menu`, icon: 'leaf' },
            { label: `Dimensione gruppo`, value: `6–14 ospiti`, icon: 'people' },
            { label: `Quando`, value: `serate · flessibile`, icon: 'calendar' },
            { label: `Formato`, value: `uso esclusivo della cucina`, icon: 'home' },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'map-pin' },
            { label: `Lingua`, value: `Inglese o Italiano`, icon: 'globe' },
            { label: `Risposte`, value: `entro un giorno lavorativo`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Il banchetto al lungo tavolo`,
              paras: [
                `Nei nostri agriturismi, il lungo tavolo è dove finisce ogni celebrazione: tutti cucinano, tutti mangiano, nessuno guarda l'orologio. Il Lungo Tavolo di Famiglia porta quella serata nella nostra cucina in Oltrarno: il tuo gruppo stende e piega la pasta fresca insieme a Endri e Marsel, per poi sedersi a gustare il banchetto appena preparato, con vino locale in tavola.`,
              ],
            },
            {
              title: `Fatto per le occasioni`,
              paras: [
                `Compleanni, proposte di matrimonio, anniversari, riunioni di famiglia, amici che finalmente hanno preso ferie nella stessa settimana; se merita un tavolo, si adatta qui. Poiché la cucina è esclusivamente tua, possiamo modellare la serata attorno all'occasione. Dicci cosa stai festeggiando quando prenoti e lo pianificheremo insieme su WhatsApp.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Da €680 per la cucina privata, per gruppi di 6–14 persone; comunicaci la dimensione del tuo gruppo e ti confermeremo un preventivo.`,
                `Le serate sono ideali e gli orari sono flessibili per le prenotazioni private.`,
                `Senza glutine e per allergie senza costi aggiuntivi; comunicaci le esigenze del tuo gruppo quando prenoti.`,
                `Siete solo in due? La maggior parte delle coppie sceglie <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> (max 8 ospiti, €95 a persona), oppure scrivici per un preventivo privato per due.`,
                `Gita aziendale invece che in famiglia? Vedi il nostro <a href="/it/corso-cucina-team-building-firenze/">corso di cucina per team building</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Quante persone può ospitare il corso privato?`, a: `Il Lungo Tavolo di Famiglia ospita gruppi da 6 a 14 persone attorno a un lungo tavolo, con l'intera cucina, ed entrambi gli chef, esclusivamente per voi.` },
            { q: `Come funzionano i prezzi?`, a: `L'uso esclusivo privato parte da €680 per l'intera cucina. Inviaci la dimensione del tuo gruppo e la data su WhatsApp o e-mail e ti confermeremo un preventivo per la tua serata.` },
            { q: `Potete aiutare con una sorpresa, una proposta o un compleanno?`, a: `Sì: proposte, compleanni e riunioni sono esattamente per cosa è pensato questo formato. Dicci il piano quando prenoti e modelleremo la serata attorno ad esso.` },
            { q: `Possono prenotare un corso privato anche solo due persone?`, a: `L'uso esclusivo è pensato per gruppi di 6–14 persone, quindi per due raramente conviene. La maggior parte delle coppie sceglie Il Tavolo dello Chef (max 8 ospiti, €95 a persona) che resta comunque intimo. Se volete la cucina tutta per voi, scrivete a ciao@handmadepastaflorence.com e vi prepareremo un preventivo per una sessione privata per due.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì: possiamo preparare una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. Con un gruppo privato, basta inviarci le esigenze di tutti al momento della prenotazione.` },
            { q: `Come posso prenotare?`, a: `Usa il pulsante "Pianifica la tua serata" per iniziare una chat su WhatsApp, o invia un'email a ciao@handmadepastaflorence.com. Le serate private sono pianificate personalmente, quindi confermeremo i dettagli insieme.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro classico corso di pasta per piccoli gruppi di 3 ore, €95 a persona.` },
            { title: `Corso per Team Building`, href: `/it/corso-cucina-team-building-firenze/`, desc: `La cucina privata per le aziende: grembiuli indossati, laptop via.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Passeggiata al mercato all'alba + corso di cucina. 5 ore, max 6 ospiti, €145.` },
          ],
          ctaLabel: `Pianifica la tua serata`,
          prefill: 'florence',
          breadcrumbName: `Corso di Cucina Privato`,
          product: {
            name: `Il Lungo Tavolo di Famiglia: Corso di Cucina Privato a Firenze`,
            description: `Una festa privata per preparare la pasta a Firenze per 6–14 ospiti: l'intera cucina in Oltrarno, due chef toscani, un lungo tavolo. Compleanni, proposte, riunioni.`,
            price: '680',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-prive-florence',
        title: `Cours de Cuisine Privé à Florence: La Longue Table Familiale | Handmade Pasta Florence`,
        description: `Réservez toute la cuisine pour un festin privé de préparation de pâtes à Florence: anniversaires, demandes en mariage, réunions. 6–14 personnes, soirées, deux chefs toscans rien que pour vous. À partir de 680 €.`,
        cl: {
          eyebrow: `La Longue Table Familiale · événements privés`,
          heading: `Un cours de cuisine privé à Florence,`,
          headingItal: `rien que pour vous.`,
          lede: `Toute la cuisine, une longue table et deux chefs qui cuisinent uniquement avec vos proches. C'est le festin fermier que nous organisons dans nos agritourismes depuis des années (anniversaires, demandes en mariage, réunions), apporté au cœur de Florence.`,
          image: { src: img.weddingCake, alt: `Un gâteau de célébration lors d'un événement privé La Longue Table Familiale à Florence`, w: 1080, h: 1433 },
          price: `à partir de 680 €`,
          priceNote: `privatisation de la cuisine`,
          facts: [
            { label: `Produits Locaux`, value: `De saison, adaptés à votre menu`, icon: 'leaf' },
            { label: `Taille du groupe`, value: `6–14 personnes`, icon: 'people' },
            { label: `Quand`, value: `soirées · flexible`, icon: 'calendar' },
            { label: `Format`, value: `privatisation complète de la cuisine`, icon: 'home' },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito`, icon: 'map-pin' },
            { label: `Langue`, value: `Anglais ou Italien`, icon: 'globe' },
            { label: `Demandes`, value: `réponse sous un jour ouvré`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Le festin de la longue table`,
              paras: [
                `Dans nos agritourismes, la longue table est l'endroit où toutes les célébrations se terminent: tout le monde cuisine, tout le monde mange, personne ne regarde l'heure. La Longue Table Familiale apporte cette soirée dans notre cuisine de l'Oltrarno : votre groupe étale et plie des pâtes fraîches avec Endri et Marsel, puis s'assoit pour déguster le festin qu'il vient de préparer, avec du vin local sur la table.`,
              ],
            },
            {
              title: `Fait pour les occasions`,
              paras: [
                `Anniversaires, demandes en mariage, anniversaires de mariage, réunions de famille, amis qui ont enfin réussi à prendre la même semaine de congé; si cela mérite une table, cela a sa place ici. Parce que la cuisine est exclusivement à vous, nous pouvons adapter la soirée à l'occasion. Dites-nous ce que vous célébrez lors de votre réservation et nous le planifierons avec vous sur WhatsApp.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `À partir de 680 € pour la cuisine privée, pour des groupes de 6 à 14 personnes; indiquez-nous la taille de votre groupe et nous vous confirmerons un devis.`,
                `Les soirées conviennent le mieux, et les horaires sont flexibles pour les réservations privées.`,
                `Sans gluten et adapté aux allergies sans frais supplémentaires; parlez-nous de votre groupe lors de la réservation.`,
                `Juste vous deux ? La plupart des couples réservent <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> (max 8 personnes, 95 € par personne), ou écrivez-nous pour un devis privé pour deux.`,
                `Sortie d'entreprise au lieu d'une sortie en famille ? Voir notre <a href="/fr/cours-cuisine-team-building-florence/">cours de cuisine team building</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Combien de personnes le cours privé peut-il accueillir ?`, a: `La Longue Table Familiale accueille des groupes de 6 à 14 personnes autour d'une longue table, avec toute la cuisine, et les deux chefs, exclusivement à vous.` },
            { q: `Comment fonctionnent les tarifs ?`, a: `La privatisation commence à 680 € pour la cuisine. Envoyez-nous la taille de votre groupe et la date sur WhatsApp ou par e-mail et nous vous confirmerons un devis pour votre soirée.` },
            { q: `Pouvez-vous aider pour une surprise, une demande en mariage ou un anniversaire ?`, a: `Oui: les demandes en mariage, les anniversaires et les réunions sont exactement la raison d'être de ce format. Expliquez-nous le plan lors de la réservation et nous organiserons la soirée autour.` },
            { q: `Deux personnes peuvent-elles réserver un cours de cuisine privé ?`, a: `La privatisation est tarifée pour des groupes de 6 à 14 personnes, donc pour deux, c'est rarement avantageux. La plupart des couples réservent La Table du Chef (max 8 personnes, 95 € par personne) ce qui reste intime. Si vous souhaitez vraiment la cuisine pour vous seuls, envoyez un e-mail à ciao@handmadepastaflorence.com et nous vous ferons un devis pour une session privée pour deux.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui: nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Avec un groupe privé, envoyez-nous simplement les besoins de chacun lors de la réservation.` },
            { q: `Comment réserver ?`, a: `Utilisez le bouton "Planifier votre soirée" pour démarrer une discussion WhatsApp, ou envoyez un e-mail à ciao@handmadepastaflorence.com. Les soirées privées sont planifiées personnellement, nous confirmerons donc les détails ensemble.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours de pâtes signature de 3 heures en petit groupe, 95 € par personne.` },
            { title: `Cours Team Building`, href: `/fr/cours-cuisine-team-building-florence/`, desc: `La cuisine privée pour les entreprises: on met les tabliers, on range les ordinateurs.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Promenade au marché à l'aube + cours de cuisine. 5 heures, max 6 personnes, 145 €.` },
          ],
          ctaLabel: `Planifier votre soirée`,
          prefill: 'florence',
          breadcrumbName: `Cours de Cuisine Privé`,
          product: {
            name: `La Longue Table Familiale: Cours de Cuisine Privé à Florence`,
            description: `Un festin privé de fabrication de pâtes à Florence pour 6–14 personnes : toute la cuisine de l'Oltrarno, deux chefs toscans, une longue table. Anniversaires, demandes en mariage, réunions.`,
            price: '680',
          },
        },
      },
      de: {
        slug: 'privater-kochkurs-florenz',
        title: `Privater Kochkurs in Florenz: Die lange Familientafel | Handmade Pasta Florence`,
        description: `Buchen Sie die ganze Küche für ein privates Pasta-Fest in Florenz: Geburtstage, Heiratsanträge, Treffen. 6–14 Gäste, abends, zwei toskanische Köche ganz für Sie allein. Ab 680 €.`,
        cl: {
          eyebrow: `Die lange Familientafel · private Veranstaltungen`,
          heading: `Ein privater Kochkurs in Florenz,`,
          headingItal: `ganz für Sie allein.`,
          lede: `Die ganze Küche, ein langer Tisch und zwei Köche, die nur mit Ihren Leuten kochen. Das ist das Bauernfest, das wir jahrelang auf unseren Agriturismi veranstaltet haben (Geburtstage, Heiratsanträge, Treffen), gebracht in das Herz von Florenz.`,
          image: { src: img.weddingCake, alt: `Ein Festkuchen bei einer privaten Veranstaltung an der langen Familientafel in Florenz`, w: 1080, h: 1433 },
          price: `ab 680 €`,
          priceNote: `private Küchenmiete`,
          facts: [
            { label: `Lokale Produkte`, value: `Saisonal, abgestimmt auf Ihr Menü`, icon: 'leaf' },
            { label: `Gruppengröße`, value: `6–14 Gäste`, icon: 'people' },
            { label: `Wann`, value: `abends · flexibel`, icon: 'calendar' },
            { label: `Format`, value: `gesamte Küchenmiete`, icon: 'home' },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito`, icon: 'map-pin' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
            { label: `Anfragen`, value: `innerhalb eines Tages beantwortet`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Das Fest an der langen Tafel`,
              paras: [
                `Auf unseren Agriturismi endet jede Feier an der langen Tafel: alle kochen, alle essen, niemand schaut auf die Uhr. Die lange Familientafel bringt diesen Abend in unsere Küche im Oltrarno: Ihre Gruppe rollt und faltet zusammen mit Endri und Marsel frische Pasta und setzt sich dann an das Festmahl, das sie gerade zubereitet hat, mit Wein aus der Region auf dem Tisch.`,
              ],
            },
            {
              title: `Gemacht für Anlässe`,
              paras: [
                `Geburtstage, Heiratsanträge, Jubiläen, Familientreffen, Freunde, die endlich in der gleichen Woche frei bekommen haben; wenn es einen Tisch verdient, passt es hierhin. Da die Küche exklusiv Ihnen gehört, können wir den Abend um den Anlass herum gestalten. Sagen Sie uns bei der Buchung, was Sie feiern, und wir planen es mit Ihnen über WhatsApp.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Ab 680 € für die private Küche, für Gruppen von 6–14 Personen; teilen Sie uns Ihre Gruppengröße mit und wir bestätigen ein Angebot.`,
                `Die Abende eignen sich am besten, und die Zeiten sind für private Buchungen flexibel.`,
                `Glutenfrei und allergiefreundlich ohne Aufpreis; erzählen Sie uns bei der Buchung von Ihrer Gruppe.`,
                `Nur Sie zwei? Die meisten Paare buchen <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> (max. 8 Gäste, 95 € pro Person), oder schreiben Sie uns eine E-Mail für ein privates Angebot für zwei.`,
                `Betriebsausflug statt Familienausflug? Sehen Sie sich unseren <a href="/de/teambuilding-kochkurs-florenz/">Teambuilding-Kochkurs</a> an.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie viele Personen fasst der private Kurs?`, a: `Die lange Familientafel bietet Platz für Gruppen von 6 bis 14 Personen an einem langen Tisch, wobei die gesamte Küche, und beide Köche, exklusiv Ihnen gehören.` },
            { q: `Wie funktioniert die Preisgestaltung?`, a: `Die private Miete beginnt bei 680 € für die Küche. Senden Sie uns Ihre Gruppengröße und Ihr Datum per WhatsApp oder E-Mail und wir bestätigen ein Angebot für Ihren Abend.` },
            { q: `Können Sie bei einer Überraschung helfen, einem Heiratsantrag oder einem Geburtstag?`, a: `Ja: Heiratsanträge, Geburtstage und Treffen sind genau das, wofür dieses Format gedacht ist. Teilen Sie uns den Plan bei der Buchung mit und wir gestalten den Abend darum herum.` },
            { q: `Können zwei Personen einen privaten Kochkurs buchen?`, a: `Die private Miete ist für Gruppen von 6–14 Personen kalkuliert, daher macht es für zwei selten Sinn. Die meisten Paare buchen Der Tisch des Küchenchefs (max. 8 Gäste, 95 € pro Person), der intim bleibt. Wenn Sie die Küche wirklich für sich allein haben möchten, senden Sie eine E-Mail an ciao@handmadepastaflorence.com und wir machen Ihnen ein Angebot für eine private Sitzung für zwei.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja: wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Bei einer privaten Gruppe senden Sie uns bei der Buchung einfach die Bedürfnisse aller zu.` },
            { q: `Wie buche ich?`, a: `Nutzen Sie die Schaltfläche "Planen Sie Ihren Abend", um einen WhatsApp-Chat zu starten, oder senden Sie eine E-Mail an ciao@handmadepastaflorence.com. Private Abende werden persönlich geplant, daher bestätigen wir die Details gemeinsam.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser 3-stündiger Signature-Pasta-Kurs in kleinen Gruppen, 95 € pro Person.` },
            { title: `Teambuilding-Kurs`, href: `/de/teambuilding-kochkurs-florenz/`, desc: `Die private Küche für Unternehmen: Schürzen an, Laptops weg.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Morgendlicher Marktspaziergang + Kochkurs. 5 Stunden, max. 6 Gäste, 145 €.` },
          ],
          ctaLabel: `Planen Sie Ihren Abend`,
          prefill: 'florence',
          breadcrumbName: `Privater Kochkurs`,
          product: {
            name: `Die lange Familientafel: Privater Kochkurs in Florenz`,
            description: `Ein privates Pasta-Fest in Florenz für 6–14 Gäste: die ganze Küche im Oltrarno, zwei toskanische Köche, ein langer Tisch. Geburtstage, Heiratsanträge, Treffen.`,
            price: '680',
          },
        },
      },
      zh: {
        slug: 'siren-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨私人烹饪课程：家庭长桌体验 | Handmade Pasta Florence`,
        description: `预订整个厨房，在佛罗伦萨举办私人的意面制作盛宴：生日、求婚、聚会。6–14位客人，晚上，两位托斯卡纳厨师专为您服务。680欧元起。`,
        cl: {
          eyebrow: `家庭长桌体验 · 私人活动`,
          heading: `佛罗伦萨私人烹饪课程，`,
          headingItal: `完全属于您的空间。`,
          lede: `整个厨房、一张长桌和两位厨师只为您和您的亲友烹饪。这是我们多年来在农庄里举办的农场盛宴：生日、求婚、聚会，现在带到了佛罗伦萨的中心。`,
          image: { src: img.weddingCake, alt: `佛罗伦萨“家庭长桌体验”私人活动中的庆祝蛋糕`, w: 1080, h: 1433 },
          price: `从 €680 起`,
          priceNote: `私人厨房包场`,
          facts: [
            { label: `本地食材`, value: `时令食材，根据您的菜单定制`, icon: 'leaf' },
            { label: `团队规模`, value: `6–14位客人`, icon: 'people' },
            { label: `时间`, value: `晚上 · 灵活`, icon: 'calendar' },
            { label: `形式`, value: `整个厨房包场`, icon: 'home' },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'map-pin' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
            { label: `咨询回复`, value: `一个工作日内`, icon: 'mail' },
          ],
          sections: [
            {
              title: `长桌盛宴`,
              paras: [
                `在我们的农庄里，长桌是每一场庆祝活动最终的归宿：每个人都在做饭，每个人都在吃，没有人看时间。“家庭长桌体验”将那个美好的夜晚带到了我们奥特拉诺的厨房：您的团队与Endri和Marsel一起擀面和折叠新鲜的意面，然后坐下来享用自己制作的盛宴，桌上还备有当地的葡萄酒。`,
              ],
            },
            {
              title: `专为特殊场合打造`,
              paras: [
                `生日、求婚、纪念日、家庭聚会、朋友们终于在同一周休假，只要它值得一张桌子来庆祝，它就适合这里。因为厨房完全属于您，我们可以围绕这个场合来设计这个夜晚。在预订时告诉我们您要庆祝什么，我们将通过WhatsApp与您一起计划。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `私人厨房起价680欧元，适合6至14人的团体，告诉我们您的团体人数，我们将为您确认报价。`,
                `晚上的时间最合适，私人预订的时间安排也很灵活。`,
                `免费提供无麸质和过敏友好选项，预订时告诉我们您团体的需求。`,
                `只有你们两个人？大多数情侣会预订 <a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌</a>（最多8位客人，每人95欧元），或者通过邮件联系我们获取双人私人报价。`,
                `公司团建而不是家庭聚会？请查看我们的 <a href="/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/">团队建设烹饪课程</a>。`,
              ],
            },
          ],
          faqs: [
            { q: `私人课程能容纳多少人？`, a: `“家庭长桌体验”可容纳6到14人的团体围坐在一张长桌旁，整个厨房和两位厨师都专为您服务。` },
            { q: `价格是怎么算的？`, a: `厨房的私人包场起价为680欧元。在WhatsApp或通过邮件将您的团体人数和日期发送给我们，我们将确认您这晚的报价。` },
            { q: `你们能帮忙准备惊喜吗，比如求婚或生日？`, a: `是的，求婚、生日和聚会正是这种形式的初衷。在预订时告诉我们您的计划，我们将围绕它来设计这个夜晚。` },
            { q: `两个人可以预订私人烹饪课程吗？`, a: `私人包场是为6–14人的团体定价的，所以两人的话通常不太划算。大多数情侣预订“主厨餐桌”：最多8位客人，每人95欧元，这同样很私密。如果您真的很想两人独享厨房，请发送邮件至 ciao@handmadepastaflorence.com，我们会为您提供双人私人课程的报价。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的，我们可以免费准备专门的无麸质面粉混合物和干净的操作台。对于私人团体，只需在预订时将每个人的需求发送给我们。` },
            { q: `我该如何预订？`, a: `使用“规划您的夜晚”按钮开始WhatsApp聊天，或发送电子邮件至 ciao@handmadepastaflorence.com。私人夜晚是专人计划的，因此我们将一起确认细节。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们招牌的3小时小团意面课程，每人95欧元。` },
            { title: `团队建设课程`, href: `/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/`, desc: `为企业提供的私人厨房，穿上围裙，收起电脑。` },
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨市场漫步 + 烹饪课程。5小时，最多6位客人，145欧元。` },
          ],
          ctaLabel: `规划您的夜晚`,
          prefill: 'florence',
          breadcrumbName: `私人烹饪课程`,
          product: {
            name: `家庭长桌体验：佛罗伦萨私人烹饪课程`,
            description: `在佛罗伦萨为6-14位客人举办的私人意面制作盛宴：整个奥特拉诺厨房、两位托斯卡纳农庄厨师、一张长桌。生日、求婚、聚会。`,
            price: '680',
          },
        },
      },
    },
  },

  'online': {
    floatingCta: true,
    courseMode: 'Online',
    locales: {
      en: {
        slug: 'online-pasta-making-class',
        title: `Live Online Pasta Making Class with Ingredient Kit | Handmade Pasta Florence`,
        description: `Cook fresh pasta live with two Tuscan chefs, streamed from our Florence kitchen, from €68 per person, with an optional fresh-pasta ingredient kit (00 flour, semola, rolling pin, recipe cards) shipped chilled to your door.`,
        cl: {
          eyebrow: `Live Online · streamed from Florence`,
          heading: `An online pasta making class,`,
          headingItal: `from our kitchen to yours.`,
          lede: `Same chefs, same Florence kitchen, live on your screen. Roll and fold fresh pasta along with Endri and Marsel in real time, with an ingredient kit that can arrive chilled at your door before class.`,
          image: { src: img.cookingClass, alt: `Our Florentine kitchen, where we stream the live online pasta making classes`, w: 981, h: 1603 },
          price: `from €68`,
          priceNote: `per person`,
          facts: [
            { label: `Local Products`, value: `Tuscan ingredients, list sent ahead`, icon: 'leaf' },
            { label: `Format`, value: `live video, hands-on`, icon: 'laptop' },
            { label: `Streamed from`, value: `our Florence kitchen`, icon: 'home' },
            { label: `Kit`, value: `optional, +€34 shipped`, icon: 'package' },
            { label: `Times`, value: `shown in your time zone`, icon: 'clock' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
            { label: `Great as`, value: `a gift`, icon: 'gift' },
          ],
          sections: [
            {
              title: `How does a live online pasta class work?`,
              paras: [
                `This is not a pre-recorded video. You cook live with the same two chefs who teach in Florence, streamed from the same kitchen. You see their hands, they see your dough, and they talk you through every stage (mixing, kneading, rolling, shaping) until there’s fresh pasta on your counter.`,
                `When you pick a date, the booking calendar shows class times in both Florence time and your own time zone, so there’s no arithmetic at midnight.`,
              ],
            },
            {
              title: `The ingredient kit`,
              paras: [
                `Add the kit at booking (+€34 per order) and we ship it chilled to your door: 00 flour, semola, a rolling pin and our recipe cards; everything specialty, so your kitchen only needs the basics. Prefer to shop yourself? Book without the kit and tell us on WhatsApp; we’ll walk you through what to have ready.`,
              ],
            },
            {
              title: `A gift that isn’t a gadget`,
              paras: [
                `A live class (with the kit on the doorstep) has become our most-loved gift order: for the friend who dreams about Italy, the parent who taught you to cook, or the couple you can’t buy objects for anymore. Use the “Gift a class” link in the footer or just tell us it’s a gift when you book.`,
              ],
            },
          ],
          faqs: [
            { q: `What do I need at home for the class?`, a: `A counter or table to work on and basic kitchen staples. If you add the ingredient kit, the specialty items (00 flour, semola, a rolling pin and recipe cards) arrive chilled at your door. If not, tell us when you book and we’ll walk you through what to have ready.` },
            { q: `What about time zones?`, a: `The booking calendar shows every class time in both Florence time and your local time, side by side, before you confirm.` },
            { q: `Is it really live? Can I ask questions?`, a: `Yes: it’s a live stream from our Florence kitchen with the same chefs who teach in person. Ask anything mid-knead; that’s the point.` },
            { q: `Can I gift an online class?`, a: `Absolutely: it’s one of our favourite orders to prepare. Book as normal and tell us it’s a gift, and we’ll help you arrange the kit delivery and timing.` },
            { q: `How do I book and pay?`, a: `Use the “Book the online class” button to pick a date and time. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Coming to Florence after all? The in-person original, €95.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Dawn market walk + cooking class in Florence, €145.` },
            { title: `The four shapes, explained`, href: `/pasta-shapes/`, desc: `Meet pici, pappardelle, tagliatelle and tortelli before class.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `A private feast in Florence for 6–14, from €680.` },
          ],
          ctaLabel: `Book the online class`,
          prefill: 'online',
          breadcrumbName: `Live Online Pasta Class`,
          product: {
            name: `Live Online Pasta Making Class, Handmade Pasta Florence`,
            description: `A live, hands-on online pasta making class streamed from a Florence kitchen by two Tuscan agriturismo head chefs, with an optional fresh-pasta ingredient kit shipped chilled to your door.`,
            price: '68',
          },
        },
      },
      it: {
        slug: 'corso-pasta-online',
        title: `Corso di Pasta in Diretta Online con Kit Ingredienti | Handmade Pasta Florence`,
        description: `Cucina pasta fresca in diretta con due chef toscani, trasmesso dalla nostra cucina di Firenze, da €68 a persona, con kit ingredienti per pasta fresca opzionale (farina 00, semola, mattarello, schede ricette) spedito refrigerato a casa tua.`,
        cl: {
          eyebrow: `In Diretta Online · trasmesso da Firenze`,
          heading: `Un corso di pasta online,`,
          headingItal: `dalla nostra cucina alla tua.`,
          lede: `Stessi chef, stessa cucina fiorentina, in diretta sul tuo schermo. Stendi e piega la pasta fresca insieme a Endri e Marsel in tempo reale, con un kit di ingredienti che può arrivare refrigerato alla tua porta prima del corso.`,
          image: { src: img.cookingClass, alt: `La nostra cucina fiorentina, da dove trasmettiamo i corsi di pasta fresca online in diretta`, w: 981, h: 1603 },
          price: `da €68`,
          priceNote: `a persona`,
          facts: [
            { label: `Prodotti Locali`, value: `Ingredienti toscani, lista inviata in anticipo`, icon: 'leaf' },
            { label: `Formato`, value: `video in diretta, pratico`, icon: 'laptop' },
            { label: `Trasmesso da`, value: `la nostra cucina a Firenze`, icon: 'home' },
            { label: `Kit`, value: `opzionale, +€34 spedito`, icon: 'package' },
            { label: `Orari`, value: `mostrati nel tuo fuso orario`, icon: 'clock' },
            { label: `Lingua`, value: `Inglese o Italiano`, icon: 'globe' },
            { label: `Ottimo come`, value: `regalo`, icon: 'gift' },
          ],
          sections: [
            {
              title: `Come funziona un corso di pasta online in diretta?`,
              paras: [
                `Questo non è un video pre-registrato. Cucini dal vivo con gli stessi due chef che insegnano in presenza, trasmessi dalla stessa cucina. Vedi le loro mani, loro vedono il tuo impasto e ti guidano attraverso ogni fase (miscelare, impastare, stendere, dare forma) finché non avrai della pasta fresca sul tuo bancone.`,
                `Quando scegli una data, il calendario delle prenotazioni mostra gli orari del corso sia nel fuso orario di Firenze che nel tuo, così non ci sono calcoli matematici da fare a mezzanotte.`,
              ],
            },
            {
              title: `Il kit ingredienti`,
              paras: [
                `Aggiungi il kit al momento della prenotazione (+€34 a ordine) e lo spediamo refrigerato a casa tua: farina 00, semola, un mattarello e le nostre schede con le ricette; tutte specialità, così la tua cucina ha bisogno solo delle basi. Preferisci fare la spesa tu? Prenota senza il kit e scrivici su WhatsApp; ti guideremo su cosa preparare.`,
              ],
            },
            {
              title: `Un regalo che non è un gadget`,
              paras: [
                `Un corso in diretta (con il kit consegnato a casa) è diventato l'ordine regalo più amato: per l'amico che sogna l'Italia, per il genitore che ti ha insegnato a cucinare o per la coppia a cui non puoi più comprare oggetti. Usa il link "Regala un corso" nel footer o semplicemente dicci che è un regalo quando prenoti.`,
              ],
            },
          ],
          faqs: [
            { q: `Di cosa ho bisogno a casa per il corso?`, a: `Un bancone o un tavolo su cui lavorare e i prodotti di base della cucina. Se aggiungi il kit ingredienti, le specialità (farina 00, semola, un mattarello e le schede ricette) arriveranno refrigerate a casa tua. Altrimenti, diccelo al momento della prenotazione e ti guideremo su cosa preparare.` },
            { q: `E per i fusi orari?`, a: `Il calendario delle prenotazioni mostra ogni orario di corso sia nel fuso orario di Firenze che in quello locale, fianco a fianco, prima della conferma.` },
            { q: `È davvero in diretta? Posso fare domande?`, a: `Sì: è una diretta streaming dalla nostra cucina di Firenze con gli stessi chef che insegnano in presenza. Chiedi qualsiasi cosa a metà impasto; è questo il bello.` },
            { q: `Posso regalare un corso online?`, a: `Assolutamente: è uno dei nostri ordini preferiti da preparare. Prenota normalmente dicendoci che è un regalo, e ti aiuteremo a organizzare la consegna del kit e i tempi.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota il corso online" per scegliere data e ora. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Verrai comunque a Firenze? L'originale corso in presenza, €95.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Passeggiata al mercato all'alba + corso di cucina a Firenze, €145.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `Un banchetto privato a Firenze per 6–14 persone, da €680.` },
          ],
          ctaLabel: `Prenota il corso online`,
          prefill: 'online',
          breadcrumbName: `Corso di Pasta Online`,
          product: {
            name: `Corso di Pasta in Diretta Online, Handmade Pasta Florence`,
            description: `Un corso di pasta online pratico e in diretta trasmesso da una cucina fiorentina da due chef toscani, con l'opzione di un kit di ingredienti per pasta fresca spedito refrigerato alla tua porta.`,
            price: '68',
          },
        },
      },
      fr: {
        slug: 'cours-pates-en-ligne',
        title: `Cours de Pâtes en Direct en Ligne avec Kit d'Ingrédients | Handmade Pasta Florence`,
        description: `Cuisinez des pâtes fraîches en direct avec deux chefs toscans, diffusé depuis notre cuisine de Florence, à partir de 68 € par personne, avec un kit d'ingrédients opitonnel (farine 00, semoule, rouleau à pâtisserie, fiches recettes) livré frais à votre porte.`,
        cl: {
          eyebrow: `En Direct en Ligne · diffusé depuis Florence`,
          heading: `Un cours de pâtes en ligne,`,
          headingItal: `de notre cuisine à la vôtre.`,
          lede: `Mêmes chefs, même cuisine florentine, en direct sur votre écran. Étalez et pliez des pâtes fraîches avec Endri et Marsel en temps réel, avec un kit d'ingrédients qui peut arriver frais à votre porte avant le cours.`,
          image: { src: img.cookingClass, alt: `Notre cuisine florentine, d'où nous diffusons les cours de pâtes en ligne en direct`, w: 981, h: 1603 },
          price: `à partir de 68 €`,
          priceNote: `par personne`,
          facts: [
            { label: `Produits Locaux`, value: `Ingrédients toscans, liste envoyée à l'avance`, icon: 'leaf' },
            { label: `Format`, value: `vidéo en direct, pratique`, icon: 'laptop' },
            { label: `Diffusé de`, value: `notre cuisine à Florence`, icon: 'home' },
            { label: `Kit`, value: `optionnel, +34 € livré`, icon: 'package' },
            { label: `Horaires`, value: `affichés dans votre fuseau horaire`, icon: 'clock' },
            { label: `Langue`, value: `Anglais ou Italien`, icon: 'globe' },
            { label: `Génial comme`, value: `cadeau`, icon: 'gift' },
          ],
          sections: [
            {
              title: `Comment fonctionne un cours de pâtes en ligne en direct ?`,
              paras: [
                `Ce n'est pas une vidéo préenregistrée. Vous cuisinez en direct avec les deux mêmes chefs qui enseignent à Florence, diffusé depuis la même cuisine. Vous voyez leurs mains, ils voient votre pâte, et ils vous guident à chaque étape (mélange, pétrissage, étalage, façonnage) jusqu'à ce qu'il y ait des pâtes fraîches sur votre plan de travail.`,
                `Lorsque vous choisissez une date, le calendrier de réservation affiche les horaires des cours à la fois à l'heure de Florence et dans votre propre fuseau horaire, il n'y a donc pas de calcul mental à faire à minuit.`,
              ],
            },
            {
              title: `Le kit d'ingrédients`,
              paras: [
                `Ajoutez le kit lors de la réservation (+34 € par commande) et nous le livrons frais à votre porte : farine 00, semoule, un rouleau à pâtisserie et nos fiches de recettes; toutes les spécialités, pour que votre cuisine n'ait besoin que des bases. Vous préférez faire les courses vous-même ? Réservez sans le kit et dites-le-nous sur WhatsApp ; nous vous indiquerons ce qu'il faut préparer.`,
              ],
            },
            {
              title: `Un cadeau qui n'est pas un gadget`,
              paras: [
                `Un cours en direct (avec le kit sur le pas de la porte) est devenu notre commande de cadeau la plus appréciée: pour l'ami qui rêve de l'Italie, le parent qui vous a appris à cuisiner, ou le couple à qui vous ne pouvez plus offrir d'objets. Utilisez le lien "Offrir un cours" dans le pied de page ou dites-nous simplement que c'est un cadeau lors de votre réservation.`,
              ],
            },
          ],
          faqs: [
            { q: `De quoi ai-je besoin à la maison pour le cours ?`, a: `D'un plan de travail ou d'une table pour travailler et d'articles de cuisine de base. Si vous ajoutez le kit d'ingrédients, les spécialités (farine 00, semoule, rouleau à pâtisserie et fiches de recettes) arrivent fraîches à votre porte. Sinon, dites-le-nous lors de votre réservation et nous vous expliquerons ce qu'il faut préparer.` },
            { q: `Et les fuseaux horaires ?`, a: `Le calendrier de réservation affiche chaque heure de cours à l'heure de Florence et à votre heure locale, côte à côte, avant que vous ne confirmiez.` },
            { q: `Est-ce vraiment en direct ? Puis-je poser des questions ?`, a: `Oui: c'est une diffusion en direct de notre cuisine de Florence avec les mêmes chefs qui enseignent en personne. Demandez n'importe quoi en plein pétrissage ; c'est le but.` },
            { q: `Puis-je offrir un cours en ligne ?`, a: `Absolument: c'est l'une de nos commandes préférées à préparer. Réservez normalement et dites-nous que c'est un cadeau, et nous vous aiderons à organiser la livraison du kit et le moment idéal.` },
            { q: `Comment réserver et payer ?`, a: `Utilisez le bouton "Réserver le cours en ligne" pour choisir une date et une heure. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Vous venez à Florence finalement ? L'original en personne, 95 €.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Promenade au marché à l'aube + cours de cuisine à Florence, 145 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Un festin privé à Florence pour 6–14 personnes, à partir de 680 €.` },
          ],
          ctaLabel: `Réserver le cours en ligne`,
          prefill: 'online',
          breadcrumbName: `Cours de Pâtes en Ligne`,
          product: {
            name: `Cours de Pâtes en Direct en Ligne, Handmade Pasta Florence`,
            description: `Un cours de fabrication de pâtes en ligne, en direct et pratique, diffusé depuis une cuisine de Florence par deux chefs d'agritourisme toscans, avec un kit d'ingrédients optionnel livré frais à votre porte.`,
            price: '68',
          },
        },
      },
      de: {
        slug: 'online-pasta-kurs',
        title: `Live-Online-Pasta-Kurs mit Zutaten-Kit | Handmade Pasta Florence`,
        description: `Kochen Sie live frische Pasta mit zwei toskanischen Köchen, gestreamt aus unserer Küche in Florenz, ab 68 € pro Person, mit einem optionalen Zutaten-Kit für frische Pasta (00-Mehl, Semola, Nudelholz, Rezeptkarten), das gekühlt an Ihre Tür geliefert wird.`,
        cl: {
          eyebrow: `Live Online · gestreamt aus Florenz`,
          heading: `Ein Online-Pasta-Kurs,`,
          headingItal: `von unserer Küche in Ihre.`,
          lede: `Gleiche Köche, gleiche Florentiner Küche, live auf Ihrem Bildschirm. Rollen und falten Sie frische Pasta zusammen mit Endri und Marsel in Echtzeit, mit einem Zutaten-Kit, das vor dem Kurs gekühlt an Ihre Tür kommen kann.`,
          image: { src: img.cookingClass, alt: `Unsere Florentiner Küche, von der aus wir die Live-Online-Pasta-Kurse streamen`, w: 981, h: 1603 },
          price: `ab 68 €`,
          priceNote: `pro Person`,
          facts: [
            { label: `Lokale Produkte`, value: `Toskanische Zutaten, Liste vorab zugesandt`, icon: 'leaf' },
            { label: `Format`, value: `Live-Video, praktisch`, icon: 'laptop' },
            { label: `Gestreamt aus`, value: `unserer Küche in Florenz`, icon: 'home' },
            { label: `Kit`, value: `optional, +34 € geliefert`, icon: 'package' },
            { label: `Zeiten`, value: `in Ihrer Zeitzone angezeigt`, icon: 'clock' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
            { label: `Ideal als`, value: `Geschenk`, icon: 'gift' },
          ],
          sections: [
            {
              title: `Wie funktioniert ein Live-Online-Pasta-Kurs?`,
              paras: [
                `Dies ist kein aufgezeichnetes Video. Sie kochen live mit denselben zwei Köchen, die in Florenz unterrichten, gestreamt aus derselben Küche. Sie sehen ihre Hände, sie sehen Ihren Teig, und sie führen Sie durch jede Phase (Mischen, Kneten, Rollen, Formen), bis frische Pasta auf Ihrer Arbeitsfläche liegt.`,
                `Wenn Sie ein Datum auswählen, zeigt der Buchungskalender die Kurszeiten sowohl in der Florentiner Zeit als auch in Ihrer eigenen Zeitzone an, sodass es um Mitternacht keine Rechenaufgaben gibt.`,
              ],
            },
            {
              title: `Das Zutaten-Kit`,
              paras: [
                `Fügen Sie das Kit bei der Buchung hinzu (+34 € pro Bestellung) und wir liefern es gekühlt an Ihre Tür: 00-Mehl, Semola, ein Nudelholz und unsere Rezeptkarten; alles Spezialitäten, sodass Ihre Küche nur die Grundlagen benötigt. Möchten Sie lieber selbst einkaufen? Buchen Sie ohne das Kit und sagen Sie es uns über WhatsApp; wir führen Sie durch das, was Sie bereithalten sollten.`,
              ],
            },
            {
              title: `Ein Geschenk, das kein Gadget ist`,
              paras: [
                `Ein Live-Kurs (mit dem Kit vor der Haustür) hat sich zu unserer beliebtesten Geschenkbestellung entwickelt: für den Freund, der von Italien träumt, das Elternteil, das Ihnen das Kochen beigebracht hat, oder das Paar, für das man keine Gegenstände mehr kaufen kann. Nutzen Sie den Link "Einen Kurs verschenken" in der Fußzeile oder sagen Sie uns einfach bei der Buchung, dass es ein Geschenk ist.`,
              ],
            },
          ],
          faqs: [
            { q: `Was brauche ich zu Hause für den Kurs?`, a: `Eine Arbeitsfläche oder einen Tisch zum Arbeiten und grundlegende Küchenutensilien. Wenn Sie das Zutaten-Kit hinzufügen, kommen die Spezialartikel (00-Mehl, Semola, ein Nudelholz und Rezeptkarten) gekühlt an Ihre Tür. Wenn nicht, sagen Sie es uns bei der Buchung und wir erklären Ihnen, was Sie bereithalten sollten.` },
            { q: `Was ist mit Zeitzonen?`, a: `Der Buchungskalender zeigt jede Kurszeit vor Ihrer Bestätigung sowohl in der Florentiner Zeit als auch in Ihrer lokalen Zeit nebeneinander an.` },
            { q: `Ist es wirklich live? Kann ich Fragen stellen?`, a: `Ja: es ist ein Live-Stream aus unserer Küche in Florenz mit denselben Köchen, die persönlich unterrichten. Fragen Sie alles mitten im Kneten; das ist der Sinn der Sache.` },
            { q: `Kann ich einen Online-Kurs verschenken?`, a: `Absolut: es gehört zu unseren Lieblingsbestellungen, die wir vorbereiten. Buchen Sie wie gewohnt und sagen Sie uns, dass es ein Geschenk ist, und wir helfen Ihnen, die Lieferung des Kits und den Zeitpunkt zu organisieren.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Online-Kurs buchen", um Datum und Uhrzeit auszuwählen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Kommen Sie doch nach Florenz? Das Original vor Ort, 95 €.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Morgendlicher Marktspaziergang + Kochkurs in Florenz, 145 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Ein privates Fest in Florenz für 6–14 Personen, ab 680 €.` },
          ],
          ctaLabel: `Online-Kurs buchen`,
          prefill: 'online',
          breadcrumbName: `Live-Online-Pasta-Kurs`,
          product: {
            name: `Live-Online-Pasta-Kurs, Handmade Pasta Florence`,
            description: `Ein praktischer Online-Pasta-Kurs, gestreamt aus einer Florentiner Küche von zwei toskanischen Agriturismo-Köchen, mit einem optionalen Zutaten-Kit, das gekühlt an Ihre Tür geliefert wird.`,
            price: '68',
          },
        },
      },
      zh: {
        slug: 'zaixian-yidali-mian-kecheng',
        title: `含食材包的在线直播意面课程 | Handmade Pasta Florence`,
        description: `与两位托斯卡纳厨师一起进行在线直播烹饪，从我们的佛罗伦萨厨房为您实时转播，每人68欧元起，可选择将新鲜意面食材包（00号面粉、杜兰小麦粉、擀面杖、食谱卡）冷藏配送到您家。`,
        cl: {
          eyebrow: `在线直播 · 佛罗伦萨实时转播`,
          heading: `一门在线的意面课程，`,
          headingItal: `从我们的厨房到您的厨房。`,
          lede: `同样的厨师，同样的佛罗伦萨厨房，在您的屏幕上直播。与Endri和Marsel一起实时擀面和折叠新鲜的意面，食材包可以在课前冷藏送到您家门口。`,
          image: { src: img.cookingClass, alt: `我们的佛罗伦萨厨房，也是我们转播在线意面课程的地方`, w: 981, h: 1603 },
          price: `从 €68 起`,
          priceNote: `每人`,
          facts: [
            { label: `本地食材`, value: `托斯卡纳食材，清单提前发送`, icon: 'leaf' },
            { label: `形式`, value: `直播视频，动手实践`, icon: 'laptop' },
            { label: `转播自`, value: `我们的佛罗伦萨厨房`, icon: 'home' },
            { label: `食材包`, value: `可选，+€34 配送费`, icon: 'package' },
            { label: `时间`, value: `以您的时区显示`, icon: 'clock' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
            { label: `非常适合`, value: `作为礼物`, icon: 'gift' },
          ],
          sections: [
            {
              title: `在线直播意面课程是如何进行的？`,
              paras: [
                `这不是预先录制的视频。您将与在佛罗伦萨亲自授课的两位主厨一起进行实时烹饪，并从同一个厨房进行转播。您能看到他们的手，他们也能看到您的面团，并会在每个阶段（混合、揉面、擀面、塑形）与您交流，直到您的操作台上出现新鲜的意面。`,
                `当您选择日期时，预订日历会同时显示佛罗伦萨时间和您自己时区的课程时间，所以您不需要在午夜进行时差计算。`,
              ],
            },
            {
              title: `食材包`,
              paras: [
                `在预订时添加食材包（每份订单+34欧元），我们将冷藏配送到您家：00号面粉、杜兰小麦粉（semola）、一根擀面杖和我们的食谱卡，全都是特色食材，因此您的厨房只需准备基本用品。更喜欢自己去买？无需添加食材包进行预订，并在WhatsApp上告诉我们；我们将指导您需要准备什么。`,
              ],
            },
            {
              title: `不是普通物件的贴心礼物`,
              paras: [
                `一门直播课程（附送送货上门的食材包）已成为我们最受欢迎的礼物订单：送给梦想去意大利的朋友、教您做饭的父母，或者您已经不知道该买什么礼物的伴侣。使用底部的“赠送课程”链接，或者在预订时直接告诉我们这是一份礼物。`,
              ],
            },
          ],
          faqs: [
            { q: `课程需要在家里准备什么？`, a: `一个可以操作的台面或桌子，以及基本的厨房主食。如果您添加了食材包，特色物品（00号面粉、杜兰小麦粉、擀面杖和食谱卡）将会冷藏送到您家门口。如果没有，请在预订时告诉我们，我们将指导您准备什么。` },
            { q: `时差问题怎么解决？`, a: `在您确认之前，预订日历会并排显示佛罗伦萨时间和您当地时间的每一个课程时间。` },
            { q: `这真的是直播吗？我可以提问吗？`, a: `是的，这是从我们的佛罗伦萨厨房进行的实时直播，由亲自授课的相同厨师主持。您可以在揉面中途询问任何问题；这正是直播的意义所在。` },
            { q: `我可以将在线课程作为礼物赠送吗？`, a: `绝对可以，这是我们最喜欢准备的订单之一。像往常一样预订并告诉我们这是一份礼物，我们将帮助您安排食材包的配送和时间。` },
            { q: `我该如何预订和付款？`, a: `使用“预订在线课程”按钮选择日期和时间。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `您还是要来佛罗伦萨吗？体验原汁原味的线下课程，95欧元。` },
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨市场漫步 + 佛罗伦萨的烹饪课程，145欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `在佛罗伦萨为6-14人准备的私人盛宴，680欧元起。` },
          ],
          ctaLabel: `预订在线课程`,
          prefill: 'online',
          breadcrumbName: `在线直播意面课程`,
          product: {
            name: `在线直播意面课程，Handmade Pasta Florence`,
            description: `一门实时的、动手实践的在线意面制作课程，由两位托斯卡纳农庄厨师从佛罗伦萨厨房转播，可选购新鲜意面食材包冷藏配送到家。`,
            price: '68',
          },
        },
      },
    },
  },

  'team-building': {
    floatingCta: false,
    locales: {
      en: {
        slug: 'team-building-cooking-class-florence',
        title: `Food Teambuilding in Florence: Private Pasta-Making Class, 6–14 People | Handmade Pasta Florence`,
        description: `A hands-on food teambuilding activity in Florence: your team rolls fresh pasta with two English-speaking Tuscan chefs, then shares the lunch it made. Private kitchen buyout for 6–14 people, wine pairing and dietary options.`,
        cl: {
          eyebrow: `For companies · private kitchen buyout`,
          heading: `Team building, with`,
          headingItal: `flour on your hands.`,
          lede: `Aprons on, laptops away. Your team takes over our Oltrarno kitchen with two English-speaking chefs, rolls and folds fresh pasta side by side, and then sits down to a long lunch it made itself. Five minutes from the Ponte Vecchio.`,
          image: { src: img.cookingClassGuests, alt: `A group cooking together at a private team building pasta class in Florence`, w: 800, h: 1067 },
          price: `Private buyout`,
          priceNote: `6–14 people · quoted per group`,
          facts: [
            { label: `Local Products`, value: `Seasonal Tuscan produce, sourced fresh`, icon: 'leaf' },
            { label: `Group size`, value: `6–14 people`, icon: 'people' },
            { label: `Format`, value: `private kitchen buyout`, icon: 'home' },
            { label: `Hosts`, value: `English-speaking chefs`, icon: 'chef-hat' },
            { label: `Options`, value: `wine pairing · dietary`, icon: 'tag' },
            { label: `Where`, value: `5 min from Ponte Vecchio`, icon: 'map-pin' },
            { label: `Reply time`, value: `within one working day`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Why does pasta making work as a team building activity?`,
              paras: [
                `Fresh pasta is the rare team activity where nobody can hide behind a screen and nobody needs prior skill. Everyone starts with the same pile of flour, everyone’s first pici is crooked, and an hour later the table is covered in something the team actually made together. Then you eat it, which beats a debrief.`,
                `Of all the food teambuilding ideas in Florence (wine tastings, tasting walks, another aperitivo), this is the one where nobody stands at the back watching. And the kitchen is exclusively yours: no strangers, your pace, your dietary needs handled in advance.`,
              ],
            },
            {
              title: `How the session runs`,
              paras: [
                `The format follows our signature class: hands-on from the first minute, two head chefs hosting, and a sit-down lunch of what the team made, with local wine if you want it. As a private booking, timing is flexible around your agenda; most teams take the class in place of a lunch or as the evening wind-down of an offsite.`,
              ],
            },
            {
              title: `Hotels, agencies & tour operators`,
              paras: [
                `We also partner with hotels, B&amp;Bs, agriturismi, tour operators and travel planners: partner rates, priority booking, fixed time slots and fast confirmation. If you’re building Florence itineraries for guests or clients, <a href="/#business">see how we work with businesses</a> or email us directly.`,
              ],
            },
            {
              title: `How to enquire`,
              paras: [
                `Email <a href="mailto:ciao@handmadepastaflorence.com?subject=Team%20building%20enquiry">ciao@handmadepastaflorence.com</a> with your team size, preferred dates and anything we should know. We reply within one working day with availability and a quote.`,
              ],
            },
          ],
          faqs: [
            { q: `How big can the group be?`, a: `The private kitchen hosts teams of 6 to 14 people. For larger companies we can discuss running consecutive sessions; email us with your numbers.` },
            { q: `Is the class run in English?`, a: `Yes: both chefs host in English (or Italian, if your team prefers). Instructions are hands-on and visual, so mixed-language teams work fine too.` },
            { q: `Can you handle dietary requirements?`, a: `Yes. Gluten-free stations at no extra charge, and other allergies and preferences handled in advance; send us the list when you book and every team member cooks and eats.` },
            { q: `How does pricing work?`, a: `Team sessions are quoted per group, based on size, timing and add-ons like wine pairing. Email ciao@handmadepastaflorence.com and you’ll have a quote within one working day.` },
          ],
          related: [
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The same private kitchen for personal celebrations, from €680.` },
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature small-group class, if your team is 8 or fewer, €95 each.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Remote team? Cook together from anywhere, live, from €68.` },
            { title: `Things to do in the Oltrarno`, href: `/blog/things-to-do-in-oltrarno-florence/`, desc: `Build the rest of the offsite around the neighbourhood.` },
          ],
          ctaLabel: `Get a quote by email`,
          emailSubject: `Team building enquiry`,
          breadcrumbName: `Team Building Cooking Class`,
          service: {
            name: `Team Building Cooking Class in Florence`,
            description: `Food teambuilding in Florence for companies: a private team building cooking class with a whole-kitchen buyout for 6–14 people, hosted in English by two Tuscan agriturismo head chefs, with wine pairing and dietary options.`,
          },
        },
      },
      it: {
        slug: 'corso-cucina-team-building-firenze',
        title: `Teambuilding in Cucina a Firenze: Corso di Pasta Privato per Team, 6–14 Persone | Handmade Pasta Florence`,
        description: `Un teambuilding in cucina privato e pratico a Firenze. Il tuo team stende la pasta fresca con due chef toscani, per poi condividere il pranzo preparato. Cucina privata per 6–14 persone, abbinamento vini e opzioni dietetiche.`,
        cl: {
          eyebrow: `Per le aziende · uso esclusivo della cucina`,
          heading: `Team building, con`,
          headingItal: `le mani in pasta.`,
          lede: `Grembiuli indossati, laptop riposti. Il tuo team prende possesso della nostra cucina in Oltrarno con due chef toscani, stende e piega la pasta fresca fianco a fianco, e poi si siede per un lungo pranzo preparato con le proprie mani. A cinque minuti da Ponte Vecchio.`,
          image: { src: img.cookingClassGuests, alt: `Un gruppo cucina insieme a un corso di pasta privato per team building a Firenze`, w: 800, h: 1067 },
          price: `Evento Privato`,
          priceNote: `6–14 persone · preventivo per gruppo`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani di stagione, freschi`, icon: 'leaf' },
            { label: `Dimensione gruppo`, value: `6–14 persone`, icon: 'people' },
            { label: `Formato`, value: `uso esclusivo della cucina`, icon: 'home' },
            { label: `Host`, value: `chef professionisti`, icon: 'chef-hat' },
            { label: `Opzioni`, value: `abbinamento vini · dietetiche`, icon: 'tag' },
            { label: `Dove`, value: `5 min da Ponte Vecchio`, icon: 'map-pin' },
            { label: `Tempo di risposta`, value: `entro 24 ore`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Perché il teambuilding in cucina funziona così bene?`,
              paras: [
                `La pasta fresca è la rara attività di squadra in cui nessuno può nascondersi dietro uno schermo e nessuno ha bisogno di abilità pregresse. Tutti iniziano con lo stesso mucchio di farina, i primi pici di tutti sono storti e un'ora dopo il tavolo è coperto di qualcosa che il team ha effettivamente realizzato insieme. Poi lo si mangia, il che è meglio di un meeting riassuntivo.`,
                `La cucina è esclusivamente tua: niente estranei, il tuo ritmo, le tue esigenze alimentari gestite in anticipo.`,
              ],
            },
            {
              title: `Come si svolge la sessione`,
              paras: [
                `Il formato segue il nostro corso classico: pratico dal primo minuto, due head chef che ospitano, e un pranzo seduti con ciò che il team ha preparato, con vino locale se lo desideri. Essendo una prenotazione privata, l'orario è flessibile attorno alla tua agenda; la maggior parte dei team sceglie il corso al posto di un pranzo o come conclusione serale di un meeting aziendale.`,
              ],
            },
            {
              title: `Hotel, agenzie & tour operator`,
              paras: [
                `Collaboriamo anche con hotel, B&amp;B, agriturismi, tour operator e organizzatori di viaggi: tariffe partner, prenotazione prioritaria, fasce orarie fisse e conferma rapida. Se stai creando itinerari a Firenze per ospiti o clienti, <a href="/it/#business">scopri come lavoriamo con le aziende</a> o inviaci un'e-mail direttamente.`,
              ],
            },
            {
              title: `Come richiedere informazioni`,
              paras: [
                `Invia un'e-mail a <a href="mailto:ciao@handmadepastaflorence.com?subject=Richiesta%20team%20building">ciao@handmadepastaflorence.com</a> con le dimensioni del tuo team, le date preferite e tutto ciò che dovremmo sapere. Rispondiamo entro un giorno lavorativo con disponibilità e preventivo.`,
              ],
            },
          ],
          faqs: [
            { q: `Quanto può essere grande il gruppo?`, a: `La cucina privata ospita team da 6 a 14 persone. Per aziende più grandi possiamo discutere di sessioni consecutive; inviaci un'e-mail con i vostri numeri.` },
            { q: `Il corso si tiene in Inglese o Italiano?`, a: `Entrambi: gli chef possono tenere il corso in Inglese o Italiano, a seconda delle preferenze del vostro team. Le istruzioni sono pratiche e visive, quindi anche team misti o internazionali si trovano bene.` },
            { q: `Potete gestire le esigenze alimentari?`, a: `Sì. Postazioni senza glutine senza costi aggiuntivi, e altre allergie e preferenze gestite in anticipo; inviaci l'elenco quando prenoti e ogni membro del team cucinerà e mangerà.` },
            { q: `Come funzionano i prezzi?`, a: `Le sessioni per i team sono quotate per gruppo, in base alle dimensioni, ai tempi e ad eventuali aggiunte come l'abbinamento dei vini. Invia un'e-mail a ciao@handmadepastaflorence.com e riceverai un preventivo entro un giorno lavorativo.` },
          ],
          related: [
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `La stessa cucina privata per celebrazioni personali, da €680.` },
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro classico corso per piccoli gruppi, se il team è di 8 o meno, €95 ciascuno.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Team da remoto? Cucinate insieme da ovunque, in diretta, da €68.` },
          ],
          ctaLabel: `Richiedi un preventivo`,
          emailSubject: `Richiesta team building`,
          breadcrumbName: `Corso per Team Building`,
          service: {
            name: `Corso di Cucina per Team Building a Firenze`,
            description: `Corsi di cucina per team building privati a Firenze per le aziende: affitto dell'intera cucina per 6–14 persone, tenuto in Italiano o Inglese da due chef toscani, con opzioni di abbinamento vini e dietetiche.`,
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-team-building-florence',
        title: `Teambuilding Culinaire à Florence: Cours de Pâtes Privé, 6–14 Personnes | Handmade Pasta Florence`,
        description: `Une activité de teambuilding culinaire pratique à Florence : votre équipe prépare des pâtes fraîches avec deux chefs toscans, puis partage le déjeuner qu'elle a préparé. Privatisation de la cuisine pour 6–14 personnes, accords mets-vins et options diététiques.`,
        cl: {
          eyebrow: `Pour les entreprises · privatisation de la cuisine`,
          heading: `Team building, avec`,
          headingItal: `les mains dans la farine.`,
          lede: `Tabliers enfilés, ordinateurs rangés. Votre équipe prend le contrôle de notre cuisine de l'Oltrarno avec deux chefs toscans, étale et plie des pâtes fraîches côte à côte, puis s'assoit pour un long déjeuner qu'elle a elle-même préparé. À cinq minutes du Ponte Vecchio.`,
          image: { src: img.cookingClassGuests, alt: `Un groupe cuisinant ensemble lors d'un cours privé de pâtes pour team building à Florence`, w: 800, h: 1067 },
          price: `Événement Privé`,
          priceNote: `6–14 personnes · sur devis`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans de saison, frais`, icon: 'leaf' },
            { label: `Taille du groupe`, value: `6–14 personnes`, icon: 'people' },
            { label: `Format`, value: `privatisation de la cuisine`, icon: 'home' },
            { label: `Hôtes`, value: `chefs professionnels`, icon: 'chef-hat' },
            { label: `Options`, value: `accords mets-vins · régimes`, icon: 'tag' },
            { label: `Lieu`, value: `à 5 min du Ponte Vecchio`, icon: 'map-pin' },
            { label: `Réponse`, value: `sous un jour ouvré`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Pourquoi les pâtes sont-elles l'activité de teambuilding qui fonctionne ?`,
              paras: [
                `Les pâtes fraîches sont la rare activité d'équipe où personne ne peut se cacher derrière un écran et où personne n'a besoin de compétences préalables. Tout le monde commence avec le même tas de farine, les premiers pici de tout le monde sont de travers, et une heure plus tard, la table est recouverte de quelque chose que l'équipe a réellement fabriqué ensemble. Ensuite, vous le mangez, ce qui vaut mieux qu'un débriefing.`,
                `La cuisine est exclusivement à vous : pas d'étrangers, votre propre rythme, vos besoins alimentaires gérés à l'avance.`,
              ],
            },
            {
              title: `Comment se déroule la session`,
              paras: [
                `Le format suit notre cours signature: pratique dès la première minute, animé par deux chefs cuisiniers, et un déjeuner assis avec ce que l'équipe a préparé, accompagné de vin local si vous le souhaitez. En tant que réservation privée, les horaires sont flexibles selon votre agenda ; la plupart des équipes choisissent le cours à la place d'un déjeuner ou comme conclusion d'une journée de séminaire.`,
              ],
            },
            {
              title: `Hôtels, agences & voyagistes`,
              paras: [
                `Nous collaborons également avec des hôtels, B&amp;B, agritourismes, voyagistes et organisateurs de voyages: tarifs partenaires, réservation prioritaire, créneaux horaires fixes et confirmation rapide. Si vous créez des itinéraires à Florence pour des invités ou des clients, <a href="/fr/#business">découvrez comment nous travaillons avec les entreprises</a> ou envoyez-nous directement un e-mail.`,
              ],
            },
            {
              title: `Comment se renseigner`,
              paras: [
                `Envoyez un e-mail à <a href="mailto:ciao@handmadepastaflorence.com?subject=Demande%20de%20team%20building">ciao@handmadepastaflorence.com</a> avec la taille de votre équipe, les dates préférées et tout ce que nous devons savoir. Nous répondons sous un jour ouvré avec les disponibilités et un devis.`,
              ],
            },
          ],
          faqs: [
            { q: `Quelle taille peut avoir le groupe ?`, a: `La cuisine privée accueille des équipes de 6 à 14 personnes. Pour les entreprises plus grandes, nous pouvons discuter de sessions consécutives; envoyez-nous un e-mail avec vos effectifs.` },
            { q: `Le cours est-il animé en anglais ou en italien ?`, a: `Les deux: les chefs animent en anglais ou en italien, selon la préférence de votre équipe. Les instructions sont visuelles et pratiques, de sorte que les équipes multilingues s'en sortent très bien.` },
            { q: `Pouvez-vous gérer les exigences alimentaires ?`, a: `Oui. Postes de travail sans gluten sans frais supplémentaires, et autres allergies gérées à l'avance; envoyez-nous la liste lors de la réservation et chaque membre de l'équipe cuisinera et mangera.` },
            { q: `Comment fonctionnent les tarifs ?`, a: `Les sessions d'équipe sont chiffrées par groupe, en fonction de la taille, de l'horaire et des options supplémentaires comme l'accord mets-vins. Envoyez un e-mail à ciao@handmadepastaflorence.com et vous aurez un devis sous un jour ouvré.` },
          ],
          related: [
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `La même cuisine privée pour des célébrations personnelles, à partir de 680 €.` },
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours signature en petit groupe, si votre équipe compte 8 personnes ou moins, 95 € chacun.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Équipe à distance ? Cuisinez ensemble d'où vous voulez, en direct, à partir de 68 €.` },
          ],
          ctaLabel: `Obtenir un devis`,
          emailSubject: `Demande de team building`,
          breadcrumbName: `Cours Team Building`,
          service: {
            name: `Cours de Cuisine Team Building à Florence`,
            description: `Teambuilding culinaire à Florence pour les entreprises : un cours de cuisine privé pour votre équipe avec la privatisation de la cuisine pour 6–14 personnes, animé par deux chefs toscans, avec des options de vins et de régimes alimentaires.`,
          },
        },
      },
      de: {
        slug: 'teambuilding-kochkurs-florenz',
        title: `Kulinarisches Teambuilding in Florenz: Privater Pasta-Kurs, 6–14 Personen | Handmade Pasta Florence`,
        description: `Eine praktische Teambuilding-Aktivität in Florenz: Ihr Team rollt frische Pasta mit zwei toskanischen Köchen und teilt dann das zubereitete Mittagessen. Private Küchenmiete für 6–14 Personen, Weinbegleitung und Diätoptionen.`,
        cl: {
          eyebrow: `Für Unternehmen · private Küchenmiete`,
          heading: `Teambuilding, mit`,
          headingItal: `Mehl an den Händen.`,
          lede: `Schürzen an, Laptops weg. Ihr Team übernimmt unsere Küche im Oltrarno mit zwei toskanischen Köchen, rollt und faltet Seite an Seite frische Pasta und setzt sich dann zu einem langen, selbst zubereiteten Mittagessen. Fünf Minuten vom Ponte Vecchio entfernt.`,
          image: { src: img.cookingClassGuests, alt: `Eine Gruppe kocht zusammen bei einem privaten Teambuilding-Pasta-Kurs in Florenz`, w: 800, h: 1067 },
          price: `Privates Event`,
          priceNote: `6–14 Personen · Angebot pro Gruppe`,
          facts: [
            { label: `Lokale Produkte`, value: `Frische, saisonale toskanische Produkte`, icon: 'leaf' },
            { label: `Gruppengröße`, value: `6–14 Personen`, icon: 'people' },
            { label: `Format`, value: `private Küchenmiete`, icon: 'home' },
            { label: `Gastgeber`, value: `professionelle Köche`, icon: 'chef-hat' },
            { label: `Optionen`, value: `Weinbegleitung · Ernährung`, icon: 'tag' },
            { label: `Ort`, value: `5 Min. vom Ponte Vecchio`, icon: 'map-pin' },
            { label: `Antwortzeit`, value: `innerhalb von 24 Stunden`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Warum funktioniert Pasta-Kochen als Teambuilding-Aktivität?`,
              paras: [
                `Frische Pasta ist die seltene Teamaktivität, bei der sich niemand hinter einem Bildschirm verstecken kann und niemand Vorkenntnisse benötigt. Jeder beginnt mit dem gleichen Haufen Mehl, die ersten Pici von jedem sind krumm, und eine Stunde später ist der Tisch bedeckt mit etwas, das das Team tatsächlich zusammen hergestellt hat. Dann essen Sie es, das ist besser als ein Debriefing.`,
                `Die Küche gehört exklusiv Ihnen: keine Fremden, Ihr eigenes Tempo, Ihre Ernährungsbedürfnisse im Voraus geklärt.`,
              ],
            },
            {
              title: `Wie die Sitzung abläuft`,
              paras: [
                `Das Format folgt unserem Signature-Kurs: praktisch von der ersten Minute an, von zwei Küchenchefs geleitet, und ein gemeinsames Mittagessen mit dem, was das Team gemacht hat, mit Wein aus der Region, wenn Sie möchten. Als private Buchung ist das Timing flexibel um Ihre Agenda herum; die meisten Teams buchen den Kurs anstelle eines Mittagessens oder als abendlichen Ausklang eines Offsites.`,
              ],
            },
            {
              title: `Hotels, Agenturen & Reiseveranstalter`,
              paras: [
                `Wir arbeiten auch mit Hotels, B&amp;Bs, Agriturismi, Reiseveranstaltern und Reiseplanern zusammen: Partnertarife, bevorzugte Buchung, feste Zeitfenster und schnelle Bestätigung. Wenn Sie Florenz-Reiserouten für Gäste oder Kunden zusammenstellen, <a href="/de/#business">sehen Sie, wie wir mit Unternehmen arbeiten</a> oder senden Sie uns direkt eine E-Mail.`,
              ],
            },
            {
              title: `Wie man anfragt`,
              paras: [
                `Senden Sie eine E-Mail an <a href="mailto:ciao@handmadepastaflorence.com?subject=Teambuilding-Anfrage">ciao@handmadepastaflorence.com</a> mit Ihrer Teamgröße, bevorzugten Daten und allem, was wir wissen sollten. Wir antworten innerhalb eines Arbeitstages mit Verfügbarkeit und einem Angebot.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie groß kann die Gruppe sein?`, a: `Die private Küche bietet Platz für Teams von 6 bis 14 Personen. Für größere Unternehmen können wir aufeinanderfolgende Sitzungen besprechen; senden Sie uns eine E-Mail mit Ihren Zahlen.` },
            { q: `Wird der Kurs auf Englisch oder Italienisch durchgeführt?`, a: `Beides: die Köche unterrichten auf Englisch oder Italienisch, je nach Vorliebe Ihres Teams. Die Anweisungen sind praktisch und visuell, sodass auch gemischtsprachige Teams gut zurechtkommen.` },
            { q: `Können Sie auf Ernährungsbedürfnisse eingehen?`, a: `Ja. Glutenfreie Stationen ohne Aufpreis und andere Allergien und Vorlieben werden im Voraus bearbeitet; senden Sie uns bei der Buchung die Liste, und jedes Teammitglied wird kochen und essen.` },
            { q: `Wie funktioniert die Preisgestaltung?`, a: `Team-Sitzungen werden pro Gruppe kalkuliert, basierend auf Größe, Timing und Extras wie Weinbegleitung. Senden Sie eine E-Mail an ciao@handmadepastaflorence.com und Sie erhalten innerhalb eines Arbeitstages ein Angebot.` },
          ],
          related: [
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die gleiche private Küche für persönliche Feiern, ab 680 €.` },
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser Signature-Kurs für kleine Gruppen, wenn Ihr Team aus 8 oder weniger besteht, 95 € pro Person.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Remote-Team? Kochen Sie gemeinsam von überall aus, live, ab 68 €.` },
          ],
          ctaLabel: `Angebot anfordern`,
          emailSubject: `Teambuilding-Anfrage`,
          breadcrumbName: `Teambuilding-Kochkurs`,
          service: {
            name: `Teambuilding-Kochkurs in Florenz`,
            description: `Kulinarisches Teambuilding in Florenz für Unternehmen: ein privater Teambuilding-Kochkurs mit der gesamten Küche für 6–14 Personen, geleitet von zwei toskanischen Köchen, mit Weinbegleitung und Diätoptionen.`,
          },
        },
      },
      zh: {
        slug: 'tuandui-jianshe-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨美食团队建设：私人意面课程，6–14人 | Handmade Pasta Florence`,
        description: `在佛罗伦萨进行的动手实践美食团建活动：您的团队与两位托斯卡纳厨师一起擀制新鲜意面，然后共享他们制作的午餐。6–14人的私人厨房包场，可选择葡萄酒搭配和特殊饮食选项。`,
        cl: {
          eyebrow: `企业专享 · 私人厨房包场`,
          heading: `团队建设，让`,
          headingItal: `双手沾满面粉。`,
          lede: `穿上围裙，收起电脑。您的团队将与两位托斯卡纳厨师一起接管我们奥特拉诺的厨房，并肩擀面和折叠新鲜意面，然后坐下来享用团队亲手制作的丰盛午餐。距离老桥仅五分钟路程。`,
          image: { src: img.cookingClassGuests, alt: `一个团队在佛罗伦萨的私人团建意面课程中一起烹饪`, w: 800, h: 1067 },
          price: `私人包场`,
          priceNote: `6–14人 · 按团体报价`,
          facts: [
            { label: `本地食材`, value: `新鲜的托斯卡纳时令食材`, icon: 'leaf' },
            { label: `团队规模`, value: `6–14人`, icon: 'people' },
            { label: `形式`, value: `私人厨房包场`, icon: 'home' },
            { label: `主持人`, value: `专业厨师`, icon: 'chef-hat' },
            { label: `选项`, value: `葡萄酒搭配 · 特殊饮食`, icon: 'tag' },
            { label: `地点`, value: `距老桥5分钟`, icon: 'map-pin' },
            { label: `回复时间`, value: `一个工作日内`, icon: 'mail' },
          ],
          sections: [
            {
              title: `为什么意面制作是行之有效的团建活动？`,
              paras: [
                `新鲜意面是一项罕见的团队活动，在活动中没有人可以躲在屏幕后面，也没有人需要预先具备任何技能。每个人都从同一堆面粉开始，每个人最初做的意面都是歪歪扭扭的，而一小时后，桌面上就摆满了团队真正共同创造的成果。然后大家一起享用它，这比开总结会要好得多。`,
                `厨房完全属于您的团队：没有陌生人打扰，按照您自己的节奏进行，且您的饮食需求会提前安排妥当。`,
              ],
            },
            {
              title: `活动流程`,
              paras: [
                `活动形式沿用我们的招牌课程：从第一分钟开始就动手实践，由两位主厨主持，然后坐下来享用团队亲手制作的午餐（如果需要，还可搭配当地葡萄酒）。作为私人预订，时间安排很灵活，可以配合您的日程；大多数团队选择此课程来代替午餐，或者作为公司外出活动的晚间放松环节。`,
              ],
            },
            {
              title: `酒店、代理商及旅行社`,
              paras: [
                `我们还与酒店、民宿、农庄、旅行社和旅行规划师合作，提供合作伙伴价格、优先预订、固定时段和快速确认。如果您正在为客人或客户制定佛罗伦萨行程，请查看<a href="/zh/#business">我们如何与企业合作</a>，或直接发邮件给我们。`,
              ],
            },
            {
              title: `如何咨询`,
              paras: [
                `请发送电子邮件至 <a href="mailto:ciao@handmadepastaflorence.com?subject=Teambuilding%20Enquiry">ciao@handmadepastaflorence.com</a>，注明您的团队人数、首选日期以及我们需要了解的任何信息。我们会在一个工作日内回复可用性和报价。`,
              ],
            },
          ],
          faqs: [
            { q: `团队规模可以有多大？`, a: `私人厨房可容纳6到14人的团队。对于更大的公司，我们可以讨论连续进行几场活动，请发送邮件告诉我们您的人数。` },
            { q: `课程是用英语还是意大利语进行？`, a: `两者皆可，厨师可根据您团队的偏好使用英语或意大利语。指导是动手实践且直观的，因此混合语言团队也完全没问题。` },
            { q: `你们能处理特殊的饮食需求吗？`, a: `可以。免费提供无麸质操作台，其他过敏和偏好也会提前处理好，在预订时将名单发给我们，每个团队成员都能亲自参与烹饪和享用美食。` },
            { q: `报价是如何计算的？`, a: `团队活动按团体报价，具体取决于人数、时间和附加项目（如葡萄酒搭配）。发送邮件至 ciao@handmadepastaflorence.com，您将在一个工作日内收到报价。` },
          ],
          related: [
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `同一个私人厨房，适合个人庆祝活动，680欧元起。` },
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们的招牌小团课程，如果您的团队人数在8人或以下，每人95欧元。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `远程团队？无论在哪里，都可以一起进行在线直播烹饪，68欧元起。` },
          ],
          ctaLabel: `获取报价`,
          emailSubject: `团建活动咨询`,
          breadcrumbName: `团队建设烹饪课程`,
          service: {
            name: `佛罗伦萨团队建设烹饪课程`,
            description: `佛罗伦萨的企业美食团建：6-14人的私人厨房包场烹饪课程，由两位托斯卡纳厨师主持，并提供葡萄酒搭配和特殊饮食选项。`,
          },
        },
      },
    },
  },

  // Targets "gluten free cooking class Florence". Sells the same €95 Chef's Table
  // — the gluten-free blend and clean station are already included at no charge,
  // so this page surfaces an existing capability that was buried in a bullet.
  'gluten-free': {
    floatingCta: true,
    locales: {
      en: {
        slug: 'gluten-free-cooking-class-florence',
        title: `Gluten-Free Cooking Class in Florence: Fresh Pasta, No Surcharge (€95) | Handmade Pasta Florence`,
        description: `A hands-on gluten-free cooking class in Florence: your own flour blend, your own clean station, and the same four pasta shapes as everyone else at the table. Max 8 guests in our Oltrarno kitchen, €95 per person, no gluten-free surcharge.`,
        cl: {
          eyebrow: `Gluten-free · Oltrarno, Florence`,
          heading: `A gluten-free cooking class in Florence,`,
          headingItal: `at the same table.`,
          lede: `Most kitchens treat gluten-free as a substitution made in the back. We treat it as a place setting: your own blend, your own board, your own pot, set up before you arrive, at no extra charge, so you make and eat the same four shapes as everyone else.`,
          image: { src: img.plates, alt: `Plates of fresh handmade pasta served at a gluten-free cooking class in Florence`, w: 1080, h: 1327 },
          price: `€95`,
          priceNote: `per person · no gluten-free surcharge`,
          facts: [
            { label: `Local Products`, value: `Naturally gluten-free Tuscan produce`, icon: 'leaf' },
            { label: `Length`, value: `about 3 hours`, icon: 'clock' },
            { label: `Group size`, value: `max 8 guests`, icon: 'people' },
            { label: `Surcharge`, value: `none`, icon: 'tag' },
            { label: `Station`, value: `separate board, pot & tools`, icon: 'table' },
            { label: `Where`, value: `Oltrarno, near Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `How do you actually keep the class gluten-free?`,
              paras: [
                `We set your station up before the class starts, while the room is still clean and no one has opened a bag of wheat flour. You get a dedicated gluten-free blend, your own board, rolling pin, cutter and bowls, and your pasta is boiled in its own pot of water, never the shared one. Your chef washes and changes apron before working with you.`,
                `We want to be straight with you about one thing: this is a working pasta kitchen and wheat flour is used in the same room. Our setup is built for coeliac guests and we take it seriously, but we are not a certified gluten-free facility, and airborne flour is a fact of any pasta class. If your sensitivity is severe, tell us when you book; we will talk it through honestly rather than sell you a seat.`,
              ],
            },
            {
              title: `What you will make`,
              paras: [
                `The same class as everyone else, which is rather the point. You will mix and knead your own dough, learn to read it by feel: a gluten-free dough behaves differently, and we teach you what "ready" looks like without gluten to help you, and shape it into the classics: hand-rolled pici, ribbon-cut tagliatelle and pappardelle, and filled tortelli, following the season.`,
                `Then we cook it all together and sit down. Your pasta, a Tuscan sauce checked for gluten, and a glass of local wine. No separate table, no eating an hour after everyone else.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Mixed groups are welcome and normal: one coeliac guest and three friends who are not is the most common booking we take.`,
                `Other allergies (egg, dairy, nuts) can usually be worked around too. Send the whole list when you book, not on the day.`,
                `Travelling coeliac in Italy? Our guide to <a href="/blog/gluten-free-pasta-florence/">eating gluten-free in Florence</a> covers the phrases, habits and places that make it easy.`,
                `Want it entirely private, with the kitchen to yourselves? That is <a href="/private-cooking-class-florence/">The Family Long-Table</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Is this class safe for coeliacs?`, a: `We prepare a dedicated gluten-free flour blend, a separate station with its own board and tools, and a separate pot of cooking water, all set up before the class begins. We are honest about the limit: wheat flour is used elsewhere in the same room, so we are not a certified gluten-free kitchen. Tell us how sensitive you are when you book and we will give you a straight answer.` },
            { q: `Is there an extra charge for the gluten-free option?`, a: `No. It is €95 per person, the same as every other guest at the table. We have never charged for it and do not intend to start.` },
            { q: `Can I book if my partner or friends are not gluten-free?`, a: `Yes, and most of our gluten-free bookings are exactly that. You cook side by side at the same table with your own station, and everyone sits down to eat together at the end.` },
            { q: `Which shapes can be made gluten-free?`, a: `All four we teach: pici, tagliatelle, pappardelle and tortelli. The dough handles differently and needs a slightly different touch, which is part of what you will learn.` },
            { q: `How do I book and tell you about my diet?`, a: `Use the "Book this class" button to build your request. It opens a WhatsApp chat with the details filled in; add your dietary needs there, or email ciao@handmadepastaflorence.com, and we will confirm exactly how we will set you up.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `The same class, in full: four shapes, one long lunch. €95.` },
            { title: `Gluten-free in Florence`, href: `/blog/gluten-free-pasta-florence/`, desc: `How to eat safely as a coeliac traveller in Italy.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen privately yours, from €680.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Cook with us from your own gluten-free kitchen, from €68.` },
          ],
          ctaLabel: `Book this class`,
          prefill: 'florence',
          breadcrumbName: `Gluten-Free Cooking Class in Florence`,
          product: {
            name: `Gluten-Free Cooking Class in Florence`,
            description: `A 3-hour hands-on gluten-free pasta class in Florence's Oltrarno: dedicated gluten-free flour blend, separate station and cooking water, four classic shapes, max 8 guests, ending in a sit-down Tuscan lunch. No gluten-free surcharge.`,
            price: '95',
          },
        },
      },
      it: {
        slug: 'corso-cucina-senza-glutine-firenze',
        title: `Corso di Cucina Senza Glutine a Firenze: Pasta Fresca, Nessun Supplemento (€95) | Handmade Pasta Florence`,
        description: `Un corso pratico di cucina senza glutine a Firenze: la tua miscela di farine, la tua postazione pulita e gli stessi quattro formati di pasta degli altri ospiti. Max 8 ospiti in Oltrarno, €95 a persona, senza supplemento.`,
        cl: {
          eyebrow: `Senza glutine · Oltrarno, Firenze`,
          heading: `Un corso di cucina senza glutine a Firenze,`,
          headingItal: `allo stesso tavolo.`,
          lede: `Quasi ovunque il senza glutine è una sostituzione fatta in cucina, lontano dagli occhi. Per noi è un coperto: la tua miscela, il tuo tagliere, la tua pentola, preparati prima che tu arrivi, senza costi aggiuntivi, così prepari e mangi gli stessi quattro formati di tutti gli altri.`,
          image: { src: img.plates, alt: `Piatti di pasta fresca fatta a mano serviti a un corso di cucina senza glutine a Firenze`, w: 1080, h: 1327 },
          price: `€95`,
          priceNote: `a persona · nessun supplemento senza glutine`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani naturalmente senza glutine`, icon: 'leaf' },
            { label: `Durata`, value: `circa 3 ore`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max 8 ospiti`, icon: 'people' },
            { label: `Supplemento`, value: `nessuno`, icon: 'tag' },
            { label: `Postazione`, value: `tagliere, pentola e attrezzi dedicati`, icon: 'table' },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Come rendiamo davvero il corso senza glutine?`,
              paras: [
                `Prepariamo la tua postazione prima che il corso inizi, quando la stanza è ancora pulita e nessuno ha aperto un sacco di farina di grano. Avrai una miscela senza glutine dedicata, il tuo tagliere, mattarello, rotella e ciotole, e la tua pasta bollirà nella sua pentola d'acqua, mai in quella condivisa. Il tuo chef si lava le mani e cambia grembiule prima di lavorare con te.`,
                `Vogliamo essere sinceri su una cosa: questa è una cucina di pasta fresca e la farina di grano viene usata nella stessa stanza. La nostra procedura è pensata per gli ospiti celiaci e la prendiamo sul serio, ma non siamo una struttura certificata senza glutine, e la farina nell'aria è una realtà di qualsiasi corso di pasta. Se la tua sensibilità è alta, diccelo quando prenoti; ne parliamo con onestà invece di venderti un posto.`,
              ],
            },
            {
              title: `Cosa preparerai`,
              paras: [
                `Lo stesso corso di tutti gli altri, che è poi il punto. Impasterai il tuo impasto, imparerai a leggerlo al tatto: un impasto senza glutine si comporta diversamente e ti insegniamo a capire quando è pronto senza il glutine ad aiutarti, e lo lavorerai nei classici: pici fatti a mano, tagliatelle e pappardelle, e tortelli ripieni, seguendo la stagione.`,
                `Poi cuciniamo tutto insieme e ci sediamo. La tua pasta, un sugo toscano verificato, e un bicchiere di vino locale. Nessun tavolo separato, nessun mangiare un'ora dopo gli altri.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `I gruppi misti sono benvenuti e normali: un ospite celiaco e tre amici che non lo sono è la prenotazione più frequente che riceviamo.`,
                `Anche altre allergie (uova, latticini, frutta secca) si possono quasi sempre gestire. Mandaci l'elenco completo quando prenoti, non il giorno stesso.`,
                `Sei celiaco e in viaggio in Italia? La nostra guida per <a href="/it/blog/gluten-free-pasta-florence/">mangiare senza glutine a Firenze</a> raccoglie frasi, abitudini e posti che rendono tutto più semplice.`,
                `Lo vuoi completamente privato, con la cucina tutta per voi? È <a href="/it/corso-cucina-privato-firenze/">Il Lungo Tavolo di Famiglia</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Questo corso è sicuro per i celiaci?`, a: `Prepariamo una miscela di farine senza glutine dedicata, una postazione separata con tagliere e attrezzi propri e una pentola d'acqua separata, tutto allestito prima dell'inizio del corso. Siamo onesti sul limite: la farina di grano viene usata altrove nella stessa stanza, quindi non siamo una cucina certificata senza glutine. Dicci quanto sei sensibile quando prenoti e ti daremo una risposta sincera.` },
            { q: `C'è un supplemento per l'opzione senza glutine?`, a: `No. Sono €95 a persona, come per ogni altro ospite al tavolo. Non l'abbiamo mai fatto pagare e non intendiamo iniziare.` },
            { q: `Posso prenotare se il mio partner o i miei amici non sono celiaci?`, a: `Sì, e la maggior parte delle nostre prenotazioni senza glutine è esattamente così. Cucinate fianco a fianco allo stesso tavolo con la tua postazione dedicata, e alla fine ci si siede a mangiare tutti insieme.` },
            { q: `Quali formati si possono fare senza glutine?`, a: `Tutti e quattro quelli che insegniamo: pici, tagliatelle, pappardelle e tortelli. L'impasto si comporta diversamente e richiede un tocco un po' diverso, e imparare questo fa parte del corso.` },
            { q: `Come prenoto e vi segnalo la mia dieta?`, a: `Usa il pulsante "Prenota questo corso" per creare la tua richiesta. Si apre una chat WhatsApp con i dettagli precompilati; aggiungi lì le tue esigenze alimentari, oppure scrivi a ciao@handmadepastaflorence.com, e ti confermeremo esattamente come ti prepareremo la postazione.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Lo stesso corso, per intero: quattro formati, un lungo pranzo. €95.` },
            { title: `Senza glutine a Firenze`, href: `/it/blog/gluten-free-pasta-florence/`, desc: `Come mangiare in sicurezza da celiaci in Italia.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina privata per voi, da €680.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Cucina con noi dalla tua cucina senza glutine, da €68.` },
          ],
          ctaLabel: `Prenota questo corso`,
          prefill: 'florence',
          breadcrumbName: `Corso di Cucina Senza Glutine a Firenze`,
          product: {
            name: `Corso di Cucina Senza Glutine a Firenze`,
            description: `Un corso pratico di pasta senza glutine di 3 ore in Oltrarno a Firenze: miscela di farine dedicata, postazione e acqua di cottura separate, quattro formati classici, max 8 ospiti, con pranzo toscano finale. Nessun supplemento.`,
            price: '95',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-sans-gluten-florence',
        title: `Cours de Cuisine Sans Gluten à Florence: Pâtes Fraîches, Sans Supplément (95 €) | Handmade Pasta Florence`,
        description: `Un cours de cuisine sans gluten à Florence : votre mélange de farines, votre poste de travail propre et les mêmes quatre formes de pâtes que les autres. Max 8 personnes dans l'Oltrarno, 95 € par personne, sans supplément.`,
        cl: {
          eyebrow: `Sans gluten · Oltrarno, Florence`,
          heading: `Un cours de cuisine sans gluten à Florence,`,
          headingItal: `à la même table.`,
          lede: `Presque partout, le sans gluten est une substitution faite en cuisine, hors de votre vue. Pour nous, c'est un couvert : votre mélange, votre planche, votre casserole, préparés avant votre arrivée, sans frais supplémentaires, pour que vous prépariez et mangiez les mêmes quatre formes que tout le monde.`,
          image: { src: img.plates, alt: `Assiettes de pâtes fraîches faites main servies lors d'un cours de cuisine sans gluten à Florence`, w: 1080, h: 1327 },
          price: `95 €`,
          priceNote: `par personne · sans supplément`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans naturellement sans gluten`, icon: 'leaf' },
            { label: `Durée`, value: `environ 3 heures`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max 8 personnes`, icon: 'people' },
            { label: `Supplément`, value: `aucun`, icon: 'tag' },
            { label: `Poste`, value: `planche, casserole et outils dédiés`, icon: 'table' },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Comment rendons-nous vraiment le cours sans gluten ?`,
              paras: [
                `Nous installons votre poste avant le début du cours, quand la pièce est encore propre et que personne n'a ouvert un sac de farine de blé. Vous avez un mélange sans gluten dédié, votre planche, votre rouleau, votre roulette et vos bols, et vos pâtes cuisent dans leur propre casserole d'eau, jamais celle partagée. Votre chef se lave les mains et change de tablier avant de travailler avec vous.`,
                `Nous voulons être francs sur un point : c'est une cuisine de pâtes en activité et la farine de blé est utilisée dans la même pièce. Notre protocole est conçu pour les personnes coeliaques et nous le prenons au sérieux, mais nous ne sommes pas un établissement certifié sans gluten, et la farine en suspension est une réalité de tout cours de pâtes. Si votre sensibilité est forte, dites-le-nous à la réservation; nous en parlerons honnêtement plutôt que de vous vendre une place.`,
              ],
            },
            {
              title: `Ce que vous préparerez`,
              paras: [
                `Le même cours que tout le monde, ce qui est précisément l'idée. Vous préparerez votre pâte, apprendrez à la lire au toucher: une pâte sans gluten se comporte autrement, et nous vous apprenons à reconnaître le bon moment sans l'aide du gluten, et la travaillerez en classiques : pici roulés à la main, tagliatelles et pappardelles, et tortelli farcis, selon la saison.`,
                `Ensuite nous cuisinons tout ensemble et nous nous asseyons. Vos pâtes, une sauce toscane vérifiée, et un verre de vin local. Pas de table à part, pas de repas une heure après les autres.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `Les groupes mixtes sont bienvenus et fréquents: une personne coeliaque et trois amis qui ne le sont pas, c'est la réservation la plus courante.`,
                `D'autres allergies (oeuf, produits laitiers, fruits à coque) peuvent presque toujours être gérées. Envoyez-nous la liste complète à la réservation, pas le jour même.`,
                `Voyageur coeliaque en Italie ? Notre guide pour <a href="/fr/blog/gluten-free-pasta-florence/">manger sans gluten à Florence</a> rassemble les phrases, les habitudes et les adresses qui simplifient tout.`,
                `Vous le voulez entièrement privé, la cuisine rien que pour vous ? C'est <a href="/fr/cours-cuisine-prive-florence/">La Longue Table Familiale</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Ce cours est-il sûr pour les personnes coeliaques ?`, a: `Nous préparons un mélange de farines sans gluten dédié, un poste séparé avec sa propre planche et ses propres outils, et une casserole d'eau séparée, le tout installé avant le début du cours. Soyons clairs sur la limite : la farine de blé est utilisée ailleurs dans la même pièce, nous ne sommes donc pas une cuisine certifiée sans gluten. Dites-nous votre degré de sensibilité à la réservation et nous vous répondrons franchement.` },
            { q: `Y a-t-il un supplément pour l'option sans gluten ?`, a: `Non. C'est 95 € par personne, comme pour tous les autres à la table. Nous ne l'avons jamais facturé et n'avons pas l'intention de commencer.` },
            { q: `Puis-je réserver si mon partenaire ou mes amis ne sont pas coeliaques ?`, a: `Oui, et la plupart de nos réservations sans gluten sont exactement cela. Vous cuisinez côte à côte à la même table avec votre poste dédié, et tout le monde se met à table ensemble à la fin.` },
            { q: `Quelles formes peut-on faire sans gluten ?`, a: `Les quatre que nous enseignons: pici, tagliatelles, pappardelles et tortelli. La pâte se comporte différemment et demande un toucher un peu différent, ce qui fait partie de l'apprentissage.` },
            { q: `Comment réserver et vous signaler mon régime ?`, a: `Utilisez le bouton "Réserver ce cours" pour formuler votre demande. Cela ouvre une discussion WhatsApp pré-remplie; ajoutez-y vos besoins alimentaires, ou écrivez à ciao@handmadepastaflorence.com, et nous confirmerons exactement comment nous installerons votre poste.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Le même cours, en entier: quatre formes, un long déjeuner. 95 €.` },
            { title: `Sans gluten à Florence`, href: `/fr/blog/gluten-free-pasta-florence/`, desc: `Comment manger en sécurité quand on est coeliaque en Italie.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine pour vous, à partir de 680 €.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Cuisinez avec nous depuis votre propre cuisine sans gluten, dès 68 €.` },
          ],
          ctaLabel: `Réserver ce cours`,
          prefill: 'florence',
          breadcrumbName: `Cours de Cuisine Sans Gluten à Florence`,
          product: {
            name: `Cours de Cuisine Sans Gluten à Florence`,
            description: `Un cours pratique de pâtes sans gluten de 3 heures dans l'Oltrarno à Florence : mélange de farines dédié, poste et eau de cuisson séparés, quatre formes classiques, max 8 personnes, suivi d'un déjeuner toscan. Sans supplément.`,
            price: '95',
          },
        },
      },
      de: {
        slug: 'glutenfreier-kochkurs-florenz',
        title: `Glutenfreier Kochkurs in Florenz: Frische Pasta, ohne Aufpreis (95 €) | Handmade Pasta Florence`,
        description: `Ein praktischer glutenfreier Kochkurs in Florenz: eigene Mehlmischung, eigene saubere Station und dieselben vier Pastaformen wie alle anderen am Tisch. Max. 8 Gäste im Oltrarno, 95 € pro Person, ohne Aufpreis.`,
        cl: {
          eyebrow: `Glutenfrei · Oltrarno, Florenz`,
          heading: `Ein glutenfreier Kochkurs in Florenz,`,
          headingItal: `am selben Tisch.`,
          lede: `Fast überall ist glutenfrei ein Austausch, der hinten in der Küche passiert. Für uns ist es ein Gedeck: Ihre Mischung, Ihr Brett, Ihr Topf, vorbereitet, bevor Sie ankommen, ohne Aufpreis, damit Sie dieselben vier Formen machen und essen wie alle anderen.`,
          image: { src: img.plates, alt: `Teller mit frischer handgemachter Pasta bei einem glutenfreien Kochkurs in Florenz`, w: 1080, h: 1327 },
          price: `95 €`,
          priceNote: `pro Person · kein glutenfrei-Aufpreis`,
          facts: [
            { label: `Lokale Produkte`, value: `Von Natur aus glutenfreie toskanische Produkte`, icon: 'leaf' },
            { label: `Dauer`, value: `etwa 3 Stunden`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. 8 Gäste`, icon: 'people' },
            { label: `Aufpreis`, value: `keiner`, icon: 'tag' },
            { label: `Station`, value: `eigenes Brett, eigener Topf`, icon: 'table' },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Wie halten wir den Kurs tatsächlich glutenfrei?`,
              paras: [
                `Wir richten Ihre Station ein, bevor der Kurs beginnt, solange der Raum noch sauber ist und niemand einen Sack Weizenmehl geöffnet hat. Sie bekommen eine eigene glutenfreie Mehlmischung, Ihr eigenes Brett, Nudelholz, Rädchen und Schüsseln, und Ihre Pasta kocht in ihrem eigenen Topf Wasser, nie im gemeinsamen. Ihr Koch wäscht sich die Hände und wechselt die Schürze, bevor er mit Ihnen arbeitet.`,
                `Eines wollen wir offen sagen: Dies ist eine arbeitende Pastaküche, und Weizenmehl wird im selben Raum verwendet. Unser Ablauf ist für Zöliakie-Gäste gemacht und wir nehmen ihn ernst, aber wir sind kein zertifizierter glutenfreier Betrieb, und Mehlstaub in der Luft gehört zu jedem Pastakurs. Wenn Sie stark empfindlich sind, sagen Sie es bei der Buchung; wir sprechen ehrlich darüber, statt Ihnen einen Platz zu verkaufen.`,
              ],
            },
            {
              title: `Was Sie machen werden`,
              paras: [
                `Derselbe Kurs wie für alle anderen, und genau darum geht es. Sie kneten Ihren eigenen Teig, lernen ihn mit den Händen zu lesen: ein glutenfreier Teig verhält sich anders, und wir zeigen Ihnen, woran man ihn erkennt, wenn kein Gluten hilft, und formen ihn zu den Klassikern: handgerollte Pici, Tagliatelle und Pappardelle, gefüllte Tortelli, je nach Saison.`,
                `Dann kochen wir alles gemeinsam und setzen uns. Ihre Pasta, eine geprüfte toskanische Sauce, ein Glas Wein aus der Region. Kein separater Tisch, kein Essen eine Stunde nach den anderen.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Gemischte Gruppen sind willkommen und normal: ein Zöliakie-Gast und drei Freunde ohne ist die häufigste Buchung, die wir bekommen.`,
                `Andere Allergien (Ei, Milch, Nüsse) lassen sich meist ebenfalls lösen. Schicken Sie uns die ganze Liste bei der Buchung, nicht am Tag selbst.`,
                `Als Zöliakie-Betroffene auf Reisen in Italien? Unser Guide zum <a href="/de/blog/gluten-free-pasta-florence/">glutenfreien Essen in Florenz</a> sammelt die Sätze, Gewohnheiten und Adressen, die es einfach machen.`,
                `Lieber ganz privat, mit der Küche für sich allein? Das ist <a href="/de/privater-kochkurs-florenz/">Die lange Familientafel</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Ist dieser Kurs für Zöliakie-Betroffene sicher?`, a: `Wir bereiten eine eigene glutenfreie Mehlmischung, eine getrennte Station mit eigenem Brett und Werkzeug und einen separaten Kochtopf vor, alles aufgebaut vor Kursbeginn. Zur Grenze sind wir ehrlich: Weizenmehl wird anderswo im selben Raum verwendet, wir sind also keine zertifizierte glutenfreie Küche. Sagen Sie uns bei der Buchung, wie empfindlich Sie sind, und Sie bekommen eine gerade Antwort.` },
            { q: `Kostet die glutenfreie Option extra?`, a: `Nein. Es sind 95 € pro Person, wie für jeden anderen Gast am Tisch. Wir haben das nie berechnet und haben es auch nicht vor.` },
            { q: `Kann ich buchen, wenn mein Partner oder meine Freunde nicht glutenfrei essen?`, a: `Ja, und die meisten unserer glutenfreien Buchungen sind genau das. Sie kochen Seite an Seite am selben Tisch mit Ihrer eigenen Station, und am Ende setzen sich alle gemeinsam zum Essen.` },
            { q: `Welche Formen lassen sich glutenfrei machen?`, a: `Alle vier, die wir unterrichten: Pici, Tagliatelle, Pappardelle und Tortelli. Der Teig verhält sich anders und braucht ein etwas anderes Gefühl, und genau das lernen Sie mit.` },
            { q: `Wie buche ich und teile meine Ernährung mit?`, a: `Nutzen Sie "Diesen Kurs buchen", um Ihre Anfrage zu erstellen. Es öffnet sich ein WhatsApp-Chat mit ausgefüllten Details; ergänzen Sie dort Ihre Bedürfnisse, oder schreiben Sie an ciao@handmadepastaflorence.com. Wir bestätigen Ihnen genau, wie wir Ihre Station aufbauen.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Derselbe Kurs, vollständig: vier Formen, ein langes Mittagessen. 95 €.` },
            { title: `Glutenfrei in Florenz`, href: `/de/blog/gluten-free-pasta-florence/`, desc: `Wie man als Zöliakie-Reisende in Italien sicher isst.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche ganz privat, ab 680 €.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Kochen Sie mit uns aus Ihrer eigenen glutenfreien Küche, ab 68 €.` },
          ],
          ctaLabel: `Diesen Kurs buchen`,
          prefill: 'florence',
          breadcrumbName: `Glutenfreier Kochkurs in Florenz`,
          product: {
            name: `Glutenfreier Kochkurs in Florenz`,
            description: `Ein 3-stündiger praktischer glutenfreier Pastakurs in Florenz' Oltrarno: eigene glutenfreie Mehlmischung, getrennte Station und getrenntes Kochwasser, vier klassische Formen, max. 8 Gäste, mit anschließendem toskanischem Mittagessen. Ohne Aufpreis.`,
            price: '95',
          },
        },
      },
      zh: {
        slug: 'wu-fuzhi-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨无麸质烹饪课程：手工意面，不加收费用 (€95) | Handmade Pasta Florence`,
        description: `佛罗伦萨的无麸质实践烹饪课程：专属面粉配方、专属清洁操作台，以及与其他客人相同的四种意面形状。奥特拉诺厨房最多8位客人，每人95欧元，无额外费用。`,
        cl: {
          eyebrow: `无麸质 · 佛罗伦萨奥特拉诺`,
          heading: `佛罗伦萨的无麸质烹饪课程，`,
          headingItal: `同一张餐桌。`,
          lede: `在大多数厨房里，无麸质只是后厨里悄悄做的一次替换。而在我们这里，它是一副餐具：您专属的面粉配方、专属的案板、专属的锅，在您到达之前就已备好，不收取任何额外费用，让您和其他人制作并享用同样的四种形状。`,
          image: { src: img.plates, alt: `佛罗伦萨无麸质烹饪课程上供应的手工新鲜意面`, w: 1080, h: 1327 },
          price: `€95`,
          priceNote: `每人 · 无麸质不加价`,
          facts: [
            { label: `本地食材`, value: `天然无麸质的托斯卡纳食材`, icon: 'leaf' },
            { label: `时长`, value: `约3小时`, icon: 'clock' },
            { label: `团队规模`, value: `最多8位客人`, icon: 'people' },
            { label: `附加费`, value: `无`, icon: 'tag' },
            { label: `操作台`, value: `专属案板、锅具与工具`, icon: 'table' },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `我们如何真正做到课程无麸质？`,
              paras: [
                `我们会在课程开始前为您布置好操作台，那时房间还很干净，还没有人打开过小麦面粉袋。您将获得专属的无麸质面粉配方、您自己的案板、擀面杖、切轮和碗具，您的意面会在专属的一锅水中煮熟，绝不使用公用锅。主厨在与您一起操作前会洗手并更换围裙。`,
                `有一件事我们想坦诚相告：这是一间正在运作的意面厨房，同一空间内会使用小麦面粉。我们的流程是为乳糜泻客人设计的，我们也认真对待，但我们并非经过认证的无麸质场所，而空气中的面粉是任何意面课程都存在的现实。如果您的敏感程度较高，请在预订时告诉我们，我们会坦诚地与您沟通，而不是先把座位卖给您。`,
              ],
            },
            {
              title: `您将制作什么`,
              paras: [
                `与其他人完全相同的课程，而这正是关键所在。您将亲手和面，学会用手感判断面团：无麸质面团的表现不同，我们会教您在没有麸质帮助的情况下如何判断"到位了"，然后把它做成经典形状：手工揉制的pici、tagliatelle和pappardelle，以及填馅的tortelli，具体取决于季节。`,
                `之后我们一起烹饪，然后坐下来享用。您的意面、经过确认的托斯卡纳酱汁，以及一杯当地葡萄酒。没有单独的餐桌，也不必比别人晚一个小时才吃上饭。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `我们欢迎混合团体，这也很常见：一位乳糜泻客人和三位无需忌口的朋友，是我们最常接到的预订。`,
                `其他过敏（鸡蛋、乳制品、坚果）通常也可以处理。请在预订时发送完整清单，而不是当天才告知。`,
                `在意大利旅行的乳糜泻人士？我们的<a href="/zh/blog/gluten-free-pasta-florence/">佛罗伦萨无麸质饮食指南</a>整理了实用短语、习惯与去处。`,
                `想要完全私密、整个厨房归你们所有？那就是<a href="/zh/siren-pengren-kecheng-foluolunsa/">家庭长桌体验</a>。`,
              ],
            },
          ],
          faqs: [
            { q: `这门课程对乳糜泻患者安全吗？`, a: `我们会准备专属的无麸质面粉配方、配有独立案板和工具的独立操作台，以及单独的一锅煮面水，全部在课程开始前布置完毕。关于局限我们也如实相告：同一空间的其他区域会使用小麦面粉，因此我们不是经过认证的无麸质厨房。请在预订时告诉我们您的敏感程度，我们会给您一个坦率的答复。` },
            { q: `无麸质选项需要额外收费吗？`, a: `不需要。每人95欧元，与餐桌上的其他客人完全相同。我们从未为此收费，今后也不打算这样做。` },
            { q: `如果我的伴侣或朋友不需要无麸质，我还能预订吗？`, a: `可以，而且我们大多数无麸质预订正是这种情况。你们在同一张桌旁并肩制作，您使用自己的专属操作台，最后大家一起坐下来共进午餐。` },
            { q: `哪些形状可以做成无麸质的？`, a: `我们教授的全部四种：pici、tagliatelle、pappardelle和tortelli。面团的表现不同，需要略有差异的手法，而这也正是您要学习的一部分。` },
            { q: `我该如何预订并告知饮食需求？`, a: `使用"预订此课程"按钮创建您的请求。它会打开一个预填详情的WhatsApp聊天，请在其中补充您的饮食需求，或发送邮件至 ciao@handmadepastaflorence.com，我们会确认具体如何为您布置操作台。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `完整的同一门课程：四种形状，一顿悠长的午餐。€95。` },
            { title: `佛罗伦萨无麸质饮食`, href: `/zh/blog/gluten-free-pasta-florence/`, desc: `乳糜泻旅行者如何在意大利安全用餐。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `整个厨房私人包场，680欧元起。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `在您自己的无麸质厨房与我们一起烹饪，68欧元起。` },
          ],
          ctaLabel: `预订此课程`,
          prefill: 'florence',
          breadcrumbName: `佛罗伦萨无麸质烹饪课程`,
          product: {
            name: `佛罗伦萨无麸质烹饪课程`,
            description: `佛罗伦萨奥特拉诺区3小时无麸质实践意面课程：专属无麸质面粉配方、独立操作台与煮面水、四种经典形状、最多8位客人，以托斯卡纳午餐收尾。不加收费用。`,
            price: '95',
          },
        },
      },
    },
  },

  // Targets the couple intent that arrives on "private cooking class florence"
  // and hits a €680 wall. Sells the two SKUs that already exist — €95pp at the
  // shared table, or the private buyout — rather than inventing a price point.
  'for-two': {
    floatingCta: true,
    locales: {
      en: {
        slug: 'pasta-class-for-two-florence',
        title: `Pasta Class for Two in Florence: A Cooking Class for Couples (€95 each) | Handmade Pasta Florence`,
        description: `A pasta making class for two in Florence: an evening at a table of never more than eight, rolling fresh pasta side by side and eating it with a glass of Chianti. €95 each, or take the whole Oltrarno kitchen privately.`,
        cl: {
          eyebrow: `For two · Oltrarno, Florence`,
          heading: `A pasta class for two`,
          headingItal: `in Florence.`,
          lede: `Not a coach, not a tour group, not a demonstration you watch from a stool. Two aprons, one board between you, and three hours of making something with your hands that you then sit down and eat together, with a glass of Chianti and no rush to leave.`,
          image: { src: img.aperitivo, alt: `A table laid for two with wine before a pasta class for couples in Florence`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `per person · private from €680`,
          facts: [
            { label: `Local Products`, value: `Seasonal Tuscan produce`, icon: 'leaf' },
            { label: `Length`, value: `about 3 hours`, icon: 'clock' },
            { label: `Table`, value: `max 8 guests`, icon: 'table' },
            { label: `Best slot for two`, value: `18:00, the evening class`, icon: 'calendar' },
            { label: `Where`, value: `Oltrarno, near Santo Spirito`, icon: 'map-pin' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Two ways to do it`,
              paras: [
                `<strong>Join the table, €95 each.</strong> You book two places at our signature class. The table never has more than eight people, so it stays a small, chatty kitchen rather than a crowd, and you two work your own station side by side. This is what most couples book, and the 18:00 evening slot is the one to ask for: it runs into dinner and nobody is watching the clock.`,
                `<strong>Take the kitchen, from €680.</strong> If you want it entirely to yourselves, our <a href="/private-cooking-class-florence/">Family Long-Table</a> is a full private buyout: your own chef, your own menu, your own hours. Couples book this for proposals, anniversaries and honeymoons, where being observed by strangers rather defeats the point.`,
              ],
            },
            {
              title: `Why is a pasta class a better date than dinner?`,
              paras: [
                `A restaurant sits you across a table for ninety minutes. A pasta class puts you shoulder to shoulder for three hours doing something neither of you is good at yet, which is a great deal more interesting. You will be bad at tortelli together, you will fix each other's folds, and you will end up eating a lunch that has your fingerprints in it.`,
                `You are also cooking with two head chefs who do this for a living (pasta for wedding feasts and farmhouse tables is the day job), so you leave able to actually make it again at home. That tends to outlast a dinner reservation.`,
              ],
            },
            {
              title: `Celebrating something?`,
              paras: [],
              list: [
                `Tell us if it is a birthday, anniversary, engagement or honeymoon and we will quietly make a fuss of it; that is free, and it is the part we enjoy.`,
                `Planning a proposal? Book the <a href="/private-cooking-class-florence/">private kitchen</a> and message us first. We have done it before and we can help with the timing.`,
                `Two Tuscan pours each are included in the €95, poured when you sit down, not billed at the end.`,
                `Gluten-free or other allergies? A dedicated station at no extra charge; see the <a href="/gluten-free-cooking-class-florence/">gluten-free class</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Can we book a pasta class for just the two of us?`, a: `Yes. Book two places at the €95-per-person class and you join a table of never more than eight, working your own station side by side. If you want nobody else in the room at all, the private kitchen buyout starts at €680.` },
            { q: `Is the €95 class private?`, a: `No: it is a small shared table, max 8 guests, which most couples prefer for the atmosphere. For a genuinely private class for two, book The Family Long-Table from €680.` },
            { q: `Which time is best for a date?`, a: `The 18:00 evening class. It runs into dinner, the kitchen is at its warmest, and there is no next group waiting, so nobody hurries you away from the table.` },
            { q: `We are celebrating an anniversary, can you do something?`, a: `Tell us when you book. We will make a quiet fuss of it at the table at no extra cost, and if you are planning something bigger like a proposal, message us and we will help you set it up in the private kitchen.` },
            { q: `How do we book?`, a: `Use the "Book this class" button, pick your date, time and two guests. It opens a WhatsApp chat with everything filled in and we confirm personally, or write to ciao@handmadepastaflorence.com.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `The full detail of the class you would be joining, €95.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen to yourselves, for proposals and anniversaries, from €680.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Make a morning of it: the market at dawn, then cook the basket, €145.` },
            { title: `Things to do in the Oltrarno`, href: `/blog/things-to-do-in-oltrarno-florence/`, desc: `Build the rest of the evening around the neighbourhood.` },
          ],
          ctaLabel: `Book for two`,
          prefill: 'florence',
          breadcrumbName: `Pasta Class for Two in Florence`,
          product: {
            name: `Pasta Class for Two in Florence`,
            description: `A 3-hour hands-on pasta making class for couples in Florence's Oltrarno: two places at a table of never more than eight, four classic shapes, ending in a sit-down Tuscan meal with wine. €95 per person, private buyout from €680.`,
            price: '95',
          },
        },
      },
      it: {
        slug: 'corso-pasta-per-due-firenze',
        title: `Corso di Pasta per Due a Firenze: Un Corso di Cucina per Coppie (€95 a testa) | Handmade Pasta Florence`,
        description: `Un corso di pasta fresca per due a Firenze: una sera a un tavolo di massimo otto persone, a stendere la pasta fianco a fianco e a mangiarla con un bicchiere di Chianti. €95 a testa, oppure tutta la cucina in Oltrarno solo per voi.`,
        cl: {
          eyebrow: `Per due · Oltrarno, Firenze`,
          heading: `Un corso di pasta per due`,
          headingItal: `a Firenze.`,
          lede: `Niente pullman, niente comitiva, niente dimostrazione da guardare seduti su uno sgabello. Due grembiuli, un tagliere in mezzo e tre ore a fare con le mani qualcosa che poi vi sedete a mangiare insieme, con un bicchiere di Chianti e nessuna fretta di andare via.`,
          image: { src: img.aperitivo, alt: `Un tavolo apparecchiato per due con del vino prima di un corso di pasta per coppie a Firenze`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `a persona · privato da €680`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani di stagione`, icon: 'leaf' },
            { label: `Durata`, value: `circa 3 ore`, icon: 'clock' },
            { label: `Tavolo`, value: `max 8 ospiti`, icon: 'table' },
            { label: `Orario ideale per due`, value: `18:00, il corso serale`, icon: 'calendar' },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'map-pin' },
            { label: `Lingua`, value: `Inglese o Italiano`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Due modi per farlo`,
              paras: [
                `<strong>Al tavolo con gli altri, €95 a testa.</strong> Prenotate due posti al nostro corso principale. Il tavolo non supera mai le otto persone, quindi resta una cucina piccola e chiacchierona invece di una folla, e voi due lavorate alla vostra postazione fianco a fianco. È quello che prenotano quasi tutte le coppie, e l'orario da chiedere è quello delle 18:00: sfuma nella cena e nessuno guarda l'orologio.`,
                `<strong>Tutta la cucina, da €680.</strong> Se la volete davvero solo per voi, <a href="/it/corso-cucina-privato-firenze/">Il Lungo Tavolo di Famiglia</a> è la privatizzazione completa: il vostro chef, il vostro menù, i vostri orari. Le coppie lo prenotano per proposte di matrimonio, anniversari e viaggi di nozze, quando avere degli sconosciuti intorno toglie un po' il senso alla cosa.`,
              ],
            },
            {
              title: `Perché un corso di pasta è un appuntamento migliore di una cena?`,
              paras: [
                `Un ristorante vi mette uno di fronte all'altra per novanta minuti. Un corso di pasta vi mette spalla a spalla per tre ore a fare qualcosa in cui nessuno dei due è ancora bravo, il che è molto più interessante. Sarete pessimi con i tortelli insieme, vi correggerete le pieghe a vicenda, e finirete per mangiare un pranzo con dentro le vostre impronte.`,
                `E cucinate con due capi chef che lo fanno di mestiere (la pasta per banchetti di nozze e tavolate di agriturismo è il lavoro di tutti i giorni), quindi ve ne andate sapendola rifare davvero a casa. Di solito dura più a lungo di una prenotazione al ristorante.`,
              ],
            },
            {
              title: `Festeggiate qualcosa?`,
              paras: [],
              list: [
                `Diteci se è un compleanno, un anniversario, un fidanzamento o un viaggio di nozze e ci faremo festa in silenzio; è gratis, ed è la parte che ci piace di più.`,
                `State organizzando una proposta di matrimonio? Prenotate la <a href="/it/corso-cucina-privato-firenze/">cucina privata</a> e scriveteci prima. L'abbiamo già fatto e possiamo aiutarvi con i tempi.`,
                `Due calici toscani a testa sono inclusi nei €95, versati quando vi sedete, non conteggiati alla fine.`,
                `Senza glutine o altre allergie? Postazione dedicata senza costi aggiuntivi; vedi il <a href="/it/corso-cucina-senza-glutine-firenze/">corso senza glutine</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Possiamo prenotare un corso di pasta solo per noi due?`, a: `Sì. Prenotate due posti al corso da €95 a persona e vi unite a un tavolo di massimo otto, lavorando alla vostra postazione fianco a fianco. Se non volete proprio nessun altro nella stanza, la privatizzazione della cucina parte da €680.` },
            { q: `Il corso da €95 è privato?`, a: `No: è un piccolo tavolo condiviso, max 8 ospiti, che la maggior parte delle coppie preferisce per l'atmosfera. Per un corso davvero privato per due, prenotate Il Lungo Tavolo di Famiglia da €680.` },
            { q: `Qual è l'orario migliore per una serata romantica?`, a: `Il corso delle 18:00. Sfuma nella cena, la cucina è al suo momento più caldo e non c'è un gruppo successivo in attesa, quindi nessuno vi manda via dal tavolo.` },
            { q: `Festeggiamo un anniversario, potete fare qualcosa?`, a: `Ditecelo quando prenotate. Faremo una piccola festa al tavolo senza costi aggiuntivi, e se state pensando a qualcosa di più grande, come una proposta, scriveteci e vi aiutiamo a organizzarla nella cucina privata.` },
            { q: `Come prenotiamo?`, a: `Usate il pulsante "Prenota questo corso", scegliete data, ora e due ospiti. Si apre una chat WhatsApp con tutto compilato e confermiamo personalmente, oppure scrivete a ciao@handmadepastaflorence.com.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Tutti i dettagli del corso a cui vi unireste, €95.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina per voi, per proposte e anniversari, da €680.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Fatene una mattinata: il mercato all'alba, poi si cucina il cesto, €145.` },
            { title: `Cosa fare in Oltrarno`, href: `/it/blog/things-to-do-in-oltrarno-florence/`, desc: `Costruite il resto della serata attorno al quartiere.` },
          ],
          ctaLabel: `Prenota per due`,
          prefill: 'florence',
          breadcrumbName: `Corso di Pasta per Due a Firenze`,
          product: {
            name: `Corso di Pasta per Due a Firenze`,
            description: `Un corso pratico di pasta fresca per coppie di 3 ore in Oltrarno a Firenze: due posti a un tavolo di massimo otto, quattro formati classici, con pranzo o cena toscana finale e vino. €95 a persona, privatizzazione da €680.`,
            price: '95',
          },
        },
      },
      fr: {
        slug: 'cours-de-pates-pour-deux-florence',
        title: `Cours de Pâtes pour Deux à Florence: Un Cours de Cuisine en Couple (95 € par personne) | Handmade Pasta Florence`,
        description: `Un cours de pâtes fraîches pour deux à Florence : une soirée à une table de huit personnes maximum, à étaler les pâtes côte à côte et à les déguster avec un verre de Chianti. 95 € par personne, ou toute la cuisine de l'Oltrarno rien que pour vous.`,
        cl: {
          eyebrow: `Pour deux · Oltrarno, Florence`,
          heading: `Un cours de pâtes pour deux`,
          headingItal: `à Florence.`,
          lede: `Pas de car, pas de groupe, pas de démonstration que l'on regarde depuis un tabouret. Deux tabliers, une planche entre vous et trois heures à fabriquer de vos mains quelque chose que vous vous asseyez ensuite pour manger ensemble, avec un verre de Chianti et sans aucune hâte de partir.`,
          image: { src: img.aperitivo, alt: `Une table dressée pour deux avec du vin avant un cours de pâtes en couple à Florence`, w: 800, h: 1067 },
          price: `95 €`,
          priceNote: `par personne · privé dès 680 €`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans de saison`, icon: 'leaf' },
            { label: `Durée`, value: `environ 3 heures`, icon: 'clock' },
            { label: `Table`, value: `max 8 personnes`, icon: 'table' },
            { label: `Créneau idéal à deux`, value: `18h00, le cours du soir`, icon: 'calendar' },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito`, icon: 'map-pin' },
            { label: `Langue`, value: `Anglais ou Italien`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Deux façons de le faire`,
              paras: [
                `<strong>Rejoindre la table, 95 € chacun.</strong> Vous réservez deux places à notre cours phare. La table ne dépasse jamais huit personnes : cela reste une petite cuisine bavarde plutôt qu'une foule, et vous travaillez tous les deux à votre propre poste, côte à côte. C'est ce que réservent la plupart des couples, et le créneau à demander est celui de 18h00 : il se prolonge en dîner et personne ne regarde l'heure.`,
                `<strong>Privatiser la cuisine, dès 680 €.</strong> Si vous la voulez entièrement pour vous, <a href="/fr/cours-cuisine-prive-florence/">La Longue Table Familiale</a> est une privatisation complète : votre chef, votre menu, vos horaires. Les couples la réservent pour les demandes en mariage, les anniversaires et les voyages de noces, quand être observé par des inconnus enlève tout l'intérêt.`,
              ],
            },
            {
              title: `Pourquoi un cours de pâtes est-il un meilleur rendez-vous qu'un dîner ?`,
              paras: [
                `Un restaurant vous assoit face à face pendant quatre-vingt-dix minutes. Un cours de pâtes vous met épaule contre épaule pendant trois heures à faire quelque chose qu'aucun de vous ne maîtrise encore, ce qui est nettement plus intéressant. Vous serez mauvais en tortelli ensemble, vous corrigerez les pliages de l'autre, et vous finirez par manger un repas qui porte vos empreintes.`,
                `Vous cuisinez aussi avec deux chefs de cuisine dont c'est le métier (les pâtes pour les banquets de mariage et les grandes tablées, c'est leur quotidien), et vous repartez donc capables de refaire cela chez vous. Cela dure généralement plus longtemps qu'une réservation au restaurant.`,
              ],
            },
            {
              title: `Vous fêtez quelque chose ?`,
              paras: [],
              list: [
                `Dites-nous si c'est un anniversaire, des fiançailles ou un voyage de noces et nous en ferons discrètement tout un plat; c'est gratuit, et c'est la partie que nous préférons.`,
                `Vous préparez une demande en mariage ? Réservez la <a href="/fr/cours-cuisine-prive-florence/">cuisine privée</a> et écrivez-nous d'abord. Nous l'avons déjà fait et nous pouvons vous aider pour le timing.`,
                `Deux verres toscans chacun sont compris dans les 95 €, servis quand vous vous asseyez, pas facturés à la fin.`,
                `Sans gluten ou autres allergies ? Un poste dédié sans frais supplémentaires; voir le <a href="/fr/cours-cuisine-sans-gluten-florence/">cours sans gluten</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Pouvons-nous réserver un cours de pâtes rien que pour nous deux ?`, a: `Oui. Réservez deux places au cours à 95 € par personne et vous rejoignez une table de huit maximum, en travaillant à votre propre poste côte à côte. Si vous ne voulez personne d'autre dans la pièce, la privatisation de la cuisine démarre à 680 €.` },
            { q: `Le cours à 95 € est-il privé ?`, a: `Non: c'est une petite table partagée, 8 personnes maximum, ce que la plupart des couples préfèrent pour l'ambiance. Pour un cours réellement privé à deux, réservez La Longue Table Familiale à partir de 680 €.` },
            { q: `Quel créneau choisir pour une soirée en amoureux ?`, a: `Le cours de 18h00. Il se prolonge en dîner, la cuisine est à son moment le plus chaleureux et aucun groupe suivant n'attend, donc personne ne vous presse de quitter la table.` },
            { q: `Nous fêtons un anniversaire de couple, pouvez-vous faire quelque chose ?`, a: `Dites-le-nous à la réservation. Nous en ferons discrètement tout un plat à table, sans frais, et si vous préparez quelque chose de plus grand, comme une demande en mariage, écrivez-nous et nous vous aiderons à l'organiser dans la cuisine privée.` },
            { q: `Comment réserver ?`, a: `Utilisez le bouton "Réserver ce cours", choisissez votre date, l'heure et deux personnes. Cela ouvre une discussion WhatsApp pré-remplie et nous confirmons personnellement, ou écrivez à ciao@handmadepastaflorence.com.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Tout le détail du cours que vous rejoindriez, 95 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine pour vous, pour les demandes et anniversaires, dès 680 €.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Faites-en une matinée : le marché à l'aube, puis on cuisine le panier, 145 €.` },
            { title: `Que faire dans l'Oltrarno`, href: `/fr/blog/things-to-do-in-oltrarno-florence/`, desc: `Construisez le reste de la soirée autour du quartier.` },
          ],
          ctaLabel: `Réserver pour deux`,
          prefill: 'florence',
          breadcrumbName: `Cours de Pâtes pour Deux à Florence`,
          product: {
            name: `Cours de Pâtes pour Deux à Florence`,
            description: `Un cours pratique de pâtes fraîches en couple de 3 heures dans l'Oltrarno à Florence : deux places à une table de huit maximum, quatre formes classiques, suivi d'un repas toscan avec du vin. 95 € par personne, privatisation dès 680 €.`,
            price: '95',
          },
        },
      },
      de: {
        slug: 'pasta-kurs-fuer-zwei-florenz',
        title: `Pasta-Kurs für Zwei in Florenz: Ein Kochkurs für Paare (95 € pro Person) | Handmade Pasta Florence`,
        description: `Ein Pasta-Kurs für zwei in Florenz: ein Abend an einem Tisch mit höchstens acht Gästen, Seite an Seite frische Pasta rollen und sie mit einem Glas Chianti essen. 95 € pro Person, oder die ganze Küche im Oltrarno für Sie allein.`,
        cl: {
          eyebrow: `Für zwei · Oltrarno, Florenz`,
          heading: `Ein Pasta-Kurs für zwei`,
          headingItal: `in Florenz.`,
          lede: `Kein Bus, keine Reisegruppe, keine Vorführung, die man vom Hocker aus ansieht. Zwei Schürzen, ein Brett zwischen Ihnen und drei Stunden, in denen Sie mit den Händen etwas machen, das Sie danach gemeinsam essen, mit einem Glas Chianti und ohne jede Eile.`,
          image: { src: img.aperitivo, alt: `Ein für zwei gedeckter Tisch mit Wein vor einem Pasta-Kurs für Paare in Florenz`, w: 800, h: 1067 },
          price: `95 €`,
          priceNote: `pro Person · privat ab 680 €`,
          facts: [
            { label: `Lokale Produkte`, value: `Saisonale toskanische Produkte`, icon: 'leaf' },
            { label: `Dauer`, value: `etwa 3 Stunden`, icon: 'clock' },
            { label: `Tisch`, value: `max. 8 Gäste`, icon: 'table' },
            { label: `Beste Zeit zu zweit`, value: `18:00, der Abendkurs`, icon: 'calendar' },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito`, icon: 'map-pin' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
          ],
          sections: [
            {
              title: `Zwei Wege, es zu tun`,
              paras: [
                `<strong>An den Tisch dazu, 95 € pro Person.</strong> Sie buchen zwei Plätze in unserem Signature-Kurs. Am Tisch sitzen nie mehr als acht Menschen, es bleibt also eine kleine, gesprächige Küche statt einer Menge, und Sie beide arbeiten Seite an Seite an Ihrer eigenen Station. Das buchen die meisten Paare, und der Termin, nach dem man fragen sollte, ist 18:00 Uhr: Er geht ins Abendessen über, und niemand schaut auf die Uhr.`,
                `<strong>Die ganze Küche, ab 680 €.</strong> Wenn Sie sie ganz für sich wollen, ist <a href="/de/privater-kochkurs-florenz/">Die lange Familientafel</a> die vollständige Privatbuchung: Ihr Koch, Ihr Menü, Ihre Zeiten. Paare buchen das für Heiratsanträge, Jahrestage und Hochzeitsreisen: Momente, bei denen fremde Zuschauer den Sinn verfehlen.`,
              ],
            },
            {
              title: `Warum ist ein Pasta-Kurs ein besseres Date als ein Abendessen?`,
              paras: [
                `Ein Restaurant setzt Sie neunzig Minuten lang gegenüber. Ein Pastakurs stellt Sie drei Stunden lang Schulter an Schulter und lässt Sie etwas tun, das noch keiner von Ihnen kann, was erheblich interessanter ist. Sie werden gemeinsam schlecht in Tortelli sein, Sie werden einander die Faltungen richten, und am Ende essen Sie ein Essen, in dem Ihre Fingerabdrücke stecken.`,
                `Außerdem kochen Sie mit zwei Küchenchefs, die davon leben (Pasta für Hochzeitsfeste und lange Tafeln ist ihr Alltag), und gehen daher so, dass Sie es zu Hause wirklich nachmachen können. Das hält meist länger als eine Tischreservierung.`,
              ],
            },
            {
              title: `Feiern Sie etwas?`,
              paras: [],
              list: [
                `Sagen Sie uns, ob es ein Geburtstag, Jahrestag, eine Verlobung oder Hochzeitsreise ist, und wir machen still ein kleines Fest daraus; kostenlos, und es ist der Teil, den wir am liebsten mögen.`,
                `Planen Sie einen Heiratsantrag? Buchen Sie die <a href="/de/privater-kochkurs-florenz/">private Küche</a> und schreiben Sie uns vorher. Wir haben das schon gemacht und helfen beim Timing.`,
                `Zwei toskanische Gläser pro Person sind in den 95 € enthalten, eingeschenkt, wenn Sie sich setzen, nicht am Ende berechnet.`,
                `Glutenfrei oder andere Allergien? Eine eigene Station ohne Aufpreis; siehe den <a href="/de/glutenfreier-kochkurs-florenz/">glutenfreien Kurs</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Können wir einen Pasta-Kurs nur für uns zwei buchen?`, a: `Ja. Buchen Sie zwei Plätze im Kurs für 95 € pro Person, und Sie kommen an einen Tisch mit höchstens acht Gästen und arbeiten Seite an Seite an Ihrer eigenen Station. Wenn Sie überhaupt niemanden sonst im Raum wollen, beginnt die private Küchenbuchung bei 680 €.` },
            { q: `Ist der Kurs für 95 € privat?`, a: `Nein: es ist ein kleiner gemeinsamer Tisch mit maximal 8 Gästen, was die meisten Paare der Stimmung wegen bevorzugen. Für einen wirklich privaten Kurs zu zweit buchen Sie Die lange Familientafel ab 680 €.` },
            { q: `Welche Uhrzeit eignet sich für einen Abend zu zweit?`, a: `Der Kurs um 18:00 Uhr. Er geht ins Abendessen über, die Küche ist dann am wärmsten, und es wartet keine nächste Gruppe; niemand drängt Sie vom Tisch.` },
            { q: `Wir feiern einen Jahrestag, können Sie etwas machen?`, a: `Sagen Sie es uns bei der Buchung. Wir machen ohne Aufpreis ein kleines Fest daraus, und wenn Sie etwas Größeres planen, etwa einen Heiratsantrag, schreiben Sie uns; wir helfen Ihnen, es in der privaten Küche vorzubereiten.` },
            { q: `Wie buchen wir?`, a: `Nutzen Sie "Diesen Kurs buchen" und wählen Sie Datum, Uhrzeit und zwei Gäste. Es öffnet sich ein WhatsApp-Chat mit allem Ausgefüllten und wir bestätigen persönlich, oder schreiben Sie an ciao@handmadepastaflorence.com.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Alle Details des Kurses, zu dem Sie dazukommen, 95 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche für Sie, für Anträge und Jahrestage, ab 680 €.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Machen Sie einen Vormittag daraus: erst der Markt, dann der Korb, 145 €.` },
            { title: `Was man im Oltrarno tun kann`, href: `/de/blog/things-to-do-in-oltrarno-florence/`, desc: `Bauen Sie den Rest des Abends um das Viertel herum.` },
          ],
          ctaLabel: `Für zwei buchen`,
          prefill: 'florence',
          breadcrumbName: `Pasta-Kurs für Zwei in Florenz`,
          product: {
            name: `Pasta-Kurs für Zwei in Florenz`,
            description: `Ein 3-stündiger praktischer Pasta-Kurs für Paare in Florenz' Oltrarno: zwei Plätze an einem Tisch mit höchstens acht Gästen, vier klassische Formen, mit anschließendem toskanischem Essen und Wein. 95 € pro Person, Privatbuchung ab 680 €.`,
            price: '95',
          },
        },
      },
      zh: {
        slug: 'shuangren-yidali-mian-kecheng-foluolunsa',
        title: `佛罗伦萨双人意面课程：情侣烹饪课程 (每人€95) | Handmade Pasta Florence`,
        description: `佛罗伦萨的双人手工意面课程：在最多八人的餐桌旁度过一个傍晚，并肩擀制新鲜意面，再配上一杯基安蒂葡萄酒享用。每人95欧元，也可将整个奥特拉诺厨房私人包场。`,
        cl: {
          eyebrow: `双人 · 佛罗伦萨奥特拉诺`,
          heading: `佛罗伦萨的`,
          headingItal: `双人意面课程。`,
          lede: `没有大巴，没有旅行团，也没有需要坐在凳子上观看的示范。两条围裙、一张共用的案板，以及三个小时，用双手做出一样东西，然后坐下来一起把它吃掉，配一杯基安蒂，不必急着离开。`,
          image: { src: img.aperitivo, alt: `佛罗伦萨情侣意面课程前为两人摆好的餐桌与葡萄酒`, w: 800, h: 1067 },
          price: `€95`,
          priceNote: `每人 · 私人包场680欧元起`,
          facts: [
            { label: `本地食材`, value: `托斯卡纳时令食材`, icon: 'leaf' },
            { label: `时长`, value: `约3小时`, icon: 'clock' },
            { label: `餐桌`, value: `最多8位客人`, icon: 'table' },
            { label: `双人最佳时段`, value: `18:00 傍晚班`, icon: 'calendar' },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'map-pin' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
          ],
          sections: [
            {
              title: `两种方式`,
              paras: [
                `<strong>加入公共餐桌，每人95欧元。</strong> 您预订我们招牌课程的两个名额。餐桌人数从不超过八位，因此这里始终是一间热闹的小厨房而非人群，你们俩在自己的操作台上并肩制作。这是大多数情侣的选择，而值得特意询问的时段是18:00：课程会自然延续到晚餐，没有人会看时间。`,
                `<strong>包下整个厨房，680欧元起。</strong> 如果你们想完全独处，<a href="/zh/siren-pengren-kecheng-foluolunsa/">家庭长桌体验</a>是完整的私人包场：专属主厨、专属菜单、专属时间。情侣通常为求婚、纪念日和蜜月预订它，在这些时刻，被陌生人围观确实有点扫兴。`,
              ],
            },
            {
              title: `为什么意面课程比晚餐更适合作为约会？`,
              paras: [
                `餐厅让你们面对面坐九十分钟。意面课程则让你们肩并肩三个小时，一起做一件两人都还不擅长的事，这要有趣得多。你们会一起把tortelli捏得歪歪扭扭，会互相纠正对方的折法，最后吃到一顿带着你们指纹的饭菜。`,
                `而且你们是在和两位以此为生的主厨一起下厨：为婚宴和农庄长桌做意面是他们的日常工作，所以离开时你们是真的学会了回家再做一次。这通常比一次餐厅订位留存得更久。`,
              ],
            },
            {
              title: `在庆祝什么吗？`,
              paras: [],
              list: [
                `如果是生日、纪念日、订婚或蜜月，请告诉我们，我们会安静地为你们庆祝一下，这是免费的，也是我们最喜欢的环节。`,
                `在筹划求婚？请预订<a href="/zh/siren-pengren-kecheng-foluolunsa/">私人厨房</a>并先与我们联系。我们做过，可以帮您把时间安排好。`,
                `95欧元已包含每人两杯托斯卡纳葡萄酒，入座即斟，结束时不再另行收费。`,
                `无麸质或其他过敏？专属操作台不加收费用，请看<a href="/zh/wu-fuzhi-pengren-kecheng-foluolunsa/">无麸质课程</a>。`,
              ],
            },
          ],
          faqs: [
            { q: `我们可以只为两个人预订意面课程吗？`, a: `可以。预订每人95欧元课程的两个名额，你们会加入一张最多八人的餐桌，在自己的操作台上并肩制作。如果你们希望房间里没有其他人，私人包场从680欧元起。` },
            { q: `95欧元的课程是私人的吗？`, a: `不是，那是一张最多8位客人的小型共用餐桌，大多数情侣正是喜欢这样的氛围。若想要真正私密的双人课程，请预订家庭长桌体验，680欧元起。` },
            { q: `约会最适合哪个时段？`, a: `18:00的傍晚班。它会自然延续到晚餐，厨房此时最温暖，而且后面没有下一组客人在等，不会有人催你们离席。` },
            { q: `我们在庆祝纪念日，你们能做点什么吗？`, a: `预订时告诉我们。我们会在餐桌上安静地为你们庆祝，不收取额外费用；如果你们在筹划更大的惊喜，比如求婚，请与我们联系，我们会帮你们在私人厨房里安排好。` },
            { q: `我们该如何预订？`, a: `使用"预订此课程"按钮，选择日期、时间和两位客人。它会打开一个信息已填好的WhatsApp聊天，我们会亲自确认，也可以发送邮件至 ciao@handmadepastaflorence.com。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `你们将加入的这门课程的完整介绍，€95。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `整个厨房归你们所有，适合求婚与纪念日，680欧元起。` },
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `把它变成一个上午：清晨逛市场，然后烹饪食材，€145。` },
            { title: `奥特拉诺有什么可玩`, href: `/zh/blog/things-to-do-in-oltrarno-florence/`, desc: `围绕这个街区安排你们剩下的夜晚。` },
          ],
          ctaLabel: `双人预订`,
          prefill: 'florence',
          breadcrumbName: `佛罗伦萨双人意面课程`,
          product: {
            name: `佛罗伦萨双人意面课程`,
            description: `佛罗伦萨奥特拉诺区3小时情侣手工意面课程：在最多八人的餐桌旁预订两个名额，四种经典形状，以配有葡萄酒的托斯卡纳餐食收尾。每人95欧元，私人包场680欧元起。`,
            price: '95',
          },
        },
      },
    },
  },

  // Gives the footer's "Gift a class" link a real destination. Enquiry-driven
  // (emailSubject, like team-building) because a gift has no date to pick, and
  // the booking drawer forces one. Service schema, not Product: no fixed price.
  //
  // TODO (owner decision): voucher validity period, whether it is transferable,
  // and the delivery format. The copy deliberately promises none of these — fill
  // them in here once decided, then this page can carry them as a selling point.
  gift: {
    floatingCta: false,
    locales: {
      en: {
        slug: 'gift-a-cooking-class-florence',
        title: `Gift a Cooking Class in Florence: Pasta Class Vouchers (from €68) | Handmade Pasta Florence`,
        description: `Give a hands-on cooking class in Florence instead of another object. A pasta class gift voucher for our Oltrarno kitchen from €95, or a live online class with an ingredient kit from €68. No date locked in; they choose when.`,
        cl: {
          eyebrow: `Gift vouchers · Florence & online`,
          heading: `Gift a cooking class`,
          headingItal: `in Florence.`,
          lede: `A morning with their hands in the flour, a table they sat down at, a dish they can now make. It takes up no cupboard space and they will still be talking about it next year, which is more than most presents manage.`,
          image: { src: img.cookingClassGuests, alt: `Guests around the table at a Florence cooking class bought as a gift voucher`, w: 800, h: 1067 },
          price: `Any class`,
          priceNote: `from €68 · voucher sent by email`,
          facts: [
            { label: `Local Products`, value: `Fresh Tuscan produce, every time`, icon: 'leaf' },
            { label: `In Florence`, value: `from €95 per person`, icon: 'tag' },
            { label: `Live online`, value: `from €68 per person`, icon: 'laptop' },
            { label: `Private kitchen`, value: `from €680`, icon: 'home' },
            { label: `Date`, value: `not fixed; they choose`, icon: 'calendar' },
            { label: `Delivery`, value: `by email, same day`, icon: 'mail' },
            { label: `Reply time`, value: `within one working day`, icon: 'mail' },
          ],
          sections: [
            {
              title: `What are you actually giving?`,
              paras: [
                `Three hours in a small Oltrarno kitchen with two Tuscan agriturismo head chefs, hands in the flour from the first minute, four classic pasta shapes, and a sit-down lunch of everything they made with a glass of Chianti. Never more than eight people at the table.`,
                `If they are not coming to Florence any time soon, the <a href="/online-pasta-making-class/">live online class</a> works just as well as a gift: same chefs, same kitchen, with an ingredient kit shipped to their door. It is the one we send most often to people abroad.`,
              ],
            },
            {
              title: `How it works`,
              paras: [
                `Email us with who it is for, which class you have in mind and any message you would like on it. We will confirm the amount, take payment, and send you a voucher you can print or forward, usually the same day. No date is locked in when you buy; your recipient contacts us and picks a slot that suits them.`,
                `Not sure which class? Say roughly what they are like and what you want to spend, and we will suggest one. We would rather they got the right class than the expensive one.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Any class can be gifted: the <a href="/pasta-making-class-florence/">Chef's Table</a> (€95), <a href="/market-tour-cooking-class-florence/">Mercato &amp; Mani</a> (€145), the <a href="/private-cooking-class-florence/">private kitchen</a> (from €680) or the <a href="/online-pasta-making-class/">online class</a> (from €68).`,
                `Gifting to a couple? The <a href="/pasta-class-for-two-florence/">class for two</a> is the one people buy for anniversaries and weddings.`,
                `Gluten-free or other allergies are handled at no extra charge, so you do not need to know their diet when you buy.`,
                `Leaving it late? Email us and say so; a voucher can be with you within the hour during working hours.`,
              ],
            },
          ],
          faqs: [
            { q: `How do I buy a gift voucher?`, a: `Email ciao@handmadepastaflorence.com with who it is for, the class you have in mind and any message. We confirm the amount, arrange payment and send the voucher by email, usually the same day and within one working day at the latest.` },
            { q: `Does the recipient have to pick a date now?`, a: `No. Nothing is booked when you buy. They get in touch when they know their plans and choose a slot that works for them.` },
            { q: `How long is the voucher valid?`, a: `We agree that with you when you buy rather than imposing a fixed window; tell us the situation. We would much rather they came at the right time than lost it to a deadline.` },
            { q: `Can I gift the online class to someone abroad?`, a: `Yes, and it is one of our most-gifted options. The class is live from our Florence kitchen and we ship a fresh-pasta ingredient kit to their door, from €68 per person.` },
            { q: `Can I put a message on it?`, a: `Yes: send us the wording and we will put it on the voucher. If you want it to look like it came from you rather than from us, say so and we will keep our branding light.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `The class most people gift: three hours, four shapes, one long lunch. €95.` },
            { title: `Pasta Class for Two`, href: `/pasta-class-for-two-florence/`, desc: `The anniversary and wedding present, €95 each.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `For someone who is not in Italy, kit shipped to the door, from €68.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `A big gift for a big occasion, the whole kitchen, from €680.` },
          ],
          ctaLabel: `Request a gift voucher`,
          emailSubject: `Gift voucher request`,
          breadcrumbName: `Gift a Cooking Class`,
          service: {
            name: `Cooking Class Gift Voucher, Florence`,
            description: `Gift vouchers for hands-on pasta making classes in Florence's Oltrarno from €95, private kitchen buyouts from €680, and live online classes with a shipped ingredient kit from €68. Sent by email with no date fixed.`,
          },
        },
      },
      it: {
        slug: 'regala-corso-di-cucina-firenze',
        title: `Regala un Corso di Cucina a Firenze: Buoni Regalo Corso di Pasta (da €68) | Handmade Pasta Florence`,
        description: `Regala un corso di cucina pratico a Firenze invece dell'ennesimo oggetto. Buono regalo per la nostra cucina in Oltrarno da €95, o un corso in diretta online con kit ingredienti da €68. Nessuna data fissata; sceglie chi lo riceve.`,
        cl: {
          eyebrow: `Buoni regalo · Firenze e online`,
          heading: `Regala un corso di cucina`,
          headingItal: `a Firenze.`,
          lede: `Una mattina con le mani in farina, un tavolo a cui si sono seduti, un piatto che ora sanno rifare. Non occupa spazio in nessun armadio e l'anno prossimo ne parleranno ancora, cosa che alla maggior parte dei regali non riesce.`,
          image: { src: img.cookingClassGuests, alt: `Ospiti attorno al tavolo di un corso di cucina a Firenze acquistato come buono regalo`, w: 800, h: 1067 },
          price: `Qualsiasi corso`,
          priceNote: `da €68 · buono inviato via email`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani freschi, sempre`, icon: 'leaf' },
            { label: `A Firenze`, value: `da €95 a persona`, icon: 'tag' },
            { label: `In diretta online`, value: `da €68 a persona`, icon: 'laptop' },
            { label: `Cucina privata`, value: `da €680`, icon: 'home' },
            { label: `Data`, value: `non fissata; sceglie lui`, icon: 'calendar' },
            { label: `Consegna`, value: `via email, in giornata`, icon: 'mail' },
            { label: `Risposta`, value: `entro un giorno lavorativo`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Cosa stai regalando davvero?`,
              paras: [
                `Tre ore in una piccola cucina in Oltrarno con due capi chef toscani di agriturismo, le mani in farina dal primo minuto, quattro formati classici di pasta e un pranzo seduti a mangiare tutto quello che hanno preparato, con un bicchiere di Chianti. Mai più di otto persone al tavolo.`,
                `Se non verranno a Firenze a breve, anche il <a href="/it/corso-pasta-online/">corso in diretta online</a> funziona benissimo come regalo: stessi chef, stessa cucina, con un kit di ingredienti spedito a casa loro. È quello che mandiamo più spesso a chi vive all'estero.`,
              ],
            },
            {
              title: `Come funziona`,
              paras: [
                `Scrivici dicendo per chi è, quale corso hai in mente e l'eventuale dedica. Ti confermiamo l'importo, gestiamo il pagamento e ti inviamo un buono che puoi stampare o inoltrare, di solito in giornata. Al momento dell'acquisto non si fissa nessuna data: chi lo riceve ci contatta e sceglie l'orario che preferisce.`,
                `Non sai quale corso scegliere? Raccontaci più o meno come sono e quanto vuoi spendere, e te ne suggeriamo uno. Preferiamo che ricevano il corso giusto piuttosto che quello più caro.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Si può regalare qualsiasi corso: <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> (€95), <a href="/it/corso-cucina-tour-mercato-firenze/">Mercato &amp; Mani</a> (€145), la <a href="/it/corso-cucina-privato-firenze/">cucina privata</a> (da €680) o il <a href="/it/corso-pasta-online/">corso online</a> (da €68).`,
                `Regalo per una coppia? Il <a href="/it/corso-pasta-per-due-firenze/">corso per due</a> è quello che si compra per anniversari e matrimoni.`,
                `Senza glutine e altre allergie sono gestite senza costi aggiuntivi, quindi non devi conoscere la loro dieta al momento dell'acquisto.`,
                `Sei in ritardo? Scrivicelo; negli orari di lavoro il buono può arrivarti entro un'ora.`,
              ],
            },
          ],
          faqs: [
            { q: `Come acquisto un buono regalo?`, a: `Scrivi a ciao@handmadepastaflorence.com indicando per chi è, il corso che hai in mente e l'eventuale dedica. Confermiamo l'importo, organizziamo il pagamento e inviamo il buono via email, di solito in giornata e al massimo entro un giorno lavorativo.` },
            { q: `Chi lo riceve deve scegliere subito una data?`, a: `No. Al momento dell'acquisto non si prenota nulla. Ci contatteranno quando avranno chiari i loro programmi e sceglieranno l'orario che preferiscono.` },
            { q: `Quanto vale nel tempo il buono?`, a: `Lo concordiamo con te al momento dell'acquisto invece di imporre una scadenza fissa; raccontaci la situazione. Preferiamo di gran lunga che vengano nel momento giusto piuttosto che perdere il buono per una data.` },
            { q: `Posso regalare il corso online a qualcuno all'estero?`, a: `Sì, ed è una delle opzioni più regalate. Il corso è in diretta dalla nostra cucina a Firenze e spediamo a casa loro un kit di ingredienti per la pasta fresca, da €68 a persona.` },
            { q: `Posso aggiungere una dedica?`, a: `Sì: mandaci il testo e lo mettiamo sul buono. Se vuoi che sembri arrivato da te e non da noi, dillo e terremo il nostro marchio molto discreto.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il corso più regalato: tre ore, quattro formati, un lungo pranzo. €95.` },
            { title: `Corso di Pasta per Due`, href: `/it/corso-pasta-per-due-firenze/`, desc: `Il regalo da anniversario e da matrimonio, €95 a testa.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Per chi non è in Italia, kit spedito a casa, da €68.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `Un regalo grande per un'occasione grande, tutta la cucina, da €680.` },
          ],
          ctaLabel: `Richiedi un buono regalo`,
          emailSubject: `Richiesta buono regalo`,
          breadcrumbName: `Regala un Corso di Cucina`,
          service: {
            name: `Buono Regalo Corso di Cucina, Firenze`,
            description: `Buoni regalo per corsi pratici di pasta fresca in Oltrarno a Firenze da €95, privatizzazioni della cucina da €680 e corsi in diretta online con kit ingredienti spedito da €68. Inviati via email senza data fissata.`,
          },
        },
      },
      fr: {
        slug: 'offrir-cours-de-cuisine-florence',
        title: `Offrir un Cours de Cuisine à Florence: Bons Cadeaux Cours de Pâtes (dès 68 €) | Handmade Pasta Florence`,
        description: `Offrez un cours de cuisine à Florence plutôt qu'un objet de plus. Un bon cadeau pour notre cuisine de l'Oltrarno dès 95 €, ou un cours en direct en ligne avec kit d'ingrédients dès 68 €. Aucune date fixée; c'est le destinataire qui choisit.`,
        cl: {
          eyebrow: `Bons cadeaux · Florence et en ligne`,
          heading: `Offrir un cours de cuisine`,
          headingItal: `à Florence.`,
          lede: `Une matinée les mains dans la farine, une table où ils se sont assis, un plat qu'ils savent désormais refaire. Cela ne prend aucune place dans un placard et ils en parleront encore l'année prochaine, ce que peu de cadeaux réussissent.`,
          image: { src: img.cookingClassGuests, alt: `Des invités autour de la table d'un cours de cuisine à Florence offert en bon cadeau`, w: 800, h: 1067 },
          price: `Tous les cours`,
          priceNote: `dès 68 € · bon envoyé par email`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans frais, à chaque fois`, icon: 'leaf' },
            { label: `À Florence`, value: `dès 95 € par personne`, icon: 'tag' },
            { label: `En direct en ligne`, value: `dès 68 € par personne`, icon: 'laptop' },
            { label: `Cuisine privée`, value: `dès 680 €`, icon: 'home' },
            { label: `Date`, value: `non fixée; ils choisissent`, icon: 'calendar' },
            { label: `Livraison`, value: `par email, le jour même`, icon: 'mail' },
            { label: `Réponse`, value: `sous un jour ouvré`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Qu'offrez-vous vraiment ?`,
              paras: [
                `Trois heures dans une petite cuisine de l'Oltrarno avec deux chefs d'agritourismes toscans, les mains dans la farine dès la première minute, quatre formes de pâtes classiques et un déjeuner assis où l'on mange tout ce qu'ils ont préparé, avec un verre de Chianti. Jamais plus de huit personnes à table.`,
                `S'ils ne viennent pas à Florence de sitôt, le <a href="/fr/cours-pates-en-ligne/">cours en direct en ligne</a> fonctionne tout aussi bien en cadeau: mêmes chefs, même cuisine, avec un kit d'ingrédients livré chez eux. C'est celui que nous envoyons le plus souvent à l'étranger.`,
              ],
            },
            {
              title: `Comment ça marche`,
              paras: [
                `Écrivez-nous en précisant pour qui c'est, le cours que vous avez en tête et le message éventuel. Nous confirmons le montant, organisons le paiement et vous envoyons un bon à imprimer ou à transférer, généralement le jour même. Aucune date n'est bloquée à l'achat : le destinataire nous contacte et choisit le créneau qui lui convient.`,
                `Vous hésitez sur le cours ? Dites-nous à peu près comment ils sont et le budget que vous avez en tête, et nous vous en proposerons un. Nous préférons qu'ils reçoivent le bon cours plutôt que le plus cher.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `Tous les cours peuvent être offerts : <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> (95 €), <a href="/fr/cours-cuisine-visite-marche-florence/">Mercato &amp; Mani</a> (145 €), la <a href="/fr/cours-cuisine-prive-florence/">cuisine privée</a> (dès 680 €) ou le <a href="/fr/cours-pates-en-ligne/">cours en ligne</a> (dès 68 €).`,
                `Un cadeau pour un couple ? Le <a href="/fr/cours-de-pates-pour-deux-florence/">cours pour deux</a> est celui que l'on achète pour les anniversaires de mariage et les mariages.`,
                `Le sans gluten et les autres allergies sont pris en charge sans frais, vous n'avez donc pas besoin de connaître leur régime à l'achat.`,
                `Vous vous y prenez tard ? Dites-le-nous; pendant les heures ouvrées, un bon peut vous parvenir en moins d'une heure.`,
              ],
            },
          ],
          faqs: [
            { q: `Comment acheter un bon cadeau ?`, a: `Écrivez à ciao@handmadepastaflorence.com en précisant pour qui c'est, le cours envisagé et votre message. Nous confirmons le montant, organisons le paiement et envoyons le bon par email, généralement le jour même et au plus tard sous un jour ouvré.` },
            { q: `Le destinataire doit-il choisir une date tout de suite ?`, a: `Non. Rien n'est réservé à l'achat. Ils nous contactent quand leurs plans sont clairs et choisissent le créneau qui leur convient.` },
            { q: `Combien de temps le bon reste-t-il valable ?`, a: `Nous en convenons avec vous à l'achat plutôt que d'imposer une échéance fixe; expliquez-nous la situation. Nous préférons de loin qu'ils viennent au bon moment plutôt que de perdre le bon à cause d'une date.` },
            { q: `Puis-je offrir le cours en ligne à quelqu'un à l'étranger ?`, a: `Oui, et c'est l'une de nos options les plus offertes. Le cours est diffusé en direct depuis notre cuisine de Florence et nous expédions un kit d'ingrédients chez eux, dès 68 € par personne.` },
            { q: `Puis-je y ajouter un message ?`, a: `Oui: envoyez-nous le texte et nous le mettrons sur le bon. Si vous souhaitez qu'il ait l'air de venir de vous plutôt que de nous, dites-le et nous garderons notre marque très discrète.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Le cours le plus offert: trois heures, quatre formes, un long déjeuner. 95 €.` },
            { title: `Cours de Pâtes pour Deux`, href: `/fr/cours-de-pates-pour-deux-florence/`, desc: `Le cadeau d'anniversaire de mariage, 95 € par personne.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Pour quelqu'un qui n'est pas en Italie, kit livré, dès 68 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Un grand cadeau pour une grande occasion, toute la cuisine, dès 680 €.` },
          ],
          ctaLabel: `Demander un bon cadeau`,
          emailSubject: `Demande de bon cadeau`,
          breadcrumbName: `Offrir un Cours de Cuisine`,
          service: {
            name: `Bon Cadeau Cours de Cuisine, Florence`,
            description: `Bons cadeaux pour des cours pratiques de pâtes fraîches dans l'Oltrarno à Florence dès 95 €, privatisations de la cuisine dès 680 € et cours en direct en ligne avec kit d'ingrédients expédié dès 68 €. Envoyés par email, sans date fixée.`,
          },
        },
      },
      de: {
        slug: 'kochkurs-verschenken-florenz',
        title: `Kochkurs in Florenz verschenken: Gutscheine für Pasta-Kurse (ab 68 €) | Handmade Pasta Florence`,
        description: `Verschenken Sie einen Kochkurs in Florenz statt noch eines Gegenstands. Ein Gutschein für unsere Küche im Oltrarno ab 95 €, oder ein Live-Online-Kurs mit Zutaten-Kit ab 68 €. Kein festes Datum; die Beschenkten wählen selbst.`,
        cl: {
          eyebrow: `Gutscheine · Florenz und online`,
          heading: `Einen Kochkurs verschenken`,
          headingItal: `in Florenz.`,
          lede: `Ein Vormittag mit den Händen im Mehl, ein Tisch, an dem sie gesessen haben, ein Gericht, das sie jetzt können. Es nimmt keinen Schrankplatz weg, und im nächsten Jahr reden sie noch davon, was den meisten Geschenken nicht gelingt.`,
          image: { src: img.cookingClassGuests, alt: `Gäste am Tisch eines als Gutschein verschenkten Kochkurses in Florenz`, w: 800, h: 1067 },
          price: `Jeder Kurs`,
          priceNote: `ab 68 € · Gutschein per E-Mail`,
          facts: [
            { label: `Lokale Produkte`, value: `Frische toskanische Produkte, jedes Mal`, icon: 'leaf' },
            { label: `In Florenz`, value: `ab 95 € pro Person`, icon: 'tag' },
            { label: `Live online`, value: `ab 68 € pro Person`, icon: 'laptop' },
            { label: `Private Küche`, value: `ab 680 €`, icon: 'home' },
            { label: `Datum`, value: `offen; sie wählen`, icon: 'calendar' },
            { label: `Zustellung`, value: `per E-Mail, am selben Tag`, icon: 'mail' },
            { label: `Antwortzeit`, value: `binnen eines Werktags`, icon: 'mail' },
          ],
          sections: [
            {
              title: `Was verschenken Sie eigentlich?`,
              paras: [
                `Drei Stunden in einer kleinen Küche im Oltrarno mit zwei toskanischen Agriturismo-Küchenchefs, ab der ersten Minute die Hände im Mehl, vier klassische Pastaformen und ein gemeinsames Mittagessen aus allem, was sie gemacht haben, mit einem Glas Chianti. Nie mehr als acht Menschen am Tisch.`,
                `Wenn sie so bald nicht nach Florenz kommen, funktioniert der <a href="/de/online-pasta-kurs/">Live-Online-Kurs</a> als Geschenk genauso gut: dieselben Köche, dieselbe Küche, mit einem Zutaten-Kit an ihre Tür. Den verschicken wir am häufigsten ins Ausland.`,
              ],
            },
            {
              title: `So funktioniert es`,
              paras: [
                `Schreiben Sie uns, für wen es ist, welchen Kurs Sie im Sinn haben und welchen Text Sie darauf möchten. Wir bestätigen den Betrag, regeln die Zahlung und senden Ihnen einen Gutschein zum Ausdrucken oder Weiterleiten, meist am selben Tag. Beim Kauf wird kein Datum festgelegt: Die Beschenkten melden sich und wählen einen Termin, der ihnen passt.`,
                `Unsicher, welcher Kurs? Erzählen Sie uns grob, wie sie sind und was Sie ausgeben möchten, und wir schlagen einen vor. Uns ist der passende Kurs lieber als der teure.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Jeder Kurs lässt sich verschenken: <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> (95 €), <a href="/de/markt-tour-kochkurs-florenz/">Mercato &amp; Mani</a> (145 €), die <a href="/de/privater-kochkurs-florenz/">private Küche</a> (ab 680 €) oder der <a href="/de/online-pasta-kurs/">Online-Kurs</a> (ab 68 €).`,
                `Ein Geschenk für ein Paar? Der <a href="/de/pasta-kurs-fuer-zwei-florenz/">Kurs für zwei</a> ist der, den man zu Jahrestagen und Hochzeiten kauft.`,
                `Glutenfrei und andere Allergien werden ohne Aufpreis berücksichtigt, Sie müssen die Ernährung beim Kauf also nicht kennen.`,
                `Spät dran? Sagen Sie es uns; während der Arbeitszeiten kann ein Gutschein innerhalb einer Stunde bei Ihnen sein.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie kaufe ich einen Gutschein?`, a: `Schreiben Sie an ciao@handmadepastaflorence.com, für wen er ist, welchen Kurs Sie im Sinn haben und welchen Text Sie möchten. Wir bestätigen den Betrag, regeln die Zahlung und senden den Gutschein per E-Mail, meist am selben Tag und spätestens binnen eines Werktags.` },
            { q: `Müssen die Beschenkten jetzt schon ein Datum wählen?`, a: `Nein. Beim Kauf wird nichts gebucht. Sie melden sich, wenn ihre Pläne feststehen, und wählen einen Termin, der für sie passt.` },
            { q: `Wie lange ist der Gutschein gültig?`, a: `Das vereinbaren wir beim Kauf mit Ihnen, statt eine feste Frist zu setzen; schildern Sie uns die Situation. Uns ist weit lieber, dass sie zum richtigen Zeitpunkt kommen, als dass ein Datum den Gutschein verfallen lässt.` },
            { q: `Kann ich den Online-Kurs jemandem im Ausland schenken?`, a: `Ja, und das ist eine unserer meistverschenkten Optionen. Der Kurs läuft live aus unserer Küche in Florenz, und wir schicken ein Frischpasta-Zutaten-Kit an die Tür, ab 68 € pro Person.` },
            { q: `Kann ich eine persönliche Widmung daraufsetzen?`, a: `Ja: schicken Sie uns den Text und wir setzen ihn auf den Gutschein. Wenn er eher von Ihnen als von uns kommen soll, sagen Sie Bescheid, dann halten wir unser Branding sehr zurück.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Der meistverschenkte Kurs: drei Stunden, vier Formen, ein langes Essen. 95 €.` },
            { title: `Pasta-Kurs für Zwei`, href: `/de/pasta-kurs-fuer-zwei-florenz/`, desc: `Das Geschenk zum Jahrestag und zur Hochzeit, 95 € pro Person.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Für jemanden außerhalb Italiens, Kit an die Tür, ab 68 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Ein großes Geschenk für einen großen Anlass, die ganze Küche, ab 680 €.` },
          ],
          ctaLabel: `Gutschein anfragen`,
          emailSubject: `Gutschein-Anfrage`,
          breadcrumbName: `Kochkurs verschenken`,
          service: {
            name: `Kochkurs-Gutschein, Florenz`,
            description: `Gutscheine für praktische Pasta-Kochkurse in Florenz' Oltrarno ab 95 €, private Küchenbuchungen ab 680 € und Live-Online-Kurse mit versandtem Zutaten-Kit ab 68 €. Per E-Mail zugestellt, ohne festes Datum.`,
          },
        },
      },
      zh: {
        slug: 'pengren-kecheng-liquan-foluolunsa',
        title: `赠送佛罗伦萨烹饪课程：意面课程礼券 (68欧元起) | Handmade Pasta Florence`,
        description: `与其再送一件物品，不如赠送一堂佛罗伦萨的亲手实践烹饪课程。我们奥特拉诺厨房的礼券95欧元起，或含食材包的在线直播课程68欧元起。不锁定日期，由收礼人自己选择。`,
        cl: {
          eyebrow: `礼券 · 佛罗伦萨与线上`,
          heading: `赠送一堂`,
          headingItal: `佛罗伦萨烹饪课程。`,
          lede: `一个双手沾满面粉的上午，一张他们真正坐下来的餐桌，一道他们从此会做的菜。它不占用任何柜子空间，而明年他们还会提起它，这是大多数礼物做不到的。`,
          image: { src: img.cookingClassGuests, alt: `作为礼券赠送的佛罗伦萨烹饪课程上围坐餐桌的客人`, w: 800, h: 1067 },
          price: `任意课程`,
          priceNote: `68欧元起 · 礼券通过邮件发送`,
          facts: [
            { label: `本地食材`, value: `每一次都新鲜的托斯卡纳食材`, icon: 'leaf' },
            { label: `在佛罗伦萨`, value: `每人95欧元起`, icon: 'tag' },
            { label: `在线直播`, value: `每人68欧元起`, icon: 'laptop' },
            { label: `私人厨房`, value: `680欧元起`, icon: 'home' },
            { label: `日期`, value: `不固定，由他们选择`, icon: 'calendar' },
            { label: `送达方式`, value: `邮件，当天送达`, icon: 'mail' },
            { label: `回复时间`, value: `一个工作日内`, icon: 'mail' },
          ],
          sections: [
            {
              title: `您真正赠送的是什么？`,
              paras: [
                `在奥特拉诺的一间小厨房里与两位托斯卡纳农庄主厨共度三小时，从第一分钟起双手就在面粉里，四种经典意面形状，以及一顿坐下来享用自己成果的午餐，配一杯基安蒂。餐桌人数从不超过八位。`,
                `如果他们近期不会来佛罗伦萨，<a href="/zh/zaixian-yidali-mian-kecheng/">在线直播课程</a>作为礼物同样出色：同样的主厨、同样的厨房，并将食材包寄送到他们家门口。这是我们寄往海外最多的一份礼物。`,
              ],
            },
            {
              title: `如何操作`,
              paras: [
                `发邮件告诉我们受赠人是谁、您考虑哪门课程，以及您希望写上的留言。我们会确认金额、安排付款，并给您一份可以打印或转发的礼券，通常当天就能发出。购买时不锁定任何日期：收礼人会与我们联系，挑选适合他们的时段。`,
                `不确定选哪门课？大致说说他们是什么样的人以及您的预算，我们会给出建议。比起最贵的那门，我们更希望他们收到最合适的那门。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `任何课程都可以作为礼物：<a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌</a>（€95）、<a href="/zh/shichang-daolan-pengren-kecheng-foluolunsa/">Mercato &amp; Mani</a>（€145）、<a href="/zh/siren-pengren-kecheng-foluolunsa/">私人厨房</a>（680欧元起）或<a href="/zh/zaixian-yidali-mian-kecheng/">在线课程</a>（68欧元起）。`,
                `送给一对情侣？<a href="/zh/shuangren-yidali-mian-kecheng-foluolunsa/">双人课程</a>是人们为纪念日和婚礼购买的那一款。`,
                `无麸质及其他过敏需求均免费处理，因此购买时您不需要了解他们的饮食情况。`,
                `时间紧迫？告诉我们，在工作时间内，礼券可以在一小时内送到您手中。`,
              ],
            },
          ],
          faqs: [
            { q: `我该如何购买礼券？`, a: `发送邮件至 ciao@handmadepastaflorence.com，说明受赠人是谁、您考虑的课程以及留言内容。我们会确认金额、安排付款，并通过邮件发送礼券，通常当天送达，最迟不超过一个工作日。` },
            { q: `收礼人现在就必须选好日期吗？`, a: `不必。购买时不会预订任何内容。他们会在行程确定后与我们联系，挑选适合自己的时段。` },
            { q: `礼券的有效期是多久？`, a: `我们会在您购买时与您约定，而不是设定一个固定期限，请告诉我们具体情况。比起因为一个截止日期而作废，我们更希望他们在合适的时机前来。` },
            { q: `我可以把在线课程送给身在海外的人吗？`, a: `可以，这也是我们最常被选作礼物的选项之一。课程从我们佛罗伦萨的厨房直播，我们会把新鲜意面食材包寄到他们家门口，每人68欧元起。` },
            { q: `可以加上一段留言吗？`, a: `可以，把文字发给我们，我们会印在礼券上。如果您希望它看起来像来自您而不是来自我们，请告诉我们，我们会把品牌标识处理得很低调。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `最常被赠送的课程：三小时，四种形状，一顿悠长的午餐。€95。` },
            { title: `双人意面课程`, href: `/zh/shuangren-yidali-mian-kecheng-foluolunsa/`, desc: `纪念日与婚礼礼物，每人€95。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `送给不在意大利的人，食材包送到家，68欧元起。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `大场合的大礼物，整个厨房，680欧元起。` },
          ],
          ctaLabel: `申请礼券`,
          emailSubject: `礼券申请`,
          breadcrumbName: `赠送烹饪课程`,
          service: {
            name: `佛罗伦萨烹饪课程礼券`,
            description: `佛罗伦萨奥特拉诺区手工意面课程礼券95欧元起、私人厨房包场680欧元起，以及含食材包寄送的在线直播课程68欧元起。通过邮件发送，不固定日期。`,
          },
        },
      },
    },
  },

  'family': {
    floatingCta: true,
    courseMode: 'Onsite',
    courseDuration: 'PT3H',
    locales: {
      en: {
        slug: 'family-cooking-class-florence',
        title: `Family Cooking Class in Florence: Kids 6+ from €50 | Handmade Pasta Florence`,
        description: `A hands-on family pasta class in Florence's Oltrarno. Children 6 and up roll their own pasta beside you at a table of never more than eight, then everyone eats what they made. €95 per adult, €50 for ages 6–12, under 6 free.`,
        cl: {
          eyebrow: `For families · Oltrarno, Florence`,
          heading: `A family cooking class in Florence,`,
          headingItal: `with the children actually cooking.`,
          lede: `Not a class where the adults cook and the children wait. Every child gets their own board, their own piece of dough and a chef who checks on them, and at a table of eight, we can actually do that. Three hours, then everyone sits down to eat what they made.`,
          image: { src: img.cuttingPizza, alt: `A family cooking together at a hands-on pasta class in Florence`, w: 1000, h: 667 },
          price: `€95`,
          priceNote: `per adult · €50 ages 6–12 · under 6 free`,
          facts: [
            { label: `Local Products`, value: `Seasonal Tuscan produce`, icon: 'leaf' },
            { label: `Ages`, value: `6 and up, with a parent`, icon: 'people' },
            { label: `Children`, value: `€50 (6–12) · under 6 free`, icon: 'tag' },
            { label: `Length`, value: `about 3 hours`, icon: 'clock' },
            { label: `Group size`, value: `max 8 including children`, icon: 'table' },
            { label: `Where`, value: `Oltrarno, near Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `What do the children actually do?`,
              paras: [
                `They make pasta. Properly, not a token ball of dough at the end of the table. Each child gets their own floured board, their own dough to knead, and their own shapes to roll: pici first, because rolling a strand between your palms is the most satisfying thing a six-year-old can do with flour, then a filled shape if they are patient enough.`,
                `Because there are never more than eight people at the table in total, a chef can stand with a child through a fold that keeps failing. That is the whole reason this works at our table and does not at a class of twelve.`,
              ],
            },
            {
              title: `Is it going to hold their attention for three hours?`,
              paras: [
                `Mostly yes, and we build the class around the honest answer. The hands-on stretches are broken up (knead, rest the dough, eat something, come back to it), because a rested dough and a rested child are both easier to work with. The last stretch is cooking and eating, which no one has ever had trouble sitting through.`,
                `If a younger child runs out of patience, that is fine and expected. There is space to sit, the kitchen is not precious, and no one will mind. We would rather you finish the class than leave feeling apologetic.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Ages 6 and up cook with us. Under 6 are welcome to come and eat at no charge, but the boards and knives are not built for them.`,
                `Every child needs an adult at the table with them; this is a class you do together, not a drop-off.`,
                `Children get the same meal, minus the wine: pasta they made, a sauce, and something to drink that isn't Chianti. Two Tuscan pours are included for the adults.`,
                `Knife work is limited and supervised. Boiling water stays with the chefs.`,
                `Gluten-free or an allergy in the family? Say so when you book: dedicated station, no surcharge, same table as everyone else. See the <a href="/gluten-free-cooking-class-florence/">gluten-free class</a>.`,
                `We email the recipes afterwards, and whatever you don't finish gets dried and bagged to take back with you, which tends to be the part children talk about.`,
              ],
            },
            {
              title: `How booking works`,
              paras: [
                `Hit "Book this class" and tell us how many adults and how many children, with their ages. It opens a WhatsApp chat with the details filled in and we confirm personally, including whether the timing you want suits the ages you're bringing. You can also email ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `What age do children need to be for the cooking class?`, a: `Six and up to cook with us, always with an adult at the table. Under 6 are welcome to sit and eat free of charge, but the boards, rolling pins and knives aren't built for smaller hands and we'd rather say so than take your money.` },
            { q: `How much does the family class cost for children?`, a: `€50 for ages 6–12, free for under 6, and €95 per adult, the same price as any other guest at the table. There's no separate family surcharge.` },
            { q: `Do the children make their own pasta or just watch?`, a: `Their own. Each child gets a board, their own dough and their own shapes. Because the table never seats more than eight in total, a chef has time to work with a child individually, which is the practical reason this class exists at our size and not at a class of twelve.` },
            { q: `Is knife work safe for kids in the class?`, a: `Knife work is limited, supervised and done with the chefs alongside. Boiling water and the pot stay with us. Everything else (flour, dough, rolling, shaping, filling) is theirs to do.` },
            { q: `What if my child gets bored halfway through?`, a: `It happens and we plan for it. The hands-on stretches are deliberately broken up by resting the dough and eating something, and there's space to sit out a stretch. Nobody minds, and it won't spoil the class for the rest of the table.` },
            { q: `Can you cater for a child with an allergy?`, a: `Usually yes, including coeliac: a dedicated station, its own flour blend and its own pot of water, at no extra charge and at the same table as everyone else. Send us the full list when you book rather than on the day.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `The same class for adults only: four shapes, one long lunch. €95.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen privately yours, for bigger family groups, from €680.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Market walk at dawn, then cook the basket. Better for teenagers than toddlers, €145.` },
            { title: `The four shapes, explained`, href: `/pasta-shapes/`, desc: `Show them what pici and tortelli are before you come.` },
          ],
          ctaLabel: `Book for the family`,
          prefill: 'florence',
          breadcrumbName: `Family Cooking Class in Florence`,
          showPastaCrumb: true,
          product: {
            name: `Family Cooking Class in Florence`,
            description: `A 3-hour hands-on family pasta class in Florence's Oltrarno. Children aged 6+ roll their own pasta at a table of never more than eight, then everyone eats what they made. €95 per adult, €50 for ages 6–12, under 6 free.`,
            price: '95',
          },
        },
      },
      it: {
        slug: 'corso-cucina-famiglia-firenze',
        title: `Corso di Cucina per Famiglie a Firenze: Bambini da €50 | Handmade Pasta Florence`,
        description: `Un corso di pasta fresca per famiglie in Oltrarno a Firenze. I bambini dai 6 anni stendono la loro pasta accanto a voi a un tavolo di massimo otto persone, poi si mangia tutti insieme. €95 ad adulto, €50 per 6–12 anni, sotto i 6 gratis.`,
        cl: {
          eyebrow: `Per famiglie · Oltrarno, Firenze`,
          heading: `Un corso di cucina per famiglie a Firenze,`,
          headingItal: `dove i bambini cucinano davvero.`,
          lede: `Non un corso dove cucinano i grandi e i bambini aspettano. Ogni bambino ha il suo tagliere, il suo pezzo di impasto e uno chef che passa a controllare, e a un tavolo da otto possiamo davvero farlo. Tre ore, poi ci si siede tutti a mangiare quello che si è fatto.`,
          image: { src: img.cuttingPizza, alt: `Una famiglia che cucina insieme a un corso di pasta fresca a Firenze`, w: 1000, h: 667 },
          price: `€95`,
          priceNote: `ad adulto · €50 dai 6 ai 12 · sotto i 6 gratis`,
          facts: [
            { label: `Prodotti Locali`, value: `Prodotti toscani di stagione`, icon: 'leaf' },
            { label: `Età`, value: `dai 6 anni, con un adulto`, icon: 'people' },
            { label: `Bambini`, value: `€50 (6–12) · sotto i 6 gratis`, icon: 'tag' },
            { label: `Durata`, value: `circa 3 ore`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max 8 bambini inclusi`, icon: 'table' },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Cosa fanno davvero i bambini?`,
              paras: [
                `Fanno la pasta. Sul serio, non una pallina di impasto simbolica in fondo al tavolo. Ogni bambino ha il suo tagliere infarinato, il suo impasto da lavorare e i suoi formati da tirare: prima i pici, perché rotolare un filo di pasta tra le mani è la cosa più soddisfacente che un bambino di sei anni possa fare con la farina, poi un formato ripieno se ha la pazienza.`,
                `Siccome al tavolo non ci sono mai più di otto persone in tutto, uno chef può restare accanto a un bambino finché quella piega che non viene, viene. È esattamente il motivo per cui questo funziona al nostro tavolo e non in un corso da dodici.`,
              ],
            },
            {
              title: `Reggeranno tre ore?`,
              paras: [
                `In gran parte sì, e il corso è costruito attorno alla risposta onesta. Le fasi pratiche sono spezzate (impastare, far riposare la pasta, mangiare qualcosa, tornarci), perché un impasto riposato e un bambino riposato si lavorano entrambi meglio. L'ultima parte è cuocere e mangiare, e quella non è mai stata un problema per nessuno.`,
                `Se un bambino piccolo esaurisce la pazienza va benissimo, ed è previsto. C'è dove sedersi, la cucina non è un salotto buono e non darà fastidio a nessuno. Preferiamo che finiate il corso piuttosto che andarvene sentendovi in colpa.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Si cucina dai 6 anni in su. Sotto i 6 sono i benvenuti a venire e mangiare gratis, ma taglieri e coltelli non sono fatti per loro.`,
                `Ogni bambino ha bisogno di un adulto al tavolo con sé: è un corso che si fa insieme, non un servizio di custodia.`,
                `I bambini mangiano lo stesso pasto, senza vino: la pasta che hanno fatto, un sugo e qualcosa da bere che non sia Chianti. Per gli adulti due calici toscani sono inclusi.`,
                `L'uso dei coltelli è limitato e sorvegliato. L'acqua bollente resta agli chef.`,
                `Senza glutine o un'allergia in famiglia? Ditecelo alla prenotazione: postazione dedicata, nessun supplemento, stesso tavolo di tutti. Vedi il <a href="/it/corso-cucina-senza-glutine-firenze/">corso senza glutine</a>.`,
                `Mandiamo le ricette per email, e quello che non finite lo facciamo asciugare e insacchettare da portare via, di solito è la parte di cui i bambini parlano di più.`,
              ],
            },
            {
              title: `Come funziona la prenotazione`,
              paras: [
                `Premi "Prenota per la famiglia" e dicci quanti adulti e quanti bambini, con le età. Si apre una chat WhatsApp con i dettagli già compilati e confermiamo di persona, compreso se l'orario che volete è adatto alle età che portate. Puoi anche scrivere a ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Da che età i bambini possono fare il corso di cucina?`, a: `Dai 6 anni in su per cucinare, sempre con un adulto al tavolo. Sotto i 6 sono i benvenuti a sedersi e mangiare gratis, ma taglieri, matterelli e coltelli non sono pensati per mani più piccole e preferiamo dirlo piuttosto che prendervi i soldi.` },
            { q: `Quanto costa il corso per i bambini?`, a: `€50 dai 6 ai 12 anni, gratis sotto i 6, e €95 per adulto, lo stesso prezzo di qualsiasi altro ospite al tavolo. Non c'è nessun sovrapprezzo "famiglia".` },
            { q: `I bambini fanno davvero la pasta o guardano soltanto?`, a: `La fanno. Ogni bambino ha un tagliere, il suo impasto e i suoi formati. Siccome al tavolo non ci sono mai più di otto persone in tutto, uno chef ha il tempo di seguire un bambino singolarmente, che è il motivo pratico per cui questo corso esiste alla nostra dimensione e non in un corso da dodici.` },
            { q: `È sicuro l'uso dei coltelli per i bambini?`, a: `L'uso dei coltelli è limitato, sorvegliato e fatto con gli chef accanto. L'acqua bollente e la pentola restano a noi. Tutto il resto (farina, impasto, stesura, formatura, ripieno) è roba loro.` },
            { q: `E se mio figlio si annoia a metà?`, a: `Succede e lo mettiamo in conto. Le fasi pratiche sono spezzate apposta dai riposi dell'impasto e da qualcosa da mangiare, e c'è spazio per saltare un pezzo. Non dà fastidio a nessuno e non rovina il corso agli altri.` },
            { q: `Potete gestire un bambino con un'allergia?`, a: `Di solito sì, celiachia compresa: postazione dedicata, farina dedicata e pentola dedicata, senza supplemento e allo stesso tavolo di tutti gli altri. Mandateci l'elenco completo alla prenotazione, non il giorno stesso.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Lo stesso corso per soli adulti: quattro formati, un lungo pranzo. €95.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `Tutta la cucina solo per voi, per gruppi familiari più grandi, da €680.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Mercato all'alba, poi si cucina il cesto. Meglio per adolescenti che per bambini piccoli, €145.` },
          ],
          ctaLabel: `Prenota per la famiglia`,
          prefill: 'florence',
          breadcrumbName: `Corso di Cucina per Famiglie`,
          showPastaCrumb: true,
          product: {
            name: `Corso di Cucina per Famiglie a Firenze`,
            description: `Un corso pratico di pasta fresca per famiglie di 3 ore in Oltrarno a Firenze. I bambini dai 6 anni stendono la loro pasta a un tavolo di massimo otto persone, poi si mangia tutti insieme. €95 ad adulto, €50 per 6–12 anni, sotto i 6 gratis.`,
            price: '95',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-famille-florence',
        title: `Cours de Cuisine en Famille à Florence: Enfants dès 50 € | Handmade Pasta Florence`,
        description: `Un cours de pâtes fraîches en famille dans l'Oltrarno à Florence. Les enfants dès 6 ans façonnent leurs propres pâtes à côté de vous, à une table de huit maximum, puis tout le monde mange. 95 € par adulte, 50 € de 6 à 12 ans, gratuit avant 6 ans.`,
        cl: {
          eyebrow: `Pour les familles · Oltrarno, Florence`,
          heading: `Un cours de cuisine en famille à Florence,`,
          headingItal: `où les enfants cuisinent vraiment.`,
          lede: `Pas un cours où les adultes cuisinent pendant que les enfants attendent. Chaque enfant a sa planche, son morceau de pâte et un chef qui passe le voir, et à une table de huit, nous pouvons réellement le faire. Trois heures, puis tout le monde s'assoit pour manger ce qu'il a préparé.`,
          image: { src: img.cuttingPizza, alt: `Une famille cuisinant ensemble lors d'un cours de pâtes à Florence`, w: 1000, h: 667 },
          price: `€95`,
          priceNote: `par adulte · 50 € de 6 à 12 ans · gratuit avant 6 ans`,
          facts: [
            { label: `Produits Locaux`, value: `Produits toscans de saison`, icon: 'leaf' },
            { label: `Âge`, value: `dès 6 ans, avec un adulte`, icon: 'people' },
            { label: `Enfants`, value: `50 € (6–12) · gratuit avant 6 ans`, icon: 'tag' },
            { label: `Durée`, value: `environ 3 heures`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max 8, enfants compris`, icon: 'table' },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Que font réellement les enfants ?`,
              paras: [
                `Ils font des pâtes. Vraiment, pas une boulette symbolique au bout de la table. Chaque enfant a sa planche farinée, sa pâte à pétrir et ses formes à rouler : les pici d'abord, parce que rouler un brin entre ses paumes est la chose la plus satisfaisante qu'un enfant de six ans puisse faire avec de la farine, puis une forme farcie s'il en a la patience.`,
                `Comme il n'y a jamais plus de huit personnes à table au total, un chef peut rester auprès d'un enfant jusqu'à ce que le pliage qui rate finisse par réussir. C'est exactement pour cela que cela fonctionne à notre table et pas dans un cours de douze.`,
              ],
            },
            {
              title: `Vont-ils tenir trois heures ?`,
              paras: [
                `En grande partie oui, et le cours est construit autour de la réponse honnête. Les phases pratiques sont entrecoupées (pétrir, laisser reposer la pâte, manger un morceau, y revenir), parce qu'une pâte reposée et un enfant reposé se travaillent mieux tous les deux. La dernière partie, c'est cuisiner et manger, et personne n'a jamais eu de mal à tenir jusque-là.`,
                `Si un plus jeune est à court de patience, c'est très bien et c'est prévu. Il y a de quoi s'asseoir, la cuisine n'est pas un salon, et cela ne gênera personne. Nous préférons que vous finissiez le cours plutôt que de partir en vous excusant.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `On cuisine à partir de 6 ans. Les moins de 6 ans sont les bienvenus pour venir et manger gratuitement, mais les planches et les couteaux ne sont pas faits pour eux.`,
                `Chaque enfant doit avoir un adulte à table avec lui : c'est un cours qu'on fait ensemble, pas une garderie.`,
                `Les enfants ont le même repas, sans le vin : les pâtes qu'ils ont faites, une sauce, et autre chose que du Chianti à boire. Pour les adultes, deux verres toscans sont compris.`,
                `Le maniement du couteau est limité et surveillé. L'eau bouillante reste aux chefs.`,
                `Sans gluten ou une allergie dans la famille ? Dites-le à la réservation: poste dédié, sans supplément, à la même table que tout le monde. Voir le <a href="/fr/cours-cuisine-sans-gluten-florence/">cours sans gluten</a>.`,
                `Nous envoyons les recettes par email, et ce que vous ne finissez pas est séché et mis en sachet pour l'emporter, c'est en général la partie dont les enfants parlent.`,
              ],
            },
            {
              title: `Comment réserver`,
              paras: [
                `Cliquez sur « Réserver pour la famille » et dites-nous combien d'adultes et combien d'enfants, avec leurs âges. Cela ouvre une conversation WhatsApp pré-remplie et nous confirmons personnellement, y compris si l'horaire souhaité convient aux âges que vous amenez. Vous pouvez aussi écrire à ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `À partir de quel âge les enfants peuvent-ils suivre le cours ?`, a: `Dès 6 ans pour cuisiner, toujours avec un adulte à table. Les moins de 6 ans sont les bienvenus pour s'asseoir et manger gratuitement, mais les planches, rouleaux et couteaux ne sont pas pensés pour des mains plus petites et nous préférons le dire plutôt que de prendre votre argent.` },
            { q: `Combien coûte le cours pour les enfants ?`, a: `50 € de 6 à 12 ans, gratuit avant 6 ans, et 95 € par adulte, le même prix que n'importe quel autre convive. Il n'y a aucun supplément « famille ».` },
            { q: `Les enfants font-ils vraiment les pâtes ou regardent-ils ?`, a: `Ils les font. Chaque enfant a une planche, sa pâte et ses formes. Comme la table ne compte jamais plus de huit personnes au total, un chef a le temps de suivre un enfant individuellement, c'est la raison pratique pour laquelle ce cours existe à notre taille et pas dans un cours de douze.` },
            { q: `L'usage du couteau est-il sans danger pour les enfants ?`, a: `Il est limité, surveillé et fait avec les chefs à côté. L'eau bouillante et la casserole restent avec nous. Tout le reste (farine, pâte, étalage, façonnage, garniture) est à eux.` },
            { q: `Et si mon enfant s'ennuie à mi-parcours ?`, a: `Cela arrive et c'est prévu. Les phases pratiques sont volontairement entrecoupées par les temps de repos de la pâte et par une collation, et il y a de la place pour sauter un passage. Cela ne gêne personne et ne gâche pas le cours pour le reste de la table.` },
            { q: `Pouvez-vous gérer un enfant allergique ?`, a: `En général oui, cœliaque compris: un poste dédié, sa propre farine et sa propre casserole, sans supplément et à la même table que tout le monde. Envoyez-nous la liste complète à la réservation, pas le jour même.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Le même cours entre adultes: quatre formes, un long déjeuner. 95 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine rien que pour vous, pour les grandes familles, dès 680 €.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Le marché à l'aube, puis on cuisine le panier. Mieux pour les ados que pour les tout-petits, 145 €.` },
          ],
          ctaLabel: `Réserver pour la famille`,
          prefill: 'florence',
          breadcrumbName: `Cours de Cuisine en Famille`,
          showPastaCrumb: true,
          product: {
            name: `Cours de Cuisine en Famille à Florence`,
            description: `Un cours pratique de pâtes fraîches en famille de 3 heures dans l'Oltrarno à Florence. Les enfants dès 6 ans façonnent leurs pâtes à une table de huit maximum, puis tout le monde mange. 95 € par adulte, 50 € de 6 à 12 ans, gratuit avant 6 ans.`,
            price: '95',
          },
        },
      },
      de: {
        slug: 'familien-kochkurs-florenz',
        title: `Familien-Kochkurs in Florenz: Kinder ab 50 € | Handmade Pasta Florence`,
        description: `Ein Pasta-Kurs für Familien im Oltrarno in Florenz. Kinder ab 6 Jahren rollen ihre eigene Pasta neben Ihnen, an einem Tisch mit höchstens acht Plätzen, danach essen alle gemeinsam. 95 € pro Erwachsenem, 50 € für 6–12 Jahre, unter 6 kostenlos.`,
        cl: {
          eyebrow: `Für Familien · Oltrarno, Florenz`,
          heading: `Ein Familien-Kochkurs in Florenz,`,
          headingItal: `bei dem die Kinder wirklich kochen.`,
          lede: `Kein Kurs, bei dem die Erwachsenen kochen und die Kinder warten. Jedes Kind bekommt sein eigenes Brett, sein eigenes Stück Teig und einen Koch, der nach ihm sieht, und an einem Tisch für acht können wir das auch wirklich tun. Drei Stunden, dann setzen sich alle hin und essen, was sie gemacht haben.`,
          image: { src: img.cuttingPizza, alt: `Eine Familie kocht gemeinsam bei einem Pasta-Kurs in Florenz`, w: 1000, h: 667 },
          price: `€95`,
          priceNote: `pro Erwachsenem · 50 € für 6–12 · unter 6 kostenlos`,
          facts: [
            { label: `Lokale Produkte`, value: `Saisonale toskanische Produkte`, icon: 'leaf' },
            { label: `Alter`, value: `ab 6 Jahren, mit einem Erwachsenen`, icon: 'people' },
            { label: `Kinder`, value: `50 € (6–12) · unter 6 kostenlos`, icon: 'tag' },
            { label: `Dauer`, value: `etwa 3 Stunden`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. 8 inkl. Kinder`, icon: 'table' },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `Was machen die Kinder wirklich?`,
              paras: [
                `Sie machen Pasta. Richtig, kein symbolisches Kügelchen Teig am Tischende. Jedes Kind bekommt sein eigenes bemehltes Brett, seinen eigenen Teig zum Kneten und seine eigenen Formen: zuerst Pici, weil einen Strang zwischen den Handflächen zu rollen das Befriedigendste ist, was ein Sechsjähriger mit Mehl anstellen kann, danach eine gefüllte Form, wenn die Geduld reicht.`,
                `Weil insgesamt nie mehr als acht Personen am Tisch sitzen, kann ein Koch so lange bei einem Kind bleiben, bis die Faltung sitzt. Genau deshalb funktioniert das an unserem Tisch und nicht in einem Kurs mit zwölf Leuten.`,
              ],
            },
            {
              title: `Halten sie drei Stunden durch?`,
              paras: [
                `Größtenteils ja, und der Kurs ist um die ehrliche Antwort herum gebaut. Die praktischen Abschnitte sind unterbrochen (kneten, den Teig ruhen lassen, etwas essen, zurückkommen), weil sich ein geruhter Teig und ein geruhtes Kind beide besser bearbeiten lassen. Der letzte Abschnitt ist Kochen und Essen, und damit hatte noch nie jemand Mühe.`,
                `Wenn einem jüngeren Kind die Geduld ausgeht, ist das völlig in Ordnung und eingeplant. Es gibt Platz zum Sitzen, die Küche ist keine gute Stube, und es wird niemanden stören. Uns ist lieber, Sie beenden den Kurs, als dass Sie mit schlechtem Gewissen gehen.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Gekocht wird ab 6 Jahren. Unter 6 sind herzlich willkommen mitzukommen und kostenlos mitzuessen, aber Bretter und Messer sind nicht für sie gemacht.`,
                `Jedes Kind braucht einen Erwachsenen mit am Tisch; das ist ein Kurs, den man zusammen macht, keine Betreuung.`,
                `Kinder bekommen dasselbe Essen, nur ohne Wein: die Pasta, die sie gemacht haben, eine Sauce und etwas zu trinken, das kein Chianti ist. Für Erwachsene sind zwei toskanische Gläser inklusive.`,
                `Die Messerarbeit ist begrenzt und beaufsichtigt. Kochendes Wasser bleibt bei den Köchen.`,
                `Glutenfrei oder eine Allergie in der Familie? Sagen Sie es bei der Buchung: eigene Station, kein Aufpreis, derselbe Tisch wie alle anderen. Siehe den <a href="/de/glutenfreier-kochkurs-florenz/">glutenfreien Kurs</a>.`,
                `Die Rezepte schicken wir hinterher per E-Mail, und was Sie nicht aufessen, wird getrocknet und abgefüllt zum Mitnehmen, das ist meistens der Teil, von dem die Kinder erzählen.`,
              ],
            },
            {
              title: `So funktioniert die Buchung`,
              paras: [
                `Klicken Sie auf „Für die Familie buchen" und sagen Sie uns, wie viele Erwachsene und wie viele Kinder, mit Alter. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Angaben, und wir bestätigen persönlich, auch, ob die gewünschte Uhrzeit zu den Altersstufen passt, die Sie mitbringen. Sie können auch an ciao@handmadepastaflorence.com schreiben.`,
              ],
            },
          ],
          faqs: [
            { q: `Ab welchem Alter können Kinder am Kochkurs teilnehmen?`, a: `Ab 6 Jahren zum Mitkochen, immer mit einem Erwachsenen am Tisch. Unter 6 sind willkommen, dabeizusitzen und kostenlos mitzuessen, aber Bretter, Nudelhölzer und Messer sind nicht für kleinere Hände gedacht, und das sagen wir lieber, als Ihnen das Geld abzunehmen.` },
            { q: `Was kostet der Kurs für Kinder?`, a: `50 € für 6–12 Jahre, kostenlos unter 6, und 95 € pro Erwachsenem, derselbe Preis wie für jeden anderen Gast am Tisch. Es gibt keinen Familienaufschlag.` },
            { q: `Machen die Kinder ihre Pasta selbst oder schauen sie nur zu?`, a: `Sie machen sie selbst. Jedes Kind bekommt ein Brett, seinen eigenen Teig und seine eigenen Formen. Weil am Tisch insgesamt nie mehr als acht Personen sitzen, hat ein Koch Zeit, ein Kind einzeln zu begleiten, das ist der praktische Grund, warum es diesen Kurs in unserer Größe gibt und nicht in einem Kurs mit zwölf.` },
            { q: `Ist die Messerarbeit für Kinder sicher?`, a: `Sie ist begrenzt, beaufsichtigt und findet mit den Köchen daneben statt. Kochendes Wasser und der Topf bleiben bei uns. Alles andere (Mehl, Teig, Ausrollen, Formen, Füllen) gehört ihnen.` },
            { q: `Was, wenn mein Kind auf halber Strecke die Lust verliert?`, a: `Kommt vor und ist eingeplant. Die praktischen Abschnitte sind bewusst durch Teigruhe und eine Kleinigkeit zu essen unterbrochen, und es ist Platz da, einen Abschnitt auszusetzen. Es stört niemanden und verdirbt dem Rest des Tisches den Kurs nicht.` },
            { q: `Können Sie ein Kind mit einer Allergie versorgen?`, a: `In der Regel ja, Zöliakie eingeschlossen: eine eigene Station, eine eigene Mehlmischung und ein eigener Topf, ohne Aufpreis und am selben Tisch wie alle anderen. Schicken Sie uns die vollständige Liste bei der Buchung, nicht am Tag selbst.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Derselbe Kurs nur für Erwachsene: vier Formen, ein langes Mittagessen. 95 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche für Sie allein, für größere Familiengruppen, ab 680 €.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Markt im Morgengrauen, dann den Korb kochen. Eher für Teenager als für Kleinkinder, 145 €.` },
          ],
          ctaLabel: `Für die Familie buchen`,
          prefill: 'florence',
          breadcrumbName: `Familien-Kochkurs`,
          showPastaCrumb: true,
          product: {
            name: `Familien-Kochkurs in Florenz`,
            description: `Ein 3-stündiger praktischer Pasta-Kurs für Familien im Oltrarno in Florenz. Kinder ab 6 Jahren rollen ihre eigene Pasta an einem Tisch mit höchstens acht Plätzen, danach essen alle gemeinsam. 95 € pro Erwachsenem, 50 € für 6–12 Jahre, unter 6 kostenlos.`,
            price: '95',
          },
        },
      },
      zh: {
        slug: 'jiating-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨家庭烹饪课程：儿童50欧元起 | Handmade Pasta Florence`,
        description: `佛罗伦萨奥特拉诺区的家庭手工意面课程。6岁以上的孩子在您身边亲手擀制意面，每桌不超过八人，然后全家一起享用自己的作品。成人每人95欧元，6–12岁50欧元，6岁以下免费。`,
        cl: {
          eyebrow: `适合家庭 · 佛罗伦萨奥特拉诺`,
          heading: `佛罗伦萨的家庭烹饪课程，`,
          headingItal: `孩子真正动手做饭。`,
          lede: `这不是大人下厨、孩子干等的课程。每个孩子都有自己的案板、自己的那块面团，还有一位会过来照看他的厨师，在一张八人桌旁，我们真的做得到。三个小时，然后全家坐下来吃自己做的东西。`,
          image: { src: img.cuttingPizza, alt: `一家人在佛罗伦萨的意面课程上一起下厨`, w: 1000, h: 667 },
          price: `€95`,
          priceNote: `每位成人 · 6–12岁50欧元 · 6岁以下免费`,
          facts: [
            { label: `本地食材`, value: `托斯卡纳时令食材`, icon: 'leaf' },
            { label: `年龄`, value: `6岁以上，需成人陪同`, icon: 'people' },
            { label: `儿童`, value: `50欧元（6–12岁） · 6岁以下免费`, icon: 'tag' },
            { label: `时长`, value: `约3小时`, icon: 'clock' },
            { label: `团队规模`, value: `含儿童最多8人`, icon: 'table' },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托`, icon: 'map-pin' },
          ],
          sections: [
            {
              title: `孩子究竟会做些什么？`,
              paras: [
                `他们真的在做意面，不是在桌角捏一小团面意思一下。每个孩子都有自己撒好面粉的案板、自己要揉的面团、自己要搓的形状：先做pici，因为把一根面条在掌心搓出来，是一个六岁孩子用面粉能做的最有成就感的事；如果还有耐心，再做一种带馅的。`,
                `因为整桌从不超过八个人，厨师可以一直陪着一个孩子，直到那个总也捏不好的褶子终于成型。这正是它在我们这张桌子上行得通、而在十二人的课堂上行不通的原因。`,
              ],
            },
            {
              title: `他们能坚持三个小时吗？`,
              paras: [
                `大部分时候可以，而这门课就是围绕这个诚实的答案设计的。动手的环节是被拆开的：揉面、醒面、吃点东西、再回来，因为醒过的面团和歇过的孩子都更好对付。最后一段是烹饪和吃饭，这一段从来没有人坐不住。`,
                `如果年纪小一点的孩子耗尽了耐心，完全没问题，我们也早有准备。有地方坐，厨房不是什么讲究的客厅，也不会打扰到任何人。比起让你们带着歉意离开，我们更希望你们把课上完。`,
              ],
            },
            {
              title: `温馨提示`,
              paras: [],
              list: [
                `6岁以上可以动手做。6岁以下欢迎同行并免费用餐，但案板和刀具并不是为他们准备的。`,
                `每个孩子都需要一位成人同桌陪同，这是一门全家一起上的课，不是托管。`,
                `孩子享用同样的餐食，只是不含葡萄酒：他们亲手做的意面、一份酱汁，以及不是基安蒂的饮品。成人则已包含两杯托斯卡纳葡萄酒。`,
                `用刀环节有限且全程有人看顾。沸水始终由厨师掌管。`,
                `家里有人无麸质或有过敏？请在预订时告诉我们：专属操作台、不加价、和大家同坐一桌。请见<a href="/zh/wu-fuzhi-pengren-kecheng-foluolunsa/">无麸质课程</a>。`,
                `课后我们会把菜谱发到您邮箱；没吃完的会为您晾干装袋带走，这通常是孩子们最爱聊起的部分。`,
              ],
            },
            {
              title: `如何预订`,
              paras: [
                `点击“为全家预订”，告诉我们几位成人、几位儿童以及孩子的年龄。系统会打开一个已填好详情的 WhatsApp 聊天窗口，我们会亲自确认，包括您想要的时段是否适合同行孩子的年龄。您也可以发送邮件至 ciao@handmadepastaflorence.com。`,
              ],
            },
          ],
          faqs: [
            { q: `孩子多大可以参加烹饪课程？`, a: `6岁以上可以动手做，且必须有一位成人同桌。6岁以下欢迎同行、免费用餐，但案板、擀面杖和刀具并不适合更小的手，我们宁愿直说，也不愿收这笔钱。` },
            { q: `儿童参加课程的费用是多少？`, a: `6–12岁50欧元，6岁以下免费，成人每位95欧元，与桌上任何其他客人同价。没有任何“家庭附加费”。` },
            { q: `孩子是真的动手做意面，还是只在旁边看？`, a: `是真的动手。每个孩子都有案板、自己的面团和自己的形状。因为整桌从不超过八人，厨师有时间单独指导一个孩子，这就是这门课在我们这个规模才成立、在十二人课堂上不成立的现实原因。` },
            { q: `孩子用刀安全吗？`, a: `用刀环节有限、全程看顾，且由厨师在旁陪同。沸水和锅具始终由我们掌管。其余的一切（面粉、面团、擀制、成形、包馅）都交给他们。` },
            { q: `如果孩子中途觉得无聊怎么办？`, a: `会发生，我们也考虑到了。动手环节被醒面和小食刻意拆开，也有地方可以歇过一轮。这不会打扰任何人，也不会影响同桌其他人的体验。` },
            { q: `孩子有过敏，你们能安排吗？`, a: `通常可以，包括乳糜泻，专属操作台、专属面粉配方、专属煮锅，不加价，并且与大家同坐一桌。请在预订时把完整清单发给我们，而不是当天再说。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `同样的课程，仅限成人：四种形状，一顿悠长的午餐。95欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `整个厨房专属于你们，适合更大的家庭团体，680欧元起。` },
            { title: `市场与手工`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨逛市场，然后烹饪当天的食材。更适合青少年而非幼童，145欧元。` },
          ],
          ctaLabel: `为全家预订`,
          prefill: 'florence',
          breadcrumbName: `家庭烹饪课程`,
          showPastaCrumb: true,
          product: {
            name: `佛罗伦萨家庭烹饪课程`,
            description: `佛罗伦萨奥特拉诺区3小时家庭手工意面实践课程。6岁以上的孩子在不超过八人的餐桌旁亲手擀制意面，之后全家一起享用。成人每位95欧元，6–12岁50欧元，6岁以下免费。`,
            price: '95',
          },
        },
      },
    },
  },
};
