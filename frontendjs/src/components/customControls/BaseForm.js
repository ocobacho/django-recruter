import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import client from "../../api/client";
import {makeStyles} from "@material-ui/core/styles";
import AlertPop from "../notification/AlertPop";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            display: "flex",
            // width: '80%'
        },
        padding: theme.spacing(2)
    },
    actions: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const BaseForm = (props) => {
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severety, setSeverety] = useState("info");
    const {data, setData, initialData, children, selected, url, setErrors, getErrors, setError, extraActions, onAccept, onCancel, goBack, ...others} = props;
    const btnSize = "normal";
    const classes = useStyles();

    const onCancelDefault = (e) => {
        setData(initialData);
    };

    const submitdata = async () => {
        try {
            let response;
            setErrors({});
            setError(false);
            if (selected) {
                response = await client.patch(url + "/" + data.id, data);
            } else {
                response = await client.post(url, data);
            }

            if (response.status === 200 || response.status === 201) {
                setSeverety('success');
                setMessage("Se guardo con exito!");
                goBack();
            }
        } catch (e) {
            console.log(e);
            setSeverety('error');
            setMessage("Ha ocurrido un error");

            if (e.response.status === 400) {
                setErrors(e.response.data);
                setError(true);
            }
        }
    };

    const onAcceptDefault = (e) => {
        e.preventDefault();
        submitdata();
    };


    return <div>
        <form className={classes.root} autoComplete="off" onSubmit={onAccept || onAcceptDefault} noValidate>
            <Grid container justifyContent="center" alignItems="center">
                {children}
                <Grid item sm={12}>
                    {getErrors('non_field_errors')}
                </Grid>
                <Grid item sm={12}>
                    <div className={classes.actions} align={"right"}>
                        <Button color="primary" size={btnSize} type={"submit"} variant="contained">
                            {" "}Submit</Button>
                        <Button color="default" size={btnSize} onClick={onCancelDefault || onCancel}>
                            Cancel</Button>
                        <Button color="default" size={btnSize} onClick={goBack}>
                            Back</Button>
                        {extraActions}
                    </div>
                </Grid>
            </Grid>
        </form>
        <AlertPop setMessage={setMessage} message={message} severety={severety}/>
    </div>;
};

export default BaseForm;