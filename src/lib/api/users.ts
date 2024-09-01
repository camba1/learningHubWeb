import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { APIClient } from './apiClient';

import { type UserSchemaType } from '$lib/schemas/users';
import { UserSchema } from '$lib/schemas/users';

const USERS_URL = ExternalURLs.users;


const userClient = new APIClient<UserSchemaType>(USERS_URL, UserSchema);


export async function fetchUser(id: string, auth:string | undefined) {

	return await userClient.fetchItem(id, auth);
}

export async function createUser(data: UserSchemaType, auth:string | undefined) {

	return await userClient.createItem(data, auth);
}

export async function updateUser(id: string, data: UserSchemaType, auth:string | undefined) {

	return await userClient.updateItem(id, data, auth);
}

export async function deleteUser(id: string, auth:string | undefined) {

	return await userClient.deleteItem(id, auth);
}

export async function fetchUsers( auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																	sort_by: string = '', sort_order = 'asc',
																	emailAddress: string = '',
																	created_by: string = '', updated_by: string = '' ) {

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (emailAddress) options['emailAddress'] = emailAddress;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;

	return await userClient.fetchItems( auth, skip, limit, options);

}