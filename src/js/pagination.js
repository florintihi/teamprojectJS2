import { fetchFilmData, ul } from './main';
import { pageNumber, fetchMoviesData, inc, des } from './fetch-data';

const prevButton = document.querySelector('.previousBtn');
const nextButton = document.querySelector('.nextBtn');

async function getNextPage() {
  try {
    // pageNumber++;
    inc();
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
    // prevButton.disabled = true
    // pageNumber--;
    if (pageNumber > 1) {
      des();
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
