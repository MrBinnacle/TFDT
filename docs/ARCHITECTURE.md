# Proposed Architecture Overhaul

This document outlines a refactor plan for the Thinking Framework Decision Tree (TFDT) app. The goal is a scalable, maintainable system that supports new features like GPT summaries and framework exports.

## 1. Tech Stack Choices

- **Next.js** for a unified frontend and backend platform.
- **tRPC** to type‑safe API calls between the browser and server.
- **Supabase (Postgres)** to store frameworks and decision tree data.
- **Tailwind CSS** for streamlined styling.
- **Vercel Functions** to integrate GPT summarization and export tasks.

## 2. Key Improvements

| Change | Rationale |
|-------|-----------|
|Switch from separate Express + React apps to Next.js | Simplifies deployment and enables server‑side rendering.|
|Store frameworks in Supabase | Managed Postgres provides structured storage and easy queries.|
|Adopt tRPC | Eliminates manual REST endpoints and keeps types consistent across client/server.|
|Use Tailwind CSS | Speeds up UI development with utility classes.|
|Move heavy tasks to serverless functions | Scales GPT integration and document export without managing servers.|

## 3. Phased Migration Plan

1. **Foundation**
   - Scaffold a new Next.js project inside `TFDT`.
   - Implement tRPC routes for decision tree queries.
   - Add Tailwind for styling.

2. **Data Migration**
   - Create Supabase tables for frameworks and decision paths.
   - Build migration scripts to load existing JSON (if any) into Supabase.
   - Replace local JSON access with Supabase queries via tRPC.

3. **Feature Expansion**
   - Add GPT summarization using a Vercel function `api/gptSummary`.
   - Implement export endpoints (`api/export/markdown`, `api/export/pdf`).
   - Integrate dynamic visualizers based on framework metadata.

4. **Deployment**
   - Configure automatic deploys to Vercel with environment variables for Supabase and OpenAI.
   - Set up preview deployments for each branch.

This roadmap modernizes the project while keeping each phase manageable.
