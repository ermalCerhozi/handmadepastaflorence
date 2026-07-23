import os
from PIL import Image

def process_image(input_path, output_path, size=None, quality=80):
    try:
        if not os.path.exists(input_path):
            print(f"File not found: {input_path}")
            return
        img = Image.open(input_path)
        if size:
            img.thumbnail(size, Image.Resampling.LANCZOS)
        if img.mode in ("RGBA", "P") and output_path.endswith('.jpg'):
            img = img.convert("RGB")
        img.save(output_path, quality=quality)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

base = r"C:\Users\ermal.cerhozi\p-projects\endris-workspace\handmadepastaflorence\public\images"

# Resize images that are too large for their containers
process_image(os.path.join(base, "aperitivo.webp"), os.path.join(base, "aperitivo.webp"), size=(800, 1067))
process_image(os.path.join(base, "cooking_class_with_guests_in_picture.webp"), os.path.join(base, "cooking_class_with_guests_in_picture.webp"), size=(800, 1067))
process_image(os.path.join(base, "wedding-cake-2.webp"), os.path.join(base, "wedding-cake-2.webp"), size=(800, 1067))

# Compress cooking-class.jpg and optionally convert to webp/compress further
process_image(os.path.join(base, "cooking-class.jpg"), os.path.join(base, "cooking-class.jpg"), quality=60)

# Compress and resize logo
process_image(os.path.join(base, "logo.png"), os.path.join(base, "logo.png"), size=(80, 80))
