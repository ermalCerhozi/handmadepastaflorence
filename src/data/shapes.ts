// The pasta-shapes hub and its spokes — the site's link-magnet layer.
//
// WHY THIS EXISTS: shape queries are the only cluster the domain actually ranks
// for (GSC, Jul 2026: "pasta tipica toscana" / "what pasta is tuscany known for"
// at pos 9–16, while English commercial pages sit at 45–95). This is earned
// relevance, so it is where hub-and-spoke pays: the hub attracts links, the
// spokes rank long-tail, and every one of them funnels into the €95 class.
//
// CANNIBALIZATION GUARD: /blog/tuscan-pasta-shapes-guide/ already ranks for
// "tuscan pasta types/shapes" and is deliberately NOT touched. The hub is a
// shape library (comparison + index), not a second article on the same term.
// Keep it that way: do not retitle the hub toward "tuscan pasta types".
//
// LOCALES: English and Italian only — the two languages where these queries
// have measured demand. Adding fr/de/zh is a data edit here plus four route
// files; until then internal links fall back to the English hub, which is the
// same rollout behaviour as localizedHref() in src/i18n/utils.ts.
import type { Locale } from '../i18n/config';
import * as img from '../assets/images';

export interface ShapeFact {
  label: string;
  value: string;
}

export interface ShapeSection {
  title: string;
  paras: string[];
}

export interface ShapeSpoke {
  /** URL segment under the hub — the Italian name, identical in every locale. */
  slug: string;
  name: string;
  /**
   * Keyword line rendered inside the <h1> beneath the shape name. The name on
   * its own ("Pici") is too thin to match "what is pici pasta"; this carries the
   * noun without turning the heading into a keyword string.
   */
  h1Sub: string;
  /** One-line summary, used on the hub card and as the meta description seed. */
  tagline: string;
  title: string;
  description: string;
  image: { src: ImageMetadata; alt: string; w: number; h: number };
  /** Direct answer, first paragraph — the featured-snippet target. */
  answer: string;
  facts: ShapeFact[];
  sections: ShapeSection[];
  faqs: { q: string; a: string }[];
  /** Shown in the hub's comparison table. */
  compare: { dough: string; cut: string; sauce: string };
}

export interface ShapesLocale {
  hubSlug: string;
  hubTitle: string;
  hubDescription: string;
  hubEyebrow: string;
  hubHeading: string;
  hubHeadingItal: string;
  hubLede: string;
  /** Answer-box paragraph + list directly under the H1. */
  hubAnswer: string;
  hubAnswerList: string[];
  hubFaqs: { q: string; a: string }[];
  /** Chrome labels for the hub and spoke templates. */
  labels: {
    home: string;
    hubCrumb: string;
    tableHeading: string;
    colShape: string;
    colDough: string;
    colCut: string;
    colSauce: string;
    readMore: string;
    backToHub: string;
    faqHeading: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
    ctaLink: string;
    guideHeading: string;
    guideBody: string;
    guideLink: string;
  };
  /** Where the "learn to make it" CTA points, for this locale. */
  classHref: string;
  guideHref: string;
  spokes: ShapeSpoke[];
}

