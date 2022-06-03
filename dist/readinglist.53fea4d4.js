// select CSS element 
const rlists = document.querySelectorAll(".rlistitem");
// insert the element from the HTML/CSS into the document 
document.getElementById("open_all_btn").addEventListener("click", open_all_urls);
// make the pop up modal appear on the screen when add button is pressed //
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");
// activates the modal when the event listener (clicking the button) is carried out. the overlay aka grey screen behind 
// the modal also appears.
btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});
// use an event listener to remove the modal and overlay when the exit button is pressed.
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
// create list of reading list items when 'Add Item' is clicked  // 
const rlist_submit = document.getElementById("rlist_submit");
// let date = (new Date()).toLocaleDateString('en-US');
rlist_submit.addEventListener("click", create_rlistitem);
// create a function which returns all the information inputted by the user as a box.
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
    // this creates a text node which signals the text layout of each reading list item. It returns the title of the information followed by what the 
    // user inputs.
    const txt = document.createTextNode("Title: " + input_title_val + ", Author: " + input_author_val + ", Text Type: " + input_texttype_val);
    rlist_div.appendChild(txt);
    rlist_div.classList.add("rlistitem");
    // create the pop out span so the links are opened in a different tab // 
    const span_popout = document.createElement("span");
    span_popout.classList.add("popout");
    const link_popout = document.createElement("a");
    link_popout.href = input_url_val;
    link_popout.target = "_blank";
    link_popout.text = "\u2197";
    link_popout.classList.add("popout_a");
    span_popout.appendChild(link_popout);
    rlist_div.appendChild(span_popout);
    // create the edit span //
    const span_edit = document.createElement("span");
    span_edit.classList.add("edit");
    const text_edit = document.createTextNode("\u0394");
    span_edit.appendChild(text_edit);
    rlist_div.appendChild(span_edit);
    // create the close span //
    const span_close = document.createElement("span");
    const text_close = document.createTextNode("\u00D7");
    span_close.classList.add("close");
    span_close.appendChild(text_close);
    span_close.addEventListener("click", ()=>{
        span_close.parentElement.style.display = "none";
    });
    rlist_div.appendChild(span_close);
    // save all fields as attributes for use later, eg edit or when the user clicks the 'Open All Links' button
    rlist_div.setAttribute('item_title', input_title_val);
    rlist_div.setAttribute('item_author', input_author_val);
    rlist_div.setAttribute('item_type', input_texttype_val);
    rlist_div.setAttribute('item_url', input_url_val);
    // Add this list item div to the container //
    rlist_container.appendChild(rlist_div);
    // Clear out the input fields ready for next time
    elem_title.value = "";
    elem_author.value = "";
    elem_texttype.value = "";
    elem_url.value = "";
    overlay.classList.remove("active");
}
// create a function which opens the url link of all reading list items into a different tab. 
function open_all_urls() {
    alert("For Open All to work properly, please set your browser to allow popups.");
    // console.log("Begin open_all_urls");
    const popout_a_list = document.querySelectorAll(".popout_a");
    popout_a_list.forEach((popout_a)=>{
        window.open(popout_a.href, "_blank");
    });
}
const close_btns = document.querySelectorAll(".close");
close_btns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        btn.parentElement.style.display = "none";
    });
});

//# sourceMappingURL=readinglist.53fea4d4.js.map
