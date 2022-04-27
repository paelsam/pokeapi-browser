import { getPokeImageAndID } from './get-pokemons.js';

const d = document;
const $h3 = document.querySelector(".poke-results__container h3");
const $template = document.getElementById("template-card_results").content;
const $results = document.querySelector(".poke-results");
const $fragment = document.createDocumentFragment();

export default async function searchPokemon(name) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
        const data = await res.json();
        const results = data.results.filter(pokemon => {
            return pokemon.name.includes(name);
        });
        return results;
    } catch (error) {
        console.log(error);
    }
}


export function displayResults() {
    d.addEventListener("keyup", e => {
        e.stopPropagation();
        $results.innerHTML = "";
        searchPokemon(e.target.value)
            .then(array => {
                if (e.target.matches('#buscar-poke')) {
                    if (e.target.value.length < 3 || array.length === 0) {
                        array.length = 0;
                        $results.innerHTML = "";
                        $h3.classList.remove("hide");
                        console.log(e.target.value.length);
                    } else {
                        $h3.classList.add("hide");
                        for (const pokemon of array) {
                            console.log(pokemon);
                            const $titulo = $template.querySelector(".card-title"),
                                $image = $template.querySelector(".card-img-top");


                            getPokeImageAndID(pokemon.url)
                                .then(arr => {
                                    $template.querySelector(".card-subtitle").innerHTML = `<b>N° ${arr[0]}</b>`
                                    $image.setAttribute("src", arr[1]);
                                    $image.setAttribute("alt", pokemon.name);
                                    $titulo.textContent = pokemon.name;
                                    $titulo.setAttribute("transtalate", "no");

                                    let $clone = document.importNode($template, true);
                                    $fragment.appendChild($clone);
                                })
                                .catch(error => console.log(error));
                            // Copiamos el Nodo template
                        }
                        $results.appendChild($fragment);
                    }
                }
            })
            .catch(error => console.log(error));
    })
}