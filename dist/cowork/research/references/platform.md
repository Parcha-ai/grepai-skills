<!-- Generated from skills/grep-platform/SKILL.md; do not edit. -->

# Grep platform

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Use the smallest workflow that achieves the user's goal:

| Intent | Skill |
|---|---|
| Repeated procedure, “agentify this,” or “do this for every record” | `grep-agentify` |
| Create, inspect, test, or rerun an agent | `grep-agents` |
| Reduce cost, convert repeated steps to code/workflows | `grep-optimize` |
| Connect a coding agent to Grep | `grep-mcp` |
| One-off investigation | `quick-research`, `research`, `ultra-research` |
| Source-backed app, slides, spreadsheet | `grep-build-app`, `grep-build-slidedeck`, `grep-build-spreadsheet` |
| Authentication, account, billing | `grep-login`, `grep-status`, `grep-upgrade` |
| Follow up, files, multi-step work | `grep-continue`, `grep-with-context`, `grep-research-workflow` |

When repetition is evident in the available conversation, surface a specific opportunity: “These companies need the same checks; we can save that procedure as a Grep agent.” Continue the current task unless the user chooses that path or already authorized it. Do not install monitoring hooks or read unrelated session history. Discovery is contextual, not a background service.

The local skill library teaches the coding agent how to use Grep. The skills/tools attached to a remote Grep agent are a separate platform resource. Do not confuse installing this library with creating an agent.
