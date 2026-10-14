// DRAFT landing pages for three new offerings, from the Search Console analysis
// of 13 Oct 2026 (hmpf-gsc-2026-10-13/seo/gsc-2026-10-13-analysis.md, section 3):
//   group-events  O1, groups and corporate events of 15+ guests
//   cheese        O2, Tuscan cheese tasting
//   multi-day     O3, multi-day pasta course
//
// THIS FILE IS DELIBERATELY IMPORTED NOWHERE. Nothing in src/ references it, so
// none of these pages is built, linked from nav, footer or B2B, or listed in the
// sitemap or hreflang. Keep it that way until the owner has supplied the facts.
//
// The owner has confirmed all three can be run but has not yet given prices,
// capacity, venue, length, menu, schedule, lead time, accommodation or which
// cheeses. Every one of those is a literal `{{OWNER: ...}}` placeholder. The
// placeholders are written in English in every locale; translate the supplied
// fact when you fill it in. Everything that is NOT a placeholder is reused from
// facts already published in landings.ts (the Oltrarno kitchen, the two chefs,
// English or Italian, gluten-free at no extra charge, the Chef's Table menu and
// price, invoicing, the one-working-day reply).
//
// TO PUBLISH AN ENTRY:
//   1. Fill every `{{OWNER: ...}}` in that entry, in all five locales, and read
//      the entry's own comment below for decisions that change its shape
//      (e.g. the cheese format). Afterwards
//      `grep -n "{{OWNER" src/data/landings.ts` must print nothing.
//   2. Move the entry into `landings` in landings.ts. Its `satisfies` clause
//      extends LandingKey automatically. Add `updated: 'YYYY-MM-DD'` (the day
//      the facts went live).
//   3. Add nav, footer and B2B links (Experiences/Header, Footer.astro,
//      B2b.astro) plus the inbound links the analysis asks for: group-events
//      from the team-building landing and the team-building blog post; cheese
//      from the pasta-making (Chef's Table) landing; multi-day from the
//      agriturismo landing.
//   4. `npm run build`, then check the new URLs, the sitemap and the hreflang
//      alternates in dist/.
import type { LandingPage } from './landings';
import * as img from '../assets/images';

