<!-- Generated from skills/grep-optimize/SKILL.md; do not edit. -->

# Improve repeated execution

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Start with the existing agent ID and completed runs. Compare output quality, failures, cost, and latency on representative inputs; do not claim every run necessarily costs less.

Identify stable deterministic steps (normalization, validation, exact lookups, formatting) versus judgment-dependent steps (ambiguous evidence, exception investigation). Keep evidence and exception routes intact. Describe a proposed change and measurable acceptance criteria.

Check live capabilities before invoking optimization. The production OpenAPI checked on 2026-09-28 exposes workflow generation and agent configuration, but no public optimize endpoint. Do not call a hypothetical `Agent.optimize()` or `/agents/{id}/optimize`. If the target deployment later exposes optimization, read that exact schema, enforce its eligibility and budget requirements, and inspect its candidate/evaluation result before activation.

The currently supported workflow route is:
```json
{"system_prompt":"<existing procedure>","sample_input":{"company":"Example Co"},"output_schema":{"type":"object","properties":{"summary":{"type":"string"}}}}
```
```bash
node "$SCRIPTS_DIR/grep-api.js" workflow-generate --file=workflow-request.json
```
This calls `POST /api/v2/experts/generate-workflow` (MCP `expert_generate_workflow`). It generates a candidate; it does not install it or prove savings. Check `valid`, `validation_errors`, and the returned workflow.

Use the live agent update/apply schema to configure a candidate version. Validate it first (`validate_only` in the MCP create/update tool, or an apply dry run where supported). Test against representative and exception inputs within the user's authorized run/budget scope. Compare actual outputs and cost; report regressions as well as savings. Activate only a candidate that meets the agreed checks, with existing user authorization, and retain a rollback reference. If measurement or activation is unavailable, report a proposal/candidate rather than “optimized.”
