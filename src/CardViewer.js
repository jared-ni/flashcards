import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import { connect} from 'react-redux';
import {compose} from 'redux';
class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            currentIndex: 0, 
            flipped: true
        };
    };

    previous = () => {
        console.log("clicked");
        if (this.state.currentIndex > 0) {
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                flipped: false,
            })
        }   
    };

    flip = () => {
        console.log(this.state.flipped);
        this.setState({flipped: !this.state.flipped});
    };

    next = () => {
        console.log(this.state.currentIndex);
        if (this.state.currentIndex < this.props.cards.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                flipped: false,
            })
        };
        
    };

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div> Loading... </div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>;
        }

        const card = this.props.cards[this.state.currentIndex][this.state.flipped ? 'back' : 'front'];
        
        return (
    
            <div className="center">
                <h2>{this.props.name}</h2>
                <h4>Card {this.state.currentIndex + 1} out of {this.props.cards.length}.</h4>

                <div className="card" onClick={this.flip}>
                    <h3>{card}</h3>
                </div>

                <button 
                    disabled={this.state.currentIndex === 0}
                    onClick={this.previous}>Previous
                </button>
                <button 
                    disabled={this.state.currentIndex === this.props.cards.length - 1}
                    onClick={this.next}>Next
                </button>
                <hr />
                <Link to='/'>Home</Link>
            </div>
            
        )
    }
}

const mapStateToProps = (state, props)=> {
    console.log(state);
    const deck = state.firebase.data[props.match.params.deckId];
    // shortcircuiting; doesn't load variables if haven't loaded
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props);
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);
