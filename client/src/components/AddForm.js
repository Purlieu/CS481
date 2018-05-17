import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {connect} from "react-redux";
import {addRecipe} from "../actions/echo";
import './css/DrinkBox.css'
import './css/AddFormSheet.css'

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selected: null,
            timer: null,
            searchString: ""
        };
    }


    getRecipe = () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchString
            )
            .then(result => {
            if(result.ok)
            {
                result = result.json()
                .then(data => {
               this.setState({recipes: data.drinks});
                })
            }
            else{
                throw new Error('Something went wrong');
            }
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
            name: e.target[0].value,
            category: e.target[1].value,
            image_url: this.state.selected.strDrinkThumb,
            ingredient1: e.target[2].value,
            ingredient2: e.target[3].value,

            })

        this.setState({recipes: [], selected: null, searchString: "", timer: null});
        this.props.cancel();
    };
    getDisplay = () => {
        if (this.state.selected) {
            return (
                <div>
                <h3>Add This Drink To Your List</h3>
                <form action="#" method="get" onSubmit={this.submit}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" value={this.state.selected.strDrink} type="text" readOnly/><br />
                    <label htmlFor="category">Category:</label>
                    <input id="category" value={this.state.selected.strCategory} type="text" readOnly/><br />
                    <label htmlFor="strIngredient1">Ingredient 1:</label>
                    <input id="ingredient1" value={this.state.selected.strIngredient1} type="text" readOnly/><br />
                    <label htmlFor="strIngredient2">Ingredient 2:</label>
                    <input id="ingredient2" value={this.state.selected.strIngredient2} type="text" readOnly/><br />
                    <input type="submit" value="Add"/>
                </form>
                </div>
            )
        } else {
                let recipes = this.state.recipes.map(recipe => (
                    <DrinkBox key={recipe.idDrink} onClick={() => this.onSelect(recipe)}
                              idDrink={recipe.idDrink}
                              strDrinkThumb={recipe.strDrinkThumb}
                              strDrink={recipe.strDrink}
                              strCategory={recipe.strCategory}
                              recipe={recipe}
                              handler={this.onSelect}/>

                ));
                return (
                <label id="recipeSubmit">
                    <h5>Search For Recipe</h5>
                    <input type="text" onChange={this.onChange}/>
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    {recipes}
                </label>
            )




        }
    };

    render() {
        return this.getDisplay()
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (myRecipe) => {
        if(myRecipe !== undefined) {
            dispatch(addRecipe(myRecipe))
        }
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
            ingredient1: props.recipe.strIngredient1,
            ingredient2: props.recipe.strIngredient2,
            strMeasure1: props.recipe.strMeasure1,
            strMeasure2: props.recipe.strMeasure2,
            strCategory: props.strCategory,
        }
    }
    getIngredients = () => {
            return (
            <div>
            <label id="drinkBoxContainer" onClick={() => (this.props.handler(this.state.recipe))}>
            <img src={this.state.strDrinkThumb} alt={this.state.strDrink}/>
                <ul className="list-unstyled">
                    <li>Name: {this.state.strDrink}</li>
                    <li>Type of Drink: {this.state.strCategory}</li>
                    <li>Recipe ID: {this.state.idDrink}</li>
                    <span>Ingredient List</span>
                    <ul>
                        <li>{this.state.ingredient1}, {this.state.strMeasure1}</li>
                        <li>{this.state.ingredient2}, {this.state.strMeasure2}</li>
                    </ul>
                    </ul>
                </label>
            </div>
            )
    };
    render() {
        return this.getIngredients()
    }
}

