import { lecturer } from "$lib/components/LecturerCard.svelte";
import db from "$lib/db.js";
import { selectedLecturers } from "$lib/components/ModuleForm.svelte";

export async function load({ params }) {
    let module = null;
    if (params.module_id) {
        module = await db.getModule(params.module_id);
        if (!module) {
            throw new Error("module nicht gefunden");
        }
    }
    try {
        const lecturers = await db.getLecturers(); // Lade alle lecturers
        return { module, lecturers }; // Übergib die module und lecturers
    } catch (error) {
        console.error("Error loading module or modules:", error.message);
        throw error;
    }
}

export const actions = {
    async update({ request, params }) {
        const data = await request.formData();

        let selectedModule = data.get("module");
        let newModule = data.get("newModule");
        let moduleId = null;
        let selectedLecturersStringified = data.getAll("selectedLecturer");
        let selectedLecturers = []
        console.log("selectedLecturersStringified:", selectedLecturersStringified);
        if (!Array.isArray(selectedLecturersStringified)) {
            selectedLecturersStringified = [selectedLecturersStringified];
        }
        for (let lecturer of selectedLecturersStringified) {
            console.log("lecturer:", lecturer);
            selectedLecturers.push(JSON.parse(lecturer)); // Json.parse macht aus string ein objekt (vorher wurde in ModuleForm Json.stringify aufgerufen um das lecturer objekt yu stringifzen)
        }
        console.log("selectedLecturers:", data);
        console.log("selectedLecturers:", selectedLecturers);

        // Prüfe, ob ein neuer lecturer erstellt werden muss
        // Erstelle lecturer wenn nicht in db
        const existingLecturers = await db.getLecturers();
        // Abgleichen
        const notExistingLecturers = []
        for (let lecturer of selectedLecturers) {
            if (!existingLecturers.find((l) => l.name === lecturer)) {
                notExistingLecturers.push(lecturer);
            }
        }
        for (let lecturer of notExistingLecturers) {
            await db.createLecturer(lecturer);
        }

        // Prüfe, ob ein neues Modul erstellt werden muss
        if (newModule) {
            moduleId = await db.createModule({ name: newModule });
        } else if (selectedModule) {
            moduleId = selectedModule;
        }
        console.log("TEST:");
        const lecturerId = [];
        for (let lecturer of selectedLecturers) {
            lecturerId.push((await db.getLecturerByName(lecturer.name))._id);
        }
        console.log("lecturerId:", lecturerId);


        const updatedModule = {
            name: data.get("moduleName"),
            inhalt: data.get("inhalt"),
            goals: data.get("goals"),
            startDate: data.get("startDate"),
            endDate: data.get("endDate"),
            lecturers: lecturerId,
            module: moduleId,
        };


        console.log("updatedModule:", updatedModule);

        try {
            const success = await db.updateModule(params.module_id, updatedModule);
            if (success) {
                console.log("module erfolgreich aktualisiert:", params.module_id);
            } else {
                return { success: false, error: "Die module konnte nicht aktualisiert werden." };
            }
        } catch (error) {
            console.error("Error updating module:", error.message);
            return { success: false, error: error.message };
        }
    },
};
