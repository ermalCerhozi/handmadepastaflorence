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
// LOCALES: all five ship the cluster. English and Italian were first (the two
// languages with measured demand), German followed, and French and Chinese were
// added Aug 2026 - not for their own query volume, but because shapesHubPath()
// fell back to the English hub for any locale without an entry, so the header
// and footer of every /fr/ and /zh/ page linked readers out of their language.
// Adding a locale = a data entry here plus two route files under src/pages.
import type { Locale } from '../i18n/config';
import * as img from '../assets/images';

interface ShapeFact {
  label: string;
  value: string;
}

interface ShapeSection {
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

interface ShapesLocale {
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
  // Was 90 chars and Google cut it at "...Tortelli Expl...", losing the suffix
  // and the payload both. Reordered to lead with the filled shapes: the
  // tortelli/ravioli/tortellini phrasings are the cluster with real demand
  // (GSC, 16 Aug 2026 - "tortelli" alone is 19 impressions at position 6.37,
  // against roughly 9 for every pappardelle phrasing combined).
  hubTitle: 'Pasta Shapes: Tortelli, Ravioli, Pappardelle & Pici',
  hubDescription:
    'A working chef\'s library of the five fresh pasta shapes we teach in Florence: what each one is, how it\'s rolled by hand, and the sauce it carries.',
  hubEyebrow: 'The shape library',
  hubHeading: 'Five shapes,',
  hubHeadingItal: 'five different sauces.',
  hubLede:
    'A shape is not decoration. Every one of these was invented to hold a particular kind of sauce, and swapping them is why a dish sometimes tastes thin for no obvious reason. Here is what each one is, and what it is for.',
  hubAnswer:
    'The five fresh pasta shapes we roll by hand in our Florence kitchen are pici, pappardelle, tagliatelle, tortelli and ravioli. In short:',
  hubAnswerList: [
    '<strong>Pici</strong>: thick hand-rolled strands of flour and water, no egg. Siena\'s pasta, built for garlicky aglione and wild boar ragù.',
    '<strong>Pappardelle</strong>: the widest ribbon, 2–3 cm of egg dough. Made to carry heavy game sauces: boar, hare, duck.',
    '<strong>Tagliatelle</strong>: a narrow egg ribbon, 6–8 mm. The everyday ribbon for meat ragù and mushrooms.',
    '<strong>Tortelli</strong>: filled parcels, in Tuscany most often with potato or ricotta and spinach. Dressed simply, with butter and sage or a little ragù.',
    '<strong>Ravioli</strong>: the same idea as tortelli under the name the rest of Italy uses, usually smaller. Flat, sealed between two sheets of dough.',
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
      q: 'What is the difference between ravioli and tortelli?',
      a: 'Mostly size and region. Ravioli is the general Italian word for a flat filled parcel, usually a smaller square. Tortelli is what the same thing is called in Tuscany and Emilia, and they are normally bigger. Tortellini are a different thing again: tiny rings from Bologna, served in broth.',
    },
    {
      q: 'Which Tuscan pasta shape is easiest to make by hand?',
      a: 'Pici, because there is no rolling pin and no machine involved: you cut a strip of dough and roll it under your palms. It is also the most forgiving: pici are meant to be uneven, and the wonky ones hold sauce better.',
    },
    {
      q: 'Do you need eggs to make fresh pasta?',
      a: 'No. Pici are made with just flour, water and a little olive oil, a poor kitchen\'s pasta from central Tuscany. Ribbons like tagliatelle and pappardelle, and filled shapes like tortelli, use an egg dough for the elasticity and richness they need.',
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
      'We teach all four of these shapes in a three-hour class in our Oltrarno kitchen: hands in the flour from the first minute, then everyone sits down to eat what they made. Max 8 guests, €95.',
    ctaButton: 'Book a pasta class',
    ctaLink: 'See the class',
    guideHeading: 'Going deeper',
    guideBody: 'Our full guide to Tuscany\'s fresh pasta traditions: where each shape comes from and why the region cooks the way it does.',
    guideLink: 'Read the Tuscan pasta guide',
  },
  classHref: '/pasta-making-class-florence/',
  guideHref: '/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'Tuscany\'s hand-rolled pasta, explained.',
      tagline: 'Siena\'s thick hand-rolled strand: flour, water, no egg.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'What Is Pici Pasta? Siena\'s Hand-Rolled Strand, Explained',
      description:
        'Pici is a thick, hand-rolled Tuscan pasta of flour and water, no egg. Where it comes from, how to roll it, and the four sauces it belongs with.',
      image: {
        src: img.shapePici,
        alt: 'Thick hand-rolled pici pasta strands dusted with flour on a wooden board',
        w: 1000,
        h: 625,
      },
      answer:
        'Pici is a thick, hand-rolled pasta from southern Tuscany, made from nothing but flour, water and a little olive oil, no egg. Each strand is rolled out under the palms rather than cut with a knife or machine, which is why no two are the same thickness and why the surface stays rough enough to grip a heavy sauce.',
      facts: [
        { label: 'From', value: 'Siena & the Val d\'Orcia' },
        { label: 'Dough', value: 'flour, water, olive oil; no egg' },
        { label: 'Made by', value: 'rolling under the palms' },
        { label: 'Thickness', value: 'about 3 mm, deliberately uneven' },
        { label: 'Classic sauces', value: 'aglione, cinghiale, cacio e pepe, briciole' },
        { label: 'Difficulty', value: 'the most forgiving shape to learn' },
      ],
      sections: [
        {
          title: 'Where pici come from',
          paras: [
            'Pici belong to the hills south of Siena (the Val d\'Orcia, Montalcino, Montepulciano), and they are old. There is a fresco in an Etruscan tomb at Tarquinia that appears to show something very like them, which locals will tell you about at length and with confidence.',
            'What is certain is that pici are poor food. No egg, because eggs were worth money and went to market. Just the cheapest flour, water from the tap, and the one thing every farmhouse had: time, and a pair of hands. That is the whole recipe, and it is why the shape survived: you can make it with nothing.',
          ],
        },
        {
          title: 'How they are rolled',
          paras: [
            'You roll out a slab of dough about a centimetre thick, cut it into strips, and then work each strip under your flat palms from the middle outwards until it stretches into a long, thick strand. The verb is <em>appiciare</em>, and it is where the name comes from.',
            'The mistake everyone makes at first is pressing too hard, which flattens the strand into a ribbon instead of rounding it. The second mistake is chasing perfection. Pici are supposed to be uneven: the fat bits and thin bits are the character of the dish, and a rough, slightly irregular surface holds sauce far better than a smooth extruded one ever will.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'Four sauces earn the name. <strong>Aglione</strong> (a slow tomato and garlic sauce built on the enormous, mild Tuscan aglione garlic) is the definitive one; ask for <em>pici all\'aglione</em> anywhere south of Siena. <strong>Ragù di cinghiale</strong>, wild boar, is the autumn version and the reason pici are thick enough to stand up to it.',
            '<strong>Cacio e pepe</strong> works beautifully because the rough surface grabs the cheese, and <strong>pici alle briciole</strong> (toasted breadcrumbs, garlic, oil) is the oldest and poorest of them, and quietly one of the best things in Tuscan cooking. What you will not find on real pici is cream.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is pici pasta made of?',
          a: 'Flour, water and usually a little olive oil. No egg: that is the defining feature and the reason it was affordable for farming families in southern Tuscany.',
        },
        {
          q: 'Is pici the same as thick spaghetti?',
          a: 'No. Spaghetti is extruded through a die and comes out perfectly round, uniform and smooth. Pici are rolled by hand, so they are uneven along their length and slightly rough on the surface, which changes how much sauce clings to them.',
        },
        {
          q: 'What sauce goes with pici?',
          a: 'Traditionally four: aglione (tomato and sweet Tuscan garlic), wild boar ragù, cacio e pepe, and briciole, toasted breadcrumbs with garlic and oil. All four are chosen because they cling to a thick, rough strand.',
        },
        {
          q: 'Are pici hard to make at home?',
          a: 'They are the easiest fresh pasta to start with, because you need no machine and no rolling pin, just your hands and a board. They are slow rather than difficult: rolling enough pici for four people takes a while, which is exactly why it was a job for the whole family.',
        },
      ],
      compare: { dough: 'Flour & water, no egg', cut: 'Rolled by hand, ~3 mm', sauce: 'Aglione, wild boar, cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: 'Tuscany\'s widest pasta ribbon, explained.',
      tagline: 'The widest ribbon, built to carry wild boar and hare.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'What Are Pappardelle? Width, Origin and Classic Sauces',
      description:
        'Pappardelle are wide egg-dough ribbons, 2–3 cm across, made for heavy game sauces like wild boar and hare. The cut, the dough, the classic pairings.',
      image: {
        src: img.shapePappardelle,
        alt: 'Wide pappardelle ribbons of fresh egg pasta on a floured wooden board',
        w: 1000,
        h: 625,
      },
      answer:
        'Pappardelle are the widest fresh pasta ribbon in the Tuscan repertoire: flat strips of egg dough cut 2 to 3 centimetres across. The width is not showing off: it exists so that a heavy, chunky game sauce has something broad enough to sit on instead of sliding off.',
      facts: [
        { label: 'From', value: 'Tuscany' },
        { label: 'Dough', value: 'egg dough: flour and egg' },
        { label: 'Width', value: '2–3 cm' },
        { label: 'Name from', value: 'pappare, to gobble' },
        { label: 'Classic sauces', value: 'cinghiale, lepre, anatra, porcini' },
        { label: 'Difficulty', value: 'easiest ribbon: the widest cut is the most forgiving' },
      ],
      sections: [
        {
          title: 'A name that tells you how to eat it',
          paras: [
            'The word comes from <em>pappare</em>, a blunt Tuscan verb meaning to gobble or to scoff. It is not a delicate name and it is not a delicate pasta. Pappardelle are what you serve when the sauce has been on the stove since morning and everybody is hungry.',
            'They are the ribbon of the Tuscan hills specifically: where tagliatelle belongs to Emilia and Bologna, pappardelle is what comes out of a Tuscan kitchen in autumn, when the hunting season starts and there is game to be dealt with.',
          ],
        },
        {
          title: 'How they are cut',
          paras: [
            'The dough is a standard fresh egg dough, rolled out thin: thin enough to see the shadow of your hand through it, but no thinner, because a wide ribbon has to hold weight. Then you flour the sheet, roll it loosely, and cut across the roll with a knife at two to three centimetres.',
            'Because the cut is so wide, pappardelle are the most forgiving ribbon to learn: a wobbly line matters far less at 3 cm than it does at 6 mm. They also cook fast (two or three minutes in well-salted water), and they must go straight into the pan with the sauce, never into a bowl to wait.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            '<strong>Ragù di cinghiale</strong> (wild boar, slow-cooked with red wine, juniper and tomato) is the pairing that made this shape famous, and it remains the correct answer. <strong>Lepre</strong>, hare, is the older and richer version, and the one an old Tuscan cook would choose if they could get it.',
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
          a: 'Yes. Pappardelle are an egg-dough pasta (flour and whole eggs) which gives the wide ribbon the elasticity and strength it needs to carry a heavy sauce without tearing.',
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
      tagline: 'The everyday egg ribbon, 6–8 mm, ragù\'s natural partner.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'What Are Tagliatelle? Width, Cut and Classic Sauces',
      description:
        'Tagliatelle are fresh egg-dough ribbons cut 6–8 mm wide, the natural partner for a meat ragù. How they differ from fettuccine and pappardelle.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nests of fresh tagliatelle ribbons resting on a floured board',
        w: 1000,
        h: 625,
      },
      answer:
        'Tagliatelle are flat ribbons of fresh egg pasta, cut roughly 6 to 8 millimetres wide. They are the everyday ribbon of northern and central Italy: narrow enough to twist onto a fork, broad enough to carry a proper meat ragù, which is why they are the shape most people picture when they think of fresh pasta.',
      facts: [
        { label: 'From', value: 'Emilia-Romagna, made across Tuscany' },
        { label: 'Dough', value: 'egg dough: flour and egg' },
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
            'Roll the egg dough into a thin sheet, let it dry for a few minutes until it is leathery rather than tacky (this is the step people skip, and it is why their ribbons stick together), then flour it generously, roll it into a loose flat log and cut across with a sharp knife.',
            'Then lift each cut immediately and shake it loose. Left in the roll, ribbons weld into a brick within minutes. Toss them in a little semolina and coil them into loose nests until the water boils. Tagliatelle are the shape that teaches you knife control, because at 6 mm a wandering cut is obvious in a way it never is on pappardelle.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'A proper <strong>ragù</strong> (slow-cooked minced beef and pork with soffritto, wine and a very little tomato) is the pairing, and in Bologna it is the only one anybody will admit to. Note what it is not served with: spaghetti. That is a foreign invention and it will be pointed out to you.',
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
          a: 'A slow-cooked meat ragù is the classic and, in Bologna, effectively the only accepted answer. Mushrooms, butter and sage, or a good tomato and basil all work well too: the ribbon is narrow enough that lighter sauces still coat it.',
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
      tagline: 'The filled parcel, in Tuscany, most often potato.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'What Are Tortelli? Tortelli vs Ravioli vs Tortellini',
      description:
        'Tortelli are filled fresh pasta parcels; in Tuscany the classic filling is potato, from the Mugello. The fillings, the folding, and the right sauce.',
      image: {
        src: img.shapeTortelli,
        alt: 'Hand-folded tortelli filled parcels arranged on a floured surface',
        w: 1000,
        h: 625,
      },
      answer:
        'Tortelli are filled parcels of fresh egg pasta: a sheet of dough, a spoonful of filling, a second sheet pressed down and sealed around it. Tuscany\'s signature version is <em>tortelli di patate</em>, filled with seasoned potato rather than the ricotta and spinach most visitors expect, and it comes from the Mugello valley north of Florence.',
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
            'Ask for tortelli in the Mugello, the hilly country north of Florence, and what arrives is filled with potato, mashed with garlic, parsley, a little tomato and parmesan, seasoned properly and sometimes lifted with nutmeg. It surprises people who expect ricotta, and it is one of the genuinely great regional dishes of Tuscany.',
            'The reason is the same reason as always: potatoes grew well up there and meat did not go far. The other Tuscan version, <em>tortelli maremmani</em>, uses ricotta and spinach and comes from the coastal Maremma. Both are correct; they are simply from different valleys.',
          ],
        },
        {
          title: 'How they are folded',
          paras: [
            'Roll the sheet slightly thicker than you would for ribbons: the dough has to survive being filled, sealed and boiled without splitting. Lay out spoonfuls of filling in a line, leaving proper gaps, then lay the second sheet over and press down <em>around each mound with your fingers</em>, pushing the air out towards the edge before you seal.',
            'Trapped air is what bursts a tortello in the water, and it is the single most common failure. Seal firmly, cut with a wheel, and check every edge. This is the shape that separates people who are enjoying themselves from people who are in a hurry, and it is the one our guests are proudest of at the end of a class.',
          ],
        },
        {
          title: 'What to put on them',
          paras: [
            'Very little, and that is the point. <strong>Butter and sage</strong> (foamed until it just starts to smell nutty, with a few crisped sage leaves) is the classic, and it is hard to improve on. A restrained <strong>meat ragù</strong> is the Mugello Sunday version.',
            'What ruins tortelli is a sauce that competes with the filling. You have spent an hour making something with a flavour on the inside; do not bury it. If in doubt, butter, sage and a grating of parmesan.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the difference between tortelli, tortellini and ravioli?',
          a: 'Size and shape rather than concept: all three are filled pasta. Tortelli are the larger square or half-moon parcels common in Tuscany and Emilia; tortellini are small ring-shaped ones from Bologna; ravioli is the broad general term, usually a smaller square. Regional naming overlaps and locals will disagree with each other happily.',
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
    // Fifth spoke, added Aug 2026. The comparison demand is real and already
    // ranking: "differenza tra ravioli e tortelli" and ~15 variants sit at
    // positions 5–12 in it/de/en with zero clicks, served only by the blog post.
    // This is the library entry those queries deserve; the deep comparison
    // stays in /blog/ravioli-vs-tortelli/ rather than being duplicated here.
    {
      slug: 'ravioli',
      name: 'Ravioli',
      h1Sub: 'Italy\'s filled parcel, and how Tuscany differs.',
      tagline: 'The filled square everyone knows, sealed between two sheets.',
      title: 'What Are Ravioli? Filling, Shape and How They Differ',
      description:
        'Ravioli are flat parcels of filled pasta sealed between two sheets. What goes inside, how big they should be, and how they differ from tortelli.',
      image: {
        src: img.shapeRavioli,
        alt: 'Freshly made ravioli parcels cut with a wheel on a floured board',
        w: 1000,
        h: 625,
      },
      answer:
        'Ravioli are flat parcels of fresh pasta: a mound of filling laid on one sheet of egg dough, a second sheet pressed over the top, the air worked out, and the whole thing sealed and cut into squares or rounds. Ravioli is the broad Italian term used everywhere; in Tuscany and Emilia the same idea, made larger, is called <em>tortelli</em>.',
      facts: [
        { label: 'From', value: 'all of Italy; the general term' },
        { label: 'Dough', value: 'egg dough, rolled slightly thicker' },
        { label: 'Classic filling', value: 'ricotta & spinach, nutmeg, parmesan' },
        { label: 'Shape', value: 'square or round, two sheets sealed' },
        { label: 'Size', value: 'about 4–5 cm; tortelli are larger' },
        { label: 'Classic sauces', value: 'butter & sage, tomato, light ragù' },
      ],
      sections: [
        {
          title: 'Ravioli, tortelli, tortellini: which is which',
          paras: [
            'These three get confused constantly, and the confusion is understandable because two of them are nearly the same word. <strong>Ravioli</strong> is the general Italian term for a flat filled parcel sealed between two sheets, usually a square of about 4 to 5 cm. <strong>Tortelli</strong> is what the same idea is called in Tuscany and Emilia, and ours are typically larger, square or half-moon.',
            '<strong>Tortellini</strong> are something else entirely: tiny rings, made by folding a small filled square around a fingertip and joining the ends, from Bologna, and served in broth rather than with sauce. Despite the ending, they are not small tortelli. The full family map is in our <a href="/blog/ravioli-vs-tortelli/">ravioli versus tortelli guide</a>.',
          ],
        },
        {
          title: 'What goes inside',
          paras: [
            'The filling most people picture is <strong>ricotta and spinach</strong>, seasoned with nutmeg and parmesan, and it is genuinely the most widespread. Meat, pumpkin (the Mantua version, with amaretti and mostarda, which divides opinion), mushroom and fish all have their regions and their seasons.',
            'In Tuscany the answer is often potato, because that is what the Mugello fills its <a href="/pasta-shapes/tortelli/">tortelli</a> with. Whatever goes in, it has to be dry enough to hold together. A wet filling weeps into the dough and takes the seal with it, which is why ricotta should be drained and cooked spinach squeezed properly.',
          ],
        },
        {
          title: 'Sealing them so they survive the pot',
          paras: [
            'Roll the sheet a touch thicker than you would for ribbons: a filled shape has to survive being stuffed, sealed and boiled. Lay the filling in a line with real gaps between the mounds, because crowding them is what makes sealing impossible later. A teaspoon each is plenty.',
            'Then the part that matters: lay the second sheet over and press down <em>around each mound with your fingertips</em>, working outwards so the air escapes rather than getting trapped. Trapped air expands in boiling water and that is what bursts a raviolo. Seal firmly, cut with a wheel, and run a finger round every edge before they go anywhere near the pan.',
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the difference between ravioli and tortelli?',
          a: 'Mostly size and region rather than technique. Ravioli is the broad national term for a flat filled parcel, usually a smaller square sealed between two sheets. Tortelli is what the same idea is called in Tuscany and Emilia, and they are typically larger. In Tuscany the classic filling is potato rather than ricotta.',
        },
        {
          q: 'Are ravioli and tortellini the same?',
          a: 'No. Tortellini are tiny rings folded around a fingertip and joined at the ends, from Bologna, traditionally served in broth. Ravioli are flat parcels sealed between two sheets and served with sauce. The similar name is a coincidence of Italian diminutives, not a family resemblance.',
        },
        {
          q: 'What is one ravioli called?',
          a: 'A raviolo. Ravioli is the plural, the same way panini is the plural of panino. The same applies to tortello and tortelli, and tortellino and tortellini.',
        },
        {
          q: 'Why do my ravioli burst when I boil them?',
          a: 'Almost always trapped air. Press the top sheet down around each mound of filling with your fingers and work the air outwards before sealing the edge. Under-sealed edges, overfilling and dough rolled too thin are the other three causes.',
        },
      ],
      compare: { dough: 'Egg dough, slightly thicker', cut: 'Sealed square or round, 4–5 cm', sauce: 'Butter & sage, tomato, light ragù' },
    },
  ],
};

const it: ShapesLocale = {
  hubSlug: 'formati-di-pasta-toscana',
  // Same 94-char truncation as the English hub, same fix: filled shapes lead,
  // because that is where the Italian demand sits.
  hubTitle: 'Formati di Pasta: Tortelli, Ravioli, Pappardelle e Pici',
  hubDescription:
    'La libreria di uno chef: i cinque formati di pasta fresca che insegniamo a Firenze. Cos\'è ciascuno, come si tira a mano e il sugo per cui è nato.',
  hubEyebrow: 'La libreria dei formati',
  hubHeading: 'Cinque formati,',
  hubHeadingItal: 'cinque sughi diversi.',
  hubLede:
    'Un formato non è decorazione. Ognuno di questi è nato per trattenere un tipo preciso di sugo, ed è per questo che a volte un piatto sembra slavato senza un motivo evidente. Ecco cos\'è ciascuno e a cosa serve.',
  hubAnswer:
    'I cinque formati di pasta fresca che tiriamo a mano nella nostra cucina di Firenze sono pici, pappardelle, tagliatelle, tortelli e ravioli. In breve:',
  hubAnswerList: [
    '<strong>Pici</strong>: grossi spaghettoni tirati a mano di acqua e farina, senza uovo. La pasta di Siena, nata per l\'aglione e il ragù di cinghiale.',
    '<strong>Pappardelle</strong>: il nastro più largo, 2–3 cm di sfoglia all\'uovo. Fatte per reggere i sughi di selvaggina: cinghiale, lepre, anatra.',
    '<strong>Tagliatelle</strong>: nastro stretto all\'uovo, 6–8 mm. Il nastro di tutti i giorni per il ragù di carne e i funghi.',
    '<strong>Tortelli</strong>: pasta ripiena, in Toscana più spesso di patate o di ricotta e spinaci. Si condiscono con poco: burro e salvia o un ragù leggero.',
    '<strong>Ravioli</strong>: la stessa idea dei tortelli, col nome che usa il resto d\'Italia, di solito più piccoli. Piatti, sigillati fra due sfoglie.',
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
      q: 'Qual è la differenza tra ravioli e tortelli?',
      a: 'Soprattutto taglia e regione. Ravioli è il termine generico italiano per un fagottino ripieno piatto, di solito un quadrato piccolo. Tortelli è come si chiama la stessa cosa in Toscana e in Emilia, e di norma sono più grandi. I tortellini sono un\'altra cosa ancora: anellini bolognesi, che vanno in brodo.',
    },
    {
      q: 'Qual è il formato toscano più facile da fare a mano?',
      a: 'I pici, perché non serve né mattarello né macchina: si taglia una striscia di impasto e la si rotola sotto i palmi. È anche il più indulgente, perché i pici devono essere irregolari e quelli storti trattengono meglio il sugo.',
    },
    {
      q: 'Serve l\'uovo per fare la pasta fresca?',
      a: 'No. I pici si fanno solo con farina, acqua e un filo d\'olio, la pasta delle cucine povere della Toscana centrale. I nastri come tagliatelle e pappardelle e le paste ripiene come i tortelli usano invece una sfoglia all\'uovo, per l\'elasticità e la ricchezza che richiedono.',
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
      'Insegniamo tutti e quattro questi formati in un corso di tre ore nella nostra cucina in Oltrarno: le mani in farina dal primo minuto, poi ci si siede tutti a mangiare quello che si è fatto. Max 8 ospiti, €95.',
    ctaButton: 'Prenota un corso',
    ctaLink: 'Vedi il corso',
    guideHeading: 'Per approfondire',
    guideBody: 'La nostra guida completa alle tradizioni della pasta fresca in Toscana: da dove viene ogni formato e perché la regione cucina così.',
    guideLink: 'Leggi la guida alla pasta toscana',
  },
  classHref: '/it/corso-pasta-fresca-firenze/',
  guideHref: '/it/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'La pasta senese tirata a mano, spiegata.',
      tagline: 'Lo spaghettone senese tirato a mano: acqua, farina, niente uovo.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'Cosa Sono i Pici? Impasto, Come si Tirano e Sughi',
      description:
        'I pici sono una pasta toscana spessa, tirata a mano, di acqua e farina senza uovo. Da dove vengono, come si appiciano e i quattro sughi giusti.',
      image: {
        src: img.shapePici,
        alt: 'Pici spessi tirati a mano e infarinati su un tagliere di legno',
        w: 1000,
        h: 625,
      },
      answer:
        'I pici sono una pasta spessa e tirata a mano della Toscana meridionale, fatta solo con farina, acqua e un filo d\'olio d\'oliva, senza uovo. Ogni pico si rotola sotto i palmi invece di essere tagliato con un coltello o una macchina, ed è per questo che non ce ne sono due dello stesso spessore e che la superficie resta abbastanza ruvida da aggrapparsi a un sugo corposo.',
      facts: [
        { label: 'Da', value: 'Siena e la Val d\'Orcia' },
        { label: 'Impasto', value: 'farina, acqua, olio; niente uovo' },
        { label: 'Si fanno', value: 'rotolando sotto i palmi' },
        { label: 'Spessore', value: 'circa 3 mm, volutamente irregolare' },
        { label: 'Sughi classici', value: 'aglione, cinghiale, cacio e pepe, briciole' },
        { label: 'Difficoltà', value: 'il formato più indulgente da imparare' },
      ],
      sections: [
        {
          title: 'Da dove vengono i pici',
          paras: [
            'I pici appartengono alle colline a sud di Siena (la Val d\'Orcia, Montalcino, Montepulciano), e sono antichi. In una tomba etrusca a Tarquinia c\'è un affresco che sembra mostrare qualcosa di molto simile, e i locali ve lo racconteranno a lungo e con grande sicurezza.',
            'Quel che è certo è che i pici sono cibo povero. Niente uovo, perché le uova valevano soldi e andavano al mercato. Solo la farina più economica, l\'acqua del rubinetto e l\'unica cosa che ogni casa colonica aveva: il tempo, e un paio di mani. È tutta qui la ricetta, ed è per questo che il formato è sopravvissuto: si può fare con niente.',
          ],
        },
        {
          title: 'Come si appiciano',
          paras: [
            'Si stende una lastra di impasto spessa circa un centimetro, si taglia a strisce e poi si lavora ogni striscia sotto i palmi aperti, dal centro verso l\'esterno, finché non si allunga in un filo lungo e spesso. Il verbo è <em>appiciare</em>, ed è da lì che viene il nome.',
            'L\'errore che fanno tutti all\'inizio è premere troppo, il che schiaccia il filo in un nastro invece di arrotondarlo. Il secondo errore è rincorrere la perfezione. I pici devono essere irregolari: i punti più grossi e più sottili sono il carattere del piatto, e una superficie ruvida trattiene il sugo molto meglio di una trafilata liscia.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Quattro sughi si meritano il nome. L\'<strong>aglione</strong> (pomodoro e aglione toscano, quell\'aglio enorme e dolce, cotti piano) è il definitivo: da Siena in giù si chiedono i <em>pici all\'aglione</em>. Il <strong>ragù di cinghiale</strong> è la versione d\'autunno, ed è il motivo per cui i pici sono abbastanza spessi da reggerlo.',
            'Il <strong>cacio e pepe</strong> funziona benissimo perché la superficie ruvida afferra il formaggio, e i <strong>pici alle briciole</strong> (pangrattato tostato, aglio, olio) sono i più antichi e i più poveri, e in silenzio una delle cose migliori della cucina toscana. Quello che sui pici veri non troverete è la panna.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Di cosa sono fatti i pici?',
          a: 'Farina, acqua e di solito un filo d\'olio d\'oliva. Niente uovo: è la caratteristica che li definisce, e il motivo per cui erano alla portata delle famiglie contadine della Toscana meridionale.',
        },
        {
          q: 'I pici sono uguali agli spaghetti grossi?',
          a: 'No. Gli spaghetti sono trafilati e vengono fuori perfettamente rotondi, uniformi e lisci. I pici si tirano a mano, quindi sono irregolari lungo tutta la lunghezza e leggermente ruvidi in superficie, il che cambia quanto sugo ci resta attaccato.',
        },
        {
          q: 'Che sugo va con i pici?',
          a: 'Tradizionalmente quattro: aglione (pomodoro e aglione toscano), ragù di cinghiale, cacio e pepe e briciole, pangrattato tostato con aglio e olio. Tutti e quattro scelti perché si aggrappano a un filo spesso e ruvido.',
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
      tagline: 'Il nastro più largo, nato per cinghiale e lepre.',
      // 132 impressions at position 8.24 and zero clicks (GSC, Aug 2026) — the
      // old 90-char title truncated before anything useful. Leads with the
      // query, then the two things people are actually asking: width and sauce.
      title: 'Cosa Sono le Pappardelle? Larghezza, Origine e Sughi',
      description:
        'Le pappardelle sono i nastri di sfoglia all\'uovo più larghi della Toscana: 2–3 cm, nati per la selvaggina. Quanto misurano e come si condiscono.',
      image: {
        src: img.shapePappardelle,
        alt: 'Larghe pappardelle di pasta fresca all\'uovo su un tagliere infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'Le pappardelle sono il nastro di pasta fresca più largo del repertorio toscano: strisce piatte di sfoglia all\'uovo tagliate da 2 a 3 centimetri. La larghezza non è ostentazione: esiste perché un sugo di selvaggina pesante e corposo abbia una superficie abbastanza ampia su cui posarsi invece di scivolare via.',
      facts: [
        { label: 'Da', value: 'Toscana' },
        { label: 'Impasto', value: 'sfoglia all\'uovo: farina e uova' },
        { label: 'Larghezza', value: '2–3 cm' },
        { label: 'Nome da', value: 'pappare, mangiare avidamente' },
        { label: 'Sughi classici', value: 'cinghiale, lepre, anatra, porcini' },
        { label: 'Difficoltà', value: 'il nastro più facile: il taglio largo perdona' },
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
            'L\'impasto è una normale sfoglia fresca all\'uovo, tirata sottile: abbastanza da vedere l\'ombra della mano attraverso, ma non di più, perché un nastro largo deve reggere il peso. Poi si infarina la sfoglia, si arrotola morbida e si taglia di traverso con un coltello a due o tre centimetri.',
            'Proprio perché il taglio è così largo, le pappardelle sono il nastro più indulgente da imparare: una linea storta si nota molto meno a 3 cm che a 6 mm. Cuociono anche in fretta (due o tre minuti in acqua ben salata), e devono andare dritte in padella con il sugo, mai in una ciotola ad aspettare.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Il <strong>ragù di cinghiale</strong> (cotto piano con vino rosso, ginepro e pomodoro) è l\'abbinamento che ha reso famoso questo formato, e resta la risposta giusta. La <strong>lepre</strong> è la versione più antica e più ricca, quella che sceglierebbe un vecchio cuoco toscano se riuscisse a trovarla.',
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
          a: 'Sì. Le pappardelle sono una pasta all\'uovo (farina e uova intere) che dà al nastro largo l\'elasticità e la forza necessarie per reggere un sugo pesante senza rompersi.',
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
      tagline: 'Il nastro all\'uovo di tutti i giorni, 6–8 mm, il compagno del ragù.',
      // Retitled off the 83-93 char pattern that Google truncated mid-payload;
      // same fix already applied across the German spokes.
      title: 'Cosa Sono le Tagliatelle? Larghezza, Taglio e Sughi',
      description:
        'Le tagliatelle sono nastri di sfoglia all\'uovo tagliati a 6–8 mm, il compagno naturale del ragù di carne. La differenza con fettuccine e pappardelle.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nidi di tagliatelle fresche appoggiati su un tagliere infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'Le tagliatelle sono nastri piatti di pasta fresca all\'uovo, tagliati a circa 6–8 millimetri. Sono il nastro di tutti i giorni dell\'Italia settentrionale e centrale: abbastanza stretti da avvolgersi sulla forchetta, abbastanza larghi da reggere un vero ragù di carne, ed è per questo che sono il formato che quasi tutti immaginano quando pensano alla pasta fresca.',
      facts: [
        { label: 'Da', value: 'Emilia-Romagna, si fanno in tutta la Toscana' },
        { label: 'Impasto', value: 'sfoglia all\'uovo: farina e uova' },
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
            'Si tira la sfoglia all\'uovo sottile, la si lascia asciugare qualche minuto finché non diventa coriacea invece che appiccicosa (è il passaggio che tutti saltano, ed è il motivo per cui poi i nastri si attaccano), poi la si infarina bene, si arrotola in un rotolo morbido e si taglia di traverso con un coltello affilato.',
            'Subito dopo si solleva ogni taglio e lo si scuote per aprirlo. Lasciati nel rotolo, i nastri si saldano in un mattone nel giro di pochi minuti. Si infarinano con un po\' di semola e si raccolgono in nidi morbidi finché l\'acqua non bolle. Le tagliatelle sono il formato che insegna a controllare il coltello, perché a 6 mm un taglio che scappa si vede, cosa che sulle pappardelle non succede mai.',
          ],
        },
        {
          title: 'Come si condiscono',
          paras: [
            'Un vero <strong>ragù</strong> (carne di manzo e maiale macinata, cotta piano con il soffritto, il vino e pochissimo pomodoro) è l\'abbinamento, e a Bologna è l\'unico che qualcuno ammetterà. Notate con cosa non si serve: gli spaghetti. Quella è un\'invenzione straniera e ve lo faranno notare.',
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
          a: 'Un ragù di carne a lunga cottura è il classico e, a Bologna, di fatto l\'unica risposta accettata. Anche funghi, burro e salvia o un buon pomodoro e basilico funzionano bene: il nastro è abbastanza stretto che anche i sughi più leggeri lo vestono.',
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
      tagline: 'La pasta ripiena, in Toscana, più spesso di patate.',
      // 51 impressions at position 12.73, zero clicks. The comparison intent is
      // the volume here: "differenza tra ravioli e tortelli" and ten variants
      // all rank top 12, so the title carries it rather than burying it.
      title: 'Cosa Sono i Tortelli? Differenze con i Ravioli',
      description:
        'I tortelli sono pasta ripiena: in Toscana quasi sempre di patate, dal Mugello. Cosa li distingue dai ravioli e perché il condimento resta semplice.',
      image: {
        src: img.shapeTortelli,
        alt: 'Tortelli ripieni chiusi a mano disposti su un piano infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'I tortelli sono fagottini di pasta fresca all\'uovo ripieni: una sfoglia, un cucchiaio di ripieno, una seconda sfoglia premuta e sigillata attorno. La versione simbolo della Toscana è il <em>tortello di patate</em>, ripieno di patate condite invece della ricotta e spinaci che quasi tutti si aspettano, e viene dal Mugello, la valle a nord di Firenze.',
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
            'Chiedete i tortelli nel Mugello, la campagna collinare a nord di Firenze, e quello che arriva è ripieno di patate, schiacciate con aglio, prezzemolo, un po\' di pomodoro e parmigiano, condite come si deve e a volte alzate con la noce moscata. Sorprende chi si aspetta la ricotta, ed è uno dei grandi piatti regionali della Toscana.',
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
            'Con pochissimo, ed è proprio il punto. <strong>Burro e salvia</strong> (schiumato finché non comincia a profumare di nocciola, con qualche foglia croccante) è il classico, ed è difficile fare di meglio. Un <strong>ragù di carne</strong> misurato è la versione della domenica in Mugello.',
            'Quello che rovina i tortelli è un condimento che compete con il ripieno. Avete passato un\'ora a fare qualcosa che ha il sapore dentro: non seppellitelo. Nel dubbio, burro, salvia e una grattata di parmigiano.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Qual è la differenza tra tortelli, tortellini e ravioli?',
          a: 'La misura e la forma più che il concetto: tutti e tre sono paste ripiene. I tortelli sono i fagottini più grandi, quadrati o a mezzaluna, comuni in Toscana e in Emilia; i tortellini sono quelli piccoli ad anello di Bologna; ravioli è il termine generale, di solito un quadrato più piccolo. I nomi regionali si sovrappongono e i locali litigano volentieri tra loro.',
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
    {
      slug: 'ravioli',
      name: 'Ravioli',
      h1Sub: 'Il fagottino ripieno d\'Italia, e come cambia in Toscana.',
      tagline: 'Il quadrato ripieno che conoscono tutti, sigillato tra due sfoglie.',
      title: 'Cosa Sono i Ravioli? Ripieno, Forma e Differenze',
      description:
        'I ravioli sono fagottini piatti di pasta ripiena sigillati tra due sfoglie. Cosa ci va dentro, quanto devono essere grandi e come cambiano in Toscana.',
      image: {
        src: img.shapeRavioli,
        alt: 'Ravioli appena fatti tagliati con la rotella su un tagliere infarinato',
        w: 1000,
        h: 625,
      },
      answer:
        'I ravioli sono fagottini piatti di pasta fresca: una nocciola di ripieno su una sfoglia all\'uovo, una seconda sfoglia sopra, l\'aria spinta fuori, il tutto sigillato e tagliato a quadrati o a tondi. Ravioli è il termine generale usato in tutta Italia; in Toscana e in Emilia la stessa idea, fatta più grande, si chiama <em>tortelli</em>.',
      facts: [
        { label: 'Da', value: 'tutta Italia; è il termine generale' },
        { label: 'Impasto', value: 'sfoglia all\'uovo, un po\' più spessa' },
        { label: 'Ripieno classico', value: 'ricotta e spinaci, noce moscata, parmigiano' },
        { label: 'Forma', value: 'quadrata o tonda, due sfoglie sigillate' },
        { label: 'Dimensione', value: 'circa 4–5 cm; i tortelli sono più grandi' },
        { label: 'Condimenti classici', value: 'burro e salvia, pomodoro, ragù leggero' },
      ],
      sections: [
        {
          title: 'Ravioli, tortelli, tortellini: chi è chi',
          paras: [
            'Si confondono in continuazione, ed è comprensibile visto che due di questi nomi sono quasi la stessa parola. <strong>Ravioli</strong> è il termine generale italiano per un fagottino piatto sigillato tra due sfoglie, di solito un quadrato di 4–5 cm. <strong>Tortelli</strong> è come si chiama la stessa idea in Toscana e in Emilia, e i nostri sono in genere più grandi, quadrati o a mezzaluna.',
            'I <strong>tortellini</strong> sono un\'altra cosa: anelli minuscoli, fatti piegando un quadratino ripieno attorno al polpastrello e unendo le punte, di Bologna, e vanno in brodo e non col sugo. Nonostante il suffisso, non sono tortelli piccoli. La mappa completa è nella nostra <a href="/it/blog/ravioli-vs-tortelli/">guida su ravioli e tortelli</a>.',
          ],
        },
        {
          title: 'Cosa ci va dentro',
          paras: [
            'Il ripieno che viene in mente a tutti è <strong>ricotta e spinaci</strong>, con noce moscata e parmigiano, ed è davvero il più diffuso. Carne, zucca (la versione mantovana, con amaretti e mostarda, che divide), funghi e pesce hanno tutti la loro regione e la loro stagione.',
            'In Toscana la risposta è spesso la patata, perché è di quello che il Mugello riempie i suoi <a href="/it/formati-di-pasta-toscana/tortelli/">tortelli</a>. Qualunque cosa ci vada, deve essere abbastanza asciutta da stare insieme. Un ripieno bagnato bagna la sfoglia e si porta via la sigillatura: per questo la ricotta va scolata e gli spinaci cotti vanno strizzati bene.',
          ],
        },
        {
          title: 'Sigillarli perché reggano la cottura',
          paras: [
            'Tira la sfoglia un filo più spessa di quella per i nastri: una forma ripiena deve sopravvivere al ripieno, alla sigillatura e all\'acqua bollente. Disponi il ripieno in fila lasciando spazi veri tra una nocciola e l\'altra: ammassarle è ciò che rende impossibile sigillare dopo. Un cucchiaino ciascuna basta.',
            'Poi la parte che conta: appoggia la seconda sfoglia e premi <em>attorno a ogni nocciola con i polpastrelli</em>, lavorando verso l\'esterno perché l\'aria esca invece di restare intrappolata. L\'aria intrappolata si espande nell\'acqua bollente ed è quella che apre un raviolo. Sigilla bene, taglia con la rotella e passa un dito su ogni bordo prima che si avvicinino alla pentola.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Qual è la differenza tra ravioli e tortelli?',
          a: 'Soprattutto dimensione e regione, più che tecnica. Ravioli è il termine generale per un fagottino piatto ripieno, di solito un quadrato più piccolo sigillato tra due sfoglie. Tortelli è come si chiama la stessa cosa in Toscana e in Emilia, e sono in genere più grandi. In Toscana il ripieno classico è di patate, non di ricotta.',
        },
        {
          q: 'Ravioli e tortellini sono la stessa cosa?',
          a: 'No. I tortellini sono anelli minuscoli piegati attorno al polpastrello e uniti alle estremità, di Bologna, tradizionalmente serviti in brodo. I ravioli sono fagottini piatti sigillati tra due sfoglie e serviti col sugo. La somiglianza dei nomi è una coincidenza di diminutivi, non una parentela.',
        },
        {
          q: 'Come si chiama un raviolo solo?',
          a: 'Raviolo. Ravioli è il plurale, come panino e panini. Lo stesso vale per tortello e tortelli, e per tortellino e tortellini.',
        },
        {
          q: 'Perché i ravioli si aprono in cottura?',
          a: 'Quasi sempre per l\'aria intrappolata. Premi la sfoglia superiore attorno a ogni nocciola di ripieno con le dita e spingi l\'aria verso l\'esterno prima di sigillare il bordo. Bordi sigillati male, troppo ripieno e sfoglia tirata troppo sottile sono le altre tre cause.',
        },
      ],
      compare: { dough: 'Sfoglia all\'uovo, più spessa', cut: 'Quadrato o tondo sigillato, 4–5 cm', sauce: 'Burro e salvia, pomodoro, ragù leggero' },
    },
  ],
};

// German, added Aug 2026. Germany is the best-converting large market (2.10%
// CTR) and the shape queries are already ranking without a German page:
// "was sind tortelli" at position 3.9 (and it converted), "was sind
// pappardelle" 11.0, "was ist pappardelle" 12.0, "tortelli maremmani deutsch"
// 9.5, plus twelve phrasings of "unterschied ravioli tortellini" at 4–12.
const de: ShapesLocale = {
  hubSlug: 'pasta-formen',
  hubTitle: 'Pasta-Formen: Pici, Pappardelle, Tortelli & Ravioli',
  hubDescription:
    'Die frischen Pastaformen, die wir in Florenz von Hand rollen: was jede ist, wie sie geformt wird und für welche Soße sie gemacht wurde. Mit Maßtabelle.',
  hubEyebrow: 'Die Formen-Bibliothek',
  hubHeading: 'Fünf Formen,',
  hubHeadingItal: 'fünf verschiedene Soßen.',
  hubLede:
    'Eine Form ist keine Dekoration. Jede einzelne wurde erfunden, um eine bestimmte Art von Soße zu halten, und sie zu vertauschen ist der Grund, warum ein Gericht manchmal ohne ersichtlichen Grund dünn schmeckt. Hier ist, was jede Form ist und wofür sie da ist.',
  hubAnswer:
    'Die fünf Formen frischer Pasta, die wir in unserer Küche in Florenz von Hand rollen, sind Pici, Pappardelle, Tagliatelle, Tortelli und Ravioli. Kurz gesagt:',
  hubAnswerList: [
    '<strong>Pici</strong>: dicke, von Hand gerollte Stränge aus Mehl und Wasser, ohne Ei. Sienas Pasta, gemacht für Knoblauchsoße und Wildschweinragù.',
    '<strong>Pappardelle</strong>: das breiteste Band, 20–30 mm Eierteig. Gebaut für schwere Wildsoßen: Wildschwein, Hase, Ente.',
    '<strong>Tagliatelle</strong>: das schmale Eierband, 6–8 mm. Das Alltagsband für Fleischragù und Pilze.',
    '<strong>Tortelli</strong>: gefüllte Päckchen, in der Toskana meist mit Kartoffel oder Ricotta und Spinat. Schlicht angemacht, mit Butter und Salbei.',
    '<strong>Ravioli</strong>: dieselbe Idee wie Tortelli, nur kleiner und mit dem landesweit gebräuchlichen Namen. Flach, zwischen zwei Teigbahnen versiegelt.',
  ],
  hubFaqs: [
    {
      q: 'Warum ist die Pastaform wichtig?',
      a: 'Die Form entscheidet, wie viel Soße haften bleibt und wie sich die Pasta im Mund anfühlt. Ein dicker, rauer Strang wie Pici hält eine grobe Soße fest, die von einem glatten Band abrutschen würde; eine breite Pappardella gibt einem schweren Wildragù etwas zum Daraufsitzen. Die richtige Kombination ist der größte Teil des Unterschieds zwischen einem guten und einem faden Teller.',
    },
    {
      q: 'Was ist der Unterschied zwischen Pappardelle und Tagliatelle?',
      a: 'Die Breite, und damit der Zweck. Pappardelle werden 20–30 mm breit geschnitten und sind für schwere, grobe Wildsoßen wie Wildschwein oder Hase gemacht. Tagliatelle werden 6–8 mm geschnitten und passen zu feinerem Fleischragù und Pilzen. Gleicher Eierteig, andere Aufgabe.',
    },
    {
      q: 'Was ist der Unterschied zwischen Ravioli und Tortelli?',
      a: 'Vor allem Größe und Region. Ravioli ist der allgemeine italienische Begriff für ein flaches gefülltes Päckchen, meist ein kleineres Quadrat. Tortelli heißt dieselbe Sache in der Toskana und der Emilia, und sie sind in der Regel größer. Tortellini dagegen sind etwas anderes: winzige Ringe aus Bologna, die in die Brühe kommen.',
    },
    {
      q: 'Welche toskanische Pastaform lässt sich am leichtesten von Hand machen?',
      a: 'Pici, weil weder Nudelholz noch Maschine nötig sind: Sie schneiden einen Teigstreifen ab und rollen ihn unter den Handflächen. Sie ist auch die nachsichtigste Form, denn Pici sollen ungleichmäßig sein, und die krummen halten die Soße besser.',
    },
    {
      q: 'Braucht man Eier für frische Pasta?',
      a: 'Nein. Pici werden nur aus Mehl, Wasser und etwas Olivenöl gemacht, die Pasta der armen Küche Mittelitaliens. Bänder wie Tagliatelle und Pappardelle sowie gefüllte Formen wie Tortelli brauchen dagegen einen Eierteig für Elastizität und Geschmack.',
    },
  ],
  labels: {
    home: 'Startseite',
    hubCrumb: 'Pasta-Formen',
    tableHeading: 'Im Vergleich',
    colShape: 'Form',
    colDough: 'Teig',
    colCut: 'Schnitt',
    colSauce: 'Gemacht für',
    readMore: 'Zur Form',
    backToHub: 'Alle Pasta-Formen',
    faqHeading: 'Fragen, beantwortet.',
    ctaHeading: 'Rollen Sie sie selbst.',
    ctaBody:
      'Wir unterrichten diese Formen in einem dreistündigen Kurs in unserer Küche im Oltrarno: ab der ersten Minute die Hände im Mehl, danach setzen sich alle hin und essen, was sie gemacht haben. Max. 8 Gäste, 95 €.',
    ctaButton: 'Pasta-Kurs buchen',
    ctaLink: 'Zum Kurs',
    guideHeading: 'Tiefer einsteigen',
    guideBody: 'Unser ausführlicher Guide zu den frischen Pastatraditionen der Toskana: woher jede Form kommt und warum die Region so kocht, wie sie kocht.',
    guideLink: 'Zum Guide der toskanischen Pasta',
  },
  classHref: '/de/pasta-kurs-florenz/',
  guideHref: '/de/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'Die von Hand gerollte Pasta der Toskana, erklärt.',
      tagline: 'Sienas dicker handgerollter Strang: Mehl, Wasser, kein Ei.',
      title: 'Was sind Pici? Sienas handgerollte Pasta, erklärt',
      description:
        'Pici sind eine dicke, von Hand gerollte toskanische Pasta aus Mehl und Wasser, ohne Ei. Herkunft, Rolltechnik und die vier Soßen, die dazugehören.',
      image: {
        src: img.shapePici,
        alt: 'Dicke handgerollte Pici-Stränge mit Mehl bestäubt auf einem Holzbrett',
        w: 1000,
        h: 625,
      },
      answer:
        'Pici sind eine dicke, von Hand gerollte Pasta aus der südlichen Toskana, gemacht aus nichts als Mehl, Wasser und etwas Olivenöl, ohne Ei. Jeder Strang wird unter den Handflächen ausgerollt statt mit Messer oder Maschine geschnitten, weshalb keine zwei gleich dick sind und die Oberfläche rau genug bleibt, um eine schwere Soße zu greifen.',
      facts: [
        { label: 'Herkunft', value: 'Siena und das Val d\'Orcia' },
        { label: 'Teig', value: 'Mehl, Wasser, Olivenöl; kein Ei' },
        { label: 'Gemacht durch', value: 'Rollen unter den Handflächen' },
        { label: 'Dicke', value: 'etwa 3 mm, bewusst ungleichmäßig' },
        { label: 'Klassische Soßen', value: 'Aglione, Wildschwein, Cacio e pepe, Briciole' },
        { label: 'Schwierigkeit', value: 'die nachsichtigste Form zum Lernen' },
      ],
      sections: [
        {
          title: 'Woher Pici kommen',
          paras: [
            'Pici gehören in die Hügel südlich von Siena, ins Val d\'Orcia, nach Montalcino und Montepulciano, und sie sind alt. In einem etruskischen Grab in Tarquinia gibt es ein Fresko, das etwas sehr Ähnliches zu zeigen scheint, wovon Einheimische ausführlich und mit großer Überzeugung berichten.',
            'Sicher ist: Pici sind Arme-Leute-Essen. Kein Ei, weil Eier Geld wert waren und auf den Markt gingen. Nur das billigste Mehl, Wasser aus dem Hahn und das eine, was jeder Bauernhof hatte: Zeit und ein Paar Hände. Das ist das ganze Rezept, und deshalb hat die Form überlebt: Man kann sie aus nichts machen.',
          ],
        },
        {
          title: 'Wie sie gerollt werden',
          paras: [
            'Sie rollen eine etwa zentimeterdicke Teigplatte aus, schneiden sie in Streifen und arbeiten dann jeden Streifen unter den flachen Handflächen von der Mitte nach außen, bis er sich zu einem langen, dicken Strang dehnt. Das Verb heißt <em>appiciare</em>, und daher kommt der Name.',
            'Der Fehler, den am Anfang alle machen, ist zu fest zu drücken, wodurch der Strang zu einem Band plattgedrückt wird statt rund zu werden. Der zweite Fehler ist das Streben nach Perfektion. Pici sollen ungleichmäßig sein: die dicken und dünnen Stellen sind der Charakter des Gerichts, und eine raue, leicht unregelmäßige Oberfläche hält Soße weit besser als jede glatt extrudierte.',
          ],
        },
        {
          title: 'Was darauf gehört',
          paras: [
            'Vier Soßen verdienen den Namen. <strong>Aglione</strong>, eine langsam gekochte Tomaten-Knoblauch-Soße auf Basis des riesigen, milden toskanischen Aglione-Knoblauchs, ist die definitive; bestellen Sie südlich von Siena überall <em>pici all\'aglione</em>. <strong>Ragù di cinghiale</strong>, Wildschwein, ist die Herbstversion und der Grund, warum Pici dick genug sind, um standzuhalten.',
            '<strong>Cacio e pepe</strong> funktioniert wunderbar, weil die raue Oberfläche den Käse greift, und <strong>pici alle briciole</strong> (geröstete Semmelbrösel, Knoblauch, Öl) ist die älteste und ärmste davon und ganz nebenbei eines der besten Dinge der toskanischen Küche. Was Sie auf echten Pici nicht finden werden, ist Sahne.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Woraus bestehen Pici?',
          a: 'Aus Mehl, Wasser und meist etwas Olivenöl. Kein Ei: das ist das entscheidende Merkmal und der Grund, warum sie für Bauernfamilien in der südlichen Toskana bezahlbar waren.',
        },
        {
          q: 'Sind Pici dasselbe wie dicke Spaghetti?',
          a: 'Nein. Spaghetti werden durch eine Form extrudiert und kommen perfekt rund, gleichmäßig und glatt heraus. Pici werden von Hand gerollt, sind also über ihre Länge ungleichmäßig und leicht rau an der Oberfläche, was verändert, wie viel Soße daran haften bleibt.',
        },
        {
          q: 'Welche Soße passt zu Pici?',
          a: 'Traditionell vier: Aglione (Tomate und süßer toskanischer Knoblauch), Wildschweinragù, Cacio e pepe und Briciole, geröstete Semmelbrösel mit Knoblauch und Öl. Alle vier sind gewählt, weil sie an einem dicken, rauen Strang haften.',
        },
        {
          q: 'Sind Pici schwer selbst zu machen?',
          a: 'Sie sind die einfachste frische Pasta für den Anfang, weil weder Maschine noch Nudelholz nötig sind, nur Hände und ein Brett. Sie sind eher langsam als schwierig: genug Pici für vier Personen zu rollen dauert eine Weile, und genau deshalb war es Arbeit für die ganze Familie.',
        },
      ],
      compare: { dough: 'Mehl und Wasser, kein Ei', cut: 'Von Hand gerollt, ~3 mm', sauce: 'Aglione, Wildschwein, Cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: 'Das breiteste Pastaband der Toskana, erklärt.',
      tagline: 'Das breiteste Band, gebaut für Wildschwein und Hase.',
      title: 'Was sind Pappardelle? Breite, Herkunft und Soßen',
      description:
        'Pappardelle sind breite Bandnudeln aus Eierteig, 20–30 mm breit, gemacht für schwere Wildsoßen wie Wildschwein und Hase. Schnitt, Teig, Kombinationen.',
      image: {
        src: img.shapePappardelle,
        alt: 'Breite Pappardelle aus frischem Eierteig auf einem bemehlten Holzbrett',
        w: 1000,
        h: 625,
      },
      answer:
        'Pappardelle sind das breiteste frische Pastaband des toskanischen Repertoires: flache Streifen Eierteig, 20 bis 30 Millimeter breit geschnitten. Die Breite ist keine Angeberei, sondern Zweck: Eine schwere, grobe Wildsoße braucht etwas, das breit genug ist, um darauf sitzen zu bleiben statt abzurutschen.',
      facts: [
        { label: 'Herkunft', value: 'Toskana' },
        { label: 'Teig', value: 'Eierteig: Mehl und Ei' },
        { label: 'Breite', value: '20–30 mm' },
        { label: 'Name von', value: 'pappare, kräftig zulangen' },
        { label: 'Klassische Soßen', value: 'Wildschwein, Hase, Ente, Steinpilze' },
        { label: 'Schwierigkeit', value: 'einfachstes Band: der breite Schnitt verzeiht am meisten' },
      ],
      sections: [
        {
          title: 'Ein Name, der sagt, wie man sie isst',
          paras: [
            'Das Wort kommt von <em>pappare</em>, einem unverblümten toskanischen Verb für kräftig zulangen oder verschlingen. Es ist kein feiner Name und es ist keine feine Pasta. Pappardelle serviert man, wenn die Soße seit dem Morgen auf dem Herd steht und alle hungrig sind.',
            'Sie sind speziell das Band der toskanischen Hügel: Während Tagliatelle zur Emilia und nach Bologna gehören, ist Pappardelle das, was im Herbst aus einer toskanischen Küche kommt, wenn die Jagdsaison beginnt und Wild zu verarbeiten ist.',
          ],
        },
        {
          title: 'Wie sie geschnitten werden',
          paras: [
            'Der Teig ist ein normaler frischer Eierteig, dünn ausgerollt: dünn genug, um den Schatten der eigenen Hand hindurch zu sehen, aber nicht dünner, denn ein breites Band muss Gewicht tragen. Dann bemehlen Sie die Bahn, rollen sie locker auf und schneiden quer durch die Rolle, 20 bis 30 Millimeter breit.',
            'Weil der Schnitt so breit ist, sind Pappardelle das nachsichtigste Band zum Lernen: eine wacklige Linie fällt bei 3 cm weit weniger auf als bei 6 mm. Sie garen außerdem schnell, zwei bis drei Minuten in gut gesalzenem Wasser, und müssen direkt in die Pfanne zur Soße, niemals in eine Schüssel zum Warten.',
          ],
        },
        {
          title: 'Was darauf gehört',
          paras: [
            '<strong>Ragù di cinghiale</strong> (Wildschwein, langsam geschmort mit Rotwein, Wacholder und Tomate) ist die Kombination, die diese Form berühmt gemacht hat, und sie bleibt die richtige Antwort. <strong>Lepre</strong>, Hase, ist die ältere und reichere Version und die, für die sich ein alter toskanischer Koch entscheiden würde, wenn er ihn bekommt.',
            'Über Wild hinaus vertragen Pappardelle wunderbar <strong>Entenragù</strong> und <strong>Steinpilze</strong> in den wenigen Wochen im Jahr, in denen die Pilze etwas taugen. Die Regel ist einfach: Wenn die Soße schwer und grob ist und stundenlang gekocht hat, will sie diese Form.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Wie breit sind Pappardelle?',
          a: 'Pappardelle werden 20 bis 30 mm breit geschnitten, also zwei bis drei Zentimeter, etwa zwei Fingerbreit. Unterhalb von rund 15 mm sind es keine Pappardelle mehr, sondern breite Tagliatelle.',
        },
        {
          q: 'Was ist der Unterschied zwischen Pappardelle und Tagliatelle?',
          a: 'Breite und Herkunft. Pappardelle werden 20–30 mm breit geschnitten und sind toskanisch, gemacht für schwere Wildsoßen wie Wildschwein und Hase. Tagliatelle werden 6–8 mm geschnitten, gehören zur Emilia-Romagna und passen zu feinerem Fleischragù und Pilzen. Der Teig ist in beiden Fällen derselbe.',
        },
        {
          q: 'Welche Soße ist zu Pappardelle traditionell?',
          a: 'Wildschweinragù (ragù di cinghiale) ist die klassische toskanische Kombination, mit Hase (lepre) als älterer und reicherer Alternative. Entenragù und frische Steinpilze sind die beiden anderen, die auf einer guten Karte in Florenz stehen.',
        },
        {
          q: 'Wie lange brauchen frische Pappardelle?',
          a: 'Zwei bis drei Minuten in reichlich gut gesalzenem kochendem Wasser, dann direkt in die Pfanne zur Soße. Frische Pasta gart weit schneller als getrocknete.',
        },
      ],
      compare: { dough: 'Eierteig', cut: 'Flaches Band, 20–30 mm', sauce: 'Wildschwein, Hase, Ente, Steinpilze' },
    },
    {
      slug: 'tagliatelle',
      name: 'Tagliatelle',
      h1Sub: 'Das Alltagsband aus Eierteig, erklärt.',
      tagline: 'Das Alltagsband, 6–8 mm, der natürliche Partner des Ragù.',
      title: 'Was sind Tagliatelle? Breite, Schnitt und Soßen',
      description:
        'Tagliatelle sind frische Bandnudeln aus Eierteig, 6–8 mm breit geschnitten, der Partner eines Fleischragù. Der Unterschied zu Fettuccine und Pappardelle.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nester frischer Tagliatelle auf einem bemehlten Brett',
        w: 1000,
        h: 625,
      },
      answer:
        'Tagliatelle sind flache Bänder frischer Eierpasta, etwa 6 bis 8 Millimeter breit geschnitten. Sie sind das Alltagsband Nord- und Mittelitaliens: schmal genug, um sie auf die Gabel zu drehen, breit genug, um ein richtiges Fleischragù zu tragen, weshalb sie die Form sind, die den meisten Menschen bei frischer Pasta zuerst einfällt.',
      facts: [
        { label: 'Herkunft', value: 'Emilia-Romagna, überall in der Toskana gemacht' },
        { label: 'Teig', value: 'Eierteig: Mehl und Ei' },
        { label: 'Breite', value: '6–8 mm' },
        { label: 'Name von', value: 'tagliare, schneiden' },
        { label: 'Klassische Soßen', value: 'Ragù, Pilze, Butter und Kräuter' },
        { label: 'Schwierigkeit', value: 'der Schnitt, der Messerführung lehrt' },
      ],
      sections: [
        {
          title: 'Das Band, an dem alles andere gemessen wird',
          paras: [
            'Tagliatelle kommen aus Bologna, wo die Breite ernst genug genommen wird, dass die örtliche Handelskammer einmal ein Referenzmaß hinterlegt hat, um Streitigkeiten zu beenden. Acht Millimeter gekocht ist der bolognesische Standard. In einer toskanischen Küche misst niemand nach, aber das Ziel ist dasselbe.',
            'Die Toskana kocht sie ständig, ungeachtet ihrer Herkunft, weil sie das nützliche Band sind: breit genug für eine substanzielle Soße, schmal genug, um sie ohne Kampf zu essen, und schnell genug für einen Dienstagabend statt für einen Anlass.',
          ],
        },
        {
          title: 'Wie sie geschnitten werden',
          paras: [
            'Rollen Sie den Eierteig zu einer dünnen Bahn, lassen Sie sie ein paar Minuten trocknen, bis sie ledrig statt klebrig ist (das ist der Schritt, den alle überspringen, und der Grund, warum ihre Bänder zusammenkleben), bemehlen Sie sie großzügig, rollen Sie sie locker flach auf und schneiden Sie quer mit einem scharfen Messer.',
            'Dann heben Sie jeden Schnitt sofort an und schütteln ihn locker. In der Rolle liegen gelassen verschweißen Bänder innerhalb von Minuten zu einem Ziegel. Wenden Sie sie in etwas Hartweizengrieß und legen Sie sie in lockeren Nestern ab, bis das Wasser kocht. Tagliatelle sind die Form, die Messerführung lehrt, denn bei 6 mm fällt ein wandernder Schnitt auf, wie er es bei Pappardelle nie tut.',
          ],
        },
        {
          title: 'Was darauf gehört',
          paras: [
            'Ein richtiges <strong>Ragù</strong> (langsam geschmortes Rinder- und Schweinehack mit Soffritto, Wein und sehr wenig Tomate) ist die Kombination, und in Bologna die einzige, zu der sich jemand bekennen wird. Beachten Sie, womit es nicht serviert wird: Spaghetti. Das ist eine ausländische Erfindung, und man wird Sie darauf hinweisen.',
            'Über das Ragù hinaus sind Tagliatelle hervorragend mit <strong>Pilzen</strong>, mit Butter und Salbei, wenn es leise sein soll, und mit einfacher <strong>Tomate und Basilikum</strong>, wenn die Tomaten wirklich gut sind. Das Band ist schmal genug, dass auch eine leichte Soße es noch richtig überzieht.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Wie breit sind Tagliatelle?',
          a: 'Tagliatelle werden 6 bis 8 mm breit geschnitten. Bei der Handelskammer in Bologna liegt ein Messingmaß, das die ideale gekochte Tagliatella auf 8 mm festlegt, was bedeutet, dass man roh bei etwa 6 bis 7 mm schneidet, weil Eierteig im Topf aufquillt.',
        },
        {
          q: 'Was ist der Unterschied zwischen Tagliatelle und Fettuccine?',
          a: 'Region und Maße. Tagliatelle kommen aus der Emilia-Romagna, sind rund 6–8 mm breit und sehr dünn. Fettuccine sind römisch, etwas schmaler geschnitten, aber deutlich dicker. In der Praxis sind sie nahe Verwandte und werden außerhalb Italiens oft austauschbar verwendet.',
        },
        {
          q: 'Warum kleben meine Tagliatelle zusammen?',
          a: 'Fast immer, weil die Teigbahn beim Schneiden noch klebrig war oder die Bänder nach dem Schneiden aufgerollt liegen blieben. Lassen Sie die Bahn zuerst ledrig antrocknen, bemehlen Sie gut und schütteln Sie jeden Schnitt locker, sobald er vom Messer kommt.',
        },
        {
          q: 'Wie dünn sollte der Teig sein?',
          a: 'Dünn genug, um die Form Ihrer Hand hindurch zu sehen, aber nicht so dünn, dass er beim Anheben reißt. Für Bänder ist das dünner, als Sie für gefüllte Formen ausrollen würden, weil keine Füllung schützt.',
        },
      ],
      compare: { dough: 'Eierteig', cut: 'Flaches Band, 6–8 mm', sauce: 'Fleischragù, Pilze, Butter' },
    },
    {
      slug: 'tortelli',
      name: 'Tortelli',
      h1Sub: 'Die gefüllte Pasta der Toskana, erklärt.',
      tagline: 'Das gefüllte Päckchen, in der Toskana meist mit Kartoffel.',
      title: 'Was sind Tortelli? Füllung, Form und Unterschiede',
      description:
        'Tortelli sind gefüllte Päckchen aus frischer Pasta; in der Toskana klassisch mit Kartoffel aus dem Mugello. Füllungen, Falten, Unterschied zu Ravioli.',
      image: {
        src: img.shapeTortelli,
        alt: 'Von Hand gefaltete gefüllte Tortelli auf einer bemehlten Fläche',
        w: 1000,
        h: 625,
      },
      answer:
        'Tortelli sind gefüllte Päckchen aus frischer Eierpasta: eine Teigbahn, ein Löffel Füllung, eine zweite Bahn darübergelegt und ringsum versiegelt. Die toskanische Signaturvariante sind <em>tortelli di patate</em>, gefüllt mit gewürzter Kartoffel statt mit Ricotta und Spinat, und sie kommen aus dem Mugello nördlich von Florenz.',
      facts: [
        { label: 'Herkunft', value: 'Mugello, nördlich von Florenz' },
        { label: 'Teig', value: 'Eierteig, etwas dicker ausgerollt' },
        { label: 'Klassische Füllung', value: 'Kartoffel; auch Ricotta und Spinat' },
        { label: 'Form', value: 'Quadrat oder Halbmond, von Hand versiegelt' },
        { label: 'Klassische Soßen', value: 'Butter und Salbei, Fleischragù, Pilze' },
        { label: 'Schwierigkeit', value: 'die Form, die die meiste Geduld verlangt' },
      ],
      sections: [
        {
          title: 'Die toskanische Füllung ist Kartoffel',
          paras: [
            'Bestellen Sie Tortelli im Mugello, dem hügeligen Land nördlich von Florenz, und was kommt, ist mit Kartoffel gefüllt, zerstampft mit Knoblauch, Petersilie, etwas Tomate und Parmesan, ordentlich gewürzt und manchmal mit Muskatnuss gehoben. Es überrascht alle, die Ricotta erwarten, und es ist eines der wirklich großen Regionalgerichte der Toskana.',
            'Der Grund ist der übliche: Kartoffeln wuchsen dort oben gut und Fleisch reichte nicht weit. Die andere toskanische Version, <em>tortelli maremmani</em>, verwendet Ricotta und Spinat und kommt aus der Maremma an der Küste. Beide sind richtig; sie stammen schlicht aus verschiedenen Tälern.',
          ],
        },
        {
          title: 'Wie sie gefaltet werden',
          paras: [
            'Rollen Sie die Bahn etwas dicker aus als für Bänder: Der Teig muss das Füllen, Versiegeln und Kochen überstehen, ohne aufzureißen. Legen Sie löffelweise Füllung in einer Reihe aus, mit ordentlichen Abständen, dann die zweite Bahn darüber und <em>rund um jedes Häufchen mit den Fingern andrücken</em>, sodass die Luft zum Rand hin entweicht, bevor Sie versiegeln.',
            'Eingeschlossene Luft ist es, die einen Tortello im Wasser platzen lässt, und sie ist der mit Abstand häufigste Fehler. Fest versiegeln, mit dem Rädchen schneiden und jeden Rand prüfen. Das ist die Form, die Menschen, die Freude daran haben, von Menschen in Eile trennt, und die, auf die unsere Gäste am Ende eines Kurses am stolzesten sind.',
          ],
        },
        {
          title: 'Was darauf gehört',
          paras: [
            'Sehr wenig, und das ist der Punkt. <strong>Butter und Salbei</strong> (aufgeschäumt, bis es nussig zu riechen beginnt, mit ein paar knusprigen Salbeiblättern) ist der Klassiker, und er ist schwer zu übertreffen. Ein zurückhaltendes <strong>Fleischragù</strong> ist die Sonntagsversion des Mugello.',
            'Was Tortelli ruiniert, ist eine Soße, die mit der Füllung konkurriert. Sie haben gerade eine Stunde damit verbracht, den Geschmack nach innen zu legen; begraben Sie ihn nicht. Im Zweifel: Butter, Salbei und geriebener Parmesan.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Was sind Tortelli?',
          a: 'Tortelli sind gefüllte Päckchen aus frischer Eierpasta, zwischen zwei Teigbahnen versiegelt, quadratisch oder als Halbmond. Sie sind größer als Ravioli und in der Toskana und der Emilia zu Hause. Die toskanische Klassikerfüllung ist Kartoffel, nicht Ricotta.',
        },
        {
          q: 'Was ist der Unterschied zwischen Tortelli, Tortellini und Ravioli?',
          a: 'Größe und Form, nicht das Prinzip: alle drei sind gefüllte Pasta. Tortelli sind die größeren quadratischen oder halbmondförmigen Päckchen aus der Toskana und der Emilia; Tortellini sind kleine Ringe aus Bologna, die in die Brühe kommen; Ravioli ist der allgemeine Begriff, meist ein kleineres Quadrat.',
        },
        {
          q: 'Womit werden toskanische Tortelli gefüllt?',
          a: 'Im Mugello nördlich von Florenz mit gewürzter Kartoffel, Knoblauch, Petersilie und Parmesan. In der Maremma an der Küste mit Ricotta und Spinat. Beides sind traditionelle toskanische Füllungen aus verschiedenen Teilen der Region.',
        },
        {
          q: 'Warum platzen meine Tortelli beim Kochen?',
          a: 'Eingeschlossene Luft, fast immer. Drücken Sie die obere Bahn mit den Fingern rund um jedes Füllungshäufchen an und arbeiten Sie die Luft nach außen, bevor Sie den Rand versiegeln. Schlecht versiegelte Ränder und zu dünn ausgerollter Teig sind die beiden anderen Ursachen.',
        },
      ],
      compare: { dough: 'Eierteig, etwas dicker', cut: 'Gefülltes Quadrat oder Halbmond', sauce: 'Butter und Salbei, leichtes Ragù' },
    },
    {
      slug: 'ravioli',
      name: 'Ravioli',
      h1Sub: 'Italiens gefülltes Päckchen, und wie die Toskana abweicht.',
      tagline: 'Das gefüllte Quadrat, das alle kennen, zwischen zwei Bahnen versiegelt.',
      title: 'Was sind Ravioli? Unterschied zu Tortelli & Tortellini',
      description:
        'Ravioli sind flache gefüllte Pastapäckchen zwischen zwei Teigbahnen. Was hineinkommt, wie groß sie sein sollten und wie sie sich von Tortelli abheben.',
      image: {
        src: img.shapeRavioli,
        alt: 'Frisch gemachte Ravioli, mit dem Rädchen geschnitten, auf einem bemehlten Brett',
        w: 1000,
        h: 625,
      },
      answer:
        'Ravioli sind flache Päckchen aus frischer Pasta: ein Häufchen Füllung auf einer Bahn Eierteig, eine zweite Bahn darüber, die Luft herausgearbeitet, das Ganze versiegelt und in Quadrate oder Kreise geschnitten. Ravioli ist der allgemeine italienische Begriff; in der Toskana und der Emilia heißt dieselbe Idee, etwas größer gemacht, <em>Tortelli</em>.',
      facts: [
        { label: 'Herkunft', value: 'ganz Italien; der allgemeine Begriff' },
        { label: 'Teig', value: 'Eierteig, etwas dicker ausgerollt' },
        { label: 'Klassische Füllung', value: 'Ricotta und Spinat, Muskat, Parmesan' },
        { label: 'Form', value: 'quadratisch oder rund, zwei Bahnen versiegelt' },
        { label: 'Größe', value: 'etwa 4–5 cm; Tortelli sind größer' },
        { label: 'Klassische Soßen', value: 'Butter und Salbei, Tomate, leichtes Ragù' },
      ],
      sections: [
        {
          title: 'Ravioli, Tortelli, Tortellini: wer ist wer',
          paras: [
            'Diese drei werden ständig verwechselt, und das ist verständlich, weil zwei davon fast dasselbe Wort sind. <strong>Ravioli</strong> ist der allgemeine italienische Begriff für ein flaches gefülltes Päckchen zwischen zwei Bahnen, meist ein Quadrat von etwa 4 bis 5 cm. <strong>Tortelli</strong> heißt dieselbe Idee in der Toskana und der Emilia, und unsere sind in der Regel größer, quadratisch oder als Halbmond.',
            '<strong>Tortellini</strong> sind etwas ganz anderes: winzige Ringe, entstanden durch das Falten eines kleinen gefüllten Quadrats um eine Fingerkuppe und das Verbinden der Enden, aus Bologna, und sie kommen in die Brühe statt an die Soße. Trotz der Endung sind sie keine kleinen Tortelli. Die vollständige Karte steht in unserem <a href="/de/blog/ravioli-vs-tortelli/">Guide zu Ravioli und Tortelli</a>.',
          ],
        },
        {
          title: 'Was hineinkommt',
          paras: [
            'Die Füllung, die den meisten vor Augen steht, ist <strong>Ricotta und Spinat</strong>, gewürzt mit Muskatnuss und Parmesan, und sie ist tatsächlich die verbreitetste. Fleisch, Kürbis (die Mantuaner Version mit Amaretti und Mostarda, an der sich die Geister scheiden), Pilze und Fisch haben alle ihre Region und ihre Saison.',
            'In der Toskana lautet die Antwort oft Kartoffel, weil das Mugello genau damit seine <a href="/de/pasta-formen/tortelli/">Tortelli</a> füllt. Was auch hineinkommt, es muss trocken genug sein, um zusammenzuhalten. Eine nasse Füllung weicht den Teig auf und nimmt die Versiegelung mit, weshalb Ricotta abtropfen und gekochter Spinat gut ausgedrückt werden sollte.',
          ],
        },
        {
          title: 'So versiegeln, dass sie den Topf überstehen',
          paras: [
            'Rollen Sie die Bahn eine Spur dicker aus als für Bänder: Eine gefüllte Form muss das Füllen, Versiegeln und Kochen überstehen. Legen Sie die Füllung in einer Reihe mit echten Abständen zwischen den Häufchen aus, denn sie zu dicht zu setzen macht das Versiegeln später unmöglich. Ein Teelöffel je Häufchen reicht.',
            'Dann der Teil, auf den es ankommt: die zweite Bahn darüberlegen und <em>rund um jedes Häufchen mit den Fingerkuppen andrücken</em>, nach außen arbeitend, damit die Luft entweicht statt eingeschlossen zu werden. Eingeschlossene Luft dehnt sich im kochenden Wasser aus, und genau das lässt einen Raviolo platzen. Fest versiegeln, mit dem Rädchen schneiden und vor dem Kochen einen Finger über jeden Rand führen.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Was ist der Unterschied zwischen Ravioli und Tortellini?',
          a: 'Die Faltung und der Teller. Tortellini sind winzige Ringe: ein kleines gefülltes Quadrat wird um eine Fingerkuppe gefaltet und an den Enden verbunden. Sie kommen aus Bologna und gehören in Brühe. Ravioli sind flache Päckchen, zwischen zwei Teigbahnen versiegelt, deutlich größer und werden mit Sauce serviert.',
        },
        {
          q: 'Was ist der Unterschied zwischen Ravioli und Tortelli?',
          a: 'Vor allem Größe und Region, weniger die Technik. Ravioli ist der landesweite Begriff für ein flaches gefülltes Päckchen, meist ein kleineres Quadrat. Tortelli heißt dieselbe Idee in der Toskana und der Emilia, und sie sind in der Regel größer. In der Toskana ist die klassische Füllung Kartoffel statt Ricotta.',
        },
        {
          q: 'Sind Tortellini kleine Tortelli?',
          a: 'Nein, obwohl die Endung -ini im Italienischen genau das nahelegt. Tortelli sind flache gefüllte Päckchen aus der Toskana und der Emilia. Tortellini sind gefaltete Ringe aus Bologna. Ähnlicher Name, andere Form, andere Stadt.',
        },
        {
          q: 'Warum platzen meine Ravioli beim Kochen?',
          a: 'Fast immer wegen eingeschlossener Luft. Drücken Sie die obere Teigbahn mit den Fingern rund um jedes Füllungshäufchen an und arbeiten Sie die Luft nach außen, bevor Sie den Rand versiegeln. Schlecht versiegelte Ränder, zu viel Füllung und zu dünn ausgerollter Teig sind die drei anderen Ursachen.',
        },
      ],
      compare: { dough: 'Eierteig, etwas dicker', cut: 'Versiegeltes Quadrat oder rund, 4–5 cm', sauce: 'Butter und Salbei, Tomate, leichtes Ragù' },
    },
  ],
};

// French cluster, added Aug 2026. France is the site best-converting blog
// locale after Germany (GSC, 16 Aug 2026: 3 clicks / 66 impressions, French
// blog pages at positions 4.0-9.27), and /fr/blog/ravioli-vs-tortelli/ at 35
// impressions is the second-biggest impression source on the whole site. Until
// now shapesHubPath() fell back to the English hub for fr, so the header and
// footer link on every French page pointed at an English destination.
const fr: ShapesLocale = {
  hubSlug: 'formes-de-pates',
  hubTitle: 'Formes de Pâtes : Tortelli, Ravioli, Pappardelle et Pici',
  hubDescription:
    'La bibliothèque d\'un chef : les cinq pâtes fraîches que nous enseignons à Florence. Ce qu\'est chacune, comment on la façonne, et la sauce qui va avec.',
  hubEyebrow: 'La bibliothèque des formes',
  hubHeading: 'Cinq formes,',
  hubHeadingItal: 'cinq sauces différentes.',
  hubLede:
    'Une forme n\'est pas une décoration. Chacune de celles-ci a été inventée pour retenir un type de sauce précis, et les intervertir est la raison pour laquelle un plat paraît parfois fade sans raison apparente. Voici ce qu\'est chacune, et à quoi elle sert.',
  hubAnswer:
    'Les cinq pâtes fraîches que nous roulons à la main dans notre cuisine de Florence sont les pici, les pappardelle, les tagliatelle, les tortelli et les ravioli. En bref :',
  hubAnswerList: [
    '<strong>Pici</strong> : gros brins roulés à la main, farine et eau, sans œuf. La pâte de Sienne, faite pour l\'aglione à l\'ail et le ragù de sanglier.',
    '<strong>Pappardelle</strong> : le ruban le plus large, 2 à 3 cm de pâte à l\'œuf. Conçu pour porter les sauces de gibier : sanglier, lièvre, canard.',
    '<strong>Tagliatelle</strong> : le ruban étroit à l\'œuf, 6 à 8 mm. Le ruban de tous les jours, pour le ragù de viande et les champignons.',
    '<strong>Tortelli</strong> : des paquets farcis, en Toscane le plus souvent à la pomme de terre ou à la ricotta et aux épinards. Assaisonnés simplement, beurre et sauge.',
    '<strong>Ravioli</strong> : la même idée que les tortelli, sous le nom qu\'emploie le reste de l\'Italie, en général plus petits. Plats, scellés entre deux abaisses.',
  ],
  hubFaqs: [
    {
      q: 'Pourquoi la forme des pâtes compte-t-elle ?',
      a: 'La forme décide de la quantité de sauce qui s\'accroche et de la sensation sous la dent. Un brin épais et rugueux comme le pico retient une sauce en morceaux qui glisserait d\'un ruban lisse ; une large pappardella donne à un ragù de gibier lourd quelque chose sur quoi se poser. Bien les associer, c\'est presque toute la différence entre une bonne assiette et une assiette terne.',
    },
    {
      q: 'Quelle est la différence entre les pappardelle et les tagliatelle ?',
      a: 'La largeur, et donc l\'usage. Les pappardelle se coupent à 2 ou 3 cm et sont faites pour les sauces de gibier lourdes, sanglier ou lièvre. Les tagliatelle se coupent à 6 ou 8 mm et conviennent aux ragù plus fins et aux champignons. Même pâte à l\'œuf, autre métier.',
    },
    {
      q: 'Quelle est la différence entre les ravioli et les tortelli ?',
      a: 'Surtout la taille et la région. Ravioli est le mot italien général pour un paquet farci plat, en général un petit carré. Tortelli est le nom que porte la même chose en Toscane et en Émilie, et ils sont normalement plus grands. Les tortellini sont encore autre chose : de minuscules anneaux bolonais, servis en bouillon.',
    },
    {
      q: 'Quelle forme toscane est la plus facile à faire à la main ?',
      a: 'Les pici, parce qu\'il n\'y a ni rouleau ni machine : on coupe une bande de pâte et on la roule sous les paumes. C\'est aussi la plus indulgente, car les pici doivent être irréguliers, et les tordus retiennent mieux la sauce.',
    },
    {
      q: 'Faut-il des œufs pour faire des pâtes fraîches ?',
      a: 'Non. Les pici se font avec de la farine, de l\'eau et un filet d\'huile d\'olive, la pâte des cuisines pauvres de Toscane centrale. Les rubans comme les tagliatelle et les pappardelle, et les formes farcies comme les tortelli, utilisent en revanche une pâte à l\'œuf, pour l\'élasticité et la richesse qu\'elles demandent.',
    },
  ],
  labels: {
    home: 'Accueil',
    hubCrumb: 'Formes de pâtes',
    tableHeading: 'Côte à côte',
    colShape: 'Forme',
    colDough: 'Pâte',
    colCut: 'Coupe',
    colSauce: 'Faite pour',
    readMore: 'Lire la forme',
    backToHub: 'Toutes les formes',
    faqHeading: 'Vos questions, nos réponses.',
    ctaHeading: 'Roulez-les vous-même.',
    ctaBody:
      'Nous enseignons ces cinq formes en trois heures dans notre cuisine de l\'Oltrarno : les mains dans la farine dès la première minute, puis tout le monde s\'assoit pour manger ce qu\'il a fait. 8 invités maximum, 95 €.',
    ctaButton: 'Réserver un cours de pâtes',
    ctaLink: 'Voir le cours',
    guideHeading: 'Pour aller plus loin',
    guideBody: 'Notre guide complet des traditions de pâtes fraîches en Toscane : d\'où vient chaque forme et pourquoi la région cuisine comme elle le fait.',
    guideLink: 'Lire le guide des pâtes toscanes',
  },
  classHref: '/fr/cours-de-pates-fraiches-florence/',
  guideHref: '/fr/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: 'La pâte roulée à la main de Toscane, expliquée.',
      tagline: 'Le gros brin roulé à la main de Sienne : farine, eau, sans œuf.',
      title: 'Qu\'est-ce que les Pici ? Pâte, Roulage et Sauces',
      description:
        'Les pici sont une pâte toscane épaisse, roulée à la main, de farine et d\'eau, sans œuf. D\'où ils viennent, comment les rouler, et leurs quatre sauces.',
      image: {
        src: img.shapePici,
        alt: 'Gros brins de pici roulés à la main et farinés sur une planche en bois',
        w: 1000,
        h: 625,
      },
      answer:
        'Les pici sont une pâte épaisse, roulée à la main, du sud de la Toscane, faite de rien d\'autre que de farine, d\'eau et d\'un filet d\'huile d\'olive, sans œuf. Chaque brin est roulé sous les paumes plutôt que coupé au couteau ou à la machine, et c\'est pourquoi il n\'y en a pas deux de la même épaisseur et pourquoi la surface reste assez rugueuse pour accrocher une sauce lourde.',
      facts: [
        { label: 'Origine', value: 'Sienne et le Val d\'Orcia' },
        { label: 'Pâte', value: 'farine, eau, huile d\'olive ; sans œuf' },
        { label: 'Façonnage', value: 'roulé sous les paumes' },
        { label: 'Épaisseur', value: 'environ 3 mm, volontairement irrégulière' },
        { label: 'Sauces classiques', value: 'aglione, sanglier, cacio e pepe, briciole' },
        { label: 'Difficulté', value: 'la forme la plus indulgente à apprendre' },
      ],
      sections: [
        {
          title: 'D\'où viennent les pici',
          paras: [
            'Les pici appartiennent aux collines au sud de Sienne (le Val d\'Orcia, Montalcino, Montepulciano), et ils sont anciens. Il y a dans une tombe étrusque de Tarquinia une fresque qui semble montrer quelque chose de très proche, ce que les gens du coin vous raconteront longuement et avec assurance.',
            'Ce qui est certain, c\'est que les pici sont une nourriture de pauvre. Pas d\'œuf, parce que les œufs valaient de l\'argent et partaient au marché. Juste la farine la moins chère, l\'eau du robinet, et la seule chose que chaque ferme possédait : du temps, et une paire de mains. Voilà toute la recette, et c\'est pourquoi la forme a survécu : on peut la faire avec rien.',
          ],
        },
        {
          title: 'Comment on les roule',
          paras: [
            'On étale une plaque de pâte d\'environ un centimètre d\'épaisseur, on la coupe en bandes, puis on travaille chaque bande sous les paumes à plat, du milieu vers l\'extérieur, jusqu\'à ce qu\'elle s\'étire en un long brin épais. Le verbe est <em>appiciare</em>, et c\'est de là que vient le nom.',
            'L\'erreur que tout le monde fait au début est d\'appuyer trop fort, ce qui aplatit le brin en ruban au lieu de l\'arrondir. La deuxième erreur est de chercher la perfection. Les pici sont censés être irréguliers : les parties grasses et fines font le caractère du plat, et une surface rugueuse et un peu irrégulière retient la sauce bien mieux qu\'une surface lisse extrudée ne le fera jamais.',
          ],
        },
        {
          title: 'Comment les assaisonner',
          paras: [
            'Quatre sauces méritent le nom. L\'<strong>aglione</strong> (une sauce lente à la tomate et à l\'ail, bâtie sur l\'énorme et doux ail toscan aglione) est la sauce définitive ; demandez des <em>pici all\'aglione</em> partout au sud de Sienne. Le <strong>ragù di cinghiale</strong>, le sanglier, est la version d\'automne et la raison pour laquelle les pici sont assez épais pour lui tenir tête.',
            'Le <strong>cacio e pepe</strong> fonctionne à merveille parce que la surface rugueuse attrape le fromage, et les <strong>pici alle briciole</strong> (chapelure grillée, ail, huile) sont les plus anciens et les plus pauvres, et discrètement l\'une des meilleures choses de la cuisine toscane. Ce que vous ne trouverez pas sur de vrais pici, c\'est de la crème.',
          ],
        },
      ],
      faqs: [
        {
          q: 'De quoi sont faits les pici ?',
          a: 'De farine, d\'eau et généralement d\'un filet d\'huile d\'olive. Sans œuf : c\'est la caractéristique qui les définit et la raison pour laquelle ils étaient abordables pour les familles paysannes du sud de la Toscane.',
        },
        {
          q: 'Les pici sont-ils la même chose que des gros spaghettis ?',
          a: 'Non. Les spaghettis sont extrudés à travers une filière et ressortent parfaitement ronds, uniformes et lisses. Les pici sont roulés à la main, donc irréguliers sur leur longueur et légèrement rugueux en surface, ce qui change la quantité de sauce qui s\'y accroche.',
        },
        {
          q: 'Quelle sauce va avec les pici ?',
          a: 'Traditionnellement quatre : l\'aglione (tomate et ail doux toscan), le ragù de sanglier, le cacio e pepe, et les briciole, chapelure grillée à l\'ail et à l\'huile. Les quatre sont choisies parce qu\'elles s\'accrochent à un brin épais et rugueux.',
        },
        {
          q: 'Les pici sont-ils difficiles à faire à la maison ?',
          a: 'C\'est la pâte fraîche la plus facile pour commencer, parce qu\'il ne faut ni machine ni rouleau, seulement vos mains et une planche. Ils sont longs plutôt que difficiles : rouler assez de pici pour quatre prend un moment, et c\'est exactement pourquoi c\'était un travail de famille entière.',
        },
      ],
      compare: { dough: 'Farine et eau, sans œuf', cut: 'Roulé à la main, environ 3 mm', sauce: 'Aglione, sanglier, cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: 'Le ruban de pâte le plus large de Toscane, expliqué.',
      tagline: 'Le ruban le plus large, fait pour le sanglier et le lièvre.',
      title: 'Qu\'est-ce que les Pappardelle ? Largeur, Origine et Sauces',
      description:
        'Les pappardelle sont de larges rubans de pâte à l\'œuf, de 2 à 3 cm, faits pour les sauces de gibier. La coupe, la pâte et les accords classiques.',
      image: {
        src: img.shapePappardelle,
        alt: 'Larges rubans de pappardelle de pâte fraîche à l\'œuf sur une planche farinée',
        w: 1000,
        h: 625,
      },
      answer:
        'Les pappardelle sont le ruban de pâte fraîche le plus large du répertoire toscan : des bandes plates de pâte à l\'œuf coupées de 2 à 3 centimètres. La largeur n\'est pas de l\'esbroufe : elle existe pour qu\'une sauce de gibier lourde et en morceaux ait une surface assez large sur laquelle se poser au lieu de glisser.',
      facts: [
        { label: 'Origine', value: 'Toscane' },
        { label: 'Pâte', value: 'pâte à l\'œuf : farine et œufs' },
        { label: 'Largeur', value: '2 à 3 cm' },
        { label: 'Nom venu de', value: 'pappare, manger goulûment' },
        { label: 'Sauces classiques', value: 'sanglier, lièvre, canard, cèpes' },
        { label: 'Difficulté', value: 'le ruban le plus facile : la coupe large pardonne' },
      ],
      sections: [
        {
          title: 'Un nom qui vous dit comment les manger',
          paras: [
            'Le mot vient de <em>pappare</em>, un verbe toscan sans détour qui veut dire manger goulûment. Ce n\'est pas un nom délicat et ce n\'est pas une pâte délicate. Les pappardelle, on les sert quand la sauce est sur le feu depuis le matin et que tout le monde a faim.',
            'Elles sont le ruban des collines toscanes au sens strict : là où les tagliatelle appartiennent à l\'Émilie et à Bologne, les pappardelle sont ce qui sort d\'une cuisine toscane en automne, quand la chasse s\'ouvre et qu\'il y a du gibier à traiter.',
          ],
        },
        {
          title: 'Comment on les coupe',
          paras: [
            'La pâte est une abaisse fraîche à l\'œuf ordinaire, étalée fin : assez pour voir l\'ombre de la main au travers, mais pas plus, parce qu\'un ruban large doit porter du poids. Ensuite on farine l\'abaisse, on l\'enroule sans serrer et on coupe en travers au couteau, à deux ou trois centimètres.',
            'Justement parce que la coupe est si large, les pappardelle sont le ruban le plus indulgent à apprendre : une ligne de travers se voit beaucoup moins à 3 cm qu\'à 6 mm. Elles cuisent vite aussi (deux ou trois minutes dans une eau bien salée), et doivent aller droit dans la poêle avec la sauce, jamais dans un saladier à attendre.',
          ],
        },
        {
          title: 'Comment les assaisonner',
          paras: [
            'Le <strong>ragù de sanglier</strong> (mijoté au vin rouge, au genièvre et à la tomate) est l\'accord qui a rendu cette forme célèbre, et il reste la bonne réponse. Le <strong>lièvre</strong> est la version plus ancienne et plus riche, celle que choisirait un vieux cuisinier toscan s\'il pouvait s\'en procurer.',
            'Au-delà du gibier, les pappardelle s\'entendent très bien avec le <strong>ragù de canard</strong> et avec les <strong>cèpes</strong> pendant les quelques semaines de l\'année où ils valent la peine. La règle est simple : si la sauce est lourde, en morceaux et sur le feu depuis des heures, c\'est cette forme qu\'elle veut.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la différence entre les pappardelle et les tagliatelle ?',
          a: 'La largeur et l\'origine. Les pappardelle se coupent de 2 à 3 cm et sont toscanes, faites pour les sauces de gibier lourdes comme le sanglier et le lièvre. Les tagliatelle se coupent de 6 à 8 mm et appartiennent à l\'Émilie-Romagne, convenant aux ragù de viande plus fins et aux champignons. La pâte est la même dans les deux cas.',
        },
        {
          q: 'Quelle sauce est traditionnelle avec les pappardelle ?',
          a: 'Le ragù de sanglier est l\'accord toscan classique, avec le lièvre comme alternative plus ancienne et plus riche. Le ragù de canard et les cèpes frais sont les deux autres que vous verrez sur une bonne carte à Florence.',
        },
        {
          q: 'Les pappardelle sont-elles faites avec des œufs ?',
          a: 'Oui. Les pappardelle sont une pâte à l\'œuf (farine et œufs entiers), ce qui donne au large ruban l\'élasticité et la force dont il a besoin pour porter une sauce lourde sans se déchirer.',
        },
        {
          q: 'Combien de temps cuisent des pappardelle fraîches ?',
          a: 'Deux à trois minutes dans une grande quantité d\'eau bouillante bien salée, puis directement dans la poêle avec la sauce pour finir. La pâte fraîche cuit bien plus vite que la sèche, et les pappardelle sont en général la première chose dans l\'assiette.',
        },
      ],
      compare: { dough: 'Pâte à l\'œuf', cut: 'Ruban plat, 2 à 3 cm', sauce: 'Sanglier, lièvre, canard, cèpes' },
    },
    {
      slug: 'tagliatelle',
      name: 'Tagliatelle',
      h1Sub: 'Le ruban de pâte à l\'œuf de tous les jours, expliqué.',
      tagline: 'Le ruban de tous les jours, 6 à 8 mm, partenaire naturel du ragù.',
      title: 'Qu\'est-ce que les Tagliatelle ? Largeur, Coupe et Sauces',
      description:
        'Les tagliatelle sont des rubans de pâte à l\'œuf coupés de 6 à 8 mm, le partenaire naturel d\'un ragù de viande. La différence avec les fettuccine.',
      image: {
        src: img.shapeTagliatelle,
        alt: 'Nids de tagliatelle fraîches posés sur une planche farinée',
        w: 1000,
        h: 625,
      },
      answer:
        'Les tagliatelle sont des rubans plats de pâte fraîche à l\'œuf, coupés à environ 6 à 8 millimètres de large. Elles sont le ruban de tous les jours du nord et du centre de l\'Italie : assez étroites pour s\'enrouler sur une fourchette, assez larges pour porter un vrai ragù de viande, et c\'est pourquoi elles sont la forme que la plupart des gens imaginent en pensant aux pâtes fraîches.',
      facts: [
        { label: 'Origine', value: 'Émilie-Romagne, faites dans toute la Toscane' },
        { label: 'Pâte', value: 'pâte à l\'œuf : farine et œufs' },
        { label: 'Largeur', value: '6 à 8 mm' },
        { label: 'Nom venu de', value: 'tagliare, couper' },
        { label: 'Sauces classiques', value: 'ragù, champignons, beurre et herbes' },
        { label: 'Difficulté', value: 'la coupe qui vous apprend le couteau' },
      ],
      sections: [
        {
          title: 'Le ruban auquel on mesure tous les autres',
          paras: [
            'Les tagliatelle viennent de Bologne, où la largeur est prise assez au sérieux pour que la chambre de commerce locale ait un jour déposé une bande de référence en or afin de trancher les disputes. Huit millimètres une fois cuites, voilà le standard bolonais. Personne ne mesure dans une cuisine toscane, mais la cible est la même.',
            'La Toscane en cuisine sans arrêt, peu importe où elles sont nées, parce que c\'est le ruban utile : assez large pour une sauce consistante, assez étroit pour se manger sans bagarre, et assez rapide pour être un dîner de mardi plutôt qu\'une occasion.',
          ],
        },
        {
          title: 'Comment on les coupe',
          paras: [
            'Étalez la pâte à l\'œuf en une abaisse fine, laissez-la sécher quelques minutes jusqu\'à ce qu\'elle soit cuirée plutôt que collante (c\'est l\'étape que les gens sautent, et c\'est pourquoi leurs rubans se collent), puis farinez-la généreusement, roulez-la en un boudin plat et lâche et coupez en travers avec un couteau bien aiguisé.',
            'Ensuite, soulevez chaque coupe immédiatement et secouez-la pour la détacher. Laissés dans le rouleau, les rubans se soudent en brique en quelques minutes. Roulez-les dans un peu de semoule et enroulez-les en nids lâches jusqu\'à ce que l\'eau bout. Les tagliatelle sont la forme qui vous apprend la maîtrise du couteau, parce qu\'à 6 mm une coupe qui dévie se voit comme jamais sur des pappardelle.',
          ],
        },
        {
          title: 'Comment les assaisonner',
          paras: [
            'Un vrai <strong>ragù</strong> (bœuf et porc hachés mijotés avec un soffritto, du vin et très peu de tomate) est l\'accord, et à Bologne c\'est le seul que quiconque admettra. Notez avec quoi il ne se sert pas : les spaghettis. C\'est une invention étrangère et on vous le fera remarquer.',
            'Au-delà du ragù, les tagliatelle sont superbes avec les <strong>champignons</strong>, avec du beurre et de la sauge quand on veut quelque chose de calme, et avec une simple <strong>tomate et basilic</strong> quand les tomates sont vraiment bonnes. Le ruban est assez étroit pour qu\'une sauce légère l\'enrobe correctement.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la différence entre les tagliatelle et les fettuccine ?',
          a: 'La région et les dimensions. Les tagliatelle viennent d\'Émilie-Romagne et se coupent autour de 6 à 8 mm de large, très fines. Les fettuccine sont romaines, coupées un peu plus étroites mais nettement plus épaisses. En pratique ce sont des cousines proches, souvent employées l\'une pour l\'autre hors d\'Italie.',
        },
        {
          q: 'Quelle sauce va avec les tagliatelle ?',
          a: 'Un ragù de viande mijoté est le classique et, à Bologne, en pratique la seule réponse acceptée. Les champignons, le beurre et la sauge, ou une bonne tomate basilic fonctionnent aussi très bien : le ruban est assez étroit pour que les sauces légères l\'enrobent encore.',
        },
        {
          q: 'Pourquoi mes tagliatelle se collent-elles ?',
          a: 'Presque toujours parce que l\'abaisse était encore collante au moment de la coupe, ou parce que les rubans sont restés enroulés après. Laissez l\'abaisse sécher jusqu\'à une sensation de cuir, farinez bien, et secouez chaque coupe dès qu\'elle sort du couteau.',
        },
        {
          q: 'Quelle finesse doit avoir la pâte ?',
          a: 'Assez fine pour voir la forme de votre main au travers, mais pas au point qu\'elle se déchire quand vous la soulevez. Pour des rubans, c\'est plus fin que ce que vous étaleriez pour des formes farcies, parce qu\'il n\'y a pas de farce à protéger.',
        },
      ],
      compare: { dough: 'Pâte à l\'œuf', cut: 'Ruban plat, 6 à 8 mm', sauce: 'Ragù de viande, champignons, beurre' },
    },
    {
      slug: 'tortelli',
      name: 'Tortelli',
      h1Sub: 'La pâte farcie de Toscane, expliquée.',
      tagline: 'Le paquet farci, en Toscane le plus souvent à la pomme de terre.',
      title: 'Tortelli : Différences avec les Ravioli et Tortellini',
      description:
        'Les tortelli sont des paquets de pâte fraîche farcie ; en Toscane, la farce classique est la pomme de terre du Mugello. Les farces et le pliage.',
      image: {
        src: img.shapeTortelli,
        alt: 'Tortelli farcis pliés à la main disposés sur une surface farinée',
        w: 1000,
        h: 625,
      },
      answer:
        'Les tortelli sont des paquets de pâte fraîche à l\'œuf farcie : une abaisse de pâte, une cuillerée de farce, une seconde abaisse pressée dessus et scellée autour. La version signature de la Toscane est le <em>tortelli di patate</em>, farci de pomme de terre assaisonnée plutôt que de la ricotta et des épinards auxquels s\'attendent la plupart des visiteurs, et il vient de la vallée du Mugello au nord de Florence.',
      facts: [
        { label: 'Origine', value: 'le Mugello, au nord de Florence' },
        { label: 'Pâte', value: 'pâte à l\'œuf, étalée un peu plus épaisse' },
        { label: 'Farce classique', value: 'pomme de terre ; aussi ricotta et épinards' },
        { label: 'Forme', value: 'carré ou demi-lune, scellé à la main' },
        { label: 'Sauces classiques', value: 'beurre et sauge, ragù, champignons' },
        { label: 'Difficulté', value: 'la forme qui demande le plus de patience' },
      ],
      sections: [
        {
          title: 'En Toscane, la farce est la pomme de terre',
          paras: [
            'Demandez des tortelli dans le Mugello, la campagne vallonnée au nord de Florence, et ce qui arrive est farci de pomme de terre, écrasée avec de l\'ail, du persil, un peu de tomate et du parmesan, assaisonnée comme il faut et parfois relevée à la noix de muscade. Cela surprend les gens qui attendent de la ricotta, et c\'est l\'un des grands plats régionaux de Toscane.',
            'La raison est la même que toujours : les pommes de terre poussaient bien là-haut et la viande n\'allait pas loin. L\'autre version toscane, les <em>tortelli maremmani</em>, utilise ricotta et épinards et vient de la Maremme côtière. Les deux sont justes ; elles viennent simplement de vallées différentes.',
          ],
        },
        {
          title: 'Comment on les plie',
          paras: [
            'Étalez l\'abaisse un peu plus épaisse que pour des rubans : la pâte doit survivre au remplissage, au scellage et à l\'ébullition sans se fendre. Disposez des cuillerées de farce en ligne, en laissant de vrais écarts, puis posez la seconde abaisse par-dessus et pressez <em>autour de chaque monticule avec les doigts</em>, en poussant l\'air vers le bord avant de sceller.',
            'L\'air emprisonné est ce qui fait éclater un tortello dans l\'eau, et c\'est l\'échec le plus courant. Scellez fermement, coupez à la roulette et vérifiez chaque bord. C\'est la forme qui sépare ceux qui prennent leur temps de ceux qui sont pressés, et celle dont nos invités sont les plus fiers à la fin d\'un cours.',
          ],
        },
        {
          title: 'Comment les assaisonner',
          paras: [
            'Très peu, et c\'est tout l\'intérêt. Le <strong>beurre et la sauge</strong> (mousseux jusqu\'à sentir la noisette, avec quelques feuilles de sauge croustillantes) sont le classique, et il est difficile de faire mieux. Un <strong>ragù de viande</strong> mesuré est la version du dimanche dans le Mugello.',
            'Ce qui ruine les tortelli, c\'est une sauce qui rivalise avec la farce. Vous avez passé une heure à faire quelque chose dont le goût est à l\'intérieur ; ne l\'enterrez pas. Dans le doute : beurre, sauge et un peu de parmesan râpé.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la différence entre tortelli, tortellini et ravioli ?',
          a: 'La taille et la forme plutôt que le principe : tous trois sont des pâtes farcies. Les tortelli sont les plus grands paquets carrés ou en demi-lune, courants en Toscane et en Émilie ; les tortellini sont de petits anneaux de Bologne ; ravioli est le terme général large, en général un carré plus petit. Les appellations régionales se chevauchent et les locaux ne seront jamais d\'accord entre eux.',
        },
        {
          q: 'Avec quoi les tortelli toscans sont-ils farcis ?',
          a: 'Dans le Mugello, au nord de Florence, la farce classique est la pomme de terre assaisonnée avec ail, persil et parmesan. Dans la Maremme, sur la côte, ricotta et épinards. Les deux sont des farces toscanes traditionnelles, venues de parties différentes de la région.',
        },
        {
          q: 'Pourquoi mes tortelli éclatent-ils à la cuisson ?',
          a: 'De l\'air emprisonné à l\'intérieur, presque à chaque fois. Pressez l\'abaisse du dessus autour de chaque monticule de farce avec les doigts et chassez l\'air vers l\'extérieur avant de sceller le bord. Des bords mal scellés et une pâte trop finement étalée sont les deux autres causes.',
        },
        {
          q: 'Quelle sauce servir avec les tortelli ?',
          a: 'Quelque chose de simple qui ne combat pas la farce. Beurre et sauge avec du parmesan râpé est le classique ; un ragù de viande mesuré est la version du dimanche dans le Mugello. Les sauces lourdes ou très assaisonnées enterrent le goût que vous venez de passer une heure à construire.',
        },
      ],
      compare: { dough: 'Pâte à l\'œuf, un peu plus épaisse', cut: 'Carré ou demi-lune farci', sauce: 'Beurre et sauge, ragù léger' },
    },
    {
      slug: 'ravioli',
      name: 'Ravioli',
      h1Sub: 'Le paquet farci de l\'Italie, et ce qui change en Toscane.',
      tagline: 'Le carré farci que tout le monde connaît, scellé entre deux abaisses.',
      title: 'Ravioli : Farce, Forme et Différence avec les Tortelli',
      description:
        'Les ravioli sont des paquets plats de pâte farcie scellés entre deux abaisses. Ce qu\'on met dedans, leur taille, et ce qui les distingue des tortelli.',
      image: {
        src: img.shapeRavioli,
        alt: 'Ravioli fraîchement faits, coupés à la roulette sur une planche farinée',
        w: 1000,
        h: 625,
      },
      answer:
        'Les ravioli sont des paquets plats de pâte fraîche : un monticule de farce posé sur une abaisse de pâte à l\'œuf, une seconde abaisse pressée par-dessus, l\'air chassé, et le tout scellé et coupé en carrés ou en ronds. Ravioli est le terme italien large employé partout ; en Toscane et en Émilie, la même idée, en plus grand, s\'appelle <em>tortelli</em>.',
      facts: [
        { label: 'Origine', value: 'toute l\'Italie ; le terme général' },
        { label: 'Pâte', value: 'pâte à l\'œuf, étalée un peu plus épaisse' },
        { label: 'Farce classique', value: 'ricotta et épinards, muscade, parmesan' },
        { label: 'Forme', value: 'carré ou rond, deux abaisses scellées' },
        { label: 'Taille', value: 'environ 4 à 5 cm ; les tortelli sont plus grands' },
        { label: 'Sauces classiques', value: 'beurre et sauge, tomate, ragù léger' },
      ],
      sections: [
        {
          title: 'Ravioli, tortelli, tortellini : lequel est lequel',
          paras: [
            'Ces trois-là sont constamment confondus, et la confusion se comprend parce que deux d\'entre eux sont presque le même mot. <strong>Ravioli</strong> est le terme italien général pour un paquet farci plat scellé entre deux abaisses, en général un carré d\'environ 4 à 5 cm. <strong>Tortelli</strong> est le nom que porte la même idée en Toscane et en Émilie, et les nôtres sont typiquement plus grands, carrés ou en demi-lune.',
            'Les <strong>tortellini</strong> sont tout autre chose : de minuscules anneaux, faits en pliant un petit carré farci autour du bout du doigt et en joignant les extrémités, venus de Bologne, et servis en bouillon plutôt qu\'avec une sauce. Malgré la terminaison, ce ne sont pas de petits tortelli. La carte complète de la famille est dans notre <a href="/fr/blog/ravioli-vs-tortelli/">guide ravioli contre tortelli</a>.',
          ],
        },
        {
          title: 'Ce qu\'on met dedans',
          paras: [
            'La farce que la plupart des gens imaginent est la <strong>ricotta et les épinards</strong>, assaisonnée de muscade et de parmesan, et c\'est effectivement la plus répandue. La viande, le potiron (la version de Mantoue, avec amaretti et mostarda, qui divise), les champignons et le poisson ont tous leurs régions et leurs saisons.',
            'En Toscane la réponse est souvent la pomme de terre, parce que c\'est ce dont le Mugello farcit ses <a href="/fr/formes-de-pates/tortelli/">tortelli</a>. Quoi qu\'on mette dedans, il faut que ce soit assez sec pour tenir. Une farce humide pleure dans la pâte et emporte le scellage avec elle, et c\'est pourquoi la ricotta doit être égouttée et les épinards cuits bien pressés.',
          ],
        },
        {
          title: 'Les sceller pour qu\'ils survivent à la casserole',
          paras: [
            'Étalez l\'abaisse un rien plus épaisse que pour des rubans : une forme farcie doit survivre au garnissage, au scellage et à l\'ébullition. Posez la farce en ligne avec de vrais écarts entre les monticules, parce que les serrer est ce qui rend le scellage impossible ensuite. Une cuillère à café chacun suffit largement.',
            'Puis la partie qui compte : posez la seconde abaisse par-dessus et pressez <em>autour de chaque monticule du bout des doigts</em>, en travaillant vers l\'extérieur pour que l\'air s\'échappe au lieu de rester piégé. L\'air emprisonné se dilate dans l\'eau bouillante et c\'est ce qui fait éclater un raviolo. Scellez fermement, coupez à la roulette, et passez un doigt sur chaque bord avant qu\'ils n\'approchent de la casserole.',
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la différence entre les ravioli et les tortelli ?',
          a: 'Surtout la taille et la région, plutôt que la technique. Ravioli est le terme national large pour un paquet farci plat, en général un carré plus petit scellé entre deux abaisses. Tortelli est le nom que porte la même idée en Toscane et en Émilie, et ils sont typiquement plus grands. En Toscane la farce classique est la pomme de terre plutôt que la ricotta.',
        },
        {
          q: 'Ravioli et tortellini, est-ce la même chose ?',
          a: 'Non. Les tortellini sont de minuscules anneaux pliés autour du bout du doigt et joints aux extrémités, venus de Bologne, traditionnellement servis en bouillon. Les ravioli sont des paquets plats scellés entre deux abaisses et servis avec une sauce. La ressemblance des noms est une coïncidence de diminutifs italiens, pas un air de famille.',
        },
        {
          q: 'Comment dit-on un seul ravioli ?',
          a: 'Un raviolo. Ravioli est le pluriel, de la même façon que panini est le pluriel de panino. Cela vaut aussi pour tortello et tortelli, et pour tortellino et tortellini.',
        },
        {
          q: 'Pourquoi mes ravioli éclatent-ils à la cuisson ?',
          a: 'Presque toujours de l\'air emprisonné. Pressez l\'abaisse du dessus autour de chaque monticule de farce avec les doigts et chassez l\'air vers l\'extérieur avant de sceller le bord. Des bords mal scellés, un excès de farce et une pâte trop finement étalée sont les trois autres causes.',
        },
      ],
      compare: { dough: 'Pâte à l\'œuf, un peu plus épaisse', cut: 'Carré ou rond scellé, 4 à 5 cm', sauce: 'Beurre et sauge, tomate, ragù léger' },
    },
  ],
};

// Chinese cluster, added Aug 2026. Same fallback leak as French: every /zh/
// page linked its nav out to the English hub. Volume is small but positions
// are the best on the site (ZH pages rank 2-10), so the pages are cheap to
// justify and the sitewide language leak is the real reason to ship them.
const zh: ShapesLocale = {
  hubSlug: 'yidali-mian-xingzhuang',
  hubTitle: '意面形状：Tortelli、Ravioli、Pappardelle 与 Pici',
  hubDescription:
    '一位主厨的形状图书馆：我们在佛罗伦萨教授的五种新鲜意面。每一种是什么、如何用手擀制，以及它天生适合的酱汁。附对照表。',
  hubEyebrow: '形状图书馆',
  hubHeading: '五种形状，',
  hubHeadingItal: '五种不同的酱汁。',
  hubLede:
    '形状不是装饰。这里的每一种都是为了兜住某一类酱汁而被发明出来的，把它们换错，正是一道菜有时莫名寡淡的原因。以下是每一种是什么，以及它是做什么用的。',
  hubAnswer:
    '我们在佛罗伦萨厨房里手工擀制的五种新鲜意面是 pici、pappardelle、tagliatelle、tortelli 和 ravioli。简单来说：',
  hubAnswerList: [
    '<strong>Pici</strong>：用面粉和水手搓的粗面条，不加鸡蛋。锡耶纳的意面，为蒜香 aglione 和野猪肉酱而生。',
    '<strong>Pappardelle</strong>：最宽的面带，2 至 3 厘米的蛋面团。为承载浓重的野味酱汁而做：野猪、野兔、鸭。',
    '<strong>Tagliatelle</strong>：窄一些的蛋面带，6 至 8 毫米。搭配肉酱和蘑菇的日常面带。',
    '<strong>Tortelli</strong>：带馅的面饺，在托斯卡纳最常见的是土豆馅或乳清干酪配菠菜。调味极简，黄油配鼠尾草。',
    '<strong>Ravioli</strong>：和 tortelli 是同一个思路，用的是意大利其他地区通行的名字，通常更小。扁平，在两张面皮之间封口。',
  ],
  hubFaqs: [
    {
      q: '意面的形状为什么重要？',
      a: '形状决定了能挂住多少酱汁，以及入口的口感。像 pici 这样粗糙厚实的面条能抓住带块的浓酱，而这种酱从光滑的面带上会直接滑掉；宽阔的 pappardella 则给厚重的野味肉酱提供了落脚的地方。搭配得当，几乎就是一盘好菜和一盘平庸之作的全部差别。',
    },
    {
      q: 'Pappardelle 和 tagliatelle 有什么区别？',
      a: '宽度，以及由此决定的用途。Pappardelle 切成 2 至 3 厘米宽，是为野猪、野兔这类厚重带块的野味酱汁而做的。Tagliatelle 切成 6 至 8 毫米，适合更细腻的肉酱和蘑菇。同样的蛋面团，不同的活儿。',
    },
    {
      q: 'Ravioli 和 tortelli 有什么区别？',
      a: '主要是大小和产地。Ravioli 是意大利语中对扁平带馅面饺的通称，通常是较小的方形。Tortelli 是同样的东西在托斯卡纳和艾米利亚的叫法，一般更大。Tortellini 则完全是另一回事：来自博洛尼亚的小环，配清汤食用。',
    },
    {
      q: '哪一种托斯卡纳面形最容易手工制作？',
      a: 'Pici，因为既不需要擀面杖也不需要机器：切下一条面，在手掌下搓开就行。它也是最宽容的，因为 pici 本来就该粗细不匀，歪扭的那些反而更挂酱。',
    },
    {
      q: '做新鲜意面一定要用鸡蛋吗？',
      a: '不一定。Pici 只用面粉、水和一点橄榄油，是托斯卡纳中部穷苦厨房的意面。而 tagliatelle、pappardelle 这类面带，以及 tortelli 这类带馅面食，则要用蛋面团，才有它们需要的弹性和风味。',
    },
  ],
  labels: {
    home: '首页',
    hubCrumb: '意面形状',
    tableHeading: '对照一览',
    colShape: '形状',
    colDough: '面团',
    colCut: '切法',
    colSauce: '为何而生',
    readMore: '了解这一形状',
    backToHub: '全部意面形状',
    faqHeading: '常见问题',
    ctaHeading: '亲手擀一次。',
    ctaBody:
      '我们在奥特拉诺的厨房里用三小时教授这全部五种形状：从第一分钟起双手就在面粉里，然后大家一起坐下来吃自己做的东西。最多 8 位客人，95 欧元。',
    ctaButton: '预订意面课程',
    ctaLink: '查看课程',
    guideHeading: '延伸阅读',
    guideBody: '我们关于托斯卡纳新鲜意面传统的完整指南：每种形状从何而来，以及这个地区为什么这样做菜。',
    guideLink: '阅读托斯卡纳意面指南',
  },
  classHref: '/zh/foluolunsa-yidali-mian-kecheng/',
  guideHref: '/zh/blog/tuscan-pasta-shapes-guide/',
  spokes: [
    {
      slug: 'pici',
      name: 'Pici',
      h1Sub: '托斯卡纳的手搓意面，一次讲清。',
      tagline: '锡耶纳的手搓粗面：面粉、水，不加鸡蛋。',
      title: 'Pici 是什么面？面团、手搓方法与酱汁',
      description:
        'Pici 是托斯卡纳一种用面粉和水手工搓成的粗面，不加鸡蛋。一位佛罗伦萨意面主厨讲它的来历、怎么搓，以及属于它的四种酱汁。',
      image: {
        src: img.shapePici,
        alt: '撒了面粉的木板上，手搓成的粗 pici 面条',
        w: 1000,
        h: 625,
      },
      answer:
        'Pici 是来自托斯卡纳南部的一种粗面，用手搓成，除了面粉、水和一点橄榄油之外别无他物，不加鸡蛋。每一根都是在手掌下搓出来的，而不是用刀或机器切出来的，所以没有两根粗细完全一样，表面也始终足够粗糙，能抓住厚重的酱汁。',
      facts: [
        { label: '产地', value: '锡耶纳与奥尔恰谷' },
        { label: '面团', value: '面粉、水、橄榄油；不加鸡蛋' },
        { label: '做法', value: '在手掌下搓制' },
        { label: '粗细', value: '约 3 毫米，刻意不均匀' },
        { label: '经典酱汁', value: 'aglione、野猪肉酱、cacio e pepe、briciole' },
        { label: '难度', value: '最宽容的入门形状' },
      ],
      sections: [
        {
          title: 'Pici 从哪里来',
          paras: [
            'Pici 属于锡耶纳以南的丘陵地带（奥尔恰谷、蒙塔尔奇诺、蒙特普尔恰诺），而且历史悠久。塔尔奎尼亚一座伊特鲁里亚墓室的壁画上，似乎画着与它非常相似的东西，当地人会滔滔不绝且信心十足地讲给你听。',
            '可以确定的是，pici 是穷人的食物。不加鸡蛋，因为鸡蛋值钱，要拿去市场卖。只有最便宜的面粉、水龙头里的水，以及每户农家都有的一样东西：时间，和一双手。这就是全部配方，也是这个形状能留存下来的原因：一无所有也能做。',
          ],
        },
        {
          title: '怎么搓',
          paras: [
            '把面团擀成约一厘米厚的一块，切成条，然后用摊平的手掌从中间向两端搓每一条，直到它被拉长成一根粗长的面。这个动词是 <em>appiciare</em>，名字就是从这里来的。',
            '所有人一开始都会犯的错是用力过猛，那样会把面搓扁成带状而不是搓圆。第二个错误是追求完美。Pici 本来就该不均匀：粗的地方和细的地方就是这道菜的性格，而粗糙、略不规则的表面挂酱的能力，远胜过任何光滑的挤压面。',
          ],
        },
        {
          title: '配什么酱',
          paras: [
            '有四种酱配得上它的名字。<strong>Aglione</strong>（用托斯卡纳那种巨大而温和的 aglione 蒜慢煮出的番茄蒜酱）是最正统的一种；在锡耶纳以南任何地方，点 <em>pici all\'aglione</em> 就对了。<strong>野猪肉酱</strong>是秋天的版本，也是 pici 要搓得这么粗的原因。',
            '<strong>Cacio e pepe</strong> 效果极好，因为粗糙的表面能抓住奶酪；而 <strong>pici alle briciole</strong>（烤面包糠、大蒜、橄榄油）是其中最古老也最清贫的一种，却低调地属于托斯卡纳烹饪里最好的东西之列。你不会在真正的 pici 上看到的，是奶油。',
          ],
        },
      ],
      faqs: [
        {
          q: 'Pici 是用什么做的？',
          a: '面粉、水，通常再加一点橄榄油。不加鸡蛋：这是它的决定性特征，也是托斯卡纳南部农家吃得起它的原因。',
        },
        {
          q: 'Pici 和粗意大利面条一样吗？',
          a: '不一样。意大利面条是通过模具挤压成型的，出来时完全圆润、均匀、光滑。Pici 是手搓的，所以整根粗细不均、表面略显粗糙，这改变了挂在上面的酱汁量。',
        },
        {
          q: 'Pici 配什么酱汁？',
          a: '传统上有四种：aglione（番茄配托斯卡纳甜蒜）、野猪肉酱、cacio e pepe，以及 briciole，即用蒜和橄榄油炒的面包糠。这四种被选中，都是因为它们能挂在粗糙厚实的面条上。',
        },
        {
          q: '在家做 pici 难吗？',
          a: '它是最容易上手的新鲜意面，因为不需要机器也不需要擀面杖，只要你的双手和一块板子。它是慢，而不是难：搓够四个人吃的 pici 要花一阵子，这正是为什么它曾经是全家一起干的活。',
        },
      ],
      compare: { dough: '面粉与水，不加蛋', cut: '手搓，约 3 毫米', sauce: 'Aglione、野猪、cacio e pepe' },
    },
    {
      slug: 'pappardelle',
      name: 'Pappardelle',
      h1Sub: '托斯卡纳最宽的面带，一次讲清。',
      tagline: '最宽的面带，为野猪与野兔而生。',
      title: 'Pappardelle 是什么？宽度、来历与酱汁',
      description:
        'Pappardelle 是宽 2 至 3 厘米的蛋面带，为野猪、野兔这类厚重的野味酱汁而做。一位佛罗伦萨意面主厨讲切法、面团和经典搭配。',
      image: {
        src: img.shapePappardelle,
        alt: '撒了面粉的木板上，宽阔的新鲜蛋面 pappardelle 面带',
        w: 1000,
        h: 625,
      },
      answer:
        'Pappardelle 是托斯卡纳菜系里最宽的新鲜面带：用蛋面团切成的 2 至 3 厘米宽的扁平面条。这个宽度不是为了好看：它的存在，是为了让厚重带块的野味酱汁有一块足够宽的落脚地，而不是直接滑下去。',
      facts: [
        { label: '产地', value: '托斯卡纳' },
        { label: '面团', value: '蛋面团：面粉与鸡蛋' },
        { label: '宽度', value: '2 至 3 厘米' },
        { label: '名字来自', value: 'pappare，大口吃' },
        { label: '经典酱汁', value: '野猪、野兔、鸭、牛肝菌' },
        { label: '难度', value: '最容易的面带：切得越宽越宽容' },
      ],
      sections: [
        {
          title: '一个告诉你该怎么吃的名字',
          paras: [
            '这个词来自 <em>pappare</em>，一个直白的托斯卡纳动词，意思是大口吞食。这不是一个精致的名字，它也不是一种精致的面。Pappardelle 是你在酱汁从早上就炖在炉子上、所有人都饿了的时候端出来的东西。',
            '严格来说，它是托斯卡纳丘陵的面带：tagliatelle 属于艾米利亚和博洛尼亚，而 pappardelle 是秋天狩猎季开始、有野味要处理时，从托斯卡纳厨房里端出来的东西。',
          ],
        },
        {
          title: '怎么切',
          paras: [
            '面团就是普通的新鲜蛋面团，擀薄：薄到能透过它看见手的影子，但不能更薄，因为宽面带要承重。然后给面皮撒粉，松松卷起，用刀横着切成两到三厘米。',
            '正因为切得这么宽，pappardelle 是最宽容的入门面带：一条歪线在 3 厘米上远不如在 6 毫米上明显。它们也熟得快（在充分加盐的水里两三分钟），而且必须直接下到有酱汁的锅里，绝不能先盛进碗里等着。',
          ],
        },
        {
          title: '配什么酱',
          paras: [
            '<strong>野猪肉酱</strong>（用红酒、杜松子和番茄慢炖）是让这个形状出名的搭配，至今仍是正确答案。<strong>野兔</strong>是更古老也更浓郁的版本，如果买得到，老派的托斯卡纳厨师会选它。',
            '除了野味，pappardelle 和<strong>鸭肉酱</strong>非常合拍，也适合一年中牛肝菌值得一买的那几周里的<strong>牛肝菌</strong>。规则很简单：如果酱汁厚重、带块、已经炖了几个小时，它想要的就是这个形状。',
          ],
        },
      ],
      faqs: [
        {
          q: 'Pappardelle 和 tagliatelle 有什么区别？',
          a: '宽度和产地。Pappardelle 切成 2 至 3 厘米宽，是托斯卡纳的，为野猪、野兔这类厚重的野味酱汁而做。Tagliatelle 切成 6 至 8 毫米，属于艾米利亚-罗马涅，适合更细腻的肉酱和蘑菇。两者的面团是一样的。',
        },
        {
          q: 'Pappardelle 传统上配什么酱？',
          a: '野猪肉酱是经典的托斯卡纳搭配，野兔则是更古老更浓郁的替代。鸭肉酱和新鲜牛肝菌是你在佛罗伦萨一份好菜单上会看到的另外两种。',
        },
        {
          q: 'Pappardelle 是用鸡蛋做的吗？',
          a: '是的。Pappardelle 属于蛋面（面粉加全蛋），这让宽面带具备了承载厚重酱汁而不破的弹性与强度。',
        },
        {
          q: '新鲜 pappardelle 要煮多久？',
          a: '在大量充分加盐的沸水里两到三分钟，然后直接下锅与酱汁收汁。新鲜意面比干面熟得快得多，而 pappardelle 通常是最先上桌的那一道。',
        },
      ],
      compare: { dough: '蛋面团', cut: '扁平面带，2 至 3 厘米', sauce: '野猪、野兔、鸭、牛肝菌' },
    },
    {
      slug: 'tagliatelle',
      name: 'Tagliatelle',
      h1Sub: '日常的蛋面带，一次讲清。',
      tagline: '日常的蛋面带，6 至 8 毫米，肉酱的天生搭档。',
      title: 'Tagliatelle 是什么？宽度、切法与酱汁',
      description:
        'Tagliatelle 是切成 6 至 8 毫米宽的新鲜蛋面带，是肉酱的天生搭档。一位佛罗伦萨意面主厨讲切法、它与 fettuccine 和 pappardelle 的区别，以及怎么上桌。',
      image: {
        src: img.shapeTagliatelle,
        alt: '撒了面粉的板子上，一窝窝新鲜的 tagliatelle 面带',
        w: 1000,
        h: 625,
      },
      answer:
        'Tagliatelle 是新鲜蛋面擀成的扁平面带，切成大约 6 至 8 毫米宽。它是意大利中北部的日常面带：窄到能卷上叉子，宽到能承载一份像样的肉酱，这也是为什么大多数人想到新鲜意面时，脑海里浮现的就是这个形状。',
      facts: [
        { label: '产地', value: '艾米利亚-罗马涅，全托斯卡纳都在做' },
        { label: '面团', value: '蛋面团：面粉与鸡蛋' },
        { label: '宽度', value: '6 至 8 毫米' },
        { label: '名字来自', value: 'tagliare，切' },
        { label: '经典酱汁', value: '肉酱、蘑菇、黄油与香草' },
        { label: '难度', value: '教你练刀工的那一刀' },
      ],
      sections: [
        {
          title: '其他一切都以它为标尺',
          paras: [
            'Tagliatelle 来自博洛尼亚，那里对宽度认真到当地商会曾存放过一条黄金标准尺，用来了结争论。煮熟后八毫米，这就是博洛尼亚标准。托斯卡纳厨房里没人真去量，但目标是一样的。',
            '不管它在哪里出生，托斯卡纳一直在做它，因为它是最好用的面带：宽到能配一份扎实的酱，窄到吃起来不费劲，快到可以是周二的晚饭而不是什么大日子。',
          ],
        },
        {
          title: '怎么切',
          paras: [
            '把蛋面团擀成薄面皮，晾几分钟，晾到手感像皮革而不是发黏（这一步大家都跳过，也正是他们的面带粘成一团的原因），然后充分撒粉，松松卷成扁卷，用快刀横切。',
            '然后立刻把每一刀切下的面提起来抖散。留在卷里，面带几分钟内就会焊成一块砖。用一点粗粒小麦粉拌一拌，松松盘成鸟窝状，等水开。Tagliatelle 是教你练刀工的形状，因为在 6 毫米上，一刀切歪的痕迹会明显到在 pappardelle 上永远不会出现的程度。',
          ],
        },
        {
          title: '配什么酱',
          paras: [
            '一份正经的<strong>肉酱</strong>（牛肉猪肉末配 soffritto、葡萄酒和极少量番茄慢炖）就是那个搭配，在博洛尼亚这也是唯一有人肯承认的搭配。注意它不配什么：意大利面条。那是外来的发明，会有人当面指出来。',
            '除了肉酱，tagliatelle 配<strong>蘑菇</strong>极好，想清淡时配黄油和鼠尾草，番茄真正好的时候配简单的<strong>番茄罗勒</strong>。这个面带够窄，清爽的酱汁也能好好裹住它。',
          ],
        },
      ],
      faqs: [
        {
          q: 'Tagliatelle 和 fettuccine 有什么区别？',
          a: '产地和尺寸。Tagliatelle 来自艾米利亚-罗马涅，切成约 6 至 8 毫米宽，而且很薄。Fettuccine 是罗马的，切得略窄但明显更厚。实际上两者是近亲，在意大利以外常常混用。',
        },
        {
          q: 'Tagliatelle 配什么酱汁？',
          a: '慢炖的肉酱是经典，在博洛尼亚基本上是唯一被接受的答案。蘑菇、黄油配鼠尾草，或者一份好的番茄罗勒也都很合适：这个面带够窄，清爽的酱汁仍然能裹住它。',
        },
        {
          q: '我的 tagliatelle 为什么粘在一起？',
          a: '几乎总是因为切的时候面皮还发黏，或者切完之后面带一直卷着没散开。先把面皮晾到手感像皮革，充分撒粉，然后每切一刀就立刻抖散。',
        },
        {
          q: '面皮应该擀多薄？',
          a: '薄到能透过它看见手的形状，但不能薄到一提就破。做面带要比做带馅的形状擀得更薄，因为没有馅需要保护。',
        },
      ],
      compare: { dough: '蛋面团', cut: '扁平面带，6 至 8 毫米', sauce: '肉酱、蘑菇、黄油' },
    },
    {
      slug: 'tortelli',
      name: 'Tortelli',
      h1Sub: '托斯卡纳的带馅意面，一次讲清。',
      tagline: '带馅的面饺，在托斯卡纳最常见的是土豆馅。',
      title: 'Tortelli 是什么？与 Ravioli、Tortellini 的区别',
      description:
        'Tortelli 是带馅的新鲜意面饺。在托斯卡纳，经典馅料是来自穆杰罗的土豆。一位佛罗伦萨意面主厨讲馅料、包法，以及为什么酱汁该保持简单。',
      image: {
        src: img.shapeTortelli,
        alt: '撒了面粉的台面上，手工包好的 tortelli 带馅面饺',
        w: 1000,
        h: 625,
      },
      answer:
        'Tortelli 是用新鲜蛋面包起来的带馅面饺：一张面皮，一勺馅，再压上第二张面皮并沿着馅料封口。托斯卡纳的招牌版本是 <em>tortelli di patate</em>，馅料是调过味的土豆，而不是大多数游客预期的乳清干酪配菠菜，它来自佛罗伦萨以北的穆杰罗山谷。',
      facts: [
        { label: '产地', value: '佛罗伦萨以北的穆杰罗' },
        { label: '面团', value: '蛋面团，擀得略厚' },
        { label: '经典馅料', value: '土豆；也有乳清干酪配菠菜' },
        { label: '形状', value: '方形或半月形，手工封口' },
        { label: '经典酱汁', value: '黄油鼠尾草、肉酱、蘑菇' },
        { label: '难度', value: '最需要耐心的形状' },
      ],
      sections: [
        {
          title: '托斯卡纳的馅料是土豆',
          paras: [
            '在佛罗伦萨以北的丘陵地带穆杰罗点一份 tortelli，端上来的是土豆馅的：土豆压成泥，拌上大蒜、欧芹、一点番茄和帕玛森奶酪，调味到位，有时用肉豆蔻提香。这让期待乳清干酪的人吃了一惊，而它确实是托斯卡纳真正伟大的地方菜之一。',
            '原因和往常一样：土豆在那上头长得好，而肉不够分。托斯卡纳的另一个版本 <em>tortelli maremmani</em> 用乳清干酪和菠菜，来自沿海的马雷玛。两者都没错，只是来自不同的山谷。',
          ],
        },
        {
          title: '怎么包',
          paras: [
            '面皮要比做面带时擀得略厚：这张面得经得起装馅、封口和水煮而不裂开。把馅料一勺勺排成一行，之间留出足够的间隔，然后盖上第二张面皮，<em>用手指沿着每一堆馅的周围往下压</em>，把空气朝边缘赶出去，再封口。',
            '困在里面的空气，正是 tortello 在水里爆开的原因，也是最常见的失败。用力封紧，用滚刀切开，每一条边都检查一遍。这个形状会把享受过程的人和赶时间的人区分开，也是我们的客人在一堂课结束时最引以为豪的那一个。',
          ],
        },
        {
          title: '配什么酱',
          paras: [
            '很少，而这正是重点。<strong>黄油配鼠尾草</strong>（加热到起泡、刚开始有坚果香，配几片煎脆的鼠尾草叶）是经典，很难再改进。一份克制的<strong>肉酱</strong>是穆杰罗的周日版本。',
            '毁掉 tortelli 的，是一份和馅料争味道的酱汁。你花了一个钟头做出一样把味道藏在里面的东西；别把它埋了。拿不准的时候，就用黄油、鼠尾草和一点帕玛森。',
          ],
        },
      ],
      faqs: [
        {
          q: 'Tortelli、tortellini 和 ravioli 有什么区别？',
          a: '是大小和形状的差别，而不是概念的差别：三者都是带馅意面。Tortelli 是托斯卡纳和艾米利亚常见的较大方形或半月形面饺；tortellini 是博洛尼亚的小环形；ravioli 是范围最广的通称，通常是较小的方形。各地叫法互相重叠，当地人之间也乐于争论不休。',
        },
        {
          q: '托斯卡纳的 tortelli 包的是什么馅？',
          a: '在佛罗伦萨以北的穆杰罗，经典馅料是用大蒜、欧芹和帕玛森调味的土豆。在沿海的马雷玛，是乳清干酪和菠菜。两者都是托斯卡纳的传统馅料，只是来自这个地区的不同地方。',
        },
        {
          q: '我的 tortelli 为什么一煮就破？',
          a: '几乎每次都是因为里面困了空气。用手指沿着每一堆馅的周围往下压上面那张面皮，把空气朝外赶，然后再封边。封口不牢和面皮擀得过薄是另外两个原因。',
        },
        {
          q: 'Tortelli 该配什么酱汁？',
          a: '配简单、不与馅料争味道的东西。黄油配鼠尾草再擦点帕玛森是经典；一份克制的肉酱是穆杰罗的周日版本。厚重或者调味过浓的酱汁，会把你刚花一个钟头建立起来的味道埋掉。',
        },
      ],
      compare: { dough: '蛋面团，略厚', cut: '方形或半月形带馅', sauce: '黄油鼠尾草、清淡肉酱' },
    },
    {
      slug: 'ravioli',
      name: 'Ravioli',
      h1Sub: '意大利的带馅面饺，以及托斯卡纳的不同之处。',
      tagline: '人人都认识的带馅方饺，在两张面皮之间封口。',
      title: 'Ravioli 是什么？馅料、形状与区别',
      description:
        'Ravioli 是在两张面皮之间封口的扁平带馅新鲜意面。里面放什么、该做多大，以及它与 tortelli、tortellini 和 agnolotti 的区别。',
      image: {
        src: img.shapeRavioli,
        alt: '撒了面粉的板子上，用滚刀切出的新鲜 ravioli',
        w: 1000,
        h: 625,
      },
      answer:
        'Ravioli 是扁平的带馅新鲜意面：在一张蛋面皮上放一堆馅，盖上第二张面皮压实，把空气赶出去，然后封口并切成方形或圆形。Ravioli 是各地通用的意大利语广义名称；在托斯卡纳和艾米利亚，同样的东西做得更大，就叫 <em>tortelli</em>。',
      facts: [
        { label: '产地', value: '全意大利；通用名称' },
        { label: '面团', value: '蛋面团，擀得略厚' },
        { label: '经典馅料', value: '乳清干酪与菠菜、肉豆蔻、帕玛森' },
        { label: '形状', value: '方形或圆形，两张面皮封口' },
        { label: '大小', value: '约 4 至 5 厘米；tortelli 更大' },
        { label: '经典酱汁', value: '黄油鼠尾草、番茄、清淡肉酱' },
      ],
      sections: [
        {
          title: 'Ravioli、tortelli、tortellini：谁是谁',
          paras: [
            '这三者常被搞混，而这种混淆可以理解，因为其中两个几乎是同一个词。<strong>Ravioli</strong> 是意大利语中对在两张面皮之间封口的扁平带馅面饺的通称，通常是约 4 至 5 厘米的方形。<strong>Tortelli</strong> 是同一个思路在托斯卡纳和艾米利亚的叫法，我们的通常更大，方形或半月形。',
            '<strong>Tortellini</strong> 则完全是另一回事：小小的环，把一个包了馅的小方块绕着指尖折起来再把两端接上，来自博洛尼亚，配清汤而不是酱汁。虽然词尾相似，它们并不是小号的 tortelli。完整的家族谱系在我们的<a href="/zh/blog/ravioli-vs-tortelli/">ravioli 与 tortelli 对比指南</a>里。',
          ],
        },
        {
          title: '里面放什么',
          paras: [
            '大多数人想到的馅料是<strong>乳清干酪配菠菜</strong>，用肉豆蔻和帕玛森调味，它确实也是流传最广的。肉馅、南瓜（曼托瓦的版本，加杏仁饼和芥末水果，见仁见智）、蘑菇和鱼，各有各的产地和季节。',
            '在托斯卡纳，答案往往是土豆，因为穆杰罗就是用它来包<a href="/zh/yidali-mian-xingzhuang/tortelli/">tortelli</a> 的。不管放什么，馅都必须够干才能成型。湿的馅会往面皮里渗，连封口一起带垮，所以乳清干酪要沥干，煮过的菠菜要好好挤干。',
          ],
        },
        {
          title: '怎么封口才不会散',
          paras: [
            '面皮要比做面带时擀得稍厚一点：带馅的形状得经得起装馅、封口和水煮。把馅排成一行，堆与堆之间留出真正的间隔，因为挤得太近正是后面没法封口的原因。每堆一茶匙就足够了。',
            '然后是关键的一步：盖上第二张面皮，<em>用指尖沿着每一堆馅的周围往下压</em>，向外推，让空气跑掉而不是被困住。困住的空气在沸水里膨胀，这就是 raviolo 爆开的原因。用力封紧，用滚刀切开，下锅之前用手指沿着每一条边再走一遍。',
          ],
        },
      ],
      faqs: [
        {
          q: 'Ravioli 和 tortelli 有什么区别？',
          a: '主要是大小和产地，而不是做法。Ravioli 是全国通用的广义名称，指在两张面皮之间封口的扁平带馅面饺，通常是较小的方形。Tortelli 是同一个思路在托斯卡纳和艾米利亚的叫法，一般更大。在托斯卡纳，经典馅料是土豆而不是乳清干酪。',
        },
        {
          q: 'Ravioli 和 tortellini 一样吗？',
          a: '不一样。Tortellini 是绕着指尖折起来、两端接合的小环，来自博洛尼亚，传统上配清汤。Ravioli 是在两张面皮之间封口的扁平面饺，配酱汁食用。名字相似只是意大利语指小词的巧合，不是亲缘关系。',
        },
        {
          q: '一个 ravioli 怎么说？',
          a: '一个叫 raviolo。Ravioli 是复数，就像 panini 是 panino 的复数一样。Tortello 和 tortelli、tortellino 和 tortellini 也是同样的道理。',
        },
        {
          q: '我的 ravioli 为什么一煮就破？',
          a: '几乎总是因为困住了空气。用手指沿着每一堆馅的周围往下压上面那张面皮，把空气朝外赶，然后再封边。封口不牢、馅放太多和面皮擀得过薄是另外三个原因。',
        },
      ],
      compare: { dough: '蛋面团，略厚', cut: '封口方形或圆形，4 至 5 厘米', sauce: '黄油鼠尾草、番茄、清淡肉酱' },
    },
  ],
};

export const shapes: Partial<Record<Locale, ShapesLocale>> = { en, it, de, fr, zh };

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
