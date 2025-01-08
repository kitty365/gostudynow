<script>
	export let lecturer; // Daten des Dozenten als Property
</script>

<div class="leccard">
	<div class="titel">
		<a href={'/lecturers/' + lecturer._id} class="text-primary text-decoration-none"
			>{lecturer.name}</a>
	</div>

	<div class="sagen">
		<p>Kürzel:{lecturer.kuerzel}</p>
	</div>

	<a href={'/lecturers/edit/' + lecturer._id} class="btn btn-primary">Bearbeiten</a>

	<form method="POST" action="?/delete" class="d-inline-block ms-2">
		<input type="hidden" name="id" value={lecturer._id} />
		<button class="btn-danger">Delete</button>
	</form>
</div>
