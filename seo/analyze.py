"""GSC export analysis for handmadepastaflorence.com (12 Jul - 12 Oct 2026)."""
import re
import sys
import warnings

import pandas as pd

warnings.filterwarnings("ignore")
pd.set_option("display.width", 220)
pd.set_option("display.max_colwidth", 90)
pd.set_option("display.max_rows", 2000)

F = "seo/data/gsc-2026-10-13.xlsx"
x = pd.read_excel(F, sheet_name=None)
q = x["Queries"].rename(columns={"Top queries": "query"})
p = x["Pages"].rename(columns={"Top pages": "page"})
c = x["Chart"]
c["Date"] = pd.to_datetime(c["Date"])

def summary():
    print("TOTAL", c.Clicks.sum(), c.Impressions.sum(), round(c.Clicks.sum() / c.Impressions.sum() * 100, 2))
    w = c.set_index("Date").resample("W-SUN")[["Clicks", "Impressions"]].sum()
    w["CTR%"] = (w.Clicks / w.Impressions * 100).round(2)
    print(w.to_string())
    print("\nqueries table covers", q.Clicks.sum(), "clicks /", q.Impressions.sum(), "impr")
    print("pages table covers", p.Clicks.sum(), "clicks /", p.Impressions.sum(), "impr")
    print(x["Countries"].head(15).to_string())

def seg(url):
    path = re.sub(r"https://handmadepastaflorence.com", "", url)
    loc = path.split("/")[1] if path.split("/")[1] in ("de", "fr", "it", "zh") else "en"
    rest = path if loc == "en" else path[3:]
    if rest in ("/", ""):
        role = "homepage"
    elif "/blog/" in rest:
        role = "blog"
    elif "pasta-shapes" in rest or "nudelsorten" in rest or "formati" in rest or "formes" in rest:
        role = "shapes"
    else:
        role = "landing/other"
    return loc, role, rest

def pages():
    p[["loc", "role", "rest"]] = p.page.apply(lambda u: pd.Series(seg(u)))
    g = p.groupby("role")[["Clicks", "Impressions"]].sum()
    g["pages"] = p.groupby("role").size()
    g["CTR%"] = (g.Clicks / g.Impressions * 100).round(2)
    print(g.to_string())
    g = p.groupby("loc")[["Clicks", "Impressions"]].sum()
    print(g.to_string())
    # aggregate per article across locales
    p["key"] = p.rest.str.replace(r"^/blog/", "", regex=True).str.strip("/")
    b = p[p.role == "blog"].groupby("key")[["Clicks", "Impressions"]].sum().sort_values("Clicks", ascending=False)
    print(b.to_string())
    print(p[p.role == "landing/other"].sort_values("Impressions", ascending=False)[["page", "Clicks", "Impressions", "CTR", "Position"]].to_string())

def allq():
    print(q.sort_values("Impressions", ascending=False).to_string())


