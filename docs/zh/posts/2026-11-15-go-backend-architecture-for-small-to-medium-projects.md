---
layout: doc
title: 中小型Go后端设计
date: 2026-11-15
tags:
  - Golang
  - Backend
---



# 中小型Go后端设计

学习Go后端开发也有数月有余，我对Go后端的架构设计倍感兴趣。这是一种与Django等较重的框架开发完全不同的体感：**Go的后端给予开发者极高的自由度，像搭积木一样构建后端。**

但这也让Go的后端更难以维护，需要使用较好的架构设计保证其一致性。同时通过架构设计可以将接口、服务逻辑、数据存储分离开来，这具有易于测试、容易替换的优点。

![go-backend-architecture](/images/go-backend-architecture.png)