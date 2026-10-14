// The "all classes" hub: one page that lists every class landing in
// src/data/landings.ts, grouped. Added 2026-10-14 because the homepage shows
// only the three best sellers and the other eight were reachable from the
// footer alone.
//
// Cards are built from each landing's own locale data (breadcrumbName, price,
// description, image), so a price or name changed in landings.ts changes here
// too. Only the hub's own framing copy lives in this file.
//
// SEO: the hub is deliberately NOT titled "cooking classes in Florence". That
// phrase belongs to the homepage (en homeTitle) and the German "Pasta-Kurs" /
// "Kochkurs" terms belong to /de/pasta-kurs-florenz/ and /de/ (see the Oct 2026
// cannibalisation note in seo/). The hub is a navigation page: "all our classes".
import { defaultLocale, type Locale } from '../i18n/config';
import type { LandingKey } from './landings';

export interface ClassesHubGroup {
  id: string;
  title: string;
  intro: string;
  keys: LandingKey[];
}

export interface ClassesHubLocale {
  slug: string;
  /** Under ~60 characters, no site-name suffix (same rule as landings.ts). */
  title: string;
  description: string;
  crumb: string;
  eyebrow: string;
  heading: string;
  headingItal: string;
  lede: string;
  cardCta: string;
  groups: ClassesHubGroup[];
}

// Same grouping in every locale; only the words change.
const FLORENCE: LandingKey[] = ['pasta-making', 'market-tour', 'family', 'for-two', 'gluten-free', 'vegan'];
const PRIVATE: LandingKey[] = ['private', 'team-building', 'agriturismo'];
const MORE: LandingKey[] = ['online', 'gift'];

