<script>
	import SessionCard from '$lib/components/SessionCard.svelte';
	export let data;

	// Neueste Session soll zuoberst sein
	const sortedSessions = data.sessions.sort((a, b) => new Date(b.date) - new Date(a.date));

	// Sessions nach Tag (Datum) gruppieren
	const groupedSessions = sortedSessions.reduce((groups, session) => {
		const sessionDate = new Date(session.date);
		// Gruppenschlüssel als "Tag Monat Jahr" (z. B. "7 Januar 2025")
		const groupKey = sessionDate.toLocaleDateString('de-CH', {
			weekday: 'long',
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
		if (!groups[groupKey]) {
			groups[groupKey] = [];
		}
		groups[groupKey].push(session);
		return groups;
	}, {});
</script>


<h1>Alle Sessions</h1>

<div class="timeline-container">
	{#each Object.entries(groupedSessions) as [dayKey, sessions]}
		<!-- Gruppenkopf für den Tag -->
		<div class="timeline-day">
			{dayKey}
		</div>

		<!-- Einzelne Sessions des gleichen Tages -->
		{#each sessions as session}
			<div class="timeline-item" data-date="{new Date(session.date).getDate()}">
				<div class="timeline-content">
					<SessionCard {session}></SessionCard>
				</div>
			</div>
		{/each}
	{/each}
</div>


<style>

  /* linie */
.timeline-container {
	position: relative;
	margin: 2rem auto;
	padding: 1rem 0;
	width: 80%;
	border-left: 8px solid #555555;
}

.timeline-day {
	margin-bottom: 1rem;
	padding-left: 2rem;
	color:#555555;
	font-size: 2rem;
	font-weight: bold;
}

.timeline-item {
	position: relative;
	margin-bottom: 2rem;
	display: flex;
	align-items: flex-start;
}

/* Punkt an der Timeline */
.timeline-item::before {
	content: "✔"; /* Datum in den Punkt */
	position: absolute;
	left: -2rem; /* Position des Punkts */
	top: 0;
	width: 2.5rem; /* der punkt */
	height: 2.5rem;
	background-color:#555555;
	color: white;
	font-size: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%; /* Runde Punkte */
	font-weight: bold;
}

.timeline-content {
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.174);
	width: 100%;
	margin-left: 2.5rem;
	background-color: rgba(113, 148, 255, 0.268);
}

</style>