import React, { Component } from 'react';
import Queue from "./queue";
import CurrentGame from './currentGame';
import LeaderBoard from './leaderBoard';

class App extends Component {
    constructor(props) {
        super(props);
        // I had to initially set the state to something so that my components didnt 
        //return 'undefined' when initially rendering. 
        //the componentDidMount overides them righ away. 
        this.state = {
            currentMatch: [],
            queue: [],
            currentUser: null
        };
    }

    componentDidMount() {
        console.log('the componentDidMount fired in the App.js file');
        console.log(`this is the Apps state: ${this.state.people}`);

        // fetch('http://localhost:3001/queuedPeople')
        fetch('http://localhost:3001/person')
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson, '<-------- im coming from CDM Fetch');
                this.setState({
                    currentMatch: [...myJson.splice(0, 2)],
                    queue: [...myJson],
                    //the logic for this is flaued 
                    //need to save current user in app state
                    //not just the last to log in
                    currentUser: myJson[myJson.length - 1]
                });
            });
    }

    render() {
        return (
            <div>
                <h1>CodeSmith Pong Stack</h1>
                <CurrentGame currentMatch={this.state.currentMatch} />
                <hr />
                <Queue queue={this.state.queue} currentUser={this.state.currentUser} />
                <LeaderBoard id='leaderBoard' />
            </div>
        );
    }
}

export default App;