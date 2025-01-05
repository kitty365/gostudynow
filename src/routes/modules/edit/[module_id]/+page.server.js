import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let module = null;
    if (params.module_id) {
        module = await db.getModule(params.module_id);
        if (!module) {
            throw new Error("Modul nicht gefunden");
        }
    }

    try {
        const lecturers = await db.getLecturers(); // Lade alle Dozenten
        return { module, lecturers }; // Übergib das Modul und die Dozenten
    } catch (error) {
        console.error("Error loading module or lecturers:", error.message);
        throw error;
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    async update({ request, params }) {
        const data = await request.formData();

        let selectedLecturer = data.get("lecturer"); // Vorhandener Dozent
        let newLecturer = data.get("newLecturer"); // Neuer Dozent
        let lecturerId = null;

        // Prüfe, ob ein neuer Dozent erstellt werden muss
        if (newLecturer) {
            lecturerId = await db.createLecturer({ name: newLecturer });
        } else if (selectedLecturer) {
            lecturerId = selectedLecturer;
        }

        const updatedModule = {
            name: data.get("moduleName"),
            description: data.get("description"),
            lecturer: lecturerId, // Zugewiesener oder neuer Dozent
            content: data.get("content"),
            goals: data.get("goals"),
            startDate: data.get("startDate"),
            endDate: data.get("endDate"),
        };

        try {
            const success = await db.updateModule(params.module_id, updatedModule);
            if (success) {
                console.log("Modul erfolgreich aktualisiert:", params.module_id);
                throw redirect(303, `/modules/edit/${params.module_id}`); // Bleibe auf der Seite und zeige die Daten
            } else {
                return { success: false, error: "Das Modul konnte nicht aktualisiert werden." };
            }
        } catch (error) {
            console.error("Error updating module:", error.message);
            return { success: false, error: error.message };
        }
    },
};