# LLMs and Guardrails

This project is a living laboratory designed to demonstrate the "State Tax" and "Cognitive Drift" that occur when using Large Language Models (LLMs) to develop complex systems.

## The Thesis
Traditional Object-Oriented Programming (OOP) relies on state management that is often too opaque for LLMs to track reliably across a session. This leads to "hallucinations of state" and fragile code. By enforcing a **Functional-Lite** paradigm, we flatten the cyclomatic complexity and remove the mutable state, making the AI's output predictable and the system's evolution linear.

## The Implementation
We use a GDPR Breach Notification Decision Tree as our "complexity engine." 

- **`/functional`**: Pure transformations. No classes. No `this`. No mutation.
- **`/oop`**: A stateful evaluator. Uses classes, internal pointers, and manual state resets.

## The Vibe-Coding Stress Test
To simulate "Vibe Coding" (rapid, non-architectural feature addition), we implemented 8 features across both versions to observe the divergence in maintainability.

### Feature Roadmap & Impact

| Feature | Functional Implementation Cost | OOP Implementation Cost | Risk Introduced |
| :--- | :--- | :--- | :--- |
| 1. Confidence Scoring | Added field to return object | Added private property + reset logic | State leak if reset is missed |
| 2. Priority Escalation | Simple conditional in return | Mutation of internal `priority` flag | Flag persistence between requests |
| 3. Multi-Jurisdiction | Added array to return object | Added private property + reset logic | State leak if reset is missed |
| 4. Temporal Decay | Inline math in return | Added private property + reset logic | State leak if reset is missed |
| 5. User Category | Added field to return object | Added private property + reset logic | State leak if reset is missed |
| 6. Mitigation Credit | Simple math in return | Added private property + reset logic | State leak if reset is missed |
| 7. Deadline Calculator | Simple date generation | Added private property + reset logic | Clock drift/stale timestamp |
| 8. Cross-Reference | Added field to return object | Added private property + reset logic | State leak if reset is missed |

### The Quantification
- **Complexity Baseline**: Functional (7) vs OOP (10).
- **The "State Tax"**: The OOP version carries a ~43% complexity overhead just to manage its own existence.
- **The Fragility Gap**: In the Functional version, adding these 8 features required **zero** changes to the "plumbing." In the OOP version, every feature required updating the constructor and the `reset()` method, creating 8 new opportunities for a "vibe-coding" error to break the entire system.

## How to Run
```bash
npm install
npm run test # Runs the Vitest gauntlet
```
