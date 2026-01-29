# Bio-Feedback Game Bridge (v3.0)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20WebSocket-green)
![Frontend](https://img.shields.io/badge/Frontend-MediaPipe%20%7C%20Vanilla%20JS-orange)
![Algorithm](https://img.shields.io/badge/Algorithm-One%20Euro%20Filter%20%7C%20FACS-red)

**[English](#-english-introduction) | [中文说明](#-中文介绍)**

![Demo Screenshot](./demo.png)

---

<div id="english-introduction"></div>

## 📖 Introduction

**Bio-Feedback Game Bridge** is a real-time **Affective Computing Architecture** designed to bridge Web-based computer vision with game engines (Godot/Unity/Unreal). 

This project decouples heavy AI inference from the game loop by using the browser as an edge computing sensor. It captures granular facial micro-expressions using **MediaPipe**, stabilizes signals via a custom **One Euro Filter**, maps them to **FACS (Facial Action Coding System)**, and broadcasts emotional vectors through a low-latency **WebSocket Relay Server**.

> **Core Value:** Enables "Emotion-driven Gameplay" mechanics where game environments react dynamically to the player's real-world facial expressions (Joy, Anger, Fear, Sadness).

## 🏗 Architecture

```mermaid
graph LR
    A[Web Client / Edge] -->|Face Mesh & FACS| B(Signal Processing)
    B -->|One Euro Filter| C{JSON Payload}
    C -->|WebSocket Stream| D[Node.js Relay Server]
    D -->|Broadcast| E[Godot / Unity Client]
    D -->|Broadcast| F[Data Dashboard]

Sensing Layer (Frontend): Extracts 478 face landmarks & 52 blendshapes @ 60fps using MediaPipe WebAssembly.

Processing Layer (Algorithm): - One Euro Filter: Minimizes jitter while maintaining high responsiveness for micro-movements.

Dynamics Detection: Calculates velocity of emotion vectors to detect transient micro-expressions (<200ms).

FACS Mapping: Semantic mapping of AUs (e.g., True Joy = AU6 Cheek Squint + AU12 Lip Corner Puller).

Transport Layer (Backend): Built on raw ws protocol (RFC 6455) to ensure cross-platform compatibility with C++, Python, and GDScript.

🚀 Technical Highlights
Custom Signal Processing: Implemented the One Euro Filter algorithm manually (instead of using libraries) to solve the "jitter vs. lag" trade-off in real-time tracking.

Psychological Modeling: Logic derived from Paul Ekman’s research. Distinguishes "Duchenne Smile" (True Joy) from social smiles by tracking Orbicularis Oculi muscle activation (AU6).

Architecture Optimization: Migrated from Socket.io to Native WebSockets to support heterogeneous clients (Game Engines) that do not support Socket.io wrappers.

🛠️ Quick Start
Prerequisites
Node.js (v14+)

Webcam

1. Start the Backend Relay
Bash
cd emotion-server
npm install
node server.js
# Server starts at ws://localhost:3000
2. Start the Sensing Client
Simply open index.html in a modern browser (Chrome/Edge). Note: Ensure the backend is running first to establish the socket connection.

<div id="中文介绍"></div>

📖 中文介绍
Bio-Feedback Game Bridge 是一个实时的情感计算架构，旨在打通 Web 端计算机视觉模型与主流游戏引擎（Godot/Unity）之间的通信壁垒。

该项目将繁重的 AI 推理任务从游戏主循环中解耦，利用浏览器作为边缘计算传感器。系统通过 MediaPipe 捕捉高精度的面部微表情，使用自定义的 One Euro Filter（一欧元滤波器） 进行信号平滑，基于 FACS（面部动作编码系统） 进行语义映射，最终通过低延迟的 WebSocket 中继服务器 广播情绪向量。

核心价值： 实现了“情绪驱动游戏（Emotion-driven Gameplay）”的原型，使游戏环境能够根据玩家的真实面部情绪（开心、愤怒、恐惧、悲伤）做出动态反应。

🏗 系统架构
感知层 (前端): 基于 MediaPipe WebAssembly 技术，以 60fps 的帧率实时提取 478 个面部特征点和 52 个 Blendshapes 系数。

处理层 (算法):

一欧元滤波 (One Euro Filter): 手动实现该滤波算法，在消除原始信号抖动的同时，保持对快速动作的低延迟响应。

动力学检测: 计算情绪向量的一阶导数（速度），用于捕捉持续时间小于 200ms 的瞬态微表情。

FACS 映射: 基于心理学定义的 AU（动作单元）组合逻辑，例如：真笑 (Joy) = AU6 (眼轮匝肌) + AU12 (颧大肌)。

传输层 (后端): 基于原生 ws 协议 (RFC 6455) 构建，确保能与 C++、Python 和 GDScript (Godot) 等异构客户端无缝通信。

🚀 技术亮点 (Key Features)
信号处理算法: 深入底层实现了 One Euro Filter，而非直接调用第三方库，有效解决了实时追踪中“抖动”与“延迟”不可兼得的数学难题。

计算心理学应用: 引入保罗·艾克曼（Paul Ekman）的研究成果，通过检测眼部肌肉（AU6）的激活程度，在代码层面实现了对“杜兴式微笑（真笑）”与“假笑”的区分。

协议兼容性优化: 完成了从 Socket.io 到 原生 WebSocket 的架构迁移，解决了游戏引擎客户端无法解析 Socket.io 封装包的问题，实现了真正的跨平台互联。

🛠️ 快速开始
环境要求
Node.js (v14 或更高版本)

摄像头设备

1. 启动后端中继
Bash
cd emotion-server
npm install
node server.js
# 服务器将启动在 ws://localhost:3000
2. 启动感知客户端
直接在现代浏览器（Chrome/Edge）中打开 index.html 文件。 注意：请确保后端服务器已启动，否则无法建立 WebSocket 连接。

📂 目录结构
/emotion-server: Node.js WebSocket 广播中心（事件驱动架构）。

index.html: 包含 AI 推理核心、Canvas 渲染引擎以及 FACS 映射逻辑的前端入口。

Created by Qiheng Yan
