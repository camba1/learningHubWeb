import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { CharacterSchemaType } from '$lib/schemas/characters';
import {CharacterSortByEnum, CharacterSearchSchema} from '$lib/schemas/characters';
import { fetchCharacters } from '$lib/api/characters';
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

	const searchObj = CharacterSearchSchema.safeParse({
		skip: getSearchParams(searchParams, "skip", DEFAULT_SKIP),
		limit: getSearchParams(searchParams, "limit", DEFAULT_LIMIT),
		sort_by: getSearchParams(searchParams, "sort_by", "name"),
		sort_order: getSearchParams(searchParams, "sort_order", "asc"),
		name: getSearchParams(searchParams, "name")
	})
	if (!searchObj.success ) {
		throw error(400, { message: JSON.stringify(searchObj.error.flatten().fieldErrors) }  );
	}

	const form = await superValidate(searchObj.data, zod(CharacterSearchSchema));

	if (!form.valid) return fail(400, { form });

	const chars: CharacterSchemaType[] = await fetchCharacters(getAuthToken(cookies), form.data.skip, form.data.limit,
		form.data.sort_by , form.data.sort_order,
		form.data.name);

	return {
		form: form,
		characters: chars,
		sortByEnum: CharacterSortByEnum.options};
};