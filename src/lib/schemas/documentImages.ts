import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';

//Schema for viewing images along with the prompts used to generate them
export const DocumentImageSchema = z.object({
	_key: z.string(), // Unique key for the document character
	docMain_key: z.string(), // Unique  identification for parent document
	imageFilename: z.string().optional(),
	documentFilename: z.string(),
	prompt: z.string().optional(),
	pageNumber: z.number().int().nonnegative(),
	pageFriendlyName: z.string(),
	animationFilename: z.string().optional(),
	animationPrompt: z.string().optional().nullish(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional()
});

export type DocumentImageSchemaType = z.infer<typeof DocumentImageSchema>;

export const DocumentImageSortByEnum = z.enum(['pageNumber']);
const genericSearchParams = createGenericSearchParams(DocumentImageSortByEnum);

export const DocumentImageSearchSchema = DocumentImageSchema.pick({
	pageNumber: true,
	pageFriendlyName: true,
	docMain_key: true
}).partial().merge(genericSearchParams);

export type DocumentImageSearchSchemaType = z.infer<typeof DocumentImageSearchSchema>;