<script>
    export let data; // Daten vom Server: Dozent und seine Module
</script>

<a href="/lecturers" class="btn btn-secondary mb-3">Zurück zur Dozentenliste</a>

<h1>Dozent: {data.lecturer.name}</h1>

<p><strong>Beschreibung:</strong> {data.lecturer.description || "Keine Beschreibung verfügbar."}</p>

<h2>Verknüpfte Module</h2>
{#if data.modules.length > 0}
    <ul class="list-group">
        {#each data.modules as module}
            <li class="list-group-item">
                <a href={`/modules/edit/${module._id}`}>{module.name}</a>
                <p>{module.description}</p>
            </li>
        {/each}
    </ul>
{:else}
    <p>Dieser Dozent ist mit keinem Modul verknüpft.</p>
{/if}
