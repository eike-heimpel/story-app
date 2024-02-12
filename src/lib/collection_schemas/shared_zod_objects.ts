import { z } from 'zod';

export const commonZodFields = {
    name: z.string().max(40),
    one_line_description: z.string().min(5).max(200),
     age: z.number().int().min(0).max(9999),
	short_description: z.string().min(100).max(400),
	long_description: z.string().min(400).max(4000),
    user: z.string()

}
