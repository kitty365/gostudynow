
<script>
	import ModuleForm from "$lib/components/ModuleForm.svelte";
    export let data; // Geladene Session-Daten
</script>

<a href="/modules" class="btn btn-secondary mb-3">Back</a>

<h1>Modul bearbeiten</h1>

<ModuleForm actionUrl="?/update" module={data.module} lecturers={data.lecturers} />

