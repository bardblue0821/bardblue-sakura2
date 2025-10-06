import os
from PIL import Image

# 入力ディレクトリと出力ディレクトリを指定
input_dir = 'img-vrchat'  # 変えたい場合はここを修正
output_dir = 'img-vrchat-thumb'
rate = 5  # サムネイルの縮小率

os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    if not filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", "mp4", ".tif")):
        continue
    input_path = os.path.join(input_dir, filename)
    output_path = os.path.join(output_dir, filename)
    try:
        with Image.open(input_path) as img:
            w, h = img.size
            img_thumb = img.resize((w // rate, h // rate), Image.LANCZOS)
            img_thumb.save(output_path)
            print(f"{filename}: {w}x{h} -> {w//rate}x{h//rate}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")
