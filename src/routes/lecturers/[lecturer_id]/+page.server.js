import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit"; // Für Weiterleitung

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const lecturer = await db.getLecturer(params.lecturer_id);

        if (!lecturer) {
            console.error("lecturer nicht gefunden");
            throw redirect(303, "/lecturers"); // Weiterleitung, wenn die lecturer nicht gefunden wird
        }

        let modules = await db.getModulesByLecturer(lecturer._id); // Lade die Module des lecturers
        console.log("modules:", modules);
        let moduleNames = modules.map((m) => m.name); // Extrahiere die Namen der Module
        lecturer.modules = moduleNames; // Füge die Namen der Module zum lecturer
        // Falls die lecturer ein Modul enthält, lade die Modul-Daten
        if (lecturer.module) {
            const module = await db.getModule(lecturer.module);
            lecturer.module = module || { _id: lecturer.module, name: "modul nicht gefunden" };
        }

        return {
            lecturer
        };
    } catch (error) {
        console.error("Error loading module:", error.message);
        throw redirect(303, "/lecturers"); // Weiterleitung bei Fehlern
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        try {
            const deletedId = await db.deleteLecturer(id); // lecturer löschen
            if (deletedId) {
                console.log("lecturer deleted successfully:", deletedId);
                throw redirect(303, "/lecturers"); // Weiterleitung zu /lecturers
            } else {
                console.error("Die lecturer konnte nicht gelöscht werden.");
                return { success: false, error: "Die lecturers konnte nicht gelöscht werden." };
            }
        } catch (error) {
            console.error("Error deleting lecturer:", error.message);
            return { success: false, error: error.message };
        }
    }
};
