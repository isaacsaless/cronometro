let htmlTimer = document.getElementById("timer");
let htmlMilisecond = document.getElementById("timer-milisecond");
let start = document.getElementById("start");
let pause, unpause, reset;
let buttons = document.getElementById("buttons");
let milisecond, milisecondVal, second, secondVal, minute, minuteVal, hour, hourVal;
milisecond = milisecondVal = second = secondVal = minute = minuteVal = hour = hourVal = 0;
let jsTimer;
let endMessage = document.getElementById("endMessage");

function updateTimer() {
    milisecondVal = milisecond < 10 ? '0' + milisecond : milisecond;
    secondVal = second < 10 ? '0' + second : second;
    minuteVal = minute < 10 ? '0' + minute : minute;
    hourVal = hour < 10 ? '0' + hour : hour;

    htmlTimer.innerHTML = `${hourVal}:${minuteVal}:${secondVal}`;
    htmlMilisecond.innerHTML = `${milisecondVal}`;
}

function btnPause() {
    pause = document.createElement('button');
    pause.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    pause.setAttribute("class", "pause-btn btn");
    pause.setAttribute("id", "pause");
    buttons.appendChild(pause);
}

function endTimer(){
    pause.remove();

    start = document.createElement('button');
    start.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar';
    start.setAttribute("class", "start-btn btn");
    start.setAttribute("id", "start");
    buttons.appendChild(start);

    clearInterval(jsTimer);
    milisecond = milisecondVal = second = secondVal = minute = minuteVal = hour = hourVal = 0;
    updateTimer();
    endMessage.style.display = "block";
}

function sumTimer() {
    milisecond++;
    if (milisecond == 99) {
        second++;
        milisecond = 0;
    }
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hour++;
        minute = 0;
    }
    if (hour == 100) {
        endTimer();
    }
    updateTimer();
}

document.getElementById("buttons").addEventListener("click", function(event) {
    if (event.target && (event.target.id === "start" || event.target.parentElement.id === "start")) {
        jsTimer = setInterval(sumTimer, 10);
        start.remove();
        btnPause();
        endMessage.style.display = "none";
    }
});

document.getElementById("buttons").addEventListener("click", function(event) {
    if (event.target && (event.target.id === "pause" || (event.target.parentElement && event.target.parentElement.id === "pause"))) {
        clearInterval(jsTimer);
        pause.remove();

        unpause = document.createElement('button');
        unpause.innerHTML = '<i class="fa-solid fa-play"></i> Despausar';
        unpause.setAttribute("class", "unpause-btn btn");
        unpause.setAttribute("id", "unpause");
        buttons.appendChild(unpause);

        reset = document.createElement('button');
        reset.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i> Reiniciar';
        reset.setAttribute("class", "reset-btn btn");
        reset.setAttribute("id", "reset");
        buttons.appendChild(reset);
    }
});

document.getElementById("buttons").addEventListener("click", function(event) {
    if (event.target && (event.target.id === "unpause" || (event.target.parentElement && event.target.parentElement.id === "unpause"))) {
        unpause.remove();
        reset.remove();
        jsTimer = setInterval(sumTimer, 10);
        btnPause();
    }
});

document.getElementById("buttons").addEventListener("click", function(event) {
    if (event.target && (event.target.id === "reset" || (event.target.parentElement && event.target.parentElement.id === "reset"))) {
        reset.remove();
        unpause.remove();

        start = document.createElement('button');
        start.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar';
        start.setAttribute("class", "start-btn btn");
        start.setAttribute("id", "start");
        buttons.appendChild(start);

        milisecond = milisecondVal = second = secondVal = minute = minuteVal = hour = hourVal = 0;
        updateTimer();
    }
});
