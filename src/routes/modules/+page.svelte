<script>
    import ModuleCard from "$lib/components/ModuleCard.svelte";
    export let data;
  
    console.log("Loaded modules:", data.modules); // Debugging-Log
  </script>
  
  <h1>Alle modules</h1>
  <div class="row mt-3">
    {#each data.modules as module}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <ModuleCard {module}></ModuleCard>
        </div>
    {/each}
  </div>
  