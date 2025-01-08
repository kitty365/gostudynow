<script>
	import ModuleCard from '$lib/components/ModuleCard.svelte';
	let { data, filterByCurrent = false } = $props();

	let modules = $derived.by(() => {
		if (filterByCurrent) {
			let modulesFiltered = data.modules.filter((module) => module.current);
			return modulesFiltered;
		}

		return data.modules;
	});
</script>

<div class="form-check mt-3">
	<input class="form-check-input" type="checkbox" id="filter" bind:checked={filterByCurrent} />
	<label class="form-check-label" for="filter"> Nur laufende Module anzeigen </label>
</div>
<br />
<h1>Module</h1>
<div class="container mt-3">
	<div class="row">
		{#each modules as module}
			<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
				<ModuleCard {module} />
			</div>
		{/each}
	</div>
</div>

<style>

.form-check-label {
	margin-left: 0.5rem;
	font-size: 20px;
}
</style>