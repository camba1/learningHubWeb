import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions, error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { InternalURLs } from '$lib/utils/urls';
import { type DocumentDetailsFromDocSchemaType } from '$lib/schemas/documentDetails';
import { DocumentDetailsFromDocSchema } from '$lib/schemas/documentDetails';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { getMainHeader } from "$lib/server/utils/headers";

type DocumentDetailsFromDoc = z.infer<typeof DocumentDetailsFromDocSchema>;


export async function load({ params }) {
	if (!params.filename) throw error(404, 'Filename not found.');
	if (!params.id) throw error(404, 'Parent id not found.');

	const filename = decodeURI(params.filename);
	const parentId = decodeURI(params.id);

	const form_data: DocumentDetailsFromDoc = {
		filename: filename,
		target_language: "spanish",
		document_key: parentId
	}

	const form = await superValidate(form_data, zod(DocumentDetailsFromDocSchema))

	return {
		form
	}
}

export const actions: Actions = {
	default: async ({ request, params }) => {

		if (!params.filename) throw error(404, 'Filename not found.');

		const formData = await request.formData();
		const form = await superValidate(formData, zod(DocumentDetailsFromDocSchema));


		if (!form.valid) {
			return fail(400, { form });
		}
		const post_data: DocumentDetailsFromDoc = { ...form.data } as DocumentDetailsFromDoc;
		post_data.filename = post_data.filename.replace('.pdf', '.md')

		const url =  encodeURI(ExternalURLs.document_details_from_doc.replace('{key}', post_data.document_key));  //detailsURL.replace('{key}', id);

		const new_detail_info = await post_version(url, post_data);

		const newUrl = `${InternalURLs.document}/${params.id}/document_detail/${encodeURIComponent(params.filename)}/${new_detail_info._key}`;
		throw redirect(303, newUrl);
	},
};


async function post_version(url: string, body: DocumentDetailsFromDocSchemaType){
	const options: RequestInit = {
		method: 'POST',
		// headers: getHeader(),
		headers: getMainHeader('application/json'),
		body: JSON.stringify(body)
	};
	const response = await fetch(url, options);

	if (!response.ok) {
		throw error(response.status, await response.text());
	}

	return  await response.json();
}