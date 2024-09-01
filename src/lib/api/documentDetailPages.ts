import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type DocumentDetailPagesSchemaType } from '$lib/schemas/documentDetailPages';
import { DocumentDetailPagesSchema } from '$lib/schemas/documentDetailPages';

const DOCUMENT_DETAIL_PAGES_URL = ExternalURLs.document_detail_pages;

const documentDetailPagesClient = new APIClient<DocumentDetailPagesSchemaType>(DOCUMENT_DETAIL_PAGES_URL, DocumentDetailPagesSchema);


export async function fetchDocumentDetailPage(id: string, auth:string | undefined) {

	return await documentDetailPagesClient.fetchItem(id, auth);
}

// export async function createDocumentDetailPage(data: DocumentDetailPagesSchemaType, auth:string | undefined) {
//
// 	return await documentDetailPagesClient.createItem(data, auth);
// }

// export async function updateDocumentDetailPage(id: string, data: DocumentDetailPagesSchemaType, auth:string | undefined) {
//
// 	return await documentDetailPagesClient.updateItem(id, auth, data);
// }

export async function deleteDocumentDetailPage(id: string, auth:string | undefined) {

	return await documentDetailPagesClient.deleteItem(id, auth);
}


export async function fetchDocumentDetailPages(auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																						sort_by: string = '', sort_order = 'asc', document_detail_key: string = '',
																						created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (document_detail_key) options['document_detail_key'] = document_detail_key;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentDetailPagesClient.fetchItems(auth, skip, limit, options);

}