<script>
    export let actionUrl; // URL für das Formular (z. B. ?/create oder ?/update)
    export let lecturer = {}; // Vorbelegte Lehrperson-Daten
    export let modules = []; // Liste der verfügbaren Module

    let name = lecturer.name || "";
    let kuerzel = lecturer.kuerzel || "";

    let selectedModule = lecturer.module || ""; // Lehrer-ID
    let newModule = "";
</script>

<form method="POST" action={actionUrl}>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" class="form-control" bind:value={name} required />
    </div>
    <div class="mb-3">
        <label for="kuerzel" class="form-label">Kürzel</label>
        <input id="kuerzel" name="kuerzel" class="form-control" bind:value={kuerzel} required />
    </div>

    <div class="mb-3">
        <label for="module" class="form-label">Modul</label>
        <select id="module" name="module" class="form-select" bind:value={selectedModule}>
            <option value="" disabled selected>Modul auswählen</option>
            {#each modules as module}
                <option value={module._id}>{module.name}</option>
            {/each}
        </select>
        <input
            type="text"
            name="newModule"
            class="form-control mt-2"
            placeholder="Oder neues Modul erstellen"
            bind:value={newModule}
        />
    <button type="submit" class="btn btn-primary">Speichern</button>
</form>
