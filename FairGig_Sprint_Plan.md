# FairGig — A Three-Person Sprint Plan, Explained

> **Project:** FairGig — Gig Worker Income & Rights Platform
> **Team size:** Three people working in parallel
> **Duration:** Six sprints over roughly two weeks
> **Approach:** Contract-first development with API mocking on the frontend

This document is your day-by-day playbook. It assumes the FairGig blueprint has already been agreed (the architecture, the database design, and the service boundaries are settled). What we are doing here is splitting the work across three engineers in a way that lets each person stay productive without waiting on the others.

Read your own lane first, then skim the other two so you know what your teammates are doing. At the end of every sprint there is a short synchronisation ceremony where the three of you sit together for fifteen to thirty minutes, swap progress, and unblock anything that needs unblocking.

---

## The Three Roles

We have three engineers, each with a clear lane.

**Person A — the Frontend Engineer.** You own everything in `apps/web`. Your stack is React with Vite and TypeScript, TanStack React Query for server state, Framer Motion for component-level animations, GSAP for complex page transitions and the landing page hero, Three.js for one or two showcase 3D scenes (probably the landing hero), shadcn/ui components built on Radix primitives, and Tailwind CSS for styling. You will integrate against APIs that, in early sprints, do not yet exist — so you will use Mock Service Worker (MSW) to stub them, then swap to the real endpoints as they come online.

**Person B — the Express.js Backend Engineer.** You own four services: `auth-service`, `earnings-service`, `certificate-service`, and `grievance-service`. Your stack is Node.js with Express, Prisma as the ORM against PostgreSQL, Zod for validation, BullMQ with Redis for the CSV import job, Handlebars for the certificate templating, and `swagger-jsdoc` plus `swagger-ui-express` for documentation. Your services power the bulk of the user-facing flows.

**Person C — the FastAPI Backend Engineer.** You own two services: `anomaly-service` and `analytics-service`. Your stack is Python with FastAPI, Pydantic for schemas, NumPy plus pandas for data work, SciPy for the statistics in the anomaly service, and SQLAlchemy with asyncpg for the analytics service. FastAPI gives you Swagger UI for free at the `/docs` endpoint, which is wonderful because the brief explicitly says judges will call your anomaly endpoint directly, and they will use that Swagger UI to discover the schema.

The three of you share PostgreSQL (one instance, schema-per-service), share a JWT secret (so any service can verify a token issued by the auth service), and share a Postman collection that documents every cross-service contract. Person B owns the JWT secret rotation and the Postman collection because those are the responsibilities most tightly coupled to the auth service.

---

## The Contract-First Philosophy

The single most important practice in this plan is that we agree on API contracts before we write the code that implements them. On day one, all three of you will sit together and write down the exact request and response shape of every endpoint, then commit those contracts as OpenAPI YAML files in `packages/api-contracts/`. After that:

Person A can build any frontend page by mocking the contract response with MSW. The page works end to end against the mock, so the UI development never blocks on the backend.

Person B and Person C can each build their services to satisfy the contract independently. They never need to coordinate beyond the contract.

When an endpoint goes live, Person A removes the MSW handler for that endpoint and the frontend starts hitting the real service. The integration is a single line change.

This approach is what allows three people to truly work in parallel rather than waiting in line for each other.

---

## How Each Sprint Is Structured

Every sprint section below has the same shape. First a short paragraph explaining the goal of the sprint and the strategic reason for the work. Then three sub-sections, one per person, each containing a clear list of tasks, the APIs or pages or functions to build, and acceptance criteria you can tick off at the end of the sprint. Then a synchronisation note describing what each person should hand off to the others, and a demo script for the end-of-sprint review.

Acceptance criteria are written as testable statements. If the team cannot agree that a criterion has been met, the sprint is not done. Be strict about this — letting half-done work bleed into the next sprint is the most common cause of project failure.

---

# Sprint 0 — Setup and Contracts (Day 1)

The whole purpose of Sprint 0 is to make Sprints 1 through 6 possible. By the end of today, the three of you should be able to walk away in three different directions and meet again at the end of Sprint 1 having each made meaningful progress without ever needing to talk to each other.

The morning is spent on infrastructure: setting up the monorepo, the workspaces, the database, the shared environment template, and the deployment platforms (Vercel, Render, Hugging Face Spaces). The afternoon is spent on the contracts: a meeting where the three of you go through every endpoint described in the blueprint and write down the request and response shapes in OpenAPI YAML.

## Person A — Frontend (Sprint 0)

Your job today is to scaffold the React application and to set up the mocking infrastructure that will keep you unblocked for the next two weeks.

You start by initialising the React app under `apps/web` using Vite with the React-TypeScript template. You install the libraries you will need throughout the project: `react-router-dom` v6 for routing, `@tanstack/react-query` for server state, `axios` for the HTTP client, `zustand` for global UI and auth state, `react-hook-form` and `@hookform/resolvers/zod` plus `zod` for forms, `tailwindcss` and `tailwindcss-animate` for styling, `framer-motion` and `gsap` for animations, `three` plus `@react-three/fiber` and `@react-three/drei` for the 3D landing scene, `recharts` for charts, `lucide-react` for icons, `i18next` and `react-i18next` for translation, `papaparse` for client-side CSV preview, and `sonner` for toasts. For testing you install `vitest`, `@testing-library/react`, `@playwright/test`, and most importantly `msw` (Mock Service Worker) which is the library that will let you mock backend APIs.

After the libraries are in place, you set up the foundational files: a single `src/lib/apiClient.ts` that creates an axios instance with the base URL coming from environment variables and with two interceptors (one to attach the JWT, one to handle 401 by refreshing or logging out), a `src/lib/queryClient.ts` that configures TanStack Query with sensible defaults (one minute stale time, retries on network errors only), and a `src/mocks/` directory with the MSW server setup. Inside `src/mocks/handlers/` you create one handler file per service (`auth.ts`, `earnings.ts`, `certificate.ts`, `grievance.ts`, `anomaly.ts`, `analytics.ts`) and you stub every endpoint with realistic-looking mock data based on the contracts you agreed in the afternoon meeting.

You set up the design system: bring in shadcn/ui by running `npx shadcn-ui@latest init` and configure it for your monorepo, then install the primitives you will need most often (`button`, `input`, `select`, `card`, `dialog`, `dropdown-menu`, `tabs`, `table`, `toast`, `skeleton`, `tooltip`, `badge`). Configure Tailwind with your design tokens (the FairGig colour palette, typography scale, and spacing) in `tailwind.config.ts`. Add the Tailwind animate plugin so Framer Motion components have CSS classes to lean on.

The acceptance criteria for your Sprint 0 are that running `pnpm dev` from `apps/web` boots the application on `localhost:5173`, that the application shows a placeholder landing page styled with Tailwind, that MSW intercepts a fake call to `/auth/v1/me` and returns a mock user, that you can import a shadcn Button component and it renders correctly, and that the GSAP and Three.js libraries are installed and a single test scene renders without errors. You should also have committed the design tokens to `tailwind.config.ts` and a one-page README in `apps/web` that explains how to start the application.

## Person B — Express.js Backend (Sprint 0)

Your job today is to scaffold the four Node services and to provision the shared PostgreSQL database that all of them will use.

Start by initialising the four service folders under `apps/`. Each service gets the same skeleton: an `index.ts` that boots the Express app, an `app.ts` that builds the Express app (separated from `index.ts` so the app can be tested without binding to a port), a `routes/` directory, a `controllers/` directory, a `services/` directory, a `repositories/` directory, a `validators/` directory with Zod schemas, a `middleware/` directory with the standard middleware (request ID, logger using Pino, CORS, Helmet, rate limit, JWT auth, RBAC, error handler), and a `prisma/` directory with the Prisma schema for that service. Each service gets its own `package.json` with a `pnpm dev` script that uses `tsx watch` for hot reload.

You install the production dependencies that every service needs: `express`, `cors`, `helmet`, `express-rate-limit`, `pino` and `pino-http`, `zod`, `@prisma/client`, `dotenv`, `uuid`, `jsonwebtoken` (the auth service uses it to sign, others use it to verify), and `swagger-jsdoc` plus `swagger-ui-express` for documentation. The auth service additionally gets `bcrypt` and `cookie-parser`. The earnings service additionally gets `multer` for multipart uploads, `csv-parse` for the CSV import, `bullmq` and `ioredis` for the background job queue, and the Supabase client `@supabase/supabase-js` for storage. The certificate service gets `handlebars`. For development you install `tsx`, `typescript`, `@types/*` for everything, `vitest`, `supertest`, `eslint`, and `prettier`.

You provision PostgreSQL on Render or Supabase (Supabase is recommended because it gives you object storage for the screenshots in the same dashboard). You create the four schemas: `auth`, `earnings`, `certificate`, and `grievance`, plus the shared `audit` schema. You connect each service to its own schema by setting the Prisma `datasource` and using the `multiSchema` preview feature.

You set up the Swagger UI integration. In each service, you write a `src/swagger.ts` file that uses `swagger-jsdoc` to scan your route files for JSDoc-style comments and produces an OpenAPI document, then mount `swagger-ui-express` at `/docs` so visiting `http://localhost:3001/docs` (or whatever port that service uses) shows interactive documentation. The four services should run on different local ports — auth on 3001, earnings on 3002, certificate on 3003, grievance on 3004 — so they don't collide.

