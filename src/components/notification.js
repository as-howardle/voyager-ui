import { useState } from "react";

const { Snackbar, Alert } = require("@mui/material");


const Notification = ({ type, children }) => {
  // const { type, content } = props;
  // console.log(props);

  const [open, setOpen] = useState(true);

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleOnClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleOnClose} severity={type} sx={{ width: '100%' }} variant="filled">
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Notification;