export const draftLandings: Record<string, LandingPage> = {
  // O1. Groups and corporate events of 15+ guests.
  //
  // Why: the team-building cluster had 1,412 impressions and 0 clicks over
  // 12 Jul to 12 Oct 2026, because the only matching page is capped at 6 to 14
  // and its snippet says so. `group cooking class florence` (76 impressions)
  // has no page at all. The page serves companies AND private groups.
  //
  // Venue: the Oltrarno kitchen holds 14 at most (the team-building blog post:
  // "above fourteen people in one kitchen you stop cooking and start
  // queueing"), so the copy never puts a group of 15+ there. Where they cook is
  // an owner fact.
  //
  // OWNER MUST ALSO CONFIRM that private groups (birthdays, reunions) are
  // offered as well as companies. The copy assumes yes, as the brief asks.
  //
  // `service`, not `product`: there is no published price. No
  // `audience: 'business'`, because half the audience is private groups and
  // BusinessAudience would misdescribe a family reunion. No courseDuration:
  // add one only if the owner gives a single fixed event length.
  'group-events': {
    floatingCta: false,
    courseMode: 'Onsite',
    locales: {
      en: {
        slug: 'group-cooking-class-florence',
        title: `Group Cooking Class Florence: Team Events & Parties, 15+`,
        description: `Pasta making in Florence for groups of 15 or more: company events, team building, reunions and birthdays. Every guest cooks, then everyone eats together.`,
        cl: {
          eyebrow: `Groups of 15 and up · companies & celebrations`,
          heading: `A group cooking class in Florence,`,
          headingItal: `for everyone you're bringing.`,
          lede: `A department offsite, a family reunion, a birthday with too many friends for one restaurant table: everyone gets an apron, a board and their own dough, and nobody stands at the back watching. We teach your group to make fresh pasta by hand, with the same chefs who cook for weddings and feasts at two Tuscan agriturismi, then sit everyone down to eat what they made.`,
          image: { src: img.longTablePoster, alt: `A large group rolling fresh pasta side by side along one long table`, w: 720, h: 432 },
          price: `{{OWNER: group price}}`,
          priceNote: `15 to {{OWNER: max group size}} guests · {{OWNER: price model (per person or per group) and any minimum}}`,
          facts: [
            { label: `Group size`, value: `15 to {{OWNER: max group size}} guests`, icon: 'people' },
            { label: `Where`, value: `{{OWNER: venue for groups over 14}}`, icon: 'map-pin' },
            { label: `Length`, value: `{{OWNER: event length}}`, icon: 'clock' },
            { label: `Chefs`, value: `{{OWNER: number of chefs for large groups}}`, icon: 'chef-hat' },
            { label: `Language`, value: `English or Italian {{OWNER: other languages, if any}}`, icon: 'globe' },
            { label: `Book ahead`, value: `{{OWNER: booking lead time}}`, icon: 'calendar' },
            { label: `Reply time`, value: `within one working day`, icon: 'mail' },
          ],
          infoBanner: {
            menu: {
              title: `Group menu`,
              items: [`{{OWNER: group menu}}`],
              text: `Every guest makes the pasta by hand. The menu above is what the group then sits down to eat.`,
            },
            included: {
              title: `What’s included`,
              items: [
                `Hands-on instruction from start to finish`,
                `<strong>English speaking</strong> chefs`,
                `<strong>Fresh ingredients</strong>`,
                `{{OWNER: equipment per guest at the group venue}}`,
                `{{OWNER: drinks included}}`,
              ],
            },
            notIncluded: {
              title: `What’s not included`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Can you run a cooking class for a large group in Florence?`,
              paras: [
                `Yes, and we would rather do it properly than squeeze you in. Our Oltrarno kitchen is built for fourteen: past that, people stop cooking and start queueing, which is why our <a href="/team-building-cooking-class-florence/">team building class</a> and <a href="/private-cooking-class-florence/">Family Long-Table</a> stop there. Groups of fifteen and more cook with us at {{OWNER: venue for groups over 14}}, where everyone still gets their own board, their own dough and a chef close enough to rescue a fold that keeps tearing.`,
                `The format does not change with the headcount: hands in the flour from the first minute, no demonstration watched from a chair, and a meal at the end made from what the group just rolled. For up to {{OWNER: max group size}} guests, {{OWNER: how groups this size are run (one session, parallel stations or split sessions)}}.`,
              ],
            },
            {
              title: `Companies, families and friends`,
              paras: [
                `The day is built for two kinds of group. <strong>Companies</strong>: offsites, incentive trips, a department in Florence for a conference that needs one afternoon where nobody talks about the conference. <strong>Private groups</strong>: family reunions, milestone birthdays, friends who rented a villa together, everyone flying in for a wedding.`,
                `The kitchen work is the same; the pace is not. A company usually wants an invoice and a firm end time, and we work around your agenda. A celebration usually wants the table to run late, so tell us what you are celebrating and we will shape the day around it, the way we do for our private long-table evenings.`,
              ],
            },
            {
              title: `What does the group cook?`,
              paras: [
                `Everyone makes the pasta with their own hands; that is the point of the day. For groups the menu is {{OWNER: group menu}}, made with ingredients bought fresh for the day.`,
                `With this many people, dietary needs are routine rather than special, so send the full list with your enquiry instead of on the day. Gluten-free guests get a dedicated flour blend and their own station at no extra charge, vegetarian costs nothing extra, and vegan works with advance notice and an eggless dough, the way Tuscany has always made pici. When the event runs away from our Oltrarno kitchen, we confirm the setup with the venue when we confirm your date.`,
              ],
            },
            {
              title: `How the day runs`,
              paras: [
                `Timing bends around your plans. Companies tend to take it in place of a lunch or as the evening that closes an offsite; celebrations tend to want dinner. A group event runs {{OWNER: event length}}: {{OWNER: event schedule}}.`,
                `It ends the way every class of ours ends, with everyone at the table eating what they made, and {{OWNER: drinks included}}.`,
              ],
            },
            {
              title: `Who is teaching`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> and Marsel are the head chefs of two agriturismi in the hills outside Florence. Pasta for weddings, feasts and long farmhouse tables is their ordinary work, so feeding a crowd is nothing new to them. For a group this size the kitchen team is {{OWNER: number of chefs for large groups}}. You can read more <a href="/#story">in our story</a>.`,
              ],
            },
            {
              title: `Hotels, agencies & event planners`,
              paras: [
                `We also work with hotels, B&amp;Bs, agriturismi, tour operators and travel planners: partner rates, priority booking and fast confirmation. If you are putting together a programme in Florence for guests or clients, <a href="/#business">see how we work with businesses</a> or email us directly.`,
              ],
            },
            {
              title: `How to enquire`,
              paras: [
                `Email <a href="mailto:ciao@handmadepastaflorence.com?subject=Group%20event%20enquiry">ciao@handmadepastaflorence.com</a> with your group size, your preferred dates and whether it is a company event or a private celebration. We reply within one working day with availability and a quote. For groups this size, please write at least {{OWNER: booking lead time}} ahead.`,
              ],
            },
          ],
          faqs: [
            { q: `How big can the group be?`, a: `From 15 up to {{OWNER: max group size}} guests. Under 15, the Oltrarno kitchen is the better fit: our <a href="/team-building-cooking-class-florence/">team building class</a> for companies or <a href="/private-cooking-class-florence/">The Family Long-Table</a> for private groups, both for 6 to 14.` },
            { q: `Where is a large group class held?`, a: `At {{OWNER: venue for groups over 14}}. Our Oltrarno kitchen, five minutes from the Ponte Vecchio, holds fourteen at most, and we would rather move a bigger group somewhere with room than leave half of it waiting for a board. If you would like the countryside instead, our <a href="/agriturismo-cooking-class-tuscany/">agriturismo cooking class</a> takes groups of up to twenty in a working farm kitchen outside Florence.` },
            { q: `How does pricing work?`, a: `{{OWNER: price model (per person or per group) and any minimum}}. Send your numbers and dates to ciao@handmadepastaflorence.com and you will have a quote within one working day.` },
            { q: `Is this only for companies?`, a: `No. Family reunions, milestone birthdays and friends travelling together are just as welcome. The cooking is the same; tell us what the occasion is and we plan the day around it.` },
            { q: `Is the class run in English?`, a: `Yes. Both chefs teach in English or Italian, and the instruction is hands-on and visual, so mixed-language groups work fine. {{OWNER: other languages, if any}}` },
            { q: `Can you handle dietary requirements for a big group?`, a: `Yes. Gluten-free stations at no extra charge, vegetarian at no extra charge, and vegan on advance notice with an eggless dough. Send the full list with your enquiry and every guest cooks and eats.` },
            { q: `How far ahead should we book?`, a: `At least {{OWNER: booking lead time}}. The earlier you write, the more dates we can offer.` },
            { q: `Does anyone need cooking experience?`, a: `No. Everyone starts from the same pile of flour, so the CFO is exactly as bad at folding ravioli as the new hire, and the cousin who cooks every Sunday gets humbled by the first sheet like everyone else.` },
            { q: `Can you invoice our company?`, a: `Yes. Send your company name, billing address and VAT or tax number with the enquiry and you get a proper invoice for the event, matching the quote. If your finance team needs a purchase order number or particular wording on the invoice, tell us before the date and it goes on.` },
            { q: `What happens if we have to move or cancel the date?`, a: `Group bookings are confirmed in writing before anything is paid, dates and terms together. {{OWNER: deposit and cancellation terms for groups of 15+}}` },
          ],
          related: [
            { title: `Team Building, 6 to 14`, href: `/team-building-cooking-class-florence/`, desc: `A smaller team? Our private Oltrarno kitchen, five minutes from the Ponte Vecchio.` },
            { title: `The Family Long-Table`, href: `/private-cooking-class-florence/`, desc: `A private celebration for 6 to 14, the whole kitchen to yourselves, from €680.` },
            { title: `Agriturismo Cooking Class`, href: `/agriturismo-cooking-class-tuscany/`, desc: `Up to 20 guests in a working farm kitchen in the hills outside Florence.` },
            { title: `Team building in Florence`, href: `/blog/team-building-activities-florence/`, desc: `Eight formats compared by group size and budget, from 6 people to 60 and up.` },
            { title: `Live Online Class`, href: `/online-pasta-making-class/`, desc: `Part of the team remote? Cook together live from anywhere, from €68.` },
          ],
          ctaLabel: `Get a group quote`,
          emailSubject: `Group event enquiry`,
          breadcrumbName: `Group Cooking Class`,
          service: {
            name: `Group Cooking Class in Florence for 15+ Guests`,
            description: `A hands-on pasta making class in Florence for groups of 15 to {{OWNER: max group size}}: company events, team building, family reunions and celebrations. Every guest makes fresh pasta by hand with two Tuscan agriturismo head chefs, then the group eats together. Held at {{OWNER: venue for groups over 14}}, in English or Italian.`,
          },
        },
      },
      it: {
        slug: 'corso-cucina-gruppi-firenze',
        title: `Corso di Cucina per Gruppi a Firenze: Aziende e Feste, 15+`,
        description: `Pasta fresca a Firenze per gruppi da 15 persone in su: eventi aziendali, team building, rimpatriate e compleanni. Tutti cucinano, poi tutti a tavola.`,
        cl: {
          eyebrow: `Gruppi da 15 in su · aziende e feste private`,
          heading: `Un corso di cucina per gruppi a Firenze,`,
          headingItal: `per tutti quelli che portate.`,
          lede: `Un offsite di reparto, una rimpatriata di famiglia, un compleanno con troppi amici per un solo tavolo al ristorante: ognuno ha il suo grembiule, il suo tagliere e il suo impasto, e nessuno resta in fondo a guardare. Insegniamo al vostro gruppo a fare la pasta fresca a mano, con gli stessi chef che cucinano per matrimoni e banchetti in due agriturismi toscani, e poi vi facciamo sedere tutti a mangiare quello che avete preparato.`,
          image: { src: img.longTablePoster, alt: `Un gruppo numeroso che stende la pasta fresca fianco a fianco lungo un'unica tavolata`, w: 720, h: 432 },
          price: `{{OWNER: group price}}`,
          priceNote: `da 15 a {{OWNER: max group size}} ospiti · {{OWNER: price model (per person or per group) and any minimum}}`,
          facts: [
            { label: `Dimensione gruppo`, value: `da 15 a {{OWNER: max group size}} ospiti`, icon: 'people' },
            { label: `Dove`, value: `{{OWNER: venue for groups over 14}}`, icon: 'map-pin' },
            { label: `Durata`, value: `{{OWNER: event length}}`, icon: 'clock' },
            { label: `Chef`, value: `{{OWNER: number of chefs for large groups}}`, icon: 'chef-hat' },
            { label: `Lingua`, value: `inglese o italiano {{OWNER: other languages, if any}}`, icon: 'globe' },
            { label: `Preavviso`, value: `{{OWNER: booking lead time}}`, icon: 'calendar' },
            { label: `Tempo di risposta`, value: `entro un giorno lavorativo`, icon: 'mail' },
          ],
          infoBanner: {
            menu: {
              title: `Menu per gruppi`,
              items: [`{{OWNER: group menu}}`],
              text: `Ogni ospite prepara la pasta con le sue mani. Il menu qui sopra è quello che il gruppo poi mangia a tavola.`,
            },
            included: {
              title: `Cosa è incluso`,
              items: [
                `Istruzioni pratiche dall'inizio alla fine`,
                `Chef che <strong>parlano inglese</strong>`,
                `<strong>Ingredienti freschi</strong>`,
                `{{OWNER: equipment per guest at the group venue}}`,
                `{{OWNER: drinks included}}`,
              ],
            },
            notIncluded: {
              title: `Cosa non è incluso`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Si può fare un corso di cucina per un gruppo numeroso a Firenze?`,
              paras: [
                `Sì, e preferiamo farlo bene piuttosto che stringervi. La nostra cucina in Oltrarno è pensata per quattordici persone: oltre, si smette di cucinare e si comincia a fare la fila, ed è per questo che il nostro <a href="/it/corso-cucina-team-building-firenze/">corso di team building</a> e <a href="/it/corso-cucina-privato-firenze/">Il Lungo Tavolo di Famiglia</a> si fermano lì. I gruppi da quindici in su cucinano con noi presso {{OWNER: venue for groups over 14}}, dove ognuno ha comunque il suo tagliere, il suo impasto e uno chef abbastanza vicino da salvare una chiusura che continua a strapparsi.`,
                `Il formato non cambia con il numero di persone: mani in pasta dal primo minuto, nessuna dimostrazione da guardare seduti, e alla fine un pasto fatto con quello che il gruppo ha appena tirato. Fino a {{OWNER: max group size}} ospiti, {{OWNER: how groups this size are run (one session, parallel stations or split sessions)}}.`,
              ],
            },
            {
              title: `Aziende, famiglie e amici`,
              paras: [
                `La giornata è pensata per due tipi di gruppo. Le <strong>aziende</strong>: offsite, viaggi incentive, un reparto a Firenze per un congresso che ha bisogno di un pomeriggio in cui nessuno parla del congresso. I <strong>gruppi privati</strong>: rimpatriate di famiglia, compleanni importanti, amici che hanno affittato una villa insieme, tutti quelli che arrivano per un matrimonio.`,
                `Il lavoro in cucina è lo stesso, il ritmo no. Un'azienda di solito vuole una fattura e un orario di fine preciso, e noi ci organizziamo attorno alla vostra agenda. Una festa di solito vuole che la tavola vada avanti fino a tardi: diteci cosa festeggiate e costruiamo la giornata attorno all'occasione, come facciamo per le nostre serate private al lungo tavolo.`,
              ],
            },
            {
              title: `Cosa cucina il gruppo?`,
              paras: [
                `Ognuno fa la pasta con le proprie mani: è il senso della giornata. Per i gruppi il menu è {{OWNER: group menu}}, con ingredienti comprati freschi per l'occasione.`,
                `Con così tante persone le esigenze alimentari sono la norma, non un'eccezione, quindi mandateci l'elenco completo con la richiesta e non il giorno stesso. Chi è celiaco ha una miscela di farine senza glutine dedicata e una postazione sua senza costi aggiuntivi, il vegetariano è senza supplemento e il vegano si fa con un preavviso e un impasto senza uovo, come la Toscana ha sempre fatto i pici. Quando l'evento si tiene fuori dalla nostra cucina in Oltrarno, confermiamo l'allestimento con la sede quando confermiamo la data.`,
              ],
            },
            {
              title: `Come si svolge la giornata`,
              paras: [
                `L'orario si adatta ai vostri programmi. Le aziende lo scelgono spesso al posto di un pranzo o come serata conclusiva di un offsite; le feste preferiscono la cena. Un evento di gruppo dura {{OWNER: event length}}: {{OWNER: event schedule}}.`,
                `Finisce come finiscono tutti i nostri corsi, con tutti a tavola a mangiare quello che hanno preparato, e {{OWNER: drinks included}}.`,
              ],
            },
            {
              title: `Chi insegna`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> e Marsel sono gli head chef di due agriturismi sulle colline fuori Firenze. La pasta per matrimoni, banchetti e lunghe tavolate di campagna è il loro lavoro quotidiano, quindi cucinare per tante persone non è una novità. Per un gruppo di queste dimensioni la squadra in cucina è {{OWNER: number of chefs for large groups}}. Potete leggere di più <a href="/it/#story">nella nostra storia</a>.`,
              ],
            },
            {
              title: `Hotel, agenzie & organizzatori di eventi`,
              paras: [
                `Collaboriamo anche con hotel, B&amp;B, agriturismi, tour operator e organizzatori di viaggi: tariffe partner, prenotazione prioritaria e conferma rapida. Se state costruendo un programma a Firenze per ospiti o clienti, <a href="/it/#business">scoprite come lavoriamo con le aziende</a> o scriveteci direttamente.`,
              ],
            },
            {
              title: `Come richiedere un preventivo`,
              paras: [
                `Scrivete a <a href="mailto:ciao@handmadepastaflorence.com?subject=Richiesta%20evento%20di%20gruppo">ciao@handmadepastaflorence.com</a> con il numero di persone, le date che preferite e se si tratta di un evento aziendale o di una festa privata. Rispondiamo entro un giorno lavorativo con disponibilità e preventivo. Per gruppi di queste dimensioni, scriveteci con almeno {{OWNER: booking lead time}} di anticipo.`,
              ],
            },
          ],
          faqs: [
            { q: `Quanto può essere grande il gruppo?`, a: `Da 15 fino a {{OWNER: max group size}} ospiti. Sotto i 15, la cucina in Oltrarno è la scelta migliore: il nostro <a href="/it/corso-cucina-team-building-firenze/">corso di team building</a> per le aziende o <a href="/it/corso-cucina-privato-firenze/">Il Lungo Tavolo di Famiglia</a> per i gruppi privati, entrambi da 6 a 14 persone.` },
            { q: `Dove si tiene il corso per gruppi numerosi?`, a: `Presso {{OWNER: venue for groups over 14}}. La nostra cucina in Oltrarno, a cinque minuti da Ponte Vecchio, ospita al massimo quattordici persone, e preferiamo portare un gruppo più grande dove c'è spazio piuttosto che lasciarne metà ad aspettare un tagliere. Se preferite la campagna, il nostro <a href="/it/corso-cucina-agriturismo-toscana/">corso di cucina in agriturismo</a> accoglie gruppi fino a venti persone nella cucina di un'azienda agricola in attività fuori Firenze.` },
            { q: `Come funzionano i prezzi?`, a: `{{OWNER: price model (per person or per group) and any minimum}}. Mandate numeri e date a ciao@handmadepastaflorence.com e riceverete un preventivo entro un giorno lavorativo.` },
            { q: `È solo per le aziende?`, a: `No. Rimpatriate di famiglia, compleanni importanti e gruppi di amici in viaggio sono altrettanto benvenuti. La cucina è la stessa: diteci qual è l'occasione e organizziamo la giornata attorno a quella.` },
            { q: `Il corso si tiene in inglese?`, a: `Sì. Entrambi gli chef insegnano in inglese o in italiano, e le istruzioni sono pratiche e visive, quindi anche i gruppi misti si trovano bene. {{OWNER: other languages, if any}}` },
            { q: `Potete gestire le esigenze alimentari di un gruppo numeroso?`, a: `Sì. Postazioni senza glutine senza costi aggiuntivi, vegetariano senza supplemento e vegano su preavviso con un impasto senza uovo. Mandateci l'elenco completo con la richiesta e ogni ospite cucina e mangia.` },
            { q: `Con quanto anticipo dobbiamo prenotare?`, a: `Almeno {{OWNER: booking lead time}}. Prima scrivete, più date possiamo proporvi.` },
            { q: `Serve esperienza in cucina?`, a: `No. Si parte tutti dallo stesso mucchio di farina, quindi l'amministratore delegato chiude i ravioli storti esattamente come l'ultimo arrivato, e il cugino che cucina ogni domenica si fa mettere in difficoltà dalla prima sfoglia come tutti gli altri.` },
            { q: `Potete fatturare all'azienda?`, a: `Sì. Inviateci ragione sociale, indirizzo di fatturazione e partita IVA o codice fiscale insieme alla richiesta e riceverete una fattura regolare per l'evento, coerente con il preventivo. Se l'amministrazione ha bisogno di un numero d'ordine o di diciture specifiche, segnalatelo prima della data e le inseriamo.` },
            { q: `Cosa succede se dobbiamo spostare o annullare la data?`, a: `Le prenotazioni di gruppo vengono confermate per iscritto prima di qualsiasi pagamento, date e condizioni insieme. {{OWNER: deposit and cancellation terms for groups of 15+}}` },
          ],
          related: [
            { title: `Team Building, da 6 a 14`, href: `/it/corso-cucina-team-building-firenze/`, desc: `Un team più piccolo? La nostra cucina privata in Oltrarno, a cinque minuti da Ponte Vecchio.` },
            { title: `Il Lungo Tavolo di Famiglia`, href: `/it/corso-cucina-privato-firenze/`, desc: `Una festa privata da 6 a 14 persone, tutta la cucina per voi, da €680.` },
            { title: `Corso di Cucina in Agriturismo`, href: `/it/corso-cucina-agriturismo-toscana/`, desc: `Fino a 20 ospiti nella cucina di un agriturismo in attività, sulle colline fuori Firenze.` },
            { title: `Team building a Firenze`, href: `/it/blog/team-building-activities-florence/`, desc: `Otto formati a confronto per numero di persone e budget, da 6 a oltre 60.` },
            { title: `Corso in Diretta Online`, href: `/it/corso-pasta-online/`, desc: `Parte del team lavora da remoto? Cucinate insieme in diretta da ovunque, da €68.` },
          ],
          ctaLabel: `Richiedi un preventivo`,
          emailSubject: `Richiesta evento di gruppo`,
          breadcrumbName: `Corso di Cucina per Gruppi`,
          service: {
            name: `Corso di Cucina per Gruppi a Firenze, da 15 Persone`,
            description: `Un corso pratico di pasta fresca a Firenze per gruppi da 15 a {{OWNER: max group size}} persone: eventi aziendali, team building, rimpatriate di famiglia e feste. Ogni ospite fa la pasta a mano con due head chef di agriturismo toscani, poi il gruppo mangia insieme. Presso {{OWNER: venue for groups over 14}}, in inglese o italiano.`,
          },
        },
      },
      fr: {
        slug: 'cours-cuisine-groupe-florence',
        title: `Cours de Cuisine en Groupe à Florence : Entreprises, 15+`,
        description: `Pâtes fraîches à Florence pour les groupes de 15 personnes et plus : séminaires, team building, réunions de famille, anniversaires. Tout le monde cuisine.`,
        cl: {
          eyebrow: `Groupes de 15 et plus · entreprises et fêtes privées`,
          heading: `Un cours de cuisine en groupe à Florence,`,
          headingItal: `pour tous ceux que vous amenez.`,
          lede: `Un séminaire d'équipe, une réunion de famille, un anniversaire avec trop d'amis pour une seule table de restaurant : chacun a son tablier, sa planche et sa pâte, et personne ne reste au fond à regarder. Nous apprenons à votre groupe à faire les pâtes fraîches à la main, avec les chefs qui cuisinent pour les mariages et les banquets de deux agriturismi toscans, puis tout le monde passe à table pour manger ce qu'il a préparé.`,
          image: { src: img.longTablePoster, alt: `Un grand groupe étalant des pâtes fraîches côte à côte le long d'une même longue table`, w: 720, h: 432 },
          price: `{{OWNER: group price}}`,
          priceNote: `de 15 à {{OWNER: max group size}} personnes · {{OWNER: price model (per person or per group) and any minimum}}`,
          facts: [
            { label: `Taille du groupe`, value: `de 15 à {{OWNER: max group size}} personnes`, icon: 'people' },
            { label: `Lieu`, value: `{{OWNER: venue for groups over 14}}`, icon: 'map-pin' },
            { label: `Durée`, value: `{{OWNER: event length}}`, icon: 'clock' },
            { label: `Chefs`, value: `{{OWNER: number of chefs for large groups}}`, icon: 'chef-hat' },
            { label: `Langue`, value: `anglais ou italien {{OWNER: other languages, if any}}`, icon: 'globe' },
            { label: `Préavis`, value: `{{OWNER: booking lead time}}`, icon: 'calendar' },
            { label: `Réponse`, value: `sous un jour ouvré`, icon: 'mail' },
          ],
          infoBanner: {
            menu: {
              title: `Menu de groupe`,
              items: [`{{OWNER: group menu}}`],
              text: `Chaque invité prépare les pâtes de ses mains. Le menu ci-dessus est ce que le groupe mange ensuite à table.`,
            },
            included: {
              title: `Ce qui est inclus`,
              items: [
                `Instructions pratiques du début à la fin`,
                `Chefs <strong>anglophones</strong>`,
                `<strong>Ingrédients frais</strong>`,
                `{{OWNER: equipment per guest at the group venue}}`,
                `{{OWNER: drinks included}}`,
              ],
            },
            notIncluded: {
              title: `Ce qui n'est pas inclus`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Peut-on organiser un cours de cuisine pour un grand groupe à Florence ?`,
              paras: [
                `Oui, et nous préférons le faire correctement plutôt que de vous serrer. Notre cuisine de l'Oltrarno est pensée pour quatorze personnes : au-delà, on arrête de cuisiner et on commence à faire la queue, c'est pourquoi notre <a href="/fr/cours-cuisine-team-building-florence/">cours team building</a> et <a href="/fr/cours-cuisine-prive-florence/">La Longue Table Familiale</a> s'arrêtent là. Les groupes de quinze personnes et plus cuisinent avec nous à {{OWNER: venue for groups over 14}}, où chacun a toujours sa planche, sa pâte et un chef assez proche pour sauver un pliage qui se déchire.`,
                `Le format ne change pas avec l'effectif : les mains dans la farine dès la première minute, aucune démonstration regardée depuis une chaise, et à la fin un repas fait de ce que le groupe vient d'étaler. Jusqu'à {{OWNER: max group size}} personnes, {{OWNER: how groups this size are run (one session, parallel stations or split sessions)}}.`,
              ],
            },
            {
              title: `Entreprises, familles et amis`,
              paras: [
                `La journée est pensée pour deux types de groupe. Les <strong>entreprises</strong> : séminaires, voyages incentive, un service à Florence pour un congrès qui a besoin d'un après-midi où personne ne parle du congrès. Les <strong>groupes privés</strong> : réunions de famille, anniversaires marquants, amis qui ont loué une villa ensemble, tous ceux qui arrivent pour un mariage.`,
                `Le travail en cuisine est le même, le rythme non. Une entreprise veut en général une facture et une heure de fin précise, et nous nous adaptons à votre agenda. Une fête veut en général que la table dure tard : dites-nous ce que vous célébrez et nous construisons la journée autour de l'occasion, comme pour nos soirées privées à la longue table.`,
              ],
            },
            {
              title: `Que cuisine le groupe ?`,
              paras: [
                `Chacun fait les pâtes de ses propres mains : c'est tout l'intérêt de la journée. Pour les groupes, le menu est {{OWNER: group menu}}, avec des ingrédients achetés frais pour l'occasion.`,
                `Avec autant de monde, les besoins alimentaires sont la norme, pas l'exception : envoyez-nous la liste complète avec votre demande plutôt que le jour même. Les invités cœliaques ont un mélange de farines sans gluten dédié et leur propre poste sans frais supplémentaires, le végétarien est sans supplément et le végétalien se fait sur préavis avec une pâte sans œuf, comme la Toscane a toujours fait les pici. Quand l'événement a lieu hors de notre cuisine de l'Oltrarno, nous confirmons l'installation avec le lieu en confirmant votre date.`,
              ],
            },
            {
              title: `Le déroulé de la journée`,
              paras: [
                `L'horaire s'adapte à votre programme. Les entreprises le prennent souvent à la place d'un déjeuner ou comme soirée de clôture d'un séminaire ; les fêtes préfèrent le dîner. Un événement de groupe dure {{OWNER: event length}} : {{OWNER: event schedule}}.`,
                `Il se termine comme tous nos cours, tout le monde à table devant ce qu'il a préparé, et {{OWNER: drinks included}}.`,
              ],
            },
            {
              title: `Qui enseigne`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> et Marsel sont les chefs de cuisine de deux agriturismi dans les collines autour de Florence. Les pâtes pour les mariages, les banquets et les longues tablées de ferme sont leur travail quotidien : cuisiner pour beaucoup de monde n'a rien de nouveau pour eux. Pour un groupe de cette taille, l'équipe en cuisine compte {{OWNER: number of chefs for large groups}}. Vous pouvez en lire plus <a href="/fr/#story">dans notre histoire</a>.`,
              ],
            },
            {
              title: `Hôtels, agences & organisateurs d'événements`,
              paras: [
                `Nous collaborons également avec des hôtels, B&amp;B, agritourismes, voyagistes et organisateurs de voyages : tarifs partenaires, réservation prioritaire et confirmation rapide. Si vous montez un programme à Florence pour des invités ou des clients, <a href="/fr/#business">découvrez comment nous travaillons avec les entreprises</a> ou écrivez-nous directement.`,
              ],
            },
            {
              title: `Comment demander un devis`,
              paras: [
                `Écrivez à <a href="mailto:ciao@handmadepastaflorence.com?subject=Demande%20d%27%C3%A9v%C3%A9nement%20de%20groupe">ciao@handmadepastaflorence.com</a> avec le nombre de personnes, vos dates préférées et s'il s'agit d'un événement d'entreprise ou d'une fête privée. Nous répondons sous un jour ouvré avec les disponibilités et un devis. Pour un groupe de cette taille, écrivez-nous au moins {{OWNER: booking lead time}} à l'avance.`,
              ],
            },
          ],
          faqs: [
            { q: `Quelle taille peut avoir le groupe ?`, a: `De 15 à {{OWNER: max group size}} personnes. En dessous de 15, la cuisine de l'Oltrarno convient mieux : notre <a href="/fr/cours-cuisine-team-building-florence/">cours team building</a> pour les entreprises ou <a href="/fr/cours-cuisine-prive-florence/">La Longue Table Familiale</a> pour les groupes privés, tous deux de 6 à 14 personnes.` },
            { q: `Où se déroule un cours pour un grand groupe ?`, a: `À {{OWNER: venue for groups over 14}}. Notre cuisine de l'Oltrarno, à cinq minutes du Ponte Vecchio, accueille quatorze personnes au maximum, et nous préférons emmener un grand groupe là où il y a de la place plutôt que d'en laisser la moitié attendre une planche. Si vous préférez la campagne, notre <a href="/fr/cours-cuisine-agritourisme-toscane/">cours de cuisine en agritourisme</a> accueille des groupes jusqu'à vingt personnes dans la cuisine d'une ferme en activité près de Florence.` },
            { q: `Comment fonctionnent les tarifs ?`, a: `{{OWNER: price model (per person or per group) and any minimum}}. Envoyez votre effectif et vos dates à ciao@handmadepastaflorence.com et vous aurez un devis sous un jour ouvré.` },
            { q: `Est-ce réservé aux entreprises ?`, a: `Non. Les réunions de famille, les anniversaires marquants et les groupes d'amis en voyage sont tout aussi bienvenus. La cuisine est la même : dites-nous l'occasion et nous organisons la journée autour.` },
            { q: `Le cours est-il en anglais ?`, a: `Oui. Les deux chefs enseignent en anglais ou en italien, et les instructions sont pratiques et visuelles, donc les groupes multilingues s'en sortent très bien. {{OWNER: other languages, if any}}` },
            { q: `Pouvez-vous gérer les régimes alimentaires d'un grand groupe ?`, a: `Oui. Postes sans gluten sans frais supplémentaires, végétarien sans supplément et végétalien sur préavis avec une pâte sans œuf. Envoyez-nous la liste complète avec votre demande et chaque invité cuisine et mange.` },
            { q: `Combien de temps à l'avance faut-il réserver ?`, a: `Au moins {{OWNER: booking lead time}}. Plus vous écrivez tôt, plus nous pouvons vous proposer de dates.` },
            { q: `Faut-il de l'expérience en cuisine ?`, a: `Non. Tout le monde part du même tas de farine : la directrice générale plie les ravioli aussi mal que le dernier stagiaire, et le cousin qui cuisine tous les dimanches se fait dépasser par la première abaisse comme tout le monde.` },
            { q: `Pouvez-vous facturer notre entreprise ?`, a: `Oui. Envoyez-nous la raison sociale, l'adresse de facturation et le numéro de TVA ou d'identification fiscale avec votre demande et vous recevrez une facture en bonne et due forme pour l'événement, conforme au devis. Si votre service comptable a besoin d'un numéro de commande ou d'une mention particulière, dites-le avant la date et nous l'ajoutons.` },
            { q: `Que se passe-t-il si nous devons déplacer ou annuler la date ?`, a: `Les réservations de groupe sont confirmées par écrit avant tout paiement, dates et conditions ensemble. {{OWNER: deposit and cancellation terms for groups of 15+}}` },
          ],
          related: [
            { title: `Team Building, 6 à 14`, href: `/fr/cours-cuisine-team-building-florence/`, desc: `Une équipe plus petite ? Notre cuisine privée de l'Oltrarno, à cinq minutes du Ponte Vecchio.` },
            { title: `La Longue Table Familiale`, href: `/fr/cours-cuisine-prive-florence/`, desc: `Une fête privée de 6 à 14 personnes, toute la cuisine pour vous, à partir de 680 €.` },
            { title: `Cours de Cuisine en Agritourisme`, href: `/fr/cours-cuisine-agritourisme-toscane/`, desc: `Jusqu'à 20 personnes dans la cuisine d'une ferme en activité, dans les collines autour de Florence.` },
            { title: `Team building à Florence`, href: `/fr/blog/team-building-activities-florence/`, desc: `Huit formats comparés par taille de groupe et budget, de 6 à plus de 60 personnes.` },
            { title: `Cours en Direct en Ligne`, href: `/fr/cours-pates-en-ligne/`, desc: `Une partie de l'équipe à distance ? Cuisinez ensemble en direct d'où vous voulez, à partir de 68 €.` },
          ],
          ctaLabel: `Obtenir un devis de groupe`,
          emailSubject: `Demande d'événement de groupe`,
          breadcrumbName: `Cours de Cuisine en Groupe`,
          service: {
            name: `Cours de Cuisine en Groupe à Florence, dès 15 Personnes`,
            description: `Un cours pratique de pâtes fraîches à Florence pour les groupes de 15 à {{OWNER: max group size}} personnes : événements d'entreprise, team building, réunions de famille et fêtes. Chaque invité fait les pâtes à la main avec deux chefs d'agritourisme toscans, puis le groupe mange ensemble. À {{OWNER: venue for groups over 14}}, en anglais ou en italien.`,
          },
        },
      },
      de: {
        slug: 'gruppen-kochkurs-florenz',
        title: `Gruppen-Kochkurs Florenz: Teamevents & Feiern ab 15`,
        description: `Frische Pasta in Florenz für Gruppen ab 15 Personen: Firmenevents, Teambuilding, Familientreffen und Geburtstage. Alle kochen, dann sitzen alle zusammen.`,
        cl: {
          eyebrow: `Gruppen ab 15 · Firmen und private Feiern`,
          heading: `Ein Gruppen-Kochkurs in Florenz,`,
          headingItal: `für alle, die Sie mitbringen.`,
          lede: `Ein Abteilungs-Offsite, ein Familientreffen, ein Geburtstag mit zu vielen Freunden für einen Restauranttisch: Jeder bekommt eine Schürze, ein Brett und seinen eigenen Teig, und niemand steht hinten und schaut zu. Wir bringen Ihrer Gruppe bei, frische Pasta von Hand zu machen, mit denselben Köchen, die in zwei toskanischen Agriturismi für Hochzeiten und Festessen kochen, und dann setzen sich alle an den Tisch und essen, was sie gemacht haben.`,
          image: { src: img.longTablePoster, alt: `Eine große Gruppe rollt Seite an Seite an einer langen Tafel frische Pasta aus`, w: 720, h: 432 },
          price: `{{OWNER: group price}}`,
          priceNote: `15 bis {{OWNER: max group size}} Gäste · {{OWNER: price model (per person or per group) and any minimum}}`,
          facts: [
            { label: `Gruppengröße`, value: `15 bis {{OWNER: max group size}} Gäste`, icon: 'people' },
            { label: `Ort`, value: `{{OWNER: venue for groups over 14}}`, icon: 'map-pin' },
            { label: `Dauer`, value: `{{OWNER: event length}}`, icon: 'clock' },
            { label: `Köche`, value: `{{OWNER: number of chefs for large groups}}`, icon: 'chef-hat' },
            { label: `Sprache`, value: `Englisch oder Italienisch {{OWNER: other languages, if any}}`, icon: 'globe' },
            { label: `Vorlauf`, value: `{{OWNER: booking lead time}}`, icon: 'calendar' },
            { label: `Antwortzeit`, value: `innerhalb eines Werktags`, icon: 'mail' },
          ],
          infoBanner: {
            menu: {
              title: `Gruppenmenü`,
              items: [`{{OWNER: group menu}}`],
              text: `Jeder Gast macht die Pasta mit eigenen Händen. Das Menü oben ist das, was die Gruppe danach am Tisch isst.`,
            },
            included: {
              title: `Was inklusive ist`,
              items: [
                `Praktische Anleitung von Anfang bis Ende`,
                `<strong>Englischsprachige</strong> Köche`,
                `<strong>Frische Zutaten</strong>`,
                `{{OWNER: equipment per guest at the group venue}}`,
                `{{OWNER: drinks included}}`,
              ],
            },
            notIncluded: {
              title: `Was nicht inklusive ist`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Gibt es in Florenz einen Kochkurs für große Gruppen?`,
              paras: [
                `Ja, und wir machen es lieber richtig, als Sie hineinzuquetschen. Unsere Küche im Oltrarno ist für vierzehn Personen gebaut: Darüber hinaus hört man auf zu kochen und fängt an, Schlange zu stehen. Deshalb enden unser <a href="/de/teambuilding-kochkurs-florenz/">Teambuilding-Kurs</a> und <a href="/de/privater-kochkurs-florenz/">Die lange Familientafel</a> dort. Gruppen ab fünfzehn Personen kochen mit uns in {{OWNER: venue for groups over 14}}, wo trotzdem jeder sein eigenes Brett, seinen eigenen Teig und einen Koch in Reichweite hat, der eine reißende Faltung rettet.`,
                `Das Format ändert sich nicht mit der Personenzahl: Hände im Mehl ab der ersten Minute, keine Vorführung vom Stuhl aus, und am Ende eine Mahlzeit aus dem, was die Gruppe gerade ausgerollt hat. Bei bis zu {{OWNER: max group size}} Gästen {{OWNER: how groups this size are run (one session, parallel stations or split sessions)}}.`,
              ],
            },
            {
              title: `Firmen, Familien und Freunde`,
              paras: [
                `Der Tag ist für zwei Arten von Gruppen gemacht. <strong>Firmen</strong>: Offsites, Incentive-Reisen, eine Abteilung in Florenz für eine Konferenz, die einen Nachmittag braucht, an dem niemand über die Konferenz spricht. <strong>Private Gruppen</strong>: Familientreffen, runde Geburtstage, Freunde, die zusammen eine Villa gemietet haben, alle, die zu einer Hochzeit anreisen.`,
                `Die Arbeit in der Küche ist dieselbe, das Tempo nicht. Eine Firma will meist eine Rechnung und ein festes Ende, und wir richten uns nach Ihrer Agenda. Eine Feier will meist, dass der Tisch lange dauert: Sagen Sie uns, was Sie feiern, und wir bauen den Tag um den Anlass herum, so wie bei unseren privaten Abenden an der langen Tafel.`,
              ],
            },
            {
              title: `Was kocht die Gruppe?`,
              paras: [
                `Jeder macht die Pasta mit eigenen Händen, darum geht es an diesem Tag. Für Gruppen ist das Menü {{OWNER: group menu}}, mit Zutaten, die für den Tag frisch eingekauft werden.`,
                `Bei so vielen Menschen sind Ernährungswünsche die Regel, nicht die Ausnahme. Schicken Sie die vollständige Liste deshalb mit der Anfrage und nicht erst am Tag selbst. Gäste mit Zöliakie bekommen eine eigene glutenfreie Mehlmischung und eine eigene Station ohne Aufpreis, vegetarisch kostet nichts extra, und vegan geht mit Vorankündigung und einem Teig ohne Ei, so wie die Toskana Pici schon immer gemacht hat. Findet das Event außerhalb unserer Küche im Oltrarno statt, stimmen wir den Aufbau mit dem Ort ab, sobald wir Ihren Termin bestätigen.`,
              ],
            },
            {
              title: `Wie der Tag abläuft`,
              paras: [
                `Das Timing richtet sich nach Ihren Plänen. Firmen buchen es oft anstelle eines Mittagessens oder als Abend zum Abschluss eines Offsites; Feiern wollen eher ein Abendessen. Ein Gruppenevent dauert {{OWNER: event length}}: {{OWNER: event schedule}}.`,
                `Es endet wie jeder unserer Kurse, mit allen am Tisch und dem, was sie gemacht haben, und {{OWNER: drinks included}}.`,
              ],
            },
            {
              title: `Wer unterrichtet`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> und Marsel sind die Küchenchefs zweier Agriturismi in den Hügeln vor Florenz. Pasta für Hochzeiten, Festessen und lange Hoftafeln ist ihre alltägliche Arbeit, für viele Menschen zu kochen ist für sie also nichts Neues. Für eine Gruppe dieser Größe besteht das Küchenteam aus {{OWNER: number of chefs for large groups}}. Mehr dazu <a href="/de/#story">in unserer Geschichte</a>.`,
              ],
            },
            {
              title: `Hotels, Agenturen & Eventplaner`,
              paras: [
                `Wir arbeiten auch mit Hotels, B&amp;Bs, Agriturismi, Reiseveranstaltern und Reiseplanern zusammen: Partnertarife, bevorzugte Buchung und schnelle Bestätigung. Wenn Sie ein Programm in Florenz für Gäste oder Kunden zusammenstellen, <a href="/de/#business">sehen Sie, wie wir mit Unternehmen arbeiten</a>, oder schreiben Sie uns direkt.`,
              ],
            },
            {
              title: `Anfragen`,
              paras: [
                `Schreiben Sie an <a href="mailto:ciao@handmadepastaflorence.com?subject=Anfrage%20Gruppenevent">ciao@handmadepastaflorence.com</a> mit Ihrer Gruppengröße, Ihren Wunschterminen und ob es ein Firmenevent oder eine private Feier ist. Wir antworten innerhalb eines Werktags mit Verfügbarkeit und Angebot. Für Gruppen dieser Größe schreiben Sie uns bitte mindestens {{OWNER: booking lead time}} im Voraus.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie groß kann die Gruppe sein?`, a: `Von 15 bis {{OWNER: max group size}} Gäste. Unter 15 passt die Küche im Oltrarno besser: unser <a href="/de/teambuilding-kochkurs-florenz/">Teambuilding-Kurs</a> für Firmen oder <a href="/de/privater-kochkurs-florenz/">Die lange Familientafel</a> für private Gruppen, beide für 6 bis 14 Personen.` },
            { q: `Wo findet ein Kurs für große Gruppen statt?`, a: `In {{OWNER: venue for groups over 14}}. Unsere Küche im Oltrarno, fünf Minuten vom Ponte Vecchio, fasst höchstens vierzehn Personen, und wir bringen eine größere Gruppe lieber dorthin, wo Platz ist, als die Hälfte auf ein Brett warten zu lassen. Wenn Sie lieber aufs Land möchten, nimmt unser <a href="/de/agriturismo-kochkurs-toskana/">Agriturismo-Kochkurs</a> Gruppen bis zu zwanzig Personen in der Küche eines arbeitenden Hofs vor Florenz auf.` },
            { q: `Wie funktioniert die Preisgestaltung?`, a: `{{OWNER: price model (per person or per group) and any minimum}}. Schicken Sie Personenzahl und Termine an ciao@handmadepastaflorence.com, und Sie erhalten innerhalb eines Werktags ein Angebot.` },
            { q: `Ist das nur für Firmen?`, a: `Nein. Familientreffen, runde Geburtstage und Freundesgruppen auf Reisen sind genauso willkommen. Gekocht wird gleich; sagen Sie uns den Anlass, und wir planen den Tag darum herum.` },
            { q: `Wird der Kurs auf Englisch gehalten?`, a: `Ja. Beide Köche unterrichten auf Englisch oder Italienisch, und die Anleitung ist praktisch und visuell, sodass auch gemischtsprachige Gruppen gut zurechtkommen. {{OWNER: other languages, if any}}` },
            { q: `Können Sie bei einer großen Gruppe auf Ernährungswünsche eingehen?`, a: `Ja. Glutenfreie Stationen ohne Aufpreis, vegetarisch ohne Aufpreis und vegan auf Vorankündigung mit einem Teig ohne Ei. Schicken Sie die vollständige Liste mit der Anfrage, dann kocht und isst jeder Gast mit.` },
            { q: `Wie früh sollten wir buchen?`, a: `Mindestens {{OWNER: booking lead time}} im Voraus. Je früher Sie schreiben, desto mehr Termine können wir anbieten.` },
            { q: `Braucht jemand Kocherfahrung?`, a: `Nein. Alle starten mit demselben Haufen Mehl: Die Geschäftsführerin faltet Ravioli genauso schief wie der neue Azubi, und der Cousin, der jeden Sonntag kocht, scheitert an der ersten Sfoglia wie alle anderen.` },
            { q: `Können Sie an unser Unternehmen eine Rechnung stellen?`, a: `Ja. Schicken Sie uns Firmenname, Rechnungsadresse und Umsatzsteuer-Identifikationsnummer mit der Anfrage, und Sie bekommen eine ordentliche Rechnung für das Event, deckungsgleich mit dem Angebot. Wenn Ihre Buchhaltung eine Bestellnummer oder eine bestimmte Formulierung auf der Rechnung braucht, sagen Sie es vor dem Termin, dann steht sie drauf.` },
            { q: `Was passiert, wenn wir den Termin verschieben oder absagen müssen?`, a: `Gruppenbuchungen werden vor jeder Zahlung schriftlich bestätigt, Termin und Konditionen zusammen. {{OWNER: deposit and cancellation terms for groups of 15+}}` },
          ],
          related: [
            { title: `Teambuilding, 6 bis 14`, href: `/de/teambuilding-kochkurs-florenz/`, desc: `Ein kleineres Team? Unsere private Küche im Oltrarno, fünf Minuten vom Ponte Vecchio.` },
            { title: `Die lange Familientafel`, href: `/de/privater-kochkurs-florenz/`, desc: `Eine private Feier für 6 bis 14, die ganze Küche für Sie, ab 680 €.` },
            { title: `Agriturismo-Kochkurs`, href: `/de/agriturismo-kochkurs-toskana/`, desc: `Bis zu 20 Gäste in der Küche eines arbeitenden Agriturismo in den Hügeln vor Florenz.` },
            { title: `Teambuilding in Florenz`, href: `/de/blog/team-building-activities-florence/`, desc: `Acht Formate nach Gruppengröße und Budget verglichen, von 6 bis über 60 Personen.` },
            { title: `Live-Online-Kurs`, href: `/de/online-pasta-kurs/`, desc: `Ein Teil des Teams arbeitet remote? Kochen Sie gemeinsam live von überall, ab 68 €.` },
          ],
          ctaLabel: `Gruppenangebot anfordern`,
          emailSubject: `Anfrage Gruppenevent`,
          breadcrumbName: `Gruppen-Kochkurs`,
          service: {
            name: `Gruppen-Kochkurs in Florenz ab 15 Personen`,
            description: `Ein praktischer Pasta-Kochkurs in Florenz für Gruppen von 15 bis {{OWNER: max group size}} Personen: Firmenevents, Teambuilding, Familientreffen und Feiern. Jeder Gast macht frische Pasta von Hand mit zwei toskanischen Agriturismo-Küchenchefs, danach isst die Gruppe gemeinsam. In {{OWNER: venue for groups over 14}}, auf Englisch oder Italienisch.`,
          },
        },
      },
      zh: {
        slug: 'tuanti-pengren-kecheng-foluolunsa',
        title: `佛罗伦萨团体烹饪课：企业活动与私人聚会，15人以上`,
        description: `在佛罗伦萨为15人以上团体开设的手工意面课：公司活动、团队建设、家庭聚会和生日派对。每位客人都亲手制作，最后大家围坐一桌，享用自己做的意面。`,
        cl: {
          eyebrow: `15人以上团体 · 企业与私人庆祝`,
          heading: `佛罗伦萨团体烹饪课，`,
          headingItal: `欢迎你们所有人。`,
          lede: `部门团建、家庭聚会、朋友多到餐厅一张桌子坐不下的生日派对：每个人都有自己的围裙、案板和面团，没有人站在后面旁观。我们教你们的团体亲手制作新鲜意面，授课的就是在两家托斯卡纳农庄为婚礼和宴席掌勺的主厨，最后让大家一起坐下，享用亲手做的成果。`,
          image: { src: img.longTablePoster, alt: `一大群人在同一张长桌旁并肩擀制新鲜意面`, w: 720, h: 432 },
          price: `{{OWNER: group price}}`,
          priceNote: `15至{{OWNER: max group size}}人 · {{OWNER: price model (per person or per group) and any minimum}}`,
          facts: [
            { label: `团体人数`, value: `15至{{OWNER: max group size}}人`, icon: 'people' },
            { label: `地点`, value: `{{OWNER: venue for groups over 14}}`, icon: 'map-pin' },
            { label: `时长`, value: `{{OWNER: event length}}`, icon: 'clock' },
            { label: `主厨`, value: `{{OWNER: number of chefs for large groups}}`, icon: 'chef-hat' },
            { label: `语言`, value: `英语或意大利语 {{OWNER: other languages, if any}}`, icon: 'globe' },
            { label: `提前预订`, value: `{{OWNER: booking lead time}}`, icon: 'calendar' },
            { label: `回复时间`, value: `一个工作日内`, icon: 'mail' },
          ],
          infoBanner: {
            menu: {
              title: `团体菜单`,
              items: [`{{OWNER: group menu}}`],
              text: `每位客人都亲手制作意面，上面的菜单就是团体随后在餐桌上享用的内容。`,
            },
            included: {
              title: `包含内容`,
              items: [
                `从头到尾的动手实践指导`,
                `<strong>讲英语</strong>的主厨`,
                `<strong>新鲜食材</strong>`,
                `{{OWNER: equipment per guest at the group venue}}`,
                `{{OWNER: drinks included}}`,
              ],
            },
            notIncluded: {
              title: `不包含内容`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `佛罗伦萨可以为大团体开设烹饪课吗？`,
              paras: [
                `可以，而且我们宁愿把它做好，也不愿把你们硬塞进来。我们奥特拉诺的厨房是按十四人设计的：人数再多，大家就不是在做饭，而是在排队了，所以我们的<a href="/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/">团队建设课程</a>和<a href="/zh/siren-pengren-kecheng-foluolunsa/">家庭长桌体验</a>都止步于此。十五人及以上的团体会在{{OWNER: venue for groups over 14}}和我们一起做饭，在那里每个人依然有自己的案板、自己的面团，还有一位离得足够近、能挽救一再破裂的折口的主厨。`,
                `形式不会因人数而改变：从第一分钟起就动手，没有坐着看的示范，最后用团体刚刚擀出的意面做成一顿饭。最多{{OWNER: max group size}}位客人，{{OWNER: how groups this size are run (one session, parallel stations or split sessions)}}。`,
              ],
            },
            {
              title: `企业、家庭和朋友`,
              paras: [
                `这一天为两类团体而设计。<strong>企业</strong>：外出团建、奖励旅游、来佛罗伦萨开会的部门，需要一个没人谈论会议的下午。<strong>私人团体</strong>：家庭聚会、重要生日、一起租了别墅的朋友、专程赶来参加婚礼的亲友。`,
                `厨房里的工作是一样的，节奏却不同。企业通常需要发票和明确的结束时间，我们会配合你们的日程。庆祝活动通常希望餐桌能坐到很晚：告诉我们你们在庆祝什么，我们会围绕这个场合安排这一天，就像我们的私人长桌晚宴一样。`,
              ],
            },
            {
              title: `团体会做什么菜？`,
              paras: [
                `每个人都亲手做意面，这正是这一天的意义。团体菜单为{{OWNER: group menu}}，食材当天新鲜采购。`,
                `人数这么多，特殊饮食需求是常态而非例外，所以请在咨询时就把完整清单发给我们，而不是当天才说。乳糜泻客人有专用的无麸质面粉配方和独立操作台，不收取额外费用；素食不加价；纯素需提前告知，用不加鸡蛋的面团，托斯卡纳一直就是这样做 pici 的。如果活动不在我们奥特拉诺的厨房举行，我们会在确认日期时与场地确认具体安排。`,
              ],
            },
            {
              title: `活动流程`,
              paras: [
                `时间安排配合你们的计划。企业通常用它代替一顿午餐，或作为外出团建的收尾晚宴；庆祝活动则更喜欢晚餐。一场团体活动时长为{{OWNER: event length}}：{{OWNER: event schedule}}。`,
                `它和我们所有的课程一样，以大家围坐餐桌、享用亲手做的意面结束，并且{{OWNER: drinks included}}。`,
              ],
            },
            {
              title: `授课主厨`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> 和 Marsel 是佛罗伦萨郊外山间两家农庄的主厨。为婚礼、宴席和农庄长桌制作意面是他们的日常工作，所以为一大群人做饭对他们来说并不新鲜。这种规模的团体，厨房团队为{{OWNER: number of chefs for large groups}}。更多内容请看<a href="/zh/#story">我们的故事</a>。`,
              ],
            },
            {
              title: `酒店、代理商及活动策划`,
              paras: [
                `我们还与酒店、民宿、农庄、旅行社和旅行规划师合作，提供合作伙伴价格、优先预订和快速确认。如果您正在为客人或客户策划佛罗伦萨的行程，请查看<a href="/zh/#business">我们如何与企业合作</a>，或直接发邮件给我们。`,
              ],
            },
            {
              title: `如何咨询`,
              paras: [
                `请发送邮件至 <a href="mailto:ciao@handmadepastaflorence.com?subject=Group%20event%20enquiry">ciao@handmadepastaflorence.com</a>，注明人数、首选日期，以及是企业活动还是私人庆祝。我们会在一个工作日内回复可用档期和报价。这种规模的团体，请至少提前{{OWNER: booking lead time}}来信。`,
              ],
            },
          ],
          faqs: [
            { q: `团体最多可以有多少人？`, a: `15人起，最多{{OWNER: max group size}}人。不足15人时，奥特拉诺的厨房更合适：企业可选<a href="/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/">团队建设课程</a>，私人团体可选<a href="/zh/siren-pengren-kecheng-foluolunsa/">家庭长桌体验</a>，均为6至14人。` },
            { q: `大团体的课程在哪里举行？`, a: `在{{OWNER: venue for groups over 14}}。我们奥特拉诺的厨房距老桥五分钟，最多容纳十四人；与其让一半人干等案板，我们宁愿把大团体带到更宽敞的地方。如果你们更喜欢乡间，我们的<a href="/zh/tuosikana-nongzhuang-pengren-kecheng/">农庄烹饪课程</a>可在佛罗伦萨郊外一座仍在运作的农庄厨房里接待最多二十人。` },
            { q: `报价是如何计算的？`, a: `{{OWNER: price model (per person or per group) and any minimum}}。把人数和日期发送至 ciao@handmadepastaflorence.com，您将在一个工作日内收到报价。` },
            { q: `只面向企业吗？`, a: `不是。家庭聚会、重要生日和结伴旅行的朋友同样欢迎。做的菜是一样的：告诉我们是什么场合，我们会围绕它安排这一天。` },
            { q: `课程用英语进行吗？`, a: `是的。两位主厨都可以用英语或意大利语授课，教学直观、以动手为主，所以混合语言的团体也完全没问题。{{OWNER: other languages, if any}}` },
            { q: `大团体的特殊饮食需求能照顾到吗？`, a: `可以。无麸质操作台不收取额外费用，素食不加价，纯素需提前告知并使用不加鸡蛋的面团。咨询时把完整清单发给我们，每位客人都能亲手做、亲口吃。` },
            { q: `需要提前多久预订？`, a: `至少提前{{OWNER: booking lead time}}。越早来信，我们能提供的日期越多。` },
            { q: `需要有烹饪经验吗？`, a: `不需要。所有人都从同一堆面粉开始：总经理包意式饺子和新来的实习生一样笨手笨脚，每个周日都下厨的表哥也会和大家一样，被第一张面皮难住。` },
            { q: `可以开具公司发票吗？`, a: `可以。询价时请把公司名称、开票地址和增值税号或税号一并发给我们，您会收到与报价一致的正式发票。如果贵司财务需要采购订单号或发票上的特定表述，请在活动日期之前告知，我们会写上去。` },
            { q: `如果我们需要改期或取消，会怎么样？`, a: `团体预订在任何付款之前都会以书面形式确认，日期与条款一并写清。{{OWNER: deposit and cancellation terms for groups of 15+}}` },
          ],
          related: [
            { title: `团队建设，6至14人`, href: `/zh/tuandui-jianshe-pengren-kecheng-foluolunsa/`, desc: `团队人数较少？我们奥特拉诺的私人厨房，距老桥五分钟。` },
            { title: `家庭长桌体验`, href: `/zh/siren-pengren-kecheng-foluolunsa/`, desc: `6至14人的私人庆祝，整个厨房专属于你们，680欧元起。` },
            { title: `农庄烹饪课程`, href: `/zh/tuosikana-nongzhuang-pengren-kecheng/`, desc: `最多20人，在佛罗伦萨郊外山间一座仍在运作的农庄厨房里。` },
            { title: `佛罗伦萨团队建设`, href: `/zh/blog/team-building-activities-florence/`, desc: `按人数和预算对比八种团建形式，从6人到60人以上。` },
            { title: `在线直播课程`, href: `/zh/zaixian-yidali-mian-kecheng/`, desc: `部分同事远程办公？在任何地方一起在线直播烹饪，68欧元起。` },
          ],
          ctaLabel: `获取团体报价`,
          emailSubject: `团体活动咨询`,
          breadcrumbName: `团体烹饪课程`,
          service: {
            name: `佛罗伦萨15人以上团体烹饪课程`,
            description: `在佛罗伦萨为15至{{OWNER: max group size}}人团体开设的动手意面课程：企业活动、团队建设、家庭聚会和各类庆祝。每位客人都与两位托斯卡纳农庄主厨一起手工制作新鲜意面，然后全体共享一餐。地点：{{OWNER: venue for groups over 14}}，以英语或意大利语授课。`,
          },
        },
      },
    },
  },

  // O2. Cheese tasting / pasta and Tuscan cheese.
  //
  // Why: `meisterkurs über käse in florenz genießen sie ein ganzes käsebrett`
  // (129 impressions, pos 18.4) is the German title of a Viator product,
  // "Masterclass On Cheese In Florence: Enjoy A Whole Cheese Board". OTA
  // shoppers are searching for it by name, and Google shows us with no cheese
  // page. Competitors sell cheese tastings, a mozzarella workshop and a flambé
  // cheese-wheel pasta class.
  //
  // FORMAT IS THE OWNER'S CALL: an add-on to The Chef's Table (the analysis
  // recommends starting there) or a standalone tasting. The copy reads correctly
  // either way once the format placeholders are filled.
  //   Add-on:     leave courseMode unset (a variant of the same class; see
  //               LandingPage.courseMode) and link it from the pasta-making page.
  //   Standalone: set courseMode 'Onsite' and courseDuration (e.g. 'PT1H30M').
  // Once the price is fixed this can move from the email CTA to the booking
  // drawer (`prefill: 'florence'`, no emailSubject), which needs a new choice
  // in BookingDrawer.astro.
  //
  // Hero image: `plates` is the only photo on file with cheese in it (a Tuscan
  // antipasto board with burrata and red wine, salumi included). Swap in a
  // photo of the real cheese board when there is one.
  cheese: {
    floatingCta: false,
    locales: {
      en: {
        slug: 'cheese-tasting-florence',
        title: `Cheese Tasting in Florence: A Tuscan Board with a Chef`,
        description: `A Tuscan cheese tasting in Florence, led by two agriturismo head chefs: a whole board, the people behind each cheese, and how Tuscans really eat it.`,
        cl: {
          eyebrow: `Tuscan cheese tasting · Florence`,
          heading: `A cheese tasting in Florence,`,
          headingItal: `with the chefs who cook with it.`,
          lede: `A whole board of Tuscan cheese, cut and explained by the two chefs who cook with it at their agriturismi. You taste each one, learn who made it and how long it aged, and leave knowing exactly what to ask for at the cheese counter. You book it {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
          image: { src: img.plates, alt: `A Tuscan board of cured meats and cheese beside burrata, cherry tomatoes and two glasses of red wine`, w: 1080, h: 1327 },
          price: `{{OWNER: price per person}}`,
          priceNote: `per person · {{OWNER: add-on to The Chef's Table or standalone tasting}}`,
          facts: [
            { label: `Format`, value: `{{OWNER: add-on to The Chef's Table or standalone tasting}}`, icon: 'tag' },
            { label: `On the board`, value: `{{OWNER: number of cheeses}} Tuscan cheeses`, icon: 'leaf' },
            { label: `Length`, value: `{{OWNER: tasting length}}`, icon: 'clock' },
            { label: `Group size`, value: `max {{OWNER: max group size}} guests`, icon: 'people' },
            { label: `Wine`, value: `{{OWNER: wine pairing yes/no}}`, icon: 'table' },
            { label: `Where`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `When`, value: `{{OWNER: days and times}}`, icon: 'calendar' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `On the board`,
              items: [`{{OWNER: cheeses and producers}}`],
              text: `Served with {{OWNER: accompaniments}}.`,
            },
            included: {
              title: `What’s included`,
              items: [
                `A guided tasting with one of our chefs`,
                `<strong>English speaking</strong> chefs`,
                `{{OWNER: wine pairing yes/no}}`,
              ],
            },
            notIncluded: {
              title: `What’s not included`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `What is on a Tuscan cheese board?`,
              paras: [
                `Tuscany is sheep's-milk country, and its signature cheese is pecorino: eaten young and soft, aged until it turns firm and nutty, or aged long enough to crumble. Tuscan bread has no salt in it for exactly this reason: it was made to be eaten with salty things like pecorino and salumi.`,
                `Our board is {{OWNER: cheeses and producers}}. For each one we tell you who made it, what milk it comes from and how long it aged, and we taste from the mildest to the strongest, because that is the order a palate can follow.`,
              ],
            },
            {
              title: `Why taste cheese with a chef?`,
              paras: [
                `A sommelier will tell you what to drink with it. We tell you what to cook with it: which cheese you grate over pasta, which one you eat with honey, and which one you never put near a pan. It is the tasting we would give a friend visiting the kitchen, and what you learn goes straight back into the food you make at home.`,
              ],
            },
            {
              title: `How the tasting fits in`,
              paras: [
                `{{OWNER: add-on to The Chef's Table or standalone tasting}}. Either way it works like every class of ours: a chef in front of you, real food rather than a demonstration, and nothing rushed.`,
                `If you have not booked the pasta yet, <a href="/pasta-making-class-florence/">The Chef's Table</a> is three hands-on hours in our Oltrarno kitchen: fettuccine, ravioli and tiramisù, €95 with a glass of wine included.`,
              ],
            },
            {
              title: `Who is teaching`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> and Marsel are the head chefs of two agriturismi in the hills outside Florence. Tuscan cheese runs through what they cook, from the antipasto board to the filling to the pasta, so this is a tasting by people who use it, not people who sell it. You can read more <a href="/#story">in our story</a>.`,
              ],
            },
            {
              title: `Good to know`,
              paras: [],
              list: [
                `Vegetarian, pregnant or lactose intolerant? Tell us when you book. {{OWNER: dietary notes (rennet, raw milk, lactose)}}`,
                `Please book at least {{OWNER: booking lead time}} ahead.`,
                `Want to buy what you liked? Our guide to <a href="/blog/florence-food-markets-sant-ambrogio-mercato-centrale/">Florence's food markets</a> is where we would start.`,
              ],
            },
            {
              title: `How to book`,
              paras: [
                `Email <a href="mailto:ciao@handmadepastaflorence.com?subject=Cheese%20tasting%20enquiry">ciao@handmadepastaflorence.com</a> with your date and how many of you are coming. We reply within one working day.`,
              ],
            },
          ],
          faqs: [
            { q: `Is the cheese tasting an add-on or a separate experience?`, a: `{{OWNER: add-on to The Chef's Table or standalone tasting}}.` },
            { q: `Which cheeses are on the board?`, a: `{{OWNER: cheeses and producers}}. We tell you who made each one and how long it aged, and we taste from the mildest to the strongest.` },
            { q: `How long does the tasting take?`, a: `{{OWNER: tasting length}}.` },
            { q: `How much does it cost?`, a: `{{OWNER: price per person}} per person. The Chef's Table pasta class is €95 per person, with a glass of wine included.` },
            { q: `Is wine included?`, a: `{{OWNER: wine pairing yes/no}}.` },
            { q: `Can vegetarians or pregnant guests join?`, a: `{{OWNER: dietary notes (rennet, raw milk, lactose)}}. Tell us when you book and we will tell you honestly which cheeses you can eat.` },
            { q: `How many people can join?`, a: `Up to {{OWNER: max group size}} guests.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `Our signature 3-hour pasta class: fettuccine, ravioli and tiramisù, with wine. €95.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Shop Sant'Ambrogio market at dawn, then cook the basket. 5 hours, max 6 guests, €145.` },
            { title: `What to eat in Florence`, href: `/blog/what-to-eat-in-florence/`, desc: `The dishes that are genuinely Florentine, from a Tuscan cook.` },
            { title: `Florence's food markets`, href: `/blog/florence-food-markets-sant-ambrogio-mercato-centrale/`, desc: `Sant'Ambrogio or Mercato Centrale: where locals shop and what to buy in season.` },
            { title: `Gift a Cooking Class`, href: `/gift-a-cooking-class-florence/`, desc: `A voucher instead of another object. Any class, from €68, and they pick the date.` },
          ],
          ctaLabel: `Ask about the tasting`,
          emailSubject: `Cheese tasting enquiry`,
          breadcrumbName: `Cheese Tasting in Florence`,
          product: {
            name: `Tuscan Cheese Tasting in Florence`,
            description: `A guided Tuscan cheese tasting in Florence led by two agriturismo head chefs: {{OWNER: number of cheeses}} cheeses ({{OWNER: cheeses and producers}}), {{OWNER: tasting length}}, {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
            // Digits only once filled (e.g. '35'): it becomes the JSON-LD Offer price.
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      it: {
        slug: 'degustazione-formaggi-firenze',
        title: `Degustazione Formaggi Firenze: Tagliere Toscano con lo Chef`,
        description: `Degustazione di formaggi toscani a Firenze con due head chef di agriturismo: un tagliere intero, chi ha fatto ogni formaggio e come lo mangiano i toscani.`,
        cl: {
          eyebrow: `Degustazione di formaggi toscani · Firenze`,
          heading: `Una degustazione di formaggi a Firenze,`,
          headingItal: `con gli chef che li usano in cucina.`,
          lede: `Un tagliere intero di formaggi toscani, tagliato e raccontato dai due chef che li usano nelle loro cucine di agriturismo. Assaggiate ogni formaggio, scoprite chi l'ha fatto e quanto ha stagionato, e uscite sapendo esattamente cosa chiedere al banco del formaggio. Si prenota {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
          image: { src: img.plates, alt: `Un tagliere toscano di salumi e formaggi accanto a una burrata, pomodorini e due calici di vino rosso`, w: 1080, h: 1327 },
          price: `{{OWNER: price per person}}`,
          priceNote: `a persona · {{OWNER: add-on to The Chef's Table or standalone tasting}}`,
          facts: [
            { label: `Formato`, value: `{{OWNER: add-on to The Chef's Table or standalone tasting}}`, icon: 'tag' },
            { label: `Sul tagliere`, value: `{{OWNER: number of cheeses}} formaggi toscani`, icon: 'leaf' },
            { label: `Durata`, value: `{{OWNER: tasting length}}`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max {{OWNER: max group size}} ospiti`, icon: 'people' },
            { label: `Vino`, value: `{{OWNER: wine pairing yes/no}}`, icon: 'table' },
            { label: `Dove`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Quando`, value: `{{OWNER: days and times}}`, icon: 'calendar' },
            { label: `Lingua`, value: `inglese o italiano`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Sul tagliere`,
              items: [`{{OWNER: cheeses and producers}}`],
              text: `Servito con {{OWNER: accompaniments}}.`,
            },
            included: {
              title: `Cosa è incluso`,
              items: [
                `Degustazione guidata con uno dei nostri chef`,
                `Chef che <strong>parlano inglese</strong>`,
                `{{OWNER: wine pairing yes/no}}`,
              ],
            },
            notIncluded: {
              title: `Cosa non è incluso`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Cosa c'è su un tagliere di formaggi toscano?`,
              paras: [
                `La Toscana è terra di latte di pecora, e il suo formaggio simbolo è il pecorino: giovane e morbido, stagionato fino a diventare compatto e nocciolato, o così a lungo da sbriciolarsi. Il pane toscano è senza sale proprio per questo: è nato per accompagnare cose saporite come il pecorino e i salumi.`,
                `Il nostro tagliere è {{OWNER: cheeses and producers}}. Per ognuno vi diciamo chi l'ha fatto, da che latte nasce e quanto ha stagionato, e assaggiamo dal più delicato al più deciso, perché è l'ordine che il palato riesce a seguire.`,
              ],
            },
            {
              title: `Perché assaggiare il formaggio con uno chef?`,
              paras: [
                `Un sommelier vi dice cosa berci insieme. Noi vi diciamo cosa cucinarci: quale formaggio si grattugia sulla pasta, quale si mangia con il miele e quale non va mai in padella. È la degustazione che faremmo a un amico in visita in cucina, e quello che imparate torna dritto nei piatti che cucinate a casa.`,
              ],
            },
            {
              title: `Come si inserisce la degustazione`,
              paras: [
                `{{OWNER: add-on to The Chef's Table or standalone tasting}}. In ogni caso funziona come tutti i nostri corsi: uno chef davanti a voi, cibo vero e non una dimostrazione, e nessuna fretta.`,
                `Se non avete ancora prenotato la pasta, <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a> sono tre ore pratiche nella nostra cucina in Oltrarno: fettuccine, ravioli e tiramisù, €95 con un calice di vino incluso.`,
              ],
            },
            {
              title: `Chi insegna`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> e Marsel sono gli head chef di due agriturismi sulle colline fuori Firenze. Il formaggio toscano attraversa tutta la loro cucina, dal tagliere dell'antipasto al ripieno fino alla pasta, quindi è una degustazione fatta da chi lo usa, non da chi lo vende. Potete leggere di più <a href="/it/#story">nella nostra storia</a>.`,
              ],
            },
            {
              title: `Buono a sapersi`,
              paras: [],
              list: [
                `Vegetariani, in gravidanza o intolleranti al lattosio? Ditecelo quando prenotate. {{OWNER: dietary notes (rennet, raw milk, lactose)}}`,
                `Prenotate con almeno {{OWNER: booking lead time}} di anticipo.`,
                `Volete comprare quello che vi è piaciuto? La nostra guida ai <a href="/it/blog/florence-food-markets-sant-ambrogio-mercato-centrale/">mercati di Firenze</a> è il punto da cui partiremmo.`,
              ],
            },
            {
              title: `Come prenotare`,
              paras: [
                `Scrivete a <a href="mailto:ciao@handmadepastaflorence.com?subject=Richiesta%20degustazione%20formaggi">ciao@handmadepastaflorence.com</a> con la data e il numero di persone. Rispondiamo entro un giorno lavorativo.`,
              ],
            },
          ],
          faqs: [
            { q: `La degustazione è un'aggiunta al corso o un'esperienza a sé?`, a: `{{OWNER: add-on to The Chef's Table or standalone tasting}}.` },
            { q: `Quali formaggi ci sono sul tagliere?`, a: `{{OWNER: cheeses and producers}}. Per ognuno vi diciamo chi l'ha fatto e quanto ha stagionato, e assaggiamo dal più delicato al più deciso.` },
            { q: `Quanto dura la degustazione?`, a: `{{OWNER: tasting length}}.` },
            { q: `Quanto costa?`, a: `{{OWNER: price per person}} a persona. Il corso di pasta Il Tavolo dello Chef costa €95 a persona, con un calice di vino incluso.` },
            { q: `Il vino è incluso?`, a: `{{OWNER: wine pairing yes/no}}.` },
            { q: `Possono partecipare vegetariani o donne in gravidanza?`, a: `{{OWNER: dietary notes (rennet, raw milk, lactose)}}. Ditecelo quando prenotate e vi diremo onestamente quali formaggi potete mangiare.` },
            { q: `Quante persone possono partecipare?`, a: `Fino a {{OWNER: max group size}} ospiti.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Il nostro corso di pasta di 3 ore: fettuccine, ravioli e tiramisù, con vino. €95.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Spesa al mercato di Sant'Ambrogio all'alba, poi si cucina. 5 ore, max 6 ospiti, €145.` },
            { title: `Cosa mangiare a Firenze`, href: `/it/blog/what-to-eat-in-florence/`, desc: `I piatti davvero fiorentini, raccontati da un cuoco toscano.` },
            { title: `I mercati di Firenze`, href: `/it/blog/florence-food-markets-sant-ambrogio-mercato-centrale/`, desc: `Sant'Ambrogio o Mercato Centrale: dove fanno la spesa i fiorentini e cosa comprare di stagione.` },
            { title: `Regala un Corso di Cucina`, href: `/it/regala-corso-di-cucina-firenze/`, desc: `Un buono invece dell'ennesimo oggetto. Qualsiasi corso, da €68, con la data a scelta.` },
          ],
          ctaLabel: `Chiedi della degustazione`,
          emailSubject: `Richiesta degustazione formaggi`,
          breadcrumbName: `Degustazione di Formaggi a Firenze`,
          product: {
            name: `Degustazione di Formaggi Toscani a Firenze`,
            description: `Una degustazione guidata di formaggi toscani a Firenze con due head chef di agriturismo: {{OWNER: number of cheeses}} formaggi ({{OWNER: cheeses and producers}}), {{OWNER: tasting length}}, {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      fr: {
        slug: 'degustation-fromages-florence',
        title: `Dégustation de Fromages à Florence avec un Chef Toscan`,
        description: `Dégustation de fromages toscans à Florence avec deux chefs d'agritourisme : un plateau entier, qui a fait chaque fromage et comment les Toscans le mangent.`,
        cl: {
          eyebrow: `Dégustation de fromages toscans · Florence`,
          heading: `Une dégustation de fromages à Florence,`,
          headingItal: `avec les chefs qui les cuisinent.`,
          lede: `Un plateau entier de fromages toscans, coupé et raconté par les deux chefs qui les cuisinent dans leurs agriturismi. Vous goûtez chacun, apprenez qui l'a fait et combien de temps il a été affiné, et repartez en sachant exactement quoi demander au comptoir du fromager. La dégustation se réserve {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
          image: { src: img.plates, alt: `Un plateau toscan de charcuterie et de fromages à côté d'une burrata, de tomates cerises et de deux verres de vin rouge`, w: 1080, h: 1327 },
          price: `{{OWNER: price per person}}`,
          priceNote: `par personne · {{OWNER: add-on to The Chef's Table or standalone tasting}}`,
          facts: [
            { label: `Format`, value: `{{OWNER: add-on to The Chef's Table or standalone tasting}}`, icon: 'tag' },
            { label: `Au plateau`, value: `{{OWNER: number of cheeses}} fromages toscans`, icon: 'leaf' },
            { label: `Durée`, value: `{{OWNER: tasting length}}`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max {{OWNER: max group size}} personnes`, icon: 'people' },
            { label: `Vin`, value: `{{OWNER: wine pairing yes/no}}`, icon: 'table' },
            { label: `Lieu`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Quand`, value: `{{OWNER: days and times}}`, icon: 'calendar' },
            { label: `Langue`, value: `anglais ou italien`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Au plateau`,
              items: [`{{OWNER: cheeses and producers}}`],
              text: `Servi avec {{OWNER: accompaniments}}.`,
            },
            included: {
              title: `Ce qui est inclus`,
              items: [
                `Une dégustation guidée avec l'un de nos chefs`,
                `Chefs <strong>anglophones</strong>`,
                `{{OWNER: wine pairing yes/no}}`,
              ],
            },
            notIncluded: {
              title: `Ce qui n'est pas inclus`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Qu'y a-t-il sur un plateau de fromages toscans ?`,
              paras: [
                `La Toscane est une terre de lait de brebis, et son fromage emblématique est le pecorino : jeune et tendre, affiné jusqu'à devenir ferme et noisetté, ou assez longtemps pour s'émietter. Le pain toscan est sans sel précisément pour cela : il a été fait pour accompagner des choses salées comme le pecorino et la charcuterie.`,
                `Notre plateau, c'est {{OWNER: cheeses and producers}}. Pour chacun, nous vous disons qui l'a fait, de quel lait il vient et combien de temps il a été affiné, et nous goûtons du plus doux au plus fort, parce que c'est l'ordre que le palais peut suivre.`,
              ],
            },
            {
              title: `Pourquoi déguster le fromage avec un chef ?`,
              paras: [
                `Un sommelier vous dira quoi boire avec. Nous vous disons quoi cuisiner avec : quel fromage se râpe sur les pâtes, lequel se mange avec du miel et lequel ne va jamais dans une poêle. C'est la dégustation que nous ferions à un ami de passage en cuisine, et ce que vous apprenez repart directement dans ce que vous cuisinez chez vous.`,
              ],
            },
            {
              title: `Comment s'organise la dégustation`,
              paras: [
                `{{OWNER: add-on to The Chef's Table or standalone tasting}}. Dans tous les cas, elle fonctionne comme tous nos cours : un chef en face de vous, de vrais produits plutôt qu'une démonstration, et rien de précipité.`,
                `Si vous n'avez pas encore réservé les pâtes, <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a>, ce sont trois heures de pratique dans notre cuisine de l'Oltrarno : fettuccine, ravioli et tiramisù, 95 € avec un verre de vin compris.`,
              ],
            },
            {
              title: `Qui enseigne`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> et Marsel sont les chefs de cuisine de deux agriturismi dans les collines autour de Florence. Le fromage toscan traverse toute leur cuisine, du plateau d'antipasti à la farce et jusqu'aux pâtes : c'est une dégustation menée par ceux qui l'utilisent, pas par ceux qui le vendent. Vous pouvez en lire plus <a href="/fr/#story">dans notre histoire</a>.`,
              ],
            },
            {
              title: `Bon à savoir`,
              paras: [],
              list: [
                `Végétarien, enceinte ou intolérant au lactose ? Dites-le-nous à la réservation. {{OWNER: dietary notes (rennet, raw milk, lactose)}}`,
                `Réservez au moins {{OWNER: booking lead time}} à l'avance.`,
                `Envie d'acheter ce qui vous a plu ? Notre guide des <a href="/fr/blog/florence-food-markets-sant-ambrogio-mercato-centrale/">marchés de Florence</a> est le bon point de départ.`,
              ],
            },
            {
              title: `Comment réserver`,
              paras: [
                `Écrivez à <a href="mailto:ciao@handmadepastaflorence.com?subject=Demande%20d%C3%A9gustation%20de%20fromages">ciao@handmadepastaflorence.com</a> avec votre date et le nombre de personnes. Nous répondons sous un jour ouvré.`,
              ],
            },
          ],
          faqs: [
            { q: `La dégustation est-elle une option du cours ou une expérience à part ?`, a: `{{OWNER: add-on to The Chef's Table or standalone tasting}}.` },
            { q: `Quels fromages sont sur le plateau ?`, a: `{{OWNER: cheeses and producers}}. Pour chacun, nous vous disons qui l'a fait et combien de temps il a été affiné, et nous goûtons du plus doux au plus fort.` },
            { q: `Combien de temps dure la dégustation ?`, a: `{{OWNER: tasting length}}.` },
            { q: `Combien cela coûte-t-il ?`, a: `{{OWNER: price per person}} par personne. Le cours de pâtes La Table du Chef coûte 95 € par personne, avec un verre de vin compris.` },
            { q: `Le vin est-il compris ?`, a: `{{OWNER: wine pairing yes/no}}.` },
            { q: `Les végétariens ou les femmes enceintes peuvent-ils participer ?`, a: `{{OWNER: dietary notes (rennet, raw milk, lactose)}}. Dites-le-nous à la réservation et nous vous dirons honnêtement quels fromages vous pouvez manger.` },
            { q: `Combien de personnes peuvent participer ?`, a: `Jusqu'à {{OWNER: max group size}} personnes.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Notre cours de pâtes signature de 3 heures : fettuccine, ravioli et tiramisù, avec du vin. 95 €.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Le marché de Sant'Ambrogio à l'aube, puis on cuisine le panier. 5 heures, max 6 personnes, 145 €.` },
            { title: `Que manger à Florence`, href: `/fr/blog/what-to-eat-in-florence/`, desc: `Les plats vraiment florentins, par un cuisinier toscan.` },
            { title: `Les marchés de Florence`, href: `/fr/blog/florence-food-markets-sant-ambrogio-mercato-centrale/`, desc: `Sant'Ambrogio ou Mercato Centrale : où font leurs courses les Florentins et quoi acheter selon la saison.` },
            { title: `Offrir un Cours de Cuisine`, href: `/fr/offrir-cours-de-cuisine-florence/`, desc: `Un bon cadeau plutôt qu'un objet de plus. N'importe quel cours, à partir de 68 €, à la date de leur choix.` },
          ],
          ctaLabel: `Se renseigner sur la dégustation`,
          emailSubject: `Demande dégustation de fromages`,
          breadcrumbName: `Dégustation de Fromages à Florence`,
          product: {
            name: `Dégustation de Fromages Toscans à Florence`,
            description: `Une dégustation guidée de fromages toscans à Florence avec deux chefs d'agritourisme : {{OWNER: number of cheeses}} fromages ({{OWNER: cheeses and producers}}), {{OWNER: tasting length}}, {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      de: {
        slug: 'kaeseverkostung-florenz',
        title: `Käseverkostung in Florenz: Toskanisches Käsebrett mit Koch`,
        description: `Toskanische Käseverkostung in Florenz mit zwei Agriturismo-Küchenchefs: ein ganzes Käsebrett, wer jeden Käse macht und wie man ihn in der Toskana isst.`,
        cl: {
          eyebrow: `Toskanische Käseverkostung · Florenz`,
          heading: `Eine Käseverkostung in Florenz,`,
          headingItal: `mit den Köchen, die damit kochen.`,
          lede: `Ein ganzes Brett toskanischer Käse, aufgeschnitten und erklärt von den zwei Köchen, die in ihren Agriturismi damit kochen. Sie probieren jeden einzelnen, erfahren, wer ihn gemacht hat und wie lange er gereift ist, und wissen danach genau, was Sie an der Käsetheke verlangen. Gebucht wird die Verkostung {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
          image: { src: img.plates, alt: `Ein toskanisches Brett mit Wurst und Käse neben Burrata, Kirschtomaten und zwei Gläsern Rotwein`, w: 1080, h: 1327 },
          price: `{{OWNER: price per person}}`,
          priceNote: `pro Person · {{OWNER: add-on to The Chef's Table or standalone tasting}}`,
          facts: [
            { label: `Format`, value: `{{OWNER: add-on to The Chef's Table or standalone tasting}}`, icon: 'tag' },
            { label: `Auf dem Brett`, value: `{{OWNER: number of cheeses}} toskanische Käse`, icon: 'leaf' },
            { label: `Dauer`, value: `{{OWNER: tasting length}}`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. {{OWNER: max group size}} Gäste`, icon: 'people' },
            { label: `Wein`, value: `{{OWNER: wine pairing yes/no}}`, icon: 'table' },
            { label: `Ort`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Wann`, value: `{{OWNER: days and times}}`, icon: 'calendar' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Auf dem Brett`,
              items: [`{{OWNER: cheeses and producers}}`],
              text: `Serviert mit {{OWNER: accompaniments}}.`,
            },
            included: {
              title: `Was inklusive ist`,
              items: [
                `Geführte Verkostung mit einem unserer Köche`,
                `<strong>Englischsprachige</strong> Köche`,
                `{{OWNER: wine pairing yes/no}}`,
              ],
            },
            notIncluded: {
              title: `Was nicht inklusive ist`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `Was gehört auf ein toskanisches Käsebrett?`,
              paras: [
                `Die Toskana ist Schafsmilchland, und ihr typischster Käse ist der Pecorino: jung und weich, gereift, bis er fest und nussig ist, oder so lange, dass er bröckelt. Toskanisches Brot hat genau deshalb kein Salz: Es wurde gebacken, um mit kräftig gesalzenen Dingen wie Pecorino und Salumi gegessen zu werden.`,
                `Auf unserem Brett liegt {{OWNER: cheeses and producers}}. Zu jedem Käse sagen wir Ihnen, wer ihn gemacht hat, aus welcher Milch er ist und wie lange er gereift ist, und wir probieren vom mildesten zum kräftigsten, weil der Gaumen dieser Reihenfolge folgen kann.`,
              ],
            },
            {
              title: `Warum Käse mit einem Koch verkosten?`,
              paras: [
                `Ein Sommelier sagt Ihnen, was Sie dazu trinken. Wir sagen Ihnen, was Sie damit kochen: welcher Käse über die Pasta gerieben wird, welcher mit Honig gegessen wird und welcher nie in eine Pfanne gehört. Es ist die Verkostung, die wir einem Freund in unserer Küche geben würden, und was Sie lernen, landet direkt in dem, was Sie zu Hause kochen.`,
              ],
            },
            {
              title: `Wie die Verkostung eingebunden ist`,
              paras: [
                `{{OWNER: add-on to The Chef's Table or standalone tasting}}. So oder so funktioniert sie wie jeder unserer Kurse: ein Koch vor Ihnen, echtes Essen statt einer Vorführung, und keine Eile.`,
                `Wenn Sie die Pasta noch nicht gebucht haben: <a href="/de/pasta-kurs-florenz/">Der Tisch des Küchenchefs</a> sind drei praktische Stunden in unserer Küche im Oltrarno, mit Fettuccine, Ravioli und Tiramisù, für 95 € mit einem Glas Wein inklusive.`,
              ],
            },
            {
              title: `Wer unterrichtet`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> und Marsel sind die Küchenchefs zweier Agriturismi in den Hügeln vor Florenz. Toskanischer Käse zieht sich durch ihre ganze Küche, vom Antipasto-Brett über die Füllung bis auf die Pasta: Diese Verkostung machen Leute, die ihn verwenden, nicht Leute, die ihn verkaufen. Mehr dazu <a href="/de/#story">in unserer Geschichte</a>.`,
              ],
            },
            {
              title: `Gut zu wissen`,
              paras: [],
              list: [
                `Vegetarisch, schwanger oder laktoseintolerant? Sagen Sie es uns bei der Buchung. {{OWNER: dietary notes (rennet, raw milk, lactose)}}`,
                `Bitte buchen Sie mindestens {{OWNER: booking lead time}} im Voraus.`,
                `Sie möchten kaufen, was Ihnen geschmeckt hat? Unser Guide zu den <a href="/de/blog/florence-food-markets-sant-ambrogio-mercato-centrale/">Märkten in Florenz</a> ist der beste Anfang.`,
              ],
            },
            {
              title: `So buchen Sie`,
              paras: [
                `Schreiben Sie an <a href="mailto:ciao@handmadepastaflorence.com?subject=Anfrage%20K%C3%A4severkostung">ciao@handmadepastaflorence.com</a> mit Ihrem Termin und der Personenzahl. Wir antworten innerhalb eines Werktags.`,
              ],
            },
          ],
          faqs: [
            { q: `Ist die Käseverkostung ein Zusatz zum Kurs oder ein eigenes Erlebnis?`, a: `{{OWNER: add-on to The Chef's Table or standalone tasting}}.` },
            { q: `Welche Käse liegen auf dem Brett?`, a: `{{OWNER: cheeses and producers}}. Zu jedem sagen wir Ihnen, wer ihn gemacht hat und wie lange er gereift ist, und wir probieren vom mildesten zum kräftigsten.` },
            { q: `Wie lange dauert die Verkostung?`, a: `{{OWNER: tasting length}}.` },
            { q: `Was kostet sie?`, a: `{{OWNER: price per person}} pro Person. Der Pasta-Kurs Der Tisch des Küchenchefs kostet 95 € pro Person, mit einem Glas Wein inklusive.` },
            { q: `Ist Wein inklusive?`, a: `{{OWNER: wine pairing yes/no}}.` },
            { q: `Können Vegetarier oder Schwangere teilnehmen?`, a: `{{OWNER: dietary notes (rennet, raw milk, lactose)}}. Sagen Sie es uns bei der Buchung, und wir sagen Ihnen ehrlich, welche Käse Sie essen können.` },
            { q: `Wie viele Personen können teilnehmen?`, a: `Bis zu {{OWNER: max group size}} Gäste.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Unser 3-stündiger Signature-Pasta-Kurs: Fettuccine, Ravioli und Tiramisù, mit Wein. 95 €.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Im Morgengrauen über den Sant'Ambrogio-Markt, dann kochen. 5 Stunden, max. 6 Gäste, 145 €.` },
            { title: `Was man in Florenz isst`, href: `/de/blog/what-to-eat-in-florence/`, desc: `Die wirklich florentinischen Gerichte, von einem toskanischen Koch.` },
            { title: `Märkte in Florenz`, href: `/de/blog/florence-food-markets-sant-ambrogio-mercato-centrale/`, desc: `Sant'Ambrogio oder Mercato Centrale: wo Einheimische einkaufen und was es saisonal gibt.` },
            { title: `Kochkurs verschenken`, href: `/de/kochkurs-verschenken-florenz/`, desc: `Ein Gutschein statt noch eines Gegenstands. Jeder Kurs, ab 68 €, und der Termin ist frei wählbar.` },
          ],
          ctaLabel: `Zur Verkostung anfragen`,
          emailSubject: `Anfrage Käseverkostung`,
          breadcrumbName: `Käseverkostung in Florenz`,
          product: {
            name: `Toskanische Käseverkostung in Florenz`,
            description: `Eine geführte Verkostung toskanischer Käse in Florenz mit zwei Agriturismo-Küchenchefs: {{OWNER: number of cheeses}} Käse ({{OWNER: cheeses and producers}}), {{OWNER: tasting length}}, {{OWNER: add-on to The Chef's Table or standalone tasting}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      zh: {
        slug: 'nailao-pinjian-foluolunsa',
        title: `佛罗伦萨奶酪品鉴：主厨带你品尝托斯卡纳奶酪拼盘`,
        description: `在佛罗伦萨，由两位托斯卡纳农庄主厨带领品鉴一整块托斯卡纳奶酪拼盘：每种奶酪出自谁手、熟成多久，以及托斯卡纳人究竟怎么吃。`,
        cl: {
          eyebrow: `托斯卡纳奶酪品鉴 · 佛罗伦萨`,
          heading: `佛罗伦萨奶酪品鉴，`,
          headingItal: `由用它做菜的主厨带领。`,
          lede: `一整块托斯卡纳奶酪拼盘，由两位在农庄厨房里用它做菜的主厨亲手切开、逐一讲解。你会品尝每一种奶酪，了解它出自谁手、熟成了多久，离开时清楚知道在奶酪柜台前该点什么。预订方式：{{OWNER: add-on to The Chef's Table or standalone tasting}}。`,
          image: { src: img.plates, alt: `托斯卡纳冷切肉与奶酪拼盘，旁边是布拉塔奶酪、小番茄和两杯红葡萄酒`, w: 1080, h: 1327 },
          price: `{{OWNER: price per person}}`,
          priceNote: `每人 · {{OWNER: add-on to The Chef's Table or standalone tasting}}`,
          facts: [
            { label: `形式`, value: `{{OWNER: add-on to The Chef's Table or standalone tasting}}`, icon: 'tag' },
            { label: `拼盘内容`, value: `{{OWNER: number of cheeses}}种托斯卡纳奶酪`, icon: 'leaf' },
            { label: `时长`, value: `{{OWNER: tasting length}}`, icon: 'clock' },
            { label: `人数`, value: `最多{{OWNER: max group size}}位客人`, icon: 'people' },
            { label: `葡萄酒`, value: `{{OWNER: wine pairing yes/no}}`, icon: 'table' },
            { label: `地点`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `时间`, value: `{{OWNER: days and times}}`, icon: 'calendar' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `拼盘内容`,
              items: [`{{OWNER: cheeses and producers}}`],
              text: `搭配{{OWNER: accompaniments}}。`,
            },
            included: {
              title: `包含内容`,
              items: [
                `由我们的一位主厨带领品鉴讲解`,
                `<strong>讲英语</strong>的主厨`,
                `{{OWNER: wine pairing yes/no}}`,
              ],
            },
            notIncluded: {
              title: `不包含内容`,
              items: [`{{OWNER: what is not included}}`],
            },
          },
          sections: [
            {
              title: `托斯卡纳奶酪拼盘上有什么？`,
              paras: [
                `托斯卡纳是绵羊奶之乡，最具代表性的奶酪是佩科里诺（pecorino）：可以是年轻柔软的，可以熟成到紧实、带坚果香，也可以熟成到一碰就碎。托斯卡纳面包不放盐，正是这个原因：它生来就是配佩科里诺和冷切肉这类咸香食物吃的。`,
                `我们的拼盘包括：{{OWNER: cheeses and producers}}。每一种我们都会告诉你出自谁手、用什么奶、熟成多久，并按从温和到浓烈的顺序品尝，因为这是味蕾能跟上的顺序。`,
              ],
            },
            {
              title: `为什么要和主厨一起品尝奶酪？`,
              paras: [
                `侍酒师会告诉你配什么酒。我们告诉你拿它做什么菜：哪种奶酪刨在意面上，哪种配蜂蜜吃，哪种永远不要下锅。这就是我们招待来厨房做客的朋友时会做的品鉴，你学到的东西会直接回到你在家做的菜里。`,
              ],
            },
            {
              title: `品鉴如何安排`,
              paras: [
                `{{OWNER: add-on to The Chef's Table or standalone tasting}}。无论哪种形式，它都和我们所有的课程一样：主厨就在你面前，是真正的食物而不是表演，一切都不赶时间。`,
                `如果你还没有预订意面课，<a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌</a>是在我们奥特拉诺厨房里三小时的动手课程：宽面、意式饺子和提拉米苏，95欧元，含一杯葡萄酒。`,
              ],
            },
            {
              title: `授课主厨`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> 和 Marsel 是佛罗伦萨郊外山间两家农庄的主厨。托斯卡纳奶酪贯穿他们的日常烹饪：从前菜拼盘到馅料，再到刨在意面上的那一层。所以这是由使用它的人带领的品鉴，而不是由卖它的人。更多内容请看<a href="/zh/#story">我们的故事</a>。`,
              ],
            },
            {
              title: `须知信息`,
              paras: [],
              list: [
                `素食者、孕妇或乳糖不耐受？请在预订时告诉我们。{{OWNER: dietary notes (rennet, raw milk, lactose)}}`,
                `请至少提前{{OWNER: booking lead time}}预订。`,
                `想买下你喜欢的奶酪？我们的<a href="/zh/blog/florence-food-markets-sant-ambrogio-mercato-centrale/">佛罗伦萨市场指南</a>是最好的起点。`,
              ],
            },
            {
              title: `如何预订`,
              paras: [
                `请发送邮件至 <a href="mailto:ciao@handmadepastaflorence.com?subject=Cheese%20tasting%20enquiry">ciao@handmadepastaflorence.com</a>，注明日期和人数。我们会在一个工作日内回复。`,
              ],
            },
          ],
          faqs: [
            { q: `奶酪品鉴是意面课的附加项目，还是独立体验？`, a: `{{OWNER: add-on to The Chef's Table or standalone tasting}}。` },
            { q: `拼盘上有哪些奶酪？`, a: `{{OWNER: cheeses and producers}}。每一种我们都会告诉你出自谁手、熟成多久，并按从温和到浓烈的顺序品尝。` },
            { q: `品鉴需要多长时间？`, a: `{{OWNER: tasting length}}。` },
            { q: `费用是多少？`, a: `每人{{OWNER: price per person}}。主厨餐桌意面课为每人95欧元，含一杯葡萄酒。` },
            { q: `包含葡萄酒吗？`, a: `{{OWNER: wine pairing yes/no}}。` },
            { q: `素食者或孕妇可以参加吗？`, a: `{{OWNER: dietary notes (rennet, raw milk, lactose)}}。请在预订时告诉我们，我们会如实告诉你哪些奶酪可以吃。` },
            { q: `可以有多少人参加？`, a: `最多{{OWNER: max group size}}位客人。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `我们招牌的3小时意面课程：宽面、意式饺子和提拉米苏，含葡萄酒。95欧元。` },
            { title: `市场与手工`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨逛圣安布罗焦市场，然后烹饪当天的食材。5小时，最多6人，145欧元。` },
            { title: `在佛罗伦萨吃什么`, href: `/zh/blog/what-to-eat-in-florence/`, desc: `由托斯卡纳厨师讲解真正的佛罗伦萨菜。` },
            { title: `佛罗伦萨的食品市场`, href: `/zh/blog/florence-food-markets-sant-ambrogio-mercato-centrale/`, desc: `圣安布罗焦还是中央市场：本地人在哪里买菜，当季该买什么。` },
            { title: `赠送烹饪课程`, href: `/zh/pengren-kecheng-liquan-foluolunsa/`, desc: `送一张课程礼券，而不是又一件物品。任何课程，68欧元起，日期由对方自选。` },
          ],
          ctaLabel: `咨询奶酪品鉴`,
          emailSubject: `奶酪品鉴咨询`,
          breadcrumbName: `佛罗伦萨奶酪品鉴`,
          product: {
            name: `佛罗伦萨托斯卡纳奶酪品鉴`,
            description: `由两位托斯卡纳农庄主厨带领的奶酪品鉴：{{OWNER: number of cheeses}}种奶酪（{{OWNER: cheeses and producers}}），{{OWNER: tasting length}}，{{OWNER: add-on to The Chef's Table or standalone tasting}}。`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
    },
  },

  // O3. Multi-day pasta course / Tuscany cooking week.
  //
  // Why: 21 queries in 4 languages, 103 impressions, avg pos 41.6, 0 clicks
  // (`week cooking florence`, `toskana kochkurse urlaub`, `selber kochen in der
  // toskana`, `corsi di cucina in agriturismo toscana`, `best agriturismo in
  // tuscany with cooking classes`). The agriturismo page draws the "cooking
  // holiday" impressions without matching them; link it here once published.
  //
  // Proposed product (analysis, O3): a 3-day pasta intensive in Florence,
  // without accommodation. Market reference: about €600 for a 3-day amateur
  // course, €1,400 to €2,200 for a 5-day intensive. None of that is on the
  // page: days, schedule, curriculum, price and accommodation are owner facts.
  //
  // `product` (sold per person). courseDuration is a placeholder on purpose, so
  // the pre-publish grep catches it; fill it with the real length (e.g. 'P3D').
  'multi-day': {
    floatingCta: false,
    courseMode: 'Onsite',
    courseDuration: `{{OWNER: course length as ISO 8601, e.g. P3D}}`,
    locales: {
      en: {
        slug: 'multi-day-pasta-course-florence',
        title: `Multi-Day Pasta Course in Florence: A Hands-On Intensive`,
        description: `A multi-day fresh pasta course in Florence with two Tuscan head chefs: the dough, the hand-rolled sheet and the Tuscan shapes, built up day by day.`,
        cl: {
          eyebrow: `The pasta intensive · Florence`,
          heading: `A multi-day pasta course in Florence,`,
          headingItal: `until your hands know it.`,
          lede: `Three hours is enough to make pasta. It is not enough to stop needing a recipe. Over {{OWNER: number of days}} days in Florence you work through the dough, the hand-rolled sheet and the Tuscan shapes with the two chefs who make them for a living, going a little further each day, until your hands know what your notes say.`,
          image: { src: img.cookingClass, alt: `A pasta station set out before class: a rolling pin, a ball of dough, flour and eggs on a wooden board`, w: 979, h: 1600 },
          price: `{{OWNER: price per person}}`,
          priceNote: `per person · {{OWNER: number of days}} days · {{OWNER: accommodation yes/no}}`,
          facts: [
            { label: `Length`, value: `{{OWNER: number of days and daily schedule}}`, icon: 'clock' },
            { label: `Group size`, value: `max {{OWNER: max group size}} guests`, icon: 'people' },
            { label: `Dates`, value: `{{OWNER: dates or seasons}}`, icon: 'calendar' },
            { label: `Where`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Accommodation`, value: `{{OWNER: accommodation yes/no}}`, icon: 'home' },
            { label: `Level`, value: `{{OWNER: level (beginners, home cooks or professionals)}}`, icon: 'chef-hat' },
            { label: `Language`, value: `English or Italian`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `The programme`,
              items: [`{{OWNER: curriculum by day}}`],
            },
            included: {
              title: `What’s included`,
              items: [
                `Hands-on instruction every day`,
                `<strong>English speaking</strong> chefs`,
                `<strong>Fresh ingredients</strong>`,
                `<strong>Equipment provided</strong> (workspace, apron, knife, and rolling pin)`,
                `{{OWNER: meals included each day}}`,
              ],
            },
            notIncluded: {
              title: `What’s not included`,
              items: [
                `Travel to and from Florence`,
                `{{OWNER: what is not included}}`,
              ],
            },
          },
          sections: [
            {
              title: `What can a multi-day course teach that a three-hour class can't?`,
              paras: [
                `A three-hour class teaches you that you can make pasta. A course teaches you to make it again at home without us. The difference is repetition: making the same dough on the second day and feeling that it is better, rolling a sheet thin enough to see the board through it, and getting a fold wrong enough times that you stop getting it wrong.`,
                `Each day builds on the one before, so by the end you are not following a recipe card, you are reading the dough: when it wants more flour, when it needs to rest, and when it is ready. That is the part nobody can teach in an afternoon.`,
              ],
            },
            {
              title: `What is on the programme?`,
              paras: [
                `{{OWNER: curriculum by day}}`,
                `If you want to read up before you arrive, our guide to <a href="/pasta-shapes/">the Tuscan pasta shapes</a> (pici, pappardelle, tagliatelle and tortelli) and our piece on <a href="/blog/best-flour-for-italian-fresh-pasta/">which flour to use for fresh pasta</a> are where we would start.`,
              ],
            },
            {
              title: `What does a day look like?`,
              paras: [
                `{{OWNER: number of days and daily schedule}}`,
                `Every class of ours ends at the table, eating what you made, and the course is no different: {{OWNER: meals included each day}}.`,
              ],
            },
            {
              title: `Is accommodation included?`,
              paras: [
                `{{OWNER: accommodation yes/no}}.`,
                `If what you are after is a Tuscan farm stay with cooking, some of the agriturismi we work with have their own guest rooms, booked with the estate rather than with us; our <a href="/agriturismo-cooking-class-tuscany/">agriturismo cooking class</a> page explains how that works. Staying in Florence instead? The rest of your time is yours, and our guide to <a href="/blog/day-trips-from-florence/">day trips from Florence</a> covers what to eat in Siena, Lucca, San Gimignano and Pisa.`,
              ],
            },
            {
              title: `Who is teaching`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> and Marsel are the head chefs of two agriturismi in the hills outside Florence. Pasta for weddings, feasts and long farmhouse lunches is their ordinary work, not a show put on for visitors, and a course is the closest you can get to standing next to them while they do it. You can read more <a href="/#story">in our story</a>.`,
              ],
            },
            {
              title: `How to book`,
              paras: [
                `Email <a href="mailto:ciao@handmadepastaflorence.com?subject=Multi-day%20pasta%20course%20enquiry">ciao@handmadepastaflorence.com</a> with your preferred dates, how many of you are coming and how much pasta you have made before. The course runs {{OWNER: dates or seasons}}; please write at least {{OWNER: booking lead time}} ahead. We reply within one working day.`,
              ],
            },
          ],
          faqs: [
            { q: `How many days is the course?`, a: `{{OWNER: number of days and daily schedule}}.` },
            { q: `Do I need any experience?`, a: `{{OWNER: level (beginners, home cooks or professionals)}}. Tell us what you have made before when you write and we will tell you honestly whether the course or the three-hour <a href="/pasta-making-class-florence/">Chef's Table</a> suits you better.` },
            { q: `What does it cost?`, a: `{{OWNER: price per person}} per person, covering everything listed under What's included above.` },
            { q: `Is accommodation included?`, a: `{{OWNER: accommodation yes/no}}.` },
            { q: `When does the course run?`, a: `{{OWNER: dates or seasons}}.` },
            { q: `How many people are in the group?`, a: `At most {{OWNER: max group size}}.` },
            { q: `Can you cater to gluten-free diets or allergies?`, a: `In our Florence classes, gluten-free guests get a dedicated flour blend and a clean station at no extra charge. {{OWNER: confirm gluten-free works for the full course}}. Tell us about any allergies when you book.` },
            { q: `Is this the same as your agriturismo class?`, a: `No. The <a href="/agriturismo-cooking-class-tuscany/">agriturismo class</a> is a single half day in a farm kitchen outside Florence, for groups of 6 to 20. This is a course over {{OWNER: number of days}} days, built for people who want to keep making pasta after they go home.` },
          ],
          related: [
            { title: `The Chef's Table`, href: `/pasta-making-class-florence/`, desc: `Short on time? The three-hour class: fettuccine, ravioli and tiramisù, with wine. €95.` },
            { title: `Agriturismo Cooking Class`, href: `/agriturismo-cooking-class-tuscany/`, desc: `A half day in a working farm kitchen outside Florence, for groups of 6 to 20.` },
            { title: `Mercato & Mani`, href: `/market-tour-cooking-class-florence/`, desc: `Sant'Ambrogio market at dawn, then cook the basket. 5 hours, max 6 guests, €145.` },
            { title: `The four shapes, explained`, href: `/pasta-shapes/`, desc: `Pici, pappardelle, tagliatelle, tortelli: what each one is and the sauce it was built for.` },
            { title: `Day trips from Florence`, href: `/blog/day-trips-from-florence/`, desc: `Siena, Lucca, San Gimignano and Pisa, chosen by what is on the plate.` },
          ],
          ctaLabel: `Ask about dates`,
          emailSubject: `Multi-day pasta course enquiry`,
          breadcrumbName: `Multi-Day Pasta Course`,
          showPastaCrumb: true,
          product: {
            name: `Multi-Day Pasta Course in Florence`,
            description: `A {{OWNER: number of days}}-day hands-on fresh pasta course in Florence, taught by two Tuscan agriturismo head chefs: {{OWNER: curriculum by day}}. Max {{OWNER: max group size}} guests. {{OWNER: accommodation yes/no}}.`,
            // Digits only once filled (e.g. '600'): it becomes the JSON-LD Offer price.
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      it: {
        slug: 'corso-intensivo-pasta-fresca-firenze',
        title: `Corso Intensivo di Pasta Fresca a Firenze, in Più Giorni`,
        description: `Corso di pasta fresca di più giorni a Firenze con due chef toscani: l'impasto, la sfoglia tirata a mano e i formati toscani, un passo in più ogni giorno.`,
        cl: {
          eyebrow: `Il corso intensivo · Firenze`,
          heading: `Un corso di pasta fresca di più giorni a Firenze,`,
          headingItal: `finché le mani non lo sanno.`,
          lede: `Tre ore bastano per fare la pasta. Non bastano per smettere di aver bisogno della ricetta. In {{OWNER: number of days}} giorni a Firenze lavorate sull'impasto, sulla sfoglia tirata a mano e sui formati toscani con i due chef che li fanno per mestiere, un passo più in là ogni giorno, finché le mani non sanno quello che dicono gli appunti.`,
          image: { src: img.cookingClass, alt: `Una postazione per la pasta pronta prima del corso: mattarello, panetto di impasto, farina e uova su un tagliere di legno`, w: 979, h: 1600 },
          price: `{{OWNER: price per person}}`,
          priceNote: `a persona · {{OWNER: number of days}} giorni · {{OWNER: accommodation yes/no}}`,
          facts: [
            { label: `Durata`, value: `{{OWNER: number of days and daily schedule}}`, icon: 'clock' },
            { label: `Dimensione gruppo`, value: `max {{OWNER: max group size}} ospiti`, icon: 'people' },
            { label: `Date`, value: `{{OWNER: dates or seasons}}`, icon: 'calendar' },
            { label: `Dove`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Alloggio`, value: `{{OWNER: accommodation yes/no}}`, icon: 'home' },
            { label: `Livello`, value: `{{OWNER: level (beginners, home cooks or professionals)}}`, icon: 'chef-hat' },
            { label: `Lingua`, value: `inglese o italiano`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Il programma`,
              items: [`{{OWNER: curriculum by day}}`],
            },
            included: {
              title: `Cosa è incluso`,
              items: [
                `Istruzioni pratiche ogni giorno`,
                `Chef che <strong>parlano inglese</strong>`,
                `<strong>Ingredienti freschi</strong>`,
                `<strong>Attrezzatura fornita</strong> (postazione di lavoro, grembiule, coltello e mattarello)`,
                `{{OWNER: meals included each day}}`,
              ],
            },
            notIncluded: {
              title: `Cosa non è incluso`,
              items: [
                `Viaggio da e per Firenze`,
                `{{OWNER: what is not included}}`,
              ],
            },
          },
          sections: [
            {
              title: `Cosa insegna un corso di più giorni che un corso di tre ore non può insegnare?`,
              paras: [
                `Un corso di tre ore vi insegna che sapete fare la pasta. Un corso di più giorni vi insegna a rifarla a casa senza di noi. La differenza è la ripetizione: rifare lo stesso impasto il secondo giorno e sentire che viene meglio, tirare una sfoglia così sottile da vederci attraverso il tagliere, sbagliare una chiusura abbastanza volte da smettere di sbagliarla.`,
                `Ogni giorno si costruisce sul precedente, quindi alla fine non seguite più una scheda di ricetta: leggete l'impasto. Quando vuole più farina, quando deve riposare, quando è pronto. È la parte che nessuno può insegnare in un pomeriggio.`,
              ],
            },
            {
              title: `Cosa c'è in programma?`,
              paras: [
                `{{OWNER: curriculum by day}}`,
                `Se volete prepararvi prima di arrivare, la nostra guida ai <a href="/it/formati-di-pasta-toscana/">formati di pasta toscana</a> (pici, pappardelle, tagliatelle e tortelli) e il nostro articolo su <a href="/it/blog/best-flour-for-italian-fresh-pasta/">quale farina usare per la pasta fresca</a> sono il punto da cui partiremmo.`,
              ],
            },
            {
              title: `Com'è una giornata tipo?`,
              paras: [
                `{{OWNER: number of days and daily schedule}}`,
                `Tutti i nostri corsi finiscono a tavola, mangiando quello che avete preparato, e questo non fa eccezione: {{OWNER: meals included each day}}.`,
              ],
            },
            {
              title: `L'alloggio è incluso?`,
              paras: [
                `{{OWNER: accommodation yes/no}}.`,
                `Se cercate un soggiorno in campagna con la cucina, alcuni degli agriturismi con cui lavoriamo hanno le loro camere, che si prenotano con la tenuta e non con noi; la pagina del <a href="/it/corso-cucina-agriturismo-toscana/">corso di cucina in agriturismo</a> spiega come funziona. Alloggiate a Firenze? Il resto del tempo è vostro, e la nostra guida alle <a href="/it/blog/day-trips-from-florence/">gite da Firenze</a> racconta cosa mangiare a Siena, Lucca, San Gimignano e Pisa.`,
              ],
            },
            {
              title: `Chi insegna`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> e Marsel sono gli head chef di due agriturismi sulle colline fuori Firenze. La pasta per matrimoni, banchetti e lunghi pranzi in campagna è il loro lavoro quotidiano, non uno spettacolo montato per i visitatori, e un corso è il modo più vicino per stare accanto a loro mentre la fanno. Potete leggere di più <a href="/it/#story">nella nostra storia</a>.`,
              ],
            },
            {
              title: `Come prenotare`,
              paras: [
                `Scrivete a <a href="mailto:ciao@handmadepastaflorence.com?subject=Richiesta%20corso%20intensivo%20di%20pasta">ciao@handmadepastaflorence.com</a> con le date che preferite, quante persone siete e quanta pasta avete già fatto. Il corso si tiene {{OWNER: dates or seasons}}; scriveteci con almeno {{OWNER: booking lead time}} di anticipo. Rispondiamo entro un giorno lavorativo.`,
              ],
            },
          ],
          faqs: [
            { q: `Quanti giorni dura il corso?`, a: `{{OWNER: number of days and daily schedule}}.` },
            { q: `Serve esperienza?`, a: `{{OWNER: level (beginners, home cooks or professionals)}}. Diteci cosa avete già fatto quando ci scrivete e vi diremo onestamente se vi conviene il corso o le tre ore de <a href="/it/corso-pasta-fresca-firenze/">Il Tavolo dello Chef</a>.` },
            { q: `Quanto costa?`, a: `{{OWNER: price per person}} a persona, con tutto quello che trovate qui sopra sotto Cosa è incluso.` },
            { q: `L'alloggio è incluso?`, a: `{{OWNER: accommodation yes/no}}.` },
            { q: `Quando si tiene il corso?`, a: `{{OWNER: dates or seasons}}.` },
            { q: `Quante persone ci sono nel gruppo?`, a: `Al massimo {{OWNER: max group size}}.` },
            { q: `Potete gestire diete senza glutine o allergie?`, a: `Nei nostri corsi a Firenze chi è celiaco ha una miscela di farine senza glutine dedicata e una postazione pulita senza costi aggiuntivi. {{OWNER: confirm gluten-free works for the full course}}. Segnalateci eventuali allergie quando prenotate.` },
            { q: `È lo stesso del corso in agriturismo?`, a: `No. Il <a href="/it/corso-cucina-agriturismo-toscana/">corso in agriturismo</a> è una sola mezza giornata nella cucina di una fattoria fuori Firenze, per gruppi da 6 a 20. Questo è un corso di {{OWNER: number of days}} giorni, pensato per chi vuole continuare a fare la pasta anche dopo essere tornato a casa.` },
          ],
          related: [
            { title: `Il Tavolo dello Chef`, href: `/it/corso-pasta-fresca-firenze/`, desc: `Poco tempo? Il corso di tre ore: fettuccine, ravioli e tiramisù, con vino. €95.` },
            { title: `Corso di Cucina in Agriturismo`, href: `/it/corso-cucina-agriturismo-toscana/`, desc: `Mezza giornata nella cucina di un agriturismo in attività fuori Firenze, per gruppi da 6 a 20.` },
            { title: `Mercato & Mani`, href: `/it/corso-cucina-tour-mercato-firenze/`, desc: `Spesa al mercato di Sant'Ambrogio all'alba, poi si cucina. 5 ore, max 6 ospiti, €145.` },
            { title: `I quattro formati, spiegati`, href: `/it/formati-di-pasta-toscana/`, desc: `Pici, pappardelle, tagliatelle, tortelli: cosa sono e il sugo per cui sono nati.` },
            { title: `Gite da Firenze`, href: `/it/blog/day-trips-from-florence/`, desc: `Siena, Lucca, San Gimignano e Pisa, scelte per quello che c'è nel piatto.` },
          ],
          ctaLabel: `Chiedi le date`,
          emailSubject: `Richiesta corso intensivo di pasta`,
          breadcrumbName: `Corso Intensivo di Pasta Fresca`,
          showPastaCrumb: true,
          product: {
            name: `Corso Intensivo di Pasta Fresca a Firenze`,
            description: `Un corso pratico di pasta fresca di {{OWNER: number of days}} giorni a Firenze, tenuto da due head chef di agriturismo toscani: {{OWNER: curriculum by day}}. Max {{OWNER: max group size}} ospiti. {{OWNER: accommodation yes/no}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      fr: {
        slug: 'stage-pates-fraiches-florence',
        title: `Stage de Pâtes Fraîches à Florence sur Plusieurs Jours`,
        description: `Un stage de pâtes fraîches sur plusieurs jours à Florence avec deux chefs toscans : la pâte, l'abaisse au rouleau et les formes toscanes, jour après jour.`,
        cl: {
          eyebrow: `Le stage de pâtes · Florence`,
          heading: `Un stage de pâtes fraîches à Florence,`,
          headingItal: `jusqu'à ce que vos mains le sachent.`,
          lede: `Trois heures suffisent pour faire des pâtes. Pas pour se passer de la recette. En {{OWNER: number of days}} jours à Florence, vous travaillez la pâte, l'abaisse étalée au rouleau et les formes toscanes avec les deux chefs qui en ont fait leur métier, un peu plus loin chaque jour, jusqu'à ce que vos mains sachent ce que disent vos notes.`,
          image: { src: img.cookingClass, alt: `Un poste à pâtes préparé avant le cours : rouleau à pâtisserie, boule de pâte, farine et œufs sur une planche en bois`, w: 979, h: 1600 },
          price: `{{OWNER: price per person}}`,
          priceNote: `par personne · {{OWNER: number of days}} jours · {{OWNER: accommodation yes/no}}`,
          facts: [
            { label: `Durée`, value: `{{OWNER: number of days and daily schedule}}`, icon: 'clock' },
            { label: `Taille du groupe`, value: `max {{OWNER: max group size}} personnes`, icon: 'people' },
            { label: `Dates`, value: `{{OWNER: dates or seasons}}`, icon: 'calendar' },
            { label: `Lieu`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Hébergement`, value: `{{OWNER: accommodation yes/no}}`, icon: 'home' },
            { label: `Niveau`, value: `{{OWNER: level (beginners, home cooks or professionals)}}`, icon: 'chef-hat' },
            { label: `Langue`, value: `anglais ou italien`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Le programme`,
              items: [`{{OWNER: curriculum by day}}`],
            },
            included: {
              title: `Ce qui est inclus`,
              items: [
                `Instructions pratiques chaque jour`,
                `Chefs <strong>anglophones</strong>`,
                `<strong>Ingrédients frais</strong>`,
                `<strong>Matériel fourni</strong> (plan de travail, tablier, couteau et rouleau à pâtisserie)`,
                `{{OWNER: meals included each day}}`,
              ],
            },
            notIncluded: {
              title: `Ce qui n'est pas inclus`,
              items: [
                `Le voyage aller-retour jusqu'à Florence`,
                `{{OWNER: what is not included}}`,
              ],
            },
          },
          sections: [
            {
              title: `Qu'apprend-on en plusieurs jours qu'on n'apprend pas en trois heures ?`,
              paras: [
                `Un cours de trois heures vous apprend que vous savez faire des pâtes. Un stage vous apprend à les refaire chez vous sans nous. La différence, c'est la répétition : refaire la même pâte le deuxième jour et sentir qu'elle est meilleure, étaler une abaisse assez fine pour voir la planche au travers, et rater un pliage assez de fois pour ne plus le rater.`,
                `Chaque jour s'appuie sur le précédent : à la fin, vous ne suivez plus une fiche recette, vous lisez la pâte. Quand elle veut plus de farine, quand elle doit reposer, quand elle est prête. C'est la partie que personne ne peut enseigner en un après-midi.`,
              ],
            },
            {
              title: `Qu'y a-t-il au programme ?`,
              paras: [
                `{{OWNER: curriculum by day}}`,
                `Pour vous préparer avant d'arriver, notre guide des <a href="/fr/formes-de-pates/">formes de pâtes toscanes</a> (pici, pappardelle, tagliatelle et tortelli) et notre article sur <a href="/fr/blog/best-flour-for-italian-fresh-pasta/">la farine à utiliser pour les pâtes fraîches</a> sont le bon point de départ.`,
              ],
            },
            {
              title: `À quoi ressemble une journée ?`,
              paras: [
                `{{OWNER: number of days and daily schedule}}`,
                `Tous nos cours se terminent à table, devant ce que vous avez préparé, et le stage ne fait pas exception : {{OWNER: meals included each day}}.`,
              ],
            },
            {
              title: `L'hébergement est-il compris ?`,
              paras: [
                `{{OWNER: accommodation yes/no}}.`,
                `Si vous cherchez un séjour à la ferme avec de la cuisine, certains des agriturismi avec lesquels nous travaillons ont leurs propres chambres, réservées auprès du domaine et non auprès de nous ; la page du <a href="/fr/cours-cuisine-agritourisme-toscane/">cours de cuisine en agritourisme</a> explique comment cela fonctionne. Vous logez à Florence ? Le reste de votre temps est à vous, et notre guide des <a href="/fr/blog/day-trips-from-florence/">excursions depuis Florence</a> dit quoi manger à Sienne, Lucques, San Gimignano et Pise.`,
              ],
            },
            {
              title: `Qui enseigne`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> et Marsel sont les chefs de cuisine de deux agriturismi dans les collines autour de Florence. Les pâtes pour les mariages, les banquets et les longs déjeuners de ferme sont leur travail quotidien, pas un spectacle monté pour les visiteurs, et un stage est ce qui se rapproche le plus de travailler à leurs côtés. Vous pouvez en lire plus <a href="/fr/#story">dans notre histoire</a>.`,
              ],
            },
            {
              title: `Comment réserver`,
              paras: [
                `Écrivez à <a href="mailto:ciao@handmadepastaflorence.com?subject=Demande%20stage%20de%20p%C3%A2tes">ciao@handmadepastaflorence.com</a> avec vos dates préférées, le nombre de personnes et ce que vous avez déjà fait comme pâtes. Le stage a lieu {{OWNER: dates or seasons}} ; écrivez-nous au moins {{OWNER: booking lead time}} à l'avance. Nous répondons sous un jour ouvré.`,
              ],
            },
          ],
          faqs: [
            { q: `Combien de jours dure le stage ?`, a: `{{OWNER: number of days and daily schedule}}.` },
            { q: `Faut-il de l'expérience ?`, a: `{{OWNER: level (beginners, home cooks or professionals)}}. Dites-nous ce que vous avez déjà fait en nous écrivant et nous vous dirons honnêtement si le stage ou les trois heures de <a href="/fr/cours-de-pates-fraiches-florence/">La Table du Chef</a> vous conviennent mieux.` },
            { q: `Combien coûte le stage ?`, a: `{{OWNER: price per person}} par personne, avec tout ce qui figure ci-dessus sous Ce qui est inclus.` },
            { q: `L'hébergement est-il compris ?`, a: `{{OWNER: accommodation yes/no}}.` },
            { q: `Quand le stage a-t-il lieu ?`, a: `{{OWNER: dates or seasons}}.` },
            { q: `Combien de personnes dans le groupe ?`, a: `Au maximum {{OWNER: max group size}}.` },
            { q: `Pouvez-vous gérer les régimes sans gluten ou les allergies ?`, a: `Dans nos cours à Florence, les invités cœliaques ont un mélange de farines sans gluten dédié et un poste propre sans frais supplémentaires. {{OWNER: confirm gluten-free works for the full course}}. Signalez-nous vos allergies à la réservation.` },
            { q: `Est-ce le même que votre cours en agritourisme ?`, a: `Non. Le <a href="/fr/cours-cuisine-agritourisme-toscane/">cours en agritourisme</a> est une seule demi-journée dans la cuisine d'une ferme autour de Florence, pour des groupes de 6 à 20. Ceci est un stage de {{OWNER: number of days}} jours, pensé pour ceux qui veulent continuer à faire des pâtes une fois rentrés chez eux.` },
          ],
          related: [
            { title: `La Table du Chef`, href: `/fr/cours-de-pates-fraiches-florence/`, desc: `Peu de temps ? Le cours de trois heures : fettuccine, ravioli et tiramisù, avec du vin. 95 €.` },
            { title: `Cours de Cuisine en Agritourisme`, href: `/fr/cours-cuisine-agritourisme-toscane/`, desc: `Une demi-journée dans la cuisine d'une ferme en activité près de Florence, pour des groupes de 6 à 20.` },
            { title: `Mercato & Mani`, href: `/fr/cours-cuisine-visite-marche-florence/`, desc: `Le marché de Sant'Ambrogio à l'aube, puis on cuisine le panier. 5 heures, max 6 personnes, 145 €.` },
            { title: `Les quatre formes, expliquées`, href: `/fr/formes-de-pates/`, desc: `Pici, pappardelle, tagliatelle, tortelli : ce qu'est chacune et la sauce pour laquelle elle est née.` },
            { title: `Excursions depuis Florence`, href: `/fr/blog/day-trips-from-florence/`, desc: `Sienne, Lucques, San Gimignano et Pise, choisies pour ce qu'il y a dans l'assiette.` },
          ],
          ctaLabel: `Demander les dates`,
          emailSubject: `Demande stage de pâtes`,
          breadcrumbName: `Stage de Pâtes Fraîches`,
          showPastaCrumb: true,
          product: {
            name: `Stage de Pâtes Fraîches à Florence`,
            description: `Un stage pratique de pâtes fraîches de {{OWNER: number of days}} jours à Florence, animé par deux chefs d'agritourisme toscans : {{OWNER: curriculum by day}}. Max {{OWNER: max group size}} personnes. {{OWNER: accommodation yes/no}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      de: {
        slug: 'mehrtaegiger-pasta-kurs-florenz',
        title: `Mehrtägiger Pasta-Kurs Florenz: Kochurlaub in der Toskana`,
        description: `Mehrtägiger Pasta-Kurs in Florenz mit zwei toskanischen Küchenchefs: der Teig, die von Hand ausgerollte Sfoglia und die toskanischen Formen, Tag für Tag.`,
        cl: {
          eyebrow: `Der Pasta-Intensivkurs · Florenz`,
          heading: `Ein mehrtägiger Pasta-Kurs in Florenz,`,
          headingItal: `bis Ihre Hände es können.`,
          lede: `Drei Stunden reichen, um Pasta zu machen. Sie reichen nicht, um ohne Rezept auszukommen. In {{OWNER: number of days}} Tagen in Florenz arbeiten Sie sich mit den zwei Köchen, die das beruflich machen, durch den Teig, die von Hand ausgerollte Sfoglia und die toskanischen Formen, jeden Tag ein Stück weiter, bis Ihre Hände wissen, was in Ihren Notizen steht.`,
          image: { src: img.cookingClass, alt: `Ein vorbereiteter Pasta-Arbeitsplatz vor dem Kurs: Nudelholz, Teigkugel, Mehl und Eier auf einem Holzbrett`, w: 979, h: 1600 },
          price: `{{OWNER: price per person}}`,
          priceNote: `pro Person · {{OWNER: number of days}} Tage · {{OWNER: accommodation yes/no}}`,
          facts: [
            { label: `Dauer`, value: `{{OWNER: number of days and daily schedule}}`, icon: 'clock' },
            { label: `Gruppengröße`, value: `max. {{OWNER: max group size}} Gäste`, icon: 'people' },
            { label: `Termine`, value: `{{OWNER: dates or seasons}}`, icon: 'calendar' },
            { label: `Ort`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `Unterkunft`, value: `{{OWNER: accommodation yes/no}}`, icon: 'home' },
            { label: `Niveau`, value: `{{OWNER: level (beginners, home cooks or professionals)}}`, icon: 'chef-hat' },
            { label: `Sprache`, value: `Englisch oder Italienisch`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `Das Programm`,
              items: [`{{OWNER: curriculum by day}}`],
            },
            included: {
              title: `Was inklusive ist`,
              items: [
                `Praktischer Unterricht an jedem Tag`,
                `<strong>Englischsprachige</strong> Köche`,
                `<strong>Frische Zutaten</strong>`,
                `<strong>Gestellte Ausrüstung</strong> (Arbeitsplatz, Schürze, Messer und Nudelholz)`,
                `{{OWNER: meals included each day}}`,
              ],
            },
            notIncluded: {
              title: `Was nicht inklusive ist`,
              items: [
                `An- und Abreise nach Florenz`,
                `{{OWNER: what is not included}}`,
              ],
            },
          },
          sections: [
            {
              title: `Was lernt man in mehreren Tagen, was drei Stunden nicht schaffen?`,
              paras: [
                `Ein dreistündiger Kurs zeigt Ihnen, dass Sie Pasta machen können. Ein mehrtägiger Kurs bringt Ihnen bei, sie zu Hause ohne uns wieder zu machen. Der Unterschied ist die Wiederholung: denselben Teig am zweiten Tag noch einmal machen und spüren, dass er besser wird, eine Sfoglia so dünn ausrollen, dass das Brett durchscheint, und eine Faltung so oft falsch machen, bis sie nicht mehr falsch wird.`,
                `Jeder Tag baut auf dem vorigen auf. Am Ende folgen Sie keiner Rezeptkarte mehr, Sie lesen den Teig: wann er mehr Mehl will, wann er ruhen muss und wann er fertig ist. Das ist der Teil, den niemand an einem Nachmittag beibringen kann.`,
              ],
            },
            {
              title: `Was steht auf dem Programm?`,
              paras: [
                `{{OWNER: curriculum by day}}`,
                `Wenn Sie sich vorher einlesen möchten: Unser Guide zu den <a href="/de/pasta-formen/">toskanischen Pasta-Formen</a> (Pici, Pappardelle, Tagliatelle und Tortelli) und unser Artikel darüber, <a href="/de/blog/best-flour-for-italian-fresh-pasta/">welches Mehl man für frische Pasta nimmt</a>, sind der beste Anfang.`,
              ],
            },
            {
              title: `Wie sieht ein Kurstag aus?`,
              paras: [
                `{{OWNER: number of days and daily schedule}}`,
                `Jeder unserer Kurse endet am Tisch, mit dem, was Sie gemacht haben, und dieser Kurs ist keine Ausnahme: {{OWNER: meals included each day}}.`,
              ],
            },
            {
              title: `Ist eine Unterkunft inklusive?`,
              paras: [
                `{{OWNER: accommodation yes/no}}.`,
                `Wenn Sie einen Kochurlaub auf einem toskanischen Hof suchen: Einige der Agriturismi, mit denen wir arbeiten, haben eigene Gästezimmer, die man beim Gut bucht und nicht bei uns; die Seite zum <a href="/de/agriturismo-kochkurs-toskana/">Agriturismo-Kochkurs</a> erklärt, wie das läuft. Sie wohnen in Florenz? Die übrige Zeit gehört Ihnen, und unser Guide zu <a href="/de/blog/day-trips-from-florence/">Ausflügen ab Florenz</a> sagt, was man in Siena, Lucca, San Gimignano und Pisa isst.`,
              ],
            },
            {
              title: `Wer unterrichtet`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> und Marsel sind die Küchenchefs zweier Agriturismi in den Hügeln vor Florenz. Pasta für Hochzeiten, Festessen und lange Hoftafeln ist ihre alltägliche Arbeit und keine Vorführung für Besucher, und ein Kurs ist das Nächste daran, an ihrer Seite zu arbeiten. Mehr dazu <a href="/de/#story">in unserer Geschichte</a>.`,
              ],
            },
            {
              title: `So buchen Sie`,
              paras: [
                `Schreiben Sie an <a href="mailto:ciao@handmadepastaflorence.com?subject=Anfrage%20mehrt%C3%A4giger%20Pasta-Kurs">ciao@handmadepastaflorence.com</a> mit Ihren Wunschterminen, der Personenzahl und wie viel Pasta Sie schon gemacht haben. Der Kurs findet {{OWNER: dates or seasons}} statt; bitte schreiben Sie mindestens {{OWNER: booking lead time}} im Voraus. Wir antworten innerhalb eines Werktags.`,
              ],
            },
          ],
          faqs: [
            { q: `Wie viele Tage dauert der Kurs?`, a: `{{OWNER: number of days and daily schedule}}.` },
            { q: `Brauche ich Vorkenntnisse?`, a: `{{OWNER: level (beginners, home cooks or professionals)}}. Schreiben Sie uns, was Sie schon gemacht haben, und wir sagen Ihnen ehrlich, ob der Kurs oder die drei Stunden am <a href="/de/pasta-kurs-florenz/">Tisch des Küchenchefs</a> besser zu Ihnen passen.` },
            { q: `Was kostet der Kurs?`, a: `{{OWNER: price per person}} pro Person, mit allem, was oben unter Was inklusive ist steht.` },
            { q: `Ist eine Unterkunft inklusive?`, a: `{{OWNER: accommodation yes/no}}.` },
            { q: `Wann findet der Kurs statt?`, a: `{{OWNER: dates or seasons}}.` },
            { q: `Wie groß ist die Gruppe?`, a: `Höchstens {{OWNER: max group size}} Personen.` },
            { q: `Können Sie glutenfreie Ernährung oder Allergien berücksichtigen?`, a: `In unseren Kursen in Florenz bekommen Gäste mit Zöliakie eine eigene glutenfreie Mehlmischung und eine saubere Station ohne Aufpreis. {{OWNER: confirm gluten-free works for the full course}}. Nennen Sie uns Allergien bei der Buchung.` },
            { q: `Ist das derselbe Kurs wie im Agriturismo?`, a: `Nein. Der <a href="/de/agriturismo-kochkurs-toskana/">Agriturismo-Kochkurs</a> ist ein einzelner halber Tag in der Küche eines Hofs vor Florenz, für Gruppen von 6 bis 20. Dies ist ein Kurs über {{OWNER: number of days}} Tage, gedacht für alle, die auch zu Hause weiter Pasta machen wollen.` },
          ],
          related: [
            { title: `Der Tisch des Küchenchefs`, href: `/de/pasta-kurs-florenz/`, desc: `Wenig Zeit? Der dreistündige Kurs: Fettuccine, Ravioli und Tiramisù, mit Wein. 95 €.` },
            { title: `Agriturismo-Kochkurs`, href: `/de/agriturismo-kochkurs-toskana/`, desc: `Ein halber Tag in der Küche eines arbeitenden Hofs vor Florenz, für Gruppen von 6 bis 20.` },
            { title: `Mercato & Mani`, href: `/de/markt-tour-kochkurs-florenz/`, desc: `Im Morgengrauen über den Sant'Ambrogio-Markt, dann kochen. 5 Stunden, max. 6 Gäste, 145 €.` },
            { title: `Die vier Formen, erklärt`, href: `/de/pasta-formen/`, desc: `Pici, Pappardelle, Tagliatelle, Tortelli: was jede Form ist und für welche Sauce sie gemacht wurde.` },
            { title: `Ausflüge ab Florenz`, href: `/de/blog/day-trips-from-florence/`, desc: `Siena, Lucca, San Gimignano und Pisa, ausgewählt nach dem, was auf dem Teller liegt.` },
          ],
          ctaLabel: `Termine anfragen`,
          emailSubject: `Anfrage mehrtägiger Pasta-Kurs`,
          breadcrumbName: `Mehrtägiger Pasta-Kurs`,
          showPastaCrumb: true,
          product: {
            name: `Mehrtägiger Pasta-Kurs in Florenz`,
            description: `Ein praktischer Pasta-Kurs über {{OWNER: number of days}} Tage in Florenz, geleitet von zwei toskanischen Agriturismo-Küchenchefs: {{OWNER: curriculum by day}}. Max. {{OWNER: max group size}} Gäste. {{OWNER: accommodation yes/no}}.`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
      zh: {
        slug: 'duori-yidali-mian-kecheng-foluolunsa',
        title: `佛罗伦萨多日意面课程：在托斯卡纳的烹饪假期里练就手艺`,
        description: `在佛罗伦萨，与两位托斯卡纳主厨一起上多日手工意面课程：面团、手擀面皮和托斯卡纳经典形状，一天比一天更进一步。`,
        cl: {
          eyebrow: `意面密集课 · 佛罗伦萨`,
          heading: `佛罗伦萨多日意面课程，`,
          headingItal: `练到双手记住为止。`,
          lede: `三小时足够做出意面，却不足以让你摆脱食谱。在佛罗伦萨的{{OWNER: number of days}}天里，你将跟着两位以此为业的主厨，从面团、手擀面皮一直练到托斯卡纳经典形状，每天更进一步，直到你的双手记住笔记里写的一切。`,
          image: { src: img.cookingClass, alt: `课前准备好的意面操作台：木板上放着擀面杖、面团、面粉和鸡蛋`, w: 979, h: 1600 },
          price: `{{OWNER: price per person}}`,
          priceNote: `每人 · {{OWNER: number of days}}天 · {{OWNER: accommodation yes/no}}`,
          facts: [
            { label: `时长`, value: `{{OWNER: number of days and daily schedule}}`, icon: 'clock' },
            { label: `人数`, value: `最多{{OWNER: max group size}}位客人`, icon: 'people' },
            { label: `日期`, value: `{{OWNER: dates or seasons}}`, icon: 'calendar' },
            { label: `地点`, value: `{{OWNER: venue}}`, icon: 'map-pin' },
            { label: `住宿`, value: `{{OWNER: accommodation yes/no}}`, icon: 'home' },
            { label: `适合人群`, value: `{{OWNER: level (beginners, home cooks or professionals)}}`, icon: 'chef-hat' },
            { label: `语言`, value: `英语或意大利语`, icon: 'globe' },
          ],
          infoBanner: {
            menu: {
              title: `课程安排`,
              items: [`{{OWNER: curriculum by day}}`],
            },
            included: {
              title: `包含内容`,
              items: [
                `每天的动手实践指导`,
                `<strong>讲英语</strong>的主厨`,
                `<strong>新鲜食材</strong>`,
                `<strong>提供全部器具</strong>（工作台、围裙、刀具和擀面杖）`,
                `{{OWNER: meals included each day}}`,
              ],
            },
            notIncluded: {
              title: `不包含内容`,
              items: [
                `往返佛罗伦萨的交通`,
                `{{OWNER: what is not included}}`,
              ],
            },
          },
          sections: [
            {
              title: `多日课程能学到哪些三小时课程学不到的东西？`,
              paras: [
                `三小时的课让你知道自己会做意面。多日课程让你回家后不用我们也能再做出来。区别在于重复：第二天再揉同样的面团，感觉到它变好了；把面皮擀到薄得能透出下面的木板；把同一个折法做错足够多次，直到再也不会做错。`,
                `每一天都建立在前一天的基础上，所以到最后你不再照着食谱卡做，而是在读面团：什么时候要加面粉，什么时候要醒面，什么时候已经好了。这正是任何人都没法在一个下午教会的部分。`,
              ],
            },
            {
              title: `课程内容是什么？`,
              paras: [
                `{{OWNER: curriculum by day}}`,
                `如果想在到来之前先做功课，可以从我们的<a href="/zh/yidali-mian-xingzhuang/">托斯卡纳意面形状指南</a>（pici、pappardelle、tagliatelle 和 tortelli）以及<a href="/zh/blog/best-flour-for-italian-fresh-pasta/">新鲜意面该用什么面粉</a>这篇文章开始。`,
              ],
            },
            {
              title: `一天是怎样安排的？`,
              paras: [
                `{{OWNER: number of days and daily schedule}}`,
                `我们的每一堂课都在餐桌上结束，吃自己做的成果，这门课程也不例外：{{OWNER: meals included each day}}。`,
              ],
            },
            {
              title: `包含住宿吗？`,
              paras: [
                `{{OWNER: accommodation yes/no}}。`,
                `如果你想找的是托斯卡纳农庄住宿加烹饪，我们合作的部分农庄设有客房，需要向庄园预订，而不是向我们预订；<a href="/zh/tuosikana-nongzhuang-pengren-kecheng/">农庄烹饪课程</a>页面有详细说明。住在佛罗伦萨？其余时间都属于你，我们的<a href="/zh/blog/day-trips-from-florence/">佛罗伦萨一日游指南</a>介绍了在锡耶纳、卢卡、圣吉米尼亚诺和比萨该吃什么。`,
              ],
            },
            {
              title: `授课主厨`,
              paras: [
                `<a href="https://endricerhozi.com" target="_blank" rel="noopener">Endri Cerhozi</a> 和 Marsel 是佛罗伦萨郊外山间两家农庄的主厨。为婚礼、宴席和农庄长桌午餐制作意面是他们的日常工作，而不是为游客准备的表演；参加这门课程，是最接近站在他们身边一起工作的方式。更多内容请看<a href="/zh/#story">我们的故事</a>。`,
              ],
            },
            {
              title: `如何预订`,
              paras: [
                `请发送邮件至 <a href="mailto:ciao@handmadepastaflorence.com?subject=Multi-day%20pasta%20course%20enquiry">ciao@handmadepastaflorence.com</a>，注明你希望的日期、人数以及你之前做过多少意面。课程开设时间：{{OWNER: dates or seasons}}；请至少提前{{OWNER: booking lead time}}来信。我们会在一个工作日内回复。`,
              ],
            },
          ],
          faqs: [
            { q: `课程为期几天？`, a: `{{OWNER: number of days and daily schedule}}。` },
            { q: `需要有经验吗？`, a: `{{OWNER: level (beginners, home cooks or professionals)}}。来信时告诉我们你做过什么，我们会如实告诉你，这门课程和三小时的<a href="/zh/foluolunsa-yidali-mian-kecheng/">主厨餐桌</a>哪个更适合你。` },
            { q: `费用是多少？`, a: `每人{{OWNER: price per person}}，包含上方“包含内容”中列出的全部项目。` },
            { q: `包含住宿吗？`, a: `{{OWNER: accommodation yes/no}}。` },
            { q: `课程什么时候开设？`, a: `{{OWNER: dates or seasons}}。` },
            { q: `一个班有多少人？`, a: `最多{{OWNER: max group size}}人。` },
            { q: `你们能照顾无麸质饮食或过敏需求吗？`, a: `在我们佛罗伦萨的课程中，无麸质客人会有专用的无麸质面粉配方和干净的操作台，不收取额外费用。{{OWNER: confirm gluten-free works for the full course}}。请在预订时告诉我们任何过敏情况。` },
            { q: `这和你们的农庄课程是同一个吗？`, a: `不是。<a href="/zh/tuosikana-nongzhuang-pengren-kecheng/">农庄烹饪课程</a>是在佛罗伦萨郊外农庄厨房里的半天课程，面向6至20人的团体。这是一门为期{{OWNER: number of days}}天的课程，为回家后还想继续做意面的人而设计。` },
          ],
          related: [
            { title: `主厨餐桌`, href: `/zh/foluolunsa-yidali-mian-kecheng/`, desc: `时间不够？三小时课程：宽面、意式饺子和提拉米苏，含葡萄酒。95欧元。` },
            { title: `农庄烹饪课程`, href: `/zh/tuosikana-nongzhuang-pengren-kecheng/`, desc: `在佛罗伦萨郊外一座仍在运作的农庄厨房里度过半天，6至20人。` },
            { title: `市场与手工`, href: `/zh/shichang-daolan-pengren-kecheng-foluolunsa/`, desc: `清晨逛圣安布罗焦市场，然后烹饪当天的食材。5小时，最多6人，145欧元。` },
            { title: `四种意面形状详解`, href: `/zh/yidali-mian-xingzhuang/`, desc: `Pici、pappardelle、tagliatelle、tortelli：每一种是什么，以及它天生搭配的酱汁。` },
            { title: `佛罗伦萨一日游`, href: `/zh/blog/day-trips-from-florence/`, desc: `锡耶纳、卢卡、圣吉米尼亚诺和比萨，按盘中美食来挑选。` },
          ],
          ctaLabel: `咨询开课日期`,
          emailSubject: `多日意面课程咨询`,
          breadcrumbName: `多日意面课程`,
          showPastaCrumb: true,
          product: {
            name: `佛罗伦萨多日意面课程`,
            description: `在佛罗伦萨开设的为期{{OWNER: number of days}}天的动手新鲜意面课程，由两位托斯卡纳农庄主厨授课：{{OWNER: curriculum by day}}。最多{{OWNER: max group size}}位客人。{{OWNER: accommodation yes/no}}。`,
            price: `{{OWNER: price per person}}`,
          },
        },
      },
    },
  },
};
