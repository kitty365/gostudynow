import { MongoClient, ObjectId } from "mongodb"; // MongoDB driver import
import { DB_URI } from "$env/static/private"; // Importing DB URI from environment variables

// MongoDB Client und Datenbankverbindung
const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("studynow");

// Hilfsfunktion: Konvertiere ObjectId zu String
const convertIdToString = (doc) => {  //doc ist mein modul, (parameter)
    if (doc._id) doc._id = doc._id.toString(); // _id ist objekt id, ich will es als string haben 
    return doc;
};
const convertArrayIdToArrayString = (docs) => {
    docs.lecturers = docs.lecturers.map((objectId) => objectId.toString());
    console.log("docs:", docs);
    return docs;
}

// **Sessions**
export async function getSessions() {
    try {
        const sessionsCollection = db.collection("sessions");
        const modulesCollection = db.collection("modules");

        // Lade Sessions und Module
        const sessions = await sessionsCollection.find({}).toArray();
        const modules = await modulesCollection.find({}).toArray();

        // Map Module-IDs zu Modulnamen
        const moduleMap = modules.reduce((map, module) => {
            map[module._id.toString()] = module.name;
            return map;
        }, {});

        // Ergänze Session-Daten
        return sessions.map((session) => {
            session.module = moduleMap[session.module] || "Unknown Module";
            return convertIdToString(session);
        });
    } catch (error) {
        console.error("Error fetching sessions:", error.message);
        return [];
    }
}

export async function getSession(id) {
    try {
        const session = await db.collection("sessions").findOne({ _id: new ObjectId(id) });
        if (session) {
            convertIdToString(session);
            session.elapsedTime = Number(session.elapsedTime);
        }
        return session;
    } catch (error) {
        console.error("Error fetching session:", error.message);
        throw error;
    }
}

