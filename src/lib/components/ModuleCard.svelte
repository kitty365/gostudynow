<script>
      import { enhance } from "$app/forms";

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



        
    {#if module.current}
    <form method="POST" action="?/removeCurrent" use:enhance>
        <input type="hidden" name="id" value={module._id} />
        <button class="btn btn-danger">Von Current entfernen</button>
    </form>
      
    {:else}
      <form method="POST" action="?/addToCurrent" use:enhance>
        <input type="hidden" name="id" value={module._id} />
        <button class="btn btn-success">Auf die Current</button>
      </form>
    {/if}



    </div>
</div>
