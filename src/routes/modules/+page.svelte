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
<br>
<h1>Module</h1>
<div class="row mt-3">
	{#each modules as module}
		<div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
			<ModuleCard {module}></ModuleCard>
		</div>
	{/each}
</div>
