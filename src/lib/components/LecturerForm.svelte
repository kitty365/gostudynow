<script>
    export let actionUrl; // URL für das Formular (z. B. ?/create oder ?/update)
    export let lecturer = {}; // Vorbelegte Lehrperson-Daten

    let name = lecturer.name || "";
    let kuerzel = lecturer.kuerzel || "";

</script>

<form method="POST" action={actionUrl}>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" class="form-control" bind:value={name} required />
    </div>
    <div class="mb-3">
        <label for="kuerzel" class="form-label">Kürzel</label>
        <input id="kuerzel" name="kuerzel" class="form-control" bind:value={kuerzel} required />
    </div>

    <button type="submit" class="btn btn-primary">Speichern</button>
</form>
