# LLMs and Guardrails - Baseline

This branch represents the starting point of the experiment: a direct comparison between a stateful OOP implementation and a stateless Functional implementation of the same business logic.

## The API
The API provides two endpoints to evaluate a GDPR breach notification payload:
- `POST /functional`: A pure recursive transformation. It takes a payload and returns a decision.
- `POST /oop`: A stateful class-based evaluator that manages an internal pointer and a resolution flag.

## What this branch demonstrates
This is the "Control Group." It establishes the **Predictability Gap** by showing that even for a simple decision tree, the OOP approach carries a "State Tax"—a higher cyclomatic complexity (10 vs 7) and a more fragile internal lifecycle.

## Proposed Changes (The Roadmap)
- **Audit Trail**: Move from returning just a decision to returning the full path of the decision tree.
- **Vibe Expansion**: Rapidly add 8+ features to see how "state drift" affects the OOP version compared to the Functional version.
- **Strict Immutability**: Introduce `Readonly` and `no-param-reassign` guardrails via ESLint to eliminate the mutation vector entirely.
