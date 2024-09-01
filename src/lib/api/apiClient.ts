import type { ZodSchema } from 'zod';
import { error } from '@sveltejs/kit';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';
import { getMainHeader } from '$lib/server/utils/headers';

export class APIClient<T> {
	baseURL: string;
	schema: ZodSchema<T>; // Accept a schema for validation

	constructor(baseURL: string, schema: ZodSchema<T>) {
		this.baseURL = baseURL;
		this.schema = schema;
	}

	// private getHeader() {
	// 	return getMainHeader('application/json');
	// }

	private async fetchResource(url: string, auth:string | undefined, method: string = 'GET', body:  T | null = null) {
		const options: RequestInit = {
			method,
			headers: getMainHeader(auth, 'application/json'),
		};

		if (body) {
			options.body = JSON.stringify(body);
		}

		const response = await fetch(url, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}

		return  await response.json();
	}

	fetchItem(id: string, auth:string | undefined,): Promise<T> {
		return this.fetchResource(`${this.baseURL}/${id}`, auth);
	}

	createItem(data: T, auth:string | undefined,): Promise<T> {
		return this.fetchResource(`${this.baseURL}`, auth, 'POST', data);
	}

	updateItem(id: string, data: T, auth:string | undefined,): Promise<T> {
		return this.fetchResource(`${this.baseURL}/${id}`, auth, 'PUT', data);
	}

	async deleteItem(id: string, auth:string | undefined,): Promise<number> {
		const options: RequestInit = {
			method: 'DELETE',
			headers: getMainHeader(auth, 'application/json'),
		};

		const response = await fetch(`${this.baseURL}/${id}`, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}

		// No need to return a body for delete operation
		return response.status;
	}

	fetchItems(auth:string | undefined, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT, options: { [key: string]: string } = {}) {

		const params = this.build_query_string(skip, limit, options);

		return this.fetchResource(`${this.baseURL}?${params.toString()}`, auth);
	}

	fetchDetailLookup(id: string, auth:string | undefined, detailsURL: string, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT, options: { [key: string]: string } = {}) {
		const url = detailsURL.replace('{key}', id);
		const params = this.build_query_string(skip, limit, options);

		return this.fetchResource(`${url}?${params.toString()}`, auth);
	}

	private build_query_string(skip: number, limit: number, options: { [p: string]: string }) {

		const params = new URLSearchParams();

		params.append('skip', skip.toString());
		params.append('limit', limit.toString());
		Object.keys(options).forEach((key) => {
			if (options[key]) {
				params.append(key, options[key]);
			}
		});
		return params;
	}
}