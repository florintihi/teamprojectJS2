import { fetchFilmData, ul, queuedCounterElement, watchedCounterElement, queuedCounter, watchedCounter, watchedFilmsButton, queuedFilmsButton, decreaseWatched } from './main.js';

const homeButton = document.querySelector('.home-page');
export const clearLibraryButton = document.createElement('button');
clearLibraryButton.classList.add('.toggle-button');
const clearLibraryWrapper = document.querySelector('.library-wrapper');
const myLibraryButton = document.querySelector('.library-page');
const trackFilms = document.querySelector('.track-films')


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
       
            if (watchedFilmsButton.classList.contains('active')) {
                if (queuedCounter === 0 && watchedCounter === 0) {
                    clearLibraryButton.style.display = 'none';
                } 
                clearLibraryWrapper.appendChild(clearLibraryButton);
                clearLibraryButton.textContent = 'Remove all watched films'
                showWatched();
                queuedCounterElement.style.display = 'none';
                watchedCounterElement.style.display = 'block';
                
                queuedFilmsButton.classList.remove('active')
                clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
                })
            }
        });
        
        queuedFilmsButton.addEventListener('click', () => {
            queuedFilmsButton.classList.toggle('active');
            myLibraryButton.classList.remove('active');
    
            if (queuedFilmsButton.classList.contains('active')) {
            
                if (queuedCounter === 0 && watchedCounter === 0) {
                    clearLibraryButton.style.display = 'none';
                } 

                clearLibraryWrapper.appendChild(clearLibraryButton);
                clearLibraryButton.textContent = 'Remove all queued films'
                showQueued();
                queuedCounterElement.style.display = 'block';
                watchedCounterElement.style.display = 'none';

                watchedFilmsButton.classList.remove('active');

                clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
                })
            }
        });
    }
      
    librarySections();
    
    // Show functions 
    
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
            watchedCounterElement.textContent = `Watched films: ${watchedCounter}.`;
            clearLibraryButton.style.display = 'none';
    
        } else if (queuedFilmsButton.classList.contains('active')) {
            filmBoxElement.classList.remove('queued')
            filmBoxElement.style.display = 'none';
            addToQueButton.textContent = 'Add to Que';
            let queuedCounter = 0;
            queuedCounterElement.textContent = `Films in queue: ${queuedCounter}.`;
            clearLibraryButton.style.display = 'none';
        }
    })
  }

 export function showLibrary() {
    myLibraryButton.addEventListener('click', () =>{
        myLibraryButton.classList.toggle('active');
        if (myLibraryButton.classList.contains('active')) {
            showToggleButtons();
            myLibraryButtonWrapper.appendChild(watchedFilmsButton);
            myLibraryButtonWrapper.appendChild(queuedFilmsButton);
            trackFilms.appendChild(watchedCounterElement);
            trackFilms.appendChild(queuedCounterElement);
            homeButton.classList.remove('active');
            watchedFilmsButton.classList.remove('active');
            queuedFilmsButton.classList.remove('active');
            queuedCounterElement.style.display = 'block';
            watchedCounterElement.style.display = 'block';
            clearLibraryButton.style.display = 'none';
        }
    })
  }