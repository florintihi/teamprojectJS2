const ul = document.querySelector('ul');
const urlFetch = 'https://jsonplaceholder.typicode.com/photos';


// fetch(urlFetch)
//     .then(res => {
//        return res.json();
//     })
//     .then(data => {
//         data.forEach(film => {
         
//         const liElement = document.createElement('li');
//         liElement.classList.add('film-box');

//         const imgElement = document.createElement('img');
//         imgElement.classList.add('film-img')
//         imgElement.alt = 'Movie cover photo'
//         imgElement.src = film.url;
//         liElement.appendChild(imgElement);

//         const filmInfoContainer = document.createElement('div');
//         filmInfoContainer.classList.add('film-info-container');

//         const filmName = document.createElement('p');
//         filmName.classList.add('film-name');
//         filmName.textContent = film.albumId;
//         filmInfoContainer.appendChild(filmName);

//         const filmRating = document.createElement('span');
//         filmRating.classList.add('film-rating');
//         filmRating.textContent = `${film.title} | ${film.id}`;
//         filmInfoContainer.appendChild(filmRating);
    
//         liElement.appendChild(filmInfoContainer);

//         ul.appendChild(liElement);
        
//         console.log(imgElement.src)
//         });
//     })
//     .catch(err => console.log(err))





       // const markup = 
            // `
            // <li class="film-box">
            //     <p class="film-img">${film.email}</p>
            //     <div class="film-info-container">
            //         <p class="film-name">${film.name}</p>
            //         <span class="film-rating">${film.username} | ${film.id}</span> 
            //     </div>
            // </li>
            // `
            // li.insertAdjacentHTML('afterbegin',markup)



fetch(urlFetch)
    .then(res => {
       return res.json();
    })
    .then(data => {
        for (let i = 0; i < Math.min(12, data.length); i++) {
            const film = data[i];

            const liElement = document.createElement('li');
            liElement.classList.add('film-box');

            const imgElement = document.createElement('img');
            imgElement.classList.add('film-img')
            imgElement.alt = 'Movie cover photo'
            imgElement.src = film.url;
            liElement.appendChild(imgElement);

            const filmInfoContainer = document.createElement('div');
            filmInfoContainer.classList.add('film-info-container');

            const filmName = document.createElement('p');
            filmName.classList.add('film-name');
            filmName.textContent = film.thumbnailUrl;
            filmInfoContainer.appendChild(filmName);

            const filmRating = document.createElement('span');
            filmRating.classList.add('film-rating');
            filmRating.textContent = `${film.title} | ${film.id}`;
            filmInfoContainer.appendChild(filmRating);
        
            liElement.appendChild(filmInfoContainer);

            ul.appendChild(liElement);
            
            console.log(imgElement.src);
        }
    })
    .catch(err => console.log(err));
