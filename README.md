<div align="center">

# 📝 lesson-note

**A web/mobile lesson management service designed to streamline scheduling, session tracking, and waitlist management.**

학생 및 관리자를 위한 레슨 스케줄링, 세션 트래킹, 대기열 관리 통합 플랫폼

<br/>

![Java](https://img.shields.io/badge/Java_21-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.5.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

---

## 📌 Features (주요 기능)

* **📅 Smart Scheduling**: 레슨 일정 등록, 변경 및 모바일/웹 동기화
* **⏱️ Session Tracking**: 학생별 레슨 횟수 차감 및 이력 관리
* **📋 Waitlist Management**: 대기자 명단 관리 및 순번 알림
* **🔐 Role-Based Auth**: Spring Security + JWT 기반의 학생/강사/관리자 권한 분리

---

## 🏗️ Architecture & Tech Stack

### Monorepo Structure

```text
lesson-note/
├── server-api/       # Spring Boot 3.5.3 (Java 21) - REST API Server
├── client-instructor/     # React + TypeScript (강사용 웹)
└── client-student/   # React + TypeScript (학생용 웹/모바일)
