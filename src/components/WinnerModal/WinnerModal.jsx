import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function WinnerModal({ isOpen, onScoreReset, onClose, player }) {
    return (
        <Dialog open={isOpen}>
        <DialogTitle>Win</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {player.Name} wins! 
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onScoreReset}>Reset Scores</Button>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
    );
}

export default WinnerModal;