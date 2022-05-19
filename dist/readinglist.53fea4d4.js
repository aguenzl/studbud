const rlists = document.querySelectorAll(".rlistitem");
// const all_status = document.querySelectorAll(".status");
let draggablerlist = null;
rlists.forEach((rlist)=>{
    rlist.addEventListener("dragstart", dragStart);
    rlist.addEventListener("dragend", dragEnd);
});
function dragStart() {
    draggablerlist = this;
    setTimeout(()=>{
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}
function dragEnd() {
    draggablerlist = null;
    setTimeout(()=>{
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}
//all_status.forEach((status) => {
//  status.addEventListener("dragover", dragOver);
//  status.addEventListener("dragenter", dragEnter);
//  status.addEventListener("dragleave", dragLeave);
//  status.addEventListener("drop", dragDrop);
//});
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
    this.appendChild(draggablerlist);
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
close_modals.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});
window.onclick = (event)=>{
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal)=>modal.classList.remove("active")
        );
        overlay.classList.remove("active");
    }
};
/* create rlist  */ const rlist_submit = document.getElementById("rlist_submit");
// let date = (new Date()).toLocaleDateString('en-US');
rlist_submit.addEventListener("click", createrlist);
function createrlist() {
    let rlist_container = document.getElementById("rlist_container");
    const rlist_div = document.createElement("div");
    const input_texttype_val = document.getElementById("rlist_input_texttype").value;
    const input_author_val = document.getElementById("rlist_input_author").value;
    const input_title_val = document.getElementById("rlist_input_title").value;
    const input_url_val = document.getElementById("rlist_input_url").value;
    /* ARIELLA: extra fields in here like the line above */ const txt = document.createTextNode("Title: " + input_title_val + ", Author: " + input_author_val + ", Text Type: " + input_texttype_val);
    rlist_div.appendChild(txt);
    rlist_div.classList.add("rlistitem");
    rlist_div.setAttribute("draggable", "true");
    /* create the pop out span */ const span_popout = document.createElement("span");
    var eimg_popout = document.createElement("img");
    eimg_popout.setAttribute("src", "./images/popout.png");
    eimg_popout.setAttribute("height", "8");
    eimg_popout.setAttribute("width", "8");
    eimg_popout.setAttribute("alt", "Pop out to link");
    eimg_popout.setAttribute("href", input_url_val);
    span_popout.appendChild(eimg_popout);
    rlist_div.appendChild(span_popout);
    /* create the pen (edit) span */ /* create the close span */ const span_close = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span_close.classList.add("close");
    span_close.appendChild(span_txt);
    rlist_div.appendChild(span_close);
    // save the URL as an attribute for use when the user clicks the 'Open All Links' button
    // rlist_div.setAttribute('URL', input_url_val);
    // add the listener for when they click on the item, it opens a new window with the URL
    // rlist_div.addEventListener('click', function() { window.open(input_url_val, '_blank');}, false);
    /* Add this list item div to the container */ rlist_container.appendChild(rlist_div);
    span.addEventListener("click", ()=>{
        span.parentElement.style.display = "none";
    });
    //   console.log(rlist_div);
    rlist_div.addEventListener("dragstart", dragStart);
    rlist_div.addEventListener("dragend", dragEnd);
    // document.getElementById("rlist_input_task").value = "";
    rlist_form.classList.remove("active");
    overlay.classList.remove("active");
}
const close_btns = document.querySelectorAll(".close");
close_btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        btn.parentElement.style.display = "none";
    });
});

//# sourceMappingURL=readinglist.53fea4d4.js.map
