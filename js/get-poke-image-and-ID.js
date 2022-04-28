export default async function getPokeImageAndID(url) {
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