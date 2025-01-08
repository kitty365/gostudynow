<script>
	export let actionUrl; // URL für das Formular (z. B. ?/update)
	export let module = {}; // Vorbelegte Modul-Daten
	export let lecturers = []; // Liste der verfügbaren Dozenten

	let moduleName = module.name;
	let inhalt = module.inhalt;
	let goals = module.goals;
	let startDate = module.startDate;
	let endDate = module.endDate;
	let existingLecturersIds = module.lecturers;

	let newLecturerName = '';
	let newLecturerKuerzel = '';
	let existingLecturers = [];
	// Wir wissen dass lecturers liste incoming ids hat (und existingLexturers auch)
	for (let i = 0; i < lecturers.length; i++) {
		if (existingLecturersIds.includes(lecturers[i]._id)) {
			existingLecturers.push(lecturers[i]);
		}
	}
	// neue und alte (alle selektierte) lecturers
	export let selectedLecturers = lecturers; // {name: 'test', kuerzel: 'test'}
	function isChecked(lecturer) {
		return existingLecturers.some(
			(existing) => existing.name === lecturer.name && existing.kuerzel === lecturer.kuerzel
		);
	}
	console.log('test1' + selectedLecturers.length);

	function addLecturer() {
		if (newLecturerName !== '' && newLecturerKuerzel !== '') {
			let newLecturer = { name: newLecturerName, kuerzel: newLecturerKuerzel };
			selectedLecturers = [...selectedLecturers, newLecturer];
			newLecturer = '';
			console.log('tests3:' + selectedLecturers);
		}
	}
</script>

<form method="POST" action={actionUrl}>
	<div class="mb-3">
		<label for="moduleName" class="form-label">Modulname</label>
		<input
			id="moduleName"
			name="moduleName"
			class="form-control"
			bind:value={moduleName}
			required
		/>
	</div>
	<div class="mb-3">
		
		<label for="inhalt" class="form-label">Inhalt</label>
		<textarea id="inhalt" name="inhalt" class="form-control" bind:value={inhalt}></textarea>
	</div>
	<div class="mb-3">
		<label for="goals" class="form-label">Persönliche Ziele</label>
		<textarea id="goals" name="goals" class="form-control" bind:value={goals}></textarea>
	</div>

	<div class="mb-3">
		<label for="startDate" class="form-label">Startdatum</label>
		<input
			id="startDate"
			name="startDate"
			type="date"
			class="form-control"
			bind:value={startDate}
		/>
	</div>
	<div class="mb-3">
		<label for="endDate" class="form-label">Enddatum</label>
		<input id="endDate" name="endDate" type="date" class="form-control" bind:value={endDate} />
	</div>

	<div class="mb-3">
		<label for="lecturer" class="form-label">Lehrperson</label>
		{#each selectedLecturers as lecturer, index}
			<br />
			<input
				id="lecturer-{index}"
				name="selectedLecturer"
				type="checkbox"
				value={JSON.stringify(lecturer)}
				checked={isChecked(lecturer)}
			/>
			<label for="lecturer-{index}">{lecturer.name}</label>
			<br />
		{/each}
		<input
			type="text"
			name="newLecturerName"
			class="form-control mt-2"
			placeholder="Oder neuen Dozenten erstellen"
			bind:value={newLecturerName}
		/>

		<input
			type="text"
			name="newLecturer"
			class="form-control mt-2"
			placeholder="Kürzel"
			bind:value={newLecturerKuerzel}
		/>
		<button type="button" on:click={addLecturer}>Add</button>
	</div>

	<button type="submit" class="btn btn-primary">Speichern</button>
</form>
