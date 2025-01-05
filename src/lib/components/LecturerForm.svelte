<script>
    export let actionUrl; // URL für das Formular (z. B. ?/create oder ?/update)
    export let lecturer = {}; // Vorbelegte Lehrperson-Daten

    let name = lecturer.name || "";
    let email = lecturer.email || "";
    let phone = lecturer.phone || "";
    let department = lecturer.department || "";
</script>

<form method="POST" action={actionUrl}>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" class="form-control" bind:value={name} required />
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">E-Mail</label>
        <input id="email" name="email" type="email" class="form-control" bind:value={email} required />
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label">Telefonnummer</label>
        <input id="phone" name="phone" class="form-control" bind:value={phone} />
    </div>
    <div class="mb-3">
        <label for="department" class="form-label">Abteilung</label>
        <input id="department" name="department" class="form-control" bind:value={department} />
    </div>
    <button type="submit" class="btn btn-primary">Speichern</button>
</form>
