#!/usr/bin/env python3
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parents[1]
SPEC_ROOT = ROOT / '02_SPECIFICATIONS'
PKG = ROOT / 'packages' / 'sdk'
OUT = ROOT / 'output'
OUT.mkdir(exist_ok=True)

entities = []
for f in sorted(SPEC_ROOT.rglob('*.md')):
    entities.append({
        'name': f.stem,
        'kind': f.parent.name.lower(),
        'path': str(f.relative_to(ROOT)),
        'const': re.sub(r'[^A-Za-z0-9]+','_',f.stem).upper(),
        'ts': ''.join(part.capitalize() for part in re.split(r'[^A-Za-z0-9]+', f.stem) if part) or 'SpecEntity'
    })

spec_index = {
    'generated_from': '02_SPECIFICATIONS',
    'entity_count': len(entities),
    'entities': entities
}
(PKG / 'src' / 'generated' / 'spec-index.json').write_text(json.dumps(spec_index, indent=2))
(OUT / 'architecture-sdk-report.json').write_text(json.dumps({
    'package': '@yantra/sdk',
    'entity_count': len(entities),
    'generated_files': [
        'packages/sdk/src/generated/spec-index.json',
        'packages/sdk/src/types.ts',
        'packages/sdk/src/schemas.ts',
        'packages/sdk/src/validators.ts',
        'packages/sdk/src/events.ts',
        'packages/sdk/src/errors.ts',
        'packages/sdk/src/capabilities.ts'
    ]
}, indent=2))
print(json.dumps({'package': '@yantra/sdk', 'entity_count': len(entities)}, indent=2))
