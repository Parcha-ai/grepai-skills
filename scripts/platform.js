const fs = require('node:fs');

async function contract(base) {
  const response = await fetch(`${base}/api/v2/openapi.json`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Discovery failed (${response.status}); no operation submitted.`);
  return response.json();
}
function readBody(flags) {
  if (!flags.file || typeof flags.file !== 'string') throw new Error('Supply --file=<JSON request file>.');
  const body = JSON.parse(fs.readFileSync(flags.file, 'utf8'));
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Request must be a JSON object.');
  return body;
}
async function runPlatform(command, args, flags, { api, base }) {
  const spec = await contract(base);
  if (command === 'capabilities') return { base, paths: spec.paths, schemas: spec.components?.schemas };
  const routes = {
    agents: ['GET', '/api/v2/experts/custom'],
    agent: ['GET', '/api/v2/experts/{expert_id}'],
    'agent-update': ['PATCH', '/api/v2/experts/{expert_id}'],
    'agent-build': ['POST', '/api/v2/experts/build'],
    'agent-build-status': ['GET', '/api/v2/experts/build/{job_id}'],
    'workflow-generate': ['POST', '/api/v2/experts/generate-workflow'],
    'agent-apply': ['POST', '/api/v2/experts/apply'],
  };
  const [method, template] = routes[command];
  if (!spec.paths?.[template]?.[method.toLowerCase()]) throw new Error(`${command} is not exposed by this deployment. No operation submitted.`);
  if (template.includes('{') && !args[0]) throw new Error(`${command} requires an ID.`);
  const endpoint = template.replace(/\{[^}]+\}/g, () => encodeURIComponent(args[0]));
  const body = ['POST', 'PATCH'].includes(method) ? readBody(flags) : undefined;
  if (command === 'agent-build' && (typeof body.domain !== 'string' || !body.domain.trim())) throw new Error('Build requires a nonempty domain. Put the procedure in context.');
  if (command === 'agent-build' && body.context && (typeof body.context !== 'string' || body.context.length > 5000)) throw new Error('Build context must be a string of at most 5000 characters.');
  // Endpoint schemas are deployment-specific; the server is the final validator.
  // No retry of writes: a timeout is an uncertain outcome, not permission to duplicate.
  return api(method, endpoint, body, flags['idempotency-key']);
}
module.exports = { runPlatform, readBody };
