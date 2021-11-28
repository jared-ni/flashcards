import React from 'react';
import './Card.css';
import { Link, withRouter } from 'react-router-dom';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        // controls input of the two place holders 
        this.state = { 
        cards: [
            { front: 'front1', back: 'back1' },
            { front: 'front2', back: 'back2' },
        ],
        front: '', 
        back: '',
        name: '',

    };
        
    }

    addCard = () => {
        // add card to the parent
        if (!this.state.front.trim() || !this.state.back.trim()) {
            alert("Cannot add empty card!");
            return;
        }
        const newCard = { front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({cards, front: '', back: '' });
    };

    // when you give it a value (index), it returns a value, thus
    // when it's in html, it's no longer a function. 
    // use () => this.deleteCards(index) syntax, so it calls a function then this
    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({ cards });
    };
    

    // very common function that changes state based on user input
    handleChange = event => 
        this.setState({ [event.target.name]: event.target.value });

    createDeck = () => {
        const deckId = this.props.firebase.push('/flashcards').key;
        const newDeck = {cards: this.state.cards, name: this.state.name};
        
        //simultaneously update data to two storage locations
        const updates = {};
        updates[`/flashcards/${deckId}`] = newDeck;
        updates[`/homepage/${deckId}`] = {name: this.state.name};
        const onComplete = () => this.props.history.push(`/viewer/${deckId}`);
        this.props.firebase.update('/', updates, onComplete);
    };

    render() {
        // map function takes elements of an array to make it what it should become
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick={() => this.deleteCard(index)}>Delete Cards</button>
                    </td>
                </tr>
            ); 
        });
        // add unique key to help react identify each row/col

        return (
            <div>
                <h2>Card Editor</h2>
                <div>
                    Deck name: {' '}
                    <input 
                        name="name"
                        onChange={this.handleChange}
                        placeholder="Name of deck" 
                        value={this.state.name}
                    />
                </div>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br/>
                <input 
                    name="front"
                    onChange={this.handleChange} 
                    placeholder="Front of card" 
                    value={this.state.front}/> 
                <input 
                    name="back"
                    onChange={this.handleChange} 
                    placeholder="Back of card" 
                    value={this.state.back}/>
                <button onClick={this.addCard}> add card</button> 
                <hr/>
                <div>
                    <button
                        disabled={!this.state.name.trim() || this.state.cards.length === 0}
                        onClick={this.createDeck}>
                        Create deck
                    </button>
                </div>
                <br/>
                <Link to='/'>Home</Link>    
            </div>
        )       
    }
}

// so other files can use it
export default compose(
    firebaseConnect(),
    withRouter,
)(CardEditor);
