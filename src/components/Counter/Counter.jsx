import './Counter.css'


function Counter({ player, isWinner, onIncrease, onDecrease, controlAlign = 'left' }) {
        
    return (            
        <div className="counter">
            {controlAlign == 'left' ?
                <div className="panel-control left">
                    <button className="float-t" onClick={onIncrease}>+</button>
                    <button className="float-b" onClick={onDecrease}>-</button>
                </div>
             : null}
            <div className="panel-score">
                <div>{player.Name}</div>                
                <div className={"panel-counter " + (isWinner ? "winner" : "")} onClick={onIncrease}>
                    {("0" + player.Score).slice(-2)}
                </div>
                <div>{player.Wins}</div>                              
            </div>
            {controlAlign == 'right' ?
                <div className="panel-control rigth">
                    <button className="float-t" onClick={onIncrease}>+</button>
                    <button className="float-b" onClick={onDecrease}>-</button>
                </div>
             : null}
        </div>
        
    );
}

export default Counter;