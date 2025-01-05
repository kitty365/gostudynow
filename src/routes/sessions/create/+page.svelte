<script>
    import SessionForm from "$lib/components/SessionForm.svelte";
    export let data;

    let session = {}; // Initialisiere session als leeres Objekt
    let modules = data.modules || []; // Stelle sicher, dass Module immer ein Array ist
    let elapsedTime = data.elapsedTime || 0;
    let date = data.date || "";

    session.elapsedTime = elapsedTime;
    session.date = date;
</script>

<h1>Neue Session erstellen</h1>

<SessionForm actionUrl="?/create" {session} {modules} />
