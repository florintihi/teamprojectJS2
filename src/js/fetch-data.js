let pageNumber = 1;
export const inc = () => pageNumber++;
export const des = () => pageNumber--;
const apiKey = '48ef3a20ec8d887e9b9ced5296a0c50a';
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 48ef3a20ec8d887e9b9ced5296a0c50a',
  },
};

export async function fetchMoviesData(searchTerm = '', genre = '') {
  let urlFetch;
  if (searchTerm.trim() === '') {
    urlFetch = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${pageNumber}`;
  } else {
    urlFetch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}`;
    if (genre) {
      urlFetch += `&with_genres=${genre}`;
    }
  }

  try {
    const genresResponse = await fetch(genresUrl, options);
    const genreData = await genresResponse.json();

    const genresMap = {};
    genreData.genres.forEach(genre => {
      genresMap[genre.id] = genre.name;
    });

    const moviesResponse = await fetch(urlFetch, options);
    const data = await moviesResponse.json();
    data.results.sort((a, b) => b.vote_average - a.vote_average);

    return { data, genresMap };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
