import { z } from 'zod';

const LanguagesEnum = z.enum(['english', 'spanish', 'french', 'german', 'italian', 'Chinese', 'japanese', 'korean', 'arabic', 'portuguese']);

export const DocumentDetailSchema = z.object({
	_key: z.string(), // Unique key for the document
	docMain_key: z.string(), // Unique  identification for parent document
	language: LanguagesEnum,
	filePath: z.string().min(5, 'File path must be at least 5 characters, including file extension'), // path relative to output folder
	filename: z.string().min(5, 'Filename must be at least 5 characters, including file extension'),
	docText: z.string(),
	createdAt: z.date().default(() => new Date()), // Date doc was first processed
	updatedAt: z.date().default(() => new Date()).optional(), //  Latest date the doc was processed
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});

export const DocumentDetailLookupSchema = DocumentDetailSchema.pick({
	_key: true,
	language: true
})
export type DocumentDetailLookupSchemaType = z.infer<typeof DocumentDetailLookupSchema>;

export type DocumentDetailSchemaType = z.infer<typeof DocumentDetailSchema>;

// A simple user 'database'
export const documentDetails: DocumentDetailSchemaType[] = [
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362341',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		language: 'en',
		filePath: 'MonsterDayOut/whats-next_beech-botha-williams.pdf',
		filename: 'whats-next_beech-botha-williams.pdf',
		docText: 'This is the text of the document.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362342',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362341',
		language: 'es',
		filePath: 'MonsterDayOut/whats-next_beech-botha-williams.pdf',
		filename: 'whats-next_beech-botha-williams.pdf',
		docText: 'Este es el texto del documento.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: '7a7f3dd5-9a61-41ce-853f-2b6345362343',
		docMain_key: '8a7f3dd5-9a61-41ce-853f-2b6345362342',
		language: 'en',
		filePath: 'mrs-penguins-palace_brain-oelofsen-jacobs-beckerling/mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf',
		filename: 'mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf',
		docText: 'This is the text of the second document.',
		createdAt: new Date(),
		updatedAt: new Date(),
	}
];