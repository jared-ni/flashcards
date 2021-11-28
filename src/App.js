import React from 'react';
import logo from './logo.svg';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import Test from './Test';

import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/editor'>
                <CardEditor />
            </Route>
            <Route path='/viewer/:deckId'>
                <CardViewer />
            </Route>
            <Route path='/test'>
                <Test />
            </Route>
            <Route>
                <div>Page not found!</div>
            </Route>
        </Switch>
    );
};

export default App;