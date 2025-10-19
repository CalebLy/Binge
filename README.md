# 🍽️ Binge

**Binge** is a full-stack mobile app that helps users discover restaurants they’ll love and see where their friends have eaten.  
If you struggle to decide where to eat or don’t want to try new restaurants alone, Binge lets you swipe on restaurants and even
match with others who share similar tastes, creating a fun, social way to explore the best dining spots in Metro Vancouver.

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Goals](#-project-goals)
- [Roadmap](#-roadmap)
  - [Milestone 1: Backend Foundation](#milestone-1-backend-foundation-week-12)
  - [Milestone 2: Authentication & User Management](#milestone-2-authentication--user-management-week-34)
  - [Milestone 3: Restaurant System & Recommendations](#milestone-3-restaurant-system--recommendations-week-5)
  - [Milestone 4: Frontend Prototype](#milestone-4-frontend-prototype-week-6)
  - [Milestone 5: AWS Deployment & CI/CD](#milestone-5-aws-deployment--cicd-week-78)
  - [Milestone 6: Social Features](#milestone-6-social-features-optional-week-9)
  - [Milestone 7: Performance and Scalability](#milestone-7-performance-and-scalability)
  - [Milestone 8: Backend Matching Logic](#milestone-8-backend-matching-logic)
  - [Milestone 9: Frontend Integration](#milestone-9-frontend-integration)
  - [Milestone 10: Notifications & Optional Real-Time Features](#milestone-10-notifications--optional-real-time-features)
- [Git Basics](#git-basics)

---

## 🧱 Tech Stack

**Frontend (Mobile)**

- React Native (TypeScript)
- Expo
- React Navigation
- React Query
- Async Storage

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL (via Prisma ORM)
- Redis (Caching Layer)
- JWT Authentication
- Docker
- AWS (Elastic Beanstalk / ECS)
- GitHub Actions (CI/CD)

---

## 🎯 Project Goals

This project is designed as both a learning experience and a showcase piece.  
Key skills and concepts explored:

- Building a backend with relational database (PostgreSQL)
- Designing relational schemas for users, restaurants, likes, and friends
- Implementing secure JWT authentication
- Integrating Redis caching to improve API performance and scalability
- Deploying a containerized backend to AWS
- Setting up CI/CD pipelines with GitHub Actions
- Integrating a React Native mobile client with custom APIs

---

## 🗓️ Roadmap

### **Milestone 1: Backend Foundation (Week 1–2)**

- [x] Initialize Node.js + TypeScript project
- [x] Configure ESLint + Prettier
- [x] Set up Express server and folder structure
- [ ] Configure PostgreSQL + Prisma ORM
- [ ] Add `/api/health` route
- [ ] Test endpoints locally with Postman or Thunder Client

**Learning Goals:** REST API basics, environment variables, relational database connection

---

### **Milestone 2: Authentication & User Management (Week 3–4)**

- [ ] Define `User` model in Prisma (name, email, passwordHash, preferences)
- [ ] Add routes:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- [ ] Hash passwords with bcrypt
- [ ] Issue JWTs for authentication
- [ ] Create `authMiddleware` for protected routes
- [ ] Add `GET /api/users/me`

**Learning Goals:** Secure authentication, JWTs, middleware usage

---

### **Milestone 3: Restaurant System & Recommendations (Week 5)**

- [ ] Define `Restaurant` model in Prisma (name, tags, location, rating)
- [ ] Define `Like` model to track user interactions
- [ ] Seed sample restaurant data into PostgreSQL
- [ ] Implement endpoints:
  - `GET /api/restaurants`
  - `POST /api/restaurants/like`
- [ ] Implement recommendation logic:
  - Filter by user preferences
  - Exclude restaurants already liked
  - Optionally include friends’ likes

**Learning Goals:** Relational modeling, joins, query filtering

---

### **Milestone 4: Frontend Prototype (Week 6)**

- [ ] Initialize React Native (Expo) project with TypeScript
- [ ] Create screens:
  - Login / Signup
  - Restaurant swiper
- [ ] Use **React Query** to fetch and cache backend data
- [ ] Store JWT in AsyncStorage for authentication
- [ ] Implement “like” functionality

**Learning Goals:** Mobile API integration, state management, React Query caching

---

### **Milestone 5: AWS Deployment & CI/CD (Week 7–8)**

- [ ] Containerize backend with Docker
- [ ] Push Docker image to AWS ECR
- [ ] Deploy backend via AWS Elastic Beanstalk or ECS
- [ ] Configure environment variables (PostgreSQL URI, JWT secret)
- [ ] Set up GitHub Actions workflow for automated builds, tests, and deployment

**Learning Goals:** Cloud deployment, Docker, CI/CD automation, AWS infrastructure

---

### **Milestone 6: Social Features (Optional, Week 9+)**

- [ ] Add `Friend` model in Prisma
- [ ] Implement routes:
  - `POST /api/friends/add`
  - `GET /api/friends`
  - `GET /api/friends/likes`
- [ ] Optionally implement real-time updates with Socket.IO
- [ ] Display friends’ liked restaurants in mobile app

**Learning Goals:** Complex relational logic, real-time updates, advanced queries

---

### **Milestone 7: Performance and Scalability**

- [ ] Implement caching layer (Redis) for repeated queries
- [ ] Optimize database queries and API response times
- [ ] Add monitoring tools (e.g., AWS CloudWatch or PM2)

**Learning Goals:** Caching integration, performance optimization, scalability handling

---

## 🗃️ Example Prisma Schema

```prisma
model User {
  id          Int       @id @default(autoincrement())
  name        String
  email       String    @unique
  passwordHash String
  preferences String[]
  likes       Like[]
  friends     Friend[]  @relation("UserFriends")
}

model Restaurant {
  id     Int     @id @default(autoincrement())
  name   String
  tags   String[]
  location String
  rating Float
  likes  Like[]
}

model Like {
  id           Int       @id @default(autoincrement())
  user         User      @relation(fields: [userId], references: [id])
  userId       Int
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  restaurantId Int
  likedAt      DateTime  @default(now())
}

model Friend {
  id        Int  @id @default(autoincrement())
  user      User @relation("UserFriends", fields: [userId], references: [id])
  userId    Int
  friend    User @relation("UserFriends", fields: [friendId], references: [id])
  friendId  Int
  @@unique([userId, friendId])
}
```

## 🗓️ Phase 2: User Matching Based on Restaurant Preferences

**Goal:** Allow users to match with others who have similar restaurant tastes.

---

### Milestone 8: Backend Matching Logic

- [ ] **Add `Match` model in Prisma / PostgreSQL:**

```prisma
      model Match {
        id        Int      @id @default(autoincrement())
        user1     User     @relation("UserMatches", fields: [user1Id], references: [id])
        user1Id   Int
        user2     User     @relation("UserMatches", fields: [user2Id], references: [id])
        user2Id   Int
        matchedAt DateTime @default(now())

        @@unique([user1Id, user2Id])
      }
```

- [ ] **Implement backend endpoints:**
  - [ ] `GET /api/matches` — list matches for a user
  - [ ] `POST /api/matches/compute` — compute new matches based on liked restaurants

- [ ] **Compute similarity:**
  - [ ] Compare users’ liked restaurants
  - [ ] Score overlap (e.g., ≥3 shared liked restaurants → match)
  - [ ] Store matches in `matches` table for efficiency

**Learning Goals:** Relational queries, similarity algorithms, social backend logic

---

### Milestone 9: Frontend Integration

- [ ] **Add Matches screen in React Native app**
- [ ] **Display matched users and shared restaurants**
- [ ] **Optional:** Swipe to accept/skip matches
- [ ] **Use React Query** to fetch matches and update UI

**Learning Goals:** Connect backend social logic with mobile UI, caching, and updates

---

### Milestone 10: Notifications & Optional Real-Time Features

- [ ] **Notify users when a new match is found**
- [ ] **Optional:** Implement WebSockets or Firebase Realtime DB for live updates
- [ ] **Allow users to see recent likes from matched users**

**Learning Goals:** Real-time updates, event-driven backend, push notifications

## Git basics:

1. Initial Project Setup

- git init
- git remote add origin <your-repo-url>
- git pull origin main # Sync local repo with remote main

2. Create and Switch to Dev Branch (optional but recommended)

- git checkout -b dev # Create & switch to dev branch
- git push origin dev # Push dev branch to remote

3. Create a Feature Branch

- git checkout dev # Make sure you're on dev
- git checkout -b feature/<feature-name> # Create feature branch

4. Work on the Feature
   After making changes:

- git add .
- git commit -m "Add <feature-name> feature"
- git push origin feature/<feature-name>

5. Merge Feature into Dev
   Once the feature is ready:

- git checkout dev
- git pull origin dev
- git merge feature/<feature-name>
- git push origin dev

6. Merge Dev into Main (when stable)

- git checkout main
- git pull origin main
- git merge dev
- git push origin main

7. Delete Feature Branch (Optional Cleanup)

- git branch -d feature/<feature-name> # Delete locally
- git push origin --delete feature/<feature-name> # Delete remotely

8. (EXTRA) Undoing commits

- git reset --soft HEAD~1 # HEAD1 moves back one commit. soft undoes the commit but keeps all changes staged (git add xyz)
- git reset --mixed HEAD~1 # Does the same as soft but unstages the changes
- git reset --hard HEAD~1 # Discards the commit and the changes.
  After, you have to do git push --force.
  Note, HEAD1 is just a way to move the pointer from the HEAD back 1. You can also do HEAD2 if u want to reset 2 commits for example.
  Or you can even do git log and find the specific commit hash to move your pointer to
