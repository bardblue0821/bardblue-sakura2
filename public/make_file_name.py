import os
import json
import re

# 対象ディレクトリ
original_dir = 'img-vrchat'
thumb_dir = 'img-vrchat-thumb'

output_file = 'filename.json'

def extract_datetime(filename):
    # 例: VRChat_2023-10-04_23-15-08.604_1920x1080.png
    m = re.search(r'(\d{4})-(\d{2})-(\d{2})[_-](\d{2})-(\d{2})-(\d{2})', filename)
    if m:
        return {
            'year': int(m.group(1)),
            'month': int(m.group(2)),
            'day': int(m.group(3)),
            'hour': int(m.group(4)),
            'minute': int(m.group(5)),
            'second': int(m.group(6)),
        }
    m = re.search(r'(\d{4})-(\d{2})-(\d{2})', filename)
    if m:
        return {
            'year': int(m.group(1)),
            'month': int(m.group(2)),
            'day': int(m.group(3)),
        }
    m = re.search(r'(\d{8})(\d{6})', filename)
    if m:
        return {
            'year': int(m.group(1)[:4]),
            'month': int(m.group(1)[4:6]),
            'day': int(m.group(1)[6:8]),
            'hour': int(m.group(2)[:2]),
            'minute': int(m.group(2)[2:4]),
            'second': int(m.group(2)[4:6]),
        }
    m = re.search(r'(\d{8})', filename)
    if m:
        return {
            'year': int(m.group(1)[:4]),
            'month': int(m.group(1)[4:6]),
            'day': int(m.group(1)[6:8]),
        }
    return {}

def get_files(dir_name):
    dir_path = os.path.join(os.path.dirname(__file__), dir_name)
    if not os.path.isdir(dir_path):
        return []
    return [name for name in sorted(os.listdir(dir_path)) if os.path.isfile(os.path.join(dir_path, name))]

original_files = get_files(original_dir)
thumb_files = set(get_files(thumb_dir))

result = []

for filename in original_files:
    thumb = filename if filename in thumb_files else None
    dt = extract_datetime(filename)
    entry = {
        'filename': filename,
        'original': f'{original_dir}/{filename}',
        'thumb': f'{thumb_dir}/{thumb}' if thumb else None,
    }
    entry.update(dt)
    result.append(entry)

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)