You provision Redis on Upstash (free tier) for BullMQ to use later. You also create the `infra/postman/` directory with an empty Postman collection that you will populate as endpoints come online.

Your acceptance criteria for Sprint 0 are that all four services boot independently with `pnpm dev` from their respective folders, that each service exposes a working `/health` endpoint that returns `{status: "ok"}`, that each service exposes a working `/docs` Swagger UI, that the PostgreSQL connection works (you can run `pnpm prisma migrate dev` against an empty schema and get a successful "no migrations to apply" message), and that the JWT signing key is in a shared environment variable readable by all services.

## Person C — FastAPI Backend (Sprint 0)

Your job today is to scaffold the two Python services and prepare the statistical and analytical foundations.

Start by initialising the two service folders under `apps/`. Each service follows the same Python project layout: an `app/` folder with `main.py` that creates the FastAPI instance, an `app/config.py` that uses `pydantic-settings` to load environment variables, an `app/api/routes/` folder with one file per route group, an `app/schemas/` folder with Pydantic request and response models, an `app/services/` folder with business logic, and an `app/middleware/` folder for cross-cutting concerns. The analytics service additionally gets an `app/repositories/` folder for SQLAlchemy queries and an `app/queries/` folder for parameterised SQL aggregations.

You install dependencies in a `requirements.txt` per service. Both services need `fastapi`, `uvicorn[standard]`, `pydantic`, `pydantic-settings`, `python-jose[cryptography]` (for JWT verification using the same shared secret as the Node services), `httpx` (for outbound calls), `structlog` (for structured logging), and `pytest` plus `pytest-asyncio` for testing. The anomaly service additionally needs `numpy`, `pandas`, and `scipy` for its statistical work. The analytics service additionally needs `sqlalchemy[asyncio]`, `asyncpg`, and `pandas`.

The wonderful thing about FastAPI is that Swagger UI comes for free. As soon as you write a Pydantic model and a route that uses it, FastAPI generates the OpenAPI schema and serves it at `/docs`. You don't need to add anything. You should still write a clear top-level description in your `FastAPI()` constructor so the docs look professional — something like `FastAPI(title="FairGig Anomaly Service", description="Statistical anomaly detection for gig worker earnings", version="1.0.0")`.

You set up the shared JWT verification middleware. Both services need a dependency function that reads the `Authorization` header, verifies the JWT with the shared HS256 secret, and returns the user ID and role. This is exactly the same logic as on the Node side — the secret is shared via environment variable. You write this once in `app/api/deps.py` and reuse it as a FastAPI dependency on every protected route.

For the anomaly service specifically, you write a stub `POST /detect` endpoint that takes a Pydantic model with a worker ID and an array of shifts, and returns an empty anomalies array. The implementation comes in Sprint 1, but having the route stub in place means the Swagger UI shows the endpoint shape, and Person A can already mock against it.

For the analytics service, you set up the SQLAlchemy async engine pointing at the shared PostgreSQL instance with a read-only role called `analytics_reader` (Person B will create this role for you when they create the schemas). You write one stub endpoint per the analytics contract — they all return empty data for now.

The two services should run on local ports 8001 (anomaly) and 8002 (analytics), again to avoid collisions.

Your acceptance criteria for Sprint 0 are that both services boot with `uvicorn app.main:app --reload --port 8001` (and 8002 respectively), that visiting `http://localhost:8001/docs` shows the Swagger UI with a stub `/detect` endpoint, that visiting `http://localhost:8002/docs` shows stub analytics endpoints, that the JWT verification dependency function works (you can write a quick pytest that creates a fake token and asserts it verifies), and that `pytest` runs (with no tests yet) without errors.

## End-of-Sprint-0 Synchronisation

This is the most important meeting of the entire project. The three of you sit together for ninety minutes and walk through every endpoint in the blueprint, agreeing on the exact request shape, the exact response shape, the status codes, and the auth requirements. You write each one down as an OpenAPI YAML file in `packages/api-contracts/`. By the end of the meeting you have six YAML files: `auth.openapi.yaml`, `earnings.openapi.yaml`, `certificate.openapi.yaml`, `grievance.openapi.yaml`, `anomaly.openapi.yaml`, and `analytics.openapi.yaml`. These contracts are now sacred — changing one requires a three-person discussion.

Person A immediately uses these YAMLs to update their MSW handlers so the mocks match the real contracts. Person B uses them to write the JSDoc comments that drive Swagger generation in each Express service. Person C uses them to refine the Pydantic models in each FastAPI service.

The demo at the end of Sprint 0 is short: each of you boots your work and shows a `/docs` page or a running app. There is nothing functional yet — that is fine. The point is that the foundations are in place.

---

# Sprint 1 — Foundation (Days 2 and 3)

Sprint 1 is about getting the first end-to-end slice of the application working: a user can register, log in, see a dashboard shell, and the FastAPI anomaly service can be called by the judges (or by anyone) with a crafted payload and return a real result.

## Person A — Frontend (Sprint 1)

Your goal is to build the application shell, the authentication pages, and a stubbed dashboard for each of the four roles. By the end of Sprint 1, anyone can register, log in (against MSW mocks), and land on a role-appropriate dashboard skeleton.

Start with the routing structure. Create `src/router/index.tsx` that uses `createBrowserRouter` to define the route tree. The tree has three branches: a public branch wrapped in `PublicLayout` that contains `/`, `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot`, and `/auth/reset/:token`; an authed branch wrapped in `AppLayout` and gated by `<ProtectedRoute>` that contains the role-routed pages; and a print branch wrapped in `PrintLayout` that contains `/certificate/public/:signedId`. Inside the authed branch, you wrap each role's pages in `<RoleRoute roles={['worker']}>` and so on. Both `ProtectedRoute` and `RoleRoute` live in `src/router/`. ProtectedRoute checks for the access token in the Zustand auth store; if missing, it tries the refresh endpoint once; on failure, it redirects to `/auth/sign-in`. RoleRoute additionally checks the user's role against the allowed list and shows a 403 page if they don't match.

Build the three layouts. `PublicLayout` is minimal — just a header with the FairGig logo and a sign-in button, and a footer with legal links. `AppLayout` is the main authenticated layout with a top bar (logo, language toggle, notifications bell, profile dropdown) and a sidebar that shows different items per role. The sidebar collapses on mobile into a hamburger sheet. `PrintLayout` is a special-purpose layout that strips all chrome and applies the print stylesheet — you will use it later for the public certificate view.

Build the landing page at `/`. This is one of the few places where you will use Three.js and GSAP. The hero section has a Three.js scene — perhaps a slowly rotating low-poly globe with a few "income flow" particles arcing between cities, or an abstract gear-and-coin scene representing gig work. Keep it lightweight (under 200 KB of geometry) so the page still loads fast on mobile data. GSAP handles the entry animations: the headline fades and lifts on load, the feature cards stagger in as you scroll, and the call-to-action buttons have a subtle hover scale. Below the hero, build the "how it works" section as three steps with Framer Motion entrance animations triggered when they enter the viewport. End the page with a "for advocates" section and a final CTA.

Build the sign-up and sign-in pages. Both use React Hook Form with Zod schemas. The schemas live in `src/features/auth/schemas.ts` and are imported by both the form and the MSW mock so they are guaranteed to match. Sign-up has fields for name, email, phone (optional), password (with a strength meter component), and a language preference radio. Sign-in has email and password and a "forgot password" link. Both pages call the relevant endpoint via TanStack Query mutations; on success they store the access token in the Zustand auth store and navigate to `/role-router`, a small component that reads the role from the user object and redirects to the right dashboard. The MSW handlers for `/auth/v1/login` and `/auth/v1/register` accept any input and return a fake JWT plus a fake user.

Build the dashboard shells for each role. These are not the real dashboards yet — they are placeholder pages with the title, the navigation breadcrumbs, and stub KPI cards using `Skeleton` components. The point is that after sign-in, every role lands somewhere visible. Build `WorkerDashboard`, `VerifierQueue`, `AdvocateOverview`, and `AdminOverview` as stubs.

Set up i18n. Create `src/lib/i18n.ts` that initialises i18next with English and Urdu resources. Translate the most-used strings: the navigation labels, the form labels, the buttons. For Urdu you can use a placeholder translation file with the strings you have so far; the full Urdu pass happens in Sprint 5.

Your acceptance criteria for Sprint 1 are that the landing page loads with the Three.js scene visible and the GSAP animations playing, that the sign-up form successfully submits and redirects (against MSW mocks), that the sign-in form does the same, that after signing in as each of the four roles you land on the correct stub dashboard, that protected routes redirect to sign-in when there is no token, that the language toggle switches at least the navigation labels between English and Urdu, and that running `pnpm test` passes the auth schema unit tests you wrote alongside the form.

## Person B — Express.js Backend (Sprint 1)

Your goal is to build the auth service end to end and have the earnings service skeleton ready to flesh out in Sprint 2.

