import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { DocumentLocationSchema, type DocumentLocationSchemaType } from '$lib/schemas/documentLocations';
import { fetchDocumentLocation, createDocumentLocation, updateDocumentLocation, deleteDocumentLocation } from '$lib/api/documentLocations';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";


export const load = async ({ params, cookies }) => {

	if (!params.doc_location_id) {
		const form = await superValidate(null, zod(DocumentLocationSchema));
		return { form,
			document_id: params.id
		};
	}

	const location: DocumentLocationSchemaType = await fetchDocumentLocation(params.doc_location_id, getAuthToken(cookies));

	if (params.doc_location_id && !location) throw error(404, 'Location not found.');

	const form = await superValidate(location, zod(DocumentLocationSchema));
	return { form,
		parentFilename: params.filename,
		document_id: params.id
	};
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(DocumentLocationSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Location

			const location: DocumentLocationSchemaType = { ...form.data } as DocumentLocationSchemaType;
			const response = await createDocumentLocation(location, getAuthToken(cookies));

			// return message(form, 'Document created');
			//TODO: Update the url with the document filename
			throw redirect(303, InternalURLs.document.concat('/', form.data.docMain_key, 'document_location',  '/', params.filename, '/', response._key));

		} else {
			// Modify location

			if (formData.has('delete')) {
				// DELETE location

				await deleteDocumentLocation(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.document + '/' + form.data.docMain_key);
			} else {

				// UPDATE location
				const location2: DocumentLocationSchemaType = { ...form.data} as DocumentLocationSchemaType;
				await updateDocumentLocation(form.data._key, location2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};
