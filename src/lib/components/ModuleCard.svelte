<script>
    export let module; // Modul-Daten
</script>

<div class="module-card">
    <div class="title">
       <h3> {module.name || "Modulname nicht verfügbar"} </h3>
    </div>
    <div>Beschreibung: {module.description || "Keine Beschreibung verfügbar"}</div>
    <div>Zeitraum: {module.startDate || "Kein Startdatum"} - {module.endDate || "Kein Enddatum"}</div>
    <div class="mt-3">
        <a href={'/modules/' + module._id} class="btn btn-info">Details anzeigen</a>
    </div>
</div>
