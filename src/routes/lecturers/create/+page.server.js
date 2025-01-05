import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {

    try {
        const lecturers = await db.getLecturers(); // Lade alle lecturer aus der Datenbank
        console.log("Loaded lecturers in create:", lecturers); // Debugging
        return { elapsedTime, date, lecturers }; // Rückgabe der benötigten Daten
    } catch (error) {
        console.error("Error loading lecturers:", error.message);
        throw redirect(303, "/lecturers"); // Weiterleitung bei Fehler
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    async create({ request }) {
        const data = await request.formData();

        const selectedLecturer = data.get("lecturer"); // Gewähltes Modul
        const newLecturer = data.get("newLecturer"); // Neues Modul
        let lecturerId = null;

    }
};
