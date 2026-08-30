// Environment variable utilities for testing
export const mockEnv = (variables: Record<string, string | undefined>) => {
  const originalEnv = process.env;
  process.env = { ...originalEnv, ...variables };
  return () => {
    process.env = originalEnv;
  };
};

export const requiredEnvVars = {
  PRODUCTION: [
    'API_KEY',
    'MONGODB_URI',
    'EXPRESS_SERVER_PORT',
    'NODE_ENV',
  ],
  OPTIONAL: [
    'TELEGRAM_BOT_TOKEN',
    'NANSEN_API_KEY',
    'TATUM_API_KEY',
    'ALCHEMY_URL',
    'TATUM_ETHEREUM_RPC',
    'NEXT_PUBLIC_API_URL',
  ],
  FEATURE_FLAGS: [
    'AUTO_SNIPER_ENABLED',
    'ENABLE_NANSEN',
    'ENABLE_TATUM',
    'ENABLE_ALCHEMY',
  ],
};

export const validateEnv = (envVar: string | undefined, pattern: RegExp): boolean => {
  return envVar ? pattern.test(envVar) : false;
};

export const envPatterns = {
  port: /^\d+$/,
  apiKey: /.{10,}/,
  mongoUri: /^mongodb(\+srv)?:\/\/.+/,
  url: /^https?:\/\/.+/,
  telegramToken: /^[0-9]{8,12}:.+/,
  boolean: /^(true|false)$/i,
};
