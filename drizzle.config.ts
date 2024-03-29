import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/schema*',
  out: './src/models/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