export const classesHub: Record<Locale, ClassesHubLocale> = {
  en: {
    slug: 'classes',
    title: 'All Our Classes: Pasta, Market, Private & Online',
    description: 'Every class we teach in one place: the €95 pasta class, the Sant’Ambrogio market tour, private, family, gluten-free, vegan, online and gift vouchers.',
    crumb: 'Classes',
    eyebrow: 'All classes · Florence & online',
    heading: 'Every class,',
    headingItal: 'in one place.',
    lede: 'All the ways to cook with us, from the three-hour pasta class at our long table to a private kitchen, a morning at the market and a live class from home. Same two chefs, same rule: your hands in the flour from the first minute.',
    cardCta: 'See the class',
    groups: [
      { id: 'florence', title: 'Small-group classes in our Florence kitchen', intro: 'Never more than eight guests, in the Oltrarno, five minutes from the Ponte Vecchio.', keys: FLORENCE },
      { id: 'private', title: 'Private, groups and the countryside', intro: 'The whole kitchen for you: a celebration, a company team or a day at an agriturismo.', keys: PRIVATE },
      { id: 'more', title: 'From home, or as a present', intro: 'The same class streamed live, or a voucher that lets them choose the date.', keys: MORE },
    ],
  },
  it: {
    slug: 'corsi',
    title: 'Tutti i nostri corsi: pasta, mercato, privati e online',
    description: 'Tutti i corsi in un posto: il corso di pasta da €95, il tour del mercato di Sant’Ambrogio, privati, in famiglia, senza glutine, vegani, online e regalo.',
    crumb: 'Corsi',
    eyebrow: 'Tutti i corsi · Firenze e online',
    heading: 'Ogni corso,',
    headingItal: 'in un posto solo.',
    lede: 'Tutti i modi per cucinare con noi: dal corso di pasta di tre ore alla nostra tavola lunga alla cucina tutta per voi, una mattina al mercato e un corso in diretta da casa. Stessi due chef, stessa regola: mani nella farina dal primo minuto.',
    cardCta: 'Scopri il corso',
    groups: [
      { id: 'florence', title: 'Corsi in piccoli gruppi nella nostra cucina di Firenze', intro: 'Mai più di otto persone, in Oltrarno, a cinque minuti da Ponte Vecchio.', keys: FLORENCE },
      { id: 'private', title: 'Privati, gruppi e campagna', intro: 'Tutta la cucina per voi: una festa, un team aziendale o una giornata in agriturismo.', keys: PRIVATE },
      { id: 'more', title: 'Da casa, o come regalo', intro: 'Lo stesso corso in diretta, o un buono che lascia scegliere la data a chi lo riceve.', keys: MORE },
    ],
  },
  fr: {
    slug: 'cours',
    title: 'Tous nos cours : pâtes, marché, privés et en ligne',
    description: 'Tous nos cours au même endroit : le cours de pâtes à 95 €, la visite du marché Sant’Ambrogio, privés, en famille, sans gluten, vegan, en ligne et à offrir.',
    crumb: 'Cours',
    eyebrow: 'Tous les cours · Florence et en ligne',
    heading: 'Tous nos cours,',
    headingItal: 'au même endroit.',
    lede: 'Toutes les façons de cuisiner avec nous : du cours de pâtes de trois heures à notre grande table à la cuisine rien que pour vous, une matinée au marché et un cours en direct depuis chez vous. Les mêmes deux chefs, la même règle : les mains dans la farine dès la première minute.',
    cardCta: 'Voir le cours',
    groups: [
      { id: 'florence', title: 'Cours en petit groupe dans notre cuisine de Florence', intro: 'Jamais plus de huit personnes, dans l’Oltrarno, à cinq minutes du Ponte Vecchio.', keys: FLORENCE },
      { id: 'private', title: 'Privé, groupes et campagne', intro: 'Toute la cuisine pour vous : une fête, une équipe d’entreprise ou une journée en agritourisme.', keys: PRIVATE },
      { id: 'more', title: 'Depuis chez vous, ou à offrir', intro: 'Le même cours en direct, ou un bon qui leur laisse choisir la date.', keys: MORE },
    ],
  },
  de: {
    slug: 'kurse',
    title: 'Alle unsere Kurse: Pasta, Markt, privat und online',
    description: 'Alle Kurse auf einen Blick: drei Stunden am langen Tisch ab 95 €, die Markttour in Sant’Ambrogio, privat, Familie, glutenfrei, vegan, online, Gutschein.',
    crumb: 'Kurse',
    eyebrow: 'Alle Kurse · Florenz und online',
    heading: 'Jeder Kurs,',
    headingItal: 'auf einen Blick.',
    lede: 'Alle Wege, mit uns zu kochen: von drei Stunden an unserem langen Tisch bis zur Küche ganz für Sie, einem Morgen auf dem Markt und einem Live-Kurs von zu Hause. Dieselben zwei Köche, dieselbe Regel: Hände im Mehl ab der ersten Minute.',
    cardCta: 'Zum Kurs',
    groups: [
      { id: 'florence', title: 'Kleine Gruppen in unserer Küche in Florenz', intro: 'Nie mehr als acht Gäste, im Oltrarno, fünf Minuten vom Ponte Vecchio.', keys: FLORENCE },
      { id: 'private', title: 'Privat, Gruppen und auf dem Land', intro: 'Die ganze Küche für Sie: ein Fest, ein Firmenteam oder ein Tag im Agriturismo.', keys: PRIVATE },
      { id: 'more', title: 'Von zu Hause oder als Geschenk', intro: 'Derselbe Kurs live übertragen, oder ein Gutschein, bei dem die Beschenkten das Datum wählen.', keys: MORE },
    ],
  },
  zh: {
    slug: 'kecheng',
    title: '我们的全部课程：意面、市场、私人与在线',
    description: '所有课程一览：95欧元的意面课、圣安布罗焦市场之旅、私人课程、家庭课、无麸质、纯素、在线课程与礼券。',
    crumb: '课程',
    eyebrow: '全部课程 · 佛罗伦萨与在线',
    heading: '所有课程，',
    headingItal: '一页看全。',
    lede: '和我们一起下厨的所有方式：从长桌旁三小时的意面课，到整个厨房只为你们、一个市场早晨，再到在家参加的直播课。同样的两位主厨，同样的规矩：从第一分钟起双手就沾满面粉。',
    cardCta: '查看课程',
    groups: [
      { id: 'florence', title: '佛罗伦萨厨房里的小班课', intro: '每班最多八人，位于奥特拉诺区，距老桥步行五分钟。', keys: FLORENCE },
      { id: 'private', title: '私人、团体与乡村', intro: '整个厨房只为你们：一场庆祝、一个公司团队，或在农庄度过的一天。', keys: PRIVATE },
      { id: 'more', title: '在家上课，或作为礼物', intro: '同样的课程实时直播，或送一张让对方自选日期的礼券。', keys: MORE },
    ],
  },
};

/** URL of the classes hub in a locale. */
export function classesPath(locale: Locale): string {
  const entry = classesHub[locale] ?? classesHub[defaultLocale];
  return `${locale === defaultLocale ? '' : '/' + locale}/${entry.slug}/`;
}
