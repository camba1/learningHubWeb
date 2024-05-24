import { z } from 'zod';



const DocumentTypeEnum = z.enum(['book', 'article', 'other'])
const DocumentAgeGroupEnum = z.enum(['toddler', 'youth', 'young adult'])

// Document Schema
export const DocumentSchema = z.object({
	id: z.string().uuid(), // UUID for unique document identification
	title: z.string()
		.min(1, "Title cannot be empty")
		.max(250, "Title cannot exceed 250 characters"), // Title of the document
	summary: z.string().max(500, "The max size of the summary is 500 characters"), // summary of the document
	type: DocumentTypeEnum,
	ageGroup: DocumentAgeGroupEnum,
	authorId: z.string().uuid().optional(), // UUID for the unique author identification
	createdAt: z.date().default(() => new Date()), // Creation date of the document
	updatedAt: z.date().default(() => new Date()).optional(), //  Updated date for the document
	tags: z.array(z.string()).optional(), // Optional list of tags/keywords
});

type DocumentDB = z.infer<typeof DocumentSchema>[];

// A simple user "database"
export const documents: DocumentDB = [
	{
		id: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		title: "My First Document",
		summary: "This is the summary of the document.",
		type: "article",
		ageGroup: "toddler",
		authorId: "8a7f3dd5-9a61-41ce-853f-2b6345362346",
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: ["example", "tags"],
	},
	{
		id: "8a7f3dd5-9a61-41ce-853f-2b6345362342",
		title: "My Second Document",
		summary: "This is the summary of the document.",
		type: "book",
		ageGroup: "youth",
		authorId: "8a7f3dd5-9a61-41ce-853f-2b6345362346",
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: ["example", "tags"],
	}
];