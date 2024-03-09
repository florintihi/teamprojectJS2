const ul = document.querySelector('ul');
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

          const filmName = document.createElement('p');
          filmName.classList.add('film-name');
          // TODO: UNELE TITLURI NU SUNT AFISATE
          filmName.textContent = film.title;
          filmInfoContainer.appendChild(filmName);

          const filmRating = document.createElement('p');
          filmRating.classList.add('film-rating');
          // TODO: DACA EXISTA UN SINGUR GEN, SA NU AFISEZE VIRGULA
          const genresNames = film.genre_ids.map(genreId => genresMap[genreId]);
          // TODO: DACA E 8.0 SA AFISEZE DOAR 8
          const releaseYear = new Date(film.release_date).getFullYear();
          const rating = film.vote_average.toFixed(1);

          filmRating.textContent = `${genresNames.join(
            ', '
          )} | ${releaseYear} ${rating}`;
          filmInfoContainer.appendChild(filmRating);

          liElement.appendChild(filmInfoContainer);

          ul.append(liElement);
          console.log(data);
        });
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