# First match wins, so the order runs from the most specific intent to the broadest.
CLUSTERS = [
    ("noise", r"moisturizer|insurance|online course|tiramisu 95|coles|philip"),
    ("tv-crossword", r"sottil|sottoli|che lavoro|chi sono le|reazione|vinto"),
    ("ai-persona", r"my main motivations"),
    ("price-followup", r"\bcost|price|kost|teuer|costo|prezzo|\bprix|how much|wat kost|^yes|^si$|^no wine|^more$|^classes$|altri formati|还有|^alternative$"),
    ("private-chef", r"private chefs?|cucina privata|pasta chef"),
    ("cheese-tasting", r"käse|cheese|formagg|fromage"),
    ("team-building", r"team|corporate|firmen"),
    ("online-live", r"online|en ligne|pasta live|直播"),
    ("multi-day-holiday", r"week|settiman|urlaub|selber kochen in der toskana|kochkurse? toskana|toskana.*kochkurs|pasta kochkurs toskana|farm ?stay|farmhouse|agritur|agritour|holiday|vacanz|toscane cours|workshop toscane|cours de cuisine toscane|professional|sfoglino"),
    ("group", r"group|gruppo"),
    ("kids-family", r"famil|kids|bambin|kinder|ragazzi|toddler"),
    ("gift", r"gift|regal|verschenk|offrir|gutschein"),
    ("dietary", r"gluten|glutin|vegan|vegetar"),
    ("market-class", r"(market|mercato|marché|markt).*(class|cours|cooking|kurs|corso)|(class|cooking|recipe).*(market|mercato|marché)|chefs markets"),
    ("class-core", r"class|course|lesson|workshop|kurs|corso|corsi|cours|pastakurs|making in florence|pasta making|cooking$|^cooking"),
    ("markets", r"market|mercato|marché|markt|märkte"),
    ("buy-takeaway", r"kaufen|\bbuy|buying|acheter|comprar|to go|take ?away|emporter|near me|vicino|nähe|autour de moi|dintorni|pastificio|store|magasin|morioni|s'impasta"),
    ("day-of-week-hours", r"sunday|sundays|domenica|sonntag|sonntags|dimanche|monday|montag|lunedì|geöffnet|open|aperti|orari|öffnungszeiten|\bund montag"),
    ("flour-recipe", r"mehl|farin|flour|semola|rezept|recipe|selber|selbst|how to make|teig|senza uova|how long do you cook|durum"),
    ("what-to-eat", r"what to eat|que manger|quoi manger|was isst|was sollte man in florenz essen|was muss man in florenz gegessen|spezialit|spécialit|specialite|cosa mangiare|cose da mangiare|typisch|known for|tipic|famous|traditional|schiacciata|panforte|florence food|essen|piatti|pici et tripes"),
    ("where-to-eat", r"best|beste|meilleur|restaurant|ristorant|where to eat|dove mangiare|ou manger|good pasta|gut essen|places|reddit|osteria|trattoria|antico vinaio|mama florence|pastamania|in tavola|art of pasta|spaghetti|cacio|pear"),
    ("fresh-vs-dry", r"fresh vs|fresh pasta vs|vs fresh|dry pasta|dried|secca|seca|sèches?|seche|getrocknet|fresca vs|better than dry|fraiche et seche|softer"),
    ("travel-florence", r"weather|wetter|temperat|day trip|siena|sienne|lucca|pisa|pise|san gim|geminiano|giminiano|pistoia|fiesole|massa|carrara|livourne|forte dei marmi|alassio|sehenswürdig|cosa vedere|oltrarno|palazzo|boboli|galileo|santa croce|santa maria|duomo|kathedrale|piazzale|uffizi|brücke|karte|stadtplan|reiseführer|geheimtipp|altstadt|hauptbahnhof|flüge|entfernung|distance|wieviele tage|eintritt|veranstaltung|october|oktober|escape room|toskana$|toscane$|hauptstadt|was kann man|was macht man|was muss man|was sollte man|wo liegt|dov'è|umgebung|shopping|things to do|sandwiches|^florenz|^firenze$|^florence$|^firenca|^dlorenz|^nähe|^in florence|^a firenze|italie$|provincia|abitanti|sardellen|images|mit kindern"),
    ("shapes-glossary", r"pappard|papard|papad|parpad|papatd|papoard|paparad|papparde|parppad|p a p p|tagliat|taglia|tagila|taliat|tagliol|ravio|raviol|ravvio|tortel|tortal|toretel|torteli|tortl|tortelki|toetel|trotel|tottel|tirtel|tornel|tortell|toteloni|tordel|pici|pasta parcel|parcel|shape|ribbon|forme|formen|formati|folded|rolled|gerollte|agnolotti|linguine|fettuccine|trottole|egg noodle|egg pasta|bandnudeln|filled pasta|stuffed|decorative|中文|是什么|是什麼|意|義|馅料|イタリア|パスタ|what pasta|pasta types|tipi di pasta|quanti tipi|taglio|ribbon|pasta fresca deutsch|pasta fresca meaning|fatta a mano|freschi|nudeln|is ravioli|sind ravioli|sind tortellini|pasta fresca$|fresh pasta$|frische|was ist|was sind|what is|quelle marque|best natural pasta"),
    ("pasta-florence-head", r"pasta|pâtes|pates|pate |nudeln|handmade|homemade|hand made|home made"),
]

def cluster(s):
    for name, rx in CLUSTERS:
        if re.search(rx, s, re.I):
            return name
    return "other"

def clusters():
    q["cluster"] = q["query"].astype(str).apply(cluster)
    q["wpos"] = q.Position * q.Impressions
    g = q.groupby("cluster").agg(queries=("query", "size"), clicks=("Clicks", "sum"), impr=("Impressions", "sum"), wpos=("wpos", "sum"))
    g["pos"] = (g.wpos / g.impr).round(1)
    g["CTR%"] = (g.clicks / g.impr * 100).round(2)
    print(g.drop(columns="wpos").sort_values("impr", ascending=False).to_string())
    print("\nUNCLASSIFIED")
    print(q[q.cluster == "other"].sort_values("Impressions", ascending=False)[["query", "Clicks", "Impressions", "Position"]].to_string())
    if len(sys.argv) > 2:
        print(q[q.cluster == sys.argv[2]].sort_values("Impressions", ascending=False)[["query", "Clicks", "Impressions", "Position"]].to_string())

if __name__ == "__main__":
    {"summary": summary, "pages": pages, "allq": allq, "clusters": clusters}[sys.argv[1]]()
