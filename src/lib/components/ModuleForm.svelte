<script>
    export let actionUrl; // URL für das Formular (z. B. ?/update)
    export let module = {}; // Vorbelegte Modul-Daten
    export let lecturers = []; // Liste der verfügbaren Dozenten

    let moduleName = module.name || "";
    let description = module.description || "";
    let selectedLecturer = module.lecturer || ""; // Lehrer-ID
    let newLecturer = ""; // Neuer Lehrer
    let content = module.content || "";
    let goals = module.goals || "";
    let startDate = module.startDate || "";
    let endDate = module.endDate || "";
</script>

<form method="POST" action={actionUrl}>
    <div class="mb-3">
        <label for="moduleName" class="form-label">Modulname</label>
        <input id="moduleName" name="moduleName" class="form-control" bind:value={moduleName} required />
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Beschreibung</label>
        <textarea id="description" name="description" class="form-control" bind:value={description}></textarea>
    </div>
    <div class="mb-3">
        <label for="lecturer" class="form-label">Lehrperson</label>
        <select id="lecturer" name="lecturer" class="form-select" bind:value={selectedLecturer}>
            <option value="" disabled selected>Lehrperson auswählen</option>
            {#each lecturers as lecturer}
                <option value={lecturer._id}>{lecturer.name}</option>
            {/each}
        </select>
        <input
            type="text"
            name="newLecturer"
            class="form-control mt-2"
            placeholder="Oder neuen Dozenten erstellen"
            bind:value={newLecturer}
        />
    </div>
    <div class="mb-3">
        <label for="content" class="form-label">Inhalt</label>
        <textarea id="content" name="content" class="form-control" bind:value={content}></textarea>
    </div>
    <div class="mb-3">
        <label for="goals" class="form-label">Persönliche Ziele</label>
        <textarea id="goals" name="goals" class="form-control" bind:value={goals}></textarea>
    </div>
    <div class="mb-3">
        <label for="startDate" class="form-label">Startdatum</label>
        <input id="startDate" name="startDate" type="date" class="form-control" bind:value={startDate} />
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">Enddatum</label>
        <input id="endDate" name="endDate" type="date" class="form-control" bind:value={endDate} />
    </div>
    <button type="submit" class="btn btn-primary">Speichern</button>
</form>
