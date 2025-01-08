<script>
  import LecturerCard from "$lib/components/LecturerCard.svelte";
  let { data } = $props();

  console.log("Loaded lecturers:", data.lecturers); // Debugging-Log

</script>

<h1>Alle Dozente</h1>

<div class="row mt-3">
  {#each data.lecturers as lecturer}
  <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
    <LecturerCard {lecturer}></LecturerCard>
    </div>
  {/each}
</div>
 