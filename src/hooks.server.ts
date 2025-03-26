// import { firebaseAuth } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the current user from Firebase Auth
	// const user = await firebaseAuth.currentUser;

	// Add the user to the locals object for global access
	// event.locals.user = user;

	return resolve(event);
};
