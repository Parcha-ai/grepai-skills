# Dependent work and reusable agents

For a one-off research-to-deck request, run the research, inspect its result, then start the deck using its actual run ID in `--reference-jobs`. The CLI uses the v2 `referenceJobs` property. Include only relevant upstream jobs; do not assume the server automatically inherits every ancestor.

For the same research-to-deck procedure across many companies, use grep-agentify. Keep stable evidence rules and output expectations in the agent; pass each company as the per-run question/input. Save the agent reference and test an authorized sample before a batch.

For recurring validation plus judgment, use grep-optimize to propose code for deterministic work and model steps for ambiguity. Compare candidate outputs, errors, latency, and actual cost against completed baseline runs. Generating a workflow alone is not evidence that cost or quality improved.
