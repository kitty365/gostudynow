import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit"; // Für Weiterleitung

export async function load({ params }) {
    try {
        const module = await db.getModule(params.module_id);

        if (!module) {
            console.error("module nicht gefunden");
            throw redirect(303, "/modules"); // Weiterleitung, wenn die module nicht gefunden wird
        }
console.log("modulgv:", module.lecturers); 


       let lecturers = await db.getLecturersByIds(module.lecturers); // Lade die lecturers des module
       console.log("wieso:", lecturers);

       let lecturerNames = lecturers.map((l) => l.name); // Extrahiere die Namen der lecturers
       module.lecturers = lecturerNames; // Füge die Namen der lecturers zum module
console.log("lecttts:", lecturers);
        return {
            module
        };



    } catch (error) {
        console.error("Error loading lecturer:", error.message);
        throw redirect(303, "/modules"); // Weiterleitung bei Fehlern
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        try {
            const deletedId = await db.deleteModule(id); // module löschen
            if (deletedId) {
                console.log("module deleted successfully:", deletedId);
                throw redirect(303, "/modules"); // Weiterleitung zu /modules
            } else {
                console.error("Die module konnte nicht gelöscht werden.");
                return { success: false, error: "Die module konnte nicht gelöscht werden." };
            }
        } catch (error) {
            console.error("Error deleting module:", error.message);
            return { success: false, error: error.message };
        }
    }
};
