import { z } from 'zod';


const OrgAddressSchema = z.object({
	addressLine1: z.string(), // Unique key for the Organization
	addressLine2: z.string().optional(),
	city: z.string(),
	state: z.string().optional(),
	postalCode: z.string().optional(),
	country: z.string(),
	createdAt: z.coerce.date().default(() => new Date()).optional(), // Creation date of the Organization
	updatedAt: z.coerce.date().default(() => new Date()).optional(), //  Updated date for the Organization
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});


// Organization Schema
export const OrganizationSchema = z.object({
	_key: z.string(), // Unique key for the Organization
	name: z.string()
		.min(1, "Organization name cannot be empty")
		.max(100, "Organization name cannot exceed 100 characters"), // Name of the Organization
	emailAddress: z.string().email(),
	phoneNumber: z.string()
		.max(20, "Phone number cannot exceed 20 characters")
		.optional(), // Phone number of the Organization
	orgAddress: OrgAddressSchema.optional(),
	createdAt: z.date().default(() => new Date()).optional(), // Creation date of the Organization
	updatedAt: z.date().default(() => new Date()).optional(), //  Updated date for the Organization
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});

export type OrganizationSchemaType = z.infer<typeof OrganizationSchema>;

// A simple Organization "database"
export const organizations: OrganizationSchemaType[] = [
	{
		_key: "8a7f3dd5-9a61-41ce-853w-2b6345362341",
		name: "My Organization",
		emailAddress: "myorgtest@test.com",
		phoneNumber: "555-456-7890",
		orgAddress: {
			addressLine1: "123 Main St",
			city: "Anytown",
			state: "CA",
			postalCode: "12345",
			country: "USA",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
		usrMain_key_Create: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		usrMain_key_Update: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
	},
	{
		_key: "8a7f3dd5-9a61-41ce-853w-2b6345362342",
		name: "My Organization 2",
		emailAddress: "mytest2@test.com",
		phoneNumber: "555-456-7890",
		createdAt: new Date(),
		updatedAt: new Date(),
		usrMain_key_Create: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		usrMain_key_Update: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
	}
];