---
name: grep-domain-expert
description: "Discover an appropriate existing Grep agent for a domain-specific task, then run it with the requested input."
---

# Choose an existing agent

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Discover the live public catalog with `node "$SCRIPTS_DIR/grep-api.js" experts`, and accessible custom agents with `agents`. Treat [the catalog reference](../../resources/experts.md) as a hint, not an authoritative count or availability guarantee.

Choose by capability and input/output contract. Use the returned ID rather than deriving one from its name. Inspect custom agents before reusing them. Submit with `research "<question>" --expert-id=ID`, then read the actual result. If no agent matches, offer `grep-agentify` rather than claiming a nonexistent domain expert exists.
