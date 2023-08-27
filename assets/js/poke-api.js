const pokeApi = {

}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.versions['generation-v']['black-white'].animated.front_default
    
    pokemon.species = pokeDetail.species.name;
    pokemon.height = (pokeDetail.height / 10).toFixed(1) + "m";
    pokemon.weight = (pokeDetail.weight / 10).toFixed(1) + "kg";
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name).join(', ');

    const stats = pokeDetail.stats;
    pokemon.hp = stats.find(stat => stat.stat.name === "hp").base_stat;
    pokemon.attack = stats.find(stat => stat.stat.name === "attack").base_stat;
    pokemon.defense = stats.find(stat => stat.stat.name === "defense").base_stat;
    pokemon.speed = stats.find(stat => stat.stat.name === "speed").base_stat;
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 4)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function getBarColor(value) {
    if (value >= 80) {
        return '#4caf50';
    } else if (value >= 50) {
        return '#ffc107';
    } else {
        return '#f44336';
    }
}