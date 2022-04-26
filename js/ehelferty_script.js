/**
 * TODO: CREATE UI THAT COLLECTS SEARCH TERMS AND CRITERIA.
 * USE IMDB ADVANCED SEARCH API URL
 */
var apiKeyValue = "/k_rkdny4bz";

var movieSearch
var movieSearchData

var minYear
var maxYear
var genreChoice
var categoryChoice

var advancedSearch
var advancedSearchResult

let url = "https://imdb-api.com/API/AdvancedSearch" + apiKeyValue



window.onload = () => {
    document.getElementById("findMovie").onclick = findMovie;
    document.getElementById("findMoreMovies").onclick = getAdvancedResults;

    

    movieSearchData = document.getElementById("movieData")
    advancedSearchResult = document.getElementById("advancedSearchResult")
}

function getAdvancedResults() {

    minYear = document.getElementById("minYear").value
    maxYear = document.getElementById("maxYear").value

    genreChoice = document.getElementById("genreChoice").value
    categoryChoice = document.getElementById("categoryChoice").value

    console.log(genreChoice);

    //alert(genreChoice.toString())

    fetch(url + "?genres=" + genreChoice + "&groups=" + categoryChoice + "&year=" + minYear + "," + maxYear)
        .then(response => response.json())
        .then(json => {
            displayAdvancedResults(json.results)
        })
        .catch(error => alert(error))
}

function findMovie() {

    movieSearch = document.getElementById("movieSearch").value

    fetch(url + "?title_type=feature&title=" + movieSearch + "&count=15")
        .then(response => response.json())
        .then(json => {
            displayMovie(json.results)
        })
        .catch(error => alert(error))
}

function displayMovie(movies) {
    movieSearchData.innerHTML = ""

    let keys = Object.keys(movies)

    keys.forEach(keys => {
        if(movies[keys].contentRating != null){
            movieSearchData.innerHTML +=
            `<tr>
                <td><img class="z-depth-5" src="${movies[keys].image}" alt="movie poster" height="250" width="155"></td>
                <td>
                    <ul>
                        <li><h5>${movies[keys].title}</h5></li>
                        <li>Year: ${movies[keys].description}</li>
                        <li>Runtime: ${movies[keys].runtimeStr}</li>
                        <li>Content Rating: ${movies[keys].contentRating}</li>
                        <li>IMDB Rating: ${movies[keys].imDbRating}</li>
                        
                    </ul>
                </td>
                <td>
                    <h6>${movies[keys].plot}</h6>
                </td>
            </tr>`
        }
    })
}

function displayAdvancedResults(movies) {
    advancedSearchResult.innerHTML = ""

    let keys = Object.keys(movies)

    keys.forEach(keys => {
        if(movies[keys].contentRating != null){
            advancedSearchResult.innerHTML +=
            `<tr>
                <td><img class="z-depth-5" src="${movies[keys].image}" alt="movie poster" height="250" width="155"></td>
                <td>
                    <ul>
                        <li><h5>${movies[keys].title}</h5></li>
                        <li>Year: ${movies[keys].description}</li>
                        <li>Runtime: ${movies[keys].runtimeStr}</li>
                        <li>Content Rating: ${movies[keys].contentRating}</li>
                        <li>IMDB Rating: ${movies[keys].imDbRating}</li>
                        
                    </ul>
                </td>
                <td>
                    <h6>${movies[keys].plot}</h6>
                </td>
            </tr>`
        }
    })
}