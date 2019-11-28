let allMovies = [];
let favouriteMovies = [];
let moviesURL = 'http://localhost:3000/movies';
let favURL = 'http://localhost:3000/favourites';

/* Function to get list of movies */
function getMovies() {
    fetch(moviesURL)
    .then(response=>{
        if(response.status==200){
            return Promise.resolve(response.json());
        }
        else{
            return Promise.reject(new Error('Unable To fetch data'));
        }
    }).then(movies=>{
        allMovies=movies;
        const data=document.getElementById("moviesList");
        let movieInnerHtml='';
        movies.forEach(movie=>{
            movieInnerHtml=movieInnerHtml+`
            <tr>
            <table>
            <tr>
            <h4>${movie.title}</h4>
            </tr>
            <tr>
                <img src="${movie.posterPath}" width="300" height="300"/>
            </tr>
            <tr>
            
            </tr>
            <tr>
                <button class="btn btn-primary" onclick="addFavourite(${movie.id})">Add To Favourite</button>
            </tr>
            </table>
            </tr>
            `;
            data.innerHTML=movieInnerHtml;
        });
        
    }).catch(err=>{
        console.log(err);
    })
}


/* Function to get list of favourites */
function getFavourites() {
    fetch(favURL)
    .then(response=>{
        if(response.status==200){
            return Promise.resolve(response.json());
        }
        else{
            return Promise.reject(new Error("Unable To Load Data"));
        }
    }).then(favMovie=>{
        favouriteMovies=favMovie;
        const data=document.getElementById("favouritesList");
        let movInnerHtml='';
        favMovie.forEach(fMov=>{
            movInnerHtml=movInnerHtml+`
            <tr>
            <table>
            <tr>
            <h4>${fMov.title}</h4>
            </tr>
            <tr>
                <img src="${fMov.posterPath}" width="300" height="300"/>
            </tr>
            <tr>
            <button class="btn btn-primary" onclick="deleteFromFavourite(${fMov.id})">Delete From Favourite</button>
            </tr>
            </table>
            </tr>
            `;
            data.innerHTML=movInnerHtml;
        });
    }).catch(err=>{
        console.log(err);
    })
}


/* Function to add favourite from ID */
function addFavourite(id) {
let mov = allMovies.filter(m => {
    return m.id === id;
  });
let fav = favouriteMovies.filter(f => {
    return f.id === id;
  });
	 if(fav.length > 0) {
		throw new Error('Movie is already added to favourites');
	}
	else {
		return fetch(favURL, {
			method: 'POST',
			body: JSON.stringify(mov[0]),
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response) {
			return response.json();
		}).then(function(fav1) {
			favouriteMovies.push(fav1);
			//listFavourites();
			return favouriteMovies;
		});
	}
}
//Function to Delete From favourite

function deleteFromFavourite(id){
    let delFav=favouriteMovies.filter(m=>{
        return m.id===id;
    });
    if(delFav.length<0){
        throw new Error("Invalid Movie");
    }
    else{
        return fetch(favURL+'/'+id,{
            method:'DELETE',
            body:JSON.stringify(delFav[0]),
            headers:{'Content-Type':'application/json'}
        }).then(function(response){
            return response.json();
        }).then(function(df){
            favouriteMovies.pop(df);
            return favouriteMovies;
        });
    }
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};
// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
