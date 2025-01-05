<script>
    let time = 0; // Zeit in Sekunden
    let interval;

    const startTimer = () => {
        interval = setInterval(() => {
            time++;
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(interval);
    };

    const resetTimer = () => {
        clearInterval(interval);
        time = 0;
    };

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const handleSaveAndCreate = () => {
        stopTimer();
        const queryParams = `?time=${time}&date=${getCurrentDate()}`;
        window.location.href = `/sessions/create${queryParams}`;
    };
</script>

<h1>Study Now</h1>

<!-- Anzeige der Zeit -->
<p>Elapsed Time: {Math.floor(time / 3600)}h {Math.floor((time % 3600) / 60)}m {time % 60}s</p>

<!-- Timer Steuerung -->
<button on:click={startTimer} class="btn btn-success">Start Timer</button>
<button on:click={stopTimer} class="btn btn-warning">Stop Timer</button>
<button on:click={resetTimer} class="btn btn-danger">Reset Timer</button>

<!-- Save and Create Session -->
<button on:click={handleSaveAndCreate} class="btn btn-primary">
    Save and Create Session
</button>
