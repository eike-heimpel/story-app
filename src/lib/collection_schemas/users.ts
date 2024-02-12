import { z } from 'zod';


export const UsersSchema = z.object({
	name: z.string().optional(),
	avatar: z.string().optional()
});

export type UsersRecord = z.infer<typeof UsersSchema>;
