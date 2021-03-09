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
    e.preventDefault();
    if(pg>1)
      window.location= "/home/?page="+(parseInt(pg)-1);
  });
  mvbtns[1].addEventListener('click',(e)=>{
    e.preventDefault();
    window.location = "/home/?page="+(parseInt(pg)+1);
  }) ;
}

function setVars(){
  var a = document.querySelectorAll(".href-links ul li a")[3];
  a.innerHTML = JSON.parse(atob(document.cookie.split("name=")[1]))["name"].split(" ")[0];
}

let start = () => {
  let host = window.location.href;
  if(!host.includes("favourites") && !host.includes("search"))
    pagination();
  favs();
  setFavs();
};

start();