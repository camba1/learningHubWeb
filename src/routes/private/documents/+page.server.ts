import { DocumentSchema } from '$lib/schemas/documents';
import { fetchDocuments } from '$lib/api/documents';
import { z } from 'zod';

type Documents = z.infer<typeof DocumentSchema>[];

export const load = async ({  params }) => {
	const docs: Documents = await fetchDocuments();
	return { documents: docs };
	// return { documents };
};