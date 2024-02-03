import { z } from 'zod';
import { users } from '@api/models';
import { createSelectSchema } from 'drizzle-zod';
export const VSRegister = createSelectSchema(users, {
  fullname: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8).nonempty(),
}).pick({
  email: true,
  password: true,
  name: true,
});

export const VSLogin = createSelectSchema(users, {
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
}).pick({
  email: true,
  password: true,
});
