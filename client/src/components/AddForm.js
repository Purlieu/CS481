import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {connect} from "react-redux";
import {addRecipe} from "../actions/echo";

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selected: null,
            timer: null,
            searchString: ""
        }
        this.onSelect = this.onSelect.bind(this)
    }

    getRecipe = () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchString
            )
            .then(result => result.json())
            .then(data => {
               this.setState({recipes: data.drinks});
            })
    };

    onChange = (event) => {
        clearTimeout(this.state.timer);
        this.setState({searchString: event.target.value});
        if (event.target.value === "") {
            this.setState({recipes: []});
        } else {
            let timer = setTimeout(this.getRecipe, 1000);
            this.setState({timer: timer});
        }
    };

    onSelect = (recipe) => this.setState({selected: recipe});

    submit = (e) => {
        e.preventDefault();
        this.props.addRecipe({
            recipe_id: this.state.selected.idDrink,
            name:  this.state.selected.strDrink,
            category:  this.state.selected.strCategory,
            image_url: this.state.selected.strDrinkThumb,

        });
        this.setState({recipes: [], selected: null, searchString: "", timer: null});
        this.props.cancel();
    };

    getDisplay = () => {
        if (this.state.selected) {
            return (
                <form action="#" method="get" onSubmit={this.submit}>
                    <label htmlFor="purchase">Purchase Date:</label>
                    <input id="purchase" type="date" required={true}/>
                    <label htmlFor="location">Location:</label>
                    <input id="location" type="text" required={true}/>
                    <label htmlFor="rating">Personal Rating:</label>
                    <input id="rating" type="number" required={true}/>
                    <label htmlFor="notes">Notes:</label>
                    <input id="notes" type="text" required={true}/>
                    <input type="submit"/>
                </form>
            )
        } else {

            let recipes = this.state.recipes.map(recipe => (
                <DrinkBox idDrink={recipe.idDrink} strDrinkThumb={recipe.strDrinkThumb} strDrink={recipe.strDrink} recipe={recipe} handler={this.onSelect} />
            ));
            return (
                <div>
                    <input type="text" onChange={this.onChange}/>
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    {recipes}
                </div>
            )
        }
    };

    render() {
        return this.getDisplay()
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (myRecipe) => {
        dispatch(addRecipe(myRecipe))
    }
});

export default connect(null, mapDispatchToProps)(AddForm);

class DrinkBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe,
            idDrink: props.idDrink,
            strDrinkThumb: props.strDrinkThumb,
            strDrink: props.strDrink,
        }
    }

    render() {
        return (
            <img key={this.state.idDrink} src={this.state.strDrinkThumb} alt={this.state.strDrink} height="120px"
                 onClick={() => (this.props.handler(this.state.recipe))}/>
        )
    }
}

