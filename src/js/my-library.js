import { fetchFilmData, ul } from './main.js';

let filmBoxElements;
const myLibraryButton = document.querySelector('.library-page');
const homeButton = document.querySelector('.home-page')
const watchedFilms = document.createElement('button');
watchedFilms.textContent = 'Watched Films';
watchedFilms.classList.add('toggle-button');
const queuedFilms = document.createElement('button');
queuedFilms.textContent = 'Queued Films';
queuedFilms.classList.add('toggle-button');

fetchFilmData()
    .then(() => {
        filmBoxElements = ul.querySelectorAll('.film-box');

        filmBoxElements.forEach(filmBoxElement => {
            const watchedButton = filmBoxElement.querySelector('.watched-button');
            watchedButton.addEventListener('click', () => {
                if (filmBoxElement.classList.contains('watched')){

                    filmBoxElement.classList.remove('watched');
                    watchedButton.textContent = 'Add to Watched';
                }
                else {
                    filmBoxElement.classList.add('watched');
                    watchedButton.textContent = 'Remove from Watched'
                }
            });


            const queuedButton = filmBoxElement.querySelector('.queued-button');
            queuedButton.addEventListener('click', () => {
                if (filmBoxElement.classList.contains('queued')) {

                    filmBoxElement.classList.remove('queued');
                    queuedButton.textContent = 'Add to Que';
                } else {
                    filmBoxElement.classList.add('queued');
                    queuedButton.textContent = 'Remove from Que';
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
            ul.insertAdjacentElement('afterbegin', watchedFilms);
            ul.insertAdjacentElement('afterbegin', queuedFilms);
        }
    });
    
    watchedFilms.addEventListener('click', () => {
        watchedFilms.classList.toggle('active');
        if (watchedFilms.classList.contains('active')) {
            showWatched();
            queuedFilms.classList.remove('active');
        }
    });
    
    queuedFilms.addEventListener('click', () => {
        queuedFilms.classList.toggle('active');
        if (queuedFilms.classList.contains('active')) {
            showQueued();
            watchedFilms.classList.remove('active');
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


// TODO: Trebuie rezolvat butonul de clear sa fie afisat doar daca exista un film in queued sau watched si sa stearga doar elementele cu clasa respectiva
// TODO: Codul functioneaza doar pentru pagina 1 nu si pt urmatoarele pagini
// TODO: Trebuie adaugat local storage pt filmele adaugate deja in mylibrary 

// function clearLibraryButton(filmBoxElement) {
//     const clearButton = filmBoxElement.querySelector('.clear-library')
//     clearButton.addEventListener('click', () => {
//         if (watchedFilms.classList.contains('active')) {
//             filmBoxElement.classList.remove('watched')
//             filmBoxElement.remove()
//         } else if (queuedFilms.classList.contains('queued')) {        
//         filmBoxElement.classList.remove('queued')
//         filmBoxElement.remove()
//         };
//     })
// }

// clearLibraryButton();