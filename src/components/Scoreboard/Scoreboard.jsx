import { useState } from "react";   
import Counter from '../Counter/Counter'
import './Scoreboard.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const initialPlayers = {
    A: {
        Name: "Player A",
        Score: 0,
        Wins: 0
    },
    B: {
        Name: "Player B",
        Score: 0,
        Wins: 0        
    }
};

const initialWinningScore = 21;
const withDeuce = false;

const Scoreboard = () => {    
    const [players, setPlayers] = useState(initialPlayers);
    const [winningScore, setWinningScore] = useState(initialWinningScore);
    const [winnerDialog, setWinnerDialog] = useState(false);
    
    const handleIncreaseClick = (p) => {
        let player = getPlayerSymbol(p);
        let opponent = getOpponentSymbol(p);
        
        let score = players[player].Score 
        
        //prevent increasing score if thes is already winner
        if (score == winningScore)
            return;
                
        score = score + 1;

        //handle deuce
        if (withDeuce && score == winningScore - 1 && players[opponent].Score == winningScore - 1) {
            setWinningScore(winningScore + 1);
        }
        
        let playersCopy = {...players};
        playersCopy[player].Score = score;            

        if (score == winningScore) {            
            playersCopy[player].Wins = playersCopy[player].Wins + 1;            
            setWinnerDialog(true);
        }
        
        setPlayers(playersCopy);
    };

    const handeDecreaseClick = (player) => {
        let symbol = getPlayerSymbol(player);
        
        let score = players[symbol].Score
        
        //prevent decreasing score below 0
        if (score == 0)
            return

        score = score - 1;

        let playersCopy = {...players};
        playersCopy[symbol].Score = score;

        setPlayers(playersCopy);
    };

    const handleScoreReset = () => {
        let playersCopy = {...players};
        players.A.Score = 0;
        players.B.Score = 0;

        setPlayers(playersCopy);
        setWinningScore(initialWinningScore);
        setWinnerDialog(false);
    }

    const handleDialogCancel = () => {
        setWinnerDialog(false);
    }

    const getPlayerSymbol = (player) => {
        return player.Name == players.A.Name ? 'A' : 'B';
    }

    const getOpponentSymbol = (player) => {
        return player.Name == players.A.Name ? 'B' : 'A';
    }

    return (
        <>
            <div className="scoreboard">
                <div>
                    <Counter player={players.A} isWinner={winningScore == players.A.Score} onIncrease={()=>handleIncreaseClick(players.A)} onDecrease={()=>handeDecreaseClick(players.A)}/>
                </div>
                <div>
                    <Counter controlAlign="right"  player={players.B} isWinner={winningScore == players.B.Score} onIncrease={()=>handleIncreaseClick(players.B)} onDecrease={()=>handeDecreaseClick(players.B)}/>
                </div>
            </div>
            <Dialog open={winnerDialog}>
                <DialogTitle>Win</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {players.A.Score == winningScore ? players.A.Name : players.B.Name} wins! 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleScoreReset}>Reset Scores</Button>
                    <Button onClick={handleDialogCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Scoreboard;