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
			<h2>{dayKey}</h2>
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

  /* Timeline-Container */
.timeline-container {
	position: relative;
	margin: 2rem auto;
	padding: 1rem 0;
	width: 80%;
	border-left: 8px solid #ce3a7a; /* Linie der Timeline */
}

/* Gruppenkopf für jeden Tag */
.timeline-day {
	margin-bottom: 1rem;
	padding-left: 2rem;
}

.timeline-day h2 {
	font-size: 1.2rem;
	color: #007bff;
	margin-bottom: 0.5rem;
}

/* Einzelne Timeline-Items */
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
	width: 2.5rem; /* Punktgröße */
	height: 2.5rem; /* Punktgröße */
	background-color: #61b823;
	color: white;
	font-size: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%; /* Runde Punkte */
	font-weight: bold;
}

/* Inhalt der Timeline */
.timeline-content {
	background: #abc2da;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.174);
	width: calc(100% - 2rem); /* Platz für den Punkt lassen */
	margin-left: 2.5rem;
}

</style>