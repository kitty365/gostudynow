<script>
    import SessionForm from "$lib/components/SessionForm.svelte";
    export let data;

    let elapsedTime = data.elapsedTime; // Gestoppte Zeit
    let date = data.date; // Heutiges Datum
    let modules = data.modules || []; // Vorhandene Module
</script>

<a href="/sessions" class="btn btn-secondary mb-3">Zurück</a>

<h1>Neue Session erstellen</h1>
<SessionForm actionUrl="?/create" elapsedTime={elapsedTime} date={date} modules={modules} />
