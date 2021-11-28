import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import { compose } from 'redux';

const Test = (props) => {
  // makes sure data is loaded before displaying
  if(!isLoaded(props.flashcards)) {
    return <div>Loading...</div>
  }
  return <div> {props.flashcards.deck1.name} </div>;
}

const mapStateToProps = state => {
  console.log(state);
  const flashcards = state.firebase.data.flashcards;
  return { flashcards: flashcards};
}

//firebaseConnect wraps connect because first firebase connects to redux then redux connects to react
// export default firebaseConnect(['/flashcards'])(connect(mapStateToProps)(Test));

export default compose(
  firebaseConnect(['/flashcards']),
  connect(mapStateToProps),
)(Test);