Start with the auth service. Write the Prisma schema for the `auth` schema: the `users` table, the `refresh_tokens` table, and the `role_requests` table, exactly as described in the blueprint. Run `pnpm prisma migrate dev --name init` to create the tables. Write the Zod schemas for register, login, refresh, forgot, reset, role-request, and the admin actions in `src/validators/auth.schema.ts`. Add JSDoc comments above each route so `swagger-jsdoc` can generate the documentation:

```typescript
/**
 * @openapi
 * /auth/v1/register:
 *   post:
 *     tags: [Auth]
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 10 }
 *     responses:
 *       201:
 *         description: Account created
 *       409:
 *         description: Email already exists
 */
router.post('/register', validate(registerSchema), authController.register);
```

Implement each endpoint following the controller-service-repository pattern. The register controller validates input, calls the auth service, which calls the user repository to check for an existing email, hashes the password with bcrypt at cost 12, inserts the user, creates a refresh token in the database, and returns the access token in the response body and the refresh token as an httpOnly Secure SameSite=Strict cookie.

The login endpoint follows the same pattern but starts by looking up the user by email and verifying the password with `bcrypt.compare`. Apply rate limiting to login: ten attempts per minute per IP, using `express-rate-limit` with `rate-limit-redis` so the limit holds across multiple instances when you scale up.

The refresh endpoint reads the refresh cookie, looks up the hashed token in the database, checks it is not revoked or expired, mints a new access token, rotates the refresh token (mark the old one revoked, create a new one with the same family), and returns the new access token plus a new cookie. The rotation pattern is what protects you against stolen refresh tokens: as soon as the legitimate user refreshes, the attacker's stolen token becomes useless.

Logout looks up the refresh token, marks it revoked, and clears the cookie. Forgot password generates a reset token (UUID), stores its hash with a one-hour expiry, and sends an email (use `nodemailer` with an Ethereal test SMTP for now; switch to Resend or Postmark in production). Reset password verifies the token, updates the password hash, revokes all of the user's refresh tokens (forcing a fresh login), and returns success.

The role-upgrade flow needs three endpoints. `POST /auth/v1/role-request` lets a worker submit a request. `GET /auth/v1/role-requests` lets an admin see the queue. `POST /auth/v1/role-requests/:id/approve` and `POST /auth/v1/role-requests/:id/reject` let an admin act. Approval updates the user's role and revokes their refresh tokens so the new role takes effect on next login.

While you have momentum, scaffold the earnings service for Sprint 2. Write the Prisma schema for the `earnings` schema: `platforms`, `city_zones`, `shifts`, `screenshots`, `verifications`, `anomaly_flags`, `csv_imports`, and `certificates` tables. Add the financial integrity CHECK constraint as a raw SQL migration step. Seed the platforms table with Uber, Careem, Bykea, Foodpanda, and inDrive, and the city zones table with twenty zones spanning Lahore, Karachi, and Islamabad. Stub the routes in `src/routes/shifts.routes.ts` and `src/routes/screenshots.routes.ts` so they show up in Swagger.

Your acceptance criteria for Sprint 1 are that the auth Swagger UI at `http://localhost:3001/docs` shows every auth endpoint with full request and response documentation, that you can register a new user via the Swagger UI and the user appears in the database with a hashed password, that login returns an access token and sets the refresh cookie, that the access token can be verified by Person C's FastAPI services using the shared secret (you should test this together), that role-upgrade requests can be created and approved end to end, that all auth endpoints are added to the Postman collection with example requests, and that the earnings service boots and shows stub routes in its Swagger UI.

## Person C — FastAPI Backend (Sprint 1)

Your goal is to build the anomaly service to a complete, judge-callable state. By the end of Sprint 1, the judges could in principle hit your `/detect` endpoint with any well-formed payload and get a meaningful response.

Start by writing the Pydantic models for the request and response in `app/schemas/detect.py`. The request is a `DetectRequest` with `worker_id: str`, `currency: str = "PKR"`, `shifts: list[Shift]`, and `options: DetectOptions = DetectOptions()`. The `Shift` model has `date: date`, `platform: str`, `hours_worked: float`, `gross_earned: float`, `platform_deductions: float`, and `net_received: float`. The `DetectOptions` model has `z_threshold: float = 2.5` and `mom_drop_pct: float = 20.0`. The response is a `DetectResponse` with a `summary` object and an `anomalies: list[Anomaly]`. Each `Anomaly` has `kind` (an enum: `deduction_spike`, `hourly_rate_drop`, `income_drop_mom`), `severity` (low, medium, high), `window` (a date range string), `metric`, `observed`, `baseline_mean`, `baseline_std`, `z`, and `explanation`.

Implement the detector itself in `app/services/detector.py`. The function takes a list of shifts and returns a list of anomalies. Inside, you build a pandas DataFrame from the shifts, sort it by date, compute `deduction_pct = platform_deductions / gross_earned`, compute the rolling 60-day mean and standard deviation of that quantity, and for each weekly window compute the z-score of that week's mean deduction percentage against the rolling baseline. If the absolute value of the z-score exceeds the threshold, you append a `deduction_spike` anomaly to the result. Apply similar logic for the hourly rate drop (compute weekly effective hourly rate and flag weeks two standard deviations below the worker's mean) and the month-over-month income drop (compare the most recent complete month's total against the prior month's total).

The plain-language explanation deserves care because it is the part the worker will read. Use a small set of templates in `app/core/explain.py` parameterised by the actual numbers. For example, the deduction-spike template might be `"Your platform cut {observed_pct:.0%} this week versus your usual {baseline_pct:.0%}."` Format the percentages using Python's f-strings. Keep the explanations short, factual, and free of judgement.

Wire up the route in `app/api/routes/detect.py`:

```python
@router.post("/detect", response_model=DetectResponse)
async def detect(payload: DetectRequest, user=Depends(verify_jwt)):
    """
    Detect anomalies in a worker's recent earnings.
    
    Statistical methods used:
    - Z-score on deduction percentage versus 60-day rolling baseline
    - Standard deviation drop on weekly hourly rate
    - Month-over-month income drop above configurable threshold
    """
    anomalies = detector.detect(
        shifts=payload.shifts,
        z_threshold=payload.options.z_threshold,
        mom_drop_pct=payload.options.mom_drop_pct
    )
    return DetectResponse(
        summary=Summary(shifts_analysed=len(payload.shifts), windows=["weekly", "monthly"]),
        anomalies=anomalies
    )
```

Add a `/health` endpoint that returns `{"status": "ok"}` for uptime monitoring. The Swagger UI at `/docs` is now generated automatically and shows the full schema; this is the URL you give the judges.

Write extensive tests using pytest. Cover the happy path (a worker with 60 days of normal earnings, no anomalies returned), the deduction spike case (insert a week with abnormally high deductions, assert the anomaly appears with the right kind and severity), the income drop case (insert a month with 30% lower total than the prior month, assert the `income_drop_mom` anomaly), the empty input case (zero shifts returns zero anomalies, never crashes), and the malformed input case (Pydantic should reject it with a 422 before it reaches your code). Also use `hypothesis` for property-based tests: assert that for any well-formed input, the response is well-formed and contains no NaN values.

Set up the analytics service skeleton for Sprint 2. Write the Pydantic models for the worker endpoints (`SummaryResponse`, `TrendResponse`, `CommissionTrackerResponse`, `MedianCompareResponse`) and the advocate endpoints. Wire up empty stub routes in `app/api/routes/`. Configure SQLAlchemy with the read-only `analytics_reader` database role that Person B has now created. Make sure the connection works by running a `SELECT 1` at startup.

Your acceptance criteria for Sprint 1 are that the anomaly Swagger UI at `http://localhost:8001/docs` shows the `/detect` endpoint with full request and response schemas, that you can invoke `/detect` from the Swagger UI with a 90-day synthetic payload and get back at least one anomaly when the data contains a clear spike, that `pytest` passes including the property-based tests, that a payload with deliberately injected anomalies reliably produces the expected anomaly types, that the response time for a 90-day payload is under two seconds locally, and that the `ANOMALY_API.md` file in `docs/` contains a curl example that any judge can copy and run.

## End-of-Sprint-1 Synchronisation

The three of you meet for thirty minutes. Person A demos the landing page and the auth flows running against MSW. Person B demos the auth service via Swagger UI, registers a user, and logs in. Person C demos the anomaly service and shows that a synthetic spike payload returns a meaningful anomaly with a plain-language explanation.

The integration handoff: Person A removes the MSW handlers for the auth endpoints and switches the axios base URL to point at Person B's running auth service. Person B confirms that registration, login, and refresh work end to end from the browser. Person C confirms that they can verify a JWT issued by Person B's auth service.

If any of those integrations fail, the team stays together until they pass. This is the moment when contract-first either pays off or doesn't.

---

# Sprint 2 — Core Data (Days 4 and 5)

Sprint 2 is about making the earnings module functional: workers can log shifts, the analytics service can produce a worker summary, and the frontend can show the worker dashboard with real data instead of skeletons.

## Person A — Frontend (Sprint 2)

