# PulseData Client

PulseData is an AI-powered Business Intelligence platform designed to help users upload datasets, analyze them using advanced AI, and interact with their data through an intelligent chat assistant.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & shadcn/ui
- **Authentication**: Better Auth
- **State Management**: TanStack Query (React Query)
- **Data Visualization**: Recharts
- **Database (via API routes)**: MongoDB / Mongoose

## Features
- **AI Data Analysis**: Upload CSV/JSON/Excel datasets and receive AI-generated summaries and top trends.
- **Interactive Data Visualization**: View insightful charts generated from your dataset analysis.
- **AI Chat Assistant**: A floating AI chatbot that can answer questions about your business data contextually.
- **Manage Items**: Securely manage and view your previously analyzed datasets.

## Getting Started

1. Clone the repository and navigate to `pulsedata-client`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local` or `.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This client application is optimized for deployment on Vercel. Ensure you set the environment variables in the Vercel dashboard.
