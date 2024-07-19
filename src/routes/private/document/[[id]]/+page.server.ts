import { DocumentSchema } from '$lib/documents';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { type DocumentsProcessedLookupdDB } from '$lib/documentsProcessed';
import { InternalURLs } from '$lib/utils/urls';
import { fetchDocument, fetchDocumentDetailsLookup, createDocument, updateDocument, deleteDocument } from '$lib/api/documents';
import { z } from 'zod';

type Document = z.infer<typeof DocumentSchema>;

// Make the [id] optional when we are creating a new record
const crudDocumentSchema = DocumentSchema.extend({
	id: DocumentSchema.shape._key.optional()
});

export const load = async ({ params }) => {
	// Fetch document and lookup for associated details
	let docProcessedLookups: DocumentsProcessedLookupdDB = [];
	let doc = null

	if (!params.id) {
		const form = await superValidate(null, zod(crudDocumentSchema));
		return { form, docProcessedLookups };
	}

	[doc, docProcessedLookups] = await Promise.all([
		fetchDocument(params.id),
		fetchDocumentDetailsLookup(params.id)
	]);

	if (params.id && !doc) throw error(404, 'Document not found.');

	// If document is null, default values for the schema will be returned.
	const form = await superValidate(doc, zod(crudDocumentSchema));
	return { form, docProcessedLookups };
};


export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(crudDocumentSchema));
		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Document

			const doc: Document = { ...form.data } as Document;
			const response = await createDocument(doc);

			// return message(form, 'Document created');
			throw redirect(303, InternalURLs.document.concat('/',response._key));

		} else {
			// Modify document

			if (formData.has('delete')) {
				// DELETE document

				await deleteDocument(form.data._key);
				throw redirect(303, InternalURLs.documents);
			} else {

				// UPDATE document
				const doc2: Document = { ...form.data} as Document;
				console.log(doc2);
				await updateDocument(form.data._key, doc2);
				return message(form, 'Document updated');
			}
		}

	}
};