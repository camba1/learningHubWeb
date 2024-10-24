import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { CharacterSchema, type CharacterSchemaType } from '$lib/schemas/character';
import { fetchCharacter, createCharacter, updateCharacter, deleteCharacter } from '$lib/api/characters';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";


export const load = async ({ params, cookies }) => {

	if (!params.id) {
		const form = await superValidate(null, zod(CharacterSchema));
		return { form};
	}

	const character: CharacterSchemaType = await fetchCharacter(params.id, getAuthToken(cookies));

	if (params.id && !character) throw error(404, 'Character not found.');

	const form = await superValidate(character, zod(CharacterSchema));
	return { form };
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
				throw redirect(303, InternalURLs.documents);
			} else {

				// UPDATE character
				const character2: CharacterSchemaType = { ...form.data} as CharacterSchemaType;
				await updateCharacter(form.data._key, character2, getAuthToken(cookies));
				return message(form, 'Saved');
			}
		}

	}
};
