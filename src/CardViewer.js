import React from 'react';
import './Card.css';

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            front: this.props.cards[0].front, 
            back: this.props.cards[0].back, 
            currentIndex: 0, flipped: true
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

        const card = this.props.cards[this.state.currentIndex][this.state.flipped ? 'back' : 'front'];
        
        return (
            <div class="center">
                <h2>Card Viewer</h2>
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
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
            
        )
    }
}

export default CardViewer;