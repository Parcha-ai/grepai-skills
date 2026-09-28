# Repository guidance

Grep platform skill library. Read README.md and resources/platform.md. Keep the existing npm/plugin identity `grep-research-skills` for compatibility; the repository is `Parcha-ai/grep-skills`.

Source skills live in skills/. Generate Cowork references via npm run sync:cowork; never maintain two independent sets of instructions. Scripts use Node built-ins; archiver is a development-only packaging dependency.

Verify REST operations against the target deployment's /api/v2/openapi.json and MCP tools against actual discovery. Public production names may lag SDK or unreleased backend aliases. Do not document proposed optimize APIs as deployed. Keep credentials out of output and registries. Installation does not authorize remote work, account funding, or monitoring other sessions.

Run npm test and npm run build:cowork after changes. Tests must use mocks/temp paths and must not create real agents, paid runs, subscriptions, or public outputs. No npm publishing or merge-to-main is implied by editing this library.
