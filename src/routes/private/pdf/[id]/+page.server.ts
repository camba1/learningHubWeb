import { error, fail, redirect } from '@sveltejs/kit';
import { DocumentDetailSchema } from '$lib/schemas/documentDetails';
import { documentDetails } from '$lib/schemas/documentDetails';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fetchDocumentDetail, updateDocumentDetail} from "$lib/api/documentDetails";
import { fetchDocumentDetailPages } from '$lib/api/documentDetailPages';
import type { PageSchemaType } from '$lib/schemas/documentDetailPages';

const updateDocumentProcessedSchema = DocumentDetailSchema.extend({
	id: DocumentDetailSchema.shape._key.optional(),
	documentId: DocumentDetailSchema.shape.docMain_key.optional(),
	filename: DocumentDetailSchema.shape.filePath.optional(),
});

export async function load({ params, url }) {

	if (!url.searchParams.has("filename")) throw error(404, 'Filename not found.');

	let docDetailPages = null;
	let docDetails = null;

	[docDetails, docDetailPages] = await Promise.all([
		fetchDocumentDetail(params.id),
		 fetchDocumentDetailPages(0, 10, "created_at", "desc", params.id),
	]);

	if (params.id && !docDetails) throw error(404, 'Document details not found.');
	if (docDetailPages && docDetailPages.length > 1) throw error(404, 'Found more than one pages detail record');

	let availableFiles: PageSchemaType[] = [];
	if (docDetails && docDetailPages.length == 1) {
		availableFiles = docDetailPages[0].pages
	}
	console.log(availableFiles)

	const form = await superValidate(docDetails, zod(DocumentDetailSchema));

	const filename = url.searchParams.get("filename") || "";

	return {
		form,
		filename: filename,
		availableFiles: availableFiles
	};

}



export const actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateDocumentProcessedSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			throw error(405, 'New records cannot be created in this form as they are created automatically');

		} else {
			// Modify docDetails
			const index = documentDetails.findIndex((d) => d._key == form.data._key);
			// if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				console.log("DELETE")
				// DELETE docDetail
				const parentDocumentId = documentDetails[index].docMain_key
				documentDetails.splice(index, 1);
				throw redirect(303, '/document/'.concat(parentDocumentId));

			} else {

				console.log("UPDATE")
				console.log(form.data);
				const docDetail = await updateDocumentDetail(form.data._key, form.data);
				const updatedForm = await superValidate(docDetail, zod(DocumentDetailSchema));

				if (!updatedForm.valid) return fail(400, { updatedForm });
				return message(updatedForm, 'Document updated');
			}
		}

		// return { form };
	}
};