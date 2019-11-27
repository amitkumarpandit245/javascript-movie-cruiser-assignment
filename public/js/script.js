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

            const tbody = document.getElementsByTagName('li')[0];
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
                                            <button class="btn btn-primary">Add To Favourite</button>
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

function getFavourites() {

}

function addFavourite() {

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


