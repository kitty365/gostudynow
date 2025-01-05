<script>
  import ModuleCard from "$lib/components/ModuleCard.svelte";
  let { data } = $props();

  console.log("Loaded modules:", data.modules); // Debugging-Log

</script>


<div class="row mt-3">
  {#each data.modules as module}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <ModuleCard {module}></ModuleCard>
    </div>
  {/each}
</div>


