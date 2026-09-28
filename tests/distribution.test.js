const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {execFileSync} = require('node:child_process');
const root=path.resolve(__dirname,'..');
test('installer discovers new skills, preserves user directories, and refreshes symlinks',()=>{
 const home=fs.mkdtempSync(path.join(os.tmpdir(),'grep-install-'));
 try{
  for(const host of ['.claude','.codex','.cursor','.openclaw']) fs.mkdirSync(path.join(home,host),{recursive:true});
  const owned=path.join(home,'.claude/skills/grep-agents');fs.mkdirSync(owned,{recursive:true});fs.writeFileSync(path.join(owned,'SKILL.md'),'user-owned');
  const args=[path.join(root,'bin/install.js')];const opts={env:{...process.env,GREP_INSTALL_HOME:home},stdio:'pipe'};
  execFileSync(process.execPath,args,opts);execFileSync(process.execPath,args,opts);
  for(const host of ['.claude','.codex','.cursor','.openclaw']) assert.ok(fs.existsSync(path.join(home,host,'skills/grep-agentify/SKILL.md')));
  assert.equal(fs.readFileSync(path.join(owned,'SKILL.md'),'utf8'),'user-owned');
  assert.ok(fs.existsSync(path.join(home,'.grepai-skills/scripts/platform.js')));
 }finally{fs.rmSync(home,{recursive:true,force:true})}
});
test('all skills are discoverable and consolidated references resolve',()=>{
 execFileSync(process.execPath,['bin/sync-cowork.js'],{cwd:root});
 const manifest=require('../.well-known/skill-manifest.json');
 const names=fs.readdirSync(path.join(root,'skills')).sort();assert.deepEqual(manifest.skills.map(x=>x.name).sort(),names);
 for(const item of manifest.skills) assert.ok(fs.existsSync(path.join(root,item.path)));
 function checkLinks(file){
  const text=fs.readFileSync(file,'utf8');
  for(const [,link] of text.matchAll(/\]\(([^)]+)\)/g)){
   if(link.startsWith('http')||link.startsWith('#'))continue;
   assert.ok(fs.existsSync(path.resolve(path.dirname(file),link.split('#')[0])),`${file}: ${link}`);
  }
 }
 for(const name of names)checkLinks(path.join(root,'skills',name,'SKILL.md'));
 checkLinks(path.join(root,'dist/cowork/research/SKILL.md'));
 for(const file of fs.readdirSync(path.join(root,'dist/cowork/research/references')))checkLinks(path.join(root,'dist/cowork/research/references',file));
 const version=require('../package.json').version;assert.equal(manifest.version,version);assert.equal(require('../.claude-plugin/plugin.json').version,version);assert.equal(require('../package-lock.json').version,version);
});
test('all published identities and installer entrypoint use grepai-skills',()=>{
 const pkg=require('../package.json');
 assert.equal(pkg.name,'grepai-skills');
 assert.deepEqual(pkg.bin,{'grepai-skills':'./bin/install.js'});
 assert.equal(require('../package-lock.json').name,pkg.name);
 assert.equal(require('../package-lock.json').packages[''].name,pkg.name);
 assert.deepEqual(require('../package-lock.json').packages[''].bin,{'grepai-skills':'bin/install.js'});
 assert.equal(require('../.claude-plugin/plugin.json').name,pkg.name);
 const marketplace=require('../.claude-plugin/marketplace.json');
 assert.equal(marketplace.name,pkg.name);
 assert.equal(marketplace.plugins[0].name,pkg.name);
 assert.equal(require('../.well-known/skill-manifest.json').name,pkg.name);
});
