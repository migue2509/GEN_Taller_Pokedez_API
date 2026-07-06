async function buscarPokemon(nombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);

    if (!respuesta.ok) {
        console.log(`No se encontró "${nombre}" (status ${respuesta.status})`);
        return null;
    }

    return await respuesta.json();
}

async function main() {
    const nombres = ["Pikachu", "charmander", "gengar", "noexiste"];

    for (const nombre of nombres) {
        const pokemon = await buscarPokemon(nombre);
        if (pokemon !== null) {
            console.log(pokemon.name, "- id:", pokemon.id);
        }
    }
}

main();