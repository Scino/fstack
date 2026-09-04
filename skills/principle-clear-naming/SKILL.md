---
name: principle-clear-naming
description: Apply when naming variables, functions, types, files, or endpoints. Enforces the 6-month amnesia test, language conventions, intent-based naming, and cross-boundary consistency.
user-invocable: false
---

# Clear Naming Discipline

> "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton

Code is read far more often than it is written. A bad name forces every future reader to inspect the underlying implementation just to understand what a function or variable holds. A good name makes the surrounding code self-evident.

---

## 1. The 6-Month Amnesia Test

Whenever you name a variable, function, class, file, or endpoint, ask:

> **"If I wake up with amnesia in 6 months and read this line, will I immediately know what it is and what it does? Will a new teammate guess its exact purpose on their first day?"**

If the answer is *"Only if they read the function body"*, the name has failed. Rename it.

---

## 2. Intent Over Mechanism

Name by **what problem it solves and what data it represents**, not the mechanical data structure or plumbing:

| Mechanical / Bad | Intent-Driven / Good | Rationale |
|---|---|---|
| `dataArray` | `activeSubscriptions` | Names the domain entity, not the memory structure. |
| `dictMap` | `cachedUserPermissions` | Reveals what the lookup is for. |
| `processStuff()` | `syncStripeInvoices()` | States the exact business operation. |
| `tempFlag` | `hasVerifiedEmail` | Self-documenting state. |

---

## 3. Language & Ecosystem Conventions

Always adhere to the idiom of the host language unless an explicit codebase convention overrides it:

- **TypeScript / JavaScript**:
  - `camelCase` for variables, properties, and functions (`getUserSession`, `isOrgAdmin`).
  - `PascalCase` for classes, types, interfaces, and React components (`PaymentProcessor`, `UserProfileCard`).
  - `UPPER_SNAKE_CASE` for immutable module-level constants (`MAX_RETRY_ATTEMPTS`).
- **Python**:
  - `snake_case` for functions, methods, and variables (`calculate_tax`, `user_id`).
  - `PascalCase` for classes (`DatabaseConnection`).
- **Go / Rust**: Follow standard idiomatic casing (`userID`, `fetch_record`).

---

## 4. Consistency Across Boundaries

Pick one verb per action in a subsystem and stick to it religiously. Do not mix semantic synonyms across files:
- If you use `get...` for database lookups, do not switch randomly to `fetch...`, `retrieve...`, or `query...`.
- If you use `delete...`, do not switch between `remove...`, `drop...`, and `destroy...` for the same entity type.

---

## 5. Booleans as Clear Predicates

Booleans must sound like yes/no questions:
- **Good**: `isEnabled`, `hasAccess`, `shouldRetry`, `canEdit`, `isPendingApproval`.
- **Bad**: `status` (ambiguous), `access` (noun), `check` (sounds like a function).

---

## 6. Ban Cryptic Abbreviations

Unless an abbreviation is universally recognized in the domain (`id`, `url`, `req`, `res`, `ctx`, `err`), spell it out:
- Bad: `usrMgrSvc`, `calcDiscTot()`, `custAddrStr`.
- Good: `userManager`, `calculateDiscountTotal()`, `customerAddress`.
