
import { ApiKey } from './refs'

const BASE_URL_TO_QUERY_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=';

const LOCAL_KEY_GENRES = 'genresOfFilms';

// Запрос жанров 
async function fetchGenres() {
    const response = await fetch(`${BASE_URL_TO_QUERY_GENRES}${ApiKey}&language=en-US`);
    const data = await response.json();
    return data;
};

// Функция сохранения в локальное хранилище списка жанров
async function saveMovieGenresInStorage() {
    try {
        const {genres}  = await fetchGenres();
        localStorage.setItem(LOCAL_KEY_GENRES, JSON.stringify(genres));
    }
    catch (error) {
        console.log(error)
    }
}

// Выбор нужного жанра (по id) из списка в локальном хранилище
export function getMovieGenres(id) {
    const listOfAllMovieGenres = localStorage.getItem(LOCAL_KEY_GENRES);
    const allMovieGenres = JSON.parse(listOfAllMovieGenres);
        for (const movieGenre of allMovieGenres) {
            if (movieGenre.id === id) {
                
                return movieGenre.name;
            }
            
        }
}

saveMovieGenresInStorage();
