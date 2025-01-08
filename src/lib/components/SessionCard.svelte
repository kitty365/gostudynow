<script>
    export let session; // Korrekt: session wird als Prop übergeben

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };
</script>
<div class="card">

    <div class="titel">
        <a href={'/sessions/' + session._id} class="text-decoration-none">{session.title}</a>
    </div>
    <div>Beschreibung: {session.description || "Keine Beschreibung verfügbar"}</div>
    <div>Laufzeit: {formatTime(session.elapsedTime)}</div> <!-- Formatiert -->
    <div>Modul: {session.module || "Kein Modul"}</div> <!-- Zeigt jetzt den Namen des Moduls -->
</div>



