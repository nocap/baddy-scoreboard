import './Counter.css'


function Counter({ player, isWinner, onIncreaseScore, onDecreaseScore, onIncreaseWin, onDecreaseWin, controlAlign = 'left' }) {
        
    return (            
        <div className="counter">
            {controlAlign == 'left' ?
                <div className="panel-control left">
                    <button className="float-t" onClick={onIncreaseScore}>&#9650;</button>
                    <button className="float-b" onClick={onDecreaseScore}>&#9660;</button>
                </div>
             : null}
            {controlAlign == 'right' ? 
                <div className='panel-wins'>                    
                    <div className="counter-wins">
                        <button onClick={onIncreaseWin}>&#9650;</button>
                        <div>{player.Win}</div>
                        <button onClick={onDecreaseWin}>&#9660;</button>
                    </div>                     
                </div>
            : null}
            <div className="panel-score">
                <div>{player.Name}</div>                
                <div className={"panel-counter " + (isWinner ? "winner" : "")} onClick={onIncreaseScore}>
                    {("0" + player.Score).slice(-2)}
                </div>                
            </div>
            {controlAlign == 'left' ? 
                <div className='panel-wins'>                    
                    <div className="counter-wins">
                        <button onClick={onIncreaseWin}>&#9650;</button>
                        <div>{player.Win}</div>
                        <button onClick={onDecreaseWin}>&#9660;</button>
                    </div>                     
                </div> : null}
            {controlAlign == 'right' ?
                <div className="panel-control rigth">
                    <button className="float-t" onClick={onIncreaseScore}>&#9650;</button>
                    <button className="float-b" onClick={onDecreaseScore}>&#9660;</button>
                </div>
             : null}             
        </div>
        
    );    
}

export default Counter;