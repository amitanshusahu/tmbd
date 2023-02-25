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

//? Trending
const TRENDING = BASE_URL + "/trending/all/day?adult=true&" + API_KEY;

//? Movies

// Get Genres
const GENRES_URL = BASE_URL +  "/genre/movie/list?" + API_KEY + "&language=en-US";

// Popular movies
const M_POPULAR = BASE_URL + "/movie/popular?adult=true&" +  API_KEY;

//? Tv

// Popular tv
const T_POPULAR = BASE_URL + "/tv/popular?adult=true&" + API_KEY;

// Latest tv
const T_LATEST = BASE_URL + "/tv/latest?adult=true&" + API_KEY;


// ------------------


/// DOM LOGIC

const body = document.querySelector("body")
const slideShow = document.querySelector(".banner-wrapper");
const slide = slideShow.querySelector(".banner");
const PopularMovieContainer = document.querySelector(".popular .horizontal-slider");
const TrendingMovieContainer = document.querySelector(".trending .horizontal-slider");
const PopularTvContainer = document.querySelector(".popular-tv .horizontal-slider");

async function getJson(url) {

    const res = await fetch(String(url));
    const jsonRes = await res.json();
    return jsonRes;

}

window.onload = async () => {

    // Get Popular Movies
    const popularRes = await getJson(M_POPULAR);
    showMoviesBackdrop(popularRes.results, slide);
    showMoviesCard(popularRes.results, PopularMovieContainer);

    // Get Trending Movies
    const trendingRes = await getJson(TRENDING);
    showMoviesCard(trendingRes.results, TrendingMovieContainer);

    // Get Popular Tv shows
    const popularTvRes = await getJson(T_POPULAR);
    showMoviesCard(popularTvRes.results, PopularTvContainer);

}


//? getImage(size|string, path|string)
function getImage(size, path) {

    const imageUrl = IMAGE_URL + `${size}` + `${path}`; // size = original || w500 etc
    return  imageUrl;

}


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


function disableLoader(ele) {

    ele.classList.remove("loader");

}


async function showMoviesBackdrop(data, ele) {

    //> get random no below 20 (random * max_range) for data
    const numBelow20 = Number(Math.floor(Math.random() * 20));
    
    const {title, vote_average, genre_ids, backdrop_path, id, name} = data[numBelow20];
    const image = getImage("original", backdrop_path);
    const genres = await getGenres(genre_ids);

    //> set background img
    ele.style.backgroundImage = `linear-gradient(transparent, rgba(1,1,1,0.5)), url(${image})`;
    body.style.backgroundImage = `url(${image})`;

    //> set movie desc
    ele.innerHTML = `
    <div class="banner-desc">
        <h1>${title ?? name}</h1>
        <p>${genres} <b>${vote_average.toFixed(1)}</b></p>
    </div>`;

    //> stop loader
    disableLoader(ele);

}


async function showMoviesCard(data, ele) {

    data.forEach(async (val) => {

        const {title, name, vote_average, genre_ids, id, poster_path} = val;
        const poster = getImage("w500", poster_path);
        const genres = await getGenres(genre_ids);

        ele.innerHTML += `
        <a class="img-wrapper" href="" title="${title ?? name}">
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