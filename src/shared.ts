import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rules = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../gdpr_rules.json'), 'utf8')
).rules_tree_root.root_rule;

export type Payload = Record<string, any>;

export function resolveField(fieldPath: string, payload: Payload): any {
  if (fieldPath === 'always_true') return true;
  const parts = fieldPath.split('.');
  const actualPath = parts.slice(1);
  let current = payload;
  for (const part of actualPath) {
    if (current === undefined || current === null) return false;
    current = current[part];
  }
  return current;
}
