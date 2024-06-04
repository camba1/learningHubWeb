import { z } from 'zod';

const LanguagesEnum = z.enum(["en", "es"]);

export const DocumentsProcessedSchema = z.object({
	id: z.string().uuid(), // UUID for unique identification
	documentId: z.string().uuid(), // UUID for unique document identification
	language: LanguagesEnum,
	filename: z.string().min(5, "Filename must be at least 5 characters, including file extension"),
	docText: z.string(),
	pageCount: z.number().min(1),
	createdAt: z.date().default(() => new Date()), // Date doc was first processed
	updatedAt: z.date().default(() => new Date()).optional(), //  Latest date the doc was processed
});

export const DocumentsProcessedLookupSchema = DocumentsProcessedSchema.pick({
	id: true,
	language: true
})
export type DocumentsProcessedLookupdDB = z.infer<typeof DocumentsProcessedLookupSchema>[];

type DocumentsProcessedDB = z.infer<typeof DocumentsProcessedSchema>[];

// A simple user "database"
export const documentsProcessed: DocumentsProcessedDB = [
	{
		id: "7a7f3dd5-9a61-41ce-853f-2b6345362341",
		documentId: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		language: "en",
		filename: "aws-development-test-environments_1525735913.pdf",
		docText: "This is the text of the document.",
		pageCount: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "7a7f3dd5-9a61-41ce-853f-2b6345362342",
		documentId: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		language: "es",
		filename: "aws-development-test-environments_1525735913.pdf",
		docText: "Este es el texto del documento.",
		pageCount: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "7a7f3dd5-9a61-41ce-853f-2b6345362343",
		documentId: "8a7f3dd5-9a61-41ce-853f-2b6345362342",
		language: "en",
		filename: "mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf",
		docText: "This is the text of the second document.",
		pageCount: 2,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
];