import re

with open('src/data/landings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

locales = ['en', 'it', 'fr', 'de', 'zh']

# 1. Extract the infoBanner block for each locale from pasta-making.
# In landings.ts, pasta-making is the first page.
# We can just search for infoBanner globally and assign them to locales in order, 
# since pasta-making is the ONLY page that currently has infoBanner!
banners = re.findall(r'(^\s*infoBanner: \{\n.*?)(?=(?:^\s*sections: \[))', content, re.MULTILINE | re.DOTALL)

if len(banners) != 5:
    print(f"Error: found {len(banners)} infoBanners, expected 5.")
    exit(1)

locale_banners = {
    'en': banners[0],
    'it': banners[1],
    'fr': banners[2],
    'de': banners[3],
    'zh': banners[4]
}

# 2. We need to insert the correct banner into the correct locale block for EVERY page.
# Let's split the file by locales.
# The structure is:
#       en: {
#         ...
#         cl: {
#           ...
#           sections: [
# 
# We can find `sections: [` within each locale block.
# Let's define a function that replaces `sections: [` within a chunk of text.
def process_locale(loc, text):
    banner = locale_banners[loc]
    # Replace `sections: [` with `banner + sections: [` ONLY IF `infoBanner:` is not already there
    # But wait, pasta-making already has it!
    # So if `infoBanner:` is in text, leave it alone.
    if 'infoBanner:' not in text:
        text = re.sub(r'(^\s*sections: \[)', banner + r'\1', text, count=1, flags=re.MULTILINE)
    return text

# We can find the start of each locale block: `      en: {`
new_content = ""
# Split by locale boundaries. A locale boundary is `      locale: {`
# We can use a regex to find all locale blocks.
parts = re.split(r'(^\s*(?:en|it|fr|de|zh): \{\n)', content, flags=re.MULTILINE)

new_content = parts[0]
current_locale = None

for i in range(1, len(parts)):
    if re.match(r'^\s*(?:en|it|fr|de|zh): \{\n', parts[i]):
        current_locale = parts[i].strip().split(':')[0]
        new_content += parts[i]
    else:
        if current_locale:
            new_content += process_locale(current_locale, parts[i])
        else:
            new_content += parts[i]

with open('src/data/landings.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Updated landings.ts")
