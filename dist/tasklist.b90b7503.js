// Basic form DOM elements
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
// Selector for the tasklist output
// var tasklist = document.querySelector("#tasklist > ul");
var tasklist = document.getElementById("tasklist");
var diagnostic = document.getElementById("diagnostic");
// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");
// Form submission event listener
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let completionTime = completionTimeInput.value;
    let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    if (task) addTask(task, dueDate, estimatedTime, priorityRating, completionTime, false);
});
// Create global array to track tasks
var taskListArray = [];
// Function to add task with user inputs as parameters
function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionTime, completionStatus) {
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> Begin addTask";
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        id: Date.now(),
        taskDescription,
        dueDate,
        dateCreated,
        estimatedTime,
        completionTime,
        priorityRating,
        estimatedTime,
        completionStatus
    };
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> About to push task";
    taskListArray.push(task);
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> About to console log";
    console.log(taskListArray);
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> About to enter renderTask";
    renderTask(task);
// diagnostic.innerHTML = diagnostic.innerHTML + "<br> Finished addTask";
}
// Function to display task on screen
function renderTask(task1) {
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> Starting renderTask";
    // Call function - checks if a task has been added
    updateEmpty();
    // Create HTML elements
    let item = document.createElement("li");
    item.setAttribute('data-id', task1.id);
    item.innerHTML = item.innerHTML = "<p>" + task1.taskDescription + "</p> <br>" + "<p>" + task1.dueDate + "</p> <br>" + "<p>" + task1.estimatedTime + "</p> <br>" + "<p>" + task1.priorityRating + "</p>";
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> About to appendChild";
    tasklist.appendChild(item);
    // Extra Task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);
    // diagnostic.innerHTML = diagnostic.innerHTML + "<br> About to addEventListener";
    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex((task)=>task.id === Number(id)
        );
        removeItemFromArray(taskListArray, index);
        console.log(taskListArray);
        updateEmpty();
        item.remove();
    });
    // Clear the input form
    form.reset();
}
// Function to remove item from array
function removeItemFromArray(arr, index) {
    if (index > -1) arr.splice(index, 1);
    return arr;
}
// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
    if (taskListArray.length > 0) document.getElementById('emptyList').style.display = 'none';
    else document.getElementById('emptyList').style.display = 'block';
}

//# sourceMappingURL=tasklist.b90b7503.js.map
