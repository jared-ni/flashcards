import React from 'react';

import { Link } from 'react-router-dom';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Homepage</h2>
                <br />
                <Link to='/viewer'>Go to card viewer </Link> 
                <br />
                <Link to='/editor'>Go to card editor </Link>   
                <br />
            </div>
        )       
    }
}

// so other files can use it
export default Homepage;