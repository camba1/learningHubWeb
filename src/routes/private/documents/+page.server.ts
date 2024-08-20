import type { DocumentSchemaType } from '$lib/schemas/documents';
import {DocumentSortByEnum, DocumentSearchSchema} from '$lib/schemas/documents';
import { fetchDocuments } from '$lib/api/documents';
import { type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '$lib/utils/urls';



function getSearchParams(searchParams: URLSearchParams, paramName: string, altValue:string | number | undefined = undefined) {
	if (altValue !== undefined) {
		return searchParams.get(paramName) || altValue;
	}
	return searchParams.get(paramName) || undefined;
}


export const load = async (params) => {
	console.log("RELOAD")


	const searchParams = params.url.searchParams;

	const obj = {
		skip: getSearchParams(searchParams,"skip", DEFAULT_SKIP),
		limit: getSearchParams(searchParams,"limit", DEFAULT_LIMIT) ,
		sort_by: getSearchParams(searchParams,"sort_by", "title") ,
		sort_order: getSearchParams(searchParams,"sort_order", "asc") ,
		title: getSearchParams(searchParams,"title") ,
		type: getSearchParams(searchParams,"type") ,
		ageGroup: getSearchParams(searchParams,"ageGroup")
	}

	const form = await superValidate(DocumentSearchSchema.parse(obj), zod(DocumentSearchSchema));

	if (!form.valid) return fail(400, { form });

	console.log(form.data, form.valid)
	const docs: DocumentSchemaType[] = await fetchDocuments(form.data.skip, form.data.limit,
		form.data.sort_by , form.data.sort_order,
		form.data.title, form.data.ageGroup,
		form.data.type);

	return {
		form: form,
		documents: docs,
		sortByEnum: DocumentSortByEnum.options};
};


export const actions: Actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(DocumentSearchSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { skip,
			limit,
			sort_by,
			title, type,
			ageGroup: age_group,
			sort_order } = form.data


		const docs: DocumentSchemaType[] = await fetchDocuments(skip, limit, sort_by, sort_order, title, age_group, type);
		// console.log("docs:" ,docs)
		// console.log("form: ",form)
		return {
			form,
			documents: docs};
	},
};