<script>
    let { module } = $props();
</script>

<div class="module-card">
    <div class="title">
        {module.name || "Modulname nicht verfügbar"}
    </div>
    <div>Beschreibung: {module.description || "Keine Beschreibung verfügbar"}</div>
    <div>Lehrperson: 
        {#if module.lecturers && module.lecturers.length > 0}
            <a href={'/lecturers/' + module.lecturers[0]._id}>{module.lecturers[0].name}</a>
        {:else}
            Keine Lehrperson zugewiesen
        {/if}
    </div>
    <div>Inhalt: {module.content || "Kein Inhalt angegeben"}</div>
    <div>Persönliche Ziele: {module.goals || "Keine Ziele definiert"}</div>
    <div>Zeitraum: {module.startDate || "Kein Startdatum"} - {module.endDate || "Kein Enddatum"}</div>

    <div class="mt-3">
        <!-- Bearbeiten-Button -->
        <a href={'/modules/edit/' + module._id} class="btn btn-primary">Bearbeiten</a>

        <!-- Löschen-Formular -->
        <form method="POST" action="?/delete" class="d-inline-block ms-2">
            <input type="hidden" name="id" value={module._id}>
            <button class="btn btn-danger">Delete module</button>
        </form>
    </div>
</div>