# Indoff-Promocional-Original
This repository contains all the files that were created for the Indoff Promocionales website, these are saved for recovery purposes and need to be protected and treated as a backup.

## Tech Stack
- **Frontend:** React + Vite + TypeScript + TailwindCSS  
- **API:** NestJS + Prisma  
- **Database:** PostgreSQL  
- **Node:** 20.x (pinned via `.nvmrc`)

## Repository Structure
.
├─ front/ # Web app (React + Vite)
└─ api/ # API service (NestJS + Prisma)


## Monorepo with npm Workspaces
Workspaces are declared in the root `package.json`:

- **Workspaces:** `["front", "api", "shared"]`
- **Root scripts** to orchestrate packages:
  - `npm run dev:front` → start frontend (Vite dev server)
  - `npm run dev:api` → start API (Nest in watch mode)
  - `npm run build:front` → build frontend
  - `npm run build:api` → build API

## Requirements
- **Node 20+** (recommended: use `nvm`)
- **npm 10+**

## First-Time Setup (Local)
```bash
# 1) Use Node 20
nvm use

# 2) Install root dependencies (enables workspaces)
npm i

# 3) Start frontend and API (in separate terminals)
npm run dev:front
npm run dev:api