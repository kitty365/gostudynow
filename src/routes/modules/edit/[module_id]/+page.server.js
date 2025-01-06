import { lecturer } from "$lib/components/LecturerCard.svelte";
import db from "$lib/db.js";

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

        //let selectedModule = data.get("module");
        // let newModule = data.get("newModule");
        // let moduleId = null;
        let selectedLecturersStringified = data.getAll("selectedLecturer"); // {name: "test", kuerzel: "tst"} => string ()
        let selectedLecturers = []
        console.log("testttt" + selectedLecturersStringified)
       // console.log("selectedMoule:", selectedModule);

        console.log("selectedLecturersStringified:", selectedLecturersStringified);


        // da wir nur string übergeben bekamen, brauchen wir erneut ein array, im falle, dass nur ein lecturer ausgewählt wurde(ist nur ein strin, kein array)
        if (!Array.isArray(selectedLecturersStringified)) {
            selectedLecturersStringified = [selectedLecturersStringified];
        }
        for (let lecturer of selectedLecturersStringified) {
            console.log("lecturer:", lecturer);
            selectedLecturers.push(JSON.parse(lecturer)); // Json.parse macht aus string ein objekt (vorher wurde in ModuleForm Json.stringify aufgerufen um das lecturer objekt yu stringifzen)
                                                            //um zu vergleichen, ob lecturer bereits in db existiert
        }
        console.log("selectedLecturers:", data);
        console.log("selectedLecturers:", selectedLecturers);

        // Prüfe, ob ein neuer lecturer erstellt werden muss
        // Erstelle lecturer wenn nicht in db
        const existingLecturers = await db.getLecturers();
        // Abgleichen
        const notExistingLecturers = []

        for (let lecturer of selectedLecturers) {
            if (!existingLecturers.find((l) => l.name === lecturer.name)) {   // könnte man mit IDCheck optimieren. Wenn ID vorhanden, dann existiert der lecturer bereits, ansonsten nicht.
                notExistingLecturers.push(lecturer);                            //parser brauchen wir nur um inhalte von form zu server zu übertragen, da wir nur strings übertragen können.(wir habens nucht geschafft / ich weiss nicht wie )
            }
        }
        console.log("existingLecturers:", existingLecturers);
        console.log("notExistingLecturers:", notExistingLecturers);

        for (let lecturer of notExistingLecturers) {
            await db.createLecturer(lecturer);
        }

        // Prüfe, ob ein neues Modul erstellt werden muss
        /*if (newModule) {
            moduleId = await db.createModule({ name: newModule });
        } else  if (selectedModule) {
            moduleId = selectedModule;
        }*/

        console.log("TEST:");
        // Nur um ids von lecturers zu bekommen
        const lecturerId = [];
        
        for (let lecturer of selectedLecturers) {
            lecturerId.push((await db.getLecturerByName(lecturer.name))._id);  // wir überschreiben alle selected erneut, sosnt wäre zu kompliziert, ist am einfachsten
        }                                                       //wäre überflüssig, wenn wir bei create lecturer die id zurückgeben bekämen. 
        console.log("lecturerId:", lecturerId);

        //hat nichts mit ui zu tun
        const updatedModule = {
            name: data.get("moduleName"),
            inhalt: data.get("inhalt"),
            goals: data.get("goals"),
            startDate: data.get("startDate"),
            endDate: data.get("endDate"),
            lecturers: lecturerId,
            // module: selectedModule
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
