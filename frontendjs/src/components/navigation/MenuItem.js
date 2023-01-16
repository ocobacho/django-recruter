import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(6),
    },
}));


const MenuItem = (props) => {
    const {item, menuItems, onClick, ...others} = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const onExpand = (e) => {
       setOpen(!open);
    };



    return <>
        <ListItem button key={item.name} onClick={(e) => onClick(item)} >
            <ListItemIcon><LabelImportantIcon></LabelImportantIcon></ListItemIcon>
            <ListItemText primary={item.title} />
            {menuItems.filter(child => child.parent === item.id).length > 0 ?
                // <ExpandLess/> : <ExpandMore/>
                <div>
                    {open?<ExpandLess onClick={onExpand}/> : <ExpandMore onClick={onExpand}/>}
                </div> : <div></div>
            }
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {menuItems.filter(child => child.parent === item.id).map(
                    (itemChild, indexChild) =>
                        <ListItem button className={classes.nested} onClick={(e) => onClick(itemChild)}>
                            {/*<ListItemIcon><LabelImportantIcon></LabelImportantIcon></ListItemIcon>*/}
                            <ListItemText primary={itemChild.title}/>
                        </ListItem>)}
            </List>
        </Collapse>
    </>
};

export default MenuItem;