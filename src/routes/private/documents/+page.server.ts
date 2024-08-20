import type { DocumentSchemaType } from '$lib/schemas/documents';
import {DocumentSortByEnum, DocumentSearchSchema} from '$lib/schemas/documents';
import { fetchDocuments } from '$lib/api/documents';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '$lib/utils/urls';
import { error } from '@sveltejs/kit';



function getSearchParams(searchParams: URLSearchParams, paramName: string, altValue:string | number | undefined = undefined) {
	if (altValue !== undefined) {
		return searchParams.get(paramName) || altValue;
	}
	return searchParams.get(paramName) || undefined;
}


export const load = async (params) => {

	const searchParams = params.url.searchParams;

	const searchObj = DocumentSearchSchema.safeParse({
		skip: getSearchParams(searchParams, "skip", DEFAULT_SKIP),
		limit: getSearchParams(searchParams, "limit", DEFAULT_LIMIT),
		sort_by: getSearchParams(searchParams, "sort_by", "title"),
		sort_order: getSearchParams(searchParams, "sort_order", "asc"),
		title: getSearchParams(searchParams, "title"),
		type: getSearchParams(searchParams, "type"),
		ageGroup: getSearchParams(searchParams, "ageGroup")
	})
	if (!searchObj.success ) {
		throw error(400, { message: JSON.stringify(searchObj.error.flatten().fieldErrors) }  );
	}

	const form = await superValidate(searchObj.data, zod(DocumentSearchSchema));

	if (!form.valid) return fail(400, { form });

	const docs: DocumentSchemaType[] = await fetchDocuments(form.data.skip, form.data.limit,
		form.data.sort_by , form.data.sort_order,
		form.data.title, form.data.ageGroup,
		form.data.type);

	return {
		form: form,
		documents: docs,
		sortByEnum: DocumentSortByEnum.options};
};