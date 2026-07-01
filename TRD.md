# Technical Requirements Document (TRD)

**Project:** Bhratrumandal Pune — Matrimonial Mobile App
**Version:** 1.0.0
**Document date:** 2026-07-01
**Status:** UI prototype (mock data / mock auth; no backend integration yet)

---

## 1. Overview

Bhratrumandal Pune is a cross-platform (iOS / Android / Web) matrimonial
application built with **React Native** and the **Expo** managed workflow. The
current codebase is a **front-end prototype**: it ships a complete, themed UI —
authentication flow, profile feed, search, matches, wishlist, and a full-screen
profile detail view — driven by **local mock data** and **mock OTP auth**. The
networking / backend integration layer (`src/services/`) is scaffolded but not
yet implemented.

The React Native app is a port of an earlier **SwiftUI** prototype (preserved in
git history); many source files reference their SwiftUI origins in comments.

---

## 2. Technology Stack

### 2.1 Core Platform

| Layer | Technology | Version | Notes |
| --- | --- | --- | --- |
| Language | TypeScript | ~6.0.3 | `strict` mode enabled; extends `expo/tsconfig.base` |
| UI framework | React | 19.2.3 | Function components + hooks throughout |
| Mobile runtime | React Native | 0.85.3 | New-architecture-era RN |
| App platform / tooling | Expo (SDK) | ~56.0.12 | Managed workflow; Metro bundler |
| Bundler | Metro | (bundled with RN/Expo) | Default RN JavaScript bundler |
| Package manager | npm | — | `package-lock.json` committed |
| Runtime (dev) | Node.js | v25.x (local) | Used for Expo CLI / tooling |

### 2.2 Navigation

| Package | Version | Purpose |
| --- | --- | --- |
| `@react-navigation/native` | ^7.3.4 | Navigation container / core |
| `@react-navigation/native-stack` | ^7.17.6 | Native stack for the auth flow (Splash → Login → OTP/Signup) |
| `react-native-screens` | 4.25.2 | Native screen primitives (perf) |
| `react-native-safe-area-context` | ~5.7.0 | Safe-area insets across notches/home indicators |

> **Note:** The main authenticated area (Home / Search / Matches / Wishlist /
> Profile) does **not** use a navigator library. `MainTabs.tsx` implements a
> **custom tab host** with `useState` and a bespoke floating `BottomTabBar`
> component, conditionally rendering the active screen.

### 2.3 UI / Presentation

| Package | Version | Purpose |
| --- | --- | --- |
| `@expo/vector-icons` | ^15.0.2 | Icon set for tabs, actions, chrome |
| `expo-font` | ~56.0.7 | Font loading (registered as an Expo config plugin) |
| `expo-status-bar` | ~56.0.4 | Status-bar styling (`style="dark"`) |
| React Native `StyleSheet` | (core) | All styling; no CSS-in-JS or UI kit |

- **Typography:** No custom `fontFamily` is set — the OS system face is used
  (SF Pro Display on iOS, Roboto on Android), matching the design spec.
- **Design system:** A hand-rolled token system under `src/theme/`
  (colors, typography, spacing/radius/shadow/animation).

### 2.4 State Management

State is managed entirely with **React Context + hooks** (no Redux/MobX/Zustand):

| Context | File | Responsibility |
| --- | --- | --- |
| `AuthContext` | `src/context/AuthContext.tsx` | Phone/OTP fields, `isLoggedIn`, mock OTP verification, login/logout |
| `WishlistContext` | `src/context/WishlistContext.tsx` | `liked` / `shortlisted` sets, toggle actions, badge counts |
| `ProfileViewerContext` | `src/context/ProfileViewerContext.tsx` | Drives the full-screen profile detail viewer |

### 2.5 Data Layer

- **Current:** Static mock data in `src/data/mockProfiles.ts` typed against
  `src/types/index.ts` (`User`, `Profile`).
- **Planned:** `src/services/` (see `README.md`) — `auth.ts`
  (`sendOtp` / `verifyOtp`) and `profiles.ts` (match feed), backed by a trusted
  backend, with the session token stored in `expo-secure-store`.

### 2.6 Build & Configuration

| File | Purpose |
| --- | --- |
| `app.json` | Expo app config — name, slug, scheme (`bhratrumandalpune`), icons, adaptive Android icon, `expo-font` plugin, light UI style |
| `package.json` | Dependencies + scripts (`start`, `android`, `ios`, `web`) |
| `tsconfig.json` | TypeScript config (extends Expo base, strict) |
| `index.ts` | Entry point — `registerRootComponent(App)` |
| `App.tsx` | Provider composition + navigation container |

Native `ios/` and `android/` folders are **git-ignored** (generated on demand via
Expo prebuild / EAS), confirming a managed-workflow setup.

---

## 3. Application Architecture

### 3.1 Provider / Entry Composition

`index.ts` → `App.tsx`, which nests providers:

