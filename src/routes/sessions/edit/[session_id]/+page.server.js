import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let session = null;
    if (params.session_id) {
        session = await db.getSession(params.session_id);
        if (!session) {
            throw new Error("Session nicht gefunden");
        }
    }

    try {
        const modules = await db.getModules(); // Lade alle Module
        return { session, modules }; // Übergib die Session und Module
    } catch (error) {
        console.error("Error loading session or modules:", error.message);
        throw error;
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    async update({ request, params }) {
        const data = await request.formData();

        let selectedModule = data.get("module");
        let newModule = data.get("newModule");
        let moduleId = null;

        // Prüfe, ob ein neues Modul erstellt werden muss
        if (newModule) {
            moduleId = await db.createModule({ name: newModule });
        } else if (selectedModule) {
            moduleId = selectedModule;
        }

        const updatedSession = {
            title: data.get("title"),
            description: data.get("description"),
            date: data.get("date"),
            elapsedTime: Number(data.get("elapsedTime")) || 0,
            module: moduleId,
        };

        try {
            const success = await db.updateSession(params.session_id, updatedSession);
            if (success) {
                console.log("Session erfolgreich aktualisiert:", params.session_id);
                throw redirect(303, "/sessions");
            } else {
                return { success: false, error: "Die Session konnte nicht aktualisiert werden." };
            }
        } catch (error) {
            console.error("Error updating session:", error.message);
            return { success: false, error: error.message };
        }
    },
};
