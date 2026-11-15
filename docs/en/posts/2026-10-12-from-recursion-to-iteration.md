---
layout: doc
title: From Recursion to Iteration
date: 2026-10-12
tags:
  - Algorithm
  - Note
---

# From Recursion to Iteration

## 1. Why Change?

Recursion relies on the **system call stack** to store state. When the recursion depth is too large, it causes a stack overflow. Iteration places state in explicit data structures on the **heap**, managed by yourself, which:

- Avoids stack overflow
- Sometimes reduces space overhead (no need to save a complete stack frame for each level)

In short: **Recursion relies on the system call stack to store "current state" and "return location"; iteration means managing that state yourself.**

## 2. The Core of Transformation

Map each "call/return" of recursion to "push/pop" on an explicit data structure.

You need to think through two things:

1. What is the **state** of the recursion (parameters, local variables, where execution has reached)
2. In what **order** these states are produced and consumed

## 3. Three Typical Cases

### 1. Tail Recursion → Directly Convert to Loop

The recursive call is the last step with no subsequent computation; parameters become loop variables, and accumulated values become local variables.

```python
# Recursion
def fact(n, acc=1):
    if n <= 1:
        return acc
    return fact(n-1, acc*n)

# Iteration
def fact(n):
    acc = 1
    while n > 1:
        acc *= n
        n -= 1
    return acc
```

### 2. Single-Path Recursion → Loop + Variables

Only recurses once without backtracking, usually no stack needed.

```python
# Recursion: reverse a linked list
def reverse(head):
    if not head or not head.next:
        return head
    new_head = reverse(head.next)
    head.next.next = head
    head.next = None
    return new_head

# Iteration
def reverse(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev
```

### 3. Tree/Multi-Path Recursion → Explicit Stack

```python
# Recursion: preorder traversal
def preorder(node):
    if not node:
        return
    visit(node)
    preorder(node.left)
    preorder(node.right)

# Iteration
def preorder(root):
    if not root:
        return
    stack = [root]
    while stack:
        node = stack.pop()
        visit(node)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
```

Note that the stack is LIFO. To visit the left subtree first, you must **push left last**.

If "further processing is needed after returning" (e.g., postorder traversal), the stack must store a **state marker**, equivalent to recording where the function execution has reached:

```python
def postorder(root):
    if not root:
        return
    stack = [(root, False)]  # (node, whether children have been processed)
    while stack:
        node, visited = stack.pop()
        if visited:
            visit(node)
        else:
            stack.append((node, True))   # visit itself when coming back
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))
```

## 4. A Counter-Intuitive Example: Merge Sort

The recursive version of merge sort fits the divide-and-conquer intuition well, but when converting to iteration, you must ask in reverse: **What does the recursion actually do?**

The key insight: **The recursion does nothing during the "splitting" phase.** It just keeps calling downward; the real memory operations happen when "coming back."

So the actual execution order of recursion is:

1. Keep splitting until only single elements remain (doing nothing)
2. First merge the two elements at the bottom level
3. Then merge adjacent small blocks
4. Go up level by level until the entire array is sorted

In other words, **the recursive version is "split to the bottom first, then merge bottom-up."** The iterative version can be written directly following this actual order:

```python
def merge_sort(arr):
    n = len(arr)
    width = 1
    while width < n:
        for left in range(0, n, 2*width):
            mid = min(left + width, n)
            right = min(left + 2*width, n)
            merge(arr, left, mid, right)  # merge [left,mid) and [mid,right)
        width *= 2
    return arr
```

Here `width` represents the length of each sorted block at the current level, starting from 1 and doubling each level, which exactly corresponds to the recursive order of "merging from the bottom level upward." **No stack is used, because the "splitting" of recursion never produced state that needs to be backtracked.**

## 5. General Steps

1. Identify the state of the recursion: parameters, local variables, execution progress
2. Choose a container:
   - Single-direction progression → loop variables
   - Need backtracking/branching → stack
   - Process by level → queue (BFS)
3. Map "call" to push, "return" to pop
4. If further computation is needed after returning, use a state marker to record where execution has reached

## 6. When Not to Change

- When recursion depth is small and logic is clear, recursion is more readable
- Forced iteration makes code complex and error-prone, reducing maintainability
- Tree structures naturally fit recursion; converting to iteration may not be worth it

## Summary

**Converting recursion to iteration = manually saving "recursive parameters + execution progress" using explicit data structures (stack/queue/variables), turning "function call/return" into "push/pop."**

Before transforming, ask one question: **When does this recursion actually do the real work?** Once you understand the execution order, many recursions (like merge sort) can be rewritten directly without even needing a stack.