You will build the worker shift logging flow and the dashboard. Start with the `ShiftForm` component because it is reused on both `/worker/shifts/new` and `/worker/shifts/:id`. The form uses React Hook Form with a Zod schema for shift validation, mirroring exactly the schema Person B implemented on the server. Fields are: platform (a `Select` populated from `GET /earnings/v1/platforms`, cached for five minutes via TanStack Query), shift date (a date picker, must not be in the future), hours worked (a number input, must be greater than zero and at most twenty-four), gross earned (a number input), platform deductions (a number input), and net received (a number input that is auto-computed as gross minus deductions when both are entered). Use `watch` from React Hook Form to compute net live as the user types in the other fields.

Animations matter for the form: when the form mounts, use Framer Motion to fade and slide each field in with a tiny stagger so the form feels alive rather than slapped on. When a validation error appears, the field shakes briefly using Framer Motion's `animate` prop. When the form submits successfully, the submit button morphs into a check mark before navigating away — this is a small touch but it makes the interaction feel responsive and polished.

Build the shifts list page at `/worker/shifts`. Use TanStack Table for the list with sortable columns (date, platform, gross, net, status) and client-side pagination on top of server-side pagination. The status column shows a coloured badge using the shadcn `Badge` component (green for VERIFIED, amber for PENDING_REVIEW, grey for SELF_ATTESTED, red for DISCREPANCY_FLAGGED, neutral for UNVERIFIABLE). Clicking a row navigates to the detail page. Above the table sits a filters bar with date range, platform, and status filters, plus a prominent "Log new shift" button. Use the URL search params to store filter state so users can bookmark or share a filtered view.

Build the worker dashboard at `/worker/dashboard`. The dashboard has three sections: at the top, four KPI tiles showing this-week earnings, this-month earnings, average hourly rate, and verification percentage; in the middle, a list of the five most recent shifts; at the bottom, an "Anomaly alerts" feed showing any flagged anomalies. The KPI tiles get their data from `GET /analytics/v1/worker/summary` (which Person C is building this sprint). While loading, each tile shows a Skeleton placeholder. When data arrives, the numbers count up using Framer Motion — this gives the dashboard a sense of life rather than feeling static.

Add the `RoleRouter` component that runs immediately after sign-in. It reads the role from the auth store and pushes the user to the right dashboard.

Set up Mock Service Worker handlers for the analytics endpoints with realistic mock data, so you can build the dashboard against mocks while Person C is building the real endpoints. Once the real endpoints are live, remove the MSW handlers.

Your acceptance criteria for Sprint 2 are that a worker can sign in, navigate to `/worker/shifts/new`, log a shift via the form, see it appear in `/worker/shifts`, click into the detail page and edit it, that the dashboard shows the four KPI tiles with animated counting, that the shifts list filters work and persist to the URL, that all analytics calls are wired to TanStack Query with proper loading and error states, and that the form validation (including the gross-equals-deductions-plus-net rule) works on the client before the server even sees the request.

## Person B — Express.js Backend (Sprint 2)

You will build out the earnings service to support the shift CRUD that Person A is consuming, and you will set up the screenshot upload mechanics so they are ready for the verification flow in Sprint 3.

Implement the platforms endpoint at `GET /earnings/v1/platforms` and the city zones endpoint at `GET /earnings/v1/city-zones`. Both are simple list reads with caching headers (`Cache-Control: max-age=300`) since the data changes rarely.

Implement the shifts CRUD endpoints. `POST /earnings/v1/shifts` creates a shift; the controller calls a service that validates the financial integrity (`gross_earned == platform_deductions + net_received`) even though the database will also enforce it (defense in depth), inserts the row using Prisma, and asynchronously fires off two side effects: it publishes a `shift.created` event into Redis using BullMQ's event functionality, and it makes a fire-and-forget HTTP call to Person C's anomaly service with the worker's last 90 days of shifts. The anomaly response is persisted in the `anomaly_flags` table.

`GET /earnings/v1/shifts` returns a paginated list filtered by query parameters. Workers see only their own shifts; verifiers see only shifts in the verification queue (status PENDING_REVIEW); admins see everything. Implement the role-based filtering as a guard inside the service layer rather than as an extra middleware, because the filtering logic is intertwined with the query.

`GET /earnings/v1/shifts/:id` returns one shift with its verification history and a signed URL for the screenshot if any. `PATCH /earnings/v1/shifts/:id` allows editing only by the owner and only if the verification status is not VERIFIED. `DELETE /earnings/v1/shifts/:id` is a soft delete via the `deleted_at` column.

Build the screenshot upload flow. `POST /earnings/v1/shifts/:id/screenshot/presign` generates a presigned PUT URL using the Supabase Storage SDK. The URL is valid for five minutes, restricted to the worker's own folder (`screenshots/{worker_id}/{shift_id}/{uuid}.{ext}`), and limited to image content types and 5 MB. The endpoint returns the URL and the storage key. The frontend uploads the file directly to Supabase. Then `POST /earnings/v1/shifts/:id/screenshot` is called by the frontend to confirm the upload — it inserts a row in the `screenshots` table with the storage key, mime type, size, and a checksum, and transitions the shift's `verification_status` to `PENDING_REVIEW`. `GET /earnings/v1/shifts/:id/screenshot/url` generates a short-lived signed GET URL for the verifier or the owner to view the screenshot.

While you are at it, set up the BullMQ queue infrastructure for the CSV import that comes in Sprint 3. Create the queue in `src/queues/csvImport.queue.ts` and a worker process in `src/workers/csvImport.worker.ts`. The worker will consume jobs from the queue, parse the CSV with `csv-parse`, validate each row, insert valid rows in batches, build an error CSV for invalid rows, upload that error CSV to Supabase, and update a `csv_imports` row with the result. You don't need to implement the parser logic yet — just have the queue and worker scaffolding ready.

Update the Swagger UI documentation for every endpoint you have added. Update the Postman collection.

Your acceptance criteria for Sprint 2 are that all shift CRUD endpoints work via Swagger UI and via the running frontend, that the financial integrity constraint rejects invalid input both at the application layer (with a useful error message) and at the database layer (as a backstop), that the screenshot presign URL successfully accepts an upload from the frontend, that creating a shift triggers a call to the anomaly service and persists any returned anomalies, that the role-based filtering on the shifts list is correct (a verifier sees only pending reviews; a worker sees only their own), and that the BullMQ queue scaffolding is in place for Sprint 3.

## Person C — FastAPI Backend (Sprint 2)

You finish the analytics service worker endpoints and ensure the city-wide median is computed from real seeded data.

First, work with Person B to confirm that the seed script has populated enough data to make the median meaningful. You need at least one hundred workers across the three seeded cities, with about ninety days of shifts each. The seed should include realistic variance in platform commission percentages so that the median is interesting rather than uniform. If Person B's seed is too small or too uniform, advocate for expanding it now — the median will be tested by the judges.

Implement `GET /analytics/v1/worker/summary`. The query joins shifts (filtered to the current user) over the current week, the current month, and the trailing six months. It returns this-week earnings, this-month earnings, average hourly rate (sum of net received divided by sum of hours worked), and verification percentage (count of VERIFIED shifts divided by count of all shifts, in the last 30 days). All four values come from a single SQL query with conditional aggregations, which is fast.

Implement `GET /analytics/v1/worker/trend?granularity=week`. This returns a time series for charting — the last twelve weeks (or twelve months if granularity is month) with sum of net received per period. Use SQL `date_trunc` for grouping.

Implement `GET /analytics/v1/worker/commission-tracker`. This returns one time series per platform showing the average deduction percentage per week over the last twelve weeks. The frontend will render one line per platform.

Implement `GET /analytics/v1/worker/median-compare?zone&category`. This is the most important endpoint of the sprint because it has to satisfy the brief's hard requirement that medians come from real seeded data. The query computes the median net-per-hour for VERIFIED shifts in the requested zone and category, optionally filtered to the last thirty days. The crucial detail is the `HAVING count(distinct worker_id) >= 5` clause that enforces k-anonymity. If the cohort is too small, the response includes `cohort_too_small: true` and the frontend shows an explanatory message instead of the comparison.

Use SQLAlchemy core (not the ORM) for these queries because you want fine control over the SQL. Wrap each query in a Python function that takes parameters, executes the query against the read-only async engine, and returns a dictionary that Pydantic serialises to JSON.

Cache each response in Redis with a sixty-second TTL. The cache key includes the user ID, the endpoint name, and the parameters. This means a worker hitting their dashboard repeatedly only causes one database query per minute. Use the `aiocache` library or a thin wrapper around `redis.asyncio` for this.

Update the Swagger UI documentation. Since FastAPI generates it from your Pydantic models, the docs are automatically up to date — you just need to ensure each endpoint has a docstring that explains it.

Your acceptance criteria for Sprint 2 are that the four worker analytics endpoints all return correct data when called against the seeded database, that the median-compare endpoint correctly returns `cohort_too_small: true` when filters narrow the cohort below five workers (test this by deliberately filtering to an empty zone), that response times are under one second locally even for the median query, that all four endpoints are visible and callable in the Swagger UI, and that the cache layer is observable (you can see the second call return faster than the first).

## End-of-Sprint-2 Synchronisation

