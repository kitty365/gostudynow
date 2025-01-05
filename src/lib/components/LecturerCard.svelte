<script>
    export let lecturer; // Daten des Dozenten als Property
</script>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">{lecturer.name}</h5>
      
       
        <div class="mt-3">
            <!-- Details-Button -->
            <a href={'/lecturers/' + lecturer._id} class="btn btn-info">Details anzeigen</a>

            <!-- Bearbeiten-Button -->
            <a href={'/lecturers/edit/' + lecturer._id} class="btn btn-primary ms-2">edit</a>

            <!-- Löschen-Formular -->
            <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={lecturer._id}>
                <button class="btn btn-danger">x</button>
            </form>
        </div>
    </div>
</div>
