import { users } from '@api/models';
import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

export const VSLogin = createSelectSchema(users).pick({
  email: true,
  password: true,
});
export const VSRegister = z.object({
  ...VSLogin.shape,
  ...createInsertSchema(users).pick({
    fullname: true,
  }).shape,
});
