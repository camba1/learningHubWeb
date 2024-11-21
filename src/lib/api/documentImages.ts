import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type DocumentImageSchemaType } from '$lib/schemas/documentImages';
import { DocumentImageSchema } from '$lib/schemas/documentImages';

const DOCUMENT_CHARACTERS_URL = ExternalURLs.document_images;


const documentImageClient = new APIClient<DocumentImageSchemaType>(DOCUMENT_CHARACTERS_URL, DocumentImageSchema);


export async function fetchDocumentImage(id: string, auth:string | undefined) {

	return await documentImageClient.fetchItem(id, auth);
}

export async function createDocumentImage(data: DocumentImageSchemaType, auth:string | undefined) {

	return await documentImageClient.createItem(data, auth);
}

export async function updateDocumentImage(id: string, data: DocumentImageSchemaType, auth:string | undefined) {

	return await documentImageClient.updateItem(id, data, auth);
}

export async function deleteDocumentImage(id: string, auth:string | undefined) {

	return await documentImageClient.deleteItem(id, auth);
}

export async function fetchDocumentImages( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																							sort_by: string = '', sort_order = 'asc',
																							page_number: string = '',  doc_main_key: string = '',
																							created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (page_number) options['page_number'] = page_number.toString();
	if (doc_main_key) options['doc_main_key'] = doc_main_key;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentImageClient.fetchItems( auth, skip, limit, options);

}