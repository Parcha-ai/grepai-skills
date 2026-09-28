---
name: grep-with-context
description: "Run Grep using specific user-provided documents, files, or contextual material."
---

# Research with files

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Identify only the files needed for the requested task. Upload those files with the connected attachment tool, or:
```bash
node "$SCRIPTS_DIR/grep-api.js" upload /absolute/path/to/file.pdf
node "$SCRIPTS_DIR/grep-api.js" research "<question about the supplied files>" --attachment-ids=RETURNED_ID
```
Use actual attachment IDs, not local paths in the API body. For plain text context, use `--context-file=/path/context.txt`. Inspect upload errors and size limits before submission. Do not upload secrets or unrelated repository contents. Preserve the run ID and return evidence tied to the provided documents; distinguish file evidence from external research.
