const $template = document.getElementById("template-card").content,
    $cards = document.querySelector(".poke-cards"),
    $fragment = document.createDocumentFragment();


export default async function getPokemons() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await res.json();
        const { results } = data;

        // console.log(data);

        for (const pokemon of results) {
            const $titulo = $template.querySelector(".card-title"),
                $image = $template.querySelector(".card-img-top");
            await getPokeImageAndID(pokemon.url)
                .then(arr => {
                    $template.querySelector(".card-subtitle").innerHTML = `<b>N° ${arr[0]}</b>`
                    $image.setAttribute("src", arr[1]);
                    $image.setAttribute("alt", pokemon.name);
                    $titulo.textContent = pokemon.name;
                    $titulo.setAttribute("transtalate", "no");
                })
                .catch(error => console.log(error));
            // Copiamos el Nodo template
            let $clone = document.importNode($template, true);
            $fragment.appendChild($clone);
        }
        $cards.appendChild($fragment);
    } catch (error) {
        console.log(error);
    }
}

export async function getPokeImageAndID(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        // ID del pokemon y la imagen
        const idImg = [data.id, data.sprites.front_default];
        return idImg;
    } catch (error) {
        console.log(error);
    }
}