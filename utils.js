const Conf = require('conf');
const fs = require('fs');
const path = require('path');

function getVault(projectId) {
  return new Conf({
    projectName: 'ghostenv',
    configName: `projects/${projectId}`,
    clearInvalidConfig: true
  });
}

function vaultExists(projectId) {
  const PROJECTS_DIR = path.join(require('os').homedir(), '.config', 'ghostenv-nodejs', 'projects');
  return fs.existsSync(path.join(PROJECTS_DIR, `${projectId}.json`));
}

function getLocalProjectId() {
  const rcPath = path.join(process.cwd(), '.ghostenvrc');
  if (fs.existsSync(rcPath)) {
    try {
      return JSON.parse(fs.readFileSync(rcPath, 'utf8')).projectId;
    } catch (e) {
      return null;
    }
  }
  return null;
}

function generateUniqueId(baseName) {
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const hash = Math.random().toString(16).substring(2, 6);
  return `${slug || 'project'}-${hash}`;
}

module.exports = { getVault, vaultExists, getLocalProjectId, generateUniqueId };
