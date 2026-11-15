---
layout: doc
title: About AI
date: 2026/7/2
tags:
  - AI
  - Think
---

# About Artificial Intelligence

## From Chatbot to Agent: What Has Changed?

1. Agents enable models to **interact with the environment**. The ability to perceive the environment reduces unnecessary copy-pasting for users, and allows the model to self-check and correct.
2. Agents let **everyone contribute to AGI**. Skills are essentially methodologies for action. When an Agent reads Skills, it further enhances the model's ability to solve specific problems. Since anyone can write Skills, this allows non-developers to contribute to AI development.
3. Agents give models a **closed loop of "cognitive execution"**. Through the cycle of planning, memory, and tool use, the model can break down vague long-term goals into concrete atomic operations, achieving a fundamental leap from "generating answers" to "solving problems."

## Current Issues with Agents

- **Excessive token consumption**: Repetitive iterations lead to huge token costs. On some long-tail tasks, the cost may even exceed that of manual handling.
- **Infinite loop problems**: The model may fall into cyclic calls and cannot terminate autonomously.
- **Inaccurate Skill discovery and invocation**: If Skills are not carefully designed, the Agent may not trigger them; when a local Skill is specified, it may fail to find it and instead fall back to downloading (possibly because the download path is prioritised too highly).
- **Insufficient feedback**: Agents may terminate early, get stuck, or loop indefinitely, lacking interactive feedback that hurts user experience. When using sub‑agents, their internal reasoning chains are invisible, intensifying the user's "black‑box anxiety."
- **Inadequate interaction logic**: Current mainstream applications do not support mid‑session prompting (dynamic interruption). When users want to refine earlier requirements or correct execution errors, they must stop the current conversation and start over, lacking a "real‑time correction" mechanism like human collaboration.
- **Poor file management**: Agents lack directory‑aware organisation for files, tending to create excessive fragmented files in the root or temporary directories, and they lack unified naming and archiving standards, leading to poor cross‑session reuse.

## Current Issues with AI

- **Difficulty in aesthetic understanding**: For generative tasks, simple prompts are insufficient to express complex scenes, and different vendors' models have different "aesthetic preferences," making prompt reuse weak.
- **Unnecessary reasoning**: AI may engage in redundant repeated thinking or excessive self‑correction (especially in reasoning models), increasing token consumption. Also, when users question objective facts, models often waver (over‑accommodating users) and lack fact‑based firmness.
- **Information obsolescence**: The cutoff date of pre‑training data causes outdated information, leading to incorrect judgments (e.g., obsolete API calls) or bad practices (e.g., referencing deprecated security guidelines).

## Current Issues with AI Training

- **Difficulty in aesthetic evaluation**: Aesthetics are hard to evaluate and highly subjective. The current focus should be more on multimodal aesthetic understanding (e.g., compositional semantics, colour psychology) rather than crude scoring. In the future, AI is likely to understand individual aesthetic preferences through non‑textual personal data (e.g., eye‑tracking, dwell time).
- **Slow iteration speed**: The iteration speed of AI training is constrained by bottlenecks such as compute cluster scale, data‑pipeline cleaning, and communication bandwidth (i.e., training infrastructure). A failed experiment can waste considerable time.

## Why Is AI Coding Promising?

- Programming offers a considerable degree of **output determinism** (compilation pass/fail, unit test pass/fail), which greatly facilitates result evaluation and automated feedback.
- Programming has **well‑established environments** for training; open‑source codebases and analysis tools provide abundant evaluation settings.
- Programming brings **deterministic computation**, since code outputs are not based on probabilistic sampling, making formal verification feasible.
- This allows AI to enter a **self‑improvement** phase, as AI can improve its own reasoning frameworks through coding.
- **Solving long‑tail tasks**: Through programming, AI can try to tackle special scenario tasks, automatically exploring solutions without requiring pre‑built functionalities.

## Some Perspectives

- **Compute** remains important, and its importance will grow, with inference compute being more valuable than training compute.
- The continued advancement of compute may further drive **computer graphics**.
- **Embodied AI** faces enormous data challenges: real‑world physical data collection is expensive and dangerous. It needs to rely on simulated data while achieving rapid deployment in products like robot vacuums and industrial arms to form a real‑world physical interaction data flywheel. Simulation data still needs to improve its realism.
- **Multimodal models** will drive Agents forward in more dimensions, thanks to vastly improved environmental perception. For instance, visual capabilities allow the model to diagnose front‑end style issues through screenshots.
- **Security**
  - Due to information obsolescence and hallucinations, Vibe Coding may introduce unexpected vulnerabilities, posing greater security risks.
  - The proliferation of Agent features across platforms will expose a wide attack surface for prompt injection.
  - To enable safe Agent execution, lightweight, high‑performance containerisation may become especially important.
- AI increases human output, which ironically leads to greater fatigue, much of it being spurious productivity.
