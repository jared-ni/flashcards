import React from 'react';
import logo from './logo.svg';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                { front: 'front1', back: 'back1' },
                { front: 'front2', back: 'back2' },
            ],
            editor: false, // if true, render editor; else render viewer
        };
    }

    addCard = card => {
        // makes a copy of the state cards for you, then add new card
        const cards = this.state.cards.slice().concat(card);
        this.setState({ cards }) //if name and attribute have same name, cards: cards == cards
    }

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({ cards });
    }

    switchMode = () => this.setState({ editor: !this.state.editor });

    render() {
        if (this.state.editor) {
            return (
                <CardEditor 
                addCard={this.addCard} 
                deleteCard={this.deleteCard} 
                cards={this.state.cards}
                switchMode={this.switchMode}/>
            );
        } else {
            return (
                <CardViewer 
                switchMode={this.switchMode}
                cards={this.state.cards}
                />)
            ;
        }

        
    }
}

export default App;