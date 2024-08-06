import { z } from 'zod';


// User Schema
export const UserSchema = z.object({
	_key: z.string(), // Unique key for the user
	emailAddress: z.string().email(),
	createdAt: z.date().default(() => new Date()).optional(), // Creation date of the user
	updatedAt: z.date().default(() => new Date()).optional(), //  Updated date for the user
	usrMain_key_Create: z.string().optional(),
	usrMain_key_Update: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

// A simple user "database"
export const users: UserSchemaType[] = [
	{
		_key: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		emailAddress: "mytest@test.com",
		createdAt: new Date(),
		updatedAt: new Date(),
		usrMain_key_Create: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		usrMain_key_Update: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
	},
	{
		_key: "8a7f3dd5-9a61-41ce-853f-2b6345362342",
		emailAddress: "mytest2@test.com",
		createdAt: new Date(),
		updatedAt: new Date(),
		usrMain_key_Create: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
		usrMain_key_Update: "8a7f3dd5-9a61-41ce-853f-2b6345362341",
	}
];