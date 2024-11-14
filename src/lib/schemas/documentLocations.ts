import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';

//Schema for viewing images along with the prompts used to generate them
export const DocumentLocationSchema = z.object({
	_key: z.string(), // Unique key for the document character
	docMain_key: z.string(), // Unique  identification for parent document
	name: z.string(),
	description: z.string(),
	imageFilename: z.string().optional(),
	pagesInDocument: z.array(z.number().int().nonnegative()).optional(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional()
});

export type DocumentLocationSchemaType = z.infer<typeof DocumentLocationSchema>;

export const DocumentLocationSortByEnum = z.enum(['name']);
const genericSearchParams = createGenericSearchParams(DocumentLocationSortByEnum);

export const DocumentLocationSearchSchema = DocumentLocationSchema.pick({
	name: true,
	docMain_key: true
}).partial().merge(genericSearchParams);

export type DocumentLocationSearchSchemaType = z.infer<typeof DocumentLocationSearchSchema>;