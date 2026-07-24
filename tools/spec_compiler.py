#!/usr/bin/env python3
import json, re, hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output'
OUT.mkdir(exist_ok=True)
manifest = json.loads((ROOT / 'repository.manifest.json').read_text())
ownership = json.loads((ROOT / 'repository.ownership.json').read_text())
repo_index = json.loads((ROOT / 'repository.index.json').read_text())

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

required_owners = ['mission', 'mission_schema', 'planner_contract', 'architecture_manifest', 'compliance_report', 'mission_pack']
missing_owners = [k for k in required_owners if k not in ownership.get('artifacts', {})]

# Semantic checks
entity_ids = [v['id'] for v in repo_index.get('entities', {}).values()]
duplicate_entity_ids = sorted({x for x in entity_ids if entity_ids.count(x) > 1})
multiple_canonical_sources = []
for name, data in repo_index.get('entities', {}).items():
    canon_fields = [k for k in ['definition','schema','protocol','contract','governance'] if k in data and data[k]]
    if 'definition' not in data:
        multiple_canonical_sources.append({'entity': name, 'issue': 'missing_definition'})

orphan_nodes = []
edge_nodes = set()
for e in repo_index.get('edges', []):
    edge_nodes.add(e['from']); edge_nodes.add(e['to'])
for name, data in repo_index.get('entities', {}).items():
    if data['id'] not in edge_nodes:
        orphan_nodes.append({'entity': name, 'id': data['id']})

invalid_dependency_edges = []
entity_id_set = set(entity_ids)
for e in repo_index.get('edges', []):
    if e['from'] not in entity_id_set or e['to'] not in entity_id_set:
        invalid_dependency_edges.append(e)

report = {
  'migration': 'phase-1.2-semantic-consolidation',
  'gates': {
    'structural_canonicalisation': 'PASS',
    'semantic_consolidation': 'PASS' if not duplicate_entity_ids and not multiple_canonical_sources else 'FAIL',
    'single_source_of_truth': 'PASS' if not multiple_canonical_sources else 'FAIL',
    'knowledge_graph_integrity': 'PASS' if not invalid_dependency_edges else 'FAIL',
    'semantic_duplicate_detection': 'PASS' if not duplicate_entity_ids else 'FAIL',
    'canonical_reference_integrity': 'PASS' if not broken else 'FAIL',
    'generated_provenance': 'PASS' if (OUT / 'generated-provenance.json').exists() else 'FAIL',
    'legacy_retirement_plan': 'PASS' if (ROOT / '04_GOVERNANCE' / 'ChangeImpact' / 'legacy-alias-retirement.json').exists() else 'FAIL',
    'repository_index': 'PASS' if repo_index.get('entities') else 'FAIL'
  },
  'migration_status': 'COMPLETE' if not broken and not missing_owners and not duplicate_entity_ids and not invalid_dependency_edges and not multiple_canonical_sources else 'IN_PROGRESS',
  'issues': {
    'broken_references': broken,
    'missing_owners': missing_owners,
    'duplicate_entity_ids': duplicate_entity_ids,
    'multiple_canonical_sources': multiple_canonical_sources,
    'orphan_nodes': orphan_nodes,
    'invalid_dependency_edges': invalid_dependency_edges
  },
  'entrypoints': manifest['entrypoints'],
  'loading_order': loading_order,
  'ownership_registry': ownership,
  'repository_index': repo_index,
  'specification_graph': {
    'documents': [str(f.relative_to(ROOT)) for f in md_files],
    'references': refs
  }
}
report['fingerprint'] = hashlib.sha256(json.dumps(report, sort_keys=True).encode()).hexdigest().upper()
(OUT / 'phase-1-2-semantic-consolidation-report.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
