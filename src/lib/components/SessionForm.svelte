<script>
	export let actionUrl; // URL für das Formular
	export let session = {}; // Session-Daten als leeres Objekt initialisieren
	export let modules = [];

	let title = session.title || '';
	let description = session.description || '';
	let date = session.date || new Date().toISOString().split('T')[0];
	let elapsedTime = session.elapsedTime || 0;
	let selectedModule = session.module || '';
	let newModule = '';

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours}h ${minutes}m ${secs}s`;
	};
</script>

<form method="POST" action={actionUrl}>
	<div class="mb-3">
		<label for="title" class="form-label">Titel</label>
		<input id="title" name="title" class="form-control" bind:value={title} />
	</div>
	<div class="mb-3">
		<label for="description" class="form-label">Beschreibung</label>
		<textarea id="description" name="description" class="form-control" bind:value={description}
		></textarea>
	</div>
	<div class="mb-3">
		<label for="date" class="form-label">Datum</label>
		<input
		id="date"
		name="date"
		type="date"
		class="form-control"
		bind:value={date}
		readonly
		required
	/>	</div>
	<div class="mb-3">
		<label for="elapsedTime" class="form-label">Dauer</label>
		<input
			id="elapsedTime"
			name="elapsedTime"
			class="form-control"
			bind:value={elapsedTime}
			readonly
		/>
		<small class="form-text text-muted">Dauer: {formatTime(elapsedTime)}</small>
	</div>
	<div class="mb-3">
		<label for="module" class="form-label">Modul</label>
		<select id="module" name="module" class="form-select" bind:value={selectedModule}>
			<option value="" disabled selected>Modul auswählen</option>
			{#each modules as module}
				<option value={module._id}>{module.name}</option>
			{/each}
		</select>
		<input
			type="text"
			name="newModule"
			class="form-control mt-2"
			placeholder="Oder ein neues Modul erstellen"
			bind:value={newModule}
		/>
	</div>

	<button type="submit" class="btn btn-primary">Speichern</button>
</form>

