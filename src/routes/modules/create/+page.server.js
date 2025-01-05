import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const elapsedTime = Number(url.searchParams.get("time")) || 0; // Gestoppte Zeit aus URL
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0]; // Heutiges Datum

    try {
        const modules = await db.getModules(); // Lade alle Module aus der Datenbank
        console.log("Loaded modules in create:", modules); // Debugging
        return { elapsedTime, date, modules }; // Rückgabe der benötigten Daten
    } catch (error) {
        console.error("Error loading modules:", error.message);
        throw redirect(303, "/modules"); // Weiterleitung bei Fehler
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    async create({ request }) {
        const data = await request.formData();

        const selectedModule = data.get("module"); // Gewähltes Modul
        const newModule = data.get("newModule"); // Neues Modul
        let moduleId = null;

        try {
            // Prüfe, ob ein neues Modul erstellt werden soll
            if (newModule) {
                moduleId = await db.createModule({ name: newModule }); // Neues Modul erstellen
                console.log("New module created with ID:", moduleId); // Debugging
            } else if (selectedModule) {
                moduleId = selectedModule; // Vorhandenes Modul verwenden
            }

            // Neue Session erstellen
            const newSession = {
                title: data.get("title"),
                description: data.get("description"),
                date: data.get("date"), // Datum (heutiges Datum)
                elapsedTime: Number(data.get("elapsedTime")) || 0, // Gestoppte Zeit
                module: moduleId // Zugewiesenes Modul
            };

            console.log("Creating session:", newSession); // Debugging
            const sessionId = await db.createSession(newSession); // Session erstellen

            if (sessionId) {
                console.log("Session created successfully with ID:", sessionId); // Debugging
                throw redirect(303, "/sessions"); // Weiterleitung zu /sessions
            } else {
                console.error("Failed to create session.");
                return { success: false, error: "Die Session konnte nicht erstellt werden." };
            }
        } catch (error) {
            console.error("Error creating session:", error.message);
            return { success: false, error: error.message };
        }
    }
};
