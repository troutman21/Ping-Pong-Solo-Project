import React, {Component} from 'react'; 

class LeaderBoard extends Component {

    goToLeaderBoard(){
        console.log(`The leader board button was clicked`); 
    }

    render(){
        return (
            <button onClick={this.goToLeaderBoard}>Leader Board</button>
        )
    }
}

export default LeaderBoard;