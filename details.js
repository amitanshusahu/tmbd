let id = window.location.search.slice(1);

const getData = async () =>{
	const {
		backdrop_path,
		genres,
		title,
		overview,
		release_date,
		revenue,
		runtime,
		tagline,
		vote_average,
		vote_count,
	} = await getMovieDetails(id);
	let poster = await getImage('original', backdrop_path);
	let genresString = await getGenres(genres);
	console.log(genresString)

	// temp
	let body = document.querySelector("body");

	body.innerHTML = `
		<img src="${poster}">
		<h2> ${title} </h2>
		<h4> ${genresString} </h4>
		<p> ${overview} </p>
		<h3> Details </h3>
		<ul>
			<li> ${release_date} </li>
			<li> ${revenue} </li>
			<li> ${runtime} </li>
			<li> ${tagline} </li>
		</ul>

`
}
getData();

