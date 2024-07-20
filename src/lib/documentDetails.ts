import { z } from 'zod';

const LanguagesEnum = z.enum(["en", "es", "fr", "de", "it", "zh", "ja", "ko", "ar"]);

export const DocumentDetailSchema = z.object({
	_key: z.string(), // Unique key for the document
	docMain_key: z.string().uuid(), // UUID for unique document identification
	language: LanguagesEnum,
	FilePath: z.string().min(5, "File path must be at least 5 characters, including file extension"), // path relative to output folder
	docText: z.string(),
	pageCount: z.number().min(1),
	createdAt: z.date().default(() => new Date()), // Date doc was first processed
	updatedAt: z.date().default(() => new Date()).optional(), //  Latest date the doc was processed
});

export const DocumentDetailLookupSchema = DocumentDetailSchema.pick({
	_key: true,
	language: true
})
export type DocumentDetailLookupSchemaType = z.infer<typeof DocumentDetailLookupSchema>;

export type DocumentDetailSchemaType = z.infer<typeof DocumentDetailSchema>;

// A simple user "database"
export const documentDetails: DocumentDetailSchemaType[] = [
	{
		_key: "7a7f3dd5-9a61-41ce-853f-2b6345362341",
		docMain_key: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		language: "en",
		FilePath: "MonsterDayOut/whats-next_beech-botha-williams.pdf",
		docText: "This is the text of the document.",
		pageCount: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: "7a7f3dd5-9a61-41ce-853f-2b6345362342",
		docMain_key: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		language: "es",
		FilePath: "MonsterDayOut/whats-next_beech-botha-williams.pdf",
		docText: "Este es el texto del documento.",
		pageCount: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_key: "7a7f3dd5-9a61-41ce-853f-2b6345362343",
		docMain_key: "8a7f3dd5-9a61-41ce-853f-2b6345362342",
		language: "en",
		FilePath: "mrs-penguins-palace_brain-oelofsen-jacobs-beckerling/mrs-penguins-palace_brain-oelofsen-jacobs-beckerling.pdf",
		docText: "This is the text of the second document.",
		pageCount: 2,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
];