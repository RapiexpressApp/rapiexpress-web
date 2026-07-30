# AGENTS.md — Rapiexpress Client App (Frontend)

## Project Overview

This repository contains the **client-facing frontend** for Rapiexpress, a courier/logistics operator connecting Ecuadorian buyers with stores in the US and China through an international parcel locker (casillero) in Miami.

This app allows customers to:
- Register and log in (with password recovery)
- View and manage their international locker (Miami address)
- See a summary of their packages ("Mis Paquetes")
- Track each package's status with full history

**Out of scope for this repository:** the internal team/admin panel (package intake, status updates by staff) is a **separate project** and must not be built here. Do not add admin routes, admin-only components, or staff-facing dashboards to this codebase.

**Backend:** A .NET API (architecture and endpoints TBD) will be consumed by this frontend. All API communication must go through a centralized HTTP client — never call `fetch`/`axios` directly from components or pages.

**Package status flow (fixed, must match backend contract exactly):**
```
Bodega → Embarcado → Aduana → Agencia → Entregado
```
Do not rename, translate, or reorder these values in code — they are domain constants shared with the backend. Display labels/translations belong in the UI layer only, never in the data layer.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Language | TypeScript (strict mode) |
| Build tool | Vite |
| UI Framework | React |
| Styling / Components | Tailwind CSS + shadcn/ui |
| Server state / API calls | TanStack Query |
| Client state (session, UI) | Zustand |
| Routing | React Router |
| Backend | .NET API (separate repo, contract TBD) |

Do not introduce alternative libraries for state management, styling, or data fetching (e.g. Redux, Redux Toolkit, MUI, Chakra, plain Context+fetch) without explicit instruction — these choices were made deliberately for this project's scope.

---

## Project Structure

This project follows a **feature-based architecture**. Organize code by business domain, not by file type.

```
src/
├── app/                     # bootstrap: providers, router, root layout
│   ├── providers/           # QueryClientProvider, ThemeProvider, etc.
│   ├── router.tsx
│   └── App.tsx
│
├── pages/                   # one component per route — thin, composition only
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx        # "Mis Paquetes" summary
│   └── PackageTrackingPage.tsx  # package detail + status history
│
├── features/                # business logic grouped by domain
│   ├── auth/
│   │   ├── api/             # login, register, password recovery
│   │   ├── hooks/            # useLogin, useRegister, useSession
│   │   ├── components/       # LoginForm, RegisterForm
│   │   └── types.ts
│   ├── packages/
│   │   ├── api/              # getPackages, getPackageHistory
│   │   ├── hooks/             # usePackages, usePackageDetail
│   │   ├── components/        # PackageCard, StatusBadge, TrackingTimeline
│   │   └── types.ts
│   └── locker/                 # international locker (Miami address)
│       ├── api/
│       ├── hooks/
│       └── components/          # LockerInfoCard
│
├── shared/                    # reusable, domain-agnostic code
│   ├── components/ui/          # shadcn primitives (Button, Input, Card...)
│   ├── hooks/                   # useDebounce, useMediaQuery, etc.
│   ├── lib/                      # HTTP client (axios/fetch config, interceptors)
│   └── types/                     # shared cross-cutting types (ApiResponse, etc.)
│
└── stores/
    └── authStore.ts               # session state (JWT token), Zustand
```

### Architectural Rules

1. **`pages/` never contains business logic.** Pages compose components from `features/` and `shared/`; they don't fetch data directly or hold complex state.
2. **Features are isolated.** A feature (`auth`, `packages`, `locker`) must not import directly from another feature. If cross-feature data is needed, lift it to `shared/` or pass it via props/route params.
3. **All API calls live in `features/*/api/`** and use the shared HTTP client from `shared/lib/`. No direct `fetch`/`axios` calls elsewhere.
4. **`shared/components/ui/` holds only visual primitives** with zero domain knowledge (they don't know what a "package" or "locker" is).
5. **Server state goes through TanStack Query hooks** (`useQuery`/`useMutation`), colocated in each feature's `hooks/` folder. Don't duplicate server data into Zustand or local component state.
6. **Zustand is only for client-only state**: authenticated session/token and pure UI state (modals, sidebars, etc.). Never store server data (packages, locker info) in Zustand.

---

## Conventions

- **Naming:** `PascalCase` for components and files that export a component (`PackageCard.tsx`), `camelCase` for hooks (`usePackages.ts`) and utility functions.
- **Types:** Prefer explicit `type`/`interface` per feature in `types.ts`. Avoid `any`; use `unknown` and narrow when the shape is uncertain (e.g. before the .NET contract is finalized).
- **Component style:** Function components with named exports. Avoid default exports except for page components (required by the router).
- **Styling:** Tailwind utility classes directly in JSX. Use `shared/components/ui` (shadcn) for anything resembling a reusable primitive before writing custom markup.
- **Forms:** Validate with a schema library (e.g. Zod) paired with form state; do not hand-roll validation logic per form.
- **Environment variables:** All API base URLs and secrets go through Vite's `import.meta.env`, never hardcoded.

---

## Commands

> Update this section once `package.json` scripts are finalized.

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server
npm run build     # production build
npm run lint      # run linter
npm run preview   # preview production build locally
```

---

## What NOT to do

- Do not build or scaffold the internal/admin panel in this repository.
- Do not call the .NET API outside of `features/*/api/`.
- Do not introduce a different UI library, state manager, or data-fetching library without explicit instruction.
- Do not hardcode package status strings anywhere except the shared `PackageStatus` type/enum in `features/packages/types.ts`.
- Do not invent backend endpoints or response shapes — flag when the .NET contract is missing and use a clearly marked mock/placeholder instead.

---

## Open Decisions (track here as they're resolved)

- [ ] .NET API base URL and authentication flow (JWT? cookies?)
- [ ] Final API contract for packages, locker, and auth endpoints
- [ ] Form validation library (proposed: Zod)
- [ ] Testing strategy/framework (not yet defined)
- [ ] Deployment target
