//////***** import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {

    try {
        const lecturers = await db.getLecturers(); // Lade alle lecturer aus der Datenbank
        console.log("Loaded lecturers in create:", lecturers); // Debugging
        return { name, kuerzel }; // Rückgabe der benötigten Daten
    } catch (error) {
        console.error("Error loading lecturers:", error.message);
        throw redirect(303, "/lecturers"); // Weiterleitung bei Fehler
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData(); // Lese die Formulardaten

        const name = data.get("name"); // Lese den Namen aus dem Formular
        const kuerzel = data.get("kuerzel"); // Lese das Kürzel aus dem Formular

        try {
            const lecturer = await db.createLecturer({ name, kuerzel }); // Erstelle einen neuen lecturer in der Datenbank
            if (lecturer) {
                throw redirect(303, `/lecturers/${lecturer._id}`); // Weiterleitung zur Detailansicht des neuen lecturers
            } else {
                return { success: false, error: "Der lecturer konnte nicht erstellt werden." };
            }
        } catch (error) {
            console.error("Error creating lecturer:", error.message);
            return { success: false, error: error.message };
        }
    },
};


