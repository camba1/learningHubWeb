import { ExternalURLs, DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/server/utils/externalUrls';
import { APIClient } from './apiClient';

import { type DocumentDetailPagesSchemaType } from '$lib/schemas/documentDetailPages';
import { DocumentDetailPagesSchema } from '$lib/schemas/documentDetailPages';

const DOCUMENT_DETAIL_PAGES_URL = ExternalURLs.document_detail_pages;

const documentDetailPagesClient = new APIClient<DocumentDetailPagesSchemaType>(DOCUMENT_DETAIL_PAGES_URL, DocumentDetailPagesSchema);


export async function fetchDocumentDetailPage(id: string) {

	return await documentDetailPagesClient.fetchItem(id);
}

// export async function createDocumentDetailPage(data: DocumentDetailPagesSchemaType) {
//
// 	return await documentDetailPagesClient.createItem(data)
// }

// export async function updateDocumentDetailPage(id: string, data: DocumentDetailPagesSchemaType) {
//
// 	return await documentDetailPagesClient.updateItem(id, data);
// }

export async function deleteDocumentDetailPage(id: string) {

	return await documentDetailPagesClient.deleteItem(id);
}


export async function fetchDocumentDetailPages( skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																						sort_by: string = '', sort_order = 'asc', document_detail_key: string = '',
																						created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (document_detail_key) options['document_detail_key'] = document_detail_key;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentDetailPagesClient.fetchItems(skip, limit, options);

}