import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { DocumentImageSchema, type DocumentImageSchemaType } from '$lib/schemas/documentImages';
import { fetchDocumentImage, createDocumentImage, updateDocumentImage, deleteDocumentImage } from '$lib/api/documentImages';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";


export const load = async ({ params, cookies }) => {
	if (!params.doc_image_id) {
		const form = await superValidate(null, zod(DocumentImageSchema));
		return { form,
			document_id: params.id
		};
	}
	const image: DocumentImageSchemaType = await fetchDocumentImage(params.doc_image_id, getAuthToken(cookies));

	if (params.doc_image_id && !image) throw error(404, 'Image not found.');

	const form = await superValidate(image, zod(DocumentImageSchema));
	return { form,
		parentFilename: params.filename,
		document_id: params.id
	};
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(DocumentImageSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Image

			const image: DocumentImageSchemaType = { ...form.data } as DocumentImageSchemaType;
			const response = await createDocumentImage(image, getAuthToken(cookies));

			throw redirect(303, InternalURLs.document.concat('/', form.data.docMain_key, 'document_image',  '/', params.filename, '/', response._key));

		} else {
			// Modify image

			if (formData.has('delete')) {
				// DELETE image

				await deleteDocumentImage(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.document + '/' + form.data.docMain_key);
			} else {

				// UPDATE image
				const image2: DocumentImageSchemaType = { ...form.data} as DocumentImageSchemaType;
				await updateDocumentImage(form.data._key, image2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};
