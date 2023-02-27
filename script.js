/// DOM LOGIC

const body = document.querySelector("body")
const slideShow = document.querySelector(".banner-wrapper");
const slide = slideShow.querySelector(".banner");
const PopularMovieContainer = document.querySelector(".popular .horizontal-slider");
const TrendingMovieContainer = document.querySelector(".trending .horizontal-slider");
const PopularTvContainer = document.querySelector(".popular-tv .horizontal-slider");


window.onload = async () => {

    // Get Popular Movies
    const popularRes = await getJson(M_POPULAR);
    showMoviesBackdrop(popularRes.results, slide);
    showCards(popularRes.results, PopularMovieContainer);

    // Get Trending Movies
    const trendingRes = await getJson(TRENDING);
    showCards(trendingRes.results, TrendingMovieContainer);

    // Get Popular Tv shows
    const popularTvRes = await getJson(T_POPULAR);
    showCards(popularTvRes.results, PopularTvContainer);

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
    <a class="banner-desc" href="./details.html?${id}" target="_blank">
        <h1>${title ?? name}</h1>
        <p>${genres} <b>${vote_average.toFixed(1)}</b></p>
    </a>`;

    //> stop loader
    disableLoader(ele);

}

function search(){
    let search = document.querySelector("#search");
    const queryString = search.value;
    window.open(`./search.html?${queryString}`, '_blank');
}