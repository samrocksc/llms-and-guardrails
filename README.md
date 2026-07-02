# LLMs and Guardrails - Baseline

This is the baseline implementation of the GDPR Breach Notification Engine.

## The API
The API provides two ways to evaluate a GDPR breach payload:
- `POST /functional`: Uses a pure, recursive transformation.
- `POST /oop`: Uses a stateful class-based evaluator.

## What's in this branch?
This branch establishes the initial "Predictability Gap." It implements the core GDPR decision tree logic and introduces the first set of ESLint guardrails in `src/functional` to forbid classes and interfaces.

## Complexity Baseline
- **Functional**: 7 (Logic only)
- **OOP**: 10 (Logic + State Management)
