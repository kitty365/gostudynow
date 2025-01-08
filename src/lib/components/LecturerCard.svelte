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
</div>
