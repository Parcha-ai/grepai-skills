<!-- Generated from skills/grep-agents/SKILL.md; do not edit. -->

# Build and reuse agents

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

## Discover

Run `node "$SCRIPTS_DIR/grep-api.js" capabilities` to inspect this deployment. Then:
```bash
node "$SCRIPTS_DIR/grep-api.js" agents
node "$SCRIPTS_DIR/grep-api.js" agent AGENT_ID
```
Current production calls agents “experts” in creation/configuration payloads. `GET /agents` is public discovery; `GET /experts/custom` lists accessible custom/shared agents. MCP uses `expert_list` and `expert_get`. Do not invent `agent_create` or assume `/agents/build` exists.

## Build from a procedure

Write `build.json` using the filesystem tool, not shell interpolation of user text:
```json
{"domain":"Company research","context":"Verify registration and ownership, investigate risks, and return a brief citing every finding. Input is a company name and website. Flag missing evidence.","depth":"standard"}
```
```bash
node "$SCRIPTS_DIR/grep-api.js" agent-build --file=build.json
node "$SCRIPTS_DIR/grep-api.js" agent-build-status BUILD_JOB_ID
```
These map to `POST /api/v2/experts/build` and `GET /api/v2/experts/build/{job_id}`; MCP equivalents are `expert_build_start` and `expert_build_get`. Context is at most 5,000 characters. Poll with bounded waits while keeping the user informed. Build states are `queued`, `running`, `registering`, `succeeded`, `failed`. Preserve the build ID after a timeout; do not resubmit.

On `succeeded`, read `expert.expert_id`. Build success registers a draft; inspect its returned lifecycle status. If it is still `building`, use the current `expert_update` schema / PATCH `/experts/{id}` to activate only once its instructions and tool setup are ready. Discover the allowed status values rather than guessing. Do not dispatch an unfinished draft. The currently verified transition is `{"status":"active"}` after readiness review:
```bash
node "$SCRIPTS_DIR/grep-api.js" agent-update AGENT_ID --file=activate.json
```
Inspect the returned status before starting the test run.

For declarative configuration, inspect `/experts/apply`'s live schema, validate a manifest with `dry_run: true`, then apply within the user's authorized scope. Use `expert_get`, `skills_list`, `mcp_tools_list`, and context-file tools as available to inspect actual capabilities. Do not fabricate tool names or copy credentials into a system prompt.

## Run and inspect

```bash
node "$SCRIPTS_DIR/grep-api.js" research "Research Acme, https://example.com" --expert-id=AGENT_ID --idempotency-key=UNIQUE_RUN_KEY
node "$SCRIPTS_DIR/grep-api.js" status RUN_ID
node "$SCRIPTS_DIR/grep-api.js" result RUN_ID --no-wait
node "$SCRIPTS_DIR/grep-api.js" files RUN_ID
```
REST creates through `POST /api/v2/run` with `question` and `expert_id`; MCP uses `research_create`. Keep the same idempotency key and identical body only when retrying the same uncertain submission. New inputs get new keys. Return the actual run ID, report, and generated file links.

For a batch, inspect `batch_estimate` and `batch_create` schemas, estimate first, and process only the authorized records. If those tools are unavailable, use bounded per-record runs and retain an input-to-run mapping. Never repeatedly resubmit a timed-out run.

After a verified test, save the reference following `grep-agentify`; for workflow/code improvements use `grep-optimize`.
