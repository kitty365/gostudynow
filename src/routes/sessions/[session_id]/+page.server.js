import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit"; // Für Weiterleitung

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const session = await db.getSession(params.session_id);

        if (!session) {
            console.error("Session nicht gefunden");
            throw redirect(303, "/sessions"); // Weiterleitung, wenn die Session nicht gefunden wird
        }

        // Falls die Session ein Modul enthält, lade die Modul-Daten
        if (session.module) {
            const module = await db.getModule(session.module);
            session.module = module || { _id: session.module, name: "Modul nicht gefunden" };
        }

        return {
            session
        };
    } catch (error) {
        console.error("Error loading session:", error.message);
        throw redirect(303, "/sessions"); // Weiterleitung bei Fehlern
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        try {
            const deletedId = await db.deleteSession(id); // Session löschen
            if (deletedId) {
                console.log("Session deleted successfully:", deletedId);
                throw redirect(303, "/sessions"); // Weiterleitung zu /sessions
            } else {
                console.error("Die Session konnte nicht gelöscht werden.");
                return { success: false, error: "Die Session konnte nicht gelöscht werden." };
            }
        } catch (error) {
            console.error("Error deleting session:", error.message);
            return { success: false, error: error.message };
        }
    }
};
