if(document.readyState === 'ready' || document.readyState === 'complete') {
    console.log(document.querySelector(".loader"))
    document.querySelector(".loader").style.display="none";
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      document.querySelector(".loader").style.display="none";
    }
  }
}

function pagination() {
  var pg;
  try {
    pg = window.location.search.split("page=")[1].split("#")[0];
  } catch {}
  if (!pg) pg = 1;
  var mvbtns = document.querySelectorAll('.title-button');
  mvbtns[0].addEventListener('click',(e)=>{
    if(pg>1)
      window.location= "/home/?page="+(pg-1);
  });
  mvbtns[1].addEventListener('click',(e)=>{
    window.location = "/home/?page="+(pg+1);
  }) ;
}

function favs() {
  document.querySelectorAll(".fav-icon").forEach(e=>{
    e.addEventListener('click',(s)=>{
      let id = e.parentElement.parentElement.nextElementSibling["href"].split("id=")[1];
      fetch('/add-fav',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({"id":id})
      });
    })
  })
}

function sideCollapse() {
  var search = document.querySelector(".fa-search");
  var nav = document.querySelector(".sidebar");
  var burger = document.querySelector(".burger");
  search.addEventListener("click", () => {
    document.querySelector(".search").classList.toggle("form-active");
  });
  burger.addEventListener("click", () => {
    nav.classList.toggle("sidebar-active");
  });
}

function setVars(){
  var a = document.querySelectorAll(".href-links ul li a")[3];
  a.innerHTML = JSON.parse(atob(document.cookie.split("name=")[1]))["name"].split(" ")[0];
}

let start = () => {
  let host = window.location.href;
  if (host.includes("search"))
    document.querySelector(".hero").style.display = "none";
  pagination();
  favs();
  sideCollapse();
};

start();