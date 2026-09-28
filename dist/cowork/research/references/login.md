<!-- Generated from skills/grep-login/SKILL.md; do not edit. -->

# Authenticate

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Prefer an existing MCP connection or `GREP_API_KEY` environment secret for the full platform. Use the host's OAuth flow for MCP. API keys are created in Grep's developer key settings.

The legacy headless email flow remains available for research:
```bash
node "$SCRIPTS_DIR/auth.js" status
node "$SCRIPTS_DIR/auth.js" send-code user@example.com
node "$SCRIPTS_DIR/auth.js" verify user@example.com OTP_CODE
```
Request the code from the user without exposing it in ordinary output. Sending a second code invalidates the first. `login` is an interactive terminal command; use the two-step flow in a coding agent. Tokens are stored in `~/.grep/session.json`; never print this file or the raw `token` command output to the user.

An OTP session JWT supports the CLI's legacy v1 research path, not the full v2 platform. For agent creation/configuration, use an API key or resource-scoped OAuth token. Reuse existing authorization; do not sign up, change plans, or purchase credits merely to authenticate.
