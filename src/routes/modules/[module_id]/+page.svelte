<script>
    export let data;
    let module = data.module; // Die module-Daten

</script>

<a href="/modules" class="btn btn-secondary mb-3">Back</a>

<div class=cardius>


<h1>{module.name}</h1>
<div class="beschrieb">
 
        
        <p>Inhalt: {module.inhalt}</p>
        <p>Persönliche Ziele: {module.goals}</p>
        <p>Laufzeit: {module.startDate} bis {module.endDate}</p>

        <p>Dozent: {module.lecturers} </p>

        </div>
        <a href={'/modules/edit/' + module._id} class="btn btn-primary">Edit</a>
        <form method="POST" action="?/delete" class="d-inline-block ms-2">
                <input type="hidden" name="id" value={module._id}>
                <button class="btn btn-danger">Delete</button>
        </form>
   
</div>



