import { z, ZodEnum } from 'zod';
import { DEFAULT_SKIP, DEFAULT_LIMIT } from '$lib/utils/urls';

// Component is meant to be used in search forms. Provides the different usual options that all DB lookups
// need. You need to pass an enum with the list of DB fields you want to be able to sort by as that varies.

export const sortOrderEnum = z.enum(['asc', 'desc']);

export const createGenericSearchParams = <T extends [string, ...string[]]>(sortByEnum: ZodEnum<T>) => {
	return z.object({
		sort_by: sortByEnum.optional(),
		sort_order: sortOrderEnum.optional(),
		skip: z.coerce.number().int().min(DEFAULT_SKIP).optional(),
		limit: z.coerce.number().int().min(DEFAULT_LIMIT).optional()
	});
};

// Usage
// const sortByEnumA = z.enum(['title', 'type', 'ageGroup']);
// export const searchSchemaA = createGenericSearchParams(sortByEnumA)