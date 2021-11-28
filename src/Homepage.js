import React from 'react';

import { Link } from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import { connect} from 'react-redux';
import {compose} from 'redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!isLoaded(this.props.homepage)) {
            return <div> Loading... </div>;
        }

        // decks is an array of <div>
        const decks = Object.keys(this.props.homepage).map(deckId => {
            // set each deck object to its corresponding key in homepage object
            const deck = this.props.homepage[deckId];
            // returned info to be stored in decks
            return (
                <div>
                    <Link to={`/viewer/${deckId}`}>{deck.name}</Link>
                </div>
            );
        });
        
        return (
            <div>
                <h2>Homepage</h2>
                <br />
                <h3>Editor</h3>
                <Link to='/editor'>Go to card editor </Link>   
                <br />
                <h3>Flashcards</h3>
                <div>
                    {decks}
                </div>
                
            </div>
        )       
    }
}

const mapStateToProps = (state, props)=> {
    console.log(state);
    const homepage = state.firebase.data.homepage;
    //const namesArray = Object.keys(pageNames);
    console.log('homepage', homepage);
    //console.log('namesArray', namesArray);
    return { homepage: homepage };
}

// so other files can use it
export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(Homepage);
