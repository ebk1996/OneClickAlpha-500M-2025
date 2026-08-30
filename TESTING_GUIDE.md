# Testing Guide

Complete guide to the OneClickAlpha testing infrastructure, best practices, and workflow.

---

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Testing Philosophy

### Why We Test

1. **Reliability**: Ensure trading logic works correctly with real money
2. **Refactoring Safety**: Change code confidently without breaking features
3. **Documentation**: Tests serve as executable specifications
4. **Regression Prevention**: Catch bugs before they reach production

### Testing Pyramid

```
        /\
       /  \
      /E2E \        Few - Slow - Expensive
     /------\
    /  API   \      Some - Medium - Moderate
   /----------\
  / Unit Tests \    Many - Fast - Cheap
 /--------------\
```

**Our Strategy:**
- **70% Unit Tests** - Individual functions and components
- **20% Integration Tests** - API routes and database interactions
- **10% E2E Tests** - Full user workflows (future)

---

## 📁 Test Structure

### Directory Organization

```
tests/
├── backend/                # API and server tests
│   └── tradeRoutes.spec.ts
├── frontend/               # React component tests
│   ├── AlphaButton.spec.tsx
│   └── QuadfectaPanel.spec.tsx
└── spec/                   # Unit tests and helpers
    ├── env.spec.ts
    └── helpers/
        ├── setup.ts        # Test configuration
        └── envVarHelpers.ts # Test utilities
```

### Test File Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Unit Test | `[filename].spec.ts` | `tradeEngine.spec.ts` |
| Component Test | `[ComponentName].spec.tsx` | `AlphaButton.spec.tsx` |
| Integration Test | `[feature].spec.ts` | `tradeRoutes.spec.ts` |

**Rule:** Test files mirror source file structure:
```
lib/tradeEngine.ts      → tests/spec/tradeEngine.spec.ts
components/Button.tsx   → tests/frontend/Button.spec.tsx
server/routes/trade.ts  → tests/backend/tradeRoutes.spec.ts
```

---

## 🚀 Running Tests

### Quick Reference

```bash
# Run all tests (once)
npm test

# Run with coverage report
npm run test:all

# Watch mode (TDD)
npm run test:watch

# Specific test suite
npm run test:backend    # Backend only
npm run test:frontend   # Frontend only
npm run test:helpers    # Spec/helpers only

# Run single test file
npx jest tests/backend/tradeRoutes.spec.ts

# Run tests matching pattern
npx jest --testNamePattern="should execute trade"
```

### Output Examples

**Successful Test Run:**
```
PASS tests/backend/tradeRoutes.spec.ts
  Trade Routes
    ✓ should execute trade successfully (45ms)
    ✓ should return 401 for invalid API key (12ms)
    ✓ should validate trade parameters (8ms)

PASS tests/frontend/AlphaButton.spec.tsx
  AlphaButton Component
    ✓ should render with correct text (23ms)
    ✓ should call onClick handler (15ms)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.245s
```

**Failed Test:**
```
FAIL tests/backend/tradeRoutes.spec.ts
  Trade Routes
    ✕ should execute trade successfully (52ms)

  ● Trade Routes › should execute trade successfully

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 500

      24 |     const response = await request(app).post('/api/trade');
      25 |
    > 26 |     expect(response.status).toBe(200);
         |                             ^
      27 |   });

    at Object.<anonymous> (tests/backend/tradeRoutes.spec.ts:26:29)
```

### Coverage Report

```bash
npm run test:all
```

Generates coverage report at `coverage/lcov-report/index.html`:

```
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   78.45 |    65.23 |   82.11 |   79.33 |
 lib/                     |   85.67 |    72.45 |   88.92 |   86.21 |
  tradeEngine.ts          |   92.34 |    85.71 |   95.00 |   93.12 |
  quadfectaEngine.ts      |   78.92 |    59.18 |   82.83 |   79.29 |
 components/              |   71.23 |    58.01 |   75.39 |   72.45 |
  AlphaButton.tsx         |   88.45 |    75.00 |   90.00 |   89.23 |
  QuadfectaPanel.tsx      |   54.01 |    41.02 |   60.78 |   55.67 |
--------------------------|---------|----------|---------|---------|
```

**Coverage Thresholds:**
- ✅ **> 80%**: Excellent
- ⚠️ **60-80%**: Good, improve critical paths
- ❌ **< 60%**: Needs more tests

---

## ✍️ Writing Tests

### Backend Tests (API Routes)

**Example:** `tests/backend/tradeRoutes.spec.ts`

