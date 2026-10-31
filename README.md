<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="client-web/public/logo-horizontal-dark.svg">
  <img src="client-web/public/logo-horizontal.svg" alt="LessOne" height="72">
</picture>

<br/><br/>

**1:1 레슨을 만들고, 찾고, 신청하는 플랫폼**

[lessone.kr](https://lessone.kr)

<br/>

![Java](https://img.shields.io/badge/Java_21-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.5.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

<br/>

## 소개

LessOne(레스원)은 강사가 1:1 레슨을 직접 개설하고, 학생이 원하는 레슨을 찾아 신청하는 서비스입니다.

## 기능

| 기능 | 설명 | 상태 |
|---|---|---|
| 레슨 개설 | 장소, 가능 시간, 가격, 정원과 보충 정책 설정 | 완료 |
| 레슨 상세 | 계좌와 상세 주소는 신청 확정 후 공개 | 완료 |
| 회원 인증 | Spring Security + JWT | 완료 |
| 레슨 검색 | 키워드 검색 | 예정 |
| 수강 신청 | 시간대 선택 후 강사 승인 | 예정 |
| 회차 관리 | 레슨 횟수 자동 차감과 이력 | 예정 |
| 대기열 | 정원 초과 시 대기 신청 | 예정 |

## 기술 스택

| 영역 | 기술 |
|---|---|
| Backend | Java 21, Spring Boot 3.5.3, Spring Security, JWT, MyBatis |
| Database | H2 (MySQL 이전 예정) |
| Frontend | React, TypeScript, Vite |
| Infra | AWS EC2, Nginx, Let's Encrypt, GitHub Actions |

## 구조

```text
lessone/
├── server-api/    # REST API 서버
├── client-web/    # 학생용 웹 (학생 + 강사)
```

## 배포

`main`에 푸시하면 바뀐 폴더에 맞는 GitHub Actions가 실행되어 EC2에 배포됩니다.
