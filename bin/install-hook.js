#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = process.env.INIT_CWD || process.cwd();
const gitHooksDir = path.join(projectRoot, '.git', 'hooks');
const preCommitHook = path.join(gitHooksDir, 'pre-commit');

if (!fs.existsSync(gitHooksDir)) {
  process.exit(0);
}

const GHOST_GUARD_BLOCK = `
# --- ghostenv guard start ---
# This block prevents accidental .env commits.
if git diff --cached --name-only | grep -qE '^\\.env$|^\\.env\\..*'; then
  echo "Error: [ghostenv] You are trying to commit a .env file!"
  echo "Action: Run 'genv vault' to secure your secrets first."
  exit 1
fi
# --- ghostenv guard end ---
`;

try {
  let currentHook = '';
  if (fs.existsSync(preCommitHook)) {
    currentHook = fs.readFileSync(preCommitHook, 'utf8');
  }

  if (!currentHook.includes('ghostenv guard')) {
    const newHook = currentHook + GHOST_GUARD_BLOCK;
    fs.writeFileSync(preCommitHook, newHook, { mode: 0o755 });
    console.log('[ghostenv] Guard active: .env files are now blocked from commits.');
  }
} catch (err) {
  console.warn('[ghostenv] Warning: Could not auto-install git guard.');
}
