<script>
    import LecturerForm from "$lib/components/LecturerForm.svelte";
    export let data;

    let lecturer = {}; // Initialisiere lecturer als leeres Objekt
    let modules = data.modules || []; // Stelle sicher, dass Module immer ein Array ist
  
</script>

<h1>Neue lecturer erstellen</h1>

<LecturerForm actionUrl="?/create" {lecturer} />
