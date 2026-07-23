// Content for every bookable-class landing page, keyed by a stable page key and
// then by locale. A single template (src/pages/[...slug].astro) renders these,
// so ADDING A LANGUAGE = adding a locale entry here — no new page files.
//
// Slugs are per-locale and SEO-translated (e.g. it: corso-pasta-fresca-firenze).
// String values use backticks so Italian apostrophes/quotes need no escaping.
import { defaultLocale, type Locale } from '../i18n/config';

export interface LandingContent {
  eyebrow: string;
  heading: string;
  headingItal: string;
  lede: string;
  image: { src: string; alt: string; w: number; h: number };
  price: string;
  priceNote?: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paras: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  related: { title: string; href: string; desc: string }[];
  ctaLabel: string;
  prefill?: 'florence' | 'online';
  emailSubject?: string;
  breadcrumbName: string;
  product?: { name: string; description: string; price: string };
  service?: { name: string; description: string };
}

export interface LandingLocale {
  slug: string;
  title: string;
  description: string;
  cl: LandingContent;
}

export interface LandingPage {
  /** FloatingCTA is shown on booking pages but not the email-CTA team page. */
  floatingCta: boolean;
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
    locales: {
      en: {
        slug: 'pasta-making-class-florence',
        title: `Pasta Making Class in Florence — The Chef’s Table (€95) | Handmade Pasta Florence`,
        description: `A 3-hour hands-on pasta making class in Florence’s Oltrarno. Roll four classic shapes with two Tuscan agriturismo head chefs, then sit down to eat what you made with a glass of Chianti. Max 8 guests, €95 per person.`,
        cl: {
          eyebrow: `The Chef’s Table · Oltrarno, Florence`,
          heading: `A pasta making class in Florence,`,
          headingItal: `around one table.`,
          lede: `Three hands-on hours in our Oltrarno kitchen. You’ll mix, knead, roll and fold four classic pasta shapes with a chef at your elbow, then sit down together to eat everything you made — with a Tuscan sauce and a glass of Chianti.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Guests rolling fresh pasta at The Chef’s Table class in our Florence kitchen`, w: 1050, h: 1400 },
          price: `€95`,
          priceNote: `per person`,
          facts: [
            { label: `Length`, value: `about 3 hours` },
            { label: `Group size`, value: `max 8 guests` },
            { label: `Starts`, value: `10:00 · 14:30 · 18:00` },
            { label: `Where`, value: `Oltrarno, near Santo Spirito` },
            { label: `Language`, value: `English or Italian` },
            { label: `Days`, value: `Tue–Sun (closed Mon)` },
          ],
          sections: [
            {
              title: `What you’ll actually do`,
              paras: [
                `This is a hands-in-the-flour class from the first minute — no demos to watch from a stool. You’ll make your own dough, learn to feel when it’s ready, and work it into four classic shapes: hand-rolled pici, ribbon-cut tagliatelle and pappardelle, and filled tortelli, following the season.`,
                `Because the table never has more than eight guests, there’s always a chef beside you to fix your fold or rescue a sticky dough. When the pasta is done, we cook it together and sit down to a proper Tuscan lunch — the food you just made, a sauce from our kitchens, and a glass of local wine.`,
              ],
            },
            {
              title: `Who’s teaching`,
              paras: [
                `Your hosts are <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> and Marsel — two lifelong friends who are the head chefs of two agriturismi in the hills outside Florence. Pasta for weddings, feasts and live shows is their day job; this kitchen is where they teach it. You can read more <a href="/#story">in our story</a>.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Gluten-free? We prepare a dedicated flour blend and a clean station at no extra charge — just tell us when you book.`,
                `Add a wine pairing (+€18 per person): two Tuscan pours chosen to match your menu.`,
                `The kitchen is in the Oltrarno, near Piazza Santo Spirito — we send the exact address when you book.`,
                `Want the same class with a dawn market walk first? That’s <a href="/market-tour-cooking-class-florence/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `How booking works`,
              paras: [
                `Hit “Book this class” and pick your date, time and guests — it opens a WhatsApp chat with everything filled in, and we confirm availability personally. No account, no forms. You can also write to us at ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Is this class suitable for complete beginners?`, a: `Yes. Everything is taught from zero — dough, rolling, shaping — and with never more than 8 guests there’s always a chef at your elbow. Most guests have never made fresh pasta before.` },
            { q: `Do we eat the pasta we make?`, a: `Yes. Every class ends at the table with your fresh pasta, a Tuscan sauce, and a glass of local wine.` },
            { q: `Which pasta shapes will we make?`, a: `Four classic shapes per class — typically hand-rolled pici, tagliatelle, pappardelle and filled tortelli, following the season.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes — we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. Just tell us about any allergies when you book.` },
            { q: `How do I book and pay?`, a: `Use the “Book this class” button to build your request. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Shop Sant’Ambrogio market at dawn, then cook the basket. 5 hours, max 6 guests — €145.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen, privately yours. Birthdays, proposals, reunions — from €680.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Cook with us from anywhere, live from this same kitchen — from €68.` },
            { title: `Tuscan pasta shapes, explained`, href: `/blog/tuscan-pasta-shapes-guide/`, desc: `Pici, pappardelle, tortelli — what they are and why they matter.` },
          ],
          ctaLabel: `Book this class`,
          prefill: 'florence',
          breadcrumbName: `Pasta Making Class in Florence`,
          product: {
            name: `The Chef’s Table — Pasta Making Class in Florence`,
            description: `A 3-hour hands-on pasta making class in Florence’s Oltrarno: four classic shapes, max 8 guests, ending in a sit-down Tuscan lunch with wine. Taught by two agriturismo head chefs.`,
            price: '95',
          },
        },
      },
      it: {
        slug: 'corso-pasta-fresca-firenze',
        title: `Corso di Pasta Fresca a Firenze — Il Tavolo dello Chef (€95) | Handmade Pasta Florence`,
        description: `Un corso pratico di pasta fresca di 3 ore in Oltrarno a Firenze. Prepara quattro formati classici con due chef toscani, poi siediti a mangiare ciò che hai fatto con un bicchiere di Chianti. Max 8 ospiti, €95 a persona.`,
        cl: {
          eyebrow: `Il Tavolo dello Chef · Oltrarno, Firenze`,
          heading: `Un corso di pasta a Firenze,`,
          headingItal: `attorno a un tavolo.`,
          lede: `Tre ore pratiche nella nostra cucina in Oltrarno. Mescolerai, impasterai, stenderai e piegherai quattro formati classici di pasta con uno chef al tuo fianco, per poi sederti insieme agli altri a mangiare tutto ciò che hai preparato — con un sugo toscano e un bicchiere di Chianti.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Ospiti che stendono la pasta fresca al corso Il Tavolo dello Chef nella nostra cucina fiorentina`, w: 1050, h: 1400 },
          price: `€95`,
          priceNote: `a persona`,
          facts: [
            { label: `Durata`, value: `circa 3 ore` },
            { label: `Dimensione gruppo`, value: `max 8 ospiti` },
            { label: `Inizio`, value: `10:00 · 14:30 · 18:00` },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito` },
            { label: `Lingua`, value: `Inglese o Italiano` },
            { label: `Giorni`, value: `Mar–Dom (chiuso Lun)` },
          ],
          sections: [
            {
              title: `Cosa farai effettivamente`,
              paras: [
                `Questo è un corso con "le mani in pasta" dal primo minuto — nessuna dimostrazione da guardare su uno sgabello. Preparerai il tuo impasto, imparerai a sentire quando è pronto e lo lavorerai in quattro formati classici: pici fatti a mano, tagliatelle e pappardelle tagliate a nastro, e tortelli ripieni, seguendo la stagione.`,
                `Poiché il tavolo non ha mai più di otto ospiti, c'è sempre uno chef accanto a te per correggere la tua piega o salvare un impasto appiccicoso. Quando la pasta è finita, la cuciniamo insieme e ci sediamo per un vero pranzo toscano — il cibo che hai appena preparato, un sugo dalle nostre cucine e un bicchiere di vino locale.`,
              ],
            },
            {
              title: `Chi insegna`,
              paras: [
                `I tuoi ospiti sono <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> e Marsel — due amici di una vita che sono i capi chef di due agriturismi sulle colline di Firenze. La pasta per matrimoni, feste e spettacoli dal vivo è il loro lavoro quotidiano; questa cucina è dove la insegnano. Puoi leggere di più <a href="/it/#story">nella nostra storia</a>.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Senza glutine? Prepariamo una miscela dedicata e una postazione pulita senza costi aggiuntivi — diccelo quando prenoti.`,
                `Aggiungi un abbinamento vini (+€18 a persona): due calici toscani scelti per abbinarsi al tuo menù.`,
                `La cucina è in Oltrarno, vicino a Piazza Santo Spirito — ti invieremo l'indirizzo esatto al momento della prenotazione.`,
                `Vuoi lo stesso corso ma con una passeggiata al mercato all'alba? Dai un'occhiata a <a href="/it/corso-cucina-tour-mercato-firenze/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Come funziona la prenotazione`,
              paras: [
                `Premi "Prenota questo corso" e scegli data, ora e numero di ospiti — si aprirà una chat WhatsApp con tutto già compilato e ti confermeremo personalmente la disponibilità. Nessun account, nessun modulo. Puoi anche scriverci a ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Questo corso è adatto a principianti assoluti?`, a: `Sì. Tutto viene insegnato da zero — impasto, stesura, formatura — e con non più di 8 ospiti c'è sempre uno chef al tuo fianco. La maggior parte degli ospiti non ha mai fatto la pasta fresca prima.` },
            { q: `Mangiamo la pasta che facciamo?`, a: `Sì. Ogni corso termina a tavola con la tua pasta fresca, un sugo toscano e un bicchiere di vino locale.` },
            { q: `Quali formati di pasta faremo?`, a: `Quattro formati classici per corso — in genere pici, tagliatelle, pappardelle e tortelli ripieni, seguendo la stagione.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì — possiamo preparare una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. Devi solo segnalarci eventuali allergie al momento della prenotazione.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota questo corso" per creare la tua richiesta. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Fai la spesa al mercato di Sant'Ambrogio all'alba, poi cucina il cesto. 5 ore, max 6 ospiti — €145.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina, privata per voi. Compleanni, proposte, ritrovi — da €680.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Cucina con noi da ovunque, in diretta da questa stessa cucina — da €68.` },
          ],
          ctaLabel: `Prenota questo corso`,
          prefill: 'florence',
          breadcrumbName: `Corso di Pasta Fresca a Firenze`,
          product: {
            name: `Il Tavolo dello Chef — Corso di Pasta Fresca a Firenze`,
            description: `Un corso pratico di pasta fresca di 3 ore in Oltrarno a Firenze: quattro formati classici, max 8 ospiti, si conclude con un pranzo toscano seduti con vino. Tenuto da due chef di agriturismo.`,
            price: '95',
          },
        },
      },
      fr: {
        slug: 'cours-de-pates-fraiches-florence',
        title: `Cours de Pâtes Fraîches à Florence — La Table du Chef (€95) | Handmade Pasta Florence`,
        description: `Un cours pratique de pâtes fraîches de 3 heures dans l'Oltrarno à Florence. Préparez quatre formes classiques avec deux chefs toscans, puis asseyez-vous pour déguster ce que vous avez préparé avec un verre de Chianti. Max 8 personnes, 95 € par personne.`,
        cl: {
          eyebrow: `La Table du Chef · Oltrarno, Florence`,
          heading: `Un cours de pâtes à Florence,`,
          headingItal: `autour d'une table.`,
          lede: `Trois heures de pratique dans notre cuisine de l'Oltrarno. Vous mélangerez, pétrirez, étalerez et plierez quatre formes classiques de pâtes avec un chef à vos côtés, puis vous vous assiérez ensemble pour manger tout ce que vous avez préparé — avec une sauce toscane et un verre de Chianti.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Des invités étalant des pâtes fraîches lors du cours La Table du Chef dans notre cuisine de Florence`, w: 1050, h: 1400 },
          price: `95 €`,
          priceNote: `par personne`,
          facts: [
            { label: `Durée`, value: `environ 3 heures` },
            { label: `Taille du groupe`, value: `max 8 personnes` },
            { label: `Départ`, value: `10:00 · 14:30 · 18:00` },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito` },
            { label: `Langue`, value: `Anglais ou Italien` },
            { label: `Jours`, value: `Mar–Dim (fermé Lun)` },
          ],
          sections: [
            {
              title: `Ce que vous ferez concrètement`,
              paras: [
                `C'est un cours où vous mettez la main à la pâte dès la première minute — pas de démonstrations à regarder sur un tabouret. Vous préparerez votre propre pâte, apprendrez à sentir quand elle est prête, et la travaillerez en quatre formes classiques : pici roulés à la main, tagliatelles et pappardelles coupées en ruban, et tortelli farcis, selon la saison.`,
                `Parce que la table ne compte jamais plus de huit personnes, il y a toujours un chef à côté de vous pour corriger votre pliage ou sauver une pâte collante. Quand les pâtes sont terminées, nous les cuisinons ensemble et nous nous asseyons pour un vrai déjeuner toscan — la nourriture que vous venez de préparer, une sauce de nos cuisines et un verre de vin local.`,
              ],
            },
            {
              title: `Qui enseigne`,
              paras: [
                `Vos hôtes sont <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> et Marsel — deux amis de toujours qui sont les chefs cuisiniers de deux agritourismes dans les collines autour de Florence. Les pâtes pour les mariages, les fêtes et les spectacles en direct sont leur travail quotidien ; cette cuisine est l'endroit où ils l'enseignent. Vous pouvez en lire plus <a href="/fr/#story">dans notre histoire</a>.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `Sans gluten ? Nous préparons un mélange de farine dédié et un poste de travail propre sans frais supplémentaires — dites-le-nous simplement lors de votre réservation.`,
                `Ajoutez un accord mets-vins (+18 € par personne) : deux vins toscans choisis pour s'accorder avec votre menu.`,
                `La cuisine est dans l'Oltrarno, près de la Piazza Santo Spirito — nous vous envoyons l'adresse exacte lors de votre réservation.`,
                `Vous voulez le même cours avec une promenade au marché à l'aube d'abord ? C'est <a href="/fr/cours-cuisine-visite-marche-florence/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Comment fonctionne la réservation`,
              paras: [
                `Appuyez sur "Réserver ce cours" et choisissez votre date, heure et le nombre d'invités — cela ouvre une discussion WhatsApp avec tout pré-rempli, et nous confirmons la disponibilité personnellement. Pas de compte, pas de formulaires. Vous pouvez également nous écrire à ciao@handmadepastaflorence.com.`,
              ],
            },
          ],
          faqs: [
            { q: `Ce cours convient-il aux débutants complets ?`, a: `Oui. Tout est enseigné de zéro — la pâte, l'étalage, le façonnage — et avec jamais plus de 8 personnes, il y a toujours un chef à vos côtés. La plupart des invités n'ont jamais fait de pâtes fraîches auparavant.` },
            { q: `Mange-t-on les pâtes que l'on fait ?`, a: `Oui. Chaque cours se termine à table avec vos pâtes fraîches, une sauce toscane et un verre de vin local.` },
            { q: `Quelles formes de pâtes allons-nous faire ?`, a: `Quatre formes classiques par cours — généralement des pici roulés à la main, des tagliatelles, des pappardelles et des tortelli farcis, selon la saison.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui — nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Parlez-nous simplement de vos allergies lors de la réservation.` },
            { q: `Comment puis-je réserver et payer ?`, a: `Utilisez le bouton "Réserver ce cours" pour formuler votre demande. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Faites vos courses au marché de Sant'Ambrogio à l'aube, puis cuisinez votre panier. 5 heures, max 6 personnes — 145 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine, pour vous en privé. Anniversaires, demandes en mariage, réunions — à partir de 680 €.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Cuisinez avec nous d'où vous voulez, en direct de cette même cuisine — à partir de 68 €.` },
          ],
          ctaLabel: `Réserver ce cours`,
          prefill: 'florence',
          breadcrumbName: `Cours de Pâtes Fraîches à Florence`,
          product: {
            name: `La Table du Chef — Cours de Pâtes Fraîches à Florence`,
            description: `Un cours pratique de pâtes fraîches de 3 heures dans l'Oltrarno à Florence : quatre formes classiques, max 8 personnes, se terminant par un déjeuner toscan assis avec du vin. Enseigné par deux chefs d'agritourisme.`,
            price: '95',
          },
        },
      },
      de: {
        slug: 'pasta-kurs-florenz',
        title: `Pasta-Kurs in Florenz — Der Tisch des Küchenchefs (€95) | Handmade Pasta Florence`,
        description: `Ein 3-stündiger praktischer Pasta-Kurs in Florenz' Oltrarno. Rollen Sie vier klassische Formen mit zwei toskanischen Agriturismo-Küchenchefs und setzen Sie sich dann, um das Gekochte mit einem Glas Chianti zu essen. Max. 8 Gäste, 95 € pro Person.`,
        cl: {
          eyebrow: `Der Tisch des Küchenchefs · Oltrarno, Florenz`,
          heading: `Ein Pasta-Kurs in Florenz,`,
          headingItal: `rund um einen Tisch.`,
          lede: `Drei praktische Stunden in unserer Küche im Oltrarno. Sie werden vier klassische Pasta-Formen mit einem Koch an Ihrer Seite mischen, kneten, ausrollen und falten und sich dann zusammensetzen, um alles zu essen, was Sie gemacht haben — mit einer toskanischen Sauce und einem Glas Chianti.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Gäste rollen frische Pasta beim Kurs „Der Tisch des Küchenchefs“ in unserer Küche in Florenz aus`, w: 1050, h: 1400 },
          price: `95 €`,
          priceNote: `pro Person`,
          facts: [
            { label: `Dauer`, value: `etwa 3 Stunden` },
            { label: `Gruppengröße`, value: `max. 8 Gäste` },
            { label: `Beginn`, value: `10:00 · 14:30 · 18:00` },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito` },
            { label: `Sprache`, value: `Englisch oder Italienisch` },
            { label: `Tage`, value: `Di–So (Mo geschlossen)` },
          ],
          sections: [
            {
              title: `Was Sie tatsächlich tun werden`,
              paras: [
                `Dies ist ein Kurs mit den Händen im Mehl von der ersten Minute an — keine Vorführungen, die man von einem Hocker aus beobachtet. Sie machen Ihren eigenen Teig, lernen zu fühlen, wann er fertig ist, und verarbeiten ihn zu vier klassischen Formen: handgerollte Pici, bandgeschnittene Tagliatelle und Pappardelle sowie gefüllte Tortelli, je nach Saison.`,
                `Da der Tisch nie mehr als acht Gäste hat, ist immer ein Koch neben Ihnen, um Ihre Faltung zu korrigieren oder einen klebrigen Teig zu retten. Wenn die Nudeln fertig sind, kochen wir sie zusammen und setzen uns zu einem echten toskanischen Mittagessen — das Essen, das Sie gerade zubereitet haben, eine Sauce aus unseren Küchen und ein Glas Wein aus der Region.`,
              ],
            },
            {
              title: `Wer unterrichtet`,
              paras: [
                `Ihre Gastgeber sind <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> und Marsel — zwei lebenslange Freunde, die Küchenchefs von zwei Agriturismi in den Hügeln außerhalb von Florenz sind. Pasta für Hochzeiten, Feste und Live-Shows ist ihr Tagesgeschäft; diese Küche ist der Ort, an dem sie es unterrichten. Sie können mehr <a href="/de/#story">in unserer Geschichte</a> lesen.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Glutenfrei? Wir bereiten ohne Aufpreis eine spezielle Mehlmischung und eine saubere Station vor — sagen Sie es uns einfach bei der Buchung.`,
                `Fügen Sie eine Weinbegleitung hinzu (+18 € pro Person): zwei toskanische Weine, passend zu Ihrem Menü.`,
                `Die Küche befindet sich im Oltrarno, in der Nähe der Piazza Santo Spirito — wir senden Ihnen bei der Buchung die genaue Adresse.`,
                `Möchten Sie denselben Kurs mit einem morgendlichen Marktspaziergang davor? Das ist <a href="/de/markt-tour-kochkurs-florenz/">Mercato &amp; Mani</a>.`,
              ],
            },
            {
              title: `Wie die Buchung funktioniert`,
              paras: [
                `Klicken Sie auf "Diesen Kurs buchen" und wählen Sie Ihr Datum, Ihre Uhrzeit und die Anzahl der Gäste — es öffnet sich ein WhatsApp-Chat mit allen ausgefüllten Details, und wir bestätigen die Verfügbarkeit persönlich. Kein Konto, keine Formulare. Sie können uns auch unter ciao@handmadepastaflorence.com schreiben.`,
              ],
            },
          ],
          faqs: [
            { q: `Ist dieser Kurs für absolute Anfänger geeignet?`, a: `Ja. Alles wird von Null an gelehrt — Teig, Rollen, Formen — und mit nie mehr als 8 Gästen ist immer ein Koch an Ihrer Seite. Die meisten Gäste haben noch nie zuvor frische Pasta gemacht.` },
            { q: `Essen wir die Pasta, die wir machen?`, a: `Ja. Jeder Kurs endet am Tisch mit Ihrer frischen Pasta, einer toskanischen Sauce und einem Glas Wein aus der Region.` },
            { q: `Welche Nudelformen werden wir machen?`, a: `Vier klassische Formen pro Kurs — typischerweise handgerollte Pici, Tagliatelle, Pappardelle und gefüllte Tortelli, je nach Saison.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja — wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Teilen Sie uns bei der Buchung einfach eventuelle Allergien mit.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Diesen Kurs buchen", um Ihre Anfrage zu erstellen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Kaufen Sie im Morgengrauen auf dem Sant'Ambrogio-Markt ein und kochen Sie dann den Korb. 5 Stunden, max. 6 Gäste — 145 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche, ganz privat für Sie. Geburtstage, Heiratsanträge, Treffen — ab 680 €.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Kochen Sie mit uns von überall aus, live aus derselben Küche — ab 68 €.` },
          ],
          ctaLabel: `Diesen Kurs buchen`,
          prefill: 'florence',
          breadcrumbName: `Pasta-Kurs in Florenz`,
          product: {
            name: `Der Tisch des Küchenchefs — Pasta-Kurs in Florenz`,
            description: `Ein 3-stündiger praktischer Pasta-Kurs in Florenz' Oltrarno: vier klassische Formen, max. 8 Gäste, endend mit einem gemeinsamen toskanischen Mittagessen mit Wein. Geleitet von zwei Agriturismo-Küchenchefs.`,
            price: '95',
          },
        },
      },
      zh: {
        slug: 'foluolunsa-yidali-mian-kecheng',
        title: `佛罗伦萨手工意面课程 — 主厨餐桌 (€95) | Handmade Pasta Florence`,
        description: `在佛罗伦萨奥特拉诺区进行的3小时手工意面制作课程。与两位托斯卡纳农庄主厨一起揉制四种经典形状，然后坐下来品尝您制作的美食和一杯基安蒂葡萄酒。最多8位客人，每人95欧元。`,
        cl: {
          eyebrow: `主厨餐桌 · 佛罗伦萨奥特拉诺`,
          heading: `佛罗伦萨的意面课程，`,
          headingItal: `围坐在一桌。`,
          lede: `在我们的奥特拉诺厨房进行三小时的动手实践。您将与身旁的主厨一起混合、揉捏、擀平并折叠四种经典的意面形状，然后大家坐在一起，配以托斯卡纳酱汁和一杯基安蒂葡萄酒，享用您制作的所有美食。`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `客人们在佛罗伦萨厨房的“主厨餐桌”课程中擀制新鲜意面`, w: 1050, h: 1400 },
          price: `€95`,
          priceNote: `每人`,
          facts: [
            { label: `时长`, value: `约3小时` },
            { label: `团队规模`, value: `最多8位客人` },
            { label: `开始时间`, value: `10:00 · 14:30 · 18:00` },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托` },
            { label: `语言`, value: `英语或意大利语` },
            { label: `开放时间`, value: `周二至周日（周一休息）` },
          ],
          sections: [
            {
              title: `您将真正学到什么`,
              paras: [
                `这是一门从第一分钟起就“双手沾满面粉”的实践课程——不需要坐在凳子上看演示。您将制作自己的面团，学会感受它何时准备好，并将其制作成四种经典形状：手工揉制的pici，切成条状的tagliatelle和pappardelle，以及填馅的tortelli，具体取决于季节。`,
                `因为每桌客人从不超过八人，所以总有一位厨师在您身旁指导您折叠或挽救粘稠的面团。当意面做好后，我们一起烹饪，然后坐下来享用一顿正宗的托斯卡纳午餐——您刚刚制作的食物，我们厨房秘制的酱汁，以及一杯当地葡萄酒。`,
              ],
            },
            {
              title: `谁来教`,
              paras: [
                `您的主持人是 <a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> 和 Marsel——两人是一生的挚友，也是佛罗伦萨郊外山上两家农庄的首席主厨。为婚礼、宴会和现场表演制作意面是他们的日常工作；而这个厨房是他们教学的地方。您可以在<a href="/zh/#story">我们的故事</a>中了解更多。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `无麸质？我们免费准备专门的面粉混合物和干净的操作台——只需在预订时告知我们。`,
                `添加葡萄酒搭配（每人+18欧元）：精选两款托斯卡纳葡萄酒搭配您的菜单。`,
                `厨房位于奥特拉诺，靠近圣斯皮里托广场——我们会在您预订时发送确切地址。`,
                `想在课程前先逛一逛清晨的菜市场吗？请查看 <a href="/zh/shichang-daolan-pengren-kecheng-foluolunsa/">Mercato &amp; Mani</a>。`,
              ],
            },
            {
              title: `如何预订`,
              paras: [
                `点击“预订此课程”并选择您的日期、时间和人数——这将打开一个自动填好信息的WhatsApp聊天，我们将亲自确认可用性。无需注册账号，也无需填写表格。您也可以发送邮件至 ciao@handmadepastaflorence.com 联系我们。`,
              ],
            },
          ],
          faqs: [
            { q: `这门课适合完全的初学者吗？`, a: `是的。一切都从零开始教起——揉面、擀面、塑形——而且客人从不超过8人，总有一位厨师在您身旁指导。大多数客人以前从未做过新鲜的意面。` },
            { q: `我们会吃自己做的意面吗？`, a: `是的。每节课都会以您的新鲜意面、托斯卡纳酱汁和一杯当地葡萄酒的餐桌时光结束。` },
            { q: `我们将制作哪些意面形状？`, a: `每节课制作四种经典形状——通常是手工揉制的pici、tagliatelle、pappardelle和填馅的tortelli，具体取决于季节。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的——我们可以免费准备专门的无麸质面粉混合物和干净的操作台。预订时请告诉我们任何过敏情况。` },
            { q: `我该如何预订和付款？`, a: `使用“预订此课程”按钮创建您的请求。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨在圣安布罗焦市场购物，然后烹饪购买的食材。5小时，最多6位客人 — 145欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `为您私人包场的整个厨房。生日、求婚、聚会 — 680欧元起。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `无论在哪里，都可以与我们一起在同一个厨房进行在线烹饪 — 68欧元起。` },
          ],
          ctaLabel: `预订此课程`,
          prefill: 'florence',
          breadcrumbName: `佛罗伦萨手工意面课程`,
          product: {
            name: `主厨餐桌 — 佛罗伦萨手工意面课程`,
            description: `佛罗伦萨奥特拉诺区3小时实践手工意面课程：四种经典形状，最多8位客人，以包含葡萄酒的托斯卡纳午餐结束。由两位农庄主厨授课。`,
            price: '95',
          },
        },
      },
    },
  },

  'market-tour': {
    floatingCta: true,
    locales: {
      en: {
        slug: 'market-tour-cooking-class-florence',
        title: `Market Tour & Cooking Class in Florence — Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Shop Sant’Ambrogio market with a Tuscan chef, then turn the basket into ravioli, a ragù and a seasonal dolce in our Oltrarno kitchen. About 5 hours, max 6 guests, €145 per person.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant’Ambrogio + Oltrarno`,
          heading: `A market tour & cooking class`,
          headingItal: `in Florence.`,
          lede: `Start the day the way our chefs do: at Sant’Ambrogio market, tasting and choosing what looks best. Then carry the basket back to our Oltrarno kitchen and turn it into ravioli, a slow ragù and a seasonal dolce — and sit down to eat it all together.`,
          image: { src: `/images/aperitivo.webp`, alt: `Fresh market produce and aperitivo before the Mercato & Mani cooking class in Florence`, w: 1080, h: 1440 },
          price: `€145`,
          priceNote: `per person`,
          facts: [
            { label: `Length`, value: `about 5 hours` },
            { label: `Group size`, value: `max 6 guests` },
            { label: `Starts`, value: `morning, with the market` },
            { label: `Market`, value: `Sant’Ambrogio` },
            { label: `Kitchen`, value: `Oltrarno, near Santo Spirito` },
            { label: `Language`, value: `English or Italian` },
          ],
          sections: [
            {
              title: `First, the market`,
              paras: [
                `Sant’Ambrogio is the market where Florentines actually shop — smaller and quieter than the Mercato Centrale, and full of the stallholders our chefs buy from. You’ll walk it with Endri or Marsel, learn what to look for in this week’s produce, and build the menu from what’s good today. No fixed shopping list: the season decides.`,
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
                `This is our longest and smallest-group class — it books out first.`,
                `Gluten-free and allergy-friendly at no extra charge — tell us when you book.`,
                `Comfortable shoes help: the market walk is part of the fun.`,
                `Short on time? The 3-hour <a href="/pasta-making-class-florence/">Chef’s Table class</a> skips the market and goes straight to the flour.`,
              ],
            },
          ],
          faqs: [
            { q: `How is this different from The Chef’s Table class?`, a: `Mercato & Mani is longer (about 5 hours vs 3), starts with the Sant’Ambrogio market walk, and the menu is built from what you find — ravioli, a ragù and a seasonal dolce. It’s also smaller: max 6 guests instead of 8.` },
            { q: `What will we cook?`, a: `Fresh ravioli, a slow-cooked ragù and a seasonal dolce, built around what looks best at Sant’Ambrogio market that morning. Then we all sit down to eat it, with a glass of local wine.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes — we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. Just tell us about any allergies when you book.` },
            { q: `How do I book and pay?`, a: `Use the “Book this class” button to build your request. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature 3-hour pasta class — four shapes, one long lunch. €95.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The whole kitchen, privately yours. Birthdays, proposals, reunions — from €680.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Cook with us from anywhere, live from this same kitchen — from €68.` },
            { title: `Where to eat handmade pasta in Florence`, href: `/blog/where-to-eat-handmade-pasta-in-florence/`, desc: `A pasta chef’s guide to ordering well in the city.` },
          ],
          ctaLabel: `Book this class`,
          prefill: 'florence',
          breadcrumbName: `Market Tour & Cooking Class`,
          product: {
            name: `Mercato & Mani — Market Tour & Cooking Class in Florence`,
            description: `A 5-hour Florence food experience: shop Sant’Ambrogio market with a Tuscan agriturismo chef, then cook ravioli, a ragù and a seasonal dolce in our Oltrarno kitchen. Max 6 guests.`,
            price: '145',
          },
        },
      },
      it: {
        slug: 'corso-cucina-tour-mercato-firenze',
        title: `Tour del Mercato e Corso di Cucina a Firenze — Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Fai la spesa al mercato di Sant'Ambrogio con uno chef toscano, poi trasforma il cesto in ravioli, ragù e un dolce di stagione nella nostra cucina in Oltrarno. Circa 5 ore, max 6 ospiti, €145 a persona.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant’Ambrogio + Oltrarno`,
          heading: `Tour del mercato & corso di cucina`,
          headingItal: `a Firenze.`,
          lede: `Inizia la giornata come fanno i nostri chef: al mercato di Sant'Ambrogio, assaggiando e scegliendo ciò che sembra migliore. Poi porta il cesto nella nostra cucina in Oltrarno e trasformalo in ravioli, un ragù a lenta cottura e un dolce di stagione — e sediamoci a mangiare tutto insieme.`,
          image: { src: `/images/aperitivo.webp`, alt: `Prodotti freschi del mercato e aperitivo prima del corso di cucina Mercato & Mani a Firenze`, w: 1080, h: 1440 },
          price: `€145`,
          priceNote: `a persona`,
          facts: [
            { label: `Durata`, value: `circa 5 ore` },
            { label: `Dimensione gruppo`, value: `max 6 ospiti` },
            { label: `Inizio`, value: `mattina, con il mercato` },
            { label: `Mercato`, value: `Sant’Ambrogio` },
            { label: `Cucina`, value: `Oltrarno, vicino a Santo Spirito` },
            { label: `Lingua`, value: `Inglese o Italiano` },
          ],
          sections: [
            {
              title: `Prima di tutto, il mercato`,
              paras: [
                `Sant’Ambrogio è il mercato dove i fiorentini fanno davvero la spesa — più piccolo e tranquillo del Mercato Centrale, e pieno dei banchi da cui comprano i nostri chef. Ci camminerai con Endri o Marsel, imparerai cosa cercare nei prodotti di questa settimana e costruirai il menù in base a ciò che è buono oggi. Nessuna lista della spesa fissa: decide la stagione.`,
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
                `Questo è il nostro corso più lungo e con il gruppo più piccolo — si prenota per primo.`,
                `Opzioni senza glutine e per allergie senza costi aggiuntivi — comunicacelo quando prenoti.`,
                `Scarpe comode aiutano: la passeggiata al mercato è parte del divertimento.`,
                `Poco tempo a disposizione? Il corso di 3 ore <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> salta il mercato e va dritto alla farina.`,
              ],
            },
          ],
          faqs: [
            { q: `In cosa differisce dal corso Il Tavolo dello Chef?`, a: `Mercato & Mani è più lungo (circa 5 ore contro 3), inizia con la passeggiata al mercato di Sant'Ambrogio, e il menù è costruito su ciò che trovi — ravioli, un ragù e un dolce di stagione. È anche più intimo: max 6 ospiti invece di 8.` },
            { q: `Cosa cucineremo?`, a: `Ravioli freschi, un ragù a lenta cottura e un dolce di stagione, costruiti attorno a ciò che sembra migliore al mercato di Sant'Ambrogio quella mattina. Poi ci sediamo tutti insieme a mangiarlo, con un bicchiere di vino locale.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì — possiamo preparare una miscela dedicata di farine senza glutine e una postazione pulita senza costi aggiuntivi. Devi solo segnalarci eventuali allergie al momento della prenotazione.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota questo corso" per creare la tua richiesta. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro corso di pasta di 3 ore — quattro formati, un lungo pranzo. €95.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `L'intera cucina, privata per voi. Compleanni, proposte, ritrovi — da €680.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Cucina con noi da ovunque, in diretta da questa stessa cucina — da €68.` },
          ],
          ctaLabel: `Prenota questo corso`,
          prefill: 'florence',
          breadcrumbName: `Tour del Mercato & Corso`,
          product: {
            name: `Mercato & Mani — Tour del Mercato & Corso di Cucina a Firenze`,
            description: `Un'esperienza enogastronomica a Firenze di 5 ore: fai la spesa al mercato di Sant'Ambrogio con uno chef di un agriturismo toscano, poi cucina ravioli, un ragù e un dolce di stagione nella nostra cucina in Oltrarno. Max 6 ospiti.`,
            price: '145',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-visite-marche-florence',
        title: `Visite du Marché et Cours de Cuisine à Florence — Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Faites vos courses au marché de Sant'Ambrogio avec un chef toscan, puis transformez votre panier en raviolis, ragoût et un dessert de saison dans notre cuisine de l'Oltrarno. Environ 5 heures, max 6 personnes, 145 € par personne.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant'Ambrogio + Oltrarno`,
          heading: `Visite du marché & cours de cuisine`,
          headingItal: `à Florence.`,
          lede: `Commencez la journée comme nos chefs : au marché de Sant'Ambrogio, en goûtant et en choisissant ce qui semble le meilleur. Ensuite, rapportez le panier à notre cuisine de l'Oltrarno et transformez-le en raviolis, un ragoût mijoté et un dessert de saison — et asseyez-vous pour manger tout cela ensemble.`,
          image: { src: `/images/aperitivo.webp`, alt: `Produits frais du marché et apéritif avant le cours de cuisine Mercato & Mani à Florence`, w: 1080, h: 1440 },
          price: `145 €`,
          priceNote: `par personne`,
          facts: [
            { label: `Durée`, value: `environ 5 heures` },
            { label: `Taille du groupe`, value: `max 6 personnes` },
            { label: `Départ`, value: `matin, avec le marché` },
            { label: `Marché`, value: `Sant'Ambrogio` },
            { label: `Cuisine`, value: `Oltrarno, près de Santo Spirito` },
            { label: `Langue`, value: `Anglais ou Italien` },
          ],
          sections: [
            {
              title: `D'abord, le marché`,
              paras: [
                `Sant'Ambrogio est le marché où les Florentins font réellement leurs courses — plus petit et plus calme que le Mercato Centrale, et plein des marchands chez qui nos chefs s'approvisionnent. Vous vous y promènerez avec Endri ou Marsel, apprendrez quoi chercher dans les produits de cette semaine, et construirez le menu à partir de ce qui est bon aujourd'hui. Pas de liste de courses fixe : c'est la saison qui décide.`,
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
                `C'est notre cours le plus long et en plus petit groupe — il est complet en premier.`,
                `Sans gluten et adapté aux allergies sans frais supplémentaires — dites-le-nous lors de la réservation.`,
                `Des chaussures confortables aident : la promenade au marché fait partie du plaisir.`,
                `Peu de temps ? Le cours de 3 heures <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> saute le marché et passe directement à la farine.`,
              ],
            },
          ],
          faqs: [
            { q: `En quoi est-ce différent du cours La Table du Chef ?`, a: `Mercato & Mani est plus long (environ 5 heures contre 3), commence par la promenade au marché de Sant'Ambrogio, et le menu est construit à partir de ce que vous trouvez — des raviolis, un ragoût et un dessert de saison. C'est aussi plus intime : max 6 personnes au lieu de 8.` },
            { q: `Qu'allons-nous cuisiner ?`, a: `Des raviolis frais, un ragoût longuement mijoté et un dessert de saison, construits autour de ce qui est le meilleur au marché de Sant'Ambrogio ce matin-là. Ensuite, nous nous asseyons tous ensemble pour le manger, avec un verre de vin local.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui — nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Parlez-nous simplement de vos allergies lors de la réservation.` },
            { q: `Comment puis-je réserver et payer ?`, a: `Utilisez le bouton "Réserver ce cours" pour formuler votre demande. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours de pâtes signature de 3 heures — quatre formes, un long déjeuner. 95 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Toute la cuisine, pour vous en privé. Anniversaires, demandes en mariage, réunions — à partir de 680 €.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Cuisinez avec nous d'où vous voulez, en direct de cette même cuisine — à partir de 68 €.` },
          ],
          ctaLabel: `Réserver ce cours`,
          prefill: 'florence',
          breadcrumbName: `Visite du Marché & Cours`,
          product: {
            name: `Mercato & Mani — Visite du Marché et Cours de Cuisine à Florence`,
            description: `Une expérience culinaire florentine de 5 heures : faites vos courses au marché de Sant'Ambrogio avec un chef toscan, puis cuisinez des raviolis, un ragoût et un dessert de saison dans notre cuisine de l'Oltrarno. Max 6 personnes.`,
            price: '145',
          },
        },
      },
      de: {
        slug: 'markt-tour-kochkurs-florenz',
        title: `Markttour & Kochkurs in Florenz — Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `Kaufen Sie mit einem toskanischen Koch auf dem Sant'Ambrogio-Markt ein und verwandeln Sie den Korb dann in unserer Küche im Oltrarno in Ravioli, ein Ragù und ein saisonales Dessert. Etwa 5 Stunden, max. 6 Gäste, 145 € pro Person.`,
        cl: {
          eyebrow: `Mercato & Mani · Sant'Ambrogio + Oltrarno`,
          heading: `Eine Markttour & Kochkurs`,
          headingItal: `in Florenz.`,
          lede: `Beginnen Sie den Tag so, wie es unsere Köche tun: auf dem Markt von Sant'Ambrogio, indem Sie probieren und auswählen, was am besten aussieht. Tragen Sie dann den Korb zurück in unsere Küche im Oltrarno und verwandeln Sie ihn in Ravioli, ein langsames Ragù und ein saisonales Dessert — und setzen Sie sich, um alles gemeinsam zu essen.`,
          image: { src: `/images/aperitivo.webp`, alt: `Frische Marktprodukte und Aperitivo vor dem Kochkurs Mercato & Mani in Florenz`, w: 1080, h: 1440 },
          price: `145 €`,
          priceNote: `pro Person`,
          facts: [
            { label: `Dauer`, value: `etwa 5 Stunden` },
            { label: `Gruppengröße`, value: `max. 6 Gäste` },
            { label: `Beginn`, value: `Morgens, mit dem Markt` },
            { label: `Markt`, value: `Sant'Ambrogio` },
            { label: `Küche`, value: `Oltrarno, nahe Santo Spirito` },
            { label: `Sprache`, value: `Englisch oder Italienisch` },
          ],
          sections: [
            {
              title: `Zuerst der Markt`,
              paras: [
                `Sant'Ambrogio ist der Markt, auf dem die Florentiner tatsächlich einkaufen — kleiner und ruhiger als der Mercato Centrale und voller Standbesitzer, bei denen unsere Köche einkaufen. Sie gehen mit Endri oder Marsel darüber, lernen, worauf Sie bei den Produkten dieser Woche achten müssen, und stellen das Menü aus dem zusammen, was heute gut ist. Keine feste Einkaufsliste: Die Jahreszeit entscheidet.`,
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
                `Dies ist unser längster Kurs in der kleinsten Gruppe — er ist als Erster ausgebucht.`,
                `Glutenfrei und allergiefreundlich ohne Aufpreis — sagen Sie es uns bei der Buchung.`,
                `Bequeme Schuhe helfen: Der Marktspaziergang ist Teil des Spaßes.`,
                `Wenig Zeit? Der 3-stündige Kurs <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> überspringt den Markt und geht direkt zum Mehl.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie unterscheidet sich das vom Kurs „Der Tisch des Küchenchefs“?`, a: `Mercato & Mani ist länger (ca. 5 Stunden statt 3), beginnt mit dem Spaziergang über den Sant'Ambrogio-Markt, und das Menü wird aus dem zusammengestellt, was Sie finden — Ravioli, ein Ragù und ein saisonales Dessert. Es ist auch kleiner: max. 6 Gäste statt 8.` },
            { q: `Was werden wir kochen?`, a: `Frische Ravioli, ein langsam gekochtes Ragù und ein saisonales Dessert, das darauf aufbaut, was an diesem Morgen auf dem Markt von Sant'Ambrogio am besten aussieht. Dann setzen wir uns alle zusammen, um es mit einem Glas Wein aus der Region zu essen.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja — wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Teilen Sie uns bei der Buchung einfach eventuelle Allergien mit.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Diesen Kurs buchen", um Ihre Anfrage zu erstellen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser 3-stündiger Signature-Pasta-Kurs — vier Formen, ein langes Mittagessen. 95 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die ganze Küche, ganz privat für Sie. Geburtstage, Heiratsanträge, Treffen — ab 680 €.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Kochen Sie mit uns von überall aus, live aus derselben Küche — ab 68 €.` },
          ],
          ctaLabel: `Diesen Kurs buchen`,
          prefill: 'florence',
          breadcrumbName: `Markttour & Kochkurs`,
          product: {
            name: `Mercato & Mani — Markttour & Kochkurs in Florenz`,
            description: `Ein 5-stündiges kulinarisches Florenz-Erlebnis: Kaufen Sie mit einem toskanischen Koch auf dem Sant'Ambrogio-Markt ein und kochen Sie dann in unserer Küche im Oltrarno Ravioli, ein Ragù und ein saisonales Dessert. Max. 6 Gäste.`,
            price: '145',
          },
        },
      },
      zh: {
        slug: 'shichang-daolan-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨市场导览与烹饪课程 — Mercato & Mani (€145) | Handmade Pasta Florence`,
        description: `与托斯卡纳厨师一起在圣安布罗焦市场购物，然后在我们奥特拉诺的厨房里将购物篮里的食材变成意式饺子、慢炖肉酱和时令甜点。约5小时，最多6位客人，每人145欧元。`,
        cl: {
          eyebrow: `Mercato & Mani · 圣安布罗焦 + 奥特拉诺`,
          heading: `市场导览与烹饪课程`,
          headingItal: `在佛罗伦萨。`,
          lede: `像我们的厨师一样开始新的一天：在圣安布罗焦市场品尝并挑选最美味的食材。然后带着购物篮回到我们奥特拉诺的厨房，将其变成意式饺子、慢炖肉酱和时令甜点——并坐下来一起享用。`,
          image: { src: `/images/aperitivo.webp`, alt: `在佛罗伦萨的Mercato & Mani烹饪课程之前的新鲜市场农产品和开胃酒`, w: 1080, h: 1440 },
          price: `€145`,
          priceNote: `每人`,
          facts: [
            { label: `时长`, value: `约5小时` },
            { label: `团队规模`, value: `最多6位客人` },
            { label: `开始时间`, value: `早晨，与市场同步` },
            { label: `市场`, value: `圣安布罗焦 (Sant'Ambrogio)` },
            { label: `厨房`, value: `奥特拉诺，靠近圣斯皮里托` },
            { label: `语言`, value: `英语或意大利语` },
          ],
          sections: [
            {
              title: `首先，逛市场`,
              paras: [
                `圣安布罗焦是佛罗伦萨人真正购物的市场——比中央市场更小、更安静，而且到处都是我们厨师光顾的摊主。您将与Endri或Marsel一起漫步其中，了解本周农产品中该寻找什么，并根据今天的好食材来确定菜单。没有固定的购物清单：由季节决定。`,
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
                `这是我们时间最长、人数最少的课程——它总是最先被订满。`,
                `免费提供无麸质和过敏友好选项——请在预订时告知我们。`,
                `穿舒适的鞋子会有帮助：逛市场是乐趣的一部分。`,
                `时间不够？3小时的 <a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌课程</a> 会跳过市场，直接开始面粉制作。`,
              ],
            },
          ],
          faqs: [
            { q: `这与主厨餐桌课程有何不同？`, a: `Mercato & Mani 课程时间更长（约5小时对3小时），从圣安布罗焦市场漫步开始，菜单根据您找到的食材构建——意式饺子、肉酱和时令甜点。而且更私密：最多6位客人，而不是8位。` },
            { q: `我们将烹饪什么？`, a: `新鲜意式饺子、慢炖肉酱和时令甜点，这些都是围绕那天早上在圣安布罗焦市场看起来最美味的食材构建的。然后我们坐在一起，配着一杯当地葡萄酒享用它。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的——我们可以免费准备专门的无麸质面粉混合物和干净的操作台。预订时请告诉我们任何过敏情况。` },
            { q: `我该如何预订和付款？`, a: `使用“预订此课程”按钮创建您的请求。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们招牌的3小时意面课程——四种形状，一顿丰盛的午餐。95欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `为您私人包场的整个厨房。生日、求婚、聚会 — 680欧元起。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `无论在哪里，都可以与我们一起在同一个厨房进行在线烹饪 — 68欧元起。` },
          ],
          ctaLabel: `预订此课程`,
          prefill: 'florence',
          breadcrumbName: `市场导览与烹饪课程`,
          product: {
            name: `Mercato & Mani — 佛罗伦萨市场导览与烹饪课程`,
            description: `5小时佛罗伦萨美食体验：与托斯卡纳农庄厨师一起在圣安布罗焦市场购物，然后在我们奥特拉诺的厨房里烹饪意式饺子、慢炖肉酱和时令甜点。最多6位客人。`,
            price: '145',
          },
        },
      },
    },
  },

  'private': {
    floatingCta: true,
    locales: {
      en: {
        slug: 'private-cooking-class-florence',
        title: `Private Cooking Class in Florence — The Family Long-Table | Handmade Pasta Florence`,
        description: `Book the whole kitchen for a private pasta-making feast in Florence — birthdays, proposals, reunions. 6–14 guests, evenings, two Tuscan chefs all to yourselves. From €680.`,
        cl: {
          eyebrow: `The Family Long-Table · private events`,
          heading: `A private cooking class in Florence,`,
          headingItal: `all to yourselves.`,
          lede: `The whole kitchen, one long table, and two chefs cooking with your people only. This is the farmhouse feast we’ve hosted at our agriturismi for years — birthdays, proposals, reunions — brought to the heart of Florence.`,
          image: { src: `/images/wedding-cake-2.webp`, alt: `A celebration cake at a private Family Long-Table event in Florence`, w: 1080, h: 1433 },
          price: `from €680`,
          priceNote: `private kitchen buyout`,
          facts: [
            { label: `Group size`, value: `6–14 guests` },
            { label: `When`, value: `evenings · flexible` },
            { label: `Format`, value: `whole-kitchen buyout` },
            { label: `Where`, value: `Oltrarno, near Santo Spirito` },
            { label: `Language`, value: `English or Italian` },
            { label: `Enquiries`, value: `answered within a day` },
          ],
          sections: [
            {
              title: `The long-table feast`,
              paras: [
                `At our agriturismi, the long table is where every celebration ends up — everyone cooking, everyone eating, nobody checking the time. The Family Long-Table brings that evening to our Oltrarno kitchen: your group rolls and folds fresh pasta together with Endri and Marsel, then sits down to the feast it just made, with local wine on the table.`,
              ],
            },
            {
              title: `Made for occasions`,
              paras: [
                `Birthdays, proposals, anniversaries, family reunions, friends who finally got the same week off — if it deserves a table, it fits here. Because the kitchen is exclusively yours, we can shape the evening around the occasion. Tell us what you’re celebrating when you book and we’ll plan it with you over WhatsApp.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `From €680 for the private kitchen, for groups of 6–14 — tell us your group size and we’ll confirm a quote.`,
                `Evenings work best, and timing is flexible for private bookings.`,
                `Gluten-free and allergy-friendly at no extra charge — tell us about your group when you book.`,
                `Just the two of you? Most couples book <a href="/pasta-making-class-florence/">The Chef’s Table</a> (max 8 guests, €95 each) — or email us for a private quote for two.`,
                `Company outing instead of a family one? See our <a href="/team-building-cooking-class-florence/">team building cooking class</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `How many people can the private class host?`, a: `The Family Long-Table hosts groups of 6 to 14 around one long table, with the whole kitchen — and both chefs — exclusively yours.` },
            { q: `How does pricing work?`, a: `The private buyout starts at €680 for the kitchen. Send us your group size and date on WhatsApp or email and we’ll confirm a quote for your evening.` },
            { q: `Can you help with a surprise — a proposal or a birthday?`, a: `Yes — proposals, birthdays and reunions are exactly what this format is for. Tell us the plan when you book and we’ll shape the evening around it.` },
            { q: `Can two people book a private cooking class?`, a: `The private buyout is priced for groups of 6–14, so for two it rarely makes sense. Most couples book The Chef’s Table — max 8 guests, €95 per person — which stays intimate. If you’d like the kitchen truly to yourselves, email ciao@handmadepastaflorence.com and we’ll quote a private session for two.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `Yes — we can prepare a dedicated gluten-free flour blend and a clean station at no extra charge. With a private group, just send us everyone’s needs when you book.` },
            { q: `How do I book?`, a: `Use the “Plan your evening” button to start a WhatsApp chat, or email ciao@handmadepastaflorence.com. Private evenings are planned personally, so we’ll confirm details together.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature 3-hour small-group pasta class — €95 per person.` },
            { title: `Team Building Class`, href: `/team-building-cooking-class-florence/`, desc: `The private kitchen for companies — aprons on, laptops away.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Dawn market walk + cooking class. 5 hours, max 6 guests — €145.` },
            { title: `Things to do in the Oltrarno`, href: `/blog/things-to-do-in-oltrarno-florence/`, desc: `Make an evening of it — our neighbourhood, hour by hour.` },
          ],
          ctaLabel: `Plan your evening`,
          prefill: 'florence',
          breadcrumbName: `Private Cooking Class`,
          product: {
            name: `The Family Long-Table — Private Cooking Class in Florence`,
            description: `A private pasta-making feast in Florence for 6–14 guests: the whole Oltrarno kitchen, two agriturismo head chefs, one long table. Birthdays, proposals, reunions.`,
            price: '680',
          },
        },
      },
      it: {
        slug: 'corso-cucina-privato-firenze',
        title: `Corso di Cucina Privato a Firenze — Il Lungo Tavolo di Famiglia | Handmade Pasta Florence`,
        description: `Prenota l'intera cucina per una festa privata a base di pasta fresca a Firenze — compleanni, proposte, ritrovi. 6–14 ospiti, serate, due chef toscani tutti per voi. Da €680.`,
        cl: {
          eyebrow: `Il Lungo Tavolo di Famiglia · eventi privati`,
          heading: `Un corso di cucina privato a Firenze,`,
          headingItal: `tutto per voi.`,
          lede: `L'intera cucina, un lungo tavolo e due chef che cucinano solo per le tue persone. Questa è la festa in fattoria che abbiamo ospitato nei nostri agriturismi per anni — compleanni, proposte, riunioni di famiglia — portata nel cuore di Firenze.`,
          image: { src: `/images/wedding-cake-2.webp`, alt: `Una torta celebrativa in un evento privato Il Lungo Tavolo di Famiglia a Firenze`, w: 1080, h: 1433 },
          price: `da €680`,
          priceNote: `uso esclusivo cucina`,
          facts: [
            { label: `Dimensione gruppo`, value: `6–14 ospiti` },
            { label: `Quando`, value: `serate · flessibile` },
            { label: `Formato`, value: `uso esclusivo della cucina` },
            { label: `Dove`, value: `Oltrarno, vicino a Santo Spirito` },
            { label: `Lingua`, value: `Inglese o Italiano` },
            { label: `Risposte`, value: `entro un giorno lavorativo` },
          ],
          sections: [
            {
              title: `Il banchetto al lungo tavolo`,
              paras: [
                `Nei nostri agriturismi, il lungo tavolo è dove finisce ogni celebrazione — tutti cucinano, tutti mangiano, nessuno guarda l'orologio. Il Lungo Tavolo di Famiglia porta quella serata nella nostra cucina in Oltrarno: il tuo gruppo stende e piega la pasta fresca insieme a Endri e Marsel, per poi sedersi a gustare il banchetto appena preparato, con vino locale in tavola.`,
              ],
            },
            {
              title: `Fatto per le occasioni`,
              paras: [
                `Compleanni, proposte di matrimonio, anniversari, riunioni di famiglia, amici che finalmente hanno preso ferie nella stessa settimana — se merita un tavolo, si adatta qui. Poiché la cucina è esclusivamente tua, possiamo modellare la serata attorno all'occasione. Dicci cosa stai festeggiando quando prenoti e lo pianificheremo insieme su WhatsApp.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Da €680 per la cucina privata, per gruppi di 6–14 persone — comunicaci la dimensione del tuo gruppo e ti confermeremo un preventivo.`,
                `Le serate sono ideali e gli orari sono flessibili per le prenotazioni private.`,
                `Senza glutine e per allergie senza costi aggiuntivi — comunicaci le esigenze del tuo gruppo quando prenoti.`,
                `Siete solo in due? La maggior parte delle coppie sceglie <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> (max 8 ospiti, €95 a persona) — oppure scrivici per un preventivo privato per due.`,
                `Gita aziendale invece che in famiglia? Vedi il nostro <a href="/it/corso-cucina-team-building-firenze/">corso di cucina per team building</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Quante persone può ospitare il corso privato?`, a: `Il Lungo Tavolo di Famiglia ospita gruppi da 6 a 14 persone attorno a un lungo tavolo, con l'intera cucina — ed entrambi gli chef — esclusivamente per voi.` },
            { q: `Come funzionano i prezzi?`, a: `L'uso esclusivo privato parte da €680 per l'intera cucina. Inviaci la dimensione del tuo gruppo e la data su WhatsApp o e-mail e ti confermeremo un preventivo per la tua serata.` },
            { q: `Potete aiutare con una sorpresa — una proposta o un compleanno?`, a: `Sì — proposte, compleanni e riunioni sono esattamente per cosa è pensato questo formato. Dicci il piano quando prenoti e modelleremo la serata attorno ad esso.` },
            { q: `Possono prenotare un corso privato anche solo due persone?`, a: `L'uso esclusivo è pensato per gruppi di 6–14 persone, quindi per due raramente conviene. La maggior parte delle coppie sceglie Il Tavolo dello Chef — max 8 ospiti, €95 a persona — che resta comunque intimo. Se volete la cucina tutta per voi, scrivete a ciao@handmadepastaflorence.com e vi prepareremo un preventivo per una sessione privata per due.` },
            { q: `Potete soddisfare diete senza glutine o allergie?`, a: `Sì — possiamo preparare una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. Con un gruppo privato, basta inviarci le esigenze di tutti al momento della prenotazione.` },
            { q: `Come posso prenotare?`, a: `Usa il pulsante "Pianifica la tua serata" per iniziare una chat su WhatsApp, o invia un'email a ciao@handmadepastaflorence.com. Le serate private sono pianificate personalmente, quindi confermeremo i dettagli insieme.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro classico corso di pasta per piccoli gruppi di 3 ore — €95 a persona.` },
            { title: `Corso per Team Building`, href: `/it/corso-cucina-team-building-firenze/`, desc: `La cucina privata per le aziende — grembiuli indossati, laptop via.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Passeggiata al mercato all'alba + corso di cucina. 5 ore, max 6 ospiti — €145.` },
          ],
          ctaLabel: `Pianifica la tua serata`,
          prefill: 'florence',
          breadcrumbName: `Corso di Cucina Privato`,
          product: {
            name: `Il Lungo Tavolo di Famiglia — Corso di Cucina Privato a Firenze`,
            description: `Una festa privata per preparare la pasta a Firenze per 6–14 ospiti: l'intera cucina in Oltrarno, due chef toscani, un lungo tavolo. Compleanni, proposte, riunioni.`,
            price: '680',
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-prive-florence',
        title: `Cours de Cuisine Privé à Florence — La Longue Table Familiale | Handmade Pasta Florence`,
        description: `Réservez toute la cuisine pour un festin privé de préparation de pâtes à Florence — anniversaires, demandes en mariage, réunions. 6–14 personnes, soirées, deux chefs toscans rien que pour vous. À partir de 680 €.`,
        cl: {
          eyebrow: `La Longue Table Familiale · événements privés`,
          heading: `Un cours de cuisine privé à Florence,`,
          headingItal: `rien que pour vous.`,
          lede: `Toute la cuisine, une longue table et deux chefs qui cuisinent uniquement avec vos proches. C'est le festin fermier que nous organisons dans nos agritourismes depuis des années — anniversaires, demandes en mariage, réunions — apporté au cœur de Florence.`,
          image: { src: `/images/wedding-cake-2.webp`, alt: `Un gâteau de célébration lors d'un événement privé La Longue Table Familiale à Florence`, w: 1080, h: 1433 },
          price: `à partir de 680 €`,
          priceNote: `privatisation de la cuisine`,
          facts: [
            { label: `Taille du groupe`, value: `6–14 personnes` },
            { label: `Quand`, value: `soirées · flexible` },
            { label: `Format`, value: `privatisation complète de la cuisine` },
            { label: `Lieu`, value: `Oltrarno, près de Santo Spirito` },
            { label: `Langue`, value: `Anglais ou Italien` },
            { label: `Demandes`, value: `réponse sous un jour ouvré` },
          ],
          sections: [
            {
              title: `Le festin de la longue table`,
              paras: [
                `Dans nos agritourismes, la longue table est l'endroit où toutes les célébrations se terminent — tout le monde cuisine, tout le monde mange, personne ne regarde l'heure. La Longue Table Familiale apporte cette soirée dans notre cuisine de l'Oltrarno : votre groupe étale et plie des pâtes fraîches avec Endri et Marsel, puis s'assoit pour déguster le festin qu'il vient de préparer, avec du vin local sur la table.`,
              ],
            },
            {
              title: `Fait pour les occasions`,
              paras: [
                `Anniversaires, demandes en mariage, anniversaires de mariage, réunions de famille, amis qui ont enfin réussi à prendre la même semaine de congé — si cela mérite une table, cela a sa place ici. Parce que la cuisine est exclusivement à vous, nous pouvons adapter la soirée à l'occasion. Dites-nous ce que vous célébrez lors de votre réservation et nous le planifierons avec vous sur WhatsApp.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `À partir de 680 € pour la cuisine privée, pour des groupes de 6 à 14 personnes — indiquez-nous la taille de votre groupe et nous vous confirmerons un devis.`,
                `Les soirées conviennent le mieux, et les horaires sont flexibles pour les réservations privées.`,
                `Sans gluten et adapté aux allergies sans frais supplémentaires — parlez-nous de votre groupe lors de la réservation.`,
                `Juste vous deux ? La plupart des couples réservent <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> (max 8 personnes, 95 € par personne) — ou écrivez-nous pour un devis privé pour deux.`,
                `Sortie d'entreprise au lieu d'une sortie en famille ? Voir notre <a href="/fr/cours-cuisine-team-building-florence/">cours de cuisine team building</a>.`,
              ],
            },
          ],
          faqs: [
            { q: `Combien de personnes le cours privé peut-il accueillir ?`, a: `La Longue Table Familiale accueille des groupes de 6 à 14 personnes autour d'une longue table, avec toute la cuisine — et les deux chefs — exclusivement à vous.` },
            { q: `Comment fonctionnent les tarifs ?`, a: `La privatisation commence à 680 € pour la cuisine. Envoyez-nous la taille de votre groupe et la date sur WhatsApp ou par e-mail et nous vous confirmerons un devis pour votre soirée.` },
            { q: `Pouvez-vous aider pour une surprise — une demande en mariage ou un anniversaire ?`, a: `Oui — les demandes en mariage, les anniversaires et les réunions sont exactement la raison d'être de ce format. Expliquez-nous le plan lors de la réservation et nous organiserons la soirée autour.` },
            { q: `Deux personnes peuvent-elles réserver un cours de cuisine privé ?`, a: `La privatisation est tarifée pour des groupes de 6 à 14 personnes, donc pour deux, c'est rarement avantageux. La plupart des couples réservent La Table du Chef — max 8 personnes, 95 € par personne — ce qui reste intime. Si vous souhaitez vraiment la cuisine pour vous seuls, envoyez un e-mail à ciao@handmadepastaflorence.com et nous vous ferons un devis pour une session privée pour deux.` },
            { q: `Pouvez-vous répondre aux régimes sans gluten ou aux allergies ?`, a: `Oui — nous pouvons préparer un mélange de farine sans gluten dédié et un poste de travail propre sans frais supplémentaires. Avec un groupe privé, envoyez-nous simplement les besoins de chacun lors de la réservation.` },
            { q: `Comment réserver ?`, a: `Utilisez le bouton "Planifier votre soirée" pour démarrer une discussion WhatsApp, ou envoyez un e-mail à ciao@handmadepastaflorence.com. Les soirées privées sont planifiées personnellement, nous confirmerons donc les détails ensemble.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours de pâtes signature de 3 heures en petit groupe — 95 € par personne.` },
            { title: `Cours Team Building`, href: `/fr/cours-cuisine-team-building-florence/`, desc: `La cuisine privée pour les entreprises — on met les tabliers, on range les ordinateurs.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Promenade au marché à l'aube + cours de cuisine. 5 heures, max 6 personnes — 145 €.` },
          ],
          ctaLabel: `Planifier votre soirée`,
          prefill: 'florence',
          breadcrumbName: `Cours de Cuisine Privé`,
          product: {
            name: `La Longue Table Familiale — Cours de Cuisine Privé à Florence`,
            description: `Un festin privé de fabrication de pâtes à Florence pour 6–14 personnes : toute la cuisine de l'Oltrarno, deux chefs toscans, une longue table. Anniversaires, demandes en mariage, réunions.`,
            price: '680',
          },
        },
      },
      de: {
        slug: 'privater-kochkurs-florenz',
        title: `Privater Kochkurs in Florenz — Die lange Familientafel | Handmade Pasta Florence`,
        description: `Buchen Sie die ganze Küche für ein privates Pasta-Fest in Florenz — Geburtstage, Heiratsanträge, Treffen. 6–14 Gäste, abends, zwei toskanische Köche ganz für Sie allein. Ab 680 €.`,
        cl: {
          eyebrow: `Die lange Familientafel · private Veranstaltungen`,
          heading: `Ein privater Kochkurs in Florenz,`,
          headingItal: `ganz für Sie allein.`,
          lede: `Die ganze Küche, ein langer Tisch und zwei Köche, die nur mit Ihren Leuten kochen. Das ist das Bauernfest, das wir jahrelang auf unseren Agriturismi veranstaltet haben — Geburtstage, Heiratsanträge, Treffen — gebracht in das Herz von Florenz.`,
          image: { src: `/images/wedding-cake-2.webp`, alt: `Ein Festkuchen bei einer privaten Veranstaltung an der langen Familientafel in Florenz`, w: 1080, h: 1433 },
          price: `ab 680 €`,
          priceNote: `private Küchenmiete`,
          facts: [
            { label: `Gruppengröße`, value: `6–14 Gäste` },
            { label: `Wann`, value: `abends · flexibel` },
            { label: `Format`, value: `gesamte Küchenmiete` },
            { label: `Ort`, value: `Oltrarno, nahe Santo Spirito` },
            { label: `Sprache`, value: `Englisch oder Italienisch` },
            { label: `Anfragen`, value: `innerhalb eines Tages beantwortet` },
          ],
          sections: [
            {
              title: `Das Fest an der langen Tafel`,
              paras: [
                `Auf unseren Agriturismi endet jede Feier an der langen Tafel — alle kochen, alle essen, niemand schaut auf die Uhr. Die lange Familientafel bringt diesen Abend in unsere Küche im Oltrarno: Ihre Gruppe rollt und faltet zusammen mit Endri und Marsel frische Pasta und setzt sich dann an das Festmahl, das sie gerade zubereitet hat, mit Wein aus der Region auf dem Tisch.`,
              ],
            },
            {
              title: `Gemacht für Anlässe`,
              paras: [
                `Geburtstage, Heiratsanträge, Jubiläen, Familientreffen, Freunde, die endlich in der gleichen Woche frei bekommen haben — wenn es einen Tisch verdient, passt es hierhin. Da die Küche exklusiv Ihnen gehört, können wir den Abend um den Anlass herum gestalten. Sagen Sie uns bei der Buchung, was Sie feiern, und wir planen es mit Ihnen über WhatsApp.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Ab 680 € für die private Küche, für Gruppen von 6–14 Personen — teilen Sie uns Ihre Gruppengröße mit und wir bestätigen ein Angebot.`,
                `Die Abende eignen sich am besten, und die Zeiten sind für private Buchungen flexibel.`,
                `Glutenfrei und allergiefreundlich ohne Aufpreis — erzählen Sie uns bei der Buchung von Ihrer Gruppe.`,
                `Nur Sie zwei? Die meisten Paare buchen <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> (max. 8 Gäste, 95 € pro Person) — oder schreiben Sie uns eine E-Mail für ein privates Angebot für zwei.`,
                `Betriebsausflug statt Familienausflug? Sehen Sie sich unseren <a href="/de/teambuilding-kochkurs-florenz/">Teambuilding-Kochkurs</a> an.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie viele Personen fasst der private Kurs?`, a: `Die lange Familientafel bietet Platz für Gruppen von 6 bis 14 Personen an einem langen Tisch, wobei die gesamte Küche — und beide Köche — exklusiv Ihnen gehören.` },
            { q: `Wie funktioniert die Preisgestaltung?`, a: `Die private Miete beginnt bei 680 € für die Küche. Senden Sie uns Ihre Gruppengröße und Ihr Datum per WhatsApp oder E-Mail und wir bestätigen ein Angebot für Ihren Abend.` },
            { q: `Können Sie bei einer Überraschung helfen — einem Heiratsantrag oder einem Geburtstag?`, a: `Ja — Heiratsanträge, Geburtstage und Treffen sind genau das, wofür dieses Format gedacht ist. Teilen Sie uns den Plan bei der Buchung mit und wir gestalten den Abend darum herum.` },
            { q: `Können zwei Personen einen privaten Kochkurs buchen?`, a: `Die private Miete ist für Gruppen von 6–14 Personen kalkuliert, daher macht es für zwei selten Sinn. Die meisten Paare buchen Der Tisch des Küchenchefs — max. 8 Gäste, 95 € pro Person —, der intim bleibt. Wenn Sie die Küche wirklich für sich allein haben möchten, senden Sie eine E-Mail an ciao@handmadepastaflorence.com und wir machen Ihnen ein Angebot für eine private Sitzung für zwei.` },
            { q: `Können Sie auf glutenfreie Diäten oder Allergien eingehen?`, a: `Ja — wir können ohne Aufpreis eine spezielle glutenfreie Mehlmischung und eine saubere Station vorbereiten. Bei einer privaten Gruppe senden Sie uns bei der Buchung einfach die Bedürfnisse aller zu.` },
            { q: `Wie buche ich?`, a: `Nutzen Sie die Schaltfläche "Planen Sie Ihren Abend", um einen WhatsApp-Chat zu starten, oder senden Sie eine E-Mail an ciao@handmadepastaflorence.com. Private Abende werden persönlich geplant, daher bestätigen wir die Details gemeinsam.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser 3-stündiger Signature-Pasta-Kurs in kleinen Gruppen — 95 € pro Person.` },
            { title: `Teambuilding-Kurs`, href: `/de/teambuilding-kochkurs-florenz/`, desc: `Die private Küche für Unternehmen — Schürzen an, Laptops weg.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Morgendlicher Marktspaziergang + Kochkurs. 5 Stunden, max. 6 Gäste — 145 €.` },
          ],
          ctaLabel: `Planen Sie Ihren Abend`,
          prefill: 'florence',
          breadcrumbName: `Privater Kochkurs`,
          product: {
            name: `Die lange Familientafel — Privater Kochkurs in Florenz`,
            description: `Ein privates Pasta-Fest in Florenz für 6–14 Gäste: die ganze Küche im Oltrarno, zwei toskanische Köche, ein langer Tisch. Geburtstage, Heiratsanträge, Treffen.`,
            price: '680',
          },
        },
      },
      zh: {
        slug: 'siren-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨私人烹饪课程 — 家庭长桌体验 | Handmade Pasta Florence`,
        description: `预订整个厨房，在佛罗伦萨举办私人的意面制作盛宴 — 生日、求婚、聚会。6–14位客人，晚上，两位托斯卡纳厨师专为您服务。680欧元起。`,
        cl: {
          eyebrow: `家庭长桌体验 · 私人活动`,
          heading: `佛罗伦萨私人烹饪课程，`,
          headingItal: `完全属于您的空间。`,
          lede: `整个厨房、一张长桌和两位厨师只为您和您的亲友烹饪。这是我们多年来在农庄里举办的农场盛宴——生日、求婚、聚会——现在带到了佛罗伦萨的中心。`,
          image: { src: `/images/wedding-cake-2.webp`, alt: `佛罗伦萨“家庭长桌体验”私人活动中的庆祝蛋糕`, w: 1080, h: 1433 },
          price: `从 €680 起`,
          priceNote: `私人厨房包场`,
          facts: [
            { label: `团队规模`, value: `6–14位客人` },
            { label: `时间`, value: `晚上 · 灵活` },
            { label: `形式`, value: `整个厨房包场` },
            { label: `地点`, value: `奥特拉诺，靠近圣斯皮里托` },
            { label: `语言`, value: `英语或意大利语` },
            { label: `咨询回复`, value: `一个工作日内` },
          ],
          sections: [
            {
              title: `长桌盛宴`,
              paras: [
                `在我们的农庄里，长桌是每一场庆祝活动最终的归宿——每个人都在做饭，每个人都在吃，没有人看时间。“家庭长桌体验”将那个美好的夜晚带到了我们奥特拉诺的厨房：您的团队与Endri和Marsel一起擀面和折叠新鲜的意面，然后坐下来享用自己制作的盛宴，桌上还备有当地的葡萄酒。`,
              ],
            },
            {
              title: `专为特殊场合打造`,
              paras: [
                `生日、求婚、纪念日、家庭聚会、朋友们终于在同一周休假——只要它值得一张桌子来庆祝，它就适合这里。因为厨房完全属于您，我们可以围绕这个场合来设计这个夜晚。在预订时告诉我们您要庆祝什么，我们将通过WhatsApp与您一起计划。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `私人厨房起价680欧元，适合6至14人的团体——告诉我们您的团体人数，我们将为您确认报价。`,
                `晚上的时间最合适，私人预订的时间安排也很灵活。`,
                `免费提供无麸质和过敏友好选项——预订时告诉我们您团体的需求。`,
                `只有你们两个人？大多数情侣会预订 <a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌</a>（最多8位客人，每人95欧元）——或者通过邮件联系我们获取双人私人报价。`,
                `公司团建而不是家庭聚会？请查看我们的 <a href="/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/">团队建设烹饪课程</a>。`,
              ],
            },
          ],
          faqs: [
            { q: `私人课程能容纳多少人？`, a: `“家庭长桌体验”可容纳6到14人的团体围坐在一张长桌旁，整个厨房和两位厨师都专为您服务。` },
            { q: `价格是怎么算的？`, a: `厨房的私人包场起价为680欧元。在WhatsApp或通过邮件将您的团体人数和日期发送给我们，我们将确认您这晚的报价。` },
            { q: `你们能帮忙准备惊喜吗——比如求婚或生日？`, a: `是的——求婚、生日和聚会正是这种形式的初衷。在预订时告诉我们您的计划，我们将围绕它来设计这个夜晚。` },
            { q: `两个人可以预订私人烹饪课程吗？`, a: `私人包场是为6–14人的团体定价的，所以两人的话通常不太划算。大多数情侣预订“主厨餐桌”——最多8位客人，每人95欧元——这同样很私密。如果您真的很想两人独享厨房，请发送邮件至 ciao@handmadepastaflorence.com，我们会为您提供双人私人课程的报价。` },
            { q: `你们能满足无麸质饮食或过敏需求吗？`, a: `是的——我们可以免费准备专门的无麸质面粉混合物和干净的操作台。对于私人团体，只需在预订时将每个人的需求发送给我们。` },
            { q: `我该如何预订？`, a: `使用“规划您的夜晚”按钮开始WhatsApp聊天，或发送电子邮件至 ciao@handmadepastaflorence.com。私人夜晚是专人计划的，因此我们将一起确认细节。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们招牌的3小时小团意面课程 — 每人95欧元。` },
            { title: `团队建设课程`, href: `/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/`, desc: `为企业提供的私人厨房 — 穿上围裙，收起电脑。` },
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨市场漫步 + 烹饪课程。5小时，最多6位客人 — 145欧元。` },
          ],
          ctaLabel: `规划您的夜晚`,
          prefill: 'florence',
          breadcrumbName: `私人烹饪课程`,
          product: {
            name: `家庭长桌体验 — 佛罗伦萨私人烹饪课程`,
            description: `在佛罗伦萨为6-14位客人举办的私人意面制作盛宴：整个奥特拉诺厨房、两位托斯卡纳农庄厨师、一张长桌。生日、求婚、聚会。`,
            price: '680',
          },
        },
      },
    },
  },

  'online': {
    floatingCta: true,
    locales: {
      en: {
        slug: 'online-pasta-making-class',
        title: `Live Online Pasta Making Class with Ingredient Kit | Handmade Pasta Florence`,
        description: `Cook fresh pasta live with two Tuscan chefs, streamed from our Florence kitchen — from €68 per person, with an optional fresh-pasta ingredient kit (00 flour, semola, rolling pin, recipe cards) shipped chilled to your door.`,
        cl: {
          eyebrow: `Live Online · streamed from Florence`,
          heading: `An online pasta making class,`,
          headingItal: `from our kitchen to yours.`,
          lede: `Same chefs, same Florence kitchen — live on your screen. Roll and fold fresh pasta along with Endri and Marsel in real time, with an ingredient kit that can arrive chilled at your door before class.`,
          image: { src: `/images/cooking-class.jpg`, alt: `Our Florentine kitchen, where we stream the live online pasta making classes`, w: 981, h: 1603 },
          price: `from €68`,
          priceNote: `per person`,
          facts: [
            { label: `Format`, value: `live video, hands-on` },
            { label: `Streamed from`, value: `our Florence kitchen` },
            { label: `Kit`, value: `optional, +€34 shipped` },
            { label: `Times`, value: `shown in your time zone` },
            { label: `Language`, value: `English or Italian` },
            { label: `Great as`, value: `a gift` },
          ],
          sections: [
            {
              title: `How a live class works`,
              paras: [
                `This is not a pre-recorded video. You cook live with the same two chefs who teach in Florence, streamed from the same kitchen. You see their hands, they see your dough, and they talk you through every stage — mixing, kneading, rolling, shaping — until there’s fresh pasta on your counter.`,
                `When you pick a date, the booking calendar shows class times in both Florence time and your own time zone, so there’s no arithmetic at midnight.`,
              ],
            },
            {
              title: `The ingredient kit`,
              paras: [
                `Add the kit at booking (+€34 per order) and we ship it chilled to your door: 00 flour, semola, a rolling pin and our recipe cards — everything specialty, so your kitchen only needs the basics. Prefer to shop yourself? Book without the kit and tell us on WhatsApp; we’ll walk you through what to have ready.`,
              ],
            },
            {
              title: `A gift that isn’t a gadget`,
              paras: [
                `A live class (with the kit on the doorstep) has become our most-loved gift order — for the friend who dreams about Italy, the parent who taught you to cook, or the couple you can’t buy objects for anymore. Use the “Gift a class” link in the footer or just tell us it’s a gift when you book.`,
              ],
            },
          ],
          faqs: [
            { q: `What do I need at home for the class?`, a: `A counter or table to work on and basic kitchen staples. If you add the ingredient kit, the specialty items — 00 flour, semola, a rolling pin and recipe cards — arrive chilled at your door. If not, tell us when you book and we’ll walk you through what to have ready.` },
            { q: `What about time zones?`, a: `The booking calendar shows every class time in both Florence time and your local time, side by side, before you confirm.` },
            { q: `Is it really live? Can I ask questions?`, a: `Yes — it’s a live stream from our Florence kitchen with the same chefs who teach in person. Ask anything mid-knead; that’s the point.` },
            { q: `Can I gift an online class?`, a: `Absolutely — it’s one of our favourite orders to prepare. Book as normal and tell us it’s a gift, and we’ll help you arrange the kit delivery and timing.` },
            { q: `How do I book and pay?`, a: `Use the “Book the online class” button to pick a date and time. It opens a WhatsApp chat with the details filled in, and we’ll confirm availability and walk you through the rest.` },
          ],
          related: [
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Coming to Florence after all? The in-person original — €95.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Dawn market walk + cooking class in Florence — €145.` },
            { title: `Tuscan pasta shapes, explained`, href: `/blog/tuscan-pasta-shapes-guide/`, desc: `Meet pici, pappardelle and tortelli before class.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `A private feast in Florence for 6–14 — from €680.` },
          ],
          ctaLabel: `Book the online class`,
          prefill: 'online',
          breadcrumbName: `Live Online Pasta Class`,
          product: {
            name: `Live Online Pasta Making Class — Handmade Pasta Florence`,
            description: `A live, hands-on online pasta making class streamed from a Florence kitchen by two Tuscan agriturismo head chefs, with an optional fresh-pasta ingredient kit shipped chilled to your door.`,
            price: '68',
          },
        },
      },
      it: {
        slug: 'corso-pasta-online',
        title: `Corso di Pasta in Diretta Online con Kit Ingredienti | Handmade Pasta Florence`,
        description: `Cucina pasta fresca in diretta con due chef toscani, trasmesso dalla nostra cucina di Firenze — da €68 a persona, con kit ingredienti per pasta fresca opzionale (farina 00, semola, mattarello, schede ricette) spedito refrigerato a casa tua.`,
        cl: {
          eyebrow: `In Diretta Online · trasmesso da Firenze`,
          heading: `Un corso di pasta online,`,
          headingItal: `dalla nostra cucina alla tua.`,
          lede: `Stessi chef, stessa cucina fiorentina — in diretta sul tuo schermo. Stendi e piega la pasta fresca insieme a Endri e Marsel in tempo reale, con un kit di ingredienti che può arrivare refrigerato alla tua porta prima del corso.`,
          image: { src: `/images/cooking-class.jpg`, alt: `La nostra cucina fiorentina, da dove trasmettiamo i corsi di pasta fresca online in diretta`, w: 981, h: 1603 },
          price: `da €68`,
          priceNote: `a persona`,
          facts: [
            { label: `Formato`, value: `video in diretta, pratico` },
            { label: `Trasmesso da`, value: `la nostra cucina a Firenze` },
            { label: `Kit`, value: `opzionale, +€34 spedito` },
            { label: `Orari`, value: `mostrati nel tuo fuso orario` },
            { label: `Lingua`, value: `Inglese o Italiano` },
            { label: `Ottimo come`, value: `regalo` },
          ],
          sections: [
            {
              title: `Come funziona un corso in diretta`,
              paras: [
                `Questo non è un video pre-registrato. Cucini dal vivo con gli stessi due chef che insegnano in presenza, trasmessi dalla stessa cucina. Vedi le loro mani, loro vedono il tuo impasto e ti guidano attraverso ogni fase — miscelare, impastare, stendere, dare forma — finché non avrai della pasta fresca sul tuo bancone.`,
                `Quando scegli una data, il calendario delle prenotazioni mostra gli orari del corso sia nel fuso orario di Firenze che nel tuo, così non ci sono calcoli matematici da fare a mezzanotte.`,
              ],
            },
            {
              title: `Il kit ingredienti`,
              paras: [
                `Aggiungi il kit al momento della prenotazione (+€34 a ordine) e lo spediamo refrigerato a casa tua: farina 00, semola, un mattarello e le nostre schede con le ricette — tutte specialità, così la tua cucina ha bisogno solo delle basi. Preferisci fare la spesa tu? Prenota senza il kit e scrivici su WhatsApp; ti guideremo su cosa preparare.`,
              ],
            },
            {
              title: `Un regalo che non è un gadget`,
              paras: [
                `Un corso in diretta (con il kit consegnato a casa) è diventato l'ordine regalo più amato — per l'amico che sogna l'Italia, per il genitore che ti ha insegnato a cucinare o per la coppia a cui non puoi più comprare oggetti. Usa il link "Regala un corso" nel footer o semplicemente dicci che è un regalo quando prenoti.`,
              ],
            },
          ],
          faqs: [
            { q: `Di cosa ho bisogno a casa per il corso?`, a: `Un bancone o un tavolo su cui lavorare e i prodotti di base della cucina. Se aggiungi il kit ingredienti, le specialità — farina 00, semola, un mattarello e le schede ricette — arriveranno refrigerate a casa tua. Altrimenti, diccelo al momento della prenotazione e ti guideremo su cosa preparare.` },
            { q: `E per i fusi orari?`, a: `Il calendario delle prenotazioni mostra ogni orario di corso sia nel fuso orario di Firenze che in quello locale, fianco a fianco, prima della conferma.` },
            { q: `È davvero in diretta? Posso fare domande?`, a: `Sì — è una diretta streaming dalla nostra cucina di Firenze con gli stessi chef che insegnano in presenza. Chiedi qualsiasi cosa a metà impasto; è questo il bello.` },
            { q: `Posso regalare un corso online?`, a: `Assolutamente — è uno dei nostri ordini preferiti da preparare. Prenota normalmente dicendoci che è un regalo, e ti aiuteremo a organizzare la consegna del kit e i tempi.` },
            { q: `Come posso prenotare e pagare?`, a: `Usa il pulsante "Prenota il corso online" per scegliere data e ora. Si apre una chat di WhatsApp con i dettagli precompilati, noi confermeremo la disponibilità e ti guideremo nel resto.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Verrai comunque a Firenze? L'originale corso in presenza — €95.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Passeggiata al mercato all'alba + corso di cucina a Firenze — €145.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `Un banchetto privato a Firenze per 6–14 persone — da €680.` },
          ],
          ctaLabel: `Prenota il corso online`,
          prefill: 'online',
          breadcrumbName: `Corso di Pasta Online`,
          product: {
            name: `Corso di Pasta in Diretta Online — Handmade Pasta Florence`,
            description: `Un corso di pasta online pratico e in diretta trasmesso da una cucina fiorentina da due chef toscani, con l'opzione di un kit di ingredienti per pasta fresca spedito refrigerato alla tua porta.`,
            price: '68',
          },
        },
      },
      fr: {
        slug: 'cours-pates-en-ligne',
        title: `Cours de Pâtes en Direct en Ligne avec Kit d'Ingrédients | Handmade Pasta Florence`,
        description: `Cuisinez des pâtes fraîches en direct avec deux chefs toscans, diffusé depuis notre cuisine de Florence — à partir de 68 € par personne, avec un kit d'ingrédients opitonnel (farine 00, semoule, rouleau à pâtisserie, fiches recettes) livré frais à votre porte.`,
        cl: {
          eyebrow: `En Direct en Ligne · diffusé depuis Florence`,
          heading: `Un cours de pâtes en ligne,`,
          headingItal: `de notre cuisine à la vôtre.`,
          lede: `Mêmes chefs, même cuisine florentine — en direct sur votre écran. Étalez et pliez des pâtes fraîches avec Endri et Marsel en temps réel, avec un kit d'ingrédients qui peut arriver frais à votre porte avant le cours.`,
          image: { src: `/images/cooking-class.jpg`, alt: `Notre cuisine florentine, d'où nous diffusons les cours de pâtes en ligne en direct`, w: 981, h: 1603 },
          price: `à partir de 68 €`,
          priceNote: `par personne`,
          facts: [
            { label: `Format`, value: `vidéo en direct, pratique` },
            { label: `Diffusé de`, value: `notre cuisine à Florence` },
            { label: `Kit`, value: `optionnel, +34 € livré` },
            { label: `Horaires`, value: `affichés dans votre fuseau horaire` },
            { label: `Langue`, value: `Anglais ou Italien` },
            { label: `Génial comme`, value: `cadeau` },
          ],
          sections: [
            {
              title: `Comment fonctionne un cours en direct`,
              paras: [
                `Ce n'est pas une vidéo préenregistrée. Vous cuisinez en direct avec les deux mêmes chefs qui enseignent à Florence, diffusé depuis la même cuisine. Vous voyez leurs mains, ils voient votre pâte, et ils vous guident à chaque étape — mélange, pétrissage, étalage, façonnage — jusqu'à ce qu'il y ait des pâtes fraîches sur votre plan de travail.`,
                `Lorsque vous choisissez une date, le calendrier de réservation affiche les horaires des cours à la fois à l'heure de Florence et dans votre propre fuseau horaire, il n'y a donc pas de calcul mental à faire à minuit.`,
              ],
            },
            {
              title: `Le kit d'ingrédients`,
              paras: [
                `Ajoutez le kit lors de la réservation (+34 € par commande) et nous le livrons frais à votre porte : farine 00, semoule, un rouleau à pâtisserie et nos fiches de recettes — toutes les spécialités, pour que votre cuisine n'ait besoin que des bases. Vous préférez faire les courses vous-même ? Réservez sans le kit et dites-le-nous sur WhatsApp ; nous vous indiquerons ce qu'il faut préparer.`,
              ],
            },
            {
              title: `Un cadeau qui n'est pas un gadget`,
              paras: [
                `Un cours en direct (avec le kit sur le pas de la porte) est devenu notre commande de cadeau la plus appréciée — pour l'ami qui rêve de l'Italie, le parent qui vous a appris à cuisiner, ou le couple à qui vous ne pouvez plus offrir d'objets. Utilisez le lien "Offrir un cours" dans le pied de page ou dites-nous simplement que c'est un cadeau lors de votre réservation.`,
              ],
            },
          ],
          faqs: [
            { q: `De quoi ai-je besoin à la maison pour le cours ?`, a: `D'un plan de travail ou d'une table pour travailler et d'articles de cuisine de base. Si vous ajoutez le kit d'ingrédients, les spécialités — farine 00, semoule, rouleau à pâtisserie et fiches de recettes — arrivent fraîches à votre porte. Sinon, dites-le-nous lors de votre réservation et nous vous expliquerons ce qu'il faut préparer.` },
            { q: `Et les fuseaux horaires ?`, a: `Le calendrier de réservation affiche chaque heure de cours à l'heure de Florence et à votre heure locale, côte à côte, avant que vous ne confirmiez.` },
            { q: `Est-ce vraiment en direct ? Puis-je poser des questions ?`, a: `Oui — c'est une diffusion en direct de notre cuisine de Florence avec les mêmes chefs qui enseignent en personne. Demandez n'importe quoi en plein pétrissage ; c'est le but.` },
            { q: `Puis-je offrir un cours en ligne ?`, a: `Absolument — c'est l'une de nos commandes préférées à préparer. Réservez normalement et dites-nous que c'est un cadeau, et nous vous aiderons à organiser la livraison du kit et le moment idéal.` },
            { q: `Comment réserver et payer ?`, a: `Utilisez le bouton "Réserver le cours en ligne" pour choisir une date et une heure. Cela ouvre une discussion WhatsApp avec les détails remplis, et nous confirmerons la disponibilité et vous guiderons pour le reste.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Vous venez à Florence finalement ? L'original en personne — 95 €.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Promenade au marché à l'aube + cours de cuisine à Florence — 145 €.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Un festin privé à Florence pour 6–14 personnes — à partir de 680 €.` },
          ],
          ctaLabel: `Réserver le cours en ligne`,
          prefill: 'online',
          breadcrumbName: `Cours de Pâtes en Ligne`,
          product: {
            name: `Cours de Pâtes en Direct en Ligne — Handmade Pasta Florence`,
            description: `Un cours de fabrication de pâtes en ligne, en direct et pratique, diffusé depuis une cuisine de Florence par deux chefs d'agritourisme toscans, avec un kit d'ingrédients optionnel livré frais à votre porte.`,
            price: '68',
          },
        },
      },
      de: {
        slug: 'online-pasta-kurs',
        title: `Live-Online-Pasta-Kurs mit Zutaten-Kit | Handmade Pasta Florence`,
        description: `Kochen Sie live frische Pasta mit zwei toskanischen Köchen, gestreamt aus unserer Küche in Florenz — ab 68 € pro Person, mit einem optionalen Zutaten-Kit für frische Pasta (00-Mehl, Semola, Nudelholz, Rezeptkarten), das gekühlt an Ihre Tür geliefert wird.`,
        cl: {
          eyebrow: `Live Online · gestreamt aus Florenz`,
          heading: `Ein Online-Pasta-Kurs,`,
          headingItal: `von unserer Küche in Ihre.`,
          lede: `Gleiche Köche, gleiche Florentiner Küche — live auf Ihrem Bildschirm. Rollen und falten Sie frische Pasta zusammen mit Endri und Marsel in Echtzeit, mit einem Zutaten-Kit, das vor dem Kurs gekühlt an Ihre Tür kommen kann.`,
          image: { src: `/images/cooking-class.jpg`, alt: `Unsere Florentiner Küche, von der aus wir die Live-Online-Pasta-Kurse streamen`, w: 981, h: 1603 },
          price: `ab 68 €`,
          priceNote: `pro Person`,
          facts: [
            { label: `Format`, value: `Live-Video, praktisch` },
            { label: `Gestreamt aus`, value: `unserer Küche in Florenz` },
            { label: `Kit`, value: `optional, +34 € geliefert` },
            { label: `Zeiten`, value: `in Ihrer Zeitzone angezeigt` },
            { label: `Sprache`, value: `Englisch oder Italienisch` },
            { label: `Ideal als`, value: `Geschenk` },
          ],
          sections: [
            {
              title: `Wie ein Live-Kurs funktioniert`,
              paras: [
                `Dies ist kein aufgezeichnetes Video. Sie kochen live mit denselben zwei Köchen, die in Florenz unterrichten, gestreamt aus derselben Küche. Sie sehen ihre Hände, sie sehen Ihren Teig, und sie führen Sie durch jede Phase — Mischen, Kneten, Rollen, Formen —, bis frische Pasta auf Ihrer Arbeitsfläche liegt.`,
                `Wenn Sie ein Datum auswählen, zeigt der Buchungskalender die Kurszeiten sowohl in der Florentiner Zeit als auch in Ihrer eigenen Zeitzone an, sodass es um Mitternacht keine Rechenaufgaben gibt.`,
              ],
            },
            {
              title: `Das Zutaten-Kit`,
              paras: [
                `Fügen Sie das Kit bei der Buchung hinzu (+34 € pro Bestellung) und wir liefern es gekühlt an Ihre Tür: 00-Mehl, Semola, ein Nudelholz und unsere Rezeptkarten — alles Spezialitäten, sodass Ihre Küche nur die Grundlagen benötigt. Möchten Sie lieber selbst einkaufen? Buchen Sie ohne das Kit und sagen Sie es uns über WhatsApp; wir führen Sie durch das, was Sie bereithalten sollten.`,
              ],
            },
            {
              title: `Ein Geschenk, das kein Gadget ist`,
              paras: [
                `Ein Live-Kurs (mit dem Kit vor der Haustür) hat sich zu unserer beliebtesten Geschenkbestellung entwickelt — für den Freund, der von Italien träumt, das Elternteil, das Ihnen das Kochen beigebracht hat, oder das Paar, für das man keine Gegenstände mehr kaufen kann. Nutzen Sie den Link "Einen Kurs verschenken" in der Fußzeile oder sagen Sie uns einfach bei der Buchung, dass es ein Geschenk ist.`,
              ],
            },
          ],
          faqs: [
            { q: `Was brauche ich zu Hause für den Kurs?`, a: `Eine Arbeitsfläche oder einen Tisch zum Arbeiten und grundlegende Küchenutensilien. Wenn Sie das Zutaten-Kit hinzufügen, kommen die Spezialartikel — 00-Mehl, Semola, ein Nudelholz und Rezeptkarten — gekühlt an Ihre Tür. Wenn nicht, sagen Sie es uns bei der Buchung und wir erklären Ihnen, was Sie bereithalten sollten.` },
            { q: `Was ist mit Zeitzonen?`, a: `Der Buchungskalender zeigt jede Kurszeit vor Ihrer Bestätigung sowohl in der Florentiner Zeit als auch in Ihrer lokalen Zeit nebeneinander an.` },
            { q: `Ist es wirklich live? Kann ich Fragen stellen?`, a: `Ja — es ist ein Live-Stream aus unserer Küche in Florenz mit denselben Köchen, die persönlich unterrichten. Fragen Sie alles mitten im Kneten; das ist der Sinn der Sache.` },
            { q: `Kann ich einen Online-Kurs verschenken?`, a: `Absolut — es gehört zu unseren Lieblingsbestellungen, die wir vorbereiten. Buchen Sie wie gewohnt und sagen Sie uns, dass es ein Geschenk ist, und wir helfen Ihnen, die Lieferung des Kits und den Zeitpunkt zu organisieren.` },
            { q: `Wie buche und bezahle ich?`, a: `Nutzen Sie die Schaltfläche "Online-Kurs buchen", um Datum und Uhrzeit auszuwählen. Es öffnet sich ein WhatsApp-Chat mit den ausgefüllten Details, und wir bestätigen die Verfügbarkeit und führen Sie durch den Rest.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Kommen Sie doch nach Florenz? Das Original vor Ort — 95 €.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Morgendlicher Marktspaziergang + Kochkurs in Florenz — 145 €.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Ein privates Fest in Florenz für 6–14 Personen — ab 680 €.` },
          ],
          ctaLabel: `Online-Kurs buchen`,
          prefill: 'online',
          breadcrumbName: `Live-Online-Pasta-Kurs`,
          product: {
            name: `Live-Online-Pasta-Kurs — Handmade Pasta Florence`,
            description: `Ein praktischer Online-Pasta-Kurs, gestreamt aus einer Florentiner Küche von zwei toskanischen Agriturismo-Köchen, mit einem optionalen Zutaten-Kit, das gekühlt an Ihre Tür geliefert wird.`,
            price: '68',
          },
        },
      },
      zh: {
        slug: 'zaixian-yidali-mian-kecheng',
        title: `含食材包的在线直播意面课程 | Handmade Pasta Florence`,
        description: `与两位托斯卡纳厨师一起进行在线直播烹饪，从我们的佛罗伦萨厨房为您实时转播 — 每人68欧元起，可选择将新鲜意面食材包（00号面粉、杜兰小麦粉、擀面杖、食谱卡）冷藏配送到您家。`,
        cl: {
          eyebrow: `在线直播 · 佛罗伦萨实时转播`,
          heading: `一门在线的意面课程，`,
          headingItal: `从我们的厨房到您的厨房。`,
          lede: `同样的厨师，同样的佛罗伦萨厨房——在您的屏幕上直播。与Endri和Marsel一起实时擀面和折叠新鲜的意面，食材包可以在课前冷藏送到您家门口。`,
          image: { src: `/images/cooking-class.jpg`, alt: `我们的佛罗伦萨厨房，也是我们转播在线意面课程的地方`, w: 981, h: 1603 },
          price: `从 €68 起`,
          priceNote: `每人`,
          facts: [
            { label: `形式`, value: `直播视频，动手实践` },
            { label: `转播自`, value: `我们的佛罗伦萨厨房` },
            { label: `食材包`, value: `可选，+€34 配送费` },
            { label: `时间`, value: `以您的时区显示` },
            { label: `语言`, value: `英语或意大利语` },
            { label: `非常适合`, value: `作为礼物` },
          ],
          sections: [
            {
              title: `直播课程是如何进行的`,
              paras: [
                `这不是预先录制的视频。您将与在佛罗伦萨亲自授课的两位主厨一起进行实时烹饪，并从同一个厨房进行转播。您能看到他们的手，他们也能看到您的面团，并会在每个阶段（混合、揉面、擀面、塑形）与您交流，直到您的操作台上出现新鲜的意面。`,
                `当您选择日期时，预订日历会同时显示佛罗伦萨时间和您自己时区的课程时间，所以您不需要在午夜进行时差计算。`,
              ],
            },
            {
              title: `食材包`,
              paras: [
                `在预订时添加食材包（每份订单+34欧元），我们将冷藏配送到您家：00号面粉、杜兰小麦粉（semola）、一根擀面杖和我们的食谱卡——全都是特色食材，因此您的厨房只需准备基本用品。更喜欢自己去买？无需添加食材包进行预订，并在WhatsApp上告诉我们；我们将指导您需要准备什么。`,
              ],
            },
            {
              title: `不是普通物件的贴心礼物`,
              paras: [
                `一门直播课程（附送送货上门的食材包）已成为我们最受欢迎的礼物订单——送给梦想去意大利的朋友、教您做饭的父母，或者您已经不知道该买什么礼物的伴侣。使用底部的“赠送课程”链接，或者在预订时直接告诉我们这是一份礼物。`,
              ],
            },
          ],
          faqs: [
            { q: `课程需要在家里准备什么？`, a: `一个可以操作的台面或桌子，以及基本的厨房主食。如果您添加了食材包，特色物品——00号面粉、杜兰小麦粉、擀面杖和食谱卡——将会冷藏送到您家门口。如果没有，请在预订时告诉我们，我们将指导您准备什么。` },
            { q: `时差问题怎么解决？`, a: `在您确认之前，预订日历会并排显示佛罗伦萨时间和您当地时间的每一个课程时间。` },
            { q: `这真的是直播吗？我可以提问吗？`, a: `是的——这是从我们的佛罗伦萨厨房进行的实时直播，由亲自授课的相同厨师主持。您可以在揉面中途询问任何问题；这正是直播的意义所在。` },
            { q: `我可以将在线课程作为礼物赠送吗？`, a: `绝对可以——这是我们最喜欢准备的订单之一。像往常一样预订并告诉我们这是一份礼物，我们将帮助您安排食材包的配送和时间。` },
            { q: `我该如何预订和付款？`, a: `使用“预订在线课程”按钮选择日期和时间。它会打开一个带有预填详情的WhatsApp聊天，我们将确认可用性并指导您完成剩余步骤。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `您还是要来佛罗伦萨吗？体验原汁原味的线下课程 — 95欧元。` },
            { title: `Mercato & Mani`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨市场漫步 + 佛罗伦萨的烹饪课程 — 145欧元。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `在佛罗伦萨为6-14人准备的私人盛宴 — 680欧元起。` },
          ],
          ctaLabel: `预订在线课程`,
          prefill: 'online',
          breadcrumbName: `在线直播意面课程`,
          product: {
            name: `在线直播意面课程 — Handmade Pasta Florence`,
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
        title: `Food Teambuilding in Florence — Private Pasta-Making Class, 6–14 People | Handmade Pasta Florence`,
        description: `A hands-on food teambuilding activity in Florence: your team rolls fresh pasta with two English-speaking Tuscan chefs, then shares the lunch it made. Private kitchen buyout for 6–14 people, wine pairing and dietary options.`,
        cl: {
          eyebrow: `For companies · private kitchen buyout`,
          heading: `Team building, with`,
          headingItal: `flour on your hands.`,
          lede: `Aprons on, laptops away. Your team takes over our Oltrarno kitchen with two English-speaking chefs, rolls and folds fresh pasta side by side, and then sits down to a long lunch it made itself. Five minutes from the Ponte Vecchio.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `A group cooking together at a private team building pasta class in Florence`, w: 1050, h: 1400 },
          price: `Private buyout`,
          priceNote: `6–14 people · quoted per group`,
          facts: [
            { label: `Group size`, value: `6–14 people` },
            { label: `Format`, value: `private kitchen buyout` },
            { label: `Hosts`, value: `English-speaking chefs` },
            { label: `Options`, value: `wine pairing · dietary` },
            { label: `Where`, value: `5 min from Ponte Vecchio` },
            { label: `Reply time`, value: `within one working day` },
          ],
          sections: [
            {
              title: `Why pasta is the food teambuilding activity that works`,
              paras: [
                `Fresh pasta is the rare team activity where nobody can hide behind a screen and nobody needs prior skill. Everyone starts with the same pile of flour, everyone’s first pici is crooked, and an hour later the table is covered in something the team actually made together. Then you eat it — which beats a debrief.`,
                `Of all the food teambuilding ideas in Florence — wine tastings, tasting walks, another aperitivo — this is the one where nobody stands at the back watching. And the kitchen is exclusively yours: no strangers, your pace, your dietary needs handled in advance.`,
              ],
            },
            {
              title: `How the session runs`,
              paras: [
                `The format follows our signature class — hands-on from the first minute, two head chefs hosting, and a sit-down lunch of what the team made, with local wine if you want it. As a private booking, timing is flexible around your agenda; most teams take the class in place of a lunch or as the evening wind-down of an offsite.`,
              ],
            },
            {
              title: `Hotels, agencies & tour operators`,
              paras: [
                `We also partner with hotels, B&amp;Bs, agriturismi, tour operators and travel planners — partner rates, priority booking, fixed time slots and fast confirmation. If you’re building Florence itineraries for guests or clients, <a href="/#business">see how we work with businesses</a> or email us directly.`,
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
            { q: `How big can the group be?`, a: `The private kitchen hosts teams of 6 to 14 people. For larger companies we can discuss running consecutive sessions — email us with your numbers.` },
            { q: `Is the class run in English?`, a: `Yes — both chefs host in English (or Italian, if your team prefers). Instructions are hands-on and visual, so mixed-language teams work fine too.` },
            { q: `Can you handle dietary requirements?`, a: `Yes. Gluten-free stations at no extra charge, and other allergies and preferences handled in advance — send us the list when you book and every team member cooks and eats.` },
            { q: `How does pricing work?`, a: `Team sessions are quoted per group, based on size, timing and add-ons like wine pairing. Email ciao@handmadepastaflorence.com and you’ll have a quote within one working day.` },
          ],
          related: [
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `The same private kitchen for personal celebrations — from €680.` },
            { title: `The Chef’s Table`, href: `/pasta-making-class-florence/`, desc: `Our signature small-group class, if your team is 8 or fewer — €95 each.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Remote team? Cook together from anywhere, live — from €68.` },
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
        title: `Teambuilding in Cucina a Firenze — Corso di Pasta Privato per Team, 6–14 Persone | Handmade Pasta Florence`,
        description: `Un teambuilding in cucina privato e pratico a Firenze. Il tuo team stende la pasta fresca con due chef toscani, per poi condividere il pranzo preparato. Cucina privata per 6–14 persone, abbinamento vini e opzioni dietetiche.`,
        cl: {
          eyebrow: `Per le aziende · uso esclusivo della cucina`,
          heading: `Team building, con`,
          headingItal: `le mani in pasta.`,
          lede: `Grembiuli indossati, laptop riposti. Il tuo team prende possesso della nostra cucina in Oltrarno con due chef toscani, stende e piega la pasta fresca fianco a fianco, e poi si siede per un lungo pranzo preparato con le proprie mani. A cinque minuti da Ponte Vecchio.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Un gruppo cucina insieme a un corso di pasta privato per team building a Firenze`, w: 1050, h: 1400 },
          price: `Evento Privato`,
          priceNote: `6–14 persone · preventivo per gruppo`,
          facts: [
            { label: `Dimensione gruppo`, value: `6–14 persone` },
            { label: `Formato`, value: `uso esclusivo della cucina` },
            { label: `Host`, value: `chef professionisti` },
            { label: `Opzioni`, value: `abbinamento vini · dietetiche` },
            { label: `Dove`, value: `5 min da Ponte Vecchio` },
            { label: `Tempo di risposta`, value: `entro 24 ore` },
          ],
          sections: [
            {
              title: `Perché il teambuilding in cucina funziona`,
              paras: [
                `La pasta fresca è la rara attività di squadra in cui nessuno può nascondersi dietro uno schermo e nessuno ha bisogno di abilità pregresse. Tutti iniziano con lo stesso mucchio di farina, i primi pici di tutti sono storti e un'ora dopo il tavolo è coperto di qualcosa che il team ha effettivamente realizzato insieme. Poi lo si mangia — il che è meglio di un meeting riassuntivo.`,
                `La cucina è esclusivamente tua: niente estranei, il tuo ritmo, le tue esigenze alimentari gestite in anticipo.`,
              ],
            },
            {
              title: `Come si svolge la sessione`,
              paras: [
                `Il formato segue il nostro corso classico — pratico dal primo minuto, due head chef che ospitano, e un pranzo seduti con ciò che il team ha preparato, con vino locale se lo desideri. Essendo una prenotazione privata, l'orario è flessibile attorno alla tua agenda; la maggior parte dei team sceglie il corso al posto di un pranzo o come conclusione serale di un meeting aziendale.`,
              ],
            },
            {
              title: `Hotel, agenzie & tour operator`,
              paras: [
                `Collaboriamo anche con hotel, B&amp;B, agriturismi, tour operator e organizzatori di viaggi — tariffe partner, prenotazione prioritaria, fasce orarie fisse e conferma rapida. Se stai creando itinerari a Firenze per ospiti o clienti, <a href="/it/#business">scopri come lavoriamo con le aziende</a> o inviaci un'e-mail direttamente.`,
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
            { q: `Quanto può essere grande il gruppo?`, a: `La cucina privata ospita team da 6 a 14 persone. Per aziende più grandi possiamo discutere di sessioni consecutive — inviaci un'e-mail con i vostri numeri.` },
            { q: `Il corso si tiene in Inglese o Italiano?`, a: `Entrambi — gli chef possono tenere il corso in Inglese o Italiano, a seconda delle preferenze del vostro team. Le istruzioni sono pratiche e visive, quindi anche team misti o internazionali si trovano bene.` },
            { q: `Potete gestire le esigenze alimentari?`, a: `Sì. Postazioni senza glutine senza costi aggiuntivi, e altre allergie e preferenze gestite in anticipo — inviaci l'elenco quando prenoti e ogni membro del team cucinerà e mangerà.` },
            { q: `Come funzionano i prezzi?`, a: `Le sessioni per i team sono quotate per gruppo, in base alle dimensioni, ai tempi e ad eventuali aggiunte come l'abbinamento dei vini. Invia un'e-mail a ciao@handmadepastaflorence.com e riceverai un preventivo entro un giorno lavorativo.` },
          ],
          related: [
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `La stessa cucina privata per celebrazioni personali — da €680.` },
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro classico corso per piccoli gruppi, se il team è di 8 o meno — €95 ciascuno.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Team da remoto? Cucinate insieme da ovunque, in diretta — da €68.` },
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
        title: `Teambuilding Culinaire à Florence — Cours de Pâtes Privé, 6–14 Personnes | Handmade Pasta Florence`,
        description: `Une activité de teambuilding culinaire pratique à Florence : votre équipe prépare des pâtes fraîches avec deux chefs toscans, puis partage le déjeuner qu'elle a préparé. Privatisation de la cuisine pour 6–14 personnes, accords mets-vins et options diététiques.`,
        cl: {
          eyebrow: `Pour les entreprises · privatisation de la cuisine`,
          heading: `Team building, avec`,
          headingItal: `les mains dans la farine.`,
          lede: `Tabliers enfilés, ordinateurs rangés. Votre équipe prend le contrôle de notre cuisine de l'Oltrarno avec deux chefs toscans, étale et plie des pâtes fraîches côte à côte, puis s'assoit pour un long déjeuner qu'elle a elle-même préparé. À cinq minutes du Ponte Vecchio.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Un groupe cuisinant ensemble lors d'un cours privé de pâtes pour team building à Florence`, w: 1050, h: 1400 },
          price: `Événement Privé`,
          priceNote: `6–14 personnes · sur devis`,
          facts: [
            { label: `Taille du groupe`, value: `6–14 personnes` },
            { label: `Format`, value: `privatisation de la cuisine` },
            { label: `Hôtes`, value: `chefs professionnels` },
            { label: `Options`, value: `accords mets-vins · régimes` },
            { label: `Lieu`, value: `à 5 min du Ponte Vecchio` },
            { label: `Réponse`, value: `sous un jour ouvré` },
          ],
          sections: [
            {
              title: `Pourquoi les pâtes sont l'activité de teambuilding qui fonctionne`,
              paras: [
                `Les pâtes fraîches sont la rare activité d'équipe où personne ne peut se cacher derrière un écran et où personne n'a besoin de compétences préalables. Tout le monde commence avec le même tas de farine, les premiers pici de tout le monde sont de travers, et une heure plus tard, la table est recouverte de quelque chose que l'équipe a réellement fabriqué ensemble. Ensuite, vous le mangez — ce qui vaut mieux qu'un débriefing.`,
                `La cuisine est exclusivement à vous : pas d'étrangers, votre propre rythme, vos besoins alimentaires gérés à l'avance.`,
              ],
            },
            {
              title: `Comment se déroule la session`,
              paras: [
                `Le format suit notre cours signature — pratique dès la première minute, animé par deux chefs cuisiniers, et un déjeuner assis avec ce que l'équipe a préparé, accompagné de vin local si vous le souhaitez. En tant que réservation privée, les horaires sont flexibles selon votre agenda ; la plupart des équipes choisissent le cours à la place d'un déjeuner ou comme conclusion d'une journée de séminaire.`,
              ],
            },
            {
              title: `Hôtels, agences & voyagistes`,
              paras: [
                `Nous collaborons également avec des hôtels, B&amp;B, agritourismes, voyagistes et organisateurs de voyages — tarifs partenaires, réservation prioritaire, créneaux horaires fixes et confirmation rapide. Si vous créez des itinéraires à Florence pour des invités ou des clients, <a href="/fr/#business">découvrez comment nous travaillons avec les entreprises</a> ou envoyez-nous directement un e-mail.`,
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
            { q: `Quelle taille peut avoir le groupe ?`, a: `La cuisine privée accueille des équipes de 6 à 14 personnes. Pour les entreprises plus grandes, nous pouvons discuter de sessions consécutives — envoyez-nous un e-mail avec vos effectifs.` },
            { q: `Le cours est-il animé en anglais ou en italien ?`, a: `Les deux — les chefs animent en anglais ou en italien, selon la préférence de votre équipe. Les instructions sont visuelles et pratiques, de sorte que les équipes multilingues s'en sortent très bien.` },
            { q: `Pouvez-vous gérer les exigences alimentaires ?`, a: `Oui. Postes de travail sans gluten sans frais supplémentaires, et autres allergies gérées à l'avance — envoyez-nous la liste lors de la réservation et chaque membre de l'équipe cuisinera et mangera.` },
            { q: `Comment fonctionnent les tarifs ?`, a: `Les sessions d'équipe sont chiffrées par groupe, en fonction de la taille, de l'horaire et des options supplémentaires comme l'accord mets-vins. Envoyez un e-mail à ciao@handmadepastaflorence.com et vous aurez un devis sous un jour ouvré.` },
          ],
          related: [
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `La même cuisine privée pour des célébrations personnelles — à partir de 680 €.` },
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours signature en petit groupe, si votre équipe compte 8 personnes ou moins — 95 € chacun.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Équipe à distance ? Cuisinez ensemble d'où vous voulez, en direct — à partir de 68 €.` },
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
        title: `Kulinarisches Teambuilding in Florenz — Privater Pasta-Kurs, 6–14 Personen | Handmade Pasta Florence`,
        description: `Eine praktische Teambuilding-Aktivität in Florenz: Ihr Team rollt frische Pasta mit zwei toskanischen Köchen und teilt dann das zubereitete Mittagessen. Private Küchenmiete für 6–14 Personen, Weinbegleitung und Diätoptionen.`,
        cl: {
          eyebrow: `Für Unternehmen · private Küchenmiete`,
          heading: `Teambuilding, mit`,
          headingItal: `Mehl an den Händen.`,
          lede: `Schürzen an, Laptops weg. Ihr Team übernimmt unsere Küche im Oltrarno mit zwei toskanischen Köchen, rollt und faltet Seite an Seite frische Pasta und setzt sich dann zu einem langen, selbst zubereiteten Mittagessen. Fünf Minuten vom Ponte Vecchio entfernt.`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `Eine Gruppe kocht zusammen bei einem privaten Teambuilding-Pasta-Kurs in Florenz`, w: 1050, h: 1400 },
          price: `Privates Event`,
          priceNote: `6–14 Personen · Angebot pro Gruppe`,
          facts: [
            { label: `Gruppengröße`, value: `6–14 Personen` },
            { label: `Format`, value: `private Küchenmiete` },
            { label: `Gastgeber`, value: `professionelle Köche` },
            { label: `Optionen`, value: `Weinbegleitung · Ernährung` },
            { label: `Ort`, value: `5 Min. vom Ponte Vecchio` },
            { label: `Antwortzeit`, value: `innerhalb von 24 Stunden` },
          ],
          sections: [
            {
              title: `Warum Pasta die Teambuilding-Aktivität ist, die funktioniert`,
              paras: [
                `Frische Pasta ist die seltene Teamaktivität, bei der sich niemand hinter einem Bildschirm verstecken kann und niemand Vorkenntnisse benötigt. Jeder beginnt mit dem gleichen Haufen Mehl, die ersten Pici von jedem sind krumm, und eine Stunde später ist der Tisch bedeckt mit etwas, das das Team tatsächlich zusammen hergestellt hat. Dann essen Sie es — das ist besser als ein Debriefing.`,
                `Die Küche gehört exklusiv Ihnen: keine Fremden, Ihr eigenes Tempo, Ihre Ernährungsbedürfnisse im Voraus geklärt.`,
              ],
            },
            {
              title: `Wie die Sitzung abläuft`,
              paras: [
                `Das Format folgt unserem Signature-Kurs — praktisch von der ersten Minute an, von zwei Küchenchefs geleitet, und ein gemeinsames Mittagessen mit dem, was das Team gemacht hat, mit Wein aus der Region, wenn Sie möchten. Als private Buchung ist das Timing flexibel um Ihre Agenda herum; die meisten Teams buchen den Kurs anstelle eines Mittagessens oder als abendlichen Ausklang eines Offsites.`,
              ],
            },
            {
              title: `Hotels, Agenturen & Reiseveranstalter`,
              paras: [
                `Wir arbeiten auch mit Hotels, B&amp;Bs, Agriturismi, Reiseveranstaltern und Reiseplanern zusammen — Partnertarife, bevorzugte Buchung, feste Zeitfenster und schnelle Bestätigung. Wenn Sie Florenz-Reiserouten für Gäste oder Kunden zusammenstellen, <a href="/de/#business">sehen Sie, wie wir mit Unternehmen arbeiten</a> oder senden Sie uns direkt eine E-Mail.`,
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
            { q: `Wie groß kann die Gruppe sein?`, a: `Die private Küche bietet Platz für Teams von 6 bis 14 Personen. Für größere Unternehmen können wir aufeinanderfolgende Sitzungen besprechen — senden Sie uns eine E-Mail mit Ihren Zahlen.` },
            { q: `Wird der Kurs auf Englisch oder Italienisch durchgeführt?`, a: `Beides — die Köche unterrichten auf Englisch oder Italienisch, je nach Vorliebe Ihres Teams. Die Anweisungen sind praktisch und visuell, sodass auch gemischtsprachige Teams gut zurechtkommen.` },
            { q: `Können Sie auf Ernährungsbedürfnisse eingehen?`, a: `Ja. Glutenfreie Stationen ohne Aufpreis und andere Allergien und Vorlieben werden im Voraus bearbeitet — senden Sie uns bei der Buchung die Liste, und jedes Teammitglied wird kochen und essen.` },
            { q: `Wie funktioniert die Preisgestaltung?`, a: `Team-Sitzungen werden pro Gruppe kalkuliert, basierend auf Größe, Timing und Extras wie Weinbegleitung. Senden Sie eine E-Mail an ciao@handmadepastaflorence.com und Sie erhalten innerhalb eines Arbeitstages ein Angebot.` },
          ],
          related: [
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Die gleiche private Küche für persönliche Feiern — ab 680 €.` },
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser Signature-Kurs für kleine Gruppen, wenn Ihr Team aus 8 oder weniger besteht — 95 € pro Person.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Remote-Team? Kochen Sie gemeinsam von überall aus, live — ab 68 €.` },
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
        title: `佛罗伦萨美食团队建设 — 私人意面课程，6–14人 | Handmade Pasta Florence`,
        description: `在佛罗伦萨进行的动手实践美食团建活动：您的团队与两位托斯卡纳厨师一起擀制新鲜意面，然后共享他们制作的午餐。6–14人的私人厨房包场，可选择葡萄酒搭配和特殊饮食选项。`,
        cl: {
          eyebrow: `企业专享 · 私人厨房包场`,
          heading: `团队建设，让`,
          headingItal: `双手沾满面粉。`,
          lede: `穿上围裙，收起电脑。您的团队将与两位托斯卡纳厨师一起接管我们奥特拉诺的厨房，并肩擀面和折叠新鲜意面，然后坐下来享用团队亲手制作的丰盛午餐。距离老桥仅五分钟路程。`,
          image: { src: `/images/cooking_class_with_guests_in_picture.webp`, alt: `一个团队在佛罗伦萨的私人团建意面课程中一起烹饪`, w: 1050, h: 1400 },
          price: `私人包场`,
          priceNote: `6–14人 · 按团体报价`,
          facts: [
            { label: `团队规模`, value: `6–14人` },
            { label: `形式`, value: `私人厨房包场` },
            { label: `主持人`, value: `专业厨师` },
            { label: `选项`, value: `葡萄酒搭配 · 特殊饮食` },
            { label: `地点`, value: `距老桥5分钟` },
            { label: `回复时间`, value: `一个工作日内` },
          ],
          sections: [
            {
              title: `为什么意面制作是行之有效的团建活动`,
              paras: [
                `新鲜意面是一项罕见的团队活动，在活动中没有人可以躲在屏幕后面，也没有人需要预先具备任何技能。每个人都从同一堆面粉开始，每个人最初做的意面都是歪歪扭扭的，而一小时后，桌面上就摆满了团队真正共同创造的成果。然后大家一起享用它——这比开总结会要好得多。`,
                `厨房完全属于您的团队：没有陌生人打扰，按照您自己的节奏进行，且您的饮食需求会提前安排妥当。`,
              ],
            },
            {
              title: `活动流程`,
              paras: [
                `活动形式沿用我们的招牌课程——从第一分钟开始就动手实践，由两位主厨主持，然后坐下来享用团队亲手制作的午餐（如果需要，还可搭配当地葡萄酒）。作为私人预订，时间安排很灵活，可以配合您的日程；大多数团队选择此课程来代替午餐，或者作为公司外出活动的晚间放松环节。`,
              ],
            },
            {
              title: `酒店、代理商及旅行社`,
              paras: [
                `我们还与酒店、民宿、农庄、旅行社和旅行规划师合作——提供合作伙伴价格、优先预订、固定时段和快速确认。如果您正在为客人或客户制定佛罗伦萨行程，请查看<a href="/zh/#business">我们如何与企业合作</a>，或直接发邮件给我们。`,
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
            { q: `团队规模可以有多大？`, a: `私人厨房可容纳6到14人的团队。对于更大的公司，我们可以讨论连续进行几场活动——请发送邮件告诉我们您的人数。` },
            { q: `课程是用英语还是意大利语进行？`, a: `两者皆可——厨师可根据您团队的偏好使用英语或意大利语。指导是动手实践且直观的，因此混合语言团队也完全没问题。` },
            { q: `你们能处理特殊的饮食需求吗？`, a: `可以。免费提供无麸质操作台，其他过敏和偏好也会提前处理好——在预订时将名单发给我们，每个团队成员都能亲自参与烹饪和享用美食。` },
            { q: `报价是如何计算的？`, a: `团队活动按团体报价，具体取决于人数、时间和附加项目（如葡萄酒搭配）。发送邮件至 ciao@handmadepastaflorence.com，您将在一个工作日内收到报价。` },
          ],
          related: [
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `同一个私人厨房，适合个人庆祝活动 — 680欧元起。` },
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们的招牌小团课程，如果您的团队人数在8人或以下 — 每人95欧元。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `远程团队？无论在哪里，都可以一起进行在线直播烹饪 — 68欧元起。` },
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
};
