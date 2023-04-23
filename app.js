var timeInSecs;
var ticker;
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
countdown = document.getElementById("countdown-wrap")
enableCountdown = document.getElementById("controlliContainer")
enableSecondi = document.getElementById("secondiEnable")
enableAudio = document.getElementById("audioCheck")
enableColore = document.getElementById("coloreCheck")


function enable(){
    enableCountdown.style.display="none"
    countdown.style.display="block"
    startTimer(enableSecondi.value); //seconds
}
function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval("tick()", 1000);
}

function tick( ) {
    let secs = timeInSecs;
    if (secs > 0) {
        console.log(timeInSecs)
        if(enableAudio.checked){
            if(timeInSecs===10){
                shortBeep()
            }
            if(timeInSecs >= 1 && timeInSecs <= 5){
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

    var days= Math.floor(secs/86400);
    secs %= 86400;
    var hours= Math.floor(secs/3600);
    secs %= 3600;
    var mins = Math.floor(secs/60);
    secs %= 60;
    var pretty = ( (days < 10 ) ? "0" : "" ) + days + ":" + ( (hours < 10 ) ? "0" : "" ) + hours + ":" + ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;

    document.getElementById("countdown").innerHTML = pretty;
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
