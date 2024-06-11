import { DocumentSchema } from '$lib/documents';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { documents } from '$lib/documents';
import { newId } from '$lib/idGenerator'
import { documentsProcessed, type DocumentsProcessedLookupdDB } from '$lib/documentsProcessed';
import { InternalURLs } from '$lib/utils/urls';


// Make the [id] optional when we are creating a new record
const crudDocumentSchema = DocumentSchema.extend({
	id: DocumentSchema.shape.id.optional()
});

export const load = async ({ params }) => {
	// READ document
	const doc = documents.find((d) => d.id == params.id);

	if (params.id && !doc) throw error(404, 'Document not found.');

	// If document is null, default values for the schema will be returned.
	const form = await superValidate(doc, zod(crudDocumentSchema));
	const docProcessedLookups = getProcessedDocuments(params.id)

	return { form, docProcessedLookups };
};

function getProcessedDocuments(documentId: string | undefined) {
	const lookups: DocumentsProcessedLookupdDB = [];
	if (documentId) {
		const docsProcessed = documentsProcessed.filter((d) => d.documentId == documentId);
		for (const docP of docsProcessed) {
			lookups.push({ id: docP.id, language: docP.language });
		}
	}
	return lookups
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(crudDocumentSchema));
		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			// CREATE Document
			const newDocId = newId()
			const doc = { ...form.data, id: newDocId };
			documents.push(doc);

			// return message(form, 'Document created');
			throw redirect(303, InternalURLs.document.concat('/',newDocId));

		} else {
			// UPDATE document
			const index = documents.findIndex((d) => d.id == form.data.id);
			if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				// DELETE document
				documents.splice(index, 1);
				throw redirect(303, InternalURLs.documents);
			} else {
				documents[index] = { ...form.data, id: form.data.id };
				return message(form, 'Document updated');
			}
		}

	}
};