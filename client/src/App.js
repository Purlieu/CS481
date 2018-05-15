import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button} from 'reactstrap';

import {logout} from './actions/auth'
import {echo} from './actions/echo'
import {serverMessage} from './reducers'
import Movie from './components/Movie'
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
        let recipes = this.props.message.map(item => (
            <Movie key={item.recipe_id} movie={item} click={this.getDetails}/>
        ));
        return (
            <div>
                <Button onClick={this.onAdd} color="secondary">Add a movie</Button>
                {recipes}
            </div>
        )
    };

    render() {
        return (
            <div>
                <h2>Your Movie List</h2>
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