```typescript
import request from 'supertest';
import express from 'express';
import tradeRoutes from '@/server/routes/trade';

describe('Trade Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/trade', tradeRoutes);
  });

  describe('POST /api/trade/execute', () => {
    it('should execute trade successfully', async () => {
      const tradeParams = {
        token: 'ETH',
        amount: 1000,
        side: 'buy'
      };

      const response = await request(app)
        .post('/api/trade/execute')
        .set('x-api-key', process.env.API_KEY)
        .send(tradeParams);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('txHash');
      expect(response.body.status).toBe('success');
    });

    it('should return 401 for missing API key', async () => {
      const response = await request(app)
        .post('/api/trade/execute')
        .send({ token: 'ETH', amount: 1000 });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
    });

    it('should validate trade parameters', async () => {
      const invalidParams = { token: 'ETH' }; // Missing amount

      const response = await request(app)
        .post('/api/trade/execute')
        .set('x-api-key', process.env.API_KEY)
        .send(invalidParams);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('amount');
    });
  });
});
```

**Key Patterns:**
- Use `supertest` for HTTP assertions
- Test happy path AND error cases
- Verify status codes and response structure
- Mock external dependencies

---

### Frontend Tests (React Components)

**Example:** `tests/frontend/AlphaButton.spec.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import AlphaButton from '@/components/AlphaButton';

describe('AlphaButton Component', () => {
  it('should render with correct text', () => {
    render(<AlphaButton>Execute Trade</AlphaButton>);
    
    const button = screen.getByText('Execute Trade');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<AlphaButton onClick={handleClick}>Click Me</AlphaButton>);
    
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<AlphaButton disabled>Disabled</AlphaButton>);
    
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('should apply correct variant styles', () => {
    render(<AlphaButton variant="primary">Primary</AlphaButton>);
    
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('btn-primary');
  });
});
```

**Key Patterns:**
- Use `@testing-library/react` for component testing
- Test user interactions (clicks, inputs)
- Verify rendering and accessibility
- Check conditional styling and states

---

### Unit Tests (Core Logic)

**Example:** `tests/spec/env.spec.ts`

```typescript
import { mockEnvVars, restoreEnvVars } from './helpers/envVarHelpers';

describe('Environment Variables', () => {
  beforeEach(() => {
    mockEnvVars();
  });

  afterEach(() => {
    restoreEnvVars();
  });

  describe('Required Variables', () => {
    it('should have API_KEY defined', () => {
      expect(process.env.API_KEY).toBeDefined();
      expect(process.env.API_KEY!.length).toBeGreaterThanOrEqual(10);
    });

    it('should have valid MONGODB_URI format', () => {
      const uri = process.env.MONGODB_URI;
      expect(uri).toBeDefined();
      expect(uri).toMatch(/^mongodb(\+srv)?:\/\//);
    });

    it('should have valid EXPRESS_SERVER_PORT', () => {
      const port = Number(process.env.EXPRESS_SERVER_PORT);
      expect(port).toBeGreaterThan(1024);
      expect(port).toBeLessThan(65535);
    });
  });

  describe('Optional Feature Flags', () => {
    it('should have boolean AUTO_SNIPER_ENABLED', () => {
      const enabled = process.env.AUTO_SNIPER_ENABLED;
      expect(['true', 'false']).toContain(enabled);
    });
  });
});
```

**Key Patterns:**
- Test pure functions in isolation
- Use `beforeEach`/`afterEach` for setup/teardown
- Validate edge cases and error handling
- Mock external dependencies

---

## 📊 Test Coverage

### What to Test

**Critical Paths (100% Coverage):**
- ✅ Trade execution logic
- ✅ Authentication/authorization
- ✅ Environment variable validation
- ✅ Database operations
- ✅ Error handling

**Important Features (80%+ Coverage):**
- ✅ API routes
- ✅ Data fetching
- ✅ Signal processing
- ✅ UI components with business logic

**Nice to Have (60%+ Coverage):**
- ⚠️ Utility functions
- ⚠️ Presentational components
- ⚠️ Configuration loaders

**Skip Testing:**
- ❌ Third-party library code
- ❌ Type definitions
- ❌ Simple getters/setters
- ❌ Configuration files

### Viewing Coverage

```bash
npm run test:all
```

Open `coverage/lcov-report/index.html` in browser for visual report.

**Coverage Report Features:**
- Line-by-line coverage highlighting
- Uncovered lines marked in red
- Branch coverage details
- Function coverage stats

---

## 🎯 Best Practices

### 1. Test Behavior, Not Implementation

**❌ Bad: Testing implementation details**
```typescript
it('should call setState with correct value', () => {
  const component = new MyComponent();
  component.setState = jest.fn();
  component.handleClick();
  expect(component.setState).toHaveBeenCalledWith({ clicked: true });
});
```

