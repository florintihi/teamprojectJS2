import { fetchMoviesData } from './fetch-data.js';

export async function fetchModalData() {
    try {
        const { data } = await fetchMoviesData();
        const modalWindow = document.querySelector('.modal');
        
        data.results.forEach(film => {
            const description = document.createElement('p');
            description.textContent = film.title;
            modalWindow.appendChild(description);
        });
        // TODO: Remove console.log when done
        console.log({data});
    } catch (error) {
        console.error('Error fetching modal data:', error);
    }
}

fetchModalData();
