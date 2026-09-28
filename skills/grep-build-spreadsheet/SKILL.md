---
name: grep-build-spreadsheet
description: "Use Grep to build a source-backed spreadsheet when the user requests that deliverable."
---

# Build a spreadsheet

Read [platform setup and API contract](../../resources/platform.md) before the first platform call. Resolve `SCRIPTS_DIR` as described there. Prefer the connected Grep MCP tools when they expose the needed operation; the CLI is the REST fallback.

Capture the audience, inputs, output format, and essential functionality from the request. Ask only about missing requirements that change the result.

```bash
node "$SCRIPTS_DIR/grep-api.js" research "Create a spreadsheet with the requested columns, structured data, sources, and usable export where supported. <user requirements>" --effort=build
```
The current public run schema does not include `output_type`; put the deliverable in the question. Do not promise fixed prices, runtimes, file formats, or download links before the service returns them.

Poll by run ID with bounded waits. On completion, list workspace files and inspect the actual deliverable. Return a usable service-returned link or file, with the cited research when relevant. Do not invent a URL from a guessed filename.

For structured tabular/deck content, the JSON schemas in `resources/` are optional output templates, not required API fields. Use `--json-schema-file` only when appropriate to the requested output. A recurring deliverable with stable steps can become an agent via `grep-agentify`.
