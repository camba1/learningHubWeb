import { DocumentSchema } from '$lib/documents';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { documents } from '$lib/documents';
import { newId } from '$lib/idGenerator'

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
	return { form, documents };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(crudDocumentSchema));
		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			// CREATE Document
			const doc = { ...form.data, id: newId() };
			documents.push(doc);

			return message(form, 'Document created');

		} else {
			// UPDATE document
			const index = documents.findIndex((d) => d.id == form.data.id);
			if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				// DELETE document
				documents.splice(index, 1);
				throw redirect(303, '/documents');
			} else {
				documents[index] = { ...form.data, id: form.data.id };
				return message(form, 'Document updated');
			}
		}

	}
};