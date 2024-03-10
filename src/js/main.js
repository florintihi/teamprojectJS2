const ul = document.querySelector('.main-container');
const apiKey = '48ef3a20ec8d887e9b9ced5296a0c50a';
const urlFetch = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 48ef3a20ec8d887e9b9ced5296a0c50a',
  },
};

fetch(genresUrl, options)
  .then(res => res.json())
  .then(genreData => {
    const genresMap = {};
    genreData.genres.forEach(genre => {
      genresMap[genre.id] = genre.name;
    });

    fetch(urlFetch, options)
      .then(res => res.json())
      .then(data => {
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
          let formatedGenres = genresNames.length > 2 ? `${genresNames.slice(0, 2).join(', ')}, Other` : genresNames.join(', ');
          const releaseYear = new Date(film.release_date).getFullYear();
          const rating = film.vote_average.toFixed(1);

          filmRating.innerHTML = `${formatedGenres} | ${releaseYear} <p class="rating-display">${rating}</p>`;

          filmInfoContainer.appendChild(filmRating);

          liElement.appendChild(filmInfoContainer);

          ul.append(liElement);
        });
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
