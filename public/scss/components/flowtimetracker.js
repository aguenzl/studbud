// There are three timers: one for the flow, one for the break and one for the interruptions. First, establish the 
// variables for each incremenet of time for each timer. Set it to zero as it needs to start from zero. 
let [flowSeconds,flowMinutes,flowHours] = [0,0,0];
let [breakSeconds,breakMinutes,breakHours] = [0,0,0];
let [interruptSeconds,interruptMinutes,interruptHours] = [0,0,0];

// For each timer there is a button that triggers the corresponding timer to start. 
// Establish the state of each button as if it the user had just clicked the button off. 
let flowState = "endFlow";
let breakState = "endBreak";
let interruptState = "endInterrupt";

// Establish the query selector for each button/timer so it returns the element inside the brackets. This refers to 
// the code in the html and css - so what actually makes it show up on the screen as well as the stylistic elements.  
let flowRef = document.querySelector('.flowDisplay');
let breakRef = document.querySelector('.breakDisplay');
let interruptRef = document.querySelector('.interruptDisplay');
// Establish the buttons so they return the corresponding element in the html and css. 
let btnFlow = document.getElementById("controlFlow");
let btnBreak = document.getElementById("breakFlow");
let btnInterrupt = document.getElementById("interruptFlow");


//declare the int variables which hold the 'handle' of each timer interval used. It is set to null as no timer has been started.
let intFlow = null;
let intBreak = null;
let intInterrupt = null;

//Set the buttons so only the 'Start Flow' button is visible. The user shouldn't be able to log a break or interruption
// if they haven't started the flow yet. 
btnFlow.style.visibility = 'visible';
btnBreak.style.visibility = 'hidden';
btnInterrupt.style.visibility = 'hidden';

// this sets the html contents of each timer on the page. 
flowRef.innerHTML = 'Flow = 00 : 00 : 00 ';
breakRef.innerHTML = 'Break = 00 : 00 : 00 ';
interruptRef.innerHTML = 'Interruption = 00 : 00 : 00 ';

// the flow log is the list at the end of the page where the total flow, breaks and interruptions are. the incremenets of  time 
// have to be set from zero as that's where the total time will be added to. 
let flowLog = document.querySelector('.flowLog');
let [totalBreakHours,totalBreakMinutes,totalBreakSeconds] = [0,0,0];
let [totalInterruptHours,totalInterruptMinutes,totalInterruptSeconds] = [0,0,0];

