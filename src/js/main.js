import { fetchMoviesData } from './fetch-data.js';
export const ul = document.querySelector('.cards-wrapper');

export async function fetchFilmData() {
  try {
    const { data, genresMap } = await fetchMoviesData();

    data.results.forEach(film => {
      const liElement = document.createElement('li');
      liElement.classList.add('film-box');

      const imgElement = document.createElement('img');
      imgElement.classList.add('film-img');
      imgElement.alt = 'Movie cover photo';
      imgElement.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
      liElement.appendChild(imgElement);

      const filmInfoContainer = document.createElement('div');
      filmInfoContainer.classList.add('film-info-container');

      const filmName = document.createElement('h2');
      filmName.classList.add('film-name');
      filmName.textContent = film.title;
      filmInfoContainer.appendChild(filmName);

      const filmRating = document.createElement('p');
      filmRating.classList.add('film-rating');

      const genresNames = film.genre_ids.map(genreId => genresMap[genreId]);
      let formattedGenres =
        genresNames.length > 2
          ? `${genresNames.slice(0, 2).join(', ')}, Other`
          : genresNames.join(', ');
      const releaseYear = new Date(film.release_date).getFullYear();
      const rating = film.vote_average.toFixed(1);

      filmRating.innerHTML = `${formattedGenres} | ${releaseYear} <p class="rating-display">${rating}</p>`;

      filmInfoContainer.appendChild(filmRating);
      liElement.appendChild(filmInfoContainer);
      ul.append(liElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchFilmData();
