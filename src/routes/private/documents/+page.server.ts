import type { DocumentSchemaType } from '$lib/schemas/documents';
import {DocumentSchema} from '$lib/schemas/documents';
import { fetchDocuments } from '$lib/api/documents';
import { z } from 'zod';
import { createGenericSearchParams } from '$lib/schemas/genericSearchParams';
import { type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';


const sortByEnum = z.enum(['title', 'type', 'ageGroup']);
const genericSearchParams = createGenericSearchParams(sortByEnum);

const searchSchema = DocumentSchema.pick({
	title: true,
	type: true,
	ageGroup: true,
}).merge(genericSearchParams).partial();

function getSearchParams(searchParams: URLSearchParams, paramName: string) {
	return searchParams.get(paramName) || undefined;
}

export const load = async (params) => {
	console.log("RELOAD")


	const searchParams = params.url.searchParams;

	const obj = {
		skip: getSearchParams(searchParams,"skip"),
		limit: getSearchParams(searchParams,"limit") ,
		sort_by: getSearchParams(searchParams,"sort_by") ,
		sort_order: getSearchParams(searchParams,"sort_order") ,
		title: getSearchParams(searchParams,"title") ,
		type: getSearchParams(searchParams,"type") ,
		ageGroup: getSearchParams(searchParams,"ageGroup") ,

	}
	const form = await superValidate(searchSchema.parse(obj), zod(searchSchema));

	console.log(form.data, form.valid)
	const docs: DocumentSchemaType[] = await fetchDocuments(form.data.skip, form.data.limit,
		form.data.sort_by , form.data.sort_order,
		form.data.title, form.data.ageGroup,
		form.data.type);

	return {
		form: form,
		documents: docs,
		sortByEnum: sortByEnum.options};
};


export const actions: Actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(searchSchema));
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