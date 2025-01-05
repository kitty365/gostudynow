<script>
  import SessionCard from "$lib/components/SessionCard.svelte";
  export let data;

  console.log("Loaded sessions:", data.sessions); // Debugging-Log
</script>

<h1>Alle Sessions</h1>
<div class="row mt-3">
  {#each data.sessions as session}
      <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
          <SessionCard {session}></SessionCard>
      </div>
  {/each}
</div>
