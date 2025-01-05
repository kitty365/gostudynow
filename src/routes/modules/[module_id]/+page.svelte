<script>
    export let data;
    let module = data.module; // Die Modul-Daten
</script>

<a href="/modules" class="btn btn-secondary mb-3">Zurück</a>

<h1>{module.name}</h1>
<div class="row mt-3">
    <div class="col">
        <p>Beschreibung: {module.description || "Keine Beschreibung verfügbar"}</p>
        <p>Inhalt: {module.content || "Kein Inhalt verfügbar"}</p>
        <p>Ziele: {module.goals || "Keine Ziele angegeben"}</p>
        <p>Startdatum: {module.startDate || "Kein Startdatum angegeben"}</p>
        <p>Enddatum: {module.endDate || "Kein Enddatum angegeben"}</p>
        <p>
            Lehrperson:
            {#if module.teacher}
                <a href={'/lecturers/' + module.teacher._id}>{module.teacher.name}</a>
            {:else}
                Keine Lehrperson zugewiesen
            {/if}
        </p>
        <div class="mt-3">
            <!-- Bearbeiten-Button -->
            <a href={'/modules/edit/' + module._id} class="btn btn-primary">Bearbeiten</a>

            <!-- Löschen-Formular -->
            <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={module._id}>
                <button class="btn btn-danger">Modul löschen</button>
            </form>
        </div>
    </div>
</div>
