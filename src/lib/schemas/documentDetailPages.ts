import { z } from 'zod';


export const PageSchema = z.object({
	friendlyName: z.string().readonly(),
	number: z.number().readonly(),
	filename: z.string().readonly(),
	audioFilename: z.string().optional().readonly(),
	speaker: z.string().optional().readonly()
});

export const DocumentDetailPagesSchema = z.object({
	_key: z.string().readonly(), // Unique key for the document pages
	docDetails_key: z.string().readonly(), // Unique  identification for parent document detail
	pages: z.array(PageSchema).optional().readonly(),
	createdAt: z.coerce.date().default(() => new Date()).optional().readonly(), // Date doc was first processed
	updatedAt: z.coerce.date().default(() => new Date()).optional().readonly(), //  Latest date the doc was processed
	usrMain_key_Create: z.string().optional().readonly(),
	usrMain_key_Update: z.string().optional().readonly(),
});

export type DocumentDetailPagesSchemaType = z.infer<typeof DocumentDetailPagesSchema>;
export type PageSchemaType = z.infer<typeof PageSchema>;