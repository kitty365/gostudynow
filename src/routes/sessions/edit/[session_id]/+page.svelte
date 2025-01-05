<script>
    import SessionForm from "$lib/components/SessionForm.svelte";
    export let data; // Geladene Session-Daten
</script>

<a href="/sessions" class="btn btn-secondary mb-3">Zurück</a>

<h1>Session bearbeiten</h1>
<SessionForm actionUrl="?/update" session={data.session} modules={data.modules} />
