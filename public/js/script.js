function pagination(n) {
  var addPages = document.querySelector("div.pagination");
  var start = window.location.search.split("page=")[1].split("#")[0];
  if(!start) start=1;
  for (let i = start>1?start-1:start; i <=parseInt(start)+parseInt(n); i++) {
    let a = document.createElement("a");
    a.href = "/?page=" + (i);
    a.classList.add("page-num");
    a.innerHTML = i;
    addPages.appendChild(a);
  }
  document.querySelectorAll(`.page-num`)[1].classList.toggle("page-active");
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
  if(screen.width<=768){
    sideCollapse();
    pagination(8);
  }
  else{
    pagination(8);
  }
}

start();

