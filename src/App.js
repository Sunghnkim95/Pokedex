import { useState, useEffect } from "react";
import { PokemonThumbnail } from "./components/PokemonThumbnail";

function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemon = async () => {
    const res = await fetch(loadMore)
    const data = await res.json() //.json to make it into a js object
  
    //console.log(data)
    setLoadMore(data.next);

    function createPokemonObject (result){
      result.forEach( async pokemon =>{
        const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()


        setAllPokemons(currentList => [...currentList, data]) //spread operator to get the current list and then push the new data at the end of the array
      })
    }
    createPokemonObject(data.results)

    /*
    await console.log(allPokemons);

    allPokemons.map((pokemon, index)=>{
      console.log(index)
      console.log(pokemon);
    })
    */
  }

  useEffect(() => {
    getAllPokemon()
  }, [])


  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((pokemon, index) => 
              <PokemonThumbnail
                id={pokemon.id} 
                name={pokemon.name} 
                image={pokemon.sprites.other.dream_world.front_default} 
                type={pokemon.types[0].type.name} 
                key={index}
              />
            )}
          </div>
          <button className="load-more" onClick={()=>{
            getAllPokemon()
          }}>Load more</button>
        </div>
    </div>
  );
}

export default App;
