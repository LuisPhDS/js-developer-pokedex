const pokemonList = document.querySelector('#pokemonList');
const loadMoreButton = document.querySelector('#loadMore');

const maxRecord = 151;
const limit = 4;
let offset = 0;


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}" data-bs-toggle="modal" data-bs-target="#pokemonModal${pokemon.id}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}" alt="Imagem do ${pokemon.name}">
                </div>
            </li>
            
            <!-- Modal para o Pokémon -->
                <div class="modal fade" id="pokemonModal${pokemon.id}" tabindex="-1" aria-labelledby="pokemonModalLabel${pokemon.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="pokemonModalLabel${pokemon.id}">${pokemon.name}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body flex-column">
                                <div class="row mb-3">
                                    <div class="col">
                                        <span> <p>Espécie: ${pokemon.species}</p> </span>
                                        <span> <p>Altura: ${pokemon.height}</p> </span>
                                    </div>
                                    <div class="col">
                                        <span> <p>Peso: ${pokemon.weight}</p> </span>
                                        <span> <p>Habilidades: ${pokemon.abilities}</p> </span>
                                    </div>
                                </div>

                                <div class="attribute mb-3">
                                    <p>HP: ${pokemon.hp}</p>
                                    <div class="bar">
                                        <div class="fill" style="width: ${pokemon.hp}%; background-color: ${getBarColor(pokemon.hp)};"></div>
                                    </div>
                                </div>
                                <div class="attribute mb-3">
                                    <p>Ataque: ${pokemon.attack}</p>
                                    <div class="bar">
                                        <div class="fill" style="width: ${pokemon.attack}%; background-color: ${getBarColor(pokemon.attack)};"></div>
                                    </div>
                                </div>
                                <div class="attribute mb-3">
                                    <p>Defesa: ${pokemon.defense}</p>
                                    <div class="bar">
                                        <div class="fill" style="width: ${pokemon.defense}%; background-color: ${getBarColor(pokemon.defense)};"></div>
                                    </div>
                                </div>
                                <div class="attribute mb-3">
                                    <p>Velocidade: ${pokemon.speed}</p>
                                    <div class="bar">
                                        <div class="fill" style="width: ${pokemon.speed}%; background-color: ${getBarColor(pokemon.speed)};"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        ).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', ()=>{
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    debugger

    if(qtdRecordsWithNextPage >= maxRecord){
        const newLimit = maxRecord - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset, limit);
    }

});