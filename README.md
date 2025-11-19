# Donate With Athena
A full-stack donation, awareness, and engagement platform built for **Morgan Stanley Code To Give 2025**.  
Designed to empower **The Shield of Athena** through digital outreach, donor engagement, and community education.

https://donatewithathena.com/


## Context
This project was built as part of the **Morgan Stanley Code To Give 2025 Hackathon**, representing Team 3 from UQAM.

## Overview
**Donate With Athena** centralizes donor support, recurring subscriptions, awareness quizzes, gamified badge progression, donation events, timeline aggregation, and AI-powered assistance.

The platform strengthens community outreach and enhances donor engagement through interactive, educational, and automated features.

### Why This Platform?
We developed a modern, human-centered platform that helps Shield of Athena reach new audiences, retain existing donors, and communicate real impact with clarity and empathy.

## Architecture
- **Backend**: Spring Boot (REST, JPA, Security, Mail, Scheduling)
- **Frontend**: Angular SPA (TypeScript, Routing, Services)  
- **Persistence**: MySQL(JPA/Hibernate)
- **Containerization**: Docker / Docker Compose  
- **Security**: API-key protected mutations (future-ready for JWT/OAuth2)  
- **Messaging**: Spring Application Events for email notifications
- **Automation**: N8N WorkFlows

**High-level flow:**
- Client (Angular) → REST API (Spring Boot) → DB (MySQL) → Emails / Workflows (Events + MailHog/n8n)

## Features
- **Quiz Engine**: Questions, scoring, results, badge assignment, and awareness-driven content.
- **Family Journey (Impact Visualization)**: Shows how donations create real change through an anonymized family’s path from crisis to independence: a transparent, narrative-driven view of impact.
- **Donation Events**: Goal tracking, live progress, event publishing, and automated email notifications.
- **Donations & Subscriptions**: One-time contributions and recurring monthly donations with milestone and reward logic.
- **Badge System**: Achievement-based empathy progression tied to quiz participation and donation activity.
- **Donation Leaderboard**: Highlights top community contributors, celebrating donor impact through friendly competition and recognition.
- **AI Assistant**: Context-aware helper (Chatbot and Voicebot accessible by phone) for donors and community members.
- **Email Notifications**: Event publishing alerts, donor updates, and automated campaign messaging.
- **Admin Dashboard**: Monthly revenue overview, Donor count and donor-type distribution, Current month revenue vs previous month, One-time vs recurring vs corporate donor breakdown, Event creation tools, Automated social media publishing for new events, Insights for strategic decisions

## Tech Stack
<p align="center">
  <!-- Backend -->
  <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/springboot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=insomnia&logoColor=white"/>

  <!-- Frontend -->
  <img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

  <!-- Database -->
  <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"/>

  <!-- DevOps -->
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/docker--compose-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white"/>
  <img src="https://img.shields.io/badge/n8n-5b5b5b?style=for-the-badge&logo=n8n&logoColor=white"/>

  <!-- Cloud -->
  <img src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white"/>
</p>

## Dependencies
Ensure you have the following installed:
- **Java 21** (JDK)
- **Maven 3.8+**
- **Node.js 18+** and npm
- **Docker** and **Docker Compose**
- **Git**

## Quick Start
1. Clone and start: `./start.sh`
2. Access frontend: http://localhost:8080
3. Access API docs: http://localhost:8080/swagger-ui.html

## Build & Run

### Recommended: Start Scripts (Windows & Unix)
For the fastest and most reliable development setup, use the provided start scripts.  
They automatically build containers, start the database, and launch the application.

#### Usage (Unix/macOS/Linux & Windows PowerShell)
```bash
# Normal start (detached)
./start.sh
.\start.ps1

# Remove containers & volumes
./start.sh --clean
.\start.ps1 -clean

# Verbose/logging mode (foreground)
./start.sh -v
./start.sh --verbose
.\start.ps1 -v
.\start.ps1 -verbose
```

### Docker-based development (manual)
Rebuild everything, reset volumes, and start all services:
```bash
docker compose down -v && docker compose up --build
```
## API Documentation
API Documentation can be found at www.donatewithathena.com/swagger
## TEAM 3 \- Authors (UQAM)

Main Frontend:  
\-\-\> Brice Aurel TSAGUEU KENNANG

Frontend:  
\-\-\> Julien Paquet \
\-\-\> Bernard Jr Valciné

Main Backend / Full Stack / Problem Solving:  
\-\-\> George Fam

Backend:  
\-\-\> Hussein Assi

Dev Ops / Problem Solving:  
\-\-\> Richard Demers

Product Manager:  
\-\-\> Mattéo Destriez\-\-Terrighi

## Morgan Stanley Mentors
- Bhushan Suryavanshi, Vice President, Gen AI Products
- Cloe Chandonnet, Technology Analyst

## Acknowledgments
- Morgan Stanley Code To Give program.  
- Open source frameworks used (Spring, Angular).
