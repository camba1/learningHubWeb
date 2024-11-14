import { z } from 'zod';

export const LinkColumnsComponentSchema = z.object({
	_key: z.string(),
	id: z.string(),
	value: z.string()
});

export type LinkColumnsComponentSchemaType = z.infer<typeof LinkColumnsComponentSchema>;