// This is where the 'Start Flow'/'End Flow' button gets manipulated. It is called 'controlFlow' as the user controls
// when it starts and stops. 
document.getElementById('controlFlow').addEventListener('click', ()=>{
 // Create an if statement for when 'Start Flow' is selected. When it is selected the colour of the button will 
 // change from green to the dark blue colour. The name of the button will be changed to "End Flow". The break and 
 // interrupt button will be visible now for the user to select if needed. 
    if (flowState == "endFlow") {
        flowState = "startFlow";
        flowRef.setAttribute("style", "background-color:green;");

        btnFlow.innerText = "End Flow";
        btnFlow.setAttribute("style", "background-color:#242582;");
        btnBreak.style.visibility = 'visible';
        btnInterrupt.style.visibility = 'visible';
//this wakes up the relevant function - thereby clearing the flow timer specifically 
        if(intFlow!==null) { clearInterval(intFlow); }
        intFlow = setInterval(displayFlow,1000);
// the else part refers to when the 'End Flow' button is selected. This means it is displayed as "Start Flow". 
// The colour is that dark blue colour and the other two buttons are hidden. 
    } else if (flowState == "startFlow") {
        flowState = "endFlow";
        flowRef.setAttribute("style", "background-color:#242582;");
        btnFlow.innerText = "Start Flow";
        btnInterrupt.style.visibility = 'hidden';
        btnBreak.style.visibility = 'hidden';
        btnFlow.setAttribute("style", "background-color:green;");
        clearInterval(intFlow);
 // Log the flow and display the results of the three buttons. 
        addToFlowLog("Flow", flowHours, flowMinutes, flowSeconds);
        addToFlowLog("Total Breaks", totalBreakHours, totalBreakMinutes, totalBreakSeconds);
        addToFlowLog("Total Interruptions", totalInterruptHours, totalInterruptMinutes, totalInterruptSeconds);
        [flowSeconds,flowMinutes,flowHours] = [0,0,0];
        [totalBreakHours,totalBreakMinutes,totalBreakSeconds] = [0,0,0];
        [totalInterruptHours,totalInterruptMinutes,totalInterruptSeconds] = [0,0,0];
        flowRef.innerHTML = 'Flow = 00 : 00 : 00 ';
    }
});
// This is where the 'Start Break'/'End Break' button gets manipulated. It is called 'breakFlow' as the user intentionally
// breaks the flow. 
// Create an if statement for when 'Start Break' is clicked. That means the button would've been on the 'End Break' 
// button beforehand. The other two buttons are made invisible and the colour of the button is switched from orange to
// blue. 
document.getElementById('breakFlow').addEventListener('click', ()=>{
    if (breakState == "endBreak") {
        breakState = "startBreak";
        btnFlow.style.visibility = 'hidden';
        btnInterrupt.style.visibility = 'hidden';
        flowRef.setAttribute("style", "background-color:orange;");
        btnBreak.innerText = "End Break";
        btnBreak.setAttribute("style", "background-color:#242582;");
        clearInterval(intFlow);
        //this wakes up the relevant function - thereby clearing the break timer specifically 
        if(intBreak!==null) { clearInterval(intBreak); }
        intBreak = setInterval(displayBreak,1000);
// otherwise the state of the button is 'Start Break' meaning 'End Break' was clicked. The buttons are visible again 
// as it means the flow timer is running again and breaks or interruptions can be logged. The colour is set from dark blue 
// back to orange.
    } else if (breakState == "startBreak") {
        breakState = "endBreak";
        btnFlow.style.visibility = 'visible';
        btnInterrupt.style.visibility = 'visible';
        flowRef.setAttribute("style", "background-color:#242582;");
        btnBreak.innerText = "Start Break";
        btnBreak.setAttribute("style", "background-color:orange;");
        intFlow = setInterval(displayFlow,1000);
        clearInterval(intBreak);
// Log the break so it counts the total hours minutes and seconds of each break.
        addToFlowLog("Break", breakHours, breakMinutes, breakSeconds);
        totalBreakHours = totalBreakHours + breakHours;
        totalBreakMinutes = totalBreakMinutes + breakMinutes;
        totalBreakSeconds = totalBreakSeconds + breakSeconds;
        [breakSeconds,breakMinutes,breakHours] = [0,0,0];
        breakRef.innerHTML = 'Break = 00 : 00 : 00 ';
    }
});
// This is where the 'Start Interruption'/'End Interruption' button gets manipulated. It is called 'InterruptFlow' as the user unintentionally
// breaks the flow. 
// Create an if statement for when 'Start Interruption' is clicked. That means the button would've been on the 'End Interruption' 
// button beforehand. The other two buttons are made invisible and the colour of the button is switched from red to
// dark blue. 
document.getElementById('interruptFlow').addEventListener('click', ()=>{
    if (interruptState == "endInterrupt") {
        interruptState = "startInterrupt";
        btnFlow.style.visibility = 'hidden';
        btnBreak.style.visibility = 'hidden';
        flowRef.setAttribute("style", "background-color:red;");
        btnInterrupt.innerText = "End Interruption";
        btnInterrupt.setAttribute("style", "background-color:#242582;");
        clearInterval(intFlow);
        //this wakes up the relevant function - thereby clearing the interrupt timer specifically 
        if(intInterrupt!==null) { clearInterval(intInterrupt); }
        intInterrupt = setInterval(displayInterrupt,1000);
// Otherwise the state of the button is 'Start Interruption' meaning 'End Interruption' was clicked. The buttons are visible again 
// as it means the flow timer is running again and breaks or interruptions can be logged. The colour is set from dark blue 
// back to red.
    } else if (interruptState == "startInterrupt") {
        interruptState = "endInterrupt";
        btnFlow.style.visibility = 'visible';
        btnBreak.style.visibility = 'visible';
        flowRef.setAttribute("style", "background-color:#242582;");
        btnInterrupt.innerText = "Start Interruption";
        btnInterrupt.setAttribute("style", "background-color:red;");
        // Resume flow timer when "End Interruption" is clicked. 
        intFlow = setInterval(displayFlow,1000);
        clearInterval(intInterrupt);
        // Log the total interruption times.
        addToFlowLog("Interruption", interruptHours, interruptMinutes, interruptSeconds);
        totalInterruptHours = totalInterruptHours + interruptHours;
        totalInterruptMinutes = totalInterruptMinutes + interruptMinutes;
        totalInterruptSeconds = totalInterruptSeconds + interruptSeconds;
        [interruptSeconds,interruptMinutes,interruptHours] = [0,0,0];
        interruptRef.innerHTML = 'Interruption = 00 : 00 : 00 ';
    }
});

