import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { type DocumentSchemaType } from '$lib/schemas/documents';

import { APIClient } from './apiClient';
import { DocumentSchema } from '$lib/schemas/documents';

const DOCUMENTS_URL = ExternalURLs.documents;
const DOCUMENT_DETAILS_URL = ExternalURLs.document_details_lookup;


const documentClient = new APIClient<DocumentSchemaType>(DOCUMENTS_URL, DocumentSchema);


export async function fetchDocument(id: string, auth:string | undefined ) {

	return await documentClient.fetchItem(id, auth);
}

export async function createDocument(data: DocumentSchemaType, auth:string | undefined) {

	return await documentClient.createItem(data, auth);
}

export async function updateDocument(id: string, data: DocumentSchemaType, auth:string | undefined) {

	return await documentClient.updateItem(id, data, auth);
}

export async function deleteDocument(id: string, auth:string | undefined) {

	return await documentClient.deleteItem(id, auth);
}

export async function fetchDocumentDetailsLookup(id: string, auth:string | undefined, skip = DEFAULT_SKIP,
																								 limit = DEFAULT_LIMIT,
																								 sort_by: string = '', sort_order = 'asc',) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	return await documentClient.fetchDetailLookup(id, auth, DOCUMENT_DETAILS_URL, skip, limit, options);
}

export async function fetchDocuments( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																			 sort_by: string = '', sort_order = 'asc',
																			 title: string = '', age_group: string = '', type: string = '',
																			 created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (title) options['title'] = title;
	if (age_group) options['age_group'] = age_group;
	if (type) options['type'] = type;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await documentClient.fetchItems(auth, skip, limit, options);

}