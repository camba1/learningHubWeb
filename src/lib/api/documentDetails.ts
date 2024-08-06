import { ExternalURLs, DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/server/utils/externalUrls';
import { APIClient } from './apiClient';

import { type DocumentDetailSchemaType } from '$lib/schemas/documentDetails';
import { DocumentDetailSchema } from '$lib/schemas/documentDetails';

const DOCUMENT_DETAILS_URL = ExternalURLs.document_details;

const documentDetailClient = new APIClient<DocumentDetailSchemaType>(DOCUMENT_DETAILS_URL, DocumentDetailSchema);


export async function fetchDocumentDetail(id: string) {

	return await documentDetailClient.fetchItem(id);
}

export async function createDocumentDetail(data: DocumentDetailSchemaType) {

	return await documentDetailClient.createItem(data)
}

export async function updateDocumentDetail(id: string, data: DocumentDetailSchemaType) {

	return await documentDetailClient.updateItem(id, data);
}

export async function deleteDocumentDetail(id: string) {

	return await documentDetailClient.deleteItem(id);
}


export async function fetchDocumentDetails( skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																			 sort_by: string = '', sort_order = 'asc', document_key: string = '', filename: string = '',
																			 created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (document_key) options['document_key'] = document_key;
	if (filename) options['filename'] = filename;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;


	return await documentDetailClient.fetchItems(skip, limit, options);

}