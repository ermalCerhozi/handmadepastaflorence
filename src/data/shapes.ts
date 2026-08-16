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
  hubTitle: 'Pasta Shapes: Pici, Pappardelle, Tagliatelle & Tortelli Explained | Handmade Pasta Florence',
  hubDescription:
    'A working chef\'s library of the four fresh pasta shapes we teach in Florence: what each one is, how it is rolled by hand, and the sauce it was built to carry. With a side-by-side comparison.',
  hubEyebrow: 'The shape library',
  hubHeading: 'Four shapes,',
  hubHeadingItal: 'four different sauces.',
  hubLede:
    'A shape is not decoration. Every one of these was invented to hold a particular kind of sauce, and swapping them is why a dish sometimes tastes thin for no obvious reason. Here is what each one is, and what it is for.',
  hubAnswer:
    'The four fresh pasta shapes we roll by hand in our Florence kitchen are pici, pappardelle, tagliatelle and tortelli. In short:',
  hubAnswerList: [
    '<strong>Pici</strong>: thick hand-rolled strands of flour and water, no egg. Siena\'s pasta, built for garlicky aglione and wild boar ragù.',
    '<strong>Pappardelle</strong>: the widest ribbon, 2–3 cm of egg dough. Made to carry heavy game sauces: boar, hare, duck.',
    '<strong>Tagliatelle</strong>: a narrow egg ribbon, 6–8 mm. The everyday ribbon for meat ragù and mushrooms.',
    '<strong>Tortelli</strong>: filled parcels, in Tuscany most often with potato or ricotta and spinach. Dressed simply, with butter and sage or a little ragù.',
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
      title: 'What Are Tortelli? Tuscany\'s Filled Pasta, Explained by a Chef | Handmade Pasta Florence',
      description:
        'Tortelli are filled fresh pasta parcels. In Tuscany the classic filling is potato, from the Mugello. A Florence pasta chef on the fillings, the folding, and why the sauce should stay simple.',
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
        'Ravioli are flat parcels of filled fresh pasta sealed between two sheets. What goes inside, how big they should be, and how they differ from tortelli, tortellini and agnolotti.',
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
  hubTitle: 'Formati di Pasta: Pici, Pappardelle, Tagliatelle e Tortelli Spiegati | Handmade Pasta Florence',
  hubDescription:
    'La libreria dei formati di uno chef: i quattro tipi di pasta fresca che insegniamo a Firenze: cos\'è ciascuno, come si tira a mano e il sugo per cui è nato. Con un confronto diretto.',
  hubEyebrow: 'La libreria dei formati',
  hubHeading: 'Quattro formati,',
  hubHeadingItal: 'quattro sughi diversi.',
  hubLede:
    'Un formato non è decorazione. Ognuno di questi è nato per trattenere un tipo preciso di sugo, ed è per questo che a volte un piatto sembra slavato senza un motivo evidente. Ecco cos\'è ciascuno e a cosa serve.',
  hubAnswer:
    'I quattro formati di pasta fresca che tiriamo a mano nella nostra cucina di Firenze sono pici, pappardelle, tagliatelle e tortelli. In breve:',
  hubAnswerList: [
    '<strong>Pici</strong>: grossi spaghettoni tirati a mano di acqua e farina, senza uovo. La pasta di Siena, nata per l\'aglione e il ragù di cinghiale.',
    '<strong>Pappardelle</strong>: il nastro più largo, 2–3 cm di sfoglia all\'uovo. Fatte per reggere i sughi di selvaggina: cinghiale, lepre, anatra.',
    '<strong>Tagliatelle</strong>: nastro stretto all\'uovo, 6–8 mm. Il nastro di tutti i giorni per il ragù di carne e i funghi.',
    '<strong>Tortelli</strong>: pasta ripiena, in Toscana più spesso di patate o di ricotta e spinaci. Si condiscono con poco: burro e salvia o un ragù leggero.',
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
        'Le pappardelle sono i nastri di sfoglia all\'uovo più larghi della Toscana: 2–3 cm, nati per i sughi di selvaggina. Quanto sono larghe davvero, da dove vengono e con cosa si condiscono.',
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
        'I tortelli sono pasta ripiena: in Toscana quasi sempre di patate, dal Mugello. Che cosa li distingue dai ravioli, come si chiudono a mano e perché il condimento resta semplice.',
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
        'I ravioli sono fagottini piatti di pasta ripiena sigillati tra due sfoglie. Cosa ci va dentro, quanto devono essere grandi, e in cosa differiscono da tortelli, tortellini e agnolotti.',
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
    'Die Formen frischer Pasta, die wir in Florenz von Hand rollen: was jede ist, wie sie geformt wird und für welche Soße sie gemacht wurde. Mit Vergleichstabelle und Maßen in Millimetern.',
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
        'Pici sind eine dicke, von Hand gerollte toskanische Pasta aus Mehl und Wasser, ohne Ei. Ein Pasta-Koch aus Florenz über Herkunft, Rolltechnik und die vier Soßen, die dazugehören.',
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
        'Pappardelle sind breite Bandnudeln aus Eierteig, 20–30 mm breit, gemacht für schwere Wildsoßen wie Wildschwein und Hase. Ein Pasta-Koch aus Florenz über Schnitt, Teig und die klassischen Kombinationen.',
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
        'Tagliatelle sind frische Bandnudeln aus Eierteig, 6–8 mm breit geschnitten, der natürliche Partner eines Fleischragù. Ein Pasta-Koch aus Florenz über den Schnitt und den Unterschied zu Fettuccine und Pappardelle.',
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
        'Tortelli sind gefüllte Päckchen aus frischer Pasta. In der Toskana ist die klassische Füllung Kartoffel, aus dem Mugello. Ein Pasta-Koch aus Florenz über Füllungen, das Falten und den Unterschied zu Ravioli und Tortellini.',
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
        'Ravioli sind flache gefüllte Pastapäckchen, zwischen zwei Teigbahnen versiegelt. Was hineinkommt, wie groß sie sein sollten und worin sie sich von Tortelli, Tortellini und Agnolotti unterscheiden.',
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

export const shapes: Partial<Record<Locale, ShapesLocale>> = { en, it, de };

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