export async function createSession(session) {
    try {
        const result = await db.collection("sessions").insertOne({
            ...session,
            elapsedTime: Number(session.elapsedTime),
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error("Error creating session:", error.message);
        throw error;
    }
}

export async function updateSession(id, updatedSession) {
    try {
        const result = await db.collection("sessions").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedSession }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating session:", error.message);
        throw error;
    }
}

export async function deleteSession(id) {
    try {
        const result = await db.collection("sessions").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting session:", error.message);
        throw error;
    }
}

// **Modules**
export async function getModules() {
    try {
        const modules = await db.collection("modules").find({}).toArray();
        modules.map((module) => module.lecturers = module.lecturers || []); //falls ein modul kein lecturer hat. //wir wissen, dass es ein leeres array ist , wir brauchen, da bei erstellen eines moduls, keine lecturers angegeben werden
        return modules.map(convertIdToString).map(convertArrayIdToArrayString);
    } catch (error) {
        console.error("Error fetching modules:", error.message);
        throw error;
    }
}

export async function getModule(id) {
    try {                                                            //   id wert ist immer gleich, objectid objekt kann sich ändern, inhalt muss gleich sein(vorhanden sein)
        const module = await db.collection("modules").findOne({ _id: new ObjectId(id) });
        if (module) {
            module.lecturers = module.lecturers || []; //wir wissen, dass es ein leeres array ist , wir brauchen, da bei erstellen eines moduls, keine lecturers angegeben werden
            return convertArrayIdToArrayString(convertIdToString(module)); // weil wir meist mit strings arbeiten, aber nicht mit objekteids
        }
        return null;
    } catch (error) {
        console.error("Error fetching module:", error.message);
        throw error;
    }
}

// create module
export async function createModule(module) {
    module.current = false;
    try {
        const result = await db.collection("modules").insertOne(module);
        return result.insertedId.toString();
    } catch (error) {
        console.error("Error creating module:", error.message);
        throw error;
    }
}
                                   // moduleId ist string , updatedmodule.lecturers ist array von strings aber wir brauchen array von objectids
/* export async function updateModule(moduleId, updatedModule) {
    console.log("bitte "+moduleId);
    try {
        let objectidLecturers = [];
        for (let lecturer of updatedModule.lecturers) {
            objectidLecturers.push(new ObjectId(lecturer));
        }
        updatedModule.lecturers = objectidLecturers;

        // updatedModule.lecturers = updatedModule.lecturers.map((lecturer) => new ObjectId(lecturer));

        const result = await db.collection("modules").updateOne(
            { _id: new ObjectId(moduleId) },
            { $set: updatedModule }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating module:", error.message);
        throw error;
    }
}
*/

export async function updateModule(moduleId, updatedModule) {
    try {
        // Wenn lecturers nicht definiert ist, mache nichts mit lecturers
        if (updatedModule.lecturers) {
            updatedModule.lecturers = updatedModule.lecturers.map(
                (lecturer) => new ObjectId(lecturer)
            );
        }

        const result = await db.collection("modules").updateOne(
            { _id: new ObjectId(moduleId) },
            { $set: updatedModule }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating module:", error.message);
        throw error;
    }
}

export async function deleteModule(id) {
    try {
        const result = await db.collection("modules").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting module:", error.message);
        throw error;
    }
}

export async function getModulesByLecturer(lecturerId) {
    try {
        const modules = await db.collection("modules").find({ lecturers: new ObjectId(lecturerId) }).toArray();
        return modules.map(convertIdToString).map(convertArrayIdToArrayString);
    } catch (error) {
        console.error("Error fetching modules for lecturer:", error.message);
        throw error;
    }
}

export async function getLecturer(id) {
  try {
      const lecturer = await db.collection("lecturers").findOne({ _id: new ObjectId(id) });
      if (lecturer) {
        lecturer.modules = lecturer.modules || [];
          return convertIdToString(lecturer);
      }
      return null;
  } catch (error) {
      console.error("Error fetching lecturer:", error.message);
      throw error;
  }
}
// **Lecturers**
export async function getLecturers() {
    try {
        const lecturers = await db.collection("lecturers").find({}).toArray();
        return lecturers.map(convertIdToString);
    } catch (error) {
        console.error("Error fetching lecturers:", error.message);
        throw error;
    }
}

export async function getLecturerById(id) {
    try {
        const lecturer = await db.collection("lecturers").findOne({ _id: new ObjectId(id) });
        return lecturer ? convertIdToString(lecturer) : null;
    } catch (error) {
        console.error("Error fetching lecturer by ID:", error.message);
        throw error;
    }
}

// create lecturer
export async function createLecturer(lecturer) {
    try {
        const result = await db.collection("lecturers").insertOne(lecturer);
        return result.insertedId.toString();
    } catch (error) {
        console.error("Error creating lecturer:", error.message);
        throw error;
    }
}

export async function updateLecturer(id, updatedLecturer) {
    try {
        const result = await db.collection("lecturers").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedLecturer }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating lecturer:", error.message);
        throw error;
    }
}

export async function deleteLecturer(id) {
    try {
        const result = await db.collection("lecturers").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting lecturer:", error.message);
        throw error;
    }
}

export async function getLecturersByIds(ids) {
    try {
        const lecturers = await db
            .collection("lecturers")
            .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
            .toArray();
        return lecturers.map(convertIdToString);
    } catch (error) {
        console.error("Error fetching lecturers by IDs:", error.message);
        throw error;
    }
}

// get lecturer by name
export async function getLecturerByName(name) {
    try {
        const lecturer = await db.collection("lecturers").findOne({ name: name });
        if (lecturer) {
            lecturer.modules = lecturer.modules || [];
            return convertIdToString(lecturer);
        }
        return null;
    } catch (error) {
        console.error("Error fetching lecturer:", error.message);
        throw error;
    }
}

// get lecturersbymodules
export async function getLecturersByModule(moduleId) {
    try {
        const lecturers = await db.collection("lecturers").find({ modules: moduleId} ).toArray();
        return lecturers.map(convertIdToString);
    } catch (error) {
        console.error("Error fetching lecturers by modules:", error.message);
        throw error;
    }
}


// Exportiere alle Funktionen
export default {
    getSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession,
    getModules,
    getModule,
    createModule,
    updateModule,
    deleteModule,
    getModulesByLecturer,
    getLecturer,
    getLecturers,
    getLecturerById,
    createLecturer,         
    updateLecturer,
    deleteLecturer,
    getLecturersByIds,
    getLecturerByName,
    getLecturersByModule
};
