import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        sessions: await db.getSessions()
    };
}
