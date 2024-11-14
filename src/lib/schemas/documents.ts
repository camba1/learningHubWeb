import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';


export const DocumentTypeEnum = z.enum(['book', 'article', 'other'])
export const DocumentAgeGroupEnum = z.enum(['Toddler', 'Early Reader', 'Young Reader', 'Young Adult'])

// Document Schema
export const DocumentSchema = z.object({
	_key: z.string(), // Unique key for the document
	title: z.string()
		.min(1, "Title cannot be empty")
		.max(250, "Title cannot exceed 250 characters"), // Title of the document
	summary: z.string().max(2500, "The max size of the summary is 2500 characters"), // summary of the document
	type: DocumentTypeEnum,
	ageGroup: DocumentAgeGroupEnum,
	authorId: z.string().optional(), // Id for the unique author identification
	authorName: z.string().default("").optional(),
	filePath: z.string().min(5, 'File path must be at least 5 characters, including file extension'), // path relative to output folder
	filename: z.string().min(5, 'Filename must be at least 5 characters, including file extension'),
	pageCount: z.number().int().gt(0).default(1).optional(),
	// characters: z.array(z.string()).optional(), //	Optional list of main document characters
	tags: z.array(z.string()).optional(), // Optional list of tags/keywords
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date of the document
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date for the document
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;

// Document search schema for selection screens

export const DocumentSortByEnum = z.enum(['title', 'type', 'ageGroup']);
const genericSearchParams = createGenericSearchParams(DocumentSortByEnum);

export const DocumentSearchSchema = DocumentSchema.pick({
	title: true,
	type: true,
	ageGroup: true,
}).partial().merge(genericSearchParams);

export type DocumentSearchSchemaType = z.infer<typeof DocumentSearchSchema>;


export const DocumentLocationLookup = z.object({
	_key: z.string(), // Unique key for the document character
	docMain_key: z.string(), // Unique  identification for parent document
	name: z.string(),
});

export type DocumentLocationLookupType = z.infer<typeof DocumentLocationLookup>;


export const DocumentCharacterLookup = z.object({
	_key: z.string(), // Unique key for the document character
	docMain_key: z.string(), // Unique  identification for parent document
	charMain_key: z.string(), // Unique  identification for parent character
	character_name: z.string(),
});

export type DocumentCharacterLookupType = z.infer<typeof DocumentCharacterLookup>;


// A simple document "database"
export const documents: DocumentSchemaType[] = [
	{
		_key: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		title: 'My First Document',
		summary: 'This is the summary of the document.',
		type: 'article',
		ageGroup: 'Toddler',
		authorId: '8a7f3dd5-9a61-41ce-853f-2b6345362346',
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: ['example', 'tags'],
		usrMain_key_Create: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		usrMain_key_Update: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		authorName: '',
		filePath: '',
		filename: '',
		pageCount: 12
	},
	{
		_key: '8a7f3dd5-9a61-41ce-853f-2b6345362342',
		title: 'My Second Document',
		summary: 'This is the summary of the document.',
		type: 'book',
		ageGroup: 'Early Reader',
		authorId: '8a7f3dd5-9a61-41ce-853f-2b6345362346',
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: ['example', 'tags'],
		usrMain_key_Create: '8a7f3dd5-9a61-41ce-853f-2b6345362342',
		usrMain_key_Update: '8a7f3dd5-9a61-41ce-853f-2b6345362342',
		authorName: '',
		filePath: '',
		filename: '',
		pageCount: 5
	}
];