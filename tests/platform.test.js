const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const contract = require('./fixtures/platform-contract.json');
const {runPlatform} = require('../scripts/platform');
const {basePath, buildSubmitBody, jobDetailPath, api} = require('../scripts/grep-api');

test('v2 run wire payload matches the verified public fields', () => {
  process.env.GREP_API_KEY = 'test-key';
  const body = buildSubmitBody('Compare companies', {expertId:'saved-agent',referenceJobs:['run-1'],outputType:'spreadsheet',context:'Use supplied evidence',jsonSchema:{type:'object'}});
  assert.equal(basePath(),'/api/v2');
  assert.equal(body.effort,'build');
  assert.match(body.question,/spreadsheet/);
  assert.deepEqual(body.referenceJobs,['run-1']);
  for(const field of Object.keys(body)) assert.ok(contract.runProperties.includes(field),field);
  assert.equal(jobDetailPath('a/b'),'/api/v2/run/a%2Fb');
});
test('REST requests preserve idempotency keys and environment credentials', async () => {
  process.env.GREP_API_KEY='test-key';
  const original=global.fetch;
  global.fetch=async(url,opts)=>{assert.equal(opts.headers.Authorization,'Bearer test-key');assert.equal(opts.headers['Idempotency-Key'],'same-submission');assert.equal(JSON.parse(opts.body).question,'test');return {ok:true,json:async()=>({job_id:'one'})}};
  try{assert.deepEqual(await api('POST','/api/v2/run',{question:'test'},'same-submission'),{job_id:'one'})}finally{global.fetch=original}
});
test('agent build uses discovered route and preserves the procedure', async () => {
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'grep-platform-'));
  const file=path.join(tmp,'request.json');fs.writeFileSync(file,JSON.stringify({domain:'Company research',context:'Cite sources',depth:'standard'}));
  const original=global.fetch;global.fetch=async()=>({ok:true,json:async()=>contract});
  const calls=[];
  try{
    const result=await runPlatform('agent-build',[],{file},{base:'https://api.grep.ai',api:async(...args)=>{calls.push(args);return {job_id:'build-1',status:'queued'}}});
    assert.equal(result.job_id,'build-1');assert.deepEqual(calls[0].slice(0,3),['POST','/api/v2/experts/build',{domain:'Company research',context:'Cite sources',depth:'standard'}]);
    await runPlatform('agent-build-status',['build/1'],{},{base:'https://api.grep.ai',api:async(...args)=>calls.push(args)});
    assert.equal(calls[1][1],'/api/v2/experts/build/build%2F1');
  }finally{global.fetch=original;fs.rmSync(tmp,{recursive:true,force:true})}
});
test('missing capability and malformed builds fail before any write', async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'grep-platform-'));const file=path.join(tmp,'request.json');fs.writeFileSync(file,'{}');
 const original=global.fetch;let calls=0;const client={base:'https://api.grep.ai',api:async()=>calls++};
 try{
  global.fetch=async()=>({ok:true,json:async()=>({paths:{}})});
  await assert.rejects(runPlatform('agent-build',[],{file},client),/not exposed/);
  global.fetch=async()=>({ok:true,json:async()=>contract});
  await assert.rejects(runPlatform('agent-build',[],{file},client),/nonempty domain/);
  fs.writeFileSync(file,JSON.stringify({domain:'Test',context:'x'.repeat(5001)}));
  await assert.rejects(runPlatform('agent-build',[],{file},client),/5000/);
  assert.equal(calls,0);
 }finally{global.fetch=original;fs.rmSync(tmp,{recursive:true,force:true})}
});
test('an uncertain write is never automatically retried',async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'grep-platform-'));const file=path.join(tmp,'request.json');fs.writeFileSync(file,'{"domain":"Test"}');
 const original=global.fetch;global.fetch=async()=>({ok:true,json:async()=>contract});let calls=0;
 try{await assert.rejects(runPlatform('agent-build',[],{file},{base:'https://api.grep.ai',api:async()=>{calls++;throw new Error('timeout')}}),/timeout/);assert.equal(calls,1)}finally{global.fetch=original;fs.rmSync(tmp,{recursive:true,force:true})}
});
test('agent activation sends the reviewed update body to the exact agent',async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'grep-platform-'));const file=path.join(tmp,'activate.json');fs.writeFileSync(file,'{"status":"active"}');
 const original=global.fetch;global.fetch=async()=>({ok:true,json:async()=>contract});
 try{
  const result=await runPlatform('agent-update',['saved/agent'],{file},{base:'https://api.grep.ai',api:async(method,url,body)=>{assert.equal(method,'PATCH');assert.equal(url,'/api/v2/experts/saved%2Fagent');assert.deepEqual(body,{status:'active'});return {status:'active'}}});
  assert.equal(result.status,'active');
 }finally{global.fetch=original;fs.rmSync(tmp,{recursive:true,force:true})}
});
