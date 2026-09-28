# Grep platform skills

Teach your coding agent to use Grep: discover existing agents, turn repetitive work into reusable agents, run them on new inputs, and improve repeated execution with workflows and code. Research, documents, apps, slides, and spreadsheets remain part of the library.

## Install this revision

```bash
git clone https://github.com/Parcha-ai/grep-skills.git ~/.grep-research-skills
cd ~/.grep-research-skills
./setup
```

For an unreleased branch, check out that branch before setup. The published npm package remains `grep-research-skills` for compatibility; `npx grep-research-skills` installs the published release, not unmerged source changes. This revision adds a `grep-skills` executable alias in the same package. Node 18+ is required.

The installer links skills for Claude Code and detects Codex, Cursor, and OpenClaw installations. It preserves real user-owned skill directories. Connect Grep through your client's MCP setup at `https://api.grep.ai/api/v2/mcp`, or set `GREP_API_KEY` securely for REST. Do not commit API keys in project configuration.

Start with `/grep-platform`, or ask: “Agentify the company research procedure we have been repeating.”

## Main workflows

| Skill | Purpose |
|---|---|
| `grep-platform` | Route platform tasks and onboarding |
| `grep-agentify` | Recognize repeated procedures, reuse or build an agent, test it, save a project reference |
| `grep-agents` | Discover, build, inspect, activate, and run agents |
| `grep-optimize` | Use run evidence to propose and validate workflows/code that reduce repeated model work |
| `grep-mcp` | Connect the coding agent and preserve an example prompt during onboarding |
| `research`, `quick-research`, `ultra-research` | One-off sourced research at different effort levels |
| `grep-build-app`, `grep-build-slidedeck`, `grep-build-spreadsheet` | Source-backed deliverables |
| `grep-domain-expert`, `grep-with-context`, `grep-continue`, `grep-research-workflow` | Specialized agents, files, follow-ups, and dependent work |
| `grep-plan`, `grep-skill-creator` | Research-informed planning and local skill authoring |
| `grep-login`, `grep-status`, `grep-upgrade` | Authentication, usage, and billing |

Repetition detection uses context available to the coding agent. It is not an always-on watcher. Cross-session reuse comes from a project `.grep/agents.json` reference, not hidden transcript access. A suggestion does not authorize a paid batch, schedule, purchase, or public sharing. Existing user authorization remains valid.

## Current platform contract

[Platform reference](resources/platform.md) records the verified contract and auth differences. Fetch live capabilities with:

```bash
node scripts/grep-api.js capabilities
node scripts/grep-api.js agents
node scripts/grep-api.js agent-build --file=build.json
node scripts/grep-api.js agent-build-status BUILD_ID
node scripts/grep-api.js research "Research Acme" --expert-id=AGENT_ID --idempotency-key=UNIQUE_RUN_KEY
node scripts/grep-api.js result RUN_ID --no-wait
```

`build.json` contains `domain`, optional `context` (up to 5,000 characters), and `depth` (`standard` or `deep`). Build success may register a draft: inspect its lifecycle and activate it before testing. See `skills/grep-agents/SKILL.md`.

Production verified on 2026-09-28 exposes `/api/v2/run`; creation/configuration still uses `/api/v2/experts/*`. MCP retains `research_*` / `expert_*` names. A public optimize endpoint is not currently advertised. Workflow generation produces a candidate; it is not proof of lower cost. The library checks deployment capabilities and never claims a proposed optimization API is live.

API keys or v2 resource-scoped OAuth tokens support the platform. `GREP_ACCESS_TOKEN` supplies such an OAuth token. Legacy email-OTP sessions retain v1 research compatibility but cannot masquerade as v2 OAuth credentials. `GREP_API_BASE` selects the API host; `GREP_UI_BASE` can select the matching UI host. Preserve IDs after timeouts and resume existing work.

## Cowork / Claude.ai

```bash
npm ci
npm run build:cowork
```

Upload `dist/grep-research-skills-v0.3.0.zip` using the client's skill-upload interface. The archive retains the `research` entrypoint for compatibility but routes the whole platform. References are generated from `skills/`, and scripts/resources are bundled. It needs permitted network access to the configured Grep API and auth provider.

## Development

```bash
npm test
npm run sync:cowork
npm run build:cowork
```

The Node test suite uses mocked HTTP and temporary installation roots; it creates no remote agents or paid runs. Source skills are canonical. Do not edit generated Cowork references directly. Version numbers in npm/plugin/discovery metadata move together; publishing remains a separate release step. `scripts/update-check.js` checks only by default; use `--update` to explicitly update from npm.
