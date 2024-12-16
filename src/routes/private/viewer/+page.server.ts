import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { DocumentDetailSchemaType } from '$lib/schemas/documentDetails';
import {DocumentDetailSortByEnum, DocumentDetailSearchSchema} from '$lib/schemas/documentDetails';
import { fetchDocumentDetails } from '$lib/api/documentDetails';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";




function getSearchParams(searchParams: URLSearchParams, paramName: string, altValue:string | number | undefined = undefined) {
	if (altValue !== undefined) {
		return searchParams.get(paramName) || altValue;
	}
	return searchParams.get(paramName) || undefined;
}


export const load = async ({ cookies, url}) => {

	const searchParams = url.searchParams;

	const searchObj = DocumentDetailSearchSchema.safeParse({
		skip: getSearchParams(searchParams, "skip", DEFAULT_SKIP),
		limit: getSearchParams(searchParams, "limit", DEFAULT_LIMIT),
		sort_by: getSearchParams(searchParams, "sort_by", "filename"),
		sort_order: getSearchParams(searchParams, "sort_order", "asc"),
		// title: getSearchParams(searchParams, "title"),
		language: getSearchParams(searchParams, "language"),
		filename: getSearchParams(searchParams, "filename")
	})

	if (!searchObj.success ) {
		throw error(400, { message: JSON.stringify(searchObj.error.flatten().fieldErrors) }  );
	}

	const form = await superValidate(searchObj.data, zod(DocumentDetailSearchSchema));

	if (!form.valid) return fail(400, { form });

	const docs: DocumentDetailSchemaType[] = await fetchDocumentDetails(getAuthToken(cookies), form.data.skip, form.data.limit,
		form.data.sort_by , form.data.sort_order,
		// form.data.title,
		'',
		form.data.filename,
		form.data.language);

	return {
		form: form,
		documents: docs,
		sortByEnum: DocumentDetailSortByEnum.options};
};