```
SafeAreaProvider
└─ AuthProvider
   └─ WishlistProvider
      └─ NavigationContainer
         ├─ StatusBar (dark)
         └─ RootNavigator
```

### 3.2 Navigation Model

- **`RootNavigator`** switches on `useAuth().isLoggedIn`:
  - **Logged out:** native-stack auth flow — `Splash → Login → OTP → Signup`
    (headers hidden).
  - **Logged in:** `MainTabs` (wrapped in `ProfileViewerProvider`).
- **`MainTabs`** is a custom tab controller (local `active` tab state) rendering
  one of five screens plus a floating `BottomTabBar` with live badge counts.

### 3.3 Directory Structure

```
src/
├── components/     Reusable UI (Avatar, ProfileCard, PrimaryButton,
│                   OtpInput, SearchBar, FilterChips, SkeletonCard, etc.)
├── context/        AuthContext, WishlistContext, ProfileViewerContext
├── data/           mockProfiles.ts (seed feed data)
├── navigation/     RootNavigator, MainTabs, tab/route type definitions
├── screens/        Splash, Login, OTP, Signup, Home, Search, Matches,
│                   Wishlist, Profile, ProfileDetail
├── services/       (planned) API integration layer — README only
├── theme/          colors, typography, layout tokens + barrel index
└── types/          Domain models (User, Profile)
```

---

## 4. Design System (Theme Tokens)

Centralized under `src/theme/` and re-exported from `theme/index.ts`. Ad-hoc
values are disallowed by convention — extend the token set instead.

- **Colors** (`colors.ts`) — Premium, trust-focused matrimonial palette.
  Primary "Deep Matrimony Red" `#C62828` (pressed `#A81E1E`, soft `#FBEAEA`);
  neutral surfaces (`#FFFFFF` / `#F8F8F8`); text `#222222` / `#666666`; state
  colors for success/warning/error.
- **Typography** (`typography.ts`) — Scale from `largeTitle` (32/700) down to
  `caption` (13/400); system font face, no bundled fonts.
- **Layout** (`layout.ts`):
  - **Spacing scale:** `xs:4 … giant:64` — the only permitted margin/padding/gap values.
  - **Radius:** button 16, card 20, input 14, image 20, sheet 28, pill 999.
  - **Shadow:** `soft` and `float` presets (low opacity, large blur).
  - **Motion:** `ANIM_DURATION = 250ms`, `PRESS_SCALE = 0.97`.

---

## 5. Feature Scope (Current Build)

| Area | Status | Implementation |
| --- | --- | --- |
| Splash / onboarding | ✅ | `SplashScreen` |
| Phone + OTP login | ⚠️ Mock | Hardcoded `MOCK_OTP = '123456'`, 10-digit phone validation |
| Signup | ✅ (UI) | `SignupScreen`, `StepIndicator` |
| Profile feed (Home) | ✅ (mock) | `HomeScreen` + `ProfileCard` from `mockProfiles` |
| Search + filters | ✅ (UI) | `SearchScreen`, `SearchBar`, `FilterChips` |
| Matches | ✅ | `MatchesScreen` (badge = liked count) |
| Wishlist / shortlist | ✅ | `WishlistScreen`, `WishlistContext` |
| Full-screen profile detail | ✅ | `ProfileDetailScreen` + `ProfileViewerContext` |
| Loading states | ✅ | `SkeletonCard`, `EmptyState` |

---

## 6. Non-Functional & Platform Requirements

- **Target platforms:** iOS (tablet-supported), Android (adaptive + monochrome
  icons, predictive back disabled), Web (favicon configured).
- **Orientation:** Portrait only.
- **UI style:** Light mode (`userInterfaceStyle: "light"`).
- **Deep linking scheme:** `bhratrumandalpune`.
- **Type safety:** TypeScript `strict` mode across the codebase.

---

## 7. Known Gaps / Technical Debt

These are explicitly flagged in code comments and must be addressed before
production:

1. **Auth is mock-only.** OTP is hardcoded and `isLoggedIn` is a client-side
   boolean. Real OTP issuance/verification and session tokens must move to a
   trusted backend, with tokens in `expo-secure-store`.
2. **No backend integration.** `src/services/` is a stub (README only); the feed
   is static mock data.
3. **No persistence.** Wishlist/like state is in-memory and resets on reload.
4. **No profile images.** Cards render initials-based placeholders tinted via the
   `tint` field; real image assets/CDN are not wired.
5. **No automated tests, CI, or linting config** present in the repository.

---

## 8. Recommended Additions (Roadmap Hooks)

To move from prototype to product, the stack would likely extend with:

- **Networking:** a typed API client (e.g. `fetch`/`axios` + React Query) in
  `src/services/`.
- **Secure storage:** `expo-secure-store` for session tokens.
- **Backend:** OTP/auth provider + profiles/matches API.
- **Build/release:** EAS Build & Submit; environment config via `.env`.
- **Quality:** ESLint/Prettier, unit tests (Jest + React Native Testing Library).

---

*Generated from source inspection of the repository on 2026-07-01.*
