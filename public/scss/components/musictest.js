let int = null;

document.getElementById('musicSearch').addEventListener('click', ()=>{
    var diagnostic = document.getElementById("diagnostic");
    diagnostic.innerHTML = document.getElementById("input_search").value;
});

