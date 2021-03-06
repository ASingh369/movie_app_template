const searchPoster = document.getElementById("search-poster");
const posterID = document.getElementById("poster-id");
const posterInner = document.querySelector(".poster-inner");
const postPoster = document.querySelector("#post-poster");
searchPoster.addEventListener("keyup", showPosterDropdown);

posterInner.addEventListener('click', showMoviePoster);

removeAllLinks();

function showPosterDropdown(e){
  query = searchPoster.value.trim();
  removeAllLinks(); 
  if (query != ""){
    removeAllLinks();
    tmdb.searchMovies(query, 1).then(data =>{
      results = data.searchMovies.results;
      results.forEach(function(result){
        const a = document.createElement('a');
        a.href = "";
        a.id = result.id;
        a.innerHTML = result.title;
        posterInner.appendChild(a);
      });
    });
  }
}

function showMoviePoster(e){
  if (e.target.tagName == 'A' || e.target.tagName == 'a' ){
    e.preventDefault();
    tmdb.getJustMovie(e.target.id).then(data =>{
      postPoster.src = `https://image.tmdb.org/t/p/w1280/${data.movie.backdrop_path}`;
      postPoster.style.display = "inline";
      posterID.value = e.target.id;
    });
  }
}

function removeAllLinks(){
  for (let i = 0; i < posterInner.childNodes.length; i++){
    if (posterInner.childNodes[i].tagName == 'A' || posterInner.childNodes[i].tagName == 'a'){
      posterInner.childNodes[i].remove();
    }
  }
}