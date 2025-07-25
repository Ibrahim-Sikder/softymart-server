import { z } from 'zod';
export const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    tenantDomain: z.string(),
  }),
});



export const userValidations = {
  createUserValidation,
};
