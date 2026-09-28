---
name: grep-continue
description: "Continue an existing Grep run with a follow-up question rather than starting an unrelated run."
---

# Continue a run

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Read the existing job and identify the follow-up. Use MCP `research_continue`, or:
```bash
node "$SCRIPTS_DIR/grep-api.js" continue RUN_ID "<new instruction>"
```
The legacy email-OTP session cannot use this v2 operation; connect v2 authentication if needed. Poll the same run ID and report the revised result. Continue is a mutation and can incur work/cost; do not use it as a status check. On an uncertain write outcome, inspect the existing run before retrying. Use a separate run for a new independent input to a reusable agent.
