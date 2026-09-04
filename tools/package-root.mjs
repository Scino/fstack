import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = path.join(PACKAGE_ROOT, 'skills');
export const MODELS_PATH = path.join(PACKAGE_ROOT, 'models.json');
