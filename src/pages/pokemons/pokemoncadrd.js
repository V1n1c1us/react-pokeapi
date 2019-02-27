import React, {Component} from 'react'
    
import "./styles.css"
import spinner from './spinner.gif'

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequests: false
    }

    componentDidMount(){
        const {name, url} = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length -2]
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex
        })
    }
    render() {
        return (
            <div className="pokemon-card">
                <h4>{this.state.pokemonIndex}</h4>
                {this.state.imageLoading ? (
                    <img src={spinner} style={{width: '5em', height: '5em'}}></img>
                ): null }
                <img
                 className="pokemon-image"
                 onLoad={() => this.setState({imageLoading: false})}
                 onError={() => this.setState({ toManyRequests: true})}
                 src={this.state.imageUrl}
                style={
                 this.state.toManyRequests
                ? { display: 'none' }
                : this.state.imageLoading
                ? null 
                : { display: 'block' }
                }
                />
                {this.state.toManyRequests ? (
                    <h6 className="">To Many Request</h6>
                ): null }
                <h3>{this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(
                        letter => letter.charAt(0).toLowerCase() + letter.substring(1)
                    )
                    .join()
                    }
                </h3>
            </div>
        )
    }
}