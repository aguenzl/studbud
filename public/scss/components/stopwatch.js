
// establish each interval of time
let [centiseconds,seconds,minutes,hours] = [0,0,0,0];
// establish the query selector so it returns the timer display element.
let timerRef = document.querySelector('.timerDisplay');
// this will help reset the clock.
let int = null;

// this starts the clock counting upwards when the event listener (clicking the start button)  is triggered.
// it clears any previous time displayed on the clock and starts displaying the time elapsed.
document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});


// this pauses the timer when the event listener (clicking the pause button) is triggered.
// it stops the timer on whatever the current time is on.
document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

// this resets the timer back to zero and makes it display on the screen as such when the event listener 
// (clicking the reset button) is triggered. 
document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [centiseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRef.innerHTML = '00 : 00 : 00 : 00 ';
});

// These if statement dictate when each interval of time moves onto the next.
// The code runs the loop again after every centisecond. If 100 centiseconds loop through, 
// it adds one to the second section. If 60 seconds loop through, it adds a one to the minute section. 
//If 60 minutes loop through, it adds one to the hour section.
function displayTimer(){
    centiseconds+=1;
    if(centiseconds == 100){
        centiseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
// This makes it so if the hours, minutes or seconds have a value of less than ten, it will put a zero
// before the number as to uphold the clean timer format.
 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let cs = centiseconds < 10 ? "0" + centiseconds : centiseconds;  
 // : centiseconds < 100 ? "0" + centiseconds : centiseconds;

 timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${cs}`;
}

// References: Foolish Developer (2021). Create a Simple Stopwatch using JavaScript (Tutorial + Code) https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html