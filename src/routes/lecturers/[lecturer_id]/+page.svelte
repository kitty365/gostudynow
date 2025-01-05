<script>
    export let data;
    let lecturer = data.lecturer; // Die lecturer-Daten
    console.log("Loaded lecturer:", lecturer); // Debugging-Log
    
</script>

<a href="/lecturers" class="btn btn-secondary mb-3">Back</a>

<h1>{lecturer.name}</h1>
<div class="row mt-3">
    <div class="col">
        <p>Kürzel: {lecturer.kuerzel || "Keine Beschreibung verfügbar"}</p>
        <p>
            Module: {lecturer.modules || "Kein module zugewiesen"}
        
        </p>
        <div class="mt-3">
            <!-- Bearbeiten-Button -->
            <a href={'/lecturers/edit/' + lecturer._id} class="btn btn-primary">Bearbeiten</a>

            <!-- Löschen-Formular -->
            <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={lecturer._id}>
                <button class="btn btn-danger">Delete lecturer</button>
            </form>
        </div>
    </div>
</div>
