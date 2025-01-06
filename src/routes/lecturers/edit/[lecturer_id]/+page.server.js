import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let lecturer = null;
    if (params.lecturer_id) {
        lecturer = await db.getLecturer(params.lecturer_id);
        if (!lecturer) {
            throw new Error("Dozent nicht gefunden");
        }
    }

    return { lecturer };
}

/** @type {import('./$types').Actions} */
export const actions = {
    async update({ request, params }) {
        const data = await request.formData();

        const updatedLecturer = {
            name: data.get("name"),
            kuerzel: data.get("kuerzel"),
        };

        try {
            const success = await db.updateLecturer(params.lecturer_id, updatedLecturer);
            if (success) {
                console.log("Dozent erfolgreich aktualisiert:", params.lecturer_id);
                throw redirect(303, `/lecturers/edit/${params.lecturer_id}`); // Bleibe auf der Seite
            } else {
                return { success: false, error: "Der Dozent konnte nicht aktualisiert werden." };
            }
        } catch (error) {
            console.error("Error updating lecturer:", error.message);
            return { success: false, error: error.message };
        }
    },
};