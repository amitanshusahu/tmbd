let param = window.location.search.slice(1);

// --- LOGIC ---

let resultBox = document.querySelector("#resultBox");

let queryUrl = SEARCH_URL + param;

const coat = async () => {
	let res = await getJson(queryUrl);
	showCards(res.results, resultBox);
}
coat();


// --- ---- ----