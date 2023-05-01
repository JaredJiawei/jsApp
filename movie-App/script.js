
const APIURL = 'https://api.themoviedb.org/3/movie/550?api_key=4383ef8fd1a8397e12b031dae8878873';
const IMGPATH = 'https://api.themoviedb.org/3/';

async function getMovies(){
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData);

    return respData;
}

getMovies();