---
name: grep-status
description: "Check Grep authentication, current account usage, and existing run status without starting new work."
---

# Account and run status

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

```bash
node "$SCRIPTS_DIR/auth.js" status
node "$SCRIPTS_DIR/grep-api.js" jobs
node "$SCRIPTS_DIR/grep-api.js" status RUN_ID
```
For an MCP connection, use `quota_get`, `billing_usage_get`, and `research_list` where available. Account status should reflect the selected deployment and credentials. The legacy auth status command checks its saved session, not the MCP connection or environment API key.

Summarize actual status, quota/usage if returned, and relevant running work. A missing local session does not mean an authenticated MCP connection is logged out. Do not start test runs to check status.
