import React, { Component } from 'react';
import CurrentPlayer from './currentPlayer';

class CurrentGame extends Component {

    render() {
        //If there is not a player to fill this spot then it will fill in 'Waiting for player...'
        let player1 = this.props.currentMatch[0]
            ? this.props.currentMatch[0]
            :'Waiting for player...'
        let player2 = this.props.currentMatch[1]
            ? this.props.currentMatch[1]
            :'Waiting for player...'

        return (
            <div id="currentGame">
                <CurrentPlayer player={player1} />
                <div>
                    <h3>VS.</h3>
                </div>
                <CurrentPlayer player={player2} />
            </div>
        );
    }
}

export default CurrentGame;


