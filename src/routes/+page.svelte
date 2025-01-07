<script>
	let time = 0; // Zeit in Sekunden
	let interval;
	let isRunning = false;
	let selectedBackground = 'src/static/pflanze.jpg'; // Standardhintergrundbild

	// Timer starten/pausieren
	const toggleTimer = () => {
		if (isRunning) {
			clearInterval(interval); // Timer stoppen
		} else {
			interval = setInterval(() => {
				time++; // Zeit erhöhen
				saveState(); // Laufenden Timer speichern
			}, 1000);
		}
		isRunning = !isRunning; // Zustand umschalten
		saveState(); // Zustand und Zeit speichern
	};

	// Timer zurücksetzen
	const resetTimer = () => {
		clearInterval(interval); // Intervall stoppen
		time = 0; // Zeit zurücksetzen
		isRunning = false; // Timer pausieren
		saveState(); // Zustand speichern
	};

	// Zustand und Zeit speichern
	const saveState = () => {
		sessionStorage.setItem('timer_time', time); // Zeit speichern
		sessionStorage.setItem('timer_running', isRunning); // Zustand speichern
	};

	// Zustand und Zeit laden
	const loadState = () => {
		const savedTime = sessionStorage.getItem('timer_time');
		const savedRunning = sessionStorage.getItem('timer_running');

		if (savedTime) {
			time = parseInt(savedTime); // Gespeicherte Zeit laden
		}
		if (savedRunning === 'true') {
			isRunning = true; // Gespeicherten Zustand laden
			startTimer(); // Timer wieder starten
		}
	};
// Timer starten (nur für loadState)
const startTimer = () => {
		interval = setInterval(() => {
			time++; // Zeit erhöhen
			saveState(); // Laufenden Timer speichern
		}, 1000);
	};

	// Sichtbarkeitsänderung behandeln
	const handleVisibilityChange = () => {
		if (document.hidden && isRunning) {
			clearInterval(interval); // Timer pausieren
			isRunning = false; // Zustand auf "pausiert" setzen
			saveState(); // Zeit und Zustand speichern
		}
	};

	// Eventlistener hinzufügen
	import { onMount, onDestroy } from 'svelte';
	onMount(() => {
		// Gespeicherten Zustand laden
		loadState();

		// Eventlistener hinzufügen
		document.addEventListener('visibilitychange', handleVisibilityChange);
	});

	onDestroy(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange);
		clearInterval(interval); // Intervall stoppen
	});

	//speichern und zum create form weiterleiten
	const handleSaveAndCreate = () => {
		clearInterval(interval);
		isRunning = false;
		const queryParams = `?time=${time}&date=${getCurrentDate()}`;
		window.location.href = `/sessions/create${queryParams}`;
	};


    	//aktuelles Datum
	const getCurrentDate = () => {
		const today = new Date();
		return today.toISOString().split('T')[0]; // YYYY-MM-DD
	};

	// Funktion zum Ändern des Hintergrundbildes
	const changeBackground = (imagePath) => {
		selectedBackground = imagePath;
	};
</script>

<div class="timer-container" style="background-image: url({selectedBackground});">
	<p class="timer-display">
		{Math.floor(time / 3600)}h {Math.floor((time % 3600) / 60)}m {time % 60}s
	</p>
	<div class="timer-buttons">
		<button on:click={toggleTimer} class="btn {isRunning ? 'btn-warning' : 'btn-success'}">
			{isRunning ? '▐▐ Pause' : '▶ Study Now'}
		</button>
		<button on:click={resetTimer} class="btn btn-danger">Reset Timer</button>
	</div>
	<button on:click={handleSaveAndCreate} class="btn btn-primary"> Save and Create Session </button>
</div>

<div class="background-selector">
	<div class="background-options">
		<button
			type="button"
			on:click={() => changeBackground('src/static/flower.jpg')}
			on:keydown={(e) => e.key === 'Enter' && changeBackground('src/static/flower.jpg')}
		>
			<img
				src="src/static/flower.jpg"
				alt="flower"
				class={selectedBackground === 'src/static/flower.jpg' ? 'selected' : ''}
			/>
		</button>
		<button
			type="button"
			on:click={() => changeBackground('src/static/pflanze.jpg')}
			on:keydown={(e) => e.key === 'Enter' && changeBackground('src/static/pflanze.jpg')}
		>
			<img
				src="src/static/pflanze.jpg"
				alt="pflanze"
				class={selectedBackground === 'src/static/pflanze.jpg' ? 'selected' : ''}
			/>
		</button>
		<button
			type="button"
			on:click={() => changeBackground('src/static/mond.jpg')}
			on:keydown={(e) => e.key === 'Enter' && changeBackground('src/static/mond.jpg')}
		>
			<img
				src="src/static/mond.jpg"
				alt="mond"
				class={selectedBackground === 'src/static/mond.jpg' ? 'selected' : ''}
			/>
		</button>
		<button
			type="button"
			on:click={() => changeBackground('src/static/turm.jpg')}
			on:keydown={(e) => e.key === 'Enter' && changeBackground('src/static/turm.jpg')}
		>
			<img
				src="src/static/turm.jpg"
				alt="turm"
				class={selectedBackground === 'src/static/turm.jpg' ? 'selected' : ''}
			/>
		</button>

		<button
			type="button"
			on:click={() => changeBackground('src/static/stadt.jpg')}
			on:keydown={(e) => e.key === 'Enter' && changeBackground('src/static/stadt.jpg')}
		>
			<img
				src="src/static/stadt.jpg"
				alt="stadt"
				class={selectedBackground === 'src/static/stadt.jpg' ? 'selected' : ''}
			/>
		</button>
	</div>
</div>

<style>
	.timer-container {
		margin: auto;
		padding: 8rem;
		margin-top: 5rem;
		border-radius: 20px;
		text-align: center;
		box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.453);
		background-size: cover;
		background-position: right;
	}

	.timer-display {
		font-size: 5rem;
		font-weight: bold;
		color: rgba(245, 245, 220, 0.835);
	}

	.btn {
		padding: 1rem;
		font-size: 18px;
		font-weight: bold;
		border-radius: 50px;
		margin: 0.4rem;
		border: none;
		background-color: rgba(65, 105, 225, 0.803);
	}

	/* Hintergrundbild-Auswahl */
	.background-selector {
		position: absolute;
		bottom: 10px;
		right: 10px;
		background-color: transparent;
		padding: auto;
	}

	.background-options {
		display: flex;
		gap: 1rem;
		background-color: transparent;
	}

	.background-options img {
		width: 50px;
		height: 50px;
		border-radius: 30px;
		cursor: pointer;
		border: 2px solid transparent;
		transition:
			transform 0.2s,
			border-color 0.2s;
	}

	.background-options img:hover {
		transform: scale(0.9);
	}

	.background-options img.selected {
		border-color: #74b716;
	}

	.background-options button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
</style>
