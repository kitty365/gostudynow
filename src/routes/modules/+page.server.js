import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        modules: await db.getModules()
    };
}

export const actions = {
    addToCurrent: async ({request}) => {
      let data = await request.formData();
      let id = data.get("id");
      let module = { 
        current: true
      } 
      console.log("dataaaaa: "+id);
      await db.updateModule(id, module);
    },
    removeCurrent: async ({request}) => {
      let data = await request.formData();
      let id = data.get("id");
      let module = { 
        current: false
      } 

      console.log("ddddd: "+id);
      await db.updateModule(id, module);
    }
  }
  