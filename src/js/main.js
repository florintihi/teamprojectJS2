import { fetchMoviesData } from './fetch-data.js';
export const ul = document.querySelector('.cards-wrapper');
export const watchedFilmsButton = document.createElement('button');
watchedFilmsButton.textContent = 'Watched Films';
watchedFilmsButton.classList.add('toggle-button');
export const queuedFilmsButton = document.createElement('button');
queuedFilmsButton.textContent = 'Queued Films';
queuedFilmsButton.classList.add('toggle-button');
export const myLibraryButtonWrapper = document.querySelector('.my-library-button-wrapper')


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
      let formattedGenres = [];
      if (genresNames.length > 2) {
        formattedGenres = `${genresNames.slice(0, 2).join(', ')}, Other`;
      } else if (genresNames.length < 1) {
        formattedGenres = 'Other';
      } else {
        formattedGenres = genresNames.join(', ');
      }
      const releaseYear = new Date(film.release_date).getFullYear();
      const rating = film.vote_average.toFixed(1);

      filmRating.innerHTML = `${formattedGenres} | ${releaseYear} <p class="rating-display">${rating}</p>`;

      filmInfoContainer.appendChild(filmRating);
      liElement.appendChild(filmInfoContainer);

      const buttonDiv = document.createElement('div')
      const addToWatchButton = document.createElement('button')
      addToWatchButton.classList.add('watched-button')
      addToWatchButton.textContent = 'Add to Watched'
      const addToQueButton = document.createElement('button')
      addToQueButton.classList.add('queued-button')
      addToQueButton.textContent = 'Add to Que'
      buttonDiv.appendChild(addToWatchButton)
      buttonDiv.appendChild(addToQueButton)
      liElement.appendChild(buttonDiv)


      const watchButton = liElement.querySelector('.watched-button');
      watchButton.addEventListener('click', () => {
          if (liElement.classList.contains('watched')) {
              liElement.classList.remove('watched');
              watchButton.textContent = 'Add to Watched';
              decreaseWatched(); 
          } else {
              liElement.classList.add('watched');
              watchButton.textContent = 'Remove from Watched';
              increaseWatched(); 
          }
      
          if (watchedFilmsButton.classList.contains('active')) {
              liElement.style.display = 'none';
          } else {
              liElement.style.display = ''; 
          }
      });

      const queButton = liElement.querySelector('.queued-button');
      queButton.addEventListener('click', () => {
          if (liElement.classList.contains('queued')) {
              liElement.classList.remove('queued');
              queButton.textContent = 'Add to Que';
              decreaseQueued();
          } else {
              liElement.classList.add('queued');
              queButton.textContent = 'Remove from Que';
              increaseQueued();
          }

          if (queuedFilmsButton.classList.contains('active')) {
              liElement.style.display = 'none';
          } else {
              liElement.style.display = ''; 
          }
      });

      ul.append(liElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


export let queuedCounter = 0;
export let watchedCounter = 0;
export const watchedCounterElement = document.createElement('li');
export const queuedCounterElement = document.createElement('li');
queuedCounterElement.textContent = `Films in que: ${queuedCounter}.`
watchedCounterElement.textContent = `Watched films: ${watchedCounter}.`
queuedCounterElement.classList.add('track-number');
watchedCounterElement.classList.add('track-number');
export const clearLibraryButton = document.createElement('button');
clearLibraryButton.classList.add('.toggle-button');


export function increaseWatched(){
  watchedCounter++
  watchedCounterElement.textContent = `Watched films: ${watchedCounter}`

}

export function increaseQueued(){
  queuedCounter++
  queuedCounterElement.textContent = `Films in que: ${queuedCounter}`
}

export function decreaseWatched() {
  watchedCounter--;
  watchedCounterElement.textContent = `Watched films: ${watchedCounter}`;

  if (watchedCounter === 0) {
      clearLibraryButton.style.display = 'none';
  }
}

export function decreaseQueued() {
  queuedCounter--;
  queuedCounterElement.textContent = `Films in que: ${queuedCounter}`;

  if (queuedCounter === 0) {
      clearLibraryButton.style.display = 'none';
  }
}

clearLibraryButton.addEventListener('click', () => {
  if (watchedFilmsButton.classList.contains('active')) {
      clearWatchedLibrary();
  } else if (queuedFilmsButton.classList.contains('active')) {
      clearQueuedLibrary();
  }
});

function clearWatchedLibrary() {
  watchedCounter = 0;
  watchedCounterElement.textContent = `Watched films: ${watchedCounter}`;
  clearLibraryButton.style.display = 'none';
}

function clearQueuedLibrary() {
  queuedCounter = 0;
  queuedCounterElement.textContent = `Films in que: ${queuedCounter}`;
  clearLibraryButton.style.display = 'none';
}


