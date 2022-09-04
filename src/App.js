import logo from './logo.svg';
import React from 'react'
import './App.css';
function App() {

  const [pokemonList, setPokemonList] = React.useState([])
  const [currentPokemon, setCurrentPokemon] = React.useState(1)
  const [description, setDescription] = React.useState('description')

  React.useEffect(()=>{
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=150/')
    .then(res=> res.json())
    .then(data => setPokemonList(data.results))
  }, [])

  console.log(pokemonList)

  const pokemonOptions = pokemonList.map(pokemon =>{
    return (
      <option key={pokemonList.indexOf(pokemon) + 1} value={pokemonList.indexOf(pokemon) + 1}>{pokemon.name}</option>
    )
  })

  function getPokemonImg (id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
  }

  function getDescription () {
    fetch(`https://pokeapi.co/api/v2/characteristic/${currentPokemon}/`)
    .then(res => res.json())
    .then(data => setDescription(data.descriptions[7].description))
  }

  function handleChange(e){
    setCurrentPokemon(e.target.value)
    getDescription()
  }

  function nextPokemon() {
    setCurrentPokemon(prev => prev + 1)
    getDescription()
  }

  function prevPokemon(){
    setCurrentPokemon(prev => prev - 1)
    getDescription()
  }

  console.log(description)

  return (
    <div>
      <img src={getPokemonImg(currentPokemon)} style={{height: 100 + 'px'}}/>
      <select
      onChange={handleChange}>
        {pokemonOptions}
      </select>
      {description}
      <button disabled={currentPokemon <= 1 ? true : false} onClick={(prevPokemon)}>Previous</button><button onClick={nextPokemon}>Next</button>

    </div>
  )
}

export default App;
