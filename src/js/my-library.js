import { fetchFilmData, ul, queuedCounterElement, watchedCounterElement, queuedCounter, watchedCounter, watchedFilmsButton, queuedFilmsButton, clearLibraryButton, myLibraryButtonWrapper} from './main.js';
const homeButton = document.querySelector('.home-page');
const libraryWrapper = document.querySelector('.library-wrapper');
const myLibraryButton = document.querySelector('.library-page');
const trackQueuedWrapper = document.querySelector('.track-queued');
const trackWatchedWrapper = document.querySelector('.track-watched');
const trackWatched = document.createElement('p')
const trackQueued = document.createElement('p')
const clearLibraryButtonWrapper = document.querySelector('.clear-library-button')
homeButton.addEventListener('click', () => {
    homeButton.classList.add('active');
    location.reload();
})
fetchFilmData()
    .then(() => {
        filmBoxElements = ul.querySelectorAll('.film-box');
    });
export function librarySections() {
        showLibrary();
        watchedFilmsButton.addEventListener('click', () => {
            watchedFilmsButton.classList.toggle('active');
            myLibraryButton.classList.remove('active');
            libraryWrapper.classList.remove('library-active');
            trackWatchedWrapper.classList.remove('track-films');
            trackQueuedWrapper.classList.remove('track-films');
            if (watchedFilmsButton.classList.contains('active')) {
                if (queuedCounter === 0 && watchedCounter === 0) {
                    clearLibraryButton.style.display = 'none';
                }
                clearLibraryButtonWrapper.appendChild(clearLibraryButton);
                clearLibraryButton.textContent = 'Remove all watched films'
                showWatched();
                queuedCounterElement.style.display = 'none';
                watchedCounterElement.style.display = 'none';
                queuedFilmsButton.classList.remove('active')
                clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
                })
            }
        });
        queuedFilmsButton.addEventListener('click', () => {
            queuedFilmsButton.classList.toggle('active');
            myLibraryButton.classList.remove('active');
            libraryWrapper.classList.remove('library-active');
            if (queuedFilmsButton.classList.contains('active')) {
                if (queuedCounter === 0 && watchedCounter === 0) {
                    clearLibraryButton.style.display = 'none';
                }
                clearLibraryButtonWrapper.appendChild(clearLibraryButton);
                clearLibraryButton.textContent = 'Remove all queued films'
                showQueued();
                queuedCounterElement.style.display = 'none';
                watchedCounterElement.style.display = 'none';
                watchedFilmsButton.classList.remove('active');
                clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
                })
            }
        });
    }
    librarySections();
 export function showWatched() {
      const filmBoxElements = ul.querySelectorAll('.film-box');
      filmBoxElements.forEach(filmBoxElement => {
          if (filmBoxElement.classList.contains('watched')) {
              filmBoxElement.style.display = 'block';
          } else {
              filmBoxElement.style.display = 'none';
          }
          if (watchedCounter === 0) {
            clearLibraryButton.style.display = 'none';
        } else {
            clearLibraryButton.style.display = 'block';
        }
      });
  }
 export function showQueued() {
      const filmBoxElements = ul.querySelectorAll('.film-box');
      filmBoxElements.forEach(filmBoxElement => {
          if (filmBoxElement.classList.contains('queued')) {
              filmBoxElement.style.display = 'block';
          } else {
              filmBoxElement.style.display = 'none';
          }
            if (queuedCounter === 0) {
                clearLibraryButton.style.display = 'none';
            } else {
                clearLibraryButton.style.display = 'block';
            }
      });
  }
 export function showToggleButtons() {
      const filmBoxElements = ul.querySelectorAll('.film-box');
      filmBoxElements.forEach(button => {
          if (!button.classList.contains('toggle-button')) {
              button.style.display = 'none';
          }
      });
  }
 export function clearLibrary() {
    const filmBoxElements = ul.querySelectorAll('.film-box');
    filmBoxElements.forEach(filmBoxElement => {
        const addtoWatchButton = filmBoxElement.querySelector('.watched-button');
        const addToQueButton = filmBoxElement.querySelector('.queued-button');
        if (watchedFilmsButton.classList.contains('active')) {
            filmBoxElement.classList.remove('watched')
            filmBoxElement.style.display = 'none';
            addtoWatchButton.textContent = 'Add to Watch';
            let watchedCounter = 0;
            watchedCounterElement.textContent = `Watched films: ${watchedCounter}`;
            clearLibraryButton.style.display = 'none';
        } else if (queuedFilmsButton.classList.contains('active')) {
            filmBoxElement.classList.remove('queued')
            filmBoxElement.style.display = 'none';
            addToQueButton.textContent = 'Add to Que';
            let queuedCounter = 0;
            queuedCounterElement.textContent = `Films in queue: ${queuedCounter}`;
        }
    })
  }
 export function showLibrary() {
    myLibraryButton.addEventListener('click', () =>{
        myLibraryButton.classList.toggle('active');
        libraryWrapper.classList.add('library-active')
        if (myLibraryButton.classList.contains('active')) {
            showToggleButtons();
            myLibraryButtonWrapper.appendChild(watchedFilmsButton);
            myLibraryButtonWrapper.appendChild(queuedFilmsButton);
            trackWatched.appendChild(watchedCounterElement);
            trackQueued.appendChild(queuedCounterElement);
            trackQueuedWrapper.appendChild(trackQueued);
            trackWatchedWrapper.appendChild(trackWatched);
            homeButton.classList.remove('active');
            watchedFilmsButton.classList.remove('active');
            queuedFilmsButton.classList.remove('active');
            queuedCounterElement.style.display = 'block';
            watchedCounterElement.style.display = 'block';
            clearLibraryButton.style.display = 'none';
        }
    })
  }