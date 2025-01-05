import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        lecturers: await db.getLecturers()
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    async delete({ request }) {
        const data = await request.formData();
        const lecturerId = data.get("id"); // ID des zu löschenden Dozenten

        try {
            const success = await db.deleteLecturer(lecturerId);
            if (success) {
                console.log("Dozent erfolgreich gelöscht:", lecturerId);
                throw redirect(303, "/lecturers");
            } else {
                return { success: false, error: "Der Dozent konnte nicht gelöscht werden." };
            }
        } catch (error) {
            console.error("Error deleting lecturer:", error.message);
            return { success: false, error: error.message };
        }
    },
};