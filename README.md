# 🍽️ Binge

**Binge** is a full-stack mobile app that helps users discover restaurants they’ll love and see where their friends have eaten.  
If you struggle to decide where to eat or don’t want to try new restaurants alone, Binge lets you swipe on restaurants and even 
match with others who share similar tastes, creating a fun, social way to explore the best dining spots in Metro Vancouver.

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
- [ ] Initialize Node.js + TypeScript project  
- [ ] Configure ESLint + Prettier  
- [ ] Set up Express server and folder structure  
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