const en: ShapesLocale = {
  hubSlug: 'pasta-shapes',
  hubTitle: 'Pasta Shapes: Pici, Pappardelle, Tagliatelle & Tortelli Explained | Handmade Pasta Florence',
  hubDescription:
    'A working chef\'s library of the four fresh pasta shapes we teach in Florence — what each one is, how it is rolled by hand, and the sauce it was built to carry. With a side-by-side comparison.',
  hubEyebrow: 'The shape library',
  hubHeading: 'Four shapes,',
  hubHeadingItal: 'four different sauces.',
  hubLede:
    'A shape is not decoration. Every one of these was invented to hold a particular kind of sauce, and swapping them is why a dish sometimes tastes thin for no obvious reason. Here is what each one is, and what it is for.',
  hubAnswer:
    'The four fresh pasta shapes we roll by hand in our Florence kitchen are pici, pappardelle, tagliatelle and tortelli. In short:',
  hubAnswerList: [
    '<strong>Pici</strong> — thick hand-rolled strands of flour and water, no egg. Siena\'s pasta, built for garlicky aglione and wild boar ragù.',
    '<strong>Pappardelle</strong> — the widest ribbon, 2–3 cm of egg dough. Made to carry heavy game sauces: boar, hare, duck.',
    '<strong>Tagliatelle</strong> — a narrow egg ribbon, 6–8 mm. The everyday ribbon for meat ragù and mushrooms.',
    '<strong>Tortelli</strong> — filled parcels, in Tuscany most often with potato or ricotta and spinach. Dressed simply, with butter and sage or a little ragù.',
  ],
  hubFaqs: [
    {
      q: 'Why does pasta shape matter?',
      a: 'Shape decides how much sauce clings and how the pasta feels when you bite it. A thick, rough, porous strand like pici grips a chunky sauce that would slide straight off a smooth ribbon; a wide pappardelle gives a heavy game ragù something to sit on. Matching them is most of the difference between a good plate and a dull one.',
    },
    {
      q: 'What is the difference between pappardelle and tagliatelle?',
      a: 'Width, and therefore purpose. Pappardelle is cut 2–3 cm wide and is built for heavy, chunky game sauces like wild boar or hare. Tagliatelle is cut 6–8 mm and suits finer meat ragù and mushrooms. Same egg dough, different job.',
    },
    {
      q: 'Which Tuscan pasta shape is easiest to make by hand?',
      a: 'Pici, because there is no rolling pin and no machine involved — you cut a strip of dough and roll it under your palms. It is also the most forgiving: pici are meant to be uneven, and the wonky ones hold sauce better.',
    },
    {
      q: 'Do you need eggs to make fresh pasta?',
      a: 'No. Pici are made with just flour, water and a little olive oil — a poor kitchen\'s pasta from central Tuscany. Ribbons like tagliatelle and pappardelle, and filled shapes like tortelli, use an egg dough for the elasticity and richness they need.',
    },
  ],
  labels: {
    home: 'Home',
    hubCrumb: 'Pasta Shapes',
    tableHeading: 'Side by side',
    colShape: 'Shape',
    colDough: 'Dough',
    colCut: 'Cut',
    colSauce: 'Built for',
    readMore: 'Read the shape',
    backToHub: 'All pasta shapes',
    faqHeading: 'Questions, answered.',
    ctaHeading: 'Roll it yourself.',
    ctaBody:
      'We teach all four of these shapes in a three-hour class in our Oltrarno kitchen — hands in the flour from the first minute, then everyone sits down to eat what they made. Max 8 guests, €95.',
    ctaButton: 'Book a pasta class',
    ctaLink: 'See the class',
    guideHeading: 'Going deeper',
    guideBody: 'Our full guide to Tuscany\'s fresh pasta traditions — where each shape comes from and why the region cooks the way it does.',
    guideLink: 'Read the Tuscan pasta guide',
  },
  classHref: '/pasta-making-class-florence/',
  guideHref: '/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'Tuscany\'s hand-rolled pasta, explained.',
      tagline: 'Siena\'s thick hand-rolled strand — flour, water, no egg.',
      title: 'What Is Pici Pasta? Siena\'s Hand-Rolled Strand, Explained by a Chef | Handmade Pasta Florence',
      description:
        'Pici is a thick, hand-rolled Tuscan pasta made from flour and water with no egg. A Florence pasta chef on where it comes from, how to roll it, and the four sauces it belongs with.',
      image: {
        src: img.shapePici,
        alt: 'Thick hand-rolled pici pasta strands dusted with flour on a wooden board',
        w: 1000,
        h: 625,
      },
      answer:
        'Pici is a thick, hand-rolled pasta from southern Tuscany, made from nothing but flour, water and a little olive oil — no egg. Each strand is rolled out under the palms rather than cut with a knife or machine, which is why no two are the same thickness and why the surface stays rough enough to grip a heavy sauce.',
      facts: [
        { label: 'From', value: 'Siena & the Val d\'Orcia' },
        { label: 'Dough', value: 'flour, water, olive oil — no egg' },
        { label: 'Made by', value: 'rolling under the palms' },
        { label: 'Thickness', value: 'about 3 mm, deliberately uneven' },
        { label: 'Classic sauces', value: 'aglione, cinghiale, cacio e pepe, briciole' },
        { label: 'Difficulty', value: 'the most forgiving shape to learn' },
      ],
      sections: [
        {
          title: 'Where pici come from',
          paras: [
            'Pici belong to the hills south of Siena — the Val d\'Orcia, Montalcino, Montepulciano — and they are old. There is a fresco in an Etruscan tomb at Tarquinia that appears to show something very like them, which locals will tell you about at length and with confidence.',
            'What is certain is that pici are poor food. No egg, because eggs were worth money and went to market. Just the cheapest flour, water from the tap, and the one thing every farmhouse had: time, and a pair of hands. That is the whole recipe, and it is why the shape survived — you can make it with nothing.',
          ],
        },
        {
          title: 'How they are rolled',
          paras: [
            'You roll out a slab of dough about a centimetre thick, cut it into strips, and then work each strip under your flat palms from the middle outwards until it stretches into a long, thick strand. The verb is <em>appiciare</em>, and it is where the name comes from.',
            'The mistake everyone makes at first is pressing too hard, which flattens the strand into a ribbon instead of rounding it. The second mistake is chasing perfection. Pici are supposed to be uneven — the fat bits and thin bits are the character of the dish, and a rough, slightly irregular surface holds sauce far better than a smooth extruded one ever will.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'Four sauces earn the name. <strong>Aglione</strong> — a slow tomato and garlic sauce built on the enormous, mild Tuscan aglione garlic — is the definitive one; ask for <em>pici all\'aglione</em> anywhere south of Siena. <strong>Ragù di cinghiale</strong>, wild boar, is the autumn version and the reason pici are thick enough to stand up to it.',
            '<strong>Cacio e pepe</strong> works beautifully because the rough surface grabs the cheese, and <strong>pici alle briciole</strong> — toasted breadcrumbs, garlic, oil — is the oldest and poorest of them, and quietly one of the best things in Tuscan cooking. What you will not find on real pici is cream.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is pici pasta made of?',
          a: 'Flour, water and usually a little olive oil. No egg — that is the defining feature and the reason it was affordable for farming families in southern Tuscany.',
        },
        {
          q: 'Is pici the same as thick spaghetti?',
          a: 'No. Spaghetti is extruded through a die and comes out perfectly round, uniform and smooth. Pici are rolled by hand, so they are uneven along their length and slightly rough on the surface, which changes how much sauce clings to them.',
        },
        {
          q: 'What sauce goes with pici?',
          a: 'Traditionally four: aglione (tomato and sweet Tuscan garlic), wild boar ragù, cacio e pepe, and briciole — toasted breadcrumbs with garlic and oil. All four are chosen because they cling to a thick, rough strand.',
        },
        {
          q: 'Are pici hard to make at home?',
          a: 'They are the easiest fresh pasta to start with, because you need no machine and no rolling pin — just your hands and a board. They are slow rather than difficult: rolling enough pici for four people takes a while, which is exactly why it was a job for the whole family.',
        },
      ],
      compare: { dough: 'Flour & water, no egg', cut: 'Rolled by hand, ~3 mm', sauce: 'Aglione, wild boar, cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: 'Tuscany\'s widest pasta ribbon, explained.',
      tagline: 'The widest ribbon — built to carry wild boar and hare.',
      title: 'What Are Pappardelle? Tuscany\'s Widest Ribbon, Explained by a Chef | Handmade Pasta Florence',
      description:
        'Pappardelle are wide egg-dough ribbons, 2–3 cm across, made for heavy game sauces like wild boar and hare. A Florence pasta chef on the cut, the dough and the classic pairings.',
      image: {
        src: img.shapePappardelle,
        alt: 'Wide pappardelle ribbons of fresh egg pasta on a floured wooden board',
        w: 1000,
        h: 625,
      },
      answer:
        'Pappardelle are the widest fresh pasta ribbon in the Tuscan repertoire — flat strips of egg dough cut 2 to 3 centimetres across. The width is not showing off: it exists so that a heavy, chunky game sauce has something broad enough to sit on instead of sliding off.',
      facts: [
        { label: 'From', value: 'Tuscany' },
        { label: 'Dough', value: 'egg dough — flour and egg' },
        { label: 'Width', value: '2–3 cm' },
        { label: 'Name from', value: 'pappare, to gobble' },
        { label: 'Classic sauces', value: 'cinghiale, lepre, anatra, porcini' },
        { label: 'Difficulty', value: 'easiest ribbon — the widest cut is the most forgiving' },
      ],
      sections: [
        {
          title: 'A name that tells you how to eat it',
          paras: [
            'The word comes from <em>pappare</em>, a blunt Tuscan verb meaning to gobble or to scoff. It is not a delicate name and it is not a delicate pasta. Pappardelle are what you serve when the sauce has been on the stove since morning and everybody is hungry.',
            'They are the ribbon of the Tuscan hills specifically — where tagliatelle belongs to Emilia and Bologna, pappardelle is what comes out of a Tuscan kitchen in autumn, when the hunting season starts and there is game to be dealt with.',
          ],
        },
        {
          title: 'How they are cut',
          paras: [
            'The dough is a standard fresh egg dough, rolled out thin — thin enough to see the shadow of your hand through it, but no thinner, because a wide ribbon has to hold weight. Then you flour the sheet, roll it loosely, and cut across the roll with a knife at two to three centimetres.',
            'Because the cut is so wide, pappardelle are the most forgiving ribbon to learn: a wobbly line matters far less at 3 cm than it does at 6 mm. They also cook fast — two or three minutes in well-salted water — and they must go straight into the pan with the sauce, never into a bowl to wait.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            '<strong>Ragù di cinghiale</strong> — wild boar, slow-cooked with red wine, juniper and tomato — is the pairing that made this shape famous, and it remains the correct answer. <strong>Lepre</strong>, hare, is the older and richer version, and the one an old Tuscan cook would choose if they could get it.',
            'Beyond game, pappardelle take beautifully to <strong>duck ragù</strong> and to <strong>porcini</strong> in the few weeks of the year the mushrooms are worth having. The rule is simple: if the sauce is heavy, chunky and has been cooking for hours, this is the shape it wants.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the difference between pappardelle and tagliatelle?',
          a: 'Width and origin. Pappardelle is cut 2–3 cm wide and is Tuscan, made for heavy game sauces like wild boar and hare. Tagliatelle is cut 6–8 mm and belongs to Emilia-Romagna, suiting finer meat ragù and mushrooms. The dough is the same in both cases.',
        },
        {
          q: 'What sauce is traditional with pappardelle?',
          a: 'Wild boar ragù (ragù di cinghiale) is the classic Tuscan pairing, with hare (lepre) as the older and richer alternative. Duck ragù and fresh porcini are the other two you will see on a good menu in Florence.',
        },
        {
          q: 'Are pappardelle made with egg?',
          a: 'Yes. Pappardelle are an egg-dough pasta — flour and whole eggs — which gives the wide ribbon the elasticity and strength it needs to carry a heavy sauce without tearing.',
        },
        {
          q: 'How long do fresh pappardelle take to cook?',
          a: 'Two to three minutes in plenty of well-salted boiling water, and then straight into the pan with the sauce to finish. Fresh pasta cooks far faster than dried, and pappardelle are usually the first thing on the plate.',
        },
      ],
      compare: { dough: 'Egg dough', cut: 'Flat ribbon, 2–3 cm', sauce: 'Wild boar, hare, duck, porcini' },
    },
    {
      slug: 'tagliatelle',
      name: 'Tagliatelle',
      h1Sub: 'The everyday egg pasta ribbon, explained.',
      tagline: 'The everyday egg ribbon, 6–8 mm — ragù\'s natural partner.',
      title: 'What Are Tagliatelle? The Egg Ribbon, Explained by a Chef | Handmade Pasta Florence',
      description:
        'Tagliatelle are fresh egg-dough ribbons cut 6–8 mm wide, the natural partner for a meat ragù. A Florence pasta chef on the cut, how it differs from fettuccine and pappardelle, and how to serve it.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nests of fresh tagliatelle ribbons resting on a floured board',
        w: 1000,
        h: 625,
      },
      answer:
        'Tagliatelle are flat ribbons of fresh egg pasta, cut roughly 6 to 8 millimetres wide. They are the everyday ribbon of northern and central Italy — narrow enough to twist onto a fork, broad enough to carry a proper meat ragù, which is why they are the shape most people picture when they think of fresh pasta.',
      facts: [
        { label: 'From', value: 'Emilia-Romagna, made across Tuscany' },
        { label: 'Dough', value: 'egg dough — flour and egg' },
        { label: 'Width', value: '6–8 mm' },
        { label: 'Name from', value: 'tagliare, to cut' },
        { label: 'Classic sauces', value: 'ragù, funghi, butter and herbs' },
        { label: 'Difficulty', value: 'the cut that teaches you knife control' },
      ],
      sections: [
        {
          title: 'The ribbon everything else is measured against',
          paras: [
            'Tagliatelle come from Bologna, where the width is taken seriously enough that the local chamber of commerce once lodged a gold reference strip to settle arguments about it. Eight millimetres cooked is the Bolognese standard. Nobody in a Tuscan kitchen measures, but the target is the same.',
            'Tuscany cooks them constantly regardless of where they were born, because they are the useful ribbon: wide enough for a substantial sauce, narrow enough to eat without a fight, and quick enough to be a Tuesday dinner rather than an occasion.',
          ],
        },
        {
          title: 'How they are cut',
          paras: [
            'Roll the egg dough into a thin sheet, let it dry for a few minutes until it is leathery rather than tacky — this is the step people skip, and it is why their ribbons stick together — then flour it generously, roll it into a loose flat log and cut across with a sharp knife.',
            'Then lift each cut immediately and shake it loose. Left in the roll, ribbons weld into a brick within minutes. Toss them in a little semolina and coil them into loose nests until the water boils. Tagliatelle are the shape that teaches you knife control, because at 6 mm a wandering cut is obvious in a way it never is on pappardelle.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'A proper <strong>ragù</strong> — slow-cooked minced beef and pork with soffritto, wine and a very little tomato — is the pairing, and in Bologna it is the only one anybody will admit to. Note what it is not served with: spaghetti. That is a foreign invention and it will be pointed out to you.',
            'Beyond ragù, tagliatelle are superb with <strong>mushrooms</strong>, with butter and sage when you want something quiet, and with a simple <strong>tomato and basil</strong> when the tomatoes are actually good. The ribbon is narrow enough that a light sauce still coats it properly.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the difference between tagliatelle and fettuccine?',
          a: 'Region and dimensions. Tagliatelle come from Emilia-Romagna and are cut around 6–8 mm wide and very thin. Fettuccine are Roman, cut slightly narrower but noticeably thicker. In practice they are close cousins and are often used interchangeably outside Italy.',
        },
        {
          q: 'What sauce goes with tagliatelle?',
          a: 'A slow-cooked meat ragù is the classic and, in Bologna, effectively the only accepted answer. Mushrooms, butter and sage, or a good tomato and basil all work well too — the ribbon is narrow enough that lighter sauces still coat it.',
        },
        {
          q: 'Why do my tagliatelle stick together?',
          a: 'Almost always because the sheet was still tacky when it was cut, or the ribbons were left rolled up after cutting. Let the sheet dry to a leathery feel first, flour it well, and shake each cut loose the moment it comes off the knife.',
        },
        {
          q: 'How thin should the dough be?',
          a: 'Thin enough to see the shape of your hand through it, but not so thin it tears when you lift it. For ribbons that is thinner than you would roll for filled shapes, because there is no filling to protect.',
        },
      ],
      compare: { dough: 'Egg dough', cut: 'Flat ribbon, 6–8 mm', sauce: 'Meat ragù, mushrooms, butter' },
    },
    {
      slug: 'tortelli',
      name: 'Tortelli',
      h1Sub: 'Tuscany\'s filled pasta, explained.',
      tagline: 'The filled parcel — in Tuscany, most often potato.',
      title: 'What Are Tortelli? Tuscany\'s Filled Pasta, Explained by a Chef | Handmade Pasta Florence',
      description:
        'Tortelli are filled fresh pasta parcels. In Tuscany the classic filling is potato, from the Mugello — a Florence pasta chef on the fillings, the folding, and why the sauce should stay simple.',
      image: {
        src: img.shapeTortelli,
        alt: 'Hand-folded tortelli filled parcels arranged on a floured surface',
        w: 1000,
        h: 625,
      },
      answer:
        'Tortelli are filled parcels of fresh egg pasta — a sheet of dough, a spoonful of filling, a second sheet pressed down and sealed around it. Tuscany\'s signature version is <em>tortelli di patate</em>, filled with seasoned potato rather than the ricotta and spinach most visitors expect, and it comes from the Mugello valley north of Florence.',
      facts: [
        { label: 'From', value: 'the Mugello, north of Florence' },
        { label: 'Dough', value: 'egg dough, rolled slightly thicker' },
        { label: 'Classic filling', value: 'potato; also ricotta & spinach' },
        { label: 'Shape', value: 'square or half-moon, sealed by hand' },
        { label: 'Classic sauces', value: 'butter & sage, meat ragù, mushroom' },
        { label: 'Difficulty', value: 'the shape that needs the most patience' },
      ],
      sections: [
        {
          title: 'Tuscany\'s filling is potato',
          paras: [
            'Ask for tortelli in the Mugello, the hilly country north of Florence, and what arrives is filled with potato — mashed with garlic, parsley, a little tomato and parmesan, seasoned properly and sometimes lifted with nutmeg. It surprises people who expect ricotta, and it is one of the genuinely great regional dishes of Tuscany.',
            'The reason is the same reason as always: potatoes grew well up there and meat did not go far. The other Tuscan version, <em>tortelli maremmani</em>, uses ricotta and spinach and comes from the coastal Maremma. Both are correct; they are simply from different valleys.',
          ],
        },
        {
          title: 'How they are folded',
          paras: [
            'Roll the sheet slightly thicker than you would for ribbons — the dough has to survive being filled, sealed and boiled without splitting. Lay out spoonfuls of filling in a line, leaving proper gaps, then lay the second sheet over and press down <em>around each mound with your fingers</em>, pushing the air out towards the edge before you seal.',
            'Trapped air is what bursts a tortello in the water, and it is the single most common failure. Seal firmly, cut with a wheel, and check every edge. This is the shape that separates people who are enjoying themselves from people who are in a hurry, and it is the one our guests are proudest of at the end of a class.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'Very little, and that is the point. <strong>Butter and sage</strong> — foamed until it just starts to smell nutty, with a few crisped sage leaves — is the classic, and it is hard to improve on. A restrained <strong>meat ragù</strong> is the Mugello Sunday version.',
            'What ruins tortelli is a sauce that competes with the filling. You have spent an hour making something with a flavour on the inside; do not bury it. If in doubt, butter, sage and a grating of parmesan.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the difference between tortelli, tortellini and ravioli?',
          a: 'Size and shape rather than concept — all three are filled pasta. Tortelli are the larger square or half-moon parcels common in Tuscany and Emilia; tortellini are small ring-shaped ones from Bologna; ravioli is the broad general term, usually a smaller square. Regional naming overlaps and locals will disagree with each other happily.',
        },
        {
          q: 'What are Tuscan tortelli filled with?',
          a: 'In the Mugello, north of Florence, the classic filling is seasoned potato with garlic, parsley and parmesan. In the Maremma on the coast, ricotta and spinach. Both are traditional Tuscan fillings from different parts of the region.',
        },
        {
          q: 'Why do my tortelli burst when boiling?',
          a: 'Air trapped inside, almost every time. Press the top sheet down around each mound of filling with your fingers and work the air outwards before sealing the edge. Under-sealed edges and dough rolled too thin are the other two causes.',
        },
        {
          q: 'What sauce should I serve with tortelli?',
          a: 'Something simple that does not fight the filling. Butter and sage with grated parmesan is the classic; a restrained meat ragù is the Sunday version in the Mugello. Heavy or highly seasoned sauces bury the flavour you just spent an hour building.',
        },
      ],
      compare: { dough: 'Egg dough, slightly thicker', cut: 'Filled square or half-moon', sauce: 'Butter & sage, light ragù' },
    },
  ],
};

const it: ShapesLocale = {
  hubSlug: 'formati-di-pasta-toscana',
  hubTitle: 'Formati di Pasta: Pici, Pappardelle, Tagliatelle e Tortelli Spiegati | Handmade Pasta Florence',
  hubDescription:
    'La libreria dei formati di uno chef: i quattro tipi di pasta fresca che insegniamo a Firenze — cos\'è ciascuno, come si tira a mano e il sugo per cui è nato. Con un confronto diretto.',
  hubEyebrow: 'La libreria dei formati',
  hubHeading: 'Quattro formati,',
  hubHeadingItal: 'quattro sughi diversi.',
  hubLede:
    'Un formato non è decorazione. Ognuno di questi è nato per trattenere un tipo preciso di sugo, ed è per questo che a volte un piatto sembra slavato senza un motivo evidente. Ecco cos\'è ciascuno e a cosa serve.',
  hubAnswer:
    'I quattro formati di pasta fresca che tiriamo a mano nella nostra cucina di Firenze sono pici, pappardelle, tagliatelle e tortelli. In breve:',
  hubAnswerList: [
    '<strong>Pici</strong> — grossi spaghettoni tirati a mano di acqua e farina, senza uovo. La pasta di Siena, nata per l\'aglione e il ragù di cinghiale.',
    '<strong>Pappardelle</strong> — il nastro più largo, 2–3 cm di sfoglia all\'uovo. Fatte per reggere i sughi di selvaggina: cinghiale, lepre, anatra.',
    '<strong>Tagliatelle</strong> — nastro stretto all\'uovo, 6–8 mm. Il nastro di tutti i giorni per il ragù di carne e i funghi.',
    '<strong>Tortelli</strong> — pasta ripiena, in Toscana più spesso di patate o di ricotta e spinaci. Si condiscono con poco: burro e salvia o un ragù leggero.',
  ],
  hubFaqs: [
    {
      q: 'Perché il formato della pasta è importante?',
      a: 'Il formato decide quanto sugo si attacca e come la pasta si sente sotto i denti. Uno spaghettone spesso e ruvido come il pico trattiene un sugo corposo che scivolerebbe via da un nastro liscio; una pappardella larga dà a un ragù di selvaggina qualcosa su cui appoggiarsi. Azzeccare l\'abbinamento è quasi tutta la differenza tra un buon piatto e uno spento.',
    },
    {
      q: 'Qual è la differenza tra pappardelle e tagliatelle?',
      a: 'La larghezza, e quindi lo scopo. Le pappardelle si tagliano a 2–3 cm e sono fatte per i sughi di selvaggina, cinghiale o lepre. Le tagliatelle si tagliano a 6–8 mm e stanno bene con ragù più fini e con i funghi. La sfoglia è la stessa, il mestiere è diverso.',
    },
    {
      q: 'Qual è il formato toscano più facile da fare a mano?',
      a: 'I pici, perché non serve né mattarello né macchina: si taglia una striscia di impasto e la si rotola sotto i palmi. È anche il più indulgente, perché i pici devono essere irregolari e quelli storti trattengono meglio il sugo.',
    },
    {
      q: 'Serve l\'uovo per fare la pasta fresca?',
      a: 'No. I pici si fanno solo con farina, acqua e un filo d\'olio — la pasta delle cucine povere della Toscana centrale. I nastri come tagliatelle e pappardelle e le paste ripiene come i tortelli usano invece una sfoglia all\'uovo, per l\'elasticità e la ricchezza che richiedono.',
    },
  ],
  labels: {
    home: 'Home',
    hubCrumb: 'Formati di Pasta',
    tableHeading: 'A confronto',
    colShape: 'Formato',
    colDough: 'Impasto',
    colCut: 'Taglio',
    colSauce: 'Nato per',
    readMore: 'Leggi il formato',
    backToHub: 'Tutti i formati',
    faqHeading: 'Domande, con risposta.',
    ctaHeading: 'Tiralo con le tue mani.',
    ctaBody:
      'Insegniamo tutti e quattro questi formati in un corso di tre ore nella nostra cucina in Oltrarno — le mani in farina dal primo minuto, poi ci si siede tutti a mangiare quello che si è fatto. Max 8 ospiti, €95.',
    ctaButton: 'Prenota un corso',
    ctaLink: 'Vedi il corso',
    guideHeading: 'Per approfondire',
    guideBody: 'La nostra guida completa alle tradizioni della pasta fresca in Toscana — da dove viene ogni formato e perché la regione cucina così.',
    guideLink: 'Leggi la guida alla pasta toscana',
  },
  classHref: '/it/corso-pasta-fresca-firenze/',
  guideHref: '/it/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'La pasta senese tirata a mano, spiegata.',
      tagline: 'Lo spaghettone senese tirato a mano — acqua, farina, niente uovo.',
      title: 'Cosa Sono i Pici? Lo Spaghettone Senese Spiegato da uno Chef | Handmade Pasta Florence',
      description:
        'I pici sono una pasta toscana spessa e tirata a mano, fatta di acqua e farina senza uovo. Uno chef di Firenze racconta da dove vengono, come si appiciano e i quattro sughi a cui appartengono.',
      image: {
        src: img.shapePici,
        alt: 'Pici spessi tirati a mano e infarinati su un tagliere di legno',
        w: 1000,
        h: 625,
      },
      answer:
        'I pici sono una pasta spessa e tirata a mano della Toscana meridionale, fatta solo con farina, acqua e un filo d\'olio d\'oliva — senza uovo. Ogni pico si rotola sotto i palmi invece di essere tagliato con un coltello o una macchina, ed è per questo che non ce ne sono due dello stesso spessore e che la superficie resta abbastanza ruvida da aggrapparsi a un sugo corposo.',
      facts: [
        { label: 'Da', value: 'Siena e la Val d\'Orcia' },
        { label: 'Impasto', value: 'farina, acqua, olio — niente uovo' },
        { label: 'Si fanno', value: 'rotolando sotto i palmi' },
        { label: 'Spessore', value: 'circa 3 mm, volutamente irregolare' },
        { label: 'Sughi classici', value: 'aglione, cinghiale, cacio e pepe, briciole' },
        { label: 'Difficoltà', value: 'il formato più indulgente da imparare' },
      ],
      sections: [
        {
          title: 'Da dove vengono i pici',
          paras: [
            'I pici appartengono alle colline a sud di Siena — la Val d\'Orcia, Montalcino, Montepulciano — e sono antichi. In una tomba etrusca a Tarquinia c\'è un affresco che sembra mostrare qualcosa di molto simile, e i locali ve lo racconteranno a lungo e con grande sicurezza.',
            'Quel che è certo è che i pici sono cibo povero. Niente uovo, perché le uova valevano soldi e andavano al mercato. Solo la farina più economica, l\'acqua del rubinetto e l\'unica cosa che ogni casa colonica aveva: il tempo, e un paio di mani. È tutta qui la ricetta, ed è per questo che il formato è sopravvissuto — si può fare con niente.',
          ],
        },
        {
          title: 'Come si appiciano',
          paras: [
            'Si stende una lastra di impasto spessa circa un centimetro, si taglia a strisce e poi si lavora ogni striscia sotto i palmi aperti, dal centro verso l\'esterno, finché non si allunga in un filo lungo e spesso. Il verbo è <em>appiciare</em>, ed è da lì che viene il nome.',
            'L\'errore che fanno tutti all\'inizio è premere troppo, il che schiaccia il filo in un nastro invece di arrotondarlo. Il secondo errore è rincorrere la perfezione. I pici devono essere irregolari — i punti più grossi e più sottili sono il carattere del piatto, e una superficie ruvida trattiene il sugo molto meglio di una trafilata liscia.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Quattro sughi si meritano il nome. L\'<strong>aglione</strong> — pomodoro e aglione toscano, quell\'aglio enorme e dolce, cotti piano — è il definitivo: da Siena in giù si chiedono i <em>pici all\'aglione</em>. Il <strong>ragù di cinghiale</strong> è la versione d\'autunno, ed è il motivo per cui i pici sono abbastanza spessi da reggerlo.',
            'Il <strong>cacio e pepe</strong> funziona benissimo perché la superficie ruvida afferra il formaggio, e i <strong>pici alle briciole</strong> — pangrattato tostato, aglio, olio — sono i più antichi e i più poveri, e in silenzio una delle cose migliori della cucina toscana. Quello che sui pici veri non troverete è la panna.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Di cosa sono fatti i pici?',
          a: 'Farina, acqua e di solito un filo d\'olio d\'oliva. Niente uovo — è la caratteristica che li definisce, e il motivo per cui erano alla portata delle famiglie contadine della Toscana meridionale.',
        },
        {
          q: 'I pici sono uguali agli spaghetti grossi?',
          a: 'No. Gli spaghetti sono trafilati e vengono fuori perfettamente rotondi, uniformi e lisci. I pici si tirano a mano, quindi sono irregolari lungo tutta la lunghezza e leggermente ruvidi in superficie, il che cambia quanto sugo ci resta attaccato.',
        },
        {
          q: 'Che sugo va con i pici?',
          a: 'Tradizionalmente quattro: aglione (pomodoro e aglione toscano), ragù di cinghiale, cacio e pepe e briciole — pangrattato tostato con aglio e olio. Tutti e quattro scelti perché si aggrappano a un filo spesso e ruvido.',
        },
        {
          q: 'I pici sono difficili da fare in casa?',
          a: 'Sono la pasta fresca più facile con cui iniziare, perché non servono né macchina né mattarello, solo le mani e un tagliere. Sono lunghi più che difficili: fare abbastanza pici per quattro persone richiede tempo, ed è esattamente per questo che era un lavoro per tutta la famiglia.',
        },
      ],
      compare: { dough: 'Acqua e farina, niente uovo', cut: 'Tirati a mano, ~3 mm', sauce: 'Aglione, cinghiale, cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: 'Il nastro di pasta più largo della Toscana, spiegato.',
      tagline: 'Il nastro più largo — nato per cinghiale e lepre.',
      title: 'Cosa Sono le Pappardelle? Il Nastro Toscano Spiegato da uno Chef | Handmade Pasta Florence',
      description:
        'Le pappardelle sono larghi nastri di sfoglia all\'uovo, 2–3 cm, fatti per i sughi di selvaggina come cinghiale e lepre. Uno chef di Firenze racconta il taglio, l\'impasto e gli abbinamenti classici.',
      image: {
        src: img.shapePappardelle,
        alt: 'Larghe pappardelle di pasta fresca all\'uovo su un tagliere infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'Le pappardelle sono il nastro di pasta fresca più largo del repertorio toscano — strisce piatte di sfoglia all\'uovo tagliate da 2 a 3 centimetri. La larghezza non è ostentazione: esiste perché un sugo di selvaggina pesante e corposo abbia una superficie abbastanza ampia su cui posarsi invece di scivolare via.',
      facts: [
        { label: 'Da', value: 'Toscana' },
        { label: 'Impasto', value: 'sfoglia all\'uovo — farina e uova' },
        { label: 'Larghezza', value: '2–3 cm' },
        { label: 'Nome da', value: 'pappare, mangiare avidamente' },
        { label: 'Sughi classici', value: 'cinghiale, lepre, anatra, porcini' },
        { label: 'Difficoltà', value: 'il nastro più facile — il taglio largo perdona' },
      ],
      sections: [
        {
          title: 'Un nome che ti dice come mangiarle',
          paras: [
            'La parola viene da <em>pappare</em>, un verbo toscano schietto che vuol dire mangiare avidamente. Non è un nome delicato e non è una pasta delicata. Le pappardelle si servono quando il sugo è sul fuoco dalla mattina e tutti hanno fame.',
            'Sono il nastro delle colline toscane in senso stretto: dove le tagliatelle appartengono all\'Emilia e a Bologna, le pappardelle sono quello che esce da una cucina toscana in autunno, quando si apre la caccia e c\'è selvaggina da lavorare.',
          ],
        },
        {
          title: 'Come si tagliano',
          paras: [
            'L\'impasto è una normale sfoglia fresca all\'uovo, tirata sottile — abbastanza da vedere l\'ombra della mano attraverso, ma non di più, perché un nastro largo deve reggere il peso. Poi si infarina la sfoglia, si arrotola morbida e si taglia di traverso con un coltello a due o tre centimetri.',
            'Proprio perché il taglio è così largo, le pappardelle sono il nastro più indulgente da imparare: una linea storta si nota molto meno a 3 cm che a 6 mm. Cuociono anche in fretta — due o tre minuti in acqua ben salata — e devono andare dritte in padella con il sugo, mai in una ciotola ad aspettare.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Il <strong>ragù di cinghiale</strong> — cotto piano con vino rosso, ginepro e pomodoro — è l\'abbinamento che ha reso famoso questo formato, e resta la risposta giusta. La <strong>lepre</strong> è la versione più antica e più ricca, quella che sceglierebbe un vecchio cuoco toscano se riuscisse a trovarla.',
            'Oltre alla selvaggina, le pappardelle stanno benissimo con il <strong>ragù d\'anatra</strong> e con i <strong>porcini</strong> nelle poche settimane all\'anno in cui vale la pena averli. La regola è semplice: se il sugo è pesante, corposo e cuoce da ore, questo è il formato che vuole.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Qual è la differenza tra pappardelle e tagliatelle?',
          a: 'Larghezza e origine. Le pappardelle si tagliano a 2–3 cm e sono toscane, fatte per i sughi di selvaggina come cinghiale e lepre. Le tagliatelle si tagliano a 6–8 mm e appartengono all\'Emilia-Romagna, e stanno bene con ragù più fini e con i funghi. La sfoglia in entrambi i casi è la stessa.',
        },
        {
          q: 'Qual è il sugo tradizionale per le pappardelle?',
          a: 'Il ragù di cinghiale è l\'abbinamento classico toscano, con la lepre come alternativa più antica e più ricca. Il ragù d\'anatra e i porcini freschi sono gli altri due che si trovano su un buon menù a Firenze.',
        },
        {
          q: 'Le pappardelle si fanno con l\'uovo?',
          a: 'Sì. Le pappardelle sono una pasta all\'uovo — farina e uova intere — che dà al nastro largo l\'elasticità e la forza necessarie per reggere un sugo pesante senza rompersi.',
        },
        {
          q: 'Quanto cuociono le pappardelle fresche?',
          a: 'Due o tre minuti in abbondante acqua bollente ben salata, e poi dritte in padella con il sugo per mantecare. La pasta fresca cuoce molto più in fretta di quella secca, e le pappardelle sono di solito la prima cosa nel piatto.',
        },
      ],
      compare: { dough: 'Sfoglia all\'uovo', cut: 'Nastro piatto, 2–3 cm', sauce: 'Cinghiale, lepre, anatra, porcini' },
    },
    {
      slug: 'tagliatelle',
      name: 'Tagliatelle',
      h1Sub: 'Il nastro di pasta all\'uovo di tutti i giorni, spiegato.',
      tagline: 'Il nastro all\'uovo di tutti i giorni, 6–8 mm — il compagno del ragù.',
      title: 'Cosa Sono le Tagliatelle? Il Nastro all\'Uovo Spiegato da uno Chef | Handmade Pasta Florence',
      description:
        'Le tagliatelle sono nastri di sfoglia fresca all\'uovo tagliati a 6–8 mm, il compagno naturale di un ragù di carne. Uno chef di Firenze racconta il taglio, la differenza con fettuccine e pappardelle e come servirle.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nidi di tagliatelle fresche appoggiati su un tagliere infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'Le tagliatelle sono nastri piatti di pasta fresca all\'uovo, tagliati a circa 6–8 millimetri. Sono il nastro di tutti i giorni dell\'Italia settentrionale e centrale — abbastanza stretti da avvolgersi sulla forchetta, abbastanza larghi da reggere un vero ragù di carne, ed è per questo che sono il formato che quasi tutti immaginano quando pensano alla pasta fresca.',
      facts: [
        { label: 'Da', value: 'Emilia-Romagna, si fanno in tutta la Toscana' },
        { label: 'Impasto', value: 'sfoglia all\'uovo — farina e uova' },
        { label: 'Larghezza', value: '6–8 mm' },
        { label: 'Nome da', value: 'tagliare' },
        { label: 'Sughi classici', value: 'ragù, funghi, burro ed erbe' },
        { label: 'Difficoltà', value: 'il taglio che insegna a usare il coltello' },
      ],
      sections: [
        {
          title: 'Il nastro con cui si misurano tutti gli altri',
          paras: [
            'Le tagliatelle vengono da Bologna, dove la larghezza è presa abbastanza sul serio che la camera di commercio locale ha depositato una striscia campione in oro per chiudere le discussioni. Otto millimetri da cotte è lo standard bolognese. In una cucina toscana nessuno misura, ma il bersaglio è lo stesso.',
            'La Toscana le fa di continuo a prescindere da dove siano nate, perché sono il nastro utile: abbastanza largo per un sugo sostanzioso, abbastanza stretto da mangiarsi senza combattere, e abbastanza svelto da essere una cena di martedì invece che un\'occasione.',
          ],
        },
        {
          title: 'Come si tagliano',
          paras: [
            'Si tira la sfoglia all\'uovo sottile, la si lascia asciugare qualche minuto finché non diventa coriacea invece che appiccicosa — è il passaggio che tutti saltano, ed è il motivo per cui poi i nastri si attaccano — poi la si infarina bene, si arrotola in un rotolo morbido e si taglia di traverso con un coltello affilato.',
            'Subito dopo si solleva ogni taglio e lo si scuote per aprirlo. Lasciati nel rotolo, i nastri si saldano in un mattone nel giro di pochi minuti. Si infarinano con un po\' di semola e si raccolgono in nidi morbidi finché l\'acqua non bolle. Le tagliatelle sono il formato che insegna a controllare il coltello, perché a 6 mm un taglio che scappa si vede, cosa che sulle pappardelle non succede mai.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Un vero <strong>ragù</strong> — carne di manzo e maiale macinata, cotta piano con il soffritto, il vino e pochissimo pomodoro — è l\'abbinamento, e a Bologna è l\'unico che qualcuno ammetterà. Notate con cosa non si serve: gli spaghetti. Quella è un\'invenzione straniera e ve lo faranno notare.',
            'Oltre al ragù, le tagliatelle sono ottime con i <strong>funghi</strong>, con burro e salvia quando si vuole qualcosa di quieto, e con un semplice <strong>pomodoro e basilico</strong> quando i pomodori sono davvero buoni. Il nastro è abbastanza stretto che anche un sugo leggero le veste bene.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Qual è la differenza tra tagliatelle e fettuccine?',
          a: 'Regione e misure. Le tagliatelle vengono dall\'Emilia-Romagna e si tagliano intorno ai 6–8 mm, molto sottili. Le fettuccine sono romane, tagliate un po\' più strette ma decisamente più spesse. In pratica sono cugine strette e fuori dall\'Italia si usano spesso l\'una per l\'altra.',
        },
        {
          q: 'Che sugo va con le tagliatelle?',
          a: 'Un ragù di carne a lunga cottura è il classico e, a Bologna, di fatto l\'unica risposta accettata. Anche funghi, burro e salvia o un buon pomodoro e basilico funzionano bene — il nastro è abbastanza stretto che anche i sughi più leggeri lo vestono.',
        },
        {
          q: 'Perché le mie tagliatelle si attaccano?',
          a: 'Quasi sempre perché la sfoglia era ancora appiccicosa quando è stata tagliata, o perché i nastri sono rimasti arrotolati dopo il taglio. Lasciate asciugare la sfoglia finché non è coriacea, infarinatela bene e scuotete ogni taglio appena esce dal coltello.',
        },
        {
          q: 'Quanto deve essere sottile la sfoglia?',
          a: 'Abbastanza da vedere la forma della mano attraverso, ma non così sottile da strapparsi quando la si solleva. Per i nastri è più sottile di quanto si tiri per le paste ripiene, perché non c\'è nessun ripieno a proteggerla.',
        },
      ],
      compare: { dough: 'Sfoglia all\'uovo', cut: 'Nastro piatto, 6–8 mm', sauce: 'Ragù di carne, funghi, burro' },
    },
    {
      slug: 'tortelli',
      name: 'Tortelli',
      h1Sub: 'La pasta ripiena della Toscana, spiegata.',
      tagline: 'La pasta ripiena — in Toscana, più spesso di patate.',
      title: 'Cosa Sono i Tortelli? La Pasta Ripiena Toscana Spiegata da uno Chef | Handmade Pasta Florence',
      description:
        'I tortelli sono pasta fresca ripiena. In Toscana il ripieno classico è di patate, dal Mugello — uno chef di Firenze racconta i ripieni, la chiusura e perché il condimento deve restare semplice.',
      image: {
        src: img.shapeTortelli,
        alt: 'Tortelli ripieni chiusi a mano disposti su un piano infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'I tortelli sono fagottini di pasta fresca all\'uovo ripieni — una sfoglia, un cucchiaio di ripieno, una seconda sfoglia premuta e sigillata attorno. La versione simbolo della Toscana è il <em>tortello di patate</em>, ripieno di patate condite invece della ricotta e spinaci che quasi tutti si aspettano, e viene dal Mugello, la valle a nord di Firenze.',
      facts: [
        { label: 'Da', value: 'il Mugello, a nord di Firenze' },
        { label: 'Impasto', value: 'sfoglia all\'uovo, tirata un po\' più spessa' },
        { label: 'Ripieno classico', value: 'patate; anche ricotta e spinaci' },
        { label: 'Forma', value: 'quadrata o a mezzaluna, chiusa a mano' },
        { label: 'Sughi classici', value: 'burro e salvia, ragù, funghi' },
        { label: 'Difficoltà', value: 'il formato che richiede più pazienza' },
      ],
      sections: [
        {
          title: 'In Toscana il ripieno è di patate',
          paras: [
            'Chiedete i tortelli nel Mugello, la campagna collinare a nord di Firenze, e quello che arriva è ripieno di patate — schiacciate con aglio, prezzemolo, un po\' di pomodoro e parmigiano, condite come si deve e a volte alzate con la noce moscata. Sorprende chi si aspetta la ricotta, ed è uno dei grandi piatti regionali della Toscana.',
            'Il motivo è sempre lo stesso: lassù le patate crescevano bene e la carne non bastava. L\'altra versione toscana, i <em>tortelli maremmani</em>, usa ricotta e spinaci e viene dalla Maremma sulla costa. Sono corrette entrambe: vengono semplicemente da valli diverse.',
          ],
        },
        {
          title: 'Come si chiudono',
          paras: [
            'La sfoglia si tira un filo più spessa di quanto si farebbe per i nastri, perché deve sopravvivere al ripieno, alla chiusura e alla bollitura senza aprirsi. Si dispongono i mucchietti di ripieno in fila, lasciando spazi veri, poi si stende sopra la seconda sfoglia e si preme <em>attorno a ogni mucchietto con le dita</em>, spingendo l\'aria verso il bordo prima di sigillare.',
            'L\'aria intrappolata è ciò che fa scoppiare un tortello nell\'acqua, ed è l\'errore più comune in assoluto. Sigillate con decisione, tagliate con la rotella e controllate ogni bordo. È il formato che divide chi si sta divertendo da chi ha fretta, ed è quello di cui i nostri ospiti vanno più fieri alla fine di un corso.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Con pochissimo, ed è proprio il punto. <strong>Burro e salvia</strong> — schiumato finché non comincia a profumare di nocciola, con qualche foglia croccante — è il classico, ed è difficile fare di meglio. Un <strong>ragù di carne</strong> misurato è la versione della domenica in Mugello.',
            'Quello che rovina i tortelli è un condimento che compete con il ripieno. Avete passato un\'ora a fare qualcosa che ha il sapore dentro: non seppellitelo. Nel dubbio, burro, salvia e una grattata di parmigiano.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Qual è la differenza tra tortelli, tortellini e ravioli?',
          a: 'La misura e la forma più che il concetto — tutti e tre sono paste ripiene. I tortelli sono i fagottini più grandi, quadrati o a mezzaluna, comuni in Toscana e in Emilia; i tortellini sono quelli piccoli ad anello di Bologna; ravioli è il termine generale, di solito un quadrato più piccolo. I nomi regionali si sovrappongono e i locali litigano volentieri tra loro.',
        },
        {
          q: 'Con cosa sono ripieni i tortelli toscani?',
          a: 'Nel Mugello, a nord di Firenze, il ripieno classico è di patate condite con aglio, prezzemolo e parmigiano. In Maremma, sulla costa, ricotta e spinaci. Entrambi sono ripieni tradizionali toscani, da zone diverse della regione.',
        },
        {
          q: 'Perché i miei tortelli si aprono in cottura?',
          a: 'Aria rimasta dentro, quasi sempre. Premete la sfoglia superiore attorno a ogni mucchietto di ripieno con le dita e spingete l\'aria verso l\'esterno prima di sigillare il bordo. Bordi chiusi male e sfoglia tirata troppo sottile sono le altre due cause.',
        },
        {
          q: 'Che condimento si usa per i tortelli?',
          a: 'Qualcosa di semplice che non litighi con il ripieno. Burro e salvia con parmigiano grattugiato è il classico; un ragù di carne misurato è la versione della domenica in Mugello. I condimenti pesanti o molto speziati seppelliscono il sapore che avete appena passato un\'ora a costruire.',
        },
      ],
      compare: { dough: 'Sfoglia all\'uovo, più spessa', cut: 'Ripieno quadrato o a mezzaluna', sauce: 'Burro e salvia, ragù leggero' },
    },
  ],
};

export const shapes: Partial<Record<Locale, ShapesLocale>> = { en, it };

/** URL of the hub for a locale — falls back to the English hub where unshipped. */
export function shapesHubPath(locale: Locale): string {
  const entry = shapes[locale];
  if (!entry) return `/${shapes.en!.hubSlug}/`;
  return `${locale === 'en' ? '' : '/' + locale}/${entry.hubSlug}/`;
}

/** URL of one shape page for a locale. */
export function shapePath(locale: Locale, slug: string): string {
  const entry = shapes[locale] ?? shapes.en!;
  const loc = shapes[locale] ? locale : 'en';
  return `${loc === 'en' ? '' : '/' + loc}/${entry.hubSlug}/${slug}/`;
}
