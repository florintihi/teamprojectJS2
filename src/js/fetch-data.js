export let pageNumber = 1;
const apiKey = '48ef3a20ec8d887e9b9ced5296a0c50a';
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 48ef3a20ec8d887e9b9ced5296a0c50a',
  },
};

export async function fetchMoviesData() {
  const urlFetch = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${pageNumber}`;
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

import { fetchFilmData, ul } from './main';

const prevButton = document.querySelector('.previousBtn');
const nextButton = document.querySelector('.nextBtn');

async function getNextPage() {
  try {
    pageNumber++;
    ul.innerHTML = '';
    const { data, genresMap } = await fetchMoviesData();
    fetchFilmData(data, genresMap);
    console.log(pageNumber);
  } catch (err) {
    console.log(err);
  }
}

nextButton.addEventListener('click', getNextPage);

async function getPrevPage() {
  try {
    if (pageNumber > 1) {
      prevButton.disabled = false;
      pageNumber--;
      ul.innerHTML = '';
      const { data, genresMap } = await fetchMoviesData();
      fetchFilmData(data, genresMap);
      console.log(pageNumber);
    }
  } catch (err) {
    console.log(err);
  }
}

prevButton.addEventListener('click', getPrevPage);
