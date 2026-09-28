# Platform contract and setup

Verified against production `https://api.grep.ai/api/v2/openapi.json` and backend MCP source on 2026-09-28. Fetch the target deployment's schema before relying on a changing feature. Presence in OpenAPI does not override permission or feature gates (403/503).

## Locate the library

Resolve the actual SKILL.md path (follow symlinks). For a repository/install skill under `skills/<name>/SKILL.md`, scripts live at `<library>/scripts` and references at `<library>/resources`. Do not assume the current working directory or a Claude-only environment variable. Set `SCRIPTS_DIR` to that absolute scripts path. For the Cowork zip, use its bundled `research/scripts` directory.

## Connect

Prefer an already connected Grep MCP server. URL: `https://api.grep.ai/api/v2/mcp`. Use the client's OAuth connection flow or an API key from Grep's developer key settings. Discover actual tool schemas; there is no fixed tool count. `research_create` remains the MCP run operation; REST has the `/run` alias. The server still names agent lifecycle tools `expert_*`.

For REST, prefer `GREP_API_KEY` in the environment. `GREP_ACCESS_TOKEN` accepts an OAuth access token scoped to this deployment's v2 resource. Do not print these values. An email-OTP session JWT is not a v2 OAuth token; the legacy CLI research path can use v1 for those sessions, but platform creation/configuration requires v2 auth. Never downgrade a failing v2 write to v1 automatically.

The package/executable identity is `grepai-skills`; installation files live in `~/.grepai-skills`. The source repository is `Parcha-ai/grepai-skills`.

## Contract

| Action | REST | MCP |
|---|---|---|
| Public catalog | GET /api/v2/agents | Discover available tools/catalog |
| Accessible custom agents | GET /api/v2/experts/custom | expert_list |
| Agent detail/update | GET/PATCH /api/v2/experts/{id} | expert_get / expert_update |
| Build agent | POST /api/v2/experts/build | expert_build_start |
| Build status | GET /api/v2/experts/build/{job_id} | expert_build_get |
| Start run | POST /api/v2/run | research_create |
| Read run | GET /api/v2/run/{id_or_slug} | research_get |
| Continue/files/timeline | /api/v2/research/{id}/… | research_continue / research_files_list / research_timeline |
| Candidate workflow | POST /api/v2/experts/generate-workflow | expert_generate_workflow |

The CLI `research` command submits and returns immediately; `run` submits and polls. `result --no-wait` reads once. Preserve IDs on timeout; do not submit a replacement. Terminal failures include failed, blocked, and cancelled. Network failures after POST have uncertain outcomes. Use supported idempotency on run creation and inspect existing work before retrying other writes.

Build status `succeeded` differs from run status `completed`. Read the actual response, including draft lifecycle status. Costs, quota, eligible optimization data, tools, and feature availability depend on the account/deployment. Do not hardcode prices or claim unlimited or automatic savings.

The v2 run payload uses `question`, `expert_id`, `context`, `effort`, `attachment_ids`, `json_schema`, and `referenceJobs` (camel case). `output_type` is not a current public run field: request the desired artifact in the question with effort=build. The CLI translates its legacy --output-type convenience flag into that instruction.

## Permissions and scope

Existing user authorization carries forward. Discovery can be proactive; creating agents, paid test runs, full batches, public sharing, schedules, and payments must remain within the requested scope. Never publish an output or purchase credits as an implicit part of onboarding. Keep secrets in credential storage, not project registries, prompts, transcripts, or committed MCP configuration.

A skill can recognize repetition in available context and reuse saved project references. It cannot install always-on surveillance or recall other sessions by itself.

## SDK boundary

The AgentRun TypeScript/Python SDKs may target an adapter contract with `/agents/build`, `/runs`, `prompt`, and `input`. The verified Grep public API uses `/experts/build`, `/run`, `domain`, and `question`. These are not interchangeable base URLs or payloads. Before generating SDK integration code, inspect the installed SDK version and its configured adapter's contract. Do not point it at the Grep REST host by replacing a hostname alone. When compatibility is unverified, use the MCP/REST workflow documented here.
