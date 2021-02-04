const player = new Plyr("#player", {
  speed: { selected: 1, options: [0.5, 1, 2] },
});

function collapsible(sec, content, a) {
  sec.addEventListener("click", () => {
    a.classList.toggle("fa-angle-down");
    a.classList.toggle("fa-angle-up");
    if (content.style.maxHeight) content.style.maxHeight = null;
    else content.style.maxHeight = content.scrollHeight + "px";
  });
}


let initDOM = async () => {
  try {
    let describe = document.getElementById("describe");
    let arrow = document.getElementById("arrow");
    let content = document.getElementById("details");
    collapsible(describe, content, arrow);
    return true;
  } catch (err) {
    console.log(err);
    return Error(`Got Error ${err}`);
  }
};

function hlsStream() {
  let video = document.querySelector("video");
  let link = document.querySelector("source").src;
  if (link.indexOf(".m3u8") > -1) {
    video.innerHTML = "";
    if (!Hls.isSupported()) {
      console("Supported");
      video.source = { type: "video", sources: [{ src: link }] };
    } else {
      console.log("NSupported");
      const hls = new Hls();
      hls.loadSource(link);
      hls.attachMedia(video);
      window.hls = hls;
    }
    window.player = player;
  }
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


function start() {
  sideCollapse();
  hlsStream();
  initDOM()
    .then(() => console.log("Everything Intialized Perfectly"))
    .catch((e) => console.log(e));
}

start();