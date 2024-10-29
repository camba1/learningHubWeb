import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';

//Schema for viewing images along with the prompts used to generate them
export const DocumentCharacterSchema = z.object({
	_key: z.string(), // Unique key for the document character
	docMain_key: z.string(), // Unique  identification for parent document
	charMain_key: z.string(), // Unique  identification for parent character
	character_name: z.string(),
	document_title: z.string(),
	imageFilename: z.string().optional(),
	prompt: z.string(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional()
});

export type DocumentCharacterSchemaType = z.infer<typeof DocumentCharacterSchema>;

export const DocumentCharacterSortByEnum = z.enum(['name']);
const genericSearchParams = createGenericSearchParams(DocumentCharacterSortByEnum);

export const DocumentCharacterSearchSchema = DocumentCharacterSchema.pick({
	character_name: true,
	document_title: true,
	docMain_key: true,
	charMain_key: true
}).partial().merge(genericSearchParams);

export type DocumentCharacterSearchSchemaType = z.infer<typeof DocumentCharacterSearchSchema>;