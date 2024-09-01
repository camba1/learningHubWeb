import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { env } from '$env/dynamic/private'

export const handle: Handle = sequence(
	handleClerk(env.CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/private'],
		signInUrl: '/sign-in',
	})
)