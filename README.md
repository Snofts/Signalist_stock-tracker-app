# Signalist (Stock App)

Signalist is a full-stack stock companion built with **Next.js (App Router)**. It lets users:

- Sign up and sign in (email + password)
- Build a **personal watchlist**
- Search and browse stocks (via **Finnhub**)
- View stock details and watchlist status
- Receive email automation (welcome email + daily market news summaries)

> ⚠️ Note: This project fetches market data and sends informational emails. It is **not investment advice**.

---

## Features

### Authentication & User Accounts

- Email/password auth using **better-auth**
- Session-based access enforced at the `(root)` layout level
- User data persisted in MongoDB via the better-auth Mongo adapter

### Watchlist (Per User)

- Add/remove stocks from the authenticated user’s watchlist
- Load watchlist items sorted by `addedAt`
- Enrich watchlist entries with current stock details (quote/profile/metrics)

### Stock Search & Details

- Stock search using **Finnhub**
- When no query is provided, the UI falls back to a set of popular symbols
- Fetch and display:
  - Current price / percent change
  - Company profile information
  - Selected market metrics (ex: P/E)

### Automated Emails with Inngest

- **Welcome email** on user creation (`app/user.created`)
- **Daily news summary emails** on a cron schedule (`0 12 * * *`)
- News summarization is generated via an AI step (Gemini via Inngest)

### Alert Email Templates

The repository contains HTML email templates for multiple alert types (upper/lower price targets, volume alerts, etc.).

---

## Tech Stack

- **Next.js 16.1.6** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS / shadcn/ui**
- **MongoDB** with **mongoose**
- **better-auth** for authentication
- **inngest** for background functions + cron scheduling
- **nodemailer** for sending emails
- **Finnhub API** for stock data and news

---

## Prerequisites

- Node.js installed
- A MongoDB connection string
- Finnhub API key
- Nodemailer credentials (configured for Gmail in this repo)
- Inngest runtime configured for function execution and cron scheduling

---

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root.

Minimum required values (names inferred from code):

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# better-auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Finnhub
FINNHUB_API_KEY=your_finnhub_api_key
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_public_api_key

# Nodemailer (Gmail)
NODEMAILER_EMAIL=your_gmail_address
NODEMAILER_PASSWORD=your_gmail_app_password
```

> Security: do not commit `.env.local`.

### 3) Run the app

```bash
npm run dev
```

Open:

- http://localhost:3000

---

## Application Overview

### Protected Routes

`app/(root)/layout.tsx` checks the current session and redirects to `/sign-in` if the user is not authenticated.

### Inngest API Route

`app/api/inngest/route.ts` exposes the Inngest handlers:

- `GET`, `POST`, `PUT`

### Stock Data Layer

`lib/actions/finnhub.actions.ts` provides:

- `searchStocks(query?)` — returns search results or popular symbols
- `getStocksDetails(symbol)` — fetches quote/profile/metrics
- `getNews(symbols?)` — fetches company news per symbol with a general-news fallback

### Watchlist Data Layer

`lib/actions/watchlist.actions.ts` provides:

- `addToWatchlist(symbol, company)`
- `removeFromWatchlist(symbol)`
- `getUserWatchlist()`
- `getWatchlistWithData()`

---

## Email Automation

### Welcome Email

Event trigger:

- `app/user.created`

Flow:

1. AI creates a personalized HTML intro based on user profile.
2. `sendWelcomeEmail({ email, name, intro })` sends the email.

### Daily News Summary Email

Cron schedule:

- `0 12 * * *` (daily at 12:00)

Flow:

1. Load all users eligible for email delivery
2. For each user:
   - Load watchlist symbols
   - Fetch news (company news per symbol; fallback to general news)
   - Summarize selected articles via AI
3. Send an email using `sendNewsSummaryEmail(...)`

---

## Running Database Connectivity Test

```bash
npm run test:db
```

---

## Deployment

Deploy like a standard Next.js App Router app (Vercel, Render, etc.). Ensure:

- All required environment variables are set
- MongoDB is reachable from the deployment environment
- Inngest cron/functions are enabled in production

---

## Disclaimer

Signalist provides market data and informational summaries. This application does **not** provide investment advice. Always do your own research and consider professional guidance before making investment decisions.

---

## Resource Credit

Built with help from **jmastery** (JS Mastery).
