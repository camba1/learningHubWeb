import { error, fail, redirect } from '@sveltejs/kit';
import { DocumentDetailSchema } from '$lib/schemas/documentDetails';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fetchDocumentDetail, updateDocumentDetail} from "$lib/api/documentDetails";
import { fetchDocumentDetailPages } from '$lib/api/documentDetailPages';
import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
import { getAuthToken } from "$lib/server/utils/headers";
import { deleteDocumentDetail } from '$lib/api/documentDetails';
import { InternalURLs } from '$lib/utils/urls';

const updateDocumentProcessedSchema = DocumentDetailSchema.extend({
	id: DocumentDetailSchema.shape._key.optional(),
	documentId: DocumentDetailSchema.shape.docMain_key.optional(),
	filename: DocumentDetailSchema.shape.filePath.optional(),
});

export async function load({ params, cookies }) {

	let docDetailPages = null;
	let docDetails = null;

	[docDetails, docDetailPages] = await Promise.all([
		fetchDocumentDetail(params.detail_id, getAuthToken(cookies)),
		 fetchDocumentDetailPages(getAuthToken(cookies),0, 10, "created_at", "desc", params.detail_id),
	]);

	if (params.detail_id && !docDetails) throw error(404, 'Document details not found.');
	if (docDetailPages && docDetailPages.length > 1) throw error(404, 'Found more than one pages detail record');

	let availableFiles: PageSchemaType[] = [];
	if (docDetails && docDetailPages.length == 1) {
		availableFiles = docDetailPages[0].pages
		availableFiles.sort((a, b) => a.number - b.number);
	}

	const form = await superValidate(docDetails, zod(DocumentDetailSchema));

	return {
		form,
		filename: params.filename,
		availableFiles: availableFiles
	};

}


export const actions = {
	default: async ({ request, cookies }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateDocumentProcessedSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			throw error(405, 'New records cannot be created in this form as they are created automatically');

		} else {
			// Modify docDetails

			if (formData.has('delete')) {

				await deleteDocumentDetail(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.document.concat('/',form.data.docMain_key));

			} else {

				const docDetail = await updateDocumentDetail(form.data._key, form.data, getAuthToken(cookies));
				const updatedForm = await superValidate(docDetail, zod(DocumentDetailSchema));
				if (!updatedForm.valid) return fail(400, { updatedForm });
				return message(updatedForm, 'Saved');
			}
		}
	}
};