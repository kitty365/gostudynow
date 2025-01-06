<script>
    export let data;
    let module = data.module; // Die module-Daten

</script>

<a href="/modules" class="btn btn-secondary mb-3">Back</a>

<h1>{module.name}</h1>
<div class="row mt-3">
    <div class="col">
        <p>Inhalt: {module.inhalt}</p>
        <p>Persönliche Ziele: {module.goals}</p>
        <p>Laufzeit: {module.startDate} bis {module.endDate}</p>

        <p>Dozent: {module.lecturers} </p>
        
        <div class="mt-3">
            <!-- Bearbeiten-Button -->
            <a href={'/modules/edit/' + module._id} class="btn btn-primary">Bearbeiten</a>

            <!-- Löschen-Formular -->
            <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={module._id}>
                <button class="btn btn-danger">Delete module</button>
            </form>
        </div>
    </div>
</div>
