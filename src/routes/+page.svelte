<script>
    import { onMount, onDestroy } from 'svelte';

	let time = 0; // Zeit in Sekunden
	let interval;
	let isRunning = false;
	let selectedBackground = '/pflanze.jpg'; // Standardhintergrundbild

	// Timer starten/pausieren
	const toggleTimer = () => {
		if (isRunning) {
			clearInterval(interval); //stoppen, zeit soll nicht weiterlaufen ++
		} else {
			interval = setInterval(() => {
				time++;
				saveState(); //ständig speichern
			}, 1000);
		}
		isRunning = !isRunning; //pausieren
		saveState();
	};

	// Timer zurücksetzen
	const resetTimer = () => {
		clearInterval(interval);
		time = 0;
		isRunning = false;
	};

	// zustand mit zeit speichern in temporärem speicher des browsers
	const saveState = () => {
		sessionStorage.setItem('timer_time', time);
		sessionStorage.setItem('timer_running', isRunning);
	};

	// zustand mit zeit wieder laden
	const loadState = () => {
		const savedTime = sessionStorage.getItem('timer_time');
		const savedRunning = sessionStorage.getItem('timer_running');

		if (savedTime) {
			time = parseInt(savedTime);
		}
		if (savedRunning === 'true') {
			isRunning = true;
			startTimer(); 
		}
	};
	// funktion sgeht weiter, timer automatisch läuft weiter, eig wird nur noch dieser verwendet
	const startTimer = () => {
		interval = setInterval(() => {
			time++;
			saveState(); 
		}, 1000);
	};

	// Sichtbarkeitsänderung behandeln
	const handleVisibilityChange = () => {
		if (document.hidden && isRunning) {
			clearInterval(interval); 
			isRunning = false; 
			saveState();
		}
	};

	// events
    //hier passierts, wenn plötzlich seite gewechselt wird
	onMount(() => {
		loadState();
		document.addEventListener('visibilitychange', handleVisibilityChange);
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

	// hintergrundbild ändern
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

		<button type="button" on:click={() => changeBackground('/flower.jpg')}>
			<img src="/flower.jpg" alt="flower" class={selectedBackground === '/flower.jpg' ? 'selected' : ''}/>
		</button>

		<button type="button" on:click={() => changeBackground('/pflanze.jpg')}>
			<img src="/pflanze.jpg" alt="pflanze" class={selectedBackground === '/pflanze.jpg' ? 'selected' : ''}/>
		</button>

		<button type="button" on:click={() => changeBackground('/mond.jpg')}>
			<img src="/mond.jpg" alt="mond" class={selectedBackground === '/mond.jpg' ? 'selected' : ''}/>
		</button>

		<button type="button" on:click={() => changeBackground('/turm.jpg')}>
			<img src="/turm.jpg" alt="turm" class={selectedBackground === '/turm.jpg' ? 'selected' : ''}/>
		</button>

		<button type="button" on:click={() => changeBackground('/stadt.jpg')}>
			<img src="/stadt.jpg" alt="stadt" class={selectedBackground === '/stadt.jpg' ? 'selected' : ''}/>
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
