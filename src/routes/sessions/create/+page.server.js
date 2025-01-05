import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const elapsedTime = Number(url.searchParams.get("time")) || 0; // Zeit in Sekunden
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0]; // Heutiges Datum

    try {
        const modules = await db.getModules(); // Lade alle Module
        return { elapsedTime, date, modules }; // Rückgabe an die Seite
    } catch (error) {
        console.error("Fehler beim Laden der Module:", error.message);
        throw redirect(303, "/sessions"); // Umleitung bei Fehler
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const selectedModule = data.get("module");
        const newModule = data.get("newModule");
        let moduleId = null;

        try {
            if (newModule) {
                moduleId = await db.createModule({ name: newModule });
            } else if (selectedModule) {
                moduleId = selectedModule;
            }

            const newSession = {
                title: data.get("title"),
                description: data.get("description"),
                date: data.get("date"),
                elapsedTime: Number(data.get("elapsedTime")) || 0,
                module: moduleId,
            };

            const sessionId = await db.createSession(newSession);
            if (sessionId) {
                throw redirect(303, "/sessions");
            } else {
                return { success: false, error: "Die Session konnte nicht erstellt werden." };
            }
        } catch (error) {
            console.error("Fehler beim Erstellen der Session:", error.message);
            return { success: false, error: "Die Session konnte nicht erstellt werden." };
        }
    },
};
