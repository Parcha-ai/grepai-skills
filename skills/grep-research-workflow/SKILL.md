---
name: grep-research-workflow
description: "Chain Grep research and deliverable runs when later steps need earlier evidence; agentify stable recurring chains."
---

# Multi-step work

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Use the smallest dependency graph that satisfies the task. Start the upstream research, preserve its run ID, wait for a usable result, then supply it to dependent work with `--reference-jobs=ID1,ID2`. The CLI serializes this as `referenceJobs` on v2.

Do not run downstream steps on missing or failed evidence. Record each run ID and report partial completion honestly. Parallelize only independent work within the requested scope and budget. Do not require host-specific cron facilities.

When the same graph recurs over new inputs, use `grep-agentify` to capture a reusable agent. For translating stable steps into a candidate workflow and deterministic code, use `grep-optimize`; a sequence of research calls is not itself proof of optimization.
