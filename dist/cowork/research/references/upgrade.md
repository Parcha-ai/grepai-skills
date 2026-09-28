<!-- Generated from skills/grep-upgrade/SKILL.md; do not edit. -->

# Billing and quota

Read [platform setup and API contract](../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Read current quota and billing options from the connected service (`quota_get`, `billing_usage_get`, or the billing client's supported read commands). Do not hardcode prices, plan names, free allowances, or estimated costs from old documentation.

Use `node "$SCRIPTS_DIR/billing.js"` to inspect its command help before invoking it. Present the actual option and account before a checkout or subscription change. A run returning 402 is not authorization to upgrade or fund the account. Stop the run flow, preserve its state, and let the user choose whether to add funds. Do not retry a payment automatically.
