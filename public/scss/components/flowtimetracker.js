let [seconds,minutes,hours] = [0,0,0];
let currentState = "endFlow";
let flowRef = document.querySelector('.flowDisplay');
let btnControl = document.getElementById("controlFlow");
let btnBreak = document.getElementById("breakFlow");
let btnInterrupt = document.getElementById("interruptFlow");
let int = null;

document.getElementById('controlFlow').addEventListener('click', ()=>{
    if (currentState == "endFlow") {
        currentState = "startFlow";
        flowRef.setAttribute("style", "background-color:green;");
        btnControl.innerText = "End Flow";
        btnControl.setAttribute("style", "background-color:black;");
    } else if (currentState == "startFlow") {
        currentState = "endFlow";
        flowRef.setAttribute("style", "background-color:black;");
        btnControl.innerText = "Start Flow";
        btnControl.setAttribute("style", "background-color:green;");
    }


    // if(int!==null){
    //     clearInterval(int);
    // }
    // int = setInterval(displayTimer,10);
});

document.getElementById('breakFlow').addEventListener('click', ()=>{
    // clearInterval(int);
});

document.getElementById('interruptFlow').addEventListener('click', ()=>{
    // clearInterval(int);
    // [centiseconds,seconds,minutes,hours] = [0,0,0,0];
    // timerRef.innerHTML = '00 : 00 : 00 : 00 ';
});

function displayFlow(){
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;

 switch (currentState) {
     case 'startFlow':
     
         break; 
 }
 flowRef.innerHTML = ` ${h} : ${m} : ${s} `;
}