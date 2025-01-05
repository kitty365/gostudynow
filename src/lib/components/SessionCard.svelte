<script>
    export let session; // Korrekt: session wird als Prop übergeben

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };
</script>

<div class="session-card">
    <div class="title">
        <a href={'/sessions/' + session._id}>{session.title}</a>
    </div>
    <div>Beschreibung: {session.description || "Keine Beschreibung verfügbar"}</div>
    <div>Laufzeit: {formatTime(session.elapsedTime)}</div> <!-- Formatiert -->
    <div>Datum: {session.date || "Kein Datum angegeben"}</div>
    <div>Modul: {session.module || "Kein Modul"}</div> <!-- Zeigt jetzt den Namen des Moduls -->
</div>
