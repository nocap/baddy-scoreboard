import { useState } from "react";   
import Counter from '../Counter/Counter'
import './Scoreboard.css'
import Button from '@mui/material/Button';
import WinnerDialog from '../WinnerModal/WinnerModal';


const initialPlayers = {
    A: {
        Name: "Player A",
        Score: 0,
        Win: 0
    },
    B: {
        Name: "Player B",
        Score: 0,
        Win: 0        
    }
};

const initialWinningScore = 21;
const withDeuce = false;

const Scoreboard = () => {    
    const [players, setPlayers] = useState(initialPlayers);
    const [winningScore, setWinningScore] = useState(initialWinningScore);
    const [winnerDialog, setWinnerDialog] = useState(false);
    
    const handleIncreaseScore = (p) => {
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
            playersCopy[player].Win = playersCopy[player].Win + 1;            
            setWinnerDialog(true);
        }
        
        setPlayers(playersCopy);
    };

    const handeDecreaseScore = (player) => {
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

    const handleIncreaseWin  = (p) => {
        let player = getPlayerSymbol(p);        
        
        let win = players[player].Win;
        win = win + 1;

        let playersCopy = {...players};
        playersCopy[player].Win = win;

        setPlayers(playersCopy);
    }

    const handleDecreaseWin  = (p) => {
        let player = getPlayerSymbol(p);        
        
        let win = players[player].Win;

        if (win == 0)
            return;

        win = win - 1;

        let playersCopy = {...players};
        playersCopy[player].Win = win;

        setPlayers(playersCopy);
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
                <div className="score_player_1">
                    <Counter player={players.A} isWinner={winningScore == players.A.Score} onIncreaseScore={()=>handleIncreaseScore(players.A)} onDecreaseScore={()=>handeDecreaseScore(players.A)} onIncreaseWin={()=> handleIncreaseWin(players.A)} onDecreaseWin={()=>handleDecreaseWin(players.A)}/>
                </div>
                <div className="score_player_2">
                    <Counter controlAlign="right"  player={players.B} isWinner={winningScore == players.B.Score} onIncreaseScore={()=>handleIncreaseScore(players.B)} onDecreaseScore={()=>handeDecreaseScore(players.B)} onIncreaseWin={()=> handleIncreaseWin(players.B)} onDecreaseWin={()=>handleDecreaseWin(players.B)}/>
                </div>
            </div>
            
            <div className="reset-panel">
                {players.A.Score == winningScore || players.B.Score == winningScore ?
                <Button variant="outlined" onClick={handleScoreReset}>Reset Scores</Button>
                : null}
            </div>
            
            <WinnerDialog isOpen={winnerDialog} onScoreReset={handleScoreReset} onClose={handleDialogCancel} player={winningScore == players.A.Score ? players.A : players.B}/>
            
        </>
    )

}

export default Scoreboard;