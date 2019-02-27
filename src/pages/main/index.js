import React, {Component} from 'react'
import axios from 'axios'

import "./style.css"
import PokemonCard from '../pokemons/pokemoncadrd'

export default class Main extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        pokemons: [],
    }

    componentDidMount(){
        this.loadPokemons();
    }

    loadPokemons = async () => {
        const response = await axios.get(this.state.url)
        
        this.setState({ pokemons: response.data.results})


        console.log(response.data.results)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.pokemons ? (
                    <div className="pokemons-list">
                        { this.state.pokemons.map(pokemon => (
                            <PokemonCard
                             key={pokemon.name}
                             name={pokemon.name}
                             url={pokemon.url}
                            />
                        ))}
                    </div>
                ) : (
                <h1>Loading...</h1>
            )}
            </React.Fragment>
        )
    }   
}