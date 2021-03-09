async function getMovie(id){
	let reqURL = "https://www.omdbapi.com/?apikey=464feb8&i="+id;
	let lik = document.querySelector("#imdb-block a");
	let poster = lik.querySelector("#imdb-block img");
	let res = await fetch(reqURL,{
		"method":"GET",
		"Content-type":"application/json"
	});
	let movieInfo = await res.json();
	rating = parseInt(movieInfo.imdbRating);	
	lik.href = `https://www.imdb.com/title/${movieInfo.imdbID}"`;
	poster.src = `${movieInfo.Poster}`;
	poster.alt = `Film poster for ${movieInfo.Title}`;
	content.innerHTML = `<h1>${movieInfo.Title} <span>(${movieInfo.Year})</span></h1>`;
	content.innerHTML += `<p><b>${movieInfo.Genre}</b>  <i>${movieInfo.Runtime}</i></p>`;
	content.innerHTML += `<p>${movieInfo.Plot}</p>`;
	content.innerHTML += "<b>Rating: </b>";
	for (let i = 0; i < 10; i++) {
		if (i < rating) {
			content.innerHTML += "<span class=star>★</span>";
		} else {
			content.innerHTML += '<span class="star nonrate">★</span>';
		}
	}
}

async function searchIMDB(name) {
	let searchURL = "https://www.omdbapi.com/?apikey=464feb8&s="+name.split(" ").join('+')
	let res = await fetch(searchURL,{
		"method":"GET",
		"Content-type":"application/json"
	});
	res = await res.json();
	console.log(res)
	if(res["Response"]==="False")
		document.querySelector("#imdb-block").remove();
	else{
		let id = res["Search"][0]["imdbID"];
		getMovie(id)
	}
}
searchIMDB(document.querySelector("#main-title").textContent);