Demo time. Person A signs in as a worker, lands on the dashboard, sees the four KPI tiles populate with real numbers from Person C's analytics endpoints. They click "Log new shift," fill in the form, save, see the new shift appear, and watch as a few seconds later an anomaly alert appears in their feed (because Person B's earnings service called Person C's anomaly service in the background).

Integration handoff: Person A removes MSW handlers for shifts, screenshot upload, and analytics worker endpoints. Person B verifies that the anomaly call from earnings to anomaly works under load (try creating ten shifts in rapid succession). Person C verifies that the median query gracefully handles edge cases (empty cohort, single worker cohort, very large cohort).

---

# Sprint 3 — Verification Flow and CSV Import (Days 6 and 7)

Sprint 3 is about closing the trust loop. Workers can upload screenshots, verifiers can review them and decide, and the system records the decision permanently. CSV bulk import is built in parallel because power users will want it.

## Person A — Frontend (Sprint 3)

You will build the screenshot upload flow on the worker side, the verifier queue and decision interface, and the CSV import page.

Start with `ScreenshotUploader`, a component that lives inside the shift detail page. It is a `FileDropzone` (built on the `react-dropzone` library, styled with Tailwind) that accepts a single image file up to 5 MB. When the user drops a file, the component performs the three-step upload dance: it calls `POST /earnings/v1/shifts/:id/screenshot/presign` to get a presigned URL, uses the browser's `fetch` directly to PUT the file bytes to that URL, then calls `POST /earnings/v1/shifts/:id/screenshot` to confirm. While this is happening, show a Framer Motion progress indicator (an arc that fills as the upload progresses). On success, the shift detail refreshes via TanStack Query invalidation and the verification status updates from SELF_ATTESTED to PENDING_REVIEW.

Build the verifier interface. The queue page at `/verify/queue` lists pending screenshots in a table — oldest first by default, with a filter to scope by platform. Each row shows the worker's display name, the city zone, the platform, the date, the gross/net values, the screenshot thumbnail, and an "Open" button. Clicking "Open" navigates to `/verify/:shiftId`.

The verification detail page is a side-by-side layout. On the left, a large preview of the screenshot (loaded via the signed GET URL endpoint), with click-to-zoom for inspecting numbers. On the right, the worker's logged values displayed clearly with each number on its own line, and below them the decision panel with three large buttons (Confirm, Flag Discrepancy, Mark Unverifiable). Each button is a different colour (green, amber, red) for visual clarity. When the verifier clicks one, a modal opens prompting for a note. The note is required for Flag and Unverifiable, optional for Confirm. On submit, the page calls `POST /earnings/v1/shifts/:id/verify` and on success advances to the next item in the queue using a "next pending" endpoint or by simply navigating back to the queue with a one-second delay.

Use Framer Motion for the transitions between verification items: as the page advances, the previous shift slides out left and the next one slides in from the right. This makes high-volume verification feel smooth and game-like, which is what you want for verifiers doing many in a row.

Build the CSV import page at `/worker/import`. The page has three sections: at the top, a button to download the CSV template (a static file Person B serves at `GET /earnings/v1/imports/template`); in the middle, a `CsvDropzone` that accepts a CSV file; at the bottom, a results panel that appears after submission. When the worker drops a CSV, you preview it client-side using PapaParse (just the first 10 rows, in a simple table) and show a "Confirm and import" button. On confirm, you POST the file to `POST /earnings/v1/imports/csv`, receive a job ID back, and switch to a "polling" mode where you call `GET /earnings/v1/imports/:jobId` every two seconds until the job status becomes `completed` or `failed`. When it completes, you show a summary (X rows imported, Y rows failed) and if there are failures you offer a download of the error CSV.

The polling itself uses TanStack Query's `refetchInterval` option, which is cleaner than rolling your own setInterval. You disable the interval as soon as the status hits a terminal state.

Your acceptance criteria for Sprint 3 are that a worker can upload a screenshot for any of their shifts and see the status transition to PENDING_REVIEW, that a verifier can open the queue, work through several pending shifts in a row with smooth transitions, and successfully record decisions, that worker notifications appear (in-app for now; email is wired in Sprint 4) when a decision is made about their shift, that the CSV import accepts a sample file with one thousand rows, returns a job ID immediately, polls for completion, and displays the summary, and that an invalid CSV produces an error report download.

## Person B — Express.js Backend (Sprint 3)

You will complete the verification flow, the CSV import job, and the audit logging that ties them together.

Implement `POST /earnings/v1/shifts/:id/verify`. The controller checks that the user is a verifier and that the shift is in PENDING_REVIEW. The service layer creates a row in the `verifications` table with the verifier ID, the screenshot ID, the decision enum (CONFIRMED, FLAGGED, UNVERIFIABLE), and the note. It transitions the shift's `verification_status` to VERIFIED, DISCREPANCY_FLAGGED, or UNVERIFIABLE accordingly. It writes an entry to the `audit.events` table recording the decision. It publishes a `shift.verified` event. A notification handler (which you build in this sprint as a simple in-process function for now) creates an in-app notification row and sends an email via nodemailer.

Implement `GET /earnings/v1/verification/queue`. The query returns shifts where `verification_status = 'PENDING_REVIEW'`, ordered by created_at ascending (oldest first), with cursor-based pagination. Include the worker's display name and city zone in the response (a join on the users table) but exclude the worker's email and phone. Apply role check: only verifiers can call this endpoint.

Build the CSV import flow end to end. `GET /earnings/v1/imports/template` returns a static CSV template file with the column headers and one example row. `POST /earnings/v1/imports/csv` accepts a multipart upload via Multer, stores the file temporarily in a `tmp/` directory (or directly in object storage), creates a row in the `csv_imports` table with status `queued`, enqueues a BullMQ job with the file path and the worker ID, and returns the job ID immediately to the frontend. `GET /earnings/v1/imports/:jobId` returns the current status of the job from the `csv_imports` row, including the row count, error count, and (if failed) a signed URL to download the error CSV.

