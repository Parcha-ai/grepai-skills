<!-- Generated from skills/grep-mcp/SKILL.md; do not edit. -->

# Onboard a coding agent

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Install the platform skill library from this repository using its installer; preserve existing skill and MCP configurations. If the library is already installed, connect the server without reinstalling unrelated tools.

MCP endpoint: `https://api.grep.ai/api/v2/mcp`. Prefer the host's supported remote-server/OAuth flow. For Claude Code, the HTTP server entry uses `type: "http"`, not `transport`. A minimal project entry is:
```json
{"mcpServers":{"grep":{"type":"http","url":"https://api.grep.ai/api/v2/mcp"}}}
```
For API-key clients, use the host's secret/environment configuration for the Authorization bearer header. Do not paste a key into a tracked `.mcp.json`, print the session file, or reuse an OTP session JWT as a permanent token. Different clients use different configuration formats; inspect the host's existing configuration before editing. Preserve other server entries and custom Grep endpoints.

Verify using the actual MCP client: initialize, complete authentication, list tools, then perform an authorized read such as listing accessible agents. Do not assume a bare unauthenticated `tools/list` HTTP request or a fixed count of four tools proves the connection.

Explain the available workflows: `grep-platform`, `grep-agentify`, `grep-agents`, `grep-optimize`, plus existing research and artifact skills. If onboarding came from a homepage example, retain its supplied prompt as the first task. Use `grep-agentify` to extract that procedure; do not replace it with a generic demo or automatically run a paid batch.

If the host does not support MCP, use the API-key REST client. A skill installation teaches workflows; it does not enable continuous detection across other sessions.
