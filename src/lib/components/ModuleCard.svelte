<script>
	import { enhance } from '$app/forms';
	export let module; // Modul-Daten
</script>

<div class="module-card">
	<div class="title">
		<h3><a href={'/modules/' + module._id} >{module.name}</a></h3>
	</div>

	<div class="goals">
		<p>{module.goals || 'Kein Ziel definiert'}</p>
	</div>

	<div class="mt-3">
		{#if module.current}
			<form method="POST" action="?/removeCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn btn-danger">Laufend</button>
			</form>

		{:else}
			<form method="POST" action="?/addToCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn btn-success">Archiv</button>
			</form>
		{/if}
	</div>
</div>
