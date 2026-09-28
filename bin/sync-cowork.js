#!/usr/bin/env node
// Source skills own the instructions; the consolidated package is generated.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'dist/cowork/research');
const aliases = {research:'deep','quick-research':'quick','ultra-research':'ultra'};
fs.mkdirSync(path.join(dest, 'references'), {recursive:true});
const skills = fs.readdirSync(path.join(root, 'skills')).sort();
let routes = '';
for (const name of skills) {
  const source = fs.readFileSync(path.join(root, 'skills', name, 'SKILL.md'), 'utf8');
  const file = aliases[name] || name.replace(/^grep-/, '');
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '')
    .replaceAll('../../resources/', '../resources/')
    .replaceAll('(references/skill-writing-guide.md)', '(../resources/skill-writing-guide.md)');
  fs.writeFileSync(path.join(dest, 'references', `${file}.md`), '<!-- Generated from skills/'+name+'/SKILL.md; do not edit. -->\n'+body);
  routes += `- [${name}](references/${file}.md)\n`;
}
fs.cpSync(path.join(root,'resources'), path.join(dest,'resources'), {recursive:true});
fs.copyFileSync(path.join(root,'skills/grep-skill-creator/references/skill-writing-guide.md'),path.join(dest,'resources/skill-writing-guide.md'));
fs.writeFileSync(path.join(dest,'SKILL.md'), `---\nname: research\ndescription: "Use the Grep platform for reusable agents, repetitive task automation, research, and generated deliverables. Route agent creation, reuse, workflow optimization, MCP onboarding, and account tasks to the relevant workflow."\n---\n\n# Grep platform\n\nThe entrypoint keeps the research name for existing Cowork installs. Scripts are in this skill's scripts/ directory. Set SCRIPTS_DIR to that absolute path. Read [platform contract](resources/platform.md) on first use. Read only the relevant workflow below; when a workflow references another skill, use its reference from this list. No background surveillance or automatic paid batches are installed.\n\n${routes}`);
console.log(`Generated ${skills.length} Cowork workflows.`);
