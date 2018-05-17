import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button} from 'reactstrap';

import {logout} from './actions/auth'
import {echo} from './actions/echo'
import {serverMessage} from './reducers'
import Recipe from './components/Recipe'
import Details from "./components/Details";
import AddForm from "./components/AddForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            adding: false
        }
    }

    componentDidMount() {
        this.props.fetchMessage('Hi!')
    }

    onLogout = (event) => {
        event.preventDefault();
        this.props.onLogout();
    };

    onAdd = () => this.setState({adding: true});

    getDetails = (event) => {
        const recipe = this.props.message.reduce((acc, curr) => curr.recipe_id === event.target.id ? curr : acc, null);
        this.setState({selected: recipe});
    };

    noDetails = () => this.setState({selected: null});

    cancelAdd = () => this.setState({adding: false});

    getDisplay = () => {
        if (this.state.selected) {
            return <Details recipe={this.state.selected} back={this.noDetails}/>
        }
        if (this.state.adding) {
            return <AddForm cancel={this.cancelAdd}/>
        }
        console.log(this.props.message)
        var i;
        for(i = 0; i < this.props.message.length; i++) {
            if(this.props.message[i] === undefined) this.props.message.splice(i, 1)
        }
            let recipes = this.props.message.map(item => (

                <Recipe key={item.recipe_id} recipe={item} click={this.getDetails}/>
            ));
            return (
                <div className="addCocktail">
                    <h3>Add A New Cocktail</h3>
                    <Button onClick={this.onAdd} color="secondary">Add a Cocktail</Button><br />
                    {recipes}
                </div>
            )


        return (
            <div className="addCocktail">
                <h3>Add A New Cocktail</h3>
                <Button onClick={this.onAdd} color="secondary">Add a Cocktail</Button>
            </div>
        )
    };

    render() {
        return (
            <div>
                <Button id="logout" onClick={this.onLogout} color="primary">Logout</Button>
                {this.getDisplay()}
            </div>
        );
    }
}

export default connect(
    state => ({message: serverMessage(state)}),
    {fetchMessage: echo, onLogout: logout}
)(App);
