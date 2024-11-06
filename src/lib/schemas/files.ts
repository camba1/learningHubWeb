import { z } from 'zod';

export const FileCategoryEnum = z.enum(['document', 'character', 'document_character']);

export const UpdateFileSchema = z.object({
	fileCategory: FileCategoryEnum.default(FileCategoryEnum.enum.document),
	content: z.string(),
	parentFilename: z.string().optional()
});

export type UpdateFileSchemaType = z.infer<typeof UpdateFileSchema>