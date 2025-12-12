📘 StudyFlow — Developer Learning Task Tracker

A full-stack CRUD application built with Next.js 16, TypeScript, Prisma & PostgreSQL.

🚀 Overview

StudyFlow is a full-stack, scalable, developer-focused learning tracker designed to help engineers plan and monitor their study tasks.
It showcases modern Next.js 16 capabilities including:

Server Components

Server Actions

API Routes

SSR + dynamic rendering

Prisma ORM with PostgreSQL

Type-safe forms & validations (Zod)

Clean, reusable UI using Tailwind

This project fulfills all key requirements for the House of EdTech Full-Stack Developer Assignment, demonstrating architectural thinking, code quality, security, and production-ready implementation.

✨ Features
🔧 Core App Features

Create, Read, Update, Delete (CRUD) study tasks

Filter tasks by status, difficulty, and tags

Clean, responsive UI built with Tailwind

Server-side rendering for fast initial load

API routes with validation + error handling

Prisma ORM + PostgreSQL integration

Modular, scalable folder architecture

🤖 Optional AI Feature

AI endpoint included: /api/ai/plan

Can integrate OpenAI / Groq / Gemini

Generates a customized study plan based on user goal

🧰 Tech Stack

Frontend

Next.js 16 (App Router)

React Server Components

TypeScript

Tailwind CSS

Backend

Next.js API Routes

Prisma ORM

PostgreSQL database

Validation & Utilities

Zod (input validation)

TypeScript strict mode

ESLint / Turbopack

📁 Project Structure
studyflow/
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── ai/
│   │   │   │   └── plan/route.ts
│   │   ├── tasks/
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── TaskList.tsx
│   │   └── TaskForm.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── validation.ts
│
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── tsconfig.json

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/studyflow.git
cd studyflow

2️⃣ Install Dependencies
npm install

3️⃣ Create PostgreSQL Database

In SQL Shell (psql):

CREATE DATABASE studyflow;

4️⃣ Configure Environment Variables

Create a .env file in project root:

DATABASE_URL="postgresql://postgres:YOURPASSWORD@localhost:5432/studyflow?schema=public"

5️⃣ Run Prisma Migrations
npx prisma migrate dev --name init

6️⃣ Start Development Server
npm run dev


Open the app at:

http://localhost:3000

🔐 Environment Variables
Key	Required	Description
DATABASE_URL	Yes	PostgreSQL connection string
OPENAI_API_KEY	No	Only for optional AI integration
📡 API Endpoints
Task Endpoints
Method	Route	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create new task
GET	/api/tasks/:id	Get single task
PATCH	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
AI Endpoint (Optional)
Method	Route	Description
POST	/api/ai/plan	Generate learning plan using AI
🧩 Real-World Considerations
✔ Scalability

Prisma manages query optimization

API routes structured for horizontal scaling

RSC minimizes client-side bundle

✔ Performance

Server-side rendering for dashboard

Memoized components

Minimal client JS

✔ Security

Zod validation on all inputs

Sanitized DB operations

Strict TypeScript

Environment variables for secrets

✔ Code Quality

Strong folder architecture

Clear separation of concerns

Reusable UI components

Consistent naming & typing