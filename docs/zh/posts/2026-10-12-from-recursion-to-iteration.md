---
layout: doc
title: From Recursion to Iteration
date: 2026-6-30
tags:
  - 算法
  - 笔记
---

# 从递归到迭代

## 一、为什么要改

递归依赖**系统调用栈**保存状态，深度过大时会栈溢出。迭代把状态放到**堆**上的显式数据结构里，由自己管理，因此：

- 避免栈溢出
- 有时能降低空间开销（不需要为每层保存完整栈帧）

一句话：**递归靠系统调用栈保存“当前状态”和“返回位置”，迭代就是自己管理这些状态。**

## 二、改造的核心

把递归的每次“调用/返回”，映射为对显式数据结构的“压入/弹出”。

需要想清楚两件事：

1. 递归的**状态**是什么（参数、局部变量、执行到哪一步）
2. 这些状态按什么**顺序**产生和消费

## 三、三种典型情况

### 1. 尾递归 → 直接改循环

递归调用是最后一步、没有后续计算，参数变循环变量，累积值变局部变量。

```python
# 递归
def fact(n, acc=1):
    if n <= 1:
        return acc
    return fact(n-1, acc*n)

# 迭代
def fact(n):
    acc = 1
    while n > 1:
        acc *= n
        n -= 1
    return acc
```

### 2. 单路递归 → 循环 + 变量

只递归一次、不回头，通常不需要栈。

```python
# 递归：反转链表
def reverse(head):
    if not head or not head.next:
        return head
    new_head = reverse(head.next)
    head.next.next = head
    head.next = None
    return new_head

# 迭代
def reverse(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev
```

### 3. 树形/多路递归 → 显式栈

```python
# 递归：前序遍历
def preorder(node):
    if not node:
        return
    visit(node)
    preorder(node.left)
    preorder(node.right)

# 迭代
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

注意栈是 LIFO，想先访问左子树，就要**后压左**。

若“返回后还要继续处理”（如后序遍历），栈里要存**状态标记**，相当于记录函数执行到哪一步：

```python
def postorder(root):
    if not root:
        return
    stack = [(root, False)]  # (节点, 是否已处理完子节点)
    while stack:
        node, visited = stack.pop()
        if visited:
            visit(node)
        else:
            stack.append((node, True))   # 回来时访问自己
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))
```

## 四、一个反直觉的例子：归并排序

递归版归并排序很符合分治直觉，但改成迭代时，必须反过来问：**递归实际做了什么？**

答案的关键在于：**递归在“切分”阶段什么也没做。** 它只是不断往下调用，真正的内存操作发生在“回来”的时候。

所以递归的执行顺序实际是：

1. 一直切到只剩单个元素（什么都不做）
2. 先归并最底层的两个元素
3. 再归并相邻的两个小块
4. 逐层向上，直到整个数组有序

也就是说，**递归版是“先切到底，再自底向上归并”**。迭代版可以直接顺着这个真实顺序写：

```python
def merge_sort(arr):
    n = len(arr)
    width = 1
    while width < n:
        for left in range(0, n, 2*width):
            mid = min(left + width, n)
            right = min(left + 2*width, n)
            merge(arr, left, mid, right)  # 归并 [left,mid) 和 [mid,right)
        width *= 2
    return arr
```

这里 `width` 表示当前每个有序块的长度，从 1 开始逐层翻倍，正好对应递归“从最底层往上归并”的顺序。**没有用到栈，因为递归的“切分”本来就不产生需要回退的状态。**

## 五、通用步骤

1. 找出递归的状态：参数、局部变量、执行进度
2. 选容器：
   - 单向推进 → 循环变量
   - 需要回退/分叉 → 栈
   - 按层处理 → 队列（BFS）
3. 把“调用”映射为压入，“返回”映射为弹出
4. 若返回后还要继续算，用状态标记记录执行到哪

## 六、什么时候不该改

- 递归深度小、逻辑清晰时，递归更易读
- 强行迭代后代码复杂、易错，反而降低可维护性
- 树形结构天然适合递归，改迭代可能得不偿失

## 总结

**递归改迭代 = 用显式数据结构（栈/队列/变量）手动保存“递归参数 + 执行进度”，把“函数调用/返回”变成“压入/弹出”。**

改造前先问一句：**这个递归真正在什么时候做了实际工作？** 想清楚执行顺序，很多递归（如归并排序）甚至不需要栈就能直接改写。
