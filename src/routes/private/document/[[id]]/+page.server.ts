import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { DocumentSchema } from '$lib/schemas/documents';
import { fetchDocument, fetchDocumentDetailsLookup, createDocument, updateDocument, deleteDocument } from '$lib/api/documents';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";

type Document = z.infer<typeof DocumentSchema>;

// Make the [[id]] optional when we are creating a new record
const crudDocumentSchema = DocumentSchema.extend({
	id: DocumentSchema.shape._key.optional(),
	filePath: DocumentSchema.shape.filePath.optional(),
	fileName: DocumentSchema.shape.filename.optional()
});

export const load = async ({ params, cookies }) => {
	// Fetch document and lookup for associated details
	let docProcessedLookups = null;
	let doc = null

	if (!params.id) {
		const form = await superValidate(null, zod(crudDocumentSchema));
		return { form, docProcessedLookups };
	}

	[doc, docProcessedLookups] = await Promise.all([
		fetchDocument(params.id, getAuthToken(cookies)),
		fetchDocumentDetailsLookup(params.id, getAuthToken(cookies))
	]);

	if (params.id && !doc) throw error(404, 'Document not found.');

	// If document is null, default values for the schema will be returned.
	const form = await superValidate(doc, zod(crudDocumentSchema));
	const image_filename = changeFileExtension(doc?.filename || '')
	return { form, docProcessedLookups, image_filename };
};


export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(crudDocumentSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Document

			const doc: Document = { ...form.data } as Document;
			const response = await createDocument(doc, getAuthToken(cookies));

			// return message(form, 'Document created');
			throw redirect(303, InternalURLs.document.concat('/',response._key));

		} else {
			// Modify document

			if (formData.has('delete')) {
				// DELETE document

				await deleteDocument(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.documents);
			} else {

				// UPDATE document
				const doc2: Document = { ...form.data} as Document;
				await updateDocument(form.data._key, doc2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};

function changeFileExtension(filename: string, new_extension: string = "png"): string {
	if (filename === undefined || filename === null || filename === '') {
		return "";
	}
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) {
		return filename + '.' + new_extension;
	}
	return filename.substring(0, lastDotIndex) + '.' + new_extension;
}
