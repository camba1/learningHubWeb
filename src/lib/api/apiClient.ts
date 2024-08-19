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

	private getHeader() {
		return getMainHeader('application/json');
	}

	private async fetchResource(url: string, method: string = 'GET', body:  T | null = null) {
		const options: RequestInit = {
			method,
			headers: this.getHeader(),
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

	fetchItem(id: string): Promise<T> {
		return this.fetchResource(`${this.baseURL}/${id}`);
	}

	createItem(data: T): Promise<T> {
		return this.fetchResource(`${this.baseURL}`, 'POST', data);
	}

	updateItem(id: string, data: T): Promise<T> {
		return this.fetchResource(`${this.baseURL}/${id}`, 'PUT', data);
	}

	async deleteItem(id: string): Promise<number> {
		const options: RequestInit = {
			method: 'DELETE',
			headers: this.getHeader()
		};

		const response = await fetch(`${this.baseURL}/${id}`, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}

		// No need to return a body for delete operation
		return response.status;
	}

	fetchItems(skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT, options: { [key: string]: string } = {}) {

		const params = this.build_query_string(skip, limit, options);

		return this.fetchResource(`${this.baseURL}?${params.toString()}`);
	}

	fetchDetailLookup(id: string, detailsURL: string, skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT, options: { [key: string]: string } = {}) {
		const url = detailsURL.replace('{key}', id);
		const params = this.build_query_string(skip, limit, options);

		return this.fetchResource(`${url}?${params.toString()}`);
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