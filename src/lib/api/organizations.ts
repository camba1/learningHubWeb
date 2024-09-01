import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type OrganizationSchemaType } from '$lib/schemas/orgnaizations';
import { OrganizationSchema } from '$lib/schemas/orgnaizations';

const ORGANIZATION_URL = ExternalURLs.organizations;


const organizationClient = new APIClient<OrganizationSchemaType>(ORGANIZATION_URL, OrganizationSchema);


export async function fetchOrganization(id: string, auth:string | undefined) {

	return await organizationClient.fetchItem(id, auth);
}

export async function createOrganization(data: OrganizationSchemaType, auth:string | undefined) {

	return await organizationClient.createItem(data, auth);
}

export async function updateOrganization(id: string, data: OrganizationSchemaType, auth:string | undefined) {

	return await organizationClient.updateItem(id, data, auth);
}

export async function deleteOrganization(id: string, auth:string | undefined) {

	return await organizationClient.deleteItem(id, auth);
}

export async function fetchOrganizations( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																	sort_by: string = '', sort_order = 'asc',
																	name: string = '',
																	created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (name) options['name'] = name;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await organizationClient.fetchItems( auth, skip, limit, options);

}