import { z } from 'zod';

export const CharacterDocumentSchema = z.object({
	docMain_key: z.string(),
	name: z.string(),
})

//Schema for viewing images along with the prompts used to generate them
export const CharacterSchema = z.object({
	_key: z.string(), // Unique key for the character
	name: z.string(),
	imageFilename: z.string().optional(),
	prompt: z.string(),
	documents: z.array(CharacterDocumentSchema),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date of the character
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date for the character
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional()
});

export type CharacterSchemaType = z.infer<typeof CharacterSchema>;
export type CharacterDocumentSchemaType = z.infer<typeof CharacterDocumentSchema>;