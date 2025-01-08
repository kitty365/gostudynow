
<script>
	import LecturerForm from "$lib/components/LecturerForm.svelte";
    export let data; // Geladene Session-Daten
</script>

<a href="/lecturers" class="btn btn-secondary mb-3">Back</a>

<h1>Dozent bearbeiten</h1>

<LecturerForm actionUrl="?/update" lecturer={data.lecturer}/>

