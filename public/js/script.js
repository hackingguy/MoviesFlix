const apiKey = "c0691164";

async function getDescription(title){
  const search = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`)
  let res = await search.json();
  if(res['Response']=='True'){
    let id = res['Search'][0]["imdbID"];
    let mResponse = await fetch(`https://www.omdbapi.com/?i=${res["Search"][0]["imdbID"]}&apikey=${apiKey}`);
    let mDetails = await mResponse.json();
    let description = mDetails["Plot"];
    return description;
  }
  else{
    return "No Description Available";
  }
}

function addDescription(){
  var elems = document.querySelectorAll('.movie-container');
  elems.forEach(async(elem)=>{
    elem.querySelector(".poster-description").innerHTML= await getDescription(elem.querySelector(".movie-name span").innerHTML)
  })
}

function search(txt){
  if (txt.length == 0) {
    document.getElementById("search-bar").innerHTML = "";
  } else {
    fetch("https://api.maplehacks.ml/data/api/title/"+txt)
    .then((res)=>{
      res.json().then((r)=>{
        console.log(r);
      })
    })
  }
}

function sanitize(title) {
  return title
    .split("[18+] ").slice(-1)[0].split(" (")[0].split(" {")[0].split(" [")[0].split("Download ").slice(-1)[0].split("NetFlix ").slice(-1)[0];
}


function autoComplete(inp){
  var currentFocus;
  inp.addEventListener("input",(e)=>{
    var a,b,i,val=this.value;
    closeAllSuggestions();
    if(!val){return false;}
    a = document.createElement("div");
    a.setAttribute("class","autocomplete-items");
    this.parentNode.appendChild(a);
    
  })
}

function pagination(res) {
  var addPages = document.querySelector("div.pagination");
  for (let i = 0; i < 14; i++) {
    var a = document.createElement("a");
    a.href = "/?page=" + (i + 1);
    a.classList.add("page-num");
    a.innerHTML = i + 1;
    addPages.appendChild(a);
  }
  if(document.getElementsByClassName("page-active").length>0)document.getElementsByClassName("page-active")[0].classList.toggle("page-active");
  try{document.getElementsByClassName("page-num")[getPage()-1].classList.toggle("page-active");}
  catch{}
}

function addSticky(){
  var navbar = document.getElementsByClassName("nav-bar")[0];
  if (window.pageYOffset >= navbar.offsetTop+0.5) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function sideCollapse(){
  var search = document.querySelector(".fa-search");
  var nav = document.querySelector(".sidebar");
  var burger = document.querySelector(".burger");
  search.addEventListener('click',()=>{
    document.querySelector('.search').classList.toggle("form-active");
  })
  burger.addEventListener('click',()=>{
    nav.classList.toggle("sidebar-active")
  })
}

let start = ()=>{
  if(screen.width>768){
    addDescription()
  }
  else{
    sideCollapse()
  }
}

start();

