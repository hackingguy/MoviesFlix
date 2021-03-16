async function setFavs() {
  let favs = localStorage.getItem("Favourites");
  let favList = favs.split(",");
  var movies = document.querySelectorAll(".movie-container");
  movies.forEach((movie) => {
    let id = movie.querySelector(".movie-link")["href"].split("?id=")[1];
    if (favList.indexOf(id) !== -1)
      movie.querySelector(".fav-icon").classList.toggle("fav-active");
  });
}

const changeFavs = async(id)=>{
  let res = await fetch("/add-fav", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  res = await res.json();
  localStorage.setItem("Favourites",res["favList"]);
}

var favs = async () => {
  document.querySelectorAll(".fav-icon").forEach((e) => {
    e.addEventListener("click", (s) => {
      e.classList.toggle("fav-active");
      let id = e.previousElementSibling.querySelector("a")["href"].split(
        "id="
      )[1];
      changeFavs(id);
    });
  });
}
