# Athena House Platform

## Context
Morgan Stanley Code To Give 2025 \- Hackathon

### Problem Statement
\>\> To be completed.

### Project Description
\>\> To be completed.

## Table of Contents
1. Overview
2. Architecture
3. Features
4. Tech Stack
5. Prerequisites
6. Getting Started
7. Build \& Run
8. API Overview
9. Frontend Overview
10. Security
11. Directory Structure
12. Development Workflow
13. Team

## 1. Overview
Athena House is a platform to support donors, recurring subscriptions, quiz\-based awareness, gamified badges, donation events, timeline aggregation, and assistant interaction.

## 2. Architecture
\* Backend: Spring Boot (REST, JPA, Security, Mail, Scheduling)  
\* Frontend: Angular SPA (TypeScript, Routing, Services)  
\* Persistence: Relational DB (e.g. PostgreSQL) via JPA  
\* Containerization: Docker / Docker Compose  
\* Security: API Key filter (can evolve to JWT/OAuth2)  
\* Messaging: Spring events for email notifications

## 3. Features
\* Quiz engine (questions, scoring, badge assignment)  
\* Donation events (goal tracking, progress, notifications)  
\* One\-time donations and recurring subscriptions (milestones)  
\* Badge system (achievement and empathy progression)  
\* Online AI assistant for user support
\* Email notifications on event publication  
\* API key protected mutations

## 4. Tech Stack
\* Java 21+, Spring Boot  
\* Maven  
\* Angular 17+  
\* TypeScript  
\* Docker / Docker Compose  
\* MailHog (dev mail capture)  
\* MySQL
\* n8n

## 5. Prerequisites
\* Java 21 (JDK)  
\* Maven  
\* npm  
\* Docker / Docker Compose  
\* Git

## 6. Getting Started
Clone the repository.

## 7. Build \& Run
Primary development workflow with Docker Compose (rebuilds images, resets volumes):
```bash
  docker compose down -v && docker compose up --build
```
## 8. API Overview
\* Public GET endpoints for reading resources.  
\* Mutations (POST/PUT/DELETE) require `X-API-KEY`.  
\* Core paths:  
\- `/api/quiz/**`  
\- `/api/events/**`  
\- `/api/subscriptions/**`  
\- `/api/timeline/**`  
\- `/api/assistant/**`

## 9. Frontend Overview
\* Angular routes map to quiz, events, subscription, timeline, assistant components.  
\* Centralized `ApiService` handles HTTP calls and API key injection.

## 10. Security
\* Custom `ApiKeyAuthFilter` blocks mutations without valid key.  

## 11. Directory Structure
\* `backend/` Spring Boot source (`src/main/java/...`)  
\* `frontend/` Angular application  
\* `requests.http` Sample API calls


## 12. Deployment 
\* Containerized deployment via Docker Compose .  

## 13. TEAM 3 \- Authors
Grouped by role (all members from UQAM).

Main Frontend:  
\-\-\> Brice Aurel TSAGUEU KENNANG \- UQAM

Frontend:  
\-\-\> Julien Paquet \- UQAM  
\-\-\> Bernard Jr Valciné \- UQAM

Main Back End /Full Stack/ Problem Solving:  
\-\-\> George Fam \- UQAM

Back End:  
\-\-\> Hussein Assi \- UQAM

Dev Ops / Problem Solving:  
\-\-\> Richard Demers \- UQAM

Product Manager:  
\-\-\> Mattéo Destrie\-\-Terrighi \- UQAM

## Acknowledgments
\* Morgan Stanley Code To Give program.  
\* Open source frameworks used (Spring, Angular).

---
Maintain this file as the single source of project truth.