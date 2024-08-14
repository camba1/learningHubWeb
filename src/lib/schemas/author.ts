import { z } from 'zod';

// Author Schema
export const authorSchema = z.object({
	id: z.string().uuid(), // UUID for unique author identification
	name: z.string()
		.min(1, "Author name cannot be empty")
		.max(50, "Author name cannot exceed 50 characters"), // Author's name
	bio: z.string()
		.max(1000, "Bio cannot exceed 1000 characters")
		.optional(), // Optional biography of the author
	email: z.string()
		.email("Invalid email address"), // Email of the author
	createdAt: z.coerce.date().default(() => new Date()), // Creation date of the author record
	updatedAt: z.coerce.date().optional(), // Optional updated date for the author record
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});