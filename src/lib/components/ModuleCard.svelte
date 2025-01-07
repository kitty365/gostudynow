<script>
	import { enhance } from '$app/forms';
	export let module; // Modul-Daten
</script>

<div class="module-card p-3 shadow-sm rounded border">
	<div class="title mb-3">
		<h3>
			<a href={'/modules/' + module._id} class="text-primary text-decoration-none">{module.name}</a>
		</h3>
	</div>

	<div class="goals mb-3">
		<p class="text-muted">{module.goals || 'Kein Ziel definiert'}</p>
	</div>

	<div>
		{#if module.current}
			<form method="POST" action="?/removeCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn btn-danger w-100">Laufend</button>
			</form>
		{:else}
			<form method="POST" action="?/addToCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn btn-success w-100">Archiv</button>
			</form>
		{/if}
	</div>
</div>
