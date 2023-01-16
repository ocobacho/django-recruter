import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    managementButtons: {
        margin: theme.spacing(2),
        display: "flex"
    }
}));

const FormButton = (props) => {
    const {children, color, ...others} = props;
    const classes = useStyles();
    return <Button
        color={color||"primary"}
        className={classes.managementButtons}
        size={"small"}
        variant={"contained"}>
        {children}
    </Button>
};

export default FormButton

