import React, { Component } from 'react';

class QueuedPlayer extends Component {

    removeMe(player) {
        console.log(`Remove me was clicked from queuedPlayers.js player = ${player}`);
        let url = `http://localhost:3001/person/${player.player}`
        fetch(url, { method: 'DELETE' })
            .then((res) => {
                console.log(`res from currentPlayer fetch call: ${res}`)
                location.reload(true);
            })
        .catch((err) => console.log(`err from currentPlayer fetch${err}`));
    }
    
    render() {
        if (this.props.name === this.props.currentUser.login) {
            return (
                <li>
                    <p>{this.props.name}</p>
                    <img src={this.props.image} />
                    <button onClick={ () => this.removeMe(this.props.name) }>Remove</button>
                </li>
            );
        } else {
            return (
                <li>
                    <p>{this.props.name}</p>
                    <img src={this.props.image} />
                </li>
            );
        }
    }
}

export default QueuedPlayer;