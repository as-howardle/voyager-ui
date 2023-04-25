import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogNotification(props) {
  const { title, content, open, handleClose, handleAccept } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: "red",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{
          width: 400
        }}>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Disagree</Button>
          <Button onClick={handleAccept} autoFocus color='success'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
