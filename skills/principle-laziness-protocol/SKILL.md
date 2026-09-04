---
name: principle-laziness-protocol
description: "Apply when refactoring, evaluating diff size, or tempted to add abstractions, layers, or signal threading. Enforces Occam's Razor: bias toward deletion and the simplest change that solves the problem."
user-invocable: false
---

# Laziness Protocol (Occam's Razor)

> *Entia non sunt multiplicanda praeter necessitatem.* — William of Ockham  
> ("Entities should not be multiplied beyond necessity.")

Writing code is cheap for you, which makes over-engineering easy.
Counter it with **Occam's Razor**: when deciding between competing designs, the implementation that introduces the fewest new abstractions, fewest assumptions, and least code is almost always the right one. Borrow a human maintainer's fatigue. Aim for the most result with the least code and complexity.

Aim for the maximum result with the least complexity.

- **Occam's Razor over premature architecture.** Do not add interfaces, generic factories, or adapter layers for hypothetical future requirements. Solve today's concrete problem.
- **Prefer deletion.** When asked to refactor or improve, search for removals before additions. Dead code deleted is zero-cost maintenance.
- **Maintain a flat call hierarchy.** Avoid deep call chains. If answering a question requires tracing through more than 3 files or layers, flatten it.
- **Consolidate decisions.** Do not repeat the same choice in several places. Put it behind one source of truth and pass the result as a simple flag.
- **Minimize the diff.** Make the smallest change that completely solves the problem. Fewer lines beat "clever" boilerplate.
- **Question the threading.** If a task asks you to pass a new signal through types, schemas, pipelines, or similar layers, stop and find the direct path.
- **Sweat the small leaks.** Remove tiny pass-throughs, representation leaks, and duplicated choices before they spread. Small leaks compound into permanent coordination costs.

**Prime directive:** If a human developer would find the code exhausting to read, trace, or maintain, it is a bad solution. Apply Occam's Razor: stay lazy, stay simple.
