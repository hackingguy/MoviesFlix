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

//Flag = 1 (Add), Flag = 0 (Remove)
function changeFav(id) {
  let favs = localStorage.getItem("Favourites");
  let favList = favs.split(",");
  let isPresent = favList.indexOf(id);
  if (isPresent !== -1) favList.splice(isPresent, 1);
  else favList.push(id);

  localStorage.setItem("Favourites", favList);
}

function favs() {
  document.querySelectorAll(".fav-icon").forEach((e) => {
    e.addEventListener("click", (s) => {
      e.classList.toggle("fav-active");
      let id = e.previousElementSibling.querySelector("a")["href"].split(
        "id="
      )[1];
      changeFav(id);
      fetch("/add-fav", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    });
  });
}
