//
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
const all_status_headers = document.querySelectorAll(".status_header");
let formEditStatusHeader = document.getElementById("edit_header_form");
let draggableTodo = null;
todos.forEach((todo)=>{
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});
function dragStart() {
    draggableTodo = this;
    setTimeout(()=>{
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}
function dragEnd() {
    draggableTodo = null;
    setTimeout(()=>{
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}
all_status.forEach((status)=>{
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});
all_status_headers.forEach((status_header)=>{
    // console.log("Setting up status header listener function");
    status_header.addEventListener("dblclick", editStatusHeader);
});
function dragOver(e) {
    e.preventDefault();
//   console.log("dragOver");
}
function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
}
function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}
function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
}
/* modal */ const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");
btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});
function editStatusHeader() {
    // First, pop up the edit header form and grey out the main screen
    formEditStatusHeader.classList.add("active");
    overlay.classList.add("active");
    // Remove all previous header_editing id's 
    // let targetHeaders = document.querySelectorAll(".header_editing");
    // targetHeaders.forEach((targetHeader) => { targetHeader.classList.remove("header_editing"); });
    document.querySelectorAll(".header_editing").forEach((targetHeader)=>{
        targetHeader.classList.remove("header_editing");
    });
    // We need to add an attribute to the form to specify which column heading we are editing
    // so that when the user hits the Save Changes button, we know which column heading to update
    this.classList.add("header_editing");
    // Put the text into the input  
    document.getElementById("input_status_header").value = this.innerText;
}
close_modals.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
        // clean up so that we don't accidentally think there's a column still to edit
        document.querySelectorAll(".header_editing").forEach((targetHeader)=>{
            targetHeader.classList.remove("header_editing");
        });
        console.log("close_modals");
    });
});
window.onclick = (event)=>{
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal)=>modal.classList.remove("active")
        );
        overlay.classList.remove("active");
    // console.log("window.onclick");
    }
};
/* create todo  */ const todo_submit = document.getElementById("todo_submit");
// let date = (new Date()).toLocaleDateString('en-US');
todo_submit.addEventListener("click", createTodo);
function createTodo() {
    const todo_div = document.createElement("div");
    const input_task_val = document.getElementById("todo_input_task").value;
    const input_duedate_val = document.getElementById("todo_input_duedate").value;
    const input_estcompletiontime_val = document.getElementById("todo_input_estcompletiontime").value;
    const input_priority_val = document.getElementById("todo_input_taskpriority").value;
    const txt = document.createTextNode("Task: " + input_task_val + ", Due Date: " + input_duedate_val + ", Est Completion Time: " + input_estcompletiontime_val + "mins" + ", Priority: " + input_priority_val);
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
    /* create span */ const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);
    todo_div.appendChild(span);
    no_status.appendChild(todo_div);
    span.addEventListener("click", ()=>{
        span.parentElement.style.display = "none";
    });
    //   console.log(todo_div);
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
    document.getElementById("todo_input_task").value = "";
    overlay.classList.remove("active");
    document.getElementById("todo_form").classList.remove("active");
}
const close_btns = document.querySelectorAll(".close");
overlay.classList.remove("active");
document.getElementById("edit_header_form").classList.remove("active");
close_btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        btn.parentElement.style.display = "none";
    });
});
const status_submit = document.getElementById("status_submit");
status_submit.addEventListener("click", changeStatusHeader);
function changeStatusHeader() {
    // console.log("changeStatusHeader function");
    let targetHeaders = document.querySelectorAll(".header_editing");
    targetHeaders.forEach((targetHeader)=>{
        targetHeader.innerText = document.getElementById("input_status_header").value;
        targetHeader.classList.remove("header_editing");
    //    console.log(targetHeader);
    });
    overlay.classList.remove("active");
    document.getElementById("edit_header_form").classList.remove("active");
}
function addColumn() {
    // Setup the heading
    const newh1 = document.createElement("h1");
    newh1.classList.add("status_header");
    newh1.innerText = "New Column";
    // Make sure it can also have its heading edited
    newh1.addEventListener("dblclick", editStatusHeader);
    // Setup the new column div
    const newdiv = document.createElement("div");
    newdiv.appendChild(newh1);
    newdiv.classList.add("status");
    document.getElementById("task_list_table").appendChild(newdiv);
    // Setup the column so it can have tasks dragged into/out of it  
    newdiv.addEventListener("dragover", dragOver);
    newdiv.addEventListener("dragenter", dragEnter);
    newdiv.addEventListener("dragleave", dragLeave);
    newdiv.addEventListener("drop", dragDrop);
}
document.getElementById("add_column_btn").addEventListener("click", addColumn);

//# sourceMappingURL=column.77660e75.js.map