**✅ Good: Testing user-facing behavior**
```typescript
it('should show success message after clicking', () => {
  render(<MyComponent />);
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Success!')).toBeInTheDocument();
});
```

### 2. Use Descriptive Test Names

**❌ Bad:**
```typescript
it('works', () => { ... });
it('test1', () => { ... });
```

**✅ Good:**
```typescript
it('should execute trade when balance is sufficient', () => { ... });
it('should return 401 when API key is missing', () => { ... });
```

### 3. Arrange-Act-Assert Pattern

```typescript
it('should calculate profit correctly', () => {
  // Arrange - Set up test data
  const buyPrice = 100;
  const sellPrice = 150;
  const quantity = 10;

  // Act - Execute the function
  const profit = calculateProfit(buyPrice, sellPrice, quantity);

  // Assert - Verify the result
  expect(profit).toBe(500);
});
```

### 4. Mock External Dependencies

```typescript
// Mock axios for API calls
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('should fetch whale data', async () => {
  mockedAxios.get.mockResolvedValue({
    data: { address: '0x123', balance: 1000000 }
  });

  const data = await fetchWhaleData('0x123');
  expect(data.balance).toBe(1000000);
});
```

### 5. Test Edge Cases

```typescript
describe('executeTrade', () => {
  it('should execute successful trade', () => { ... });
  
  // Edge cases
  it('should reject trade with zero amount', () => { ... });
  it('should reject trade with insufficient balance', () => { ... });
  it('should handle network timeouts', () => { ... });
  it('should handle invalid token addresses', () => { ... });
});
```

### 6. Keep Tests Independent

**❌ Bad: Tests depend on each other**
```typescript
let globalState;

it('test 1', () => {
  globalState = { value: 42 };
});

it('test 2', () => {
  expect(globalState.value).toBe(42); // Depends on test 1!
});
```

**✅ Good: Each test is independent**
```typescript
beforeEach(() => {
  globalState = { value: 42 };
});

it('test 1', () => {
  expect(globalState.value).toBe(42);
});

it('test 2', () => {
  expect(globalState.value).toBe(42);
});
```

---

## 🔧 Test Utilities

### Helper Functions

**`tests/spec/helpers/envVarHelpers.ts`**

```typescript
export function mockEnvVars() {
  process.env.API_KEY = 'test_api_key_1234567890';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
  process.env.EXPRESS_SERVER_PORT = '3001';
  // ... more mock values
}

export function restoreEnvVars() {
  delete process.env.API_KEY;
  delete process.env.MONGODB_URI;
  // ... restore original values
}
```

**Usage:**
```typescript
beforeEach(() => mockEnvVars());
afterEach(() => restoreEnvVars());
```

### Setup File

**`tests/spec/helpers/setup.ts`**

```typescript
import '@testing-library/jest-dom';

// Global test configuration
beforeAll(() => {
  // Setup before all tests
});

afterAll(() => {
  // Cleanup after all tests
});
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Tests timeout**
```
Error: Timeout - Async callback was not invoked within 5000ms
```
**Fix:**
```typescript
it('should complete async operation', async () => {
  await expect(longRunningOperation()).resolves.toBe(expected);
}, 10000); // Increase timeout to 10s
```

**Issue: Module not found**
```
Cannot find module '@/lib/tradeEngine'
```
**Fix:** Check `jest.config.ts` has correct `moduleNameMapper`:
```typescript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

**Issue: React component tests fail**
```
ReferenceError: document is not defined
```
**Fix:** Ensure `jest.config.ts` has:
```typescript
testEnvironment: 'jsdom'
```

**Issue: Environment variables undefined in tests**
```
expect(process.env.API_KEY).toBeDefined()
Expected: defined
Received: undefined
```
**Fix:** Use helper function to mock env vars:
```typescript
import { mockEnvVars } from './helpers/envVarHelpers';
beforeEach(() => mockEnvVars());
```

---

## 📚 Testing Resources

- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **React Testing Library**: https://testing-library.com/react
- **Supertest**: https://github.com/visionmedia/supertest
- **Testing Best Practices**: https://testingjavascript.com/

---

## ✅ Testing Checklist

Before committing code:

- [ ] All tests pass (`npm test`)
- [ ] New features have tests
- [ ] Coverage remains above 70%
- [ ] No skipped tests (`.skip()`)
- [ ] No focused tests (`.only()`)
- [ ] Tests are independent
- [ ] Edge cases covered
- [ ] Async operations properly awaited

---

**For configuration details, see [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md)**  
**For development workflow, see [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md)**