The CSV import worker is the interesting part. In `src/workers/csvImport.worker.ts`, you write a BullMQ worker that consumes jobs from the queue. For each job, you stream the CSV file using `csv-parse` in streaming mode (so a 10,000-row file doesn't blow up memory). For each row you validate against the same Zod schema used by the manual shift form, with one extra check: the platform name must exist in the platforms table (case-insensitive lookup). Valid rows are accumulated into batches of 500 and inserted with `prisma.shift.createMany`. Invalid rows are accumulated into an error array with the row number and the error message. After all rows are processed, you build an error CSV file with three columns (row number, original input, error reason), upload it to Supabase Storage, and update the `csv_imports` row with the storage key, the row counts, and the status `completed` (or `failed` if everything was invalid).

Add the `audit.events` table to the shared schema and write a helper function `audit({actor, action, entity, entityId, diff, ip, ua})` that any service can call to record an event. Use it from the verification endpoint and from the auth role-change endpoint.

Update Swagger and Postman.

Your acceptance criteria for Sprint 3 are that the verification flow works end to end (a worker uploads, a verifier decides, the worker is notified), that the CSV import correctly processes a 1,000-row file and returns an accurate summary, that an intentionally malformed CSV (missing required columns, invalid data types) produces a usable error report, that audit log entries are created for every verification decision, and that the BullMQ queue dashboard (you can install `bull-board` for visibility) shows jobs flowing through correctly.

## Person C — FastAPI Backend (Sprint 3)

You start building the advocate analytics endpoints and the vulnerability flag job. The brief calls out four KPIs for the advocate panel; in this sprint you build three of them and the fourth in Sprint 4.

Implement `GET /analytics/v1/advocate/commission-trends`. The query computes, for each platform, the average deduction percentage per week over the last twelve weeks. Result is one time series per platform. Apply k-anonymity: if any platform-week cell has fewer than five distinct workers, return `null` for that cell instead of a number. The response includes a `meta.cohort_sizes` array so the advocate can see how many workers contributed to each point.

Implement `GET /analytics/v1/advocate/income-distribution?zone`. The query computes the percentile distribution (10th, 25th, 50th, 75th, 90th percentiles) of monthly net income per worker, optionally filtered by zone. Use PostgreSQL's `percentile_cont` window function. Apply k-anonymity at the cohort level: if the zone has fewer than five workers, return `cohort_too_small: true`.

Implement `GET /analytics/v1/advocate/top-complaints?window=7d`. This one needs to join across schemas — it reads from `grievance.complaints` (Person B's domain) but is exposed by your service. The query groups complaints by category, counts within the window, and returns the top five categories with counts. Since you have read-only access to `grievance.complaints` via the `analytics_reader` role, this is straightforward.

Build the vulnerability flag computation as a scheduled job. The query identifies workers whose net income in the most recent complete month is more than twenty percent lower than the prior complete month. Run this nightly via Render's scheduled jobs feature, write the results to a `analytics_views.vulnerability_flags` materialised view, and expose the view via `GET /analytics/v1/advocate/vulnerability` (which you complete in Sprint 4).

Add caching to the advocate endpoints with a slightly longer TTL than the worker endpoints (five minutes instead of sixty seconds), since advocate KPIs change more slowly.

Your acceptance criteria for Sprint 3 are that the three completed advocate endpoints return correct data when seeded, that k-anonymity is enforced (test by deliberately narrowing filters), that the top-complaints endpoint correctly reads cross-schema, that the vulnerability materialised view is created and refreshed by the scheduled job (you can trigger it manually for testing), and that all advocate endpoints appear in the Swagger UI.

## End-of-Sprint-3 Synchronisation

Demo: a verifier signs in, opens the queue, decides on three shifts in succession (one confirm, one flag, one unverifiable), and sees them disappear from the queue. The worker who owns those shifts signs in and sees the new statuses on their dashboard plus a notification banner. Then a different worker uploads a CSV with 500 rows; the import completes successfully; the worker sees the new shifts in their list. Finally, an advocate signs in and sees the commission trend chart populated with real data (the chart UI itself is built in Sprint 4 — for now Person A can show the JSON response in the network tab).

---

# Sprint 4 — Certificate, Grievance, and Advocate Dashboard (Days 8, 9, and 10)

Sprint 4 is the longest and most rewarding. By the end of it, all four personas have functional end-to-end flows. The certificate is shareable and printable. The grievance board accepts complaints and supports clustering. The advocate dashboard shows all four KPIs.

## Person A — Frontend (Sprint 4)

You will build three major surfaces this sprint: the certificate page (with the public print view), the grievance board, and the advocate dashboard. This is a lot, but the building blocks (forms, tables, animations) are now familiar.

Start with the certificate. Build `/worker/certificate`. The page has a date range picker at the top (use `react-day-picker` styled to match your design system), a "Generate preview" button, and below it a `CertificatePreview` component that renders the certificate in real time as the date range changes. The preview is itself the same component that will render the public print view — meaning you build it once and use it twice. The component fetches `GET /certificate/v1/build?from&to` and renders the result.

The certificate visual design matters: it should look professional enough that a landlord or bank takes it seriously. Use a clean serif headline ("FairGig Income Certificate"), a clear "Issued to: [worker name]" line, a date range, a totals table (with net earned per platform, total hours worked, average hourly rate), a list of the contributing months with monthly subtotals, and a footer with the issuance date and a verification statement ("This certificate represents shifts independently verified by FairGig verifiers"). Include a QR code (use `qrcode.react`) that links to the public verification URL.

Below the preview, two buttons: "Print" (calls `window.print()`) and "Share" (opens a dialog asking for share duration in days, then calls `POST /certificate/v1/share` and shows the resulting URL with a copy button).

Build the public print page at `/certificate/public/:signedId`. This page uses the `PrintLayout` (no top bar, no sidebar) and renders the same `CertificatePreview` component with data from `GET /certificate/v1/public/:signedId`. Importantly, this page uses `print.css` to ensure that when printed, only the certificate content appears — no chrome, no navigation, no buttons. Test this by opening the page and using the browser's print preview.

Build the grievance board at `/worker/grievances`. The page has two tabs: "My complaints" and "Board" (the public bulletin). The compose dialog (opened via a "New complaint" button) is a multi-step form: pick the platform, pick the category, write the title, write the description, choose visibility (public anonymous or internal). The list view shows each complaint as a card with the platform badge, the category, the title, a snippet of the description, the author handle (or "Anonymous"), the status badge, the tags (if any), the comment count, and the timestamp. Cards expand on click to show the full description and the comment thread.

Build the advocate dashboard at `/advocate/overview` and the four drilldown pages. The overview shows four large KPI tiles in a grid: "Commission trend" (a sparkline preview with a "drill in" link), "Income distribution by zone" (a small box plot or bar preview), "Top complaints this week" (a small bar list), and "Vulnerability flag" (a count and "view list" link). Each tile click navigates to the corresponding drilldown page.

The drilldown pages use Recharts. `/advocate/commissions` shows a multi-line chart with one line per platform over the last twelve weeks, with the cohort-size annotation visible on hover. `/advocate/zones` shows a box plot or, if Recharts box plots feel limited, a bar chart of percentiles per zone. `/advocate/complaints` is the grievance management interface — same complaint cards as the worker view but with extra controls (tag, cluster, escalate, resolve buttons). `/advocate/vulnerability` is a list of anonymised IDs with their drop percentage.

Use Framer Motion liberally on the advocate dashboard to make the data presentation feel alive: KPI tiles fade and lift on initial render; numbers count up; charts animate as they enter the viewport.

Your acceptance criteria for Sprint 4 are that a worker can build a certificate for any date range, see only their VERIFIED shifts represented, share it via a signed URL, that the public certificate page prints cleanly with no chrome, that a worker can post a complaint and see it appear on the board, that an advocate can tag and cluster complaints, escalate them, and resolve them, that the advocate dashboard shows all four KPIs with real charts, and that all interactions feel responsive and animated.

## Person B — Express.js Backend (Sprint 4)

You build the certificate service and the grievance service end to end. These are the last two new services in your scope.

The certificate service has four endpoints. `GET /certificate/v1/build?from&to` takes the worker ID from the JWT, queries the worker's VERIFIED shifts in the date range, computes the totals (overall and per platform and per month), and returns a structured object that the frontend renders. The data is not yet HTML at this point — the rendering happens in two places (the worker preview and the public page).

`POST /certificate/v1/share` creates a row in the `certificates` table with the worker ID, the date range, an unguessable signed share ID (UUID), an expiry timestamp (default fourteen days from now), and a revoked flag (false). Returns the signed ID and the full URL to share.

`GET /certificate/v1/public/:signedId` looks up the row, checks it is not expired or revoked, computes the certificate data exactly as `/build` does (using the worker ID and date range from the row), and returns it. This is the only endpoint in your project that does not require authentication, because by design, anyone with the signed URL can view the certificate.

`POST /certificate/v1/:signedId/revoke` allows the worker to revoke a previously shared certificate. Sets the revoked flag to true.

Use Handlebars to template the HTML for the print rendering on the server side as a fallback, even though the frontend renders the certificate in React for the in-app experience. The Handlebars template lives in `templates/certificate.hbs`. This dual-rendering approach means if the React app ever has an issue, the server can still serve a working printable HTML page.

The grievance service has the largest endpoint surface of any service this sprint. `POST /grievance/v1/complaints` creates a complaint. `GET /grievance/v1/complaints` lists with filters (platform, category, status, tag); workers see anonymised authors; advocates see real authors. `GET /grievance/v1/complaints/:id` returns one complaint with comments. `PATCH /grievance/v1/complaints/:id` allows the author to edit limited fields and advocates to update more. `POST /grievance/v1/complaints/:id/tags` adds a tag. `DELETE /grievance/v1/complaints/:id/tags/:tagId` removes one. `POST /grievance/v1/clusters` creates a cluster. `POST /grievance/v1/clusters/:id/attach` attaches complaints to a cluster (body: `{complaintIds: [...]}`). `PATCH /grievance/v1/complaints/:id/status` is the escalation/resolution/hide endpoint. `POST /grievance/v1/complaints/:id/comments` adds a comment to the thread. `POST /grievance/v1/complaints/:id/report` reports a post for moderation. `GET /grievance/v1/board` returns the public anonymised bulletin.

For the clustering, build a simple TF-IDF cosine similarity helper in `src/services/clustering.service.ts`. When an advocate is creating a cluster, call `GET /grievance/v1/clusters/suggestions?seedId=...` which returns the top five complaints most similar to the seed, computed using TF-IDF on the title and description. The `natural` npm library has TF-IDF out of the box.

Audit log every status change: tagging, clustering, escalation, resolution, hiding.

Your acceptance criteria for Sprint 4 are that all certificate endpoints work end to end, that the public certificate URL produces a print-friendly HTML page (test with the browser print dialog), that the grievance service handles complaint lifecycle from creation through resolution, that clustering suggestions return reasonable similar complaints when tested with seeded data, that all moderation actions produce audit log entries, and that the Postman collection now includes every endpoint you have built across all four services.

## Person C — FastAPI Backend (Sprint 4)

You finish the analytics service by completing the vulnerability endpoint and tightening the caching and observability of every endpoint.

Implement `GET /analytics/v1/advocate/vulnerability`. The endpoint reads the materialised view you built in Sprint 3 (which the nightly job populates) and returns the list of anonymised worker IDs along with the drop percentage. Each entry has `anon_id` (a hash of the user ID, not the user ID itself), `drop_pct`, `prior_month_total`, `current_month_total`, and `city_zone` (since zone is not personally identifying when combined with the cohort size). If the response would include fewer than five workers (entire cohort below k), return `cohort_too_small: true`.

Add a manual refresh endpoint `POST /analytics/v1/internal/refresh-vulnerability` (admin only, used to force a refresh during demos and testing). This calls the same query the nightly job runs.

Add observability across all your endpoints. Wrap each endpoint with a simple decorator that logs the duration, the cache hit/miss status, and the result size. Use `structlog` for structured JSON output that integrates with whatever log aggregator you use later.

Audit your caching strategy. Worker endpoints cache for sixty seconds; advocate endpoints cache for five minutes; the vulnerability endpoint caches for fifteen minutes. Use Redis as the cache backend, with keys that include the user role so a worker and an advocate hitting the same endpoint do not see each other's cached data.

Take a careful pass over the anomaly service and make sure the explanation strings are good. The brief specifically says "human-readable explanation," so this is judged. Read each of your templates aloud and ask: would a non-technical worker understand this? Iterate on the wording. Keep it simple and concrete: "Your platform took 34% in deductions last week, compared to your usual 22%. That's about Rs. 1,200 more per week than typical."

Write more tests. By the end of Sprint 4 you should have at least 80% coverage on the anomaly service and at least 70% on the analytics service.

Your acceptance criteria for Sprint 4 are that the vulnerability endpoint returns correct data including k-anonymity protection, that the manual refresh endpoint works, that all endpoints log structured JSON with timing information, that the cache hit ratio in steady state is above 80% (measurable via your logs), that test coverage hits the targets, and that the anomaly service explanations are reviewed and approved by the whole team for clarity.

## End-of-Sprint-4 Synchronisation

Long demo: a worker logs five shifts, uploads screenshots for three, has them verified, generates a certificate, shares it via URL, opens the URL in an incognito window and prints it. Then a different worker posts a complaint about a platform commission change. An advocate signs in, sees the new complaint, tags it, clusters it with two similar ones from earlier, and escalates the cluster. The advocate then opens the dashboard and sees all four KPIs populated, including the vulnerability list.

This is the moment the application looks and feels like a real product. Take screenshots and a short video — these are useful both for the final submission and for morale.

---

# Sprint 5 — Admin Panel, Polish, and Animations (Days 11 and 12)

Sprint 5 is the polish sprint. The admin panel exists for operations. Animations elevate the experience from "functional" to "memorable." Internationalisation is finished. Accessibility is audited. Performance is measured.

## Person A — Frontend (Sprint 5)

Two main bodies of work this sprint: the admin pages and the polish pass.

For the admin pages, build `/admin/overview` (counts of users by role, complaints by status, shifts by status, a list of recent audit events), `/admin/platforms` and `/admin/zones` (CRUD interfaces using the shadcn data table with inline edit dialogs), `/admin/users` (search by email, freeze/unfreeze actions, role-upgrade approval inline), `/admin/audit` (filterable audit log viewer with date range, action type, and actor filters), and `/admin/seed` (a developer-only page with a "Reset and reseed demo data" button — useful for live demos). These pages are functional rather than fancy; the admin role does not need elaborate animations.

For the polish pass, focus on three areas. First, animations across the application. Audit every page transition and use either Framer Motion `AnimatePresence` for component-level transitions or GSAP for page-level transitions. The landing page should feel cinematic. The dashboards should feel alive. The certificate generation should feel ceremonious. Don't overdo it — the worker on a slow connection in a parked rickshaw should not be made to wait for animations to complete before seeing the data.

Second, the i18n pass. Translate every user-facing string into Urdu. Work with a Pakistani team member or use a professional translator if budget allows; auto-translation is a starting point but rarely good enough. Test the right-to-left layout: the entire UI must flip correctly when Urdu is selected. Tailwind has good RTL support via the `dir-rtl:` modifier.

Third, the accessibility audit. Run axe-core via `@axe-core/playwright` in your end-to-end tests. Target zero violations on the critical pages. Verify keyboard navigation works for every interactive element. Verify screen reader announcements for dynamic content. Verify colour contrast meets WCAG AA. Verify all form errors are associated with their fields via `aria-describedby`.

Add the Three.js touches. Beyond the landing hero, consider one or two more places to add subtle 3D moments: maybe an interactive map on the advocate's zone drilldown showing zone boundaries with income bars rising from each zone, or a gentle 3D background animation on the certificate share success page. Keep these optional — they should add wonder, not distract.

Your acceptance criteria for Sprint 5 are that all admin pages are functional, that English-Urdu language switching works correctly with RTL layout, that the accessibility audit shows zero critical violations on the worker dashboard, the certificate page, the verification page, and the advocate overview, that the Lighthouse performance score on the landing page is above 90 on mobile, and that the team unanimously feels the application looks and feels like a finished product.

## Person B — Express.js Backend (Sprint 5)

You build the admin endpoints, harden the system, and document every contract for the Postman collection that judges will inspect.

Admin endpoints across the four services. In auth: `GET /auth/v1/admin/users` (paginated search), `PATCH /auth/v1/admin/users/:id/status` (freeze/unfreeze), the role-request approval endpoints (already done in Sprint 1), `GET /auth/v1/admin/audit` (audit log read with filters). In earnings: `GET /earnings/v1/admin/platforms`, `POST /earnings/v1/admin/platforms`, `PATCH /earnings/v1/admin/platforms/:id`, and the same set for zones. In grievance: `GET /grievance/v1/admin/reports` (the report queue from worker-reported posts).

Add comprehensive rate limiting. Default sixty requests per minute per IP; ten on the auth endpoints; thirty on the upload presign endpoints; thirty on the anomaly endpoint; five on the password-reset endpoint. Use `rate-limit-redis` so limits hold across multiple instances when you deploy.

Add comprehensive Helmet configuration. Set a strict Content Security Policy for the auth service since it sets cookies. Set HSTS, X-Content-Type-Options, X-Frame-Options across all services.

Audit the JWT handling. Make sure tokens are short-lived (fifteen minutes for access), refresh tokens rotate on every use, and the rotation revokes the predecessor immediately. Make sure password change revokes all of a user's existing refresh tokens.

Audit logging across all sensitive actions. Verify that every role change, verification decision, complaint escalation, admin freeze, and admin platform/zone change creates an audit entry with the actor, the action, the entity, and a JSON diff.

Finalise the Postman collection. Every endpoint across all four services should have an example request and example response. Group requests into folders by service. Use Postman environment variables for the JWT, the base URLs, and any test data. Export the collection to `infra/postman/FairGig.postman_collection.json` and the environment to `infra/postman/FairGig.postman_environment.json`. Also commit a `infra/postman/README.md` explaining how to import and use the collection.

Your acceptance criteria for Sprint 5 are that all admin endpoints work end to end and are documented in Swagger, that rate limiting can be triggered (try sending eleven login attempts in one minute and confirm the eleventh returns 429), that the Postman collection contains every endpoint with example data, and that running through the Postman collection top to bottom completes a full admin scenario (seed platforms, seed zones, register users, approve role upgrades, freeze a user) without manual fixups.

## Person C — FastAPI Backend (Sprint 5)

You harden the FastAPI services and prepare the anomaly service specifically for judge interaction.

Add comprehensive request validation beyond what Pydantic gives you. Write custom validators for the anomaly request: shifts must be sorted by date, no two shifts can have the same date for the same platform, hours_worked must be reasonable, gross_earned cannot be negative. Reject malformed payloads with helpful 422 responses that explain what went wrong.

Add an authentication mode to the anomaly service that supports both JWT and a shared API key for the judges. The brief says judges will call the endpoint directly; they probably won't have a JWT. Document a `JUDGE_API_KEY` environment variable that, if set in the request as `X-API-Key`, bypasses JWT verification. This is a deliberate, documented exception, not a vulnerability — and it lets judges hit the endpoint with a curl command that you provide.

Polish the OpenAPI documentation. For each endpoint, write a clear summary, a longer description, and a complete example request and response. FastAPI lets you do this with `responses=` and `openapi_examples=` parameters on the route decorator. The result is that someone visiting `/docs` can fully understand and exercise your service without ever reading code.

Write the `docs/ANOMALY_API.md` document. This is what judges will read first. Include a clear explanation of the detection rules, a documented example payload, the curl command to invoke the endpoint, the expected response, and an explanation of each field. Make it stand on its own without requiring familiarity with the rest of the system.

Run load testing. Use `k6` to simulate one hundred concurrent calls to the anomaly endpoint with realistic 90-day payloads. Confirm that p95 latency stays under two seconds. If it doesn't, profile and optimise.

Wire up Sentry for error tracking. The Sentry SDK for Python is small and the free tier is generous.

Your acceptance criteria for Sprint 5 are that the anomaly service accepts both JWT and API key authentication and is judge-callable via a documented curl command, that the OpenAPI documentation at `/docs` is rich enough to be self-explanatory, that the load test passes with p95 under two seconds, that custom validation rejects malformed payloads with helpful errors, and that `docs/ANOMALY_API.md` is approved by the whole team.

## End-of-Sprint-5 Synchronisation

Demo: an admin opens the admin panel, freezes a user, approves a role upgrade, edits a platform name. Then someone uses Postman to walk through the API contract from registering a user through approving a role upgrade. Then someone uses curl to hit the anomaly service with the documented payload from `ANOMALY_API.md` and gets back a meaningful response. Then someone switches the language to Urdu and navigates the worker dashboard end to end, confirming everything is translated and the layout is right-to-left.

---

# Sprint 6 — Testing, Deployment, and Submission (Days 13 and 14)

The final sprint. By Friday evening you submit. The work in this sprint is mostly integration testing, deployment, and the final pass over documentation and demo materials.

## Person A — Frontend (Sprint 6)

You write end-to-end tests with Playwright covering the critical flows: a worker signs up, logs a shift, uploads a screenshot, watches it get verified (using a Playwright helper that signs in as a verifier in a different browser context, decides on the shift, then switches back), generates a certificate, shares it. An advocate signs in, sees the dashboard, drills into the vulnerability list. An admin freezes a user.

Each test is independent and can run in parallel. Each test cleans up after itself (delete the user, the shifts, the complaints it created). Use Playwright's storage state feature to bypass the sign-in step for tests that don't specifically test sign-in.

Run the accessibility audit one final time. Fix any regressions. Run a Lighthouse audit on every major page. Aim for a performance score above 85 on mobile, an accessibility score of 100, and a best-practices score above 95.

Build the production bundle. Confirm that the initial JavaScript bundle (excluding the lazy-loaded chart library) is under 250 kilobytes gzipped. If it isn't, code-split aggressively.

Deploy to Vercel. Connect the GitHub repository, configure the build command (`pnpm install && pnpm --filter web build`), the output directory (`apps/web/dist`), and the environment variables (the API base URLs pointing at the Render and Hugging Face Spaces deployments). Test a deployment from a clean clone to verify the build works.

Polish the README at the repo root. It should explain what FairGig is, how to clone and run locally (one command per service), the URLs for the deployed environments, and a link to the demo video.

Record a five-minute demo video. Walk through the worker flow, the verifier flow, the advocate flow, the admin flow. Show the certificate being generated and shared. Highlight the animations and the i18n. End with the anomaly endpoint being called via curl. This video is what judges may watch first if they don't have time to spin up the application themselves.

Your acceptance criteria for Sprint 6 are that the Playwright suite passes consistently, that Lighthouse meets the targets, that the production bundle is within budget, that the Vercel deployment is live and stable, that the README is comprehensive, and that the demo video is recorded and uploaded.

## Person B — Express.js Backend (Sprint 6)

You write integration tests, deploy the four services, and verify the full system in production.

Integration tests using Supertest run against a fresh PostgreSQL test schema. Each test creates a service instance, hits the routes through Supertest, asserts on the responses, and tears down the schema. Cover the happy path for every endpoint, the role-based access denial cases, the validation error cases, and the not-found cases. Aim for at least 70% coverage across all four services.

Deploy each service to Render. Each service is a separate web service with its own Render dashboard entry. Configure the start command (`pnpm --filter <service> start`), the build command (`pnpm install && pnpm --filter <service> build && pnpm --filter <service> prisma migrate deploy`), and the environment variables. Use Render's secret management for the JWT secret, the database URL, the Supabase keys, and the Resend API key. Configure the health check endpoint at `/health`. Set the auto-deploy to deploy from the main branch.

Connect the deployed PostgreSQL to all four services. Run migrations once at first deploy via Render's job runner. Seed the database with the production seed script (a smaller, more realistic dataset than the development seed).

Set up Render's scheduled jobs for the cleanup tasks: expire old refresh tokens nightly, expire old certificate shares nightly.

Verify the full system in production by walking the same demo Person A is recording. Watch for any environment-specific bugs (timezone issues, CORS misconfigurations, missing env vars).

Your acceptance criteria for Sprint 6 are that integration tests pass with the targeted coverage, that all four services are deployed and stable on Render, that the database is properly migrated and seeded, that the scheduled cleanup jobs are configured, and that an end-to-end manual test from the production frontend completes successfully.

## Person C — FastAPI Backend (Sprint 6)

You finalise tests, deploy the FastAPI services, and verify judge-callability in production.

Integration tests with `pytest` and `httpx` against a fresh PostgreSQL test database. Cover every analytics endpoint with seeded data, every cohort-too-small edge case, every cache scenario. Property-based tests on the anomaly service have already given you good coverage; expand the manual cases with more synthetic scenarios (worker with varying weekly patterns, worker with very few shifts, worker with one extreme outlier).

Deploy both services to Hugging Face Spaces. Each service is a separate Space configured with the Docker SDK. The Dockerfile installs Python, copies the service code, installs the requirements, and runs uvicorn. Set the environment variables in the Space's settings (the JWT secret, the database URL for the analytics service, the API key for judges, the Sentry DSN). Verify that visiting the Space URL shows the FastAPI Swagger UI.

Configure CORS on both services to accept requests from the production Vercel domain.

Test the judge curl command against the production anomaly endpoint. Time it: cold start may be slow on Hugging Face Spaces. If it is, set up a "warmup" that the frontend triggers on load (a single GET to `/health`).

Document the production URLs in `docs/ANOMALY_API.md`. Update the curl example to use the production URL and the API key.

Your acceptance criteria for Sprint 6 are that integration tests pass, that both services are deployed and stable on Hugging Face Spaces, that the production anomaly endpoint is callable via the documented curl command and returns correct results, that the production analytics endpoints are wired into the production frontend correctly, and that cold-start latency is acceptable (under five seconds for the first request after idle).

## End-of-Sprint-6 Final Synchronisation

The final demo is a walk-through of the production system end to end, with the team in the room. Then the submission package is assembled: the GitHub repository link, the production URLs (frontend, four backend services, two FastAPI services), the Postman collection, the demo video, and a one-page summary of the architecture.

After submission, you celebrate. You earned it.

---

## Cross-Sprint Reference Tables

The tables below summarise what each person owns by sprint. Keep them visible during stand-ups so each person knows what they should be working on at any given time.

### Frontend Sprint Summary

| Sprint | Pages built | Key features | APIs integrated |
|---|---|---|---|
| 0 | None | Project scaffold, MSW, design system | None (mocks only) |
| 1 | Landing, Auth flows, Role dashboards (stubs) | Three.js hero, GSAP animations, i18n setup | Auth (live by end of sprint) |
| 2 | Worker dashboard, shift list, shift form | KPI tiles with count animations, form with live net calc | Earnings shifts, analytics worker summary |
| 3 | Verifier queue, verification page, CSV import page | Side-by-side verification UI, CSV polling | Earnings verification, screenshot, CSV import |
| 4 | Certificate page, public certificate, grievance board, advocate dashboard | Print layout, charts, complaint clustering UI | Certificate, grievance, analytics advocate |
| 5 | Admin panel, polish pass | i18n complete, accessibility audit, more 3D | Admin endpoints |
| 6 | None new | Tests, deployment, demo video | All endpoints in production |

### Express Backend Sprint Summary

| Sprint | Service work | APIs built |
|---|---|---|
| 0 | Four service scaffolds, DB schemas, Swagger UI setup | Health endpoints only |
| 1 | Auth service complete, earnings stub | All auth endpoints |
| 2 | Earnings shifts CRUD, screenshot upload, BullMQ scaffold | Shifts CRUD, screenshot presign and confirm, platforms, zones |
| 3 | Verification flow, CSV import worker, audit log | Verification, queue, CSV import endpoints, audit helper |
| 4 | Certificate service, grievance service | All certificate and grievance endpoints |
| 5 | Admin endpoints, hardening | All admin endpoints, finalised Postman |
| 6 | Tests, deployment to Render | Production-stable services |

### FastAPI Backend Sprint Summary

| Sprint | Service work | APIs built |
|---|---|---|
| 0 | Two service scaffolds, JWT verify dependency | Stub endpoints |
| 1 | Anomaly service complete, analytics scaffold | `/detect`, health |
| 2 | Analytics worker endpoints | Worker summary, trend, commission tracker, median compare |
| 3 | Three advocate endpoints, vulnerability MV | Commission trends, income distribution, top complaints |
| 4 | Vulnerability endpoint, caching, observability | Vulnerability flag, internal refresh |
| 5 | API key auth, judge documentation, load test | None new; hardening |
| 6 | Tests, deployment to HF Spaces | Production-stable services |

---

## Daily Stand-Up Format

Fifteen minutes every morning. Each person answers three questions: what did I finish yesterday, what am I working on today, what is blocking me. Blockers are escalated immediately — if Person A is blocked on an endpoint Person B has not built yet, the team decides on the spot whether to mock it or to reprioritise.

A weekly retrospective at the end of Sprint 3 and Sprint 5 looks back at what worked and what didn't. Adjust the plan if needed. The plan is a guide, not a prison.

---

## What to Do When Things Slip

In a real project, sprints slip. Here is how to handle it.

If frontend slips, the most expendable polish work is the Three.js scenes. The platform works without them. Strip them from Sprint 5 if you need the time elsewhere. Animations can also be downgraded from custom Framer Motion choreographies to default Tailwind transitions.

If Express backend slips, the most expendable work is the admin panel. The system can run without it, with platforms and zones seeded directly via Prisma. Defer the admin endpoints to "phase two" if you need to.

If FastAPI backend slips, the most expendable work is caching and the manual refresh endpoint. Both are nice-to-have. The vulnerability flag computation can run on demand instead of nightly.

What you cannot defer, no matter what: the anomaly endpoint judges will call (it must work and must be documented), the city-wide median (it must use real seeded data), the print-friendly certificate (the brief is explicit), the Postman collection (judges expect it), and the README per service (also explicit).

---

## Final Word

This plan is built around three engineers working productively in parallel by committing to API contracts on day one. If the team holds discipline around those contracts, you will deliver a polished, working FairGig in two weeks. If you let the contracts drift or skip the daily stand-ups, you will spend the last sprint integrating instead of polishing, and the polish is what wins competitions.

Good luck. Build something the judges will remember.
