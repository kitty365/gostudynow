import { MongoClient, ObjectId } from "mongodb"; // MongoDB driver import
import { DB_URI } from '$env/static/private';  // Importing DB URI from environment variables

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("studynow"); // Select the database


// get all sessions
async function getSessions() {
  let sessions = [];
  try {
    const sessionsCollection = db.collection("sessions");
    const modulesCollection = db.collection("modules");

    // Lade alle Sessions
    sessions = await sessionsCollection.find({}).toArray();

    // Lade alle Module und erstelle eine Map von IDs zu Namen
    const modules = await modulesCollection.find({}).toArray();
    const moduleMap = modules.reduce((map, module) => {
      map[module._id.toString()] = module.name;
      return map;
    }, {});

    // Ersetze die `module`-ID in jeder Session durch den Modulnamen
    sessions.forEach(session => {
      if (session.module) {
        session.module = moduleMap[session.module] || "Unknown Module";
      }
      session._id = session._id.toString(); // Konvertiere ObjectId zu String
    });
  } catch (error) {
    console.log("Error fetching sessions:", error.message);
  }
  return sessions;
}

// get session by id
async function getSession(id) {
    const collection = db.collection("sessions");
    const session = await collection.findOne({ _id: new ObjectId(id) });
    if (session) {
        session._id = session._id.toString();
        session.elapsedTime = Number(session.elapsedTime); // Sicherstellen, dass es eine Zahl ist
    }
    return session;
}

  // create session
  async function createSession(session) {
    const collection = db.collection("sessions");
    const result = await collection.insertOne({
      ...session,
      elapsedTime: Number(session.elapsedTime), // Stelle sicher, dass es eine Zahl ist
    });
    return result.insertedId;
  }



  // delete session by id
  async function deleteSession(id) {
    try {
        const collection = db.collection("sessions");
        const query = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            console.log(`No session found with ID: ${id}`);
            return null;
        }

        console.log(`Session successfully deleted with ID: ${id}`);
        return id;
    } catch (error) {
        console.error("Error deleting session:", error.message);
        throw error;
    }
}

  // session update

  async function updateSession(id, updatedSession) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Ungültige Session-ID");
    }

    try {
      const collection = db.collection("sessions");
      const query = { _id: new ObjectId(id) };
      const update = { $set: updatedSession };

      const result = await collection.updateOne(query, update);
      if (result.matchedCount === 0) {
        throw new Error("Session nicht gefunden");
      }

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error updating session:", error.message);
      throw error;
    }
  }

  // Hol alle Module
  async function getModules() {
    try {
      const collection = db.collection("modules");
      const modules = await collection.find({}).toArray();
      modules.forEach(module => {
        module._id = module._id.toString(); // Convert ObjectId to String
      });
      return modules;
    } catch (error) {
      console.error("Error fetching modules:", error.message);
      throw error;
    }
  }


  async function getModule(id) {
    let module = null;
    try {
      const collection = db.collection("modules");
      const query = { _id: new ObjectId(id) }; // Filter by id
      module = await collection.findOne(query);

      if (!module) {
        console.log("No module found with id: " + id);
      } else {
        module._id = module._id.toString(); // Convert ObjectId to String
      }
    } catch (error) {
      console.log("Error fetching module by id:", error.message); // Improved error handling
    }
    return module;
  }

  // Füge ein neues Modul hinzu
  async function createModule(moduleData) {
    try {
      const collection = db.collection("modules");
      const existing = await collection.findOne({ name: moduleData.name });

      if (existing) {
        return existing._id.toString(); // Modul existiert bereits
      }

      const result = await collection.insertOne(moduleData);
      return result.insertedId.toString(); // Neues Modul erstellt
    } catch (error) {
      console.error("Error creating module:", error.message);
      throw error;
    }
  }



  // Lösche ein Modul anhand seiner ID
  async function deleteModule(id) {
    try {
      const collection = db.collection("modules");
      const query = { _id: new ObjectId(id) }; // Filter nach ID
      const result = await collection.deleteOne(query);

      if (result.deletedCount === 0) {
        console.log("Kein Modul gefunden mit ID: " + id);
      } else {
        console.log("Modul erfolgreich gelöscht mit ID: " + id);
        return id;
      }
    } catch (error) {
      console.error("Error deleting module:", error.message);
      throw error;
    }
    return null;
  }


  //Modul bearbeiten 
  //Modul bearbeiten 
  async function updateModule(id, updatedModule) {
    try {
      const collection = db.collection("modules");
      const query = { _id: new ObjectId(id) };
      const update = { $set: updatedModule };

      const result = await collection.updateOne(query, update);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error updating module:", error.message);
      throw error;
    }
  }

  // create lecturer
  async function createLecturer(lecturerData) {
    try {
      const collection = db.collection("lecturers");
      const existing = await collection.findOne({ name: lecturerData.name });

      if (existing) {
        return existing._id.toString(); // Lecturer already exists
      }

      const result = await collection.insertOne(lecturerData);
      return result.insertedId.toString(); // New lecturer created
    } catch (error) {
      console.error("Error creating lecturer:", error.message);
      throw error;
    }
  }

  // get all lecturers
  async function getLecturers() {
    try {
      const collection = db.collection("lecturers");
      const lecturers = await collection.find({}).toArray();
      lecturers.forEach(lecturer => {
        lecturer._id = lecturer._id.toString(); // Convert ObjectId to String
      });
      return lecturers;
    } catch (error) {
      console.error("Error fetching lecturers:", error.message);
      throw error;
    }
  }

  // get lecturer by id

  // update lecturer
  async function updateLecturer(id, updatedLecturer) {
    try {
      const collection = db.collection("lecturers");
      const query = { _id: new ObjectId(id) };
      const update = { $set: updatedLecturer };

      const result = await collection.updateOne(query, update);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error updating lecturer:", error.message);
      throw error;
    }
  }

  // delete lecturer by id
  async function deleteLecturer(id) {
    try {
      const collection = db.collection("lecturers");
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const result = await collection.deleteOne(query);

      if (result.deletedCount === 0) {
        console.log("No lecturer found with ID: " + id);
      } else {
        console.log("Lecturer successfully deleted with ID: " + id);
        return id;
      }
    } catch (error) {
      console.error("Error deleting lecturer:", error.message);
      throw error;
    }
    return null;
  }

  export async function getLecturerById(lecturerId) {
    try {
        const lecturer = await db.collection("lecturers").findOne({ _id: new ObjectId(lecturerId) });
        if (lecturer) {
            lecturer._id = lecturer._id.toString(); // _id in String umwandeln
        }
        return lecturer;
    } catch (error) {
        console.error("Error fetching lecturer by ID:", error.message);
        throw error;
    }
}

export async function getModulesByLecturer(lecturerId) {
    try {
        const modules = await db.collection("modules").find({ lecturer: lecturerId }).toArray();
        return modules.map((module) => {
            module._id = module._id.toString(); // _id in String umwandeln
            return module;
        });
    } catch (error) {
        console.error("Error fetching modules for lecturer:", error.message);
        throw error;
    }
}


  export default {
    getSessions,
    getSession,
    createSession,
    deleteSession,
    updateSession,
    getModules,
    getModule,
    createModule,
    deleteModule,
    updateModule,
    createLecturer,
    getLecturers,
    
    updateLecturer,
    deleteLecturer,
    getLecturerById,
    getModulesByLecturer

  };