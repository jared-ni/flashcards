import React from 'react';
import logo from './logo.svg';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                { front: 'front1', back: 'back1' },
                { front: 'front2', back: 'back2' },
            ],
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

    render() {
        return (
            <Switch>
                <Route exact path='/'>
                    <Homepage />
                </Route>
                <Route exact path='/editor'>
                    <CardEditor 
                        addCard={this.addCard} 
                        deleteCard={this.deleteCard} 
                        cards={this.state.cards}
                    />
                </Route>
                <Route exact path='/viewer'>
                    <CardViewer 
                        cards={this.state.cards}
                    />
                </Route>
            </Switch>
        )

    }
}

export default App;