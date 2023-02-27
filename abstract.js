// TMBD API
// EXAMPLE REQUEST


/*

=> Hit Api with key
https://api.themoviedb.org/3/movie/550?api_key=<key>

=> Get Images
https://image.tmdb.org/t/p/<size>/<backdrop_path>
size = original,w500

=> Get Genres
https://api.themoviedb.org/3/genre/movie/list?api_key=<key>&language=en-US

=>Finding Data

- Text Based Search / query
https://api.themoviedb.org/3/search/movie?api_key=<key>&query=<search-string>

- ID Based Search
/find

- Filter Data / short
https://api.themoviedb.org/3/discover/movie?api_key=<api_key>&sort_by=popularity.desc
popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc

=> Get Movies

- Upcoming Movies 
https://api.themoviedb.org/3/movie/upcoming?api_key=<api_key>&language=en-US&page=1
page=1-1000

- Top Rated
https://api.themoviedb.org/3/movie/top_rated?api_key=<api_key>&language=en-US&page=1

- Latest
https://api.themoviedb.org/3/movie/latest?api_key=<api_key>&language=en-US&page=1

- Popular
https://api.themoviedb.org/3/movie/popular?api_key=<api_key>&language=en-US&page=1

- Now Playing/ Recent
https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1

++ Get Movies details
https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

-- Credits
https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

-- Similar
https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US

=> GetTv

- Get Latest
https://api.themoviedb.org/3/tv/latest?api_key=<key>&language=en-US

- Get Popular
https://api.themoviedb.org/3/tv/popular?api_key=<key>&language=en-US&page=1

- Get Top-Rated
https://api.themoviedb.org/3/tv/top_rated?api_key=<key>&language=en-US&page=1

 */




// -----------------

/// API INFO

const API_KEY = "api_key=face0dc8817986e0979221d736707537";
const BASE_URL = "https://api.themoviedb.org/3";

//? Text Based Search / query
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY + "&query=";

//? Filter Data / short
const SORT_URL = BASE_URL + "/discover/movie?" + API_KEY + "&sort_by=";

//? Get Images
const IMAGE_URL = "https://image.tmdb.org/t/p/";

//? Get Genres
const GENRES_URL = BASE_URL +  "/genre/movie/list?" + API_KEY + "&language=en-US";

//? Trending
const TRENDING = BASE_URL + "/trending/all/day?adult=true&" + API_KEY;

//? Movies

// Popular movies
const M_POPULAR = BASE_URL + "/movie/popular?adult=true&" +  API_KEY;

// get movies
const M_GET = BASE_URL + "/movie/"

//? Tv

// Popular tv
const T_POPULAR = BASE_URL + "/tv/popular?adult=true&" + API_KEY;

// Latest tv
const T_LATEST = BASE_URL + "/tv/latest?adult=true&" + API_KEY;


// ------------------




/// ------ ABSTRACT FUNCTIONS -----

//? getJson(url)
async function getJson(url) {

    const res = await fetch(String(url));
    const jsonRes = await res.json();
    return jsonRes;

}


//? getImage(size|string, path|string)
function getImage(size, path) {

    const imageUrl = IMAGE_URL + `${size}` + `${path}`; // size = original || w500 etc
    return  imageUrl;

}


//? getGenres(arr|arrayofobj)
async function getGenres(arr) {

    const res = await fetch(GENRES_URL);
    const genresObj = await res.json();
    let {genres} = genresObj;

    let movieGenres = [];

    for(let genresVal of genres) {

        for(let id of arr) {
            if(genresVal.id == id){
                movieGenres.push(genresVal.name);
            }
        }

    }

    return movieGenres.join(", ");

}


//? getMovieDetail()
async function getMovieDetails(id){
    let url = M_GET + `${id}?` + API_KEY;
    const res = await getJson(url);
    return res;
}


//? disableLoader(ele|dom element);
function disableLoader(ele){
    ele.classList.remove("loader");
}


//? showCard(data|array, ele|dom element)
async function showCards(data, ele) {

    data.forEach(async (val) => {

        const {title, name, vote_average, genre_ids, id, poster_path} = val;
        const poster = getImage("w500", poster_path);
        const genres = await getGenres(genre_ids);

        ele.innerHTML += `
        <a class="card-img-wrapper" href="./details.html?${id}" target="_blank" title="${title ?? name}">
            <img src="${poster}" alt="${title ?? name}">
            <div class="movie-desc">
                <p class="rating"><b>${vote_average.toFixed(1)}</b></p>
                <div class="info">
                    <h4>${title ?? name}</h4>
                    <p>${genres}</p>
                </div>
            </div>
        </a>
        `;

    })

     disableLoader(ele);

}
