import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const lecturerId = params.lecturer_id;

    try {
        const lecturer = await db.getLecturerById(lecturerId);
        const modules = await db.getModulesByLecturer(lecturerId);

        if (!lecturer) {
            throw new Error("Dozent nicht gefunden");
        }

        // Wandle _id in String um
        lecturer._id = lecturer._id.toString();
        modules.forEach((module) => {
            module._id = module._id.toString();
        });

        return {
            lecturer,
            modules,
        };
    } catch (error) {
        console.error("Error loading lecturer or modules:", error.message);
        throw error;
    }
}
