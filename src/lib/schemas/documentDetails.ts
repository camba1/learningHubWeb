import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';

export const LanguagesEnum = z.enum(['english', 'spanish', 'french', 'german', 'italian', 'Chinese', 'japanese', 'korean', 'arabic', 'portuguese']);

export const DocumentDetailSchema = z.object({
	_key: z.string(), // Unique key for the document
	docMain_key: z.string(), // Unique  identification for parent document
	language: LanguagesEnum,
	title: z.string().min(1, "Title cannot be empty"), // Title of the document in the given language
	filePath: z.string().min(5, 'File path must be at least 5 characters, including file extension').optional(), // path relative to output folder
	filename: z.string().min(5, 'Filename must be at least 5 characters, including file extension').optional(),
	docText: z.string(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Date doc was first processed
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Latest date the doc was processed
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});

export const DocumentDetailLookupSchema = DocumentDetailSchema.pick({
	_key: true,
	language: true
})

export const DocumentDetailsFromDocSchema = z.object({
	filename: z.string().min(5, 'Filename must be at least 5 characters, including file extension'),
	target_language: LanguagesEnum,
	document_key: z.string()
})

export type DocumentDetailLookupSchemaType = z.infer<typeof DocumentDetailLookupSchema>;

export type DocumentDetailsFromDocSchemaType = z.infer<typeof DocumentDetailsFromDocSchema>;

export type DocumentDetailSchemaType = z.infer<typeof DocumentDetailSchema>;


// Document Detail search schema for selection screens

export const DocumentDetailSortByEnum = z.enum(['title','filename', 'language']);
const genericSearchParams = createGenericSearchParams(DocumentDetailSortByEnum);

export const DocumentDetailSearchSchema = DocumentDetailSchema.pick({
	filename: true,
	language: true,
	title: true
}).partial().merge(genericSearchParams);

export type DocumentDetailSearchSchemaType = z.infer<typeof DocumentDetailSearchSchema>;




// A simple user 'database'
export const documentDetails: DocumentDetailSchemaType[] = [
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362341',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		title: "My First Document",
		language: 'english',
		filePath: 'MonsterDayOut/whats-next_beech-botha-williams.pdf',
		filename: 'whats-next_beech-botha-williams.pdf',
		docText: 'This is the text of the document.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362342',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		language: 'spanish',
		title: "Mi Primer Documento",
		filePath: 'MonsterDayOut/whats-next_beech-botha-williams.pdf',
		filename: 'whats-next_beech-botha-williams.pdf',
		docText: 'Este es el texto del documento.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362343',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362342',
		language: 'english',
		title: "My Second Document",
		filePath: 'mrs-penguins-palace_brain-oelofsen-jacobs-beckerling/mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf',
		filename: 'mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf',
		docText: 'This is the text of the second document.',
		createdAt: new Date(),
		updatedAt: new Date(),
	}
];