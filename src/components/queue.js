import React, { Component } from 'react';
import QueuedPlayer from './queuedPlayer';

class Queue extends Component {

    handleClick() {
        console.log(`The add me button was clicked!!!`);
        fetch("http://localhost:3001/queuedPeople")
        .then(res => res.json())
        .then(mycookie => console.log(mycookie, "my cookie????")); 
    }

    render() {
        let queue = this.props.queue.map((e, i) => {
            return (
                <QueuedPlayer name={e.login} image={e.avatar_url} key={i} currentUser={this.props.currentUser} />
            );
        })

        return (
            <div id='queue'>
                <button onClick={this.handleClick} >Add me to the Queue</button>
                <ol>
                    {queue}
                </ol>
            </div>
        );
    }
}

export default Queue;