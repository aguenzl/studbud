const rlists = document.querySelectorAll(".rlistitem");
// const all_status = document.querySelectorAll(".status");
let draggablerlist = null;

rlists.forEach((rlist) => {
  rlist.addEventListener("dragstart", dragStart);
  rlist.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggablerlist = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggablerlist = null;
  setTimeout(() => {
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

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create rlist  */
const rlist_submit = document.getElementById("rlist_submit");
// let date = (new Date()).toLocaleDateString('en-US');
rlist_submit.addEventListener("click", create_rlistitem);

function create_rlistitem() {
  let rlist_container = document.getElementById("rlist_container");
  const rlist_div = document.createElement("div");
  
  let elem_title = document.getElementById("rlist_input_title");
  const input_title_val = elem_title.value;

  let elem_author = document.getElementById("rlist_input_author");
  const input_author_val = elem_author.value;

  let elem_texttype = document.getElementById("rlist_input_texttype");
  const input_texttype_val = elem_texttype.value;

  let elem_url = document.getElementById("rlist_input_url");
  const input_url_val = elem_url.value;

/* ARIELLA: extra fields in here like the line above */
  const txt = document.createTextNode("Title: " + input_title_val + ", Author: " + input_author_val  + ", Text Type: " + input_texttype_val);

  rlist_div.appendChild(txt);
  rlist_div.classList.add("rlistitem");
  rlist_div.setAttribute("draggable", "true");

  /* create the pop out span */
  const span_popout = document.createElement("span");
  span_popout.classList.add("popout");
  const link_popout = document.createElement("a");
  link_popout.href = input_url_val;
  link_popout.target = "_blank";
  link_popout.text = "\u2197";
  span_popout.appendChild(link_popout);
  rlist_div.appendChild(span_popout);

  /* create the edit span */
  const span_edit = document.createElement("span");
  span_edit.classList.add("edit");
  const text_edit = document.createTextNode("\u0394");
  span_edit.appendChild(text_edit);
  rlist_div.appendChild(span_edit);

  /* create the close span */
  const span_close = document.createElement("span");
  const text_close = document.createTextNode("\u00D7");
  span_close.classList.add("close");
  span_close.appendChild(text_close);
  span_close.addEventListener("click", () => {
    span_close.parentElement.style.display = "none";
  });
  rlist_div.appendChild(span_close);

  // save the URL as an attribute for use when the user clicks the 'Open All Links' button
  rlist_div.setAttribute('item_title', input_title_val);
  rlist_div.setAttribute('item_author', input_author_val);
  rlist_div.setAttribute('item_type', input_texttype_val);
  rlist_div.setAttribute('item_url', input_url_val);
  
  /* Add this list item div to the container */
  rlist_container.appendChild(rlist_div);

  rlist_div.addEventListener("dragstart", dragStart);
  rlist_div.addEventListener("dragend", dragEnd);

  // Clear out the input fields ready for next time
  elem_title.value = "";
  elem_author.value = "";
  elem_texttype.value = "";
  elem_url.value = "";

  // rlist_form.classList.remove("active");
  overlay.classList.remove("active");
}

function edit_rlistitem() {

}

function set_rlistitem(elem_this_title, val_this_title, elem_this_author, val_this_author, elem_this_texttype, val_this_texttype, elem_this_url, val_this_url) {


}

function open_all_urls () {

}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

document.getElementById("open_all_btn").addEventListener("click", open_all_urls);