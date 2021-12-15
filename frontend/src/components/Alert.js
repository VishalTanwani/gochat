import React, { useContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { StateContext } from "../context/StateProvider"

function Alert() {
    const { alertStatus, alertMessage, closeAlert, alertSeverity } = useContext(StateContext)

    const handleClose = () => {
        closeAlert(false,"")
    }
    let vertical = "top"
    let horizontal = "right"
    return (
        <Snackbar open={alertStatus} anchorOrigin={{ vertical, horizontal }} autoHideDuration={5000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={alertSeverity} style={{ width: "100%" }}>
                { alertMessage }
            </MuiAlert>
        </Snackbar>
    );
}

export default Alert;
