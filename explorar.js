async function explorarPokemon() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    console.log(respuesta.status)
    const datos = await respuesta.json();
    // console.log(datos);
   
    //Ejercicio 1
    //Tipos de pokemon
    for (const t of datos.types) {
         console.log(`Tipo de pokemon: ${t.type.name}`);
    }
    //stats
    for (const s of datos.stats){
        console.log(`Stats: Nombre: ${s.stat.name}, Valor: ${s.base_stat} `)
    }

    // habilidades
    for (const a of datos.abilities){
        console.log(`Habilidades: ${a.ability.name}`)
    }

}

explorarPokemon();

async function buscarPokemon(nombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
   
    if (!respuesta.ok){
        console.log(`No se encontro "${nombre}" (status: ${respuesta.status})`)
        return null;
    }

     const datos = await respuesta.json()
     return datos
}