// this is to make sure the time is shown correctly. If the number is less than 10, it will have a zero before it. 
function formatTimeString(h, m, s) {
    let dh = h < 10 ? "0" + h : h;
    let dm = m < 10 ? "0" + m : m;
    let ds = s < 10 ? "0" + s : s;
    return `${dh} : ${dm} : ${ds}`;
}

// This is for the flow timer. The code runs the loop again after every second. If 60 seconds loop through, 
// it adds one to the minute section. If 60 minutes loop through, it adds one to the hour section.
function displayFlow(){
    flowSeconds++;

    if(flowSeconds == 60) {
        flowSeconds = 0;
        flowMinutes++;
        if(flowMinutes == 60){
            flowMinutes = 0;
            flowHours++;
        }
    }

     let fh = flowHours < 10 ? "0" + flowHours : flowHours;
    let fm = flowMinutes < 10 ? "0" + flowMinutes : flowMinutes;
    let fs = flowSeconds < 10 ? "0" + flowSeconds : flowSeconds;
    flowRef.innerHTML = `Flow = ${fh} : ${fm} : ${fs} `;

    // Format the string so when the 'End Flow' is clicked, the total flow time is displayed.
     flowRef.innerHTML = 'Flow = ' + formatTimeString(flowHours, flowMinutes, flowSeconds);
}

//This is the same as displayFlow yet it loops round on the break timer. 
function displayBreak(){
    breakSeconds++;
    if(breakSeconds == 60){
        breakSeconds = 0;
        breakMinutes++;
        if(breakMinutes == 60){
            breakMinutes = 0;
            breakHours++;
        }
    }

     let bh = breakHours < 10 ? "0" + breakHours : breakHours;
    let bm = breakMinutes < 10 ? "0" + breakMinutes : breakMinutes;
    let bs = breakSeconds < 10 ? "0" + breakSeconds : breakSeconds;
    breakRef.innerHTML = `Break = ${bh} : ${bm} : ${bs} `;

        // Format the string so when the 'End Break' is clicked, the time of the break is displayed.
    breakRef.innerHTML = 'Break = ' + formatTimeString(breakHours, breakMinutes, breakSeconds);
}

//This is the same as displayFlow yet it loops round on the interrupt timer. 
function displayInterrupt(){
    interruptSeconds++;
    if(interruptSeconds == 60){
        interruptSeconds = 0;
        interruptMinutes++;
        if(interruptMinutes == 60){
            interruptMinutes = 0;
            interruptHours++;
        }
    }

     let ih = interruptHours < 10 ? "0" + interruptHours : interruptHours;
    let im = interruptMinutes < 10 ? "0" + interruptMinutes : interruptMinutes;
    let is = interruptSeconds < 10 ? "0" + interruptSeconds : interruptSeconds;
    interruptRef.innerHTML = `Interruption = ${ih} : ${im} : ${is} `;
        
    // Format the string so when the 'End Interruption' is clicked, the time of the interruption is displayed.

    interruptRef.innerHTML = 'Interruption = ' + formatTimeString(interruptHours, interruptMinutes, interruptSeconds);
   }
   
   // This is the string to show the entire flow log. It will be displayed as the type (flow, break or interrupt) and the duration afterwards.
function addToFlowLog(logType, logHours, logMinutes, logSeconds) {
    flowLog.innerHTML = flowLog.innerHTML + "<br> " + logType + " of duration " + formatTimeString(logHours, logMinutes, logSeconds);
}