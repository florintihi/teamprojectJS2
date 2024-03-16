import { fetchMoviesData } from './fetch-data.js';
import debounce from 'lodash/debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInput = document.getElementById('movie-search');
const ul = document.querySelector('.cards-wrapper');

const searchMovies = debounce(async (searchTerm, genre) => {
    try {
        const { data, genresMap } = await fetchMoviesData(searchTerm, genre);

        ul.innerHTML = '';

        if (data.results.length > 0) {
            data.results.forEach(movie => {
                const li = document.createElement('li');
                
                li.classList.add('film-box'); 
                const genresNames = movie.genre_ids.map(genreId => genresMap[genreId]);
                let formattedGenres = [];
                  genresNames.length > 2
                  if (genresNames.length > 2) {
                    formattedGenres = `${genresNames.slice(0, 2).join(', ')}, Other`;
                  } else if (genresNames.length < 1) {
                    formattedGenres = 'Other';
                  } else {
                    formattedGenres = genresNames.join(', ');
                  }
                li.innerHTML = `
                    <img class="film-img" alt="Movie cover photo" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <div class="film-info-container">
                        <h2 class="film-name">${movie.title}</h2>
                        <p class="film-rating">
                            ${formattedGenres} | ${new Date(movie.release_date).getFullYear()} 
                            <span class="rating-display">${movie.vote_average.toFixed(1)}</span>
                        </p>
                    </div>
                `;
                ul.appendChild(li);
            });
        } else {
            ul.innerHTML = '<li>Sorry, no results found.</li>';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        Notify.failure('Error fetching search results');
    }
}, 300);

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    const genre = ''; // Aici trebuie să extragi genul din altă sursă, cum ar fi un element select
    searchMovies(searchTerm, genre);
});
