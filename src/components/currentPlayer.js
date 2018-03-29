import React, { Component } from 'react';

class CurrentPlayer extends Component {
    constructor(props) {
        super(props)
        this.removeMe = this.removeMe.bind(this);
    }

    removeMe(player) {
        console.log(`the removeMe function was fired from currentPlayer.js`)
        console.log(`this refers to: ${player.login}`);
        let url = `http://localhost:3001/person/${player.login}`

        fetch(url, { method: 'DELETE' })
            .then((res) => {
                console.log(`res from currentPlayer fetch call: ${res}`)
                location.reload(true);
            })
            .catch((err) => console.log(`err from currentPlayer fetch${err}`));
    }

    render() {
        //Checking to make sure we didnt pass in 'Waiting for player...'
        //if we did .login will be undefined and we just pass in .plyer.
        const name = this.props.player.login
            ? this.props.player.login
            : this.props.player

        return (
            <div>
                <p>{name}</p>
                <img src={this.props.player.avatar_url} onClick={(e) => this.removeMe(this.props.player)} />
            </div>
        );
    }
}

export default CurrentPlayer;