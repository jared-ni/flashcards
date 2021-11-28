import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        // controls input of the two place holders 
        this.state = { front: '', back: '' };
    }

    addCard = () => {
        // add card to the parent
        if (!this.state.front.trim() || !this.state.back.trim()) {
            alert("Cannot add empty card!");
            return;
        }
        this.props.addCard(this.state);
        this.setState({ front: '', back: '' });
    };

    // when you give it a value (index), it returns a value, thus
    // when it's in html, it's no longer a function. 
    // use () => this.deleteCards(index) syntax, so it calls a function then this
    deleteCard = index => this.props.deleteCard(index, 1);
    

    // very common function that changes state based on user input
    handleChange = event => 
        this.setState({ [event.target.name]: event.target.value });

    render() {
        // map function takes elements of an array to make it what it should become
        const cards = this.props.cards.map((card, index) => {
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
            <Link to='/viewer' disabled={this.props.cards.length === 0}>Go to card viewer </Link>    
            </div>
        )       
    }
}

// so other files can use it
export default CardEditor;