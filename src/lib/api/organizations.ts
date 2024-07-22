import { ExternalURLs, DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/server/utils/externalUrls';
import { APIClient } from './apiClient';

import { type OrganizationSchemaType } from '$lib/organizations';
import { OrganizationSchema } from '$lib/organizations';

const ORGANIZATION_URL = ExternalURLs.organizations;


const organizationClient = new APIClient<OrganizationSchemaType>(ORGANIZATION_URL, OrganizationSchema);


export async function fetchOrganization(id: string) {

	return await organizationClient.fetchItem(id);
}

export async function createOrganization(data: OrganizationSchemaType) {

	return await organizationClient.createItem(data)
}

export async function updateOrganization(id: string, data: OrganizationSchemaType) {

	return await organizationClient.updateItem(id, data);
}

export async function deleteOrganization(id: string) {

	return await organizationClient.deleteItem(id);
}

export async function fetchOrganizations( skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																	sort_by: string = '', sort_order = 'asc',
																	name: string = '',
																	created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (name) options['name'] = emailAddress;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await organizationClient.fetchItems(skip, limit, options);

}