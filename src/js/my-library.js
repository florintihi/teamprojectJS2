import { fetchFilmData, ul } from './main.js';

let filmBoxElements;
const myLibraryButton = document.querySelector('.library-page');
const homeButton = document.querySelector('.home-page')
const watchedFilmsButton = document.createElement('button');
watchedFilmsButton.textContent = 'Watched Films';
watchedFilmsButton.classList.add('toggle-button');
const queuedFilmsButton = document.createElement('button');
queuedFilmsButton.textContent = 'Queued Films';
queuedFilmsButton.classList.add('toggle-button');
myLibraryButtonWrapper = document.querySelector('.my-library-button-wrapper')
const clearLibraryButton = document.createElement('button')
clearLibraryButton.classList.add('.toggle-button')
const clearLibraryWrapper = document.querySelector('.clear-library')

fetchFilmData()
    .then(() => {
        filmBoxElements = ul.querySelectorAll('.film-box');


        filmBoxElements.forEach(filmBoxElement => {
            const addtoWatchButton = filmBoxElement.querySelector('.watched-button');
            addtoWatchButton.addEventListener('click', () => {
                if (filmBoxElement.classList.contains('watched')) {
                    filmBoxElement.classList.remove('watched');
                    addtoWatchButton.textContent = 'Add to Watched';
                } else {
                    filmBoxElement.classList.add('watched');
                    addtoWatchButton.textContent = 'Remove from Watched';
                }

                if (watchedFilmsButton.classList.contains('active')) {
                    filmBoxElement.style.display = 'none';
                } else {
                    filmBoxElement.style.display = ''; 
                }
            });

            


            const addToQueButton = filmBoxElement.querySelector('.queued-button');
            addToQueButton.addEventListener('click', () => {
                if (filmBoxElement.classList.contains('queued')) {

                    filmBoxElement.classList.remove('queued');
                    addToQueButton.textContent = 'Add to Que';
                } else {
                    filmBoxElement.classList.add('queued');
                    addToQueButton.textContent = 'Remove from Que';
                }

                if (queuedFilmsButton.classList.contains('active')) {
                    filmBoxElement.style.display = 'none';
                } else {
                    filmBoxElement.style.display = ''; 
                }
            });


            homeButton.addEventListener('click', () => {
                location.reload();
            })
        });
    })
    .catch(err => console.log(err));


    myLibraryButton.addEventListener('click', () => {
        myLibraryButton.classList.toggle('active');
    
        if (myLibraryButton.classList.contains('active')) {
            showToggleButtons();
            myLibraryButtonWrapper.appendChild(watchedFilmsButton);
            myLibraryButtonWrapper.appendChild(queuedFilmsButton);
        }
    });
    
    watchedFilmsButton.addEventListener('click', () => {
        watchedFilmsButton.classList.toggle('active');
        if (watchedFilmsButton.classList.contains('active')) {
            clearLibraryWrapper.appendChild(clearLibraryButton);
            clearLibraryButton.textContent = 'Remove all watched films'
            showWatched();
            queuedFilmsButton.classList.remove('active')
            clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
            })
        }
    });
    
    queuedFilmsButton.addEventListener('click', () => {
        queuedFilmsButton.classList.toggle('active');
        if (queuedFilmsButton.classList.contains('active')) {
            showQueued();
            clearLibraryWrapper.appendChild(clearLibraryButton);
            clearLibraryButton.textContent = 'Remove all queued films'
            watchedFilmsButton.classList.remove('active');
            clearLibraryButton.addEventListener('click', () => {
                clearLibrary();
            })
        }
    });


// Show functions 

function showWatched() {
    filmBoxElements.forEach(filmBoxElement => {
        if (filmBoxElement.classList.contains('watched')) {
            filmBoxElement.style.display = 'block';
        } else {
            filmBoxElement.style.display = 'none';
        }
    });
}



function showQueued() {
    filmBoxElements.forEach(filmBoxElement => {
        if (filmBoxElement.classList.contains('queued')) {
            filmBoxElement.style.display = 'block';
        } else {
            filmBoxElement.style.display = 'none';
        }
    });
}


function showToggleButtons() {
    filmBoxElements.forEach(button => {
        if (!button.classList.contains('toggle-button')) {
            button.style.display = 'none';
        }
    })
}

function clearLibrary() {
    filmBoxElements.forEach(filmBoxElement => {
        const addtoWatchButton = filmBoxElement.querySelector('.watched-button');
        const addToQueButton = filmBoxElement.querySelector('.queued-button');
        if (watchedFilmsButton.classList.contains('active')) {
            filmBoxElement.classList.remove('watched')
            filmBoxElement.style.display = 'none';
            addtoWatchButton.textContent = 'Add to Watch';
        }    else if (queuedFilmsButton.classList.contains('active')) {        
                filmBoxElement.classList.remove('queued')
                filmBoxElement.style.display = 'none';
                addToQueButton.textContent = 'Add to Que';
            };
    })
}


