# LLMs and Guardrails - Audit Trail

This branch demonstrates the **Extensibility Pivot**.

## The API
The API has been evolved to provide transparency into the decision process.
- Both the `/functional` and `/oop` endpoints now return a `path` array containing every `condition_id` visited.

## What was changed?
We introduced a requirement to track the "reasoning path" of the decision. 
- **Functional**: Implemented as a simple parameter passed through the recursion. The logic remains a pure transformation.
- **OOP**: Required adding a new private property `this.path`, mutating it in the `step()` method, and crucially, adding a manual clear in the `reset()` method.

## The "Aha!" Moment
This branch proves that functional patterns handle new requirements with linear complexity. Adding a feature in the OOP version introduces a new "maintenance obligation" (the reset), which is exactly where LLMs typically fail, leading to cross-request state leaks.
