var timeInSecs;
var ticker;
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
countdown = document.getElementById("countdown-wrap")
enableCountdown = document.getElementById("controlliContainer")
enableSecondi = document.getElementById("secondiEnable")
enableStartTime = document.getElementById("startTimeEnable")
enableAudio = document.getElementById("audioCheck")
enableColore = document.getElementById("coloreCheck")
enableOrologio = document.getElementById("timeCheck")
time = document.getElementById('time-wrap');
timeSpan = document.getElementById('time');
separator = document.getElementById('separator');

function enable(){
    enableCountdown.style.display="none"
    countdown.style.display="block"
    if(enableOrologio.checked){
        separator.style.display="block"
        time.style.display="block"
    }

    if(enableStartTime.value!==""){
        let targetTime = new Date(enableStartTime.value).getTime();
        const currentTime = new Date().getTime();

        const timeDiff = targetTime - currentTime;

        if (timeDiff > 0) {
            setTimeout(() => {
                startTimer(enableSecondi.value);
            }, timeDiff);
        } else {
            alert("Errore, l'istante richiesto è già passato.")
        }
    }
}
function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval("tick()", 1000);
}

function tick( ) {
    let times=0
    let secs
    if(times===0){
        secs = timeInSecs-1
        times++
    }else{
        secs=timeInSecs
    }

    if (secs > 0) {
        if(enableAudio.checked){
            if(secs===10){
                shortBeep()
            }
            if(secs >= 1 && secs <= 5){
                shortBeep()
            }
        }

        timeInSecs--;
    }
    else {
        if(enableAudio.checked){
            longBeep()
        }
        if(enableColore.checked){
            newLoop()
        }
        clearInterval(ticker);
        startTimer(enableSecondi.value); //seconds
    }

    var hours= Math.floor(secs/3600);
    secs %= 3600;
    var mins = Math.floor(secs/60);
    secs %= 60;

    let now = new Date()
    timeSpan.textContent = `${((now.getHours() < 10) ? "0" : "")+now.getHours()}:${((now.getMinutes() < 10) ? "0" : "")+now.getMinutes()}:${((now.getSeconds() < 10) ? "0" : "")+now.getSeconds()}`;

    document.getElementById("countdown").innerHTML = (((hours < 10) ? "0" : "") + hours + ":" + ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs)
}
function newLoop(){
    document.body.style.backgroundColor ="#04AA6D";
    setTimeout(() => {
        document.body.style.backgroundColor ="#f1f1f1";
    }, 800);
}


function shortBeep() {
    frequency = 950;
    type='triangle'
    volume = 1;
    duration = 400;
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    oscillator.start();

    setTimeout(
        function(){
            oscillator.stop();
        },
        duration
    );
}

function longBeep() {
    frequency = 952;
    type='triangle'
    volume = 1.5;
    duration = 800;
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    oscillator.start();

    setTimeout(
        function(){
            oscillator.stop();
        },
        duration
    );
}
