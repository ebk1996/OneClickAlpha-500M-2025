# Configuration Guide

Comprehensive documentation for all configuration files in the OneClickAlpha project.

---

## 📋 Table of Contents

- [TypeScript Configuration](#typescript-configuration)
- [Testing Configuration](#testing-configuration)
- [Package Configuration](#package-configuration)
- [Environment Configuration](#environment-configuration)
- [Build Configuration](#build-configuration)

---

## 🔷 TypeScript Configuration

### `tsconfig.json` - Main TypeScript Config

Primary TypeScript configuration for the entire project.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Compiler Options Explained

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `es5` | Compile to ES5 for broad browser compatibility |
| `lib` | `["dom", "dom.iterable", "es6"]` | Include DOM and ES6 type definitions |
| `allowJs` | `true` | Allow importing `.js` files |
| `skipLibCheck` | `true` | Skip type checking of declaration files (faster builds) |
| `strict` | `true` | Enable all strict type checking options |
| `noEmit` | `true` | Don't emit compiled files (Next.js handles this) |
| `esModuleInterop` | `true` | Enable better CommonJS/ES module interop |
| `module` | `esnext` | Use latest ES module syntax |
| `moduleResolution` | `bundler` | Use modern bundler resolution (Next.js 14+) |
| `resolveJsonModule` | `true` | Allow importing `.json` files |
| `isolatedModules` | `true` | Ensure each file can be safely transpiled independently |
| `jsx` | `preserve` | Keep JSX for Next.js to process |
| `incremental` | `true` | Enable incremental compilation (faster rebuilds) |

#### Path Mapping

```json
"baseUrl": ".",
"paths": { "@/*": ["./*"] }
```

**What it does:** Enables absolute imports from project root.

**Example:**
```typescript
// ❌ Before: Relative imports
import Button from '../../../components/AlphaButton';

// ✅ After: Absolute imports
import Button from '@/components/AlphaButton';
```

#### Includes & Excludes

**Included:**
- `next-env.d.ts` - Next.js type definitions
- `**/*.ts` - All TypeScript files
- `**/*.tsx` - All React TypeScript files
- `.next/types/**/*.ts` - Generated Next.js types

**Excluded:**
- `node_modules` - Third-party packages

#### Next.js Plugin

```json
"plugins": [{ "name": "next" }]
```

Enables Next.js-specific features:
- Server/Client component type checking
- Route type safety
- Enhanced IDE support

---

### `tsconfig.jest.json` - Jest-Specific Config

Extends main config with Jest-specific overrides.

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "commonjs",
    "target": "es2020",
    "lib": ["es2020", "dom"],
    "types": ["jest", "@testing-library/jest-dom", "node"]
  },
  "include": [
    "tests/**/*",
    "app/**/*",
    "components/**/*",
    "lib/**/*",
    "server/**/*",
    "bot/**/*"
  ],
  "exclude": ["node_modules", ".next", "dist", "build"]
}
```

#### Key Differences from Main Config

| Option | Main Config | Jest Config | Reason |
|--------|-------------|-------------|--------|
| `jsx` | `preserve` | `react-jsx` | Jest needs compiled JSX |
| `module` | `esnext` | `commonjs` | Jest runs in Node.js (CommonJS) |
| `target` | `es5` | `es2020` | Modern Node.js supports ES2020 |
| `types` | (none) | `["jest", "@testing-library/jest-dom", "node"]` | Include test types |

#### Why a Separate Config?

1. **Different Runtime**: Tests run in Node.js, app runs in browser
2. **Different Module System**: Jest uses CommonJS, Next.js uses ESM
3. **Test-Specific Types**: Need Jest and Testing Library types
4. **Compilation Target**: Tests can use modern JS features

---

## 🧪 Testing Configuration

### `jest.config.ts` - Jest Test Runner

Complete Jest configuration for running tests.

```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/tests/backend',
    '<rootDir>/tests/frontend',
    '<rootDir>/tests/spec',
  ],
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/spec/helpers/setup.ts'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'server/**/*.{ts,tsx}',
    'bot/**/*.{ts,tsx}',
    'components/**/*.{tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/dist/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
};

export default config;
```

#### Configuration Breakdown

**Preset**
```typescript
preset: 'ts-jest'
```
- Uses `ts-jest` to transform TypeScript files
- Automatically handles `.ts` and `.tsx` files

**Test Environment**
```typescript
testEnvironment: 'jsdom'
```
- Simulates browser environment for React components
- Provides `window`, `document`, `localStorage`, etc.
- Alternative: `'node'` for backend-only tests

**Test Location (roots)**
```typescript
roots: [
  '<rootDir>/tests/backend',
  '<rootDir>/tests/frontend',
  '<rootDir>/tests/spec',
]
```
Defines where Jest looks for tests:
- `tests/backend/` - API and server tests
- `tests/frontend/` - React component tests
- `tests/spec/` - Unit and integration tests

**Test File Patterns (testMatch)**
```typescript
testMatch: [
  '**/__tests__/**/*.ts?(x)',
  '**/?(*.)+(spec|test).ts?(x)',
]
```
Matches files:
- Inside `__tests__` directories
- Ending with `.spec.ts`, `.spec.tsx`, `.test.ts`, `.test.tsx`

**Module Name Mapping**
```typescript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```
Maps `@/` imports to project root (same as `tsconfig.json` paths):
```typescript
import { executeTrade } from '@/lib/tradeEngine';
// Resolves to: <rootDir>/lib/tradeEngine
```

**Setup Files**
```typescript
setupFilesAfterEnv: ['<rootDir>/tests/spec/helpers/setup.ts']
```
Runs before each test file:
- Configure Testing Library
- Add custom matchers
- Set global test utilities

**Coverage Collection**
```typescript
collectCoverageFrom: [
  'app/**/*.{ts,tsx}',
  'lib/**/*.{ts,tsx}',
  'server/**/*.{ts,tsx}',
  'bot/**/*.{ts,tsx}',
  'components/**/*.{tsx}',
  '!**/*.d.ts',
  '!**/node_modules/**',
  '!**/.next/**',
]
```
Includes source files, excludes:
- Type definition files (`.d.ts`)
- Dependencies (`node_modules`)
- Build artifacts (`.next`, `coverage`)

**Transform**
```typescript
transform: {
  '^.+\\.tsx?$': [
    'ts-jest',
    { tsconfig: 'tsconfig.jest.json' }
  ]
}
```
Uses `ts-jest` with Jest-specific TypeScript config.

**Test Environment Options**
```typescript
testEnvironmentOptions: {
  url: 'http://localhost:3000'
}
```
Sets base URL for JSDOM environment (useful for URL-dependent tests).

#### Running Tests

```bash
# All tests
npm test

# With coverage report
npm run test:all

# Specific suite
npm run test:backend
npm run test:frontend
npm run test:helpers

# Watch mode
npm run test:watch
```

---

### `jasmine.json` - Legacy Jasmine Config

**Status**: Deprecated (Jest is primary test runner)

```json
{
  "spec_dir": "tests",
  "spec_files": ["frontend/**/*.spec.ts"],
  "helpers": ["spec/helpers/setup.ts"],
  "random": false
}
```

**Note**: This file is kept for backward compatibility but is not actively used.

---

## 📦 Package Configuration

### `package.json` - npm Package Definition

Complete package configuration with scripts and dependencies.

```json
{
  "name": "oneclickalpha-500m",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "godmode": "concurrently \"npm run dev\" \"npm run server\" \"npm run bot\"",
    "server": "tsx watch server/server.ts",
    "test": "jest",
    "test:all": "jest --coverage",
    "test:backend": "jest --testPathPattern=tests/backend",
    "test:frontend": "jest --testPathPattern=tests/frontend",
    "test:helpers": "jest --testPathPattern=tests/spec",
    "test:watch": "jest --watch",
    "bot": "tsx bot/autoSniper.ts"
  },
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

#### npm Scripts Explained

**Development Scripts**

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start Next.js dev server on port 3000 |
| `server` | `tsx watch server/server.ts` | Start Express server with hot reload |
| `bot` | `tsx bot/autoSniper.ts` | Run trading bot |
| `godmode` | `concurrently "..."` | Run all three services simultaneously |

**Example:**
```bash
# Start everything
npm run godmode

# Output:
# [0] ✓ Ready on http://localhost:3000
# [1] ✓ Server listening on http://localhost:3001
# [2] ✓ Bot initialized
```

**Build Scripts**

| Script | Command | Purpose |
|--------|---------|---------|
| `build` | `next build` | Build optimized production bundle |
| `start` | `next start` | Start production server |

**Example:**
```bash
# Production build
npm run build
npm run start
```

**Test Scripts**

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `jest` | Run all tests once |
| `test:all` | `jest --coverage` | Run tests with coverage report |
| `test:backend` | `jest --testPathPattern=tests/backend` | Backend tests only |
| `test:frontend` | `jest --testPathPattern=tests/frontend` | Frontend tests only |
| `test:helpers` | `jest --testPathPattern=tests/spec` | Helper/spec tests only |
| `test:watch` | `jest --watch` | Watch mode for TDD |

**Example:**
```bash
# Run all tests
npm test

# Coverage report
npm run test:all
# Generates: coverage/lcov-report/index.html

# Watch mode (re-run on file changes)
npm run test:watch
```

#### Dependencies

**Production Dependencies**
```json
{
  "@duneanalytics/client-sdk": "^0.1.0",  // Dune Analytics API
  "axios": "^1.0.0",                       // HTTP client
  "ccxt": "^4.0.0",                        // Exchange integration
  "concurrently": "^8.0.0",                // Run multiple commands
  "express": "^4.18.0",                    // Backend server
  "mongoose": "^8.0.0",                    // MongoDB ODM
  "next": "14.0.0",                        // React framework
  "react": "^18.0.0",                      // UI library
  "react-dom": "^18.0.0",                  // React DOM
  "supabase": "^2.67.0",                   // Database/auth
  "tailwindcss": "^3.0.0",                 // CSS framework
  "telegraf": "^4.0.0",                    // Telegram bot
  "tsx": "^4.0.0",                         // TypeScript execution
  "typescript": "^5.0.0"                   // TypeScript compiler
}
```

**Development Dependencies**
```json
{
  "@testing-library/jest-dom": "^6.1.5",   // Jest matchers for DOM
  "@testing-library/react": "^14.1.2",     // React testing utilities
  "@types/express": "^5.0.6",              // Express TypeScript types
  "@types/jest": "^29.5.11",               // Jest TypeScript types
  "@types/node": "^20.0.0",                // Node.js TypeScript types
  "@types/supertest": "^6.0.3",            // Supertest types
  "eslint": "^8.0.0",                      // Linting
  "jest": "^29.7.0",                       // Test runner
  "jest-environment-jsdom": "^29.7.0",     // Browser environment
  "supertest": "^7.1.4",                   // API testing
  "ts-jest": "^29.1.1",                    // TypeScript Jest transformer
  "ts-node": "^10.9.2"                     // TypeScript Node.js execution
}
```

#### Version Pinning Strategy

- **Exact versions**: Next.js (`14.0.0`) - critical framework
- **Caret (^)**: Most dependencies - allow patch/minor updates
- **Why caret?**: Automatic security patches while maintaining compatibility

---

## 🌍 Environment Configuration

### `.env.example` - Development Template

Template for local development environment variables.

**Structure:**
```bash
# ===== SERVER CONFIGURATION =====
EXPRESS_SERVER_PORT=3001
NODE_ENV=development

# ===== AUTHENTICATION & SECURITY =====
API_KEY=your_secure_api_key_here_minimum_10_characters

# ===== DATABASE =====
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/oneclickalpha

# ===== FRONTEND =====
NEXT_PUBLIC_API_URL=http://localhost:3001

# ===== OPTIONAL: AUTO-SNIPER BOT =====
AUTO_SNIPER_ENABLED=false
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# ... (see ENV_VARIABLES.md for complete list)
```

**Setup:**
```bash
cp .env.example .env
# Edit .env with your actual values
```

### `.env.production.example` - Production Template

Template for production deployments.

**Key Differences:**
- Production RPC URLs (mainnet)
- Secure MongoDB connection strings
- HTTPS frontend URLs
- Production API keys

**See:** [ENV_VARIABLES.md](ENV_VARIABLES.md) for complete documentation.

---

## 🔨 Build Configuration

### Next.js Configuration (Implicit)

Next.js uses convention-based configuration. Key defaults:

**Pages:** `app/` directory (App Router)  
**Public Files:** `public/` directory (if created)  
**Output:** `.next/` directory  

**Custom Config:** Create `next.config.js` if needed:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
```

### TailwindCSS Configuration (Implicit)

Configured via PostCSS. If needed, create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🔍 Configuration Troubleshooting

### Common Issues

**Issue: Absolute imports not working**
```
Error: Cannot find module '@/components/Button'
```
**Fix:** Check `tsconfig.json` has:
```json
"baseUrl": ".",
"paths": { "@/*": ["./*"] }
```

**Issue: Jest can't find modules**
```
Cannot find module '@/lib/tradeEngine'
```
**Fix:** Check `jest.config.ts` has:
```typescript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

**Issue: Tests fail with JSX errors**
```
SyntaxError: Unexpected token <
```
**Fix:** Check `tsconfig.jest.json` has:
```json
"jsx": "react-jsx"
```

**Issue: Environment variables undefined**
```
process.env.API_KEY is undefined
```
**Fix:**
1. Create `.env` from `.env.example`
2. Restart dev server
3. Use `NEXT_PUBLIC_` prefix for client-side vars

---

## 📚 Additional Resources

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Jest Documentation**: https://jestjs.io/docs/configuration
- **Next.js Config**: https://nextjs.org/docs/app/api-reference/next-config-js
- **npm scripts**: https://docs.npmjs.com/cli/v9/using-npm/scripts

---

**For environment variable details, see [ENV_VARIABLES.md](ENV_VARIABLES.md)**  
**For testing workflow, see [TESTING_GUIDE.md](TESTING_GUIDE.md)**
