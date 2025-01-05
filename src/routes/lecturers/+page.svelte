<script>
  import LecturerCard from "$lib/components/lecturerCard.svelte";
  let { data } = $props();

  console.log("Loaded lecturers:", data.lecturers); // Debugging-Log

</script>


<div class="row mt-3">
  {#each data.lecturers as lecturer}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <LecturerCard {lecturer}></LecturerCard>
    </div>
  {/each}
</div>
 
