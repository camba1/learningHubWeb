import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { backendXToken } from '$lib/server/utils/externalUrls';
type AuthInput = RequestEvent | Cookies;


/**
 * Generates a Headers object with the necessary headers for authentication and content type.
 *
 * @param auth - The authentication token. If not provided, an error will be thrown.
 * @param content_type - The content type to be set in the headers. Optional.
 * @returns A Headers object containing the 'x-token', 'Authorization', and optionally 'Content-Type' headers.
 * @throws Will throw an error if the auth token is not provided.
 */
export function getMainHeader(auth: string | undefined, content_type: string | null = null ) {
	const headers = new Headers();
	if (!auth) {
		throw new Error('Auth token not found');
	}
	if (content_type) {
		headers.append('Content-Type', content_type);
	}
	headers.append('x-token', backendXToken);
	headers.append('Authorization', `Bearer ${auth}`);
	return headers;
}


/**
 * Generates a Headers object into a plain JavaScript object. This is sometimes needed when retrieving data from
 * the backend using a non-standard fetch function. (e.g. Langchain RemoteRunnable)
 *
 * @param auth - The authentication token. If not provided, an error will be thrown.
 * @param content_type - The content type to be set in the headers. Optional.
 * @returns A plain JavaScript object representing the headers.
 * @throws Will throw an error if the auth token is not provided.
 */
export function getMainHeaderAsPlainObject(auth: string | undefined, content_type: string | null = null): Record<string, string> {
	const headers = getMainHeader(auth, content_type)
	const plainObject: Record<string, string> = {};
	headers.forEach((value, key) => {
		plainObject[key] = value;
	});
	return plainObject;
}

/**
 * Retrieves the session token from the provided Cookies object.
 *
 * @param cookies - The Cookies object from which to retrieve the session token.
 * @returns The session token.
 * @throws Will throw an error if the Cookies object is not provided or if the session token is not found.
 */
const getSessionFromCookies = (cookies: Cookies) => {
	if (!cookies) {
		throw new Error('Cookies not found when getting auth');
	}
	if (!cookies.get('__session')) {
		throw new Error('Session not found when getting auth');
	}
	return cookies.get('__session');
}

/**
 * Retrieves the authentication token from the provided input, which can be either a RequestEvent or a Cookies object.
 *
 * @param input - The input from which to retrieve the authentication token. Can be a RequestEvent or a Cookies object.
 * @returns The authentication token.
 * @throws Will throw an error if the input is not provided, if the Cookies object is not found, or if the session token is not found.
 */
export const getAuthToken = (input: AuthInput) => {
	if (!input) {
		throw new Error('Input not found when getting auth');
	}

	if ('cookies' in input) {
		// Input is a RequestEvent
		if (!input.cookies) {
			throw new Error('Cookies not found when getting auth');
		}
		return getSessionFromCookies(input.cookies);
	} else {
		// Input is a Cookies object
		return getSessionFromCookies(input);
	}
}

