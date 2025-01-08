<script>
	import { enhance } from '$app/forms';
	export let module; // Modul-Daten
</script>
<div class="leccard">
	<div class="titel">
	<a href={'/modules/' + module._id} class="text-primary text-decoration-none">{module.name}</a>
	</div>

		<div class="sagen">
			<p>{module.goals || 'Kein Ziel definiert'}</p></div>
	<div>
		{#if module.current}
			<form method="POST" action="?/removeCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn laufend">Laufend</button>
			</form>
		{:else}
			<form method="POST" action="?/addToCurrent" use:enhance>
				<input type="hidden" name="id" value={module._id} />
				<button class="btn archiv">Archiv</button>
			</form>
		{/if}
	</div>


</div>


<style>
	.btn.laufend {
		background-color: #64bb78;
		color:aliceblue;
	}

	.btn.archiv {
		background-color: #9e8a44;
		color: #ffffff;
	}

	.btn.archiv:hover {
		background-color: #ffffff;
		color: #9e8a44;
	}
	.btn.laufend:hover {
		background-color: #ffffff;
		color: #64bb78;
	}

	.btn.archiv , .btn.laufend{
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-weight: bold;
		font-size: 20px;
	}
</style>

