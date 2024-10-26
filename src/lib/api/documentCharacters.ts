import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type DocumentCharacterSchemaType } from '$lib/schemas/documentCharacters';
import { DocumentCharacterSchema } from '$lib/schemas/documentCharacters';

const DOCUMENT_CHARACTERS_URL = ExternalURLs.document_characters;


const documentCharacterClient = new APIClient<DocumentCharacterSchemaType>(DOCUMENT_CHARACTERS_URL, DocumentCharacterSchema);


export async function fetchDocumentCharacter(id: string, auth:string | undefined) {

	return await documentCharacterClient.fetchItem(id, auth);
}

export async function createDocumentCharacter(data: DocumentCharacterSchemaType, auth:string | undefined) {

	return await documentCharacterClient.createItem(data, auth);
}

export async function updateDocumentCharacter(id: string, data: DocumentCharacterSchemaType, auth:string | undefined) {

	return await documentCharacterClient.updateItem(id, data, auth);
}

export async function deleteDocumentCharacter(id: string, auth:string | undefined) {

	return await documentCharacterClient.deleteItem(id, auth);
}

export async function fetchDocumentCharacters( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																							 sort_by: string = '', sort_order = 'asc',
																							 name: string = '', doc_main_key: string = '',
																							 char_main_key: string = '',
																							 created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (name) options['name'] = name;
	if (doc_main_key) options['doc_main_key'] = doc_main_key;
	if (char_main_key) options['char_main_key'] = char_main_key;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentCharacterClient.fetchItems( auth, skip, limit, options);

}