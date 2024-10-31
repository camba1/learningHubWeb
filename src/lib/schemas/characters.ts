import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';


//Schema for viewing images along with the prompts used to generate them
export const CharacterSchema = z.object({
	_key: z.string(), // Unique key for the character
	name: z.string(),
	imageFilename: z.string().nullable().optional(),
	prompt: z.string().nullable().optional(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date of the character
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date for the character
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional()
});

export type CharacterSchemaType = z.infer<typeof CharacterSchema>;



export const DocumentsByCharacterSchema = z.object({
	_key: z.string(), // Unique key for the character
	document_title: z.string(), // name of the character
	documentFilename: z.string(), // name of the original parent document file
	imageFilename: z.string().nullable().optional(),
	docMain_key: z.string() // Unique  identification for parent document

})

export type DocumentsByCharacterSchemaType = z.infer<typeof DocumentsByCharacterSchema>;



export const CharacterSortByEnum = z.enum(['name', 'books']);
const genericSearchParams = createGenericSearchParams(CharacterSortByEnum);


export const CharacterSearchSchema = z.object({
	name: z.string(),
	document_title: z.string().optional()
}).partial().merge(genericSearchParams);

export type CharacterSearchSchemaType = z.infer<typeof CharacterSearchSchema>;