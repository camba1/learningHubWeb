import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type DocumentLocationSchemaType } from '$lib/schemas/documentLocations';
import { DocumentLocationSchema } from '$lib/schemas/documentLocations';

const DOCUMENT_CHARACTERS_URL = ExternalURLs.document_locations;


const documentLocationClient = new APIClient<DocumentLocationSchemaType>(DOCUMENT_CHARACTERS_URL, DocumentLocationSchema);


export async function fetchDocumentLocation(id: string, auth:string | undefined) {

	return await documentLocationClient.fetchItem(id, auth);
}

export async function createDocumentLocation(data: DocumentLocationSchemaType, auth:string | undefined) {

	return await documentLocationClient.createItem(data, auth);
}

export async function updateDocumentLocation(id: string, data: DocumentLocationSchemaType, auth:string | undefined) {

	return await documentLocationClient.updateItem(id, data, auth);
}

export async function deleteDocumentLocation(id: string, auth:string | undefined) {

	return await documentLocationClient.deleteItem(id, auth);
}

export async function fetchDocumentLocations( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																							 sort_by: string = '', sort_order = 'asc',
																							 name: string = '', doc_main_key: string = '',
																							 created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (name) options['name'] = name;
	if (doc_main_key) options['doc_main_key'] = doc_main_key;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentLocationClient.fetchItems( auth, skip, limit, options);

}