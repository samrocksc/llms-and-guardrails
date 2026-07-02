# LLMs and Guardrails - Vibe Coding Expansion

This branch is a simulation of "Vibe Coding"—the process of rapidly appending features without architectural oversight.

## The API
The API has been expanded with 8 additional features to stress-test the predictability of the two paradigms.

## Features Added
1. Confidence Scoring
2. Priority Escalation
3. Multi-Jurisdiction Support
4. Temporal Decay
5. User Category
6. Mitigation Credit
7. Deadline Calculator
8. Cross-Reference Check

## The Outcome
- **Functional Path**: These features were added as simple fields in the return object. The logic remained a pure pipeline.
- **OOP Path**: The `GDPREvaluator` has evolved into a "God Object." The `reset()` method has become a liability, as it must now synchronize 8+ different state variables.

This branch serves as the final proof that the "State Tax" eventually leads to a collapse in predictability when co-piloting with LLMs.
