const player = new Plyr("#player",{
  "speed":{ selected: 1, options: [0.5, 1, 2] }
});

const apiKey = "c0691164";

function collapsible(sec,content,a) {
  sec.addEventListener("click", () => {
    a.classList.toggle("fa-angle-down");
    a.classList.toggle("fa-angle-up");
    if (content.style.maxHeight) content.style.maxHeight = null;
    else content.style.maxHeight = content.scrollHeight + "px";
  });
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

function sideCard(link, time, title) {
  return `<div class="related-movie-container"> <div class="related-poster hover-effect"> <img class="rel-poster" src="${link}" alt="" /> </div> <div class="related-movie-description"> <div class="related-wrapper"> <div class="related-title"> <span>${title}</span> </div> <div class="related-description"> <div class="length"> <span>${time}</span> </div> <div class="imdb-rating"> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> </div> </div> </div> </div> </div>`;
}

function sanitize(title) {
  console.log(title);
  return title
    .split(" (")[0]
    .split("[18+] ")
    .slice(-1)[0]
    .split(" {")[0]
    .split(" [")[0]
    .split("Download ")
    .slice(-1)[0]
    .split("NetFlix ")
    .slice(-1)[0];
}

async function fetchData(id) {
  try {
    let response = await fetch("https://api.maplehacks.ml/data/api/id/" + id);
    let res = await response.json();
    let title = res[0]["title"];
    let source = res[0]["source"];
    let omdb = await fetch(
      "https://www.omdbapi.com/?s=" +
        encodeURIComponent(sanitize(title)) +
        "&apikey="+apiKey
    );
    let search = await omdb.json();
    let description = "No description available";
    if (search["Response"] == "True") {
      let data = await fetch(
        "https://www.omdbapi.com/?i=" +
          search["Search"][0]["imdbID"] +
          "&apikey="+apiKey
      );
      let d = await data.json();
      description = d["Plot"];
    }
    return [title, source, description];
  } catch (err) {
    console.log(err);
  }
}

function switchToPlayer(episode, link) {
  if (document.getElementsByClassName("ep-active").length > 0)
    document
      .getElementsByClassName("ep-active")[0]
      .classList.toggle("ep-active");
  episode.classList.toggle("ep-active");
  player.source = {
    type: "video",
    sources: [
      { src: "https://cdn.plyr.io/static/blank.mp4", type: "video/mp4" },
    ],
  };
  getGoogleLink(link)
    .then((d) => {
      player.source = d;
    })
    .catch((err) => console.log(err));
}

async function getLatest() {
  let response = await fetch("https://api.maplehacks.ml/data/api/latest/5");
  let res = await response.json();
  return res;
}

function movieCard(movieLink, poster, description, title) {
  if(!description) description = "No Description Available";
  return `<div class="related-movie-container animate-bottom"> <a href="${movieLink}" class="movie-link"> <div class="related-poster"> <img src="${poster}" alt="" class="rel-poster" /> <div class="related-movie-description"> <div class="movie-name"> <span>${title}</span> </div> <div class="imdb-rating"> </div> </div> </a></div>`;
}

function fillSidebar(sideBar,data){
  for(var i=0;i<data.length;i++){
    let title = sanitize(data[i]["title"]);
    let id = data[i]["_id"];
    let poster = data[i]["poster"];
    sideBar.innerHTML+=movieCard("/movie/movie.html?id=" + id, poster, undefined, title);
  }
}

async function getGoogleLink(link) {
  const res = await fetch(
    "https://api.maplehacks.ml/data/api/decode/?url=" + link
  );
  const d = await res.text();
  return { type: "video", sources: [{ src: d, type: "video/mp4" }] };
}

async function linkEpisodes(links) {
  var episodes = document.getElementById("ep-list");
  for (var i = 1; i <= Object.keys(links).length; i++) {
    let episode = document.createElement("a");
    let link = links[i];
    episode.classList.add("episode-button");
    episode.innerHTML = `<span class="ep">Ep </span><span class="ep-num">${i}</span>`;
    episode.addEventListener("click", () => {
      switchToPlayer(episode, link);
    });
    episodes.appendChild(episode);
  }
}

var titleBar = (title) => {
  return `<h1>${sanitize(
    title
  )}</h1><div class="rating"><div class="imdb">IMDB</div><div class="stars"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></div></div>`;
};

let initDOM = async () => {
  try {
    let title = document.getElementById("main-title");
    let details = document.getElementById("details");
    let episodes = document.getElementById("episode-header");
    let epList = document.getElementById("ep-list");
    let describe = document.getElementById("describe");
    var content;
    let arrow = document.getElementById("arrow");
    let plus = document.getElementById("plus");
    let sideBar = document.getElementById("related-movies");
    let id;

    try {
      id = window.location.search.split("id=")[1].split("#")[0];
    } catch {
      window.location = "/";
    }
    if (!id) window.location = "/";

    let data = await fetchData(id);
    title.innerHTML = titleBar(data[0]);
    details.innerHTML = `<p align="justify">${data[2]}</p> </div>`;
    if (!data[1]) window.location = "/";
    if (Object.keys(data[1]).length > 1) {
      episodes.style.display = "flex";
      epList.style.display = "flex";
      player.source = await getGoogleLink(data[1][1]);
      linkEpisodes(data[1]);
    } else {
      let src = await getGoogleLink(data[1][1]);
      player.source = src;
    }
    let sideBarData= await getLatest();
    fillSidebar(sideBar,sideBarData);
    content=document.getElementById("details");
    collapsible(describe,content,arrow);
    return true;
  } catch (err) {
    console.log(err);
    return Error(`Got Error ${err}`);
  }
};


function start() {
  initDOM()
    .then(() => console.log("Everything Intialized Perfectly"))
    .catch((e) => console.log(e));
}

sideCollapse()