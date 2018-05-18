import React, {Component} from 'react'

export default class DrinkBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe,
            idDrink: props.idDrink,
            strDrinkThumb: props.strDrinkThumb,
            strDrink: props.strDrink,
        }
    }

    onSelect = (recipe) => {
        this.props.onUpdate(recipe);
        this.setState({selected: recipe});
    }

    render() {
        return (
            <img key={this.state.idDrink} src={this.state.strDrinkThumb} alt={this.state.strDrink} height="120px"
                     onClick={() => this.onSelect(this.state.recipe)}/>
        )
    }
}