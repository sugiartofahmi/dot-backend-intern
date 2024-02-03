import { z } from 'zod';
import { users } from '@api/models';
import { createSelectSchema } from 'drizzle-zod';
import { VSRegister } from '../auth';
export const VSCreateUser = VSRegister;

export const VSUpdateUser = createSelectSchema(users, {
  fullname: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
}).pick({
  email: true,
  password: true,
  name: true,
});
