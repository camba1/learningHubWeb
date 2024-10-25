import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type CharacterSchemaType } from '$lib/schemas/characters';
import { CharacterSchema } from '$lib/schemas/characters';

const CHARACTERS_URL = ExternalURLs.characters;


const characterClient = new APIClient<CharacterSchemaType>(CHARACTERS_URL, CharacterSchema);


export async function fetchCharacter(id: string, auth:string | undefined) {

	return await characterClient.fetchItem(id, auth);
}

export async function createCharacter(data: CharacterSchemaType, auth:string | undefined) {

	return await characterClient.createItem(data, auth);
}

export async function updateCharacter(id: string, data: CharacterSchemaType, auth:string | undefined) {

	return await characterClient.updateItem(id, data, auth);
}

export async function deleteCharacter(id: string, auth:string | undefined) {

	return await characterClient.deleteItem(id, auth);
}

export async function fetchCharacters( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																	sort_by: string = '', sort_order = 'asc',
																	name: string = '',
																	created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (name) options['name'] = name;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await characterClient.fetchItems( auth, skip, limit, options);

}