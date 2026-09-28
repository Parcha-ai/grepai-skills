# Intent to platform operation

| Intent | Workflow |
|---|---|
| Repeat these checks on every new record | grep-agentify; reuse an existing agent if suitable |
| Create an agent | grep-agents; discover build schema, await build, inspect lifecycle |
| Run this saved agent | POST /api/v2/run with question and expert_id |
| Reduce repeated reasoning/cost | grep-optimize; inspect run evidence, generate and test a candidate |
| Build slides, a spreadsheet, or an app | question specifies deliverable; effort=build |
| Use previous results | referenceJobs contains actual run IDs |
| Follow up on this result | research_continue / POST /api/v2/research/{id}/continue |
| Read output | research_get, workspace files; do not guess artifact URLs |

See platform.md for authentication and capability boundaries. Do not hardcode catalog IDs from names or send output_type as a v2 run field.
