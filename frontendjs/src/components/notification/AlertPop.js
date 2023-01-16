import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


const AlertPop =(props) => {
    const { setMessage, message, severety} = props;

    const handleClose = () => {
        setMessage("")
    };

    return <Snackbar open={message !== ""} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severety}>
            {message}
        </Alert>
    </Snackbar>
};

export default AlertPop;