# LLMs and Guardrails - Vibe Coding Expansion

This branch is a simulation of "Vibe Coding"—the process of rapidly appending features using an LLM without architectural oversight.

## The API
The API has been expanded from a simple decision engine into a comprehensive breach assessment tool, adding 8 high-level features (Confidence, Temporal Decay, Jurisdiction, etc.).

## What was changed?
We simulated a "feature sprint" where 8 new requirements were added as quickly as possible.
- **Functional Path**: The implementation remained a pure pipeline. New features were simply added as fields in the return object.
- **OOP Path**: The `GDPREvaluator` became a "God Object." It now manages a large cluster of private state variables, making the `reset()` method a fragile checklist of 10+ items.

## The Final Proof
This branch demonstrates that the "State Tax" isn't just a number—it's a risk. The la-critique shows that while the functional version stays "boring" and predictable, the OOP version becomes a liability where a single missing line in a `reset()` method can corrupt the entire system.
