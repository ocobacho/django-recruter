import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
}));

const Page = (props) => {
    const {title, renderTools, renderCurrentContent, ...others} = props;
    const classes = useStyles();

    return <Paper variant={"outline"} square>
        <AppBar position="static" color={"default"}>
            <Toolbar variant="dense">
                <ListAltIcon/>
                {" "}
                <Typography variant="h6" color="inherit">
                    {title}
                </Typography>

                <div className={classes.grow}></div>
                {renderTools()}
            </Toolbar>
        </AppBar>
        <Paper variant="outlined" square>
            {renderCurrentContent()}
        </Paper>
        {others.children}
    </Paper>
};

export default Page;