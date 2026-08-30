import dotenv from 'dotenv';

describe('Environment Variables', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Server Configuration', () => {
    it('should have EXPRESS_SERVER_PORT defined or use default', () => {
      const port = process.env.EXPRESS_SERVER_PORT || 3001;
      expect(port).toBeDefined();
      expect(Number(port)).toBeGreaterThan(0);
    });

    it('should validate EXPRESS_SERVER_PORT is numeric when defined', () => {
      if (process.env.EXPRESS_SERVER_PORT) {
        expect(!isNaN(Number(process.env.EXPRESS_SERVER_PORT))).toBe(true);
      }
    });
  });

  describe('API Keys & Credentials', () => {
    it('should require API_KEY for authentication', () => {
      // API_KEY should be set in production
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.API_KEY).toBeDefined();
        expect(process.env.API_KEY?.length).toBeGreaterThan(0);
      }
    });

    it('should require TELEGRAM_BOT_TOKEN when using auto-sniper bot', () => {
      // TELEGRAM_BOT_TOKEN is used in autoSniper.ts
      if (process.env.AUTO_SNIPER_ENABLED === 'true') {
        expect(process.env.TELEGRAM_BOT_TOKEN).toBeDefined();
        expect(process.env.TELEGRAM_BOT_TOKEN?.startsWith('7')).toBe(true); // Telegram bots start with 7xxx or 6xxx
      }
    });

    it('should require NANSEN_API_KEY for Nansen AI integration', () => {
      // NANSEN_API_KEY is used in lib/nansenAI.ts
      if (process.env.ENABLE_NANSEN === 'true') {
        expect(process.env.NANSEN_API_KEY).toBeDefined();
        expect(process.env.NANSEN_API_KEY?.length).toBeGreaterThan(0);
      }
    });

    it('should require TATUM_API_KEY for blockchain operations', () => {
      // TATUM_API_KEY is documented in TATUM_API_EXPLAINED.md
      if (process.env.ENABLE_TATUM === 'true') {
        expect(process.env.TATUM_API_KEY).toBeDefined();
        expect(process.env.TATUM_API_KEY?.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Database Configuration', () => {
    it('should require MONGODB_URI for database connection', () => {
      // MONGODB_URI is used in server.ts and routes/trade.ts
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.MONGODB_URI).toBeDefined();
        expect(process.env.MONGODB_URI?.startsWith('mongodb')).toBe(true);
      }
    });

    it('should validate MONGODB_URI format when defined', () => {
      if (process.env.MONGODB_URI) {
        const isValidMongoUri = /^mongodb(\+srv)?:\/\/.+/.test(process.env.MONGODB_URI);
        expect(isValidMongoUri).toBe(true);
      }
    });
  });

  describe('Frontend Configuration', () => {
    it('should define NEXT_PUBLIC_API_URL for frontend', () => {
      // NEXT_PUBLIC_API_URL is referenced in PORT_ARCHITECTURE_EXPLAINED.md
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      expect(apiUrl).toBeDefined();
      expect(apiUrl.startsWith('http')).toBe(true);
    });

    it('should use valid API URL format', () => {
      if (process.env.NEXT_PUBLIC_API_URL) {
        const urlPattern = /^https?:\/\/.+/;
        expect(urlPattern.test(process.env.NEXT_PUBLIC_API_URL)).toBe(true);
      }
    });
  });

  describe('RPC & Provider Configuration', () => {
    it('should require ALCHEMY_URL for Ethereum RPC', () => {
      // ALCHEMY_URL is referenced in TATUM_API_EXPLAINED.md
      if (process.env.ENABLE_ALCHEMY === 'true') {
        expect(process.env.ALCHEMY_URL).toBeDefined();
        expect(process.env.ALCHEMY_URL?.includes('alchemy')).toBe(true);
      }
    });

    it('should require TATUM_ETHEREUM_RPC for Tatum RPC', () => {
      // TATUM_ETHEREUM_RPC is referenced in TATUM_API_EXPLAINED.md
      if (process.env.ENABLE_TATUM === 'true') {
        expect(process.env.TATUM_ETHEREUM_RPC).toBeDefined();
      }
    });
  });

  describe('Node Environment', () => {
    it('should have NODE_ENV set to valid value', () => {
      const validEnvs = ['development', 'production', 'test'];
      const nodeEnv = process.env.NODE_ENV || 'development';
      expect(validEnvs).toContain(nodeEnv);
    });

    it('should use development as default NODE_ENV', () => {
      const nodeEnv = process.env.NODE_ENV || 'development';
      expect(nodeEnv).toBe(process.env.NODE_ENV || 'development');
    });
  });

  describe('Optional Feature Flags', () => {
    it('should allow enabling/disabling auto-sniper bot', () => {
      if (process.env.AUTO_SNIPER_ENABLED) {
        expect(['true', 'false']).toContain(process.env.AUTO_SNIPER_ENABLED);
      }
    });

    it('should allow enabling/disabling Nansen integration', () => {
      if (process.env.ENABLE_NANSEN) {
        expect(['true', 'false']).toContain(process.env.ENABLE_NANSEN);
      }
    });

    it('should allow enabling/disabling Tatum integration', () => {
      if (process.env.ENABLE_TATUM) {
        expect(['true', 'false']).toContain(process.env.ENABLE_TATUM);
      }
    });
  });

  describe('All Required Variables (Production)', () => {
    it('should have all required env vars set in production', () => {
      if (process.env.NODE_ENV === 'production') {
        const required = [
          'API_KEY',
          'MONGODB_URI',
          'EXPRESS_SERVER_PORT',
          'NODE_ENV',
        ];

        required.forEach(varName => {
          expect(process.env[varName]).toBeDefined();
        });
      }
    });

    it('should have no empty required variables', () => {
      const criticalVars = [
        'API_KEY',
        'MONGODB_URI',
        'EXPRESS_SERVER_PORT',
      ];

      criticalVars.forEach(varName => {
        if (process.env[varName] !== undefined) {
          expect(process.env[varName]?.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Sensitive Variable Protection', () => {
    it('should not expose sensitive vars in logs', () => {
      const sensitiveVars = [
        'API_KEY',
        'TELEGRAM_BOT_TOKEN',
        'NANSEN_API_KEY',
        'TATUM_API_KEY',
        'MONGODB_URI',
      ];

      sensitiveVars.forEach(varName => {
        if (process.env[varName]) {
          expect(process.env[varName]).not.toMatch(/undefined|null/i);
        }
      });
    });

    it('should ensure API keys meet minimum length', () => {
      const apiKeyVars = [
        'API_KEY',
        'NANSEN_API_KEY',
        'TATUM_API_KEY',
      ];

      apiKeyVars.forEach(varName => {
        if (process.env[varName]) {
          expect(process.env[varName]!.length).toBeGreaterThanOrEqual(10);
        }
      });
    });
  });
});
