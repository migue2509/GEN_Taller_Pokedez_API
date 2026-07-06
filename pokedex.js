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

async function compararPokemon(nombre1, nombre2, stat) {
    const p1 = await buscarPokemon(nombre1);
    const p2 = await buscarPokemon(nombre2);

    if (!p1 || !p2) {
        console.log("No se puede comparar: algún pokémon no existe");
        return;
    }

    const valor1 = obtenerStat(p1, stat);
    const valor2 = obtenerStat(p2, stat);

    if (valor1 === null || valor2 === null) {
        console.log(`La stat "${stat}" no existe. Válidas: hp, attack, defense, special-attack, special-defense, speed`);
        return;
    }

    console.log(`${p1.name}: ${valor1} vs ${p2.name}: ${valor2} (${stat})`);
    if (valor1 > valor2) {
        console.log(`Gana ${p1.name}`);
    } else if (valor2 > valor1) {
        console.log(`Gana ${p2.name}`);
    } else {
        console.log("Empate");
    }
}

async function main() {
    // 1. snorlax es un tanque: su hp es su stat distintiva
    await compararPokemon("snorlax", "machamp", "hp");

    // 2. dos de mi elección en defense
    await compararPokemon("onix", "steelix", "defense");

    // 3. stat inexistente: debe avisar, no romperse
    await compararPokemon("pikachu", "raichu", "fuerza");
}

main();
