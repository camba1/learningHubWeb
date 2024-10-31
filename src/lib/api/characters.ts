import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type CharacterSchemaType } from '$lib/schemas/characters';
import { CharacterSchema } from '$lib/schemas/characters';
import { get_standard_options } from '$lib/server/utils/fetchUtils';

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

	const options: { [key: string]: string } = get_standard_options(sort_by, sort_order, created_by, updated_by);

	if (name) options['name'] = name;

	return await characterClient.fetchItems( auth, skip, limit, options);

}


export async function fetchCharactersDocuments( auth:string | undefined,
																								skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																								sort_by: string = '', sort_order = 'asc',
																								name: string = '',
																								document_title: string = '',
																								created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = get_standard_options(sort_by, sort_order, created_by, updated_by);
	if (name) options['character_name'] = name;
	if (document_title) options['document_title'] = document_title;

	return await characterClient.fetchDetailLookup( "", auth, ExternalURLs.characters_documents, skip, limit, options);

}

export async function fetchDocumentsByCharacter( auth:string | undefined, id: string,
																								skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																								sort_by: string = '', sort_order = 'asc',
																								created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = get_standard_options(sort_by, sort_order, created_by, updated_by);

	const url = ExternalURLs.characters_documents_by_character.replace('{key}', id);

	return await characterClient.fetchDetailLookup("", auth, url, skip, limit, options);
}