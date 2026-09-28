---
name: grep-agentify
description: "Turn repetitive work into a reusable Grep agent. Use for \u201cagentify this\u201d, repeated procedures over changing inputs, recurring research/checks, or batches of similar tasks. Can suggest reuse when repetition is visible in the current conversation."
---

# Agentify repetitive work

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

## Recognize and reuse

Look for a stable procedure with changing inputs: the same checks on different companies, repeated document extraction, monitoring the same sources, or the same report for each record. Repeated phrasing alone is not enough. Do not agentify a one-off bug fix or an underspecified task just because it is long.

Inspect the project's existing `.grep/agents.json` if present and list accessible agents (`agents` or MCP `expert_list`). Match purpose, inputs, output contract, and current procedure—not just names. Reuse a compatible agent. If the procedure differs, propose updating/versioning it or creating a distinct agent; do not overwrite a shared agent silently.

## Capture the procedure

Separate stable instructions from per-run data. Capture:
- Purpose and exact repeatable steps.
- Variable inputs and required evidence/sources.
- Tools and credentials required, without copying secret values.
- Output structure, citations, quality checks, and exception handling.
- Which work is deterministic code and which requires model judgment.

Use only context the user provided or authorized. Do not upload entire coding sessions, local repositories, or credentials as agent context. Clarify only the missing detail that prevents a usable procedure.

## Build and prove

Follow `grep-agents` for the actual build and lifecycle. “Agentify this” authorizes creating the requested reusable agent; a proactive suggestion alone does not. Preserve existing approvals for test runs and batch scope. Do not buy credits, schedule recurring jobs, or process an entire dataset merely to demonstrate the skill.

Test an authorized representative input; check its output against the captured contract. Record actual success or failure. A registered agent with a failed/unrun test is not validated.

Save a reference in the project's existing registry, merging without overwriting other entries:
```json
{
  "version": 1,
  "agents": [{
    "task": "company-research",
    "api_base": "https://api.grep.ai",
    "agent_id": "<returned expert_id>",
    "procedure": "Verify registration, ownership and risks; cite sources",
    "input_contract": "Company name and website",
    "output_contract": "Cited brief and unresolved questions",
    "last_verified_run": "<actual run ID or null>"
  }]
}
```
Keep the ID scoped to its deployment/account. Store no tokens or sensitive sample records. On the next matching request, load this reference, verify the agent is accessible, and call it with new inputs. If access is denied, stop and resolve access rather than creating a duplicate.

## Learning

Use `grep-optimize` when the user wants lower cost or repeat runs reveal deterministic steps. Completed runs provide evidence for improvements; merely saving a registry entry does not enable automatic server-side optimization. The library has no cross-session watcher. Cross-session reuse depends on the host reading this project registry or explicitly supplied history.
