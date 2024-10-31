import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { CharacterSchema, type CharacterSchemaType } from '$lib/schemas/characters';
import { fetchCharacter, createCharacter, updateCharacter, deleteCharacter, fetchDocumentsByCharacter } from '$lib/api/characters';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";


export const load = async ({ params, cookies }) => {
	let docs = null;
	let character = null

	if (!params.id) {
		const form = await superValidate(null, zod(CharacterSchema));
		return { form};
	}

	// const character: CharacterSchemaType = await fetchCharacter(params.id, getAuthToken(cookies));
	[character, docs] = await Promise.all([
		fetchCharacter(params.id, getAuthToken(cookies)),
		fetchDocumentsByCharacter(getAuthToken(cookies), params.id, 0, 100, "document_title", "asc")
	]);

	if (params.id && !character) throw error(404, 'Character not found.');
	const form = await superValidate(character, zod(CharacterSchema));
	return { form, docs };
};


export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(CharacterSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			// CREATE Character

			const character: CharacterSchemaType = { ...form.data } as CharacterSchemaType;
			const response = await createCharacter(character, getAuthToken(cookies));

			// return message(form, 'Document created');
			throw redirect(303, InternalURLs.character.concat('/',response._key));

		} else {
			// Modify character

			if (formData.has('delete')) {
				// DELETE character

				await deleteCharacter(form.data._key, getAuthToken(cookies));
				throw redirect(303, InternalURLs.characters);
			} else {

				// UPDATE character
				const character2: CharacterSchemaType = { ...form.data} as CharacterSchemaType;
				await updateCharacter(form.data._key, character2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};
