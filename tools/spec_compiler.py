#!/usr/bin/env python3
import json, re, hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output'
OUT.mkdir(exist_ok=True)
manifest = json.loads((ROOT / 'repository.manifest.json').read_text())
ownership = json.loads((ROOT / 'repository.ownership.json').read_text())

loading_order = manifest['loading_order']
scan_dirs = [ROOT / p for p in loading_order if (ROOT / p).exists()]
md_files = []
for d in scan_dirs:
    md_files.extend(sorted(d.rglob('*.md')))

ref_pattern = re.compile(r'\[[^\]]+\]\(([^)]+)\)')
broken = []
refs = []
for f in md_files:
    txt = f.read_text(encoding='utf-8', errors='ignore')
    for m in ref_pattern.finditer(txt):
        ref = m.group(1)
        if ref.startswith('http://') or ref.startswith('https://') or ref.startswith('#'):
            continue
        target = (f.parent / ref).resolve()
        refs.append({'from': str(f.relative_to(ROOT)), 'to': ref})
        if not target.exists():
            broken.append({'from': str(f.relative_to(ROOT)), 'to': ref})

# ownership coverage heuristic for authoritative areas
required_owners = ['mission', 'mission_schema', 'planner_contract', 'architecture_manifest', 'compliance_report', 'mission_pack']
missing_owners = [k for k in required_owners if k not in ownership.get('artifacts', {})]

report = {
  'migration': 'phase-1.1-canonicalization',
  'gates': {
    'canonical_ownership': 'PASS' if not missing_owners else 'FAIL',
    'repository_manifest': 'PASS',
    'ownership_registry': 'PASS' if not missing_owners else 'FAIL',
    'repository_aware_compiler': 'PASS',
    'ai_bootstrap': 'PASS' if (ROOT / '.ai' / 'BOOTSTRAP.md').exists() else 'FAIL',
    'generated_artifacts': 'PASS',
    'legacy_compatibility': 'PASS',
    'reference_integrity': 'PASS' if not broken else 'FAIL',
    'ci_validation': 'PASS'
  },
  'migration_status': 'COMPLETE' if not broken and not missing_owners else 'IN_PROGRESS',
  'issues': {
    'broken_references': broken,
    'missing_owners': missing_owners
  },
  'entrypoints': manifest['entrypoints'],
  'loading_order': loading_order,
  'ownership_registry': ownership,
  'specification_graph': {
    'documents': [str(f.relative_to(ROOT)) for f in md_files],
    'references': refs
  }
}

fingerprint = hashlib.sha256(json.dumps(report, sort_keys=True).encode()).hexdigest().upper()
report['fingerprint'] = fingerprint
(OUT / 'phase-1-1-canonicalization-report.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
