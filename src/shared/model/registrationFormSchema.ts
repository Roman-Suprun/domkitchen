import { z } from 'zod';

export const registrationFormSchema = z.object({
  firstName: z.string().min(2, 'Fist name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  email: z.string().email('Invalid email'),
});
