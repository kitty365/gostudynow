import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const module = await db.getModule(params.module_id);

        if (!module) {
            console.error("Modul nicht gefunden");
            throw redirect(303, "/modules"); // Weiterleitung, wenn das Modul nicht gefunden wird
        }

        // Falls das Modul einen Lehrer hat, lade die Lehrerdetails
        if (module.teacher) {
            const lecturer = await db.getLecturer(module.teacher);
            module.teacher = lecturer || { _id: module.teacher, name: "Lehrperson nicht gefunden" };
        }

        return {
            module,
        };
    } catch (error) {
        console.error("Error loading module:", error.message);
        throw redirect(303, "/modules"); // Weiterleitung bei Fehlern
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        try {
            const deletedId = await db.deleteModule(id); // Modul löschen
            if (deletedId) {
                console.log("Modul erfolgreich gelöscht:", deletedId);
                throw redirect(303, "/modules"); // Weiterleitung zu /modules
            } else {
                console.error("Das Modul konnte nicht gelöscht werden.");
                return { success: false, error: "Das Modul konnte nicht gelöscht werden." };
            }
        } catch (error) {
            console.error("Error deleting module:", error.message);
            return { success: false, error: error.message };
        }
    },
};
