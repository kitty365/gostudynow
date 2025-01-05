<script>
    export let data;
    let session = data.session; // Die Session-Daten

    // Funktion zum Formatieren der Zeit
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };
</script>

<a href="/sessions" class="btn btn-secondary mb-3">Back</a>

<h1>{session.title}</h1>
<div class="row mt-3">
    <div class="col">
        <p>Beschreibung: {session.description || "Keine Beschreibung verfügbar"}</p>
        <p>Laufzeit: {formatTime(session.elapsedTime)}</p>
        <p>Datum: {session.date || "Kein Datum angegeben"}</p>
        <p>
            Modul: 
            {#if session.module}
                <a href={'/modules/' + session.module._id}>{session.module.name}</a>
            {:else}
                Kein Modul zugewiesen
            {/if}
        </p>
        <div class="mt-3">
            <!-- Bearbeiten-Button -->
            <a href={'/sessions/edit/' + session._id} class="btn btn-primary">Bearbeiten</a>

            <!-- Löschen-Formular -->
            <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={session._id}>
                <button class="btn btn-danger">Delete Session</button>
            </form>
        </div>
    </div>
</div>
