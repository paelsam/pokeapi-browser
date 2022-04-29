import getPokeImageAndID from '/js/get-poke-image-and-ID.js'

const d = document;
const $noResults = document.querySelector(".no-results");
const $template = document.getElementById("template-card_results").content;
const $results = document.querySelector(".poke-results");
const $fragment = document.createDocumentFragment();
const $input = document.getElementById("buscar-poke")
const $emoji = document.querySelector(".emoji");

async function searchPokemon(name) {
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


export default function displayResults() {
    d.addEventListener("keyup", e => {
        $results.innerHTML = "";
        searchPokemon($input.value.toLowerCase())
            .then(array => {
                if (e.target.matches('#buscar-poke')) {
                    if ($input.value.length < 3 || array.length === 0) {
                        array.length = 0;
                        $results.innerHTML = "";
                        $noResults.classList.remove("hide");
                    } else {
                        $noResults.classList.add("hide");
                        $emoji.classList.remove("hide");
                        for (const pokemon of array) {
                            // console.log(pokemon);
                            getPokeCard(pokemon);
                        }
                        $results.appendChild($fragment);
                    }
                }
            })
            .catch(error => console.log(error));
    })
}


async function getPokeCard(pokemon) {
    const $titulo = $template.querySelector(".card-title"),
        $image = $template.querySelector(".card-img-top");

    // Obtenemos el id y la imagen del pokemon
    await getPokeImageAndID(pokemon.url)
        .then(arr => {
            $template.querySelector(".card-subtitle").innerHTML = `<b>N° ${arr[0]}</b>`
            $image.setAttribute("src", arr[1]);
            $image.setAttribute("alt", pokemon.name);
            if (arr[1] == null) {
                $image.setAttribute("src", "/assets/null.jpg");
                $image.setAttribute("alt", "Imagen desconocida");
            }
            $titulo.textContent = pokemon.name;
            $titulo.setAttribute("transtalate", "no");

            let $clone = document.importNode($template, true);
            $fragment.appendChild($clone);
        })
        .catch(error => console.log(error));
}