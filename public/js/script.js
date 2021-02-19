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

function pagination(n) {
  var addPages = document.querySelector("div.pagination");
  var start;
  try {
    start = window.location.search.split("page=")[1].split("#")[0];
  } catch {}
  if (!start) start = 1;
  for (let i = start; i <= parseInt(start) + parseInt(n); i++) {
    let a = document.createElement("a");
    a.href = "/?page=" + i;
    a.classList.add("page-num");
    a.innerHTML = i;
    addPages.appendChild(a);
  }
  document.querySelectorAll(`.page-num`)[0].classList.toggle("page-active");
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
  else pagination(8);
  setVars();
  sideCollapse();
};

start();