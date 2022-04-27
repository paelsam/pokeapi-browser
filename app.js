import { displayResults } from './js/search-pokemon.js';
import getPokemons from '/js/get-pokemons.js';


document.addEventListener("DOMContentLoaded", () => {
    getPokemons();
    displayResults();
})