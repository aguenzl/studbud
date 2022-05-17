let [centiseconds, seconds, minutes, hours] = [
    0,
    0,
    0,
    0
];
let timerRef = document.querySelector('.timerDisplay');
let int = null;
document.getElementById('startTimer').addEventListener('click', ()=>{
    if (int !== null) clearInterval(int);
    int = setInterval(displayTimer, 10);
});
document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});
document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [centiseconds, seconds, minutes, hours] = [
        0,
        0,
        0,
        0
    ];
    timerRef.innerHTML = '00 : 00 : 00 : 00 ';
});
function displayTimer() {
    centiseconds += 1;
    if (centiseconds == 100) {
        centiseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let cs = centiseconds < 10 ? "0" + centiseconds : centiseconds;
    // : centiseconds < 100 ? "0" + centiseconds : centiseconds;
    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${cs}`;
}

//# sourceMappingURL=stopwatch.e36ad006.js.map
