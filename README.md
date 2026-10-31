<div align="center">

# 📝 LessOne (레스원)

**A 1:1 lesson management service for scheduling, session tracking, and waitlist management.**

학생과 강사를 위한 1:1 레슨 신청, 회차 관리, 대기열 관리 플랫폼

🔗 **https://lessone.kr**

<br/>

![Java](https://img.shields.io/badge/Java_21-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.5.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

---

## 📌 Features (주요 기능)

* **🎓 Lesson Creation**: 강사가 수업 이름, 지역(내 장소/방문), 가능 요일·시간, 수업 시간, 가격, 보강·정원 정책을 직접 설정
* **🔎 Lesson Search**: 학생이 수업을 검색하고 상세 정보를 확인 (계좌, 상세 주소는 신청 확정 후 공개)
* **📅 Smart Scheduling**: 가능한 시간대를 골라 신청하고 강사가 승인하는 방식
* **⏱️ Session Tracking**: 학생별 레슨 횟수 자동 차감 및 이력 관리
* **📋 Waitlist Management**: 정원이 차면 대기 신청, 순번 알림
* **🔐 JWT Auth**: Spring Security + JWT 기반 인증 (강사는 수업을 만든 회원)

---

## 🏗️ Architecture & Tech Stack

### Monorepo Structure

```text
lessone/
├── server-api/         # Spring Boot 3.5.3 (Java 21) - REST API Server
├── client-student/     # React + TypeScript (학생용 웹)
└── client-instructor/  # React + TypeScript (강사용 웹, 예정)
```
