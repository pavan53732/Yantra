#!/usr/bin/env python3
from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
out = root / 'output'
out.mkdir(exist_ok=True)
files = {
  'types.ts': '// generated SDK placeholder\n',
  'events.ts': '// generated SDK placeholder\n',
  'errors.ts': '// generated SDK placeholder\n'
}
for name, content in files.items():
    (out / name).write_text(content)
print(json.dumps({'generated': list(files.keys())}, indent=2))
