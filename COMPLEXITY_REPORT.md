# Complexity Analysis Report

## Metrics Matrix

| Iteration | Pattern | Cyclomatic (Decision Points) | State Complexity (Mutations) | Architectural Sprawl (Impact) |
| :--- | :--- | :---: | :---: | :---: |
| **1st Iteration** | Functional | 1 | 2 | Low |
| **1st Iteration** | OOP | 2 | 7 | Low |
| **2nd Iteration** | Functional | 2 | 2 | Low |
| **2nd Iteration** | OOP | 2 | 8 | Medium |
| **3rd Iteration** | Functional | 3 | 2 | Low |
| **3rd Iteration** | OOP | 4 | 11 | High |

## Key Findings
- **Cyclomatic Drift**: OOP complexity grew at 2x the rate of Functional during stress tests.
- **State Tax**: Functional state mutations remained constant (flat), while OOP mutations scaled linearly with new features.
- **Structural Impact**: Functional changes were additive (wrappers); OOP changes were invasive (mutating internals).

## Tooling & References

### Enforcement & Measurement Tools
- **[eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)**: Used to enforce the "Functional-Lite" guardrails by banning `ClassDeclaration` and preventing parameter re-assignment.
- **[ESLint Complexity Rule](https://eslint.org/docs/latest/rules/complexity)**: The standard used to quantify the cyclomatic complexity (linearly independent paths) of the implementations.
- **[Python AST Module](https://docs.python.org/3/library/ast.html)**: Used for the iterative "Chaos Trial" metrics to count specific mutation nodes and decision branches.

### Theoretical Foundations
- **Cyclomatic Complexity Theory**: Based on Thomas J. McCabe's (1976) measure of linearly independent paths through a program's source code.
- **Functional-Lite Methodology**: Inspired by the "Functional-Light JS" patterns focusing on pure transformations over state management.
- **Implementation Proof**: All configurations and the demonstrative API are available in the [llms-and-guardrails repository](https://github.com/samrocksc/llms-and-guardrails).
