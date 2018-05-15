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
    }

    getRecipe = () => {
        fetch("http://lcboapi.com/products?q=" + this.state.searchString +"&access_key=MDpkYjYxNGM5Yy01NzI1LTExZTgtYWEwNy0zZjE1OTY2YzI1ZjQ6emFLaVBITmZ5bkNuWFpzRnR5bDBFdmtrQXRNeklobWtsQ1py")            .then(result => result.json())
            .then(data => {
                if (data.Response === "True") this.setState({recipes: data.result});
                else this.setState({recipes: []})
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
            recipe_id: this.state.selected.id,
            name:  this.state.selected.name,
            category:  this.state.selected.tertiary_category,
            price: this.state.selected.price_in_cents,
            image_url: this.state.selected.image_url,
            producer: this.state.selected.producer_name,

        });
        this.setState({recipes: [], selected: null, searchString: "", timer: null});
        this.props.cancel();
    };

    getDisplay = () => {
        if (this.state.selected) {
            return (
                <form action="#" method="get" onSubmit={this.submit}>

                    <input type="submit"/>
                </form>
            )
        } else {
            let recipes = this.state.recipes.map(recipe => (
                <img key={recipe.id} src={recipe.image_url} alt={recipe.name} height="120px"
                     onClick={() => this.onSelect(recipe)}/>
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
