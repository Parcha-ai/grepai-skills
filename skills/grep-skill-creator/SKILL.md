---
name: grep-skill-creator
description: "Create a local agent skill using Grep research when external evidence is needed. Use for SKILL.md authoring, not for creating a remotely runnable Grep agent."
---

# Create a local skill

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

First distinguish the artifact: a local SKILL.md teaches the coding agent; a remotely runnable Grep agent belongs in `grep-agentify` / `grep-agents`.

Read [skill writing guidance](references/skill-writing-guide.md). Gather the task, trigger conditions, available tools, and real constraints. Use Grep only for external facts the skill actually needs. Write concise frontmatter and workflow instructions; move conditional details to references. Validate links, commands, and realistic use cases. Do not make the skill claim access to tools, memory, or background monitoring it does not have.
