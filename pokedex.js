async function buscarPokemon(nombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);

    if (!respuesta.ok) {
        console.log(`No se encontró "${nombre}" (status ${respuesta.status})`);
        return null;
    }

    return await respuesta.json();
}

//Las funciones separas nos ayudan a cumplir un pricipio solid,
// donde cada funcion tiene una sola funcionalidad, esto nos sirve
//para cuando un proceso cambie, internamente solo se modifique ese proceso.

function mostrarFicha(datos) {
    if (!datos) {
        console.log("No hay nada que mostrar");
        return;
    }

    console.log(`${datos.name.toUpperCase()} - Pokédex #${datos.id}`);

    const tipos = datos.types.map(t => t.type.name);
    console.log("Tipos:", tipos.join(" / "));

    console.log(`Altura: ${datos.height * 10} cm | Peso: ${datos.weight / 10} kg`);

    console.log("Stats:");
    for (const s of datos.stats) {
        console.log(`  ${s.stat.name}: ${s.base_stat}`);
    }

    console.log("Habilidades:");
    for (const h of datos.abilities) {
        console.log(`  ${h.ability.name}${h.is_hidden ? " (oculta)" : ""}`);
    }
}

function obtenerStat(datos, nombreStat) {
    for (let i = 0; i < datos.stats.length; i++) {
        if (datos.stats[i].stat.name === nombreStat) {
            return datos.stats[i].base_stat;
        }
    }
    return null;
}





async function main() {
    const bulbasaur = await buscarPokemon("bulbasaur");
    mostrarFicha(bulbasaur);

    const snorlax = await buscarPokemon("snorlax");
    mostrarFicha(snorlax);
}

main();
