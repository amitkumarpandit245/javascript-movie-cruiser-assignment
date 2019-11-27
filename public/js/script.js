function getMovies(event)
{
    fetch('http://localhost:3000/movies')
    .then(response=>{
        if(response.status == 200)
        {
            return Promise.resolve(response.json());
        }
        else
        {
            return Promise.reject(new Error('Unable to fetch the data'));
        }
    }).then(movieData=>{

            const tbody = document.getElementById('moviesList');
            let stdInnerHtml='';
            movieData.forEach(movie => {
                stdInnerHtml = stdInnerHtml + `
                                    <tr>
                                        <table>
                                        <tr>
                                       
                                        </tr>
                                        <tr>
                                            <img src="${movie.posterPath}" width="200" height="250"/>
                                        </tr>
                                        <tr>
                                        <h4>${movie.title}</h4>
                                        </tr>
                                        <tr>
                                            <button class="btn btn-primary" onclick="addFavourite('+${movie.id}+')">Add To Favourite</button>
                                        </tr>
                                        </table>
                                    </tr>
                                `;                
                                tbody.innerHTML=stdInnerHtml;
            });
    }).catch(err=>{
        console.log(err);
    })
}


function getFavourites(event) {
    fetch('http://localhost:3000/favourites')
    .then(response=>{
        if(response.status == 200)
        {
            return Promise.resolve(response.json());
        }
        else
        {
            return Promise.reject(new Error('Unable to fetch the data'));
        }
    }).then(favMovieData=>{

            const tbody = document.getElementById('favouritesList');
            let stdInnerHtml='';
            favMovieData.forEach(movie => {
                stdInnerHtml = stdInnerHtml + `
                                    <tr>
                                        <table>
                                        <tr>
                                       
                                        </tr>
                                        <tr>
                                            <img src="${movie.posterPath}" width="200" height="250"/>
                                        </tr>
                                        <tr>
                                        <h4>${movie.title}</h4>
                                        </tr>
                                        </table>
                                    </tr>
                                `;                
                                tbody.innerHTML=stdInnerHtml;
            });
    }).catch(err=>{
        console.log(err);
    })
}

function addFavourite(id) {
    let title;
    let path;
    
    const favmovie={
        "title":title,
        "posterPath":path,
        }

        fetch('http://localhost:3000/movies/'+id,{
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        }).then(response=>response.json())
        .then(data => {
            title=data.title;
            path=data.posterPath;
            var p1 = new Promise(
                (resolve, reject) => {
                    fetch('http://localhost:3000/favourites', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(favmovie)
                    });
                }
            );
        });

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


