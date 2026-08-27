import os, glob, re

for lang in ['it', 'fr', 'de', 'zh']:
    for fpath in glob.glob(f'src/content/blog/{lang}/*.md'):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        # Handle both single and double quotes
        new_content = re.sub(r"image:\s*(['\"])../../assets", r"image: \g<1>../../../assets", content)
        if content != new_content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
print('Fixed relative image paths in markdown.')
