# Complexity Analysis Report

## Metrics Matrix

| Iteration | Pattern | Cyclomatic (Decision Points) | State Complexity (Mutations) | Architectural Sprawl (Impact) |
| :--- | :--- | :---: | :---: | :---: |
| **Gen 0 (Baseline)** | Functional | 1 | 2 | Low |
| **Gen 0 (Baseline)** | OOP | 2 | 7 | Low |
| **Gen 1 (Initial)** | Functional | 2 | 2 | Low |
| **Gen 1 (Initial)** | OOP | 2 | 8 | Medium |
| **Gen 2 (Chaos)** | Functional | 3 | 2 | Low |
| **Gen 2 (Chaos)** | OOP | 4 | 11 | High |

## Key Findings
- **Cyclomatic Drift**: OOP complexity grew at 2x the rate of Functional during stress tests.
- **State Tax**: Functional state mutations remained constant (flat), while OOP mutations scaled linearly with new features.
- **Structural Impact**: Functional changes were additive (wrappers); OOP changes were invasive (mutating internals).

## Sources & References
- **Cyclomatic Complexity Theory**: Based on Thomas J. McCabe's (1976) measure of linearly independent paths through a program's source code.
- **State Complexity**: Derived from the analysis of mutable assignments and side-effect-inducing calls within the logic loop.
- **Functional-Lite Methodology**: Inspired by the "Functional-Light JS" patterns focusing on pure transformations over state management.
- **Implementation Data**: Generated via AST (Abstract Syntax Tree) analysis of the `llms-and-guardrails` demonstrative API.
