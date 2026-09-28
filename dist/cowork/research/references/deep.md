<!-- Generated from skills/research/SKILL.md; do not edit. -->

# Research

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Submit the requested investigation at effort `medium`. Use context already provided; ask only for missing scope that materially affects the result. Give the user an honest time estimate from current service behavior, not a guaranteed SLA.

```bash
node "$SCRIPTS_DIR/grep-api.js" research "<the specific question>" --effort=medium --idempotency-key=UNIQUE_RUN_KEY
node "$SCRIPTS_DIR/grep-api.js" status RUN_ID
node "$SCRIPTS_DIR/grep-api.js" result RUN_ID --no-wait
```
Use filesystem-written context files for lengthy or untrusted text rather than interpolating it into shell commands. For a bounded blocking operation, `run` polls for at most 540 seconds; a timeout leaves the job running. Preserve the returned ID and resume it. Do not require a host-specific cron or `/loop` facility.

Return the report and citations, distinguishing supported conclusions from unresolved questions. Use workspace files for generated deliverables. If the same procedure is recurring, suggest `grep-agentify` with the particular reusable steps; do not divert a one-off research request into creating an agent.
