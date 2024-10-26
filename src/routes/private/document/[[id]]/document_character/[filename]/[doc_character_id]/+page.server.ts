import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { DocumentCharacterSchema, type DocumentCharacterSchemaType } from '$lib/schemas/documentCharacters';
import { fetchDocumentCharacter, createDocumentCharacter, updateDocumentCharacter, deleteDocumentCharacter } from '$lib/api/documentCharacters';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";


export const load = async ({ params, cookies }) => {

	if (!params.doc_character_id) {
		const form = await superValidate(null, zod(DocumentCharacterSchema));
		return { form};
	}

	const character: DocumentCharacterSchemaType = await fetchDocumentCharacter(params.doc_character_id, getAuthToken(cookies));

	if (params.doc_character_id && !character) throw error(404, 'Character not found.');

	const form = await superValidate(character, zod(DocumentCharacterSchema));
	return { form,
		parentFilename: params.filename,
		document_id: params.id
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(DocumentCharacterSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Character

			const character: DocumentCharacterSchemaType = { ...form.data } as DocumentCharacterSchemaType;
			const response = await createDocumentCharacter(character, getAuthToken(cookies));

			// return message(form, 'Document created');
			throw redirect(303, InternalURLs.character.concat('/',response._key));

		} else {
			// Modify character

			if (formData.has('delete')) {
				// DELETE character

				await deleteDocumentCharacter(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.document + '/' + form.data.docMain_key);
			} else {

				// UPDATE character
				const character2: DocumentCharacterSchemaType = { ...form.data} as DocumentCharacterSchemaType;
				await updateDocumentCharacter(form.data._key, character2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};
