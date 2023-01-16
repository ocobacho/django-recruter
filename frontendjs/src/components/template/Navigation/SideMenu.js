import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItemSide from "../../navigation/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../Values";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    drawerSubheader: {
        display: "flex",
        // backgroundColor: "#2196f3",
        // color:"#fff"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    grow: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
}));


const SideMenu = (props) => {
    const {open, setOpen, onMenuItemClick, menuItems,...others} = props;
    const classes = useStyles();


    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(()=>{
        // getMenuItems();
    },[]);

    return  <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        color={"primary"}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <List subheader={
                <ListSubheader className={classes.drawerSubheader} color={"default"} style={{backgroundColor:"#eee"}}>
                    <div style={{marginTop: 15}}>
                        {/*<img src={logo} width={150} alt=""/>*/}
                    </div>
                    <div className={classes.grow}></div>
                    <div>
                    <IconButton onClick={handleDrawerClose} color={"inherit"} size="large">
                        {open ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                    </div>
                </ListSubheader>}>
                <Divider></Divider>
            {menuItems.filter(item => item.parent === null).map((item, index) => (
                <MenuItemSide item={item} menuItems={menuItems} onClick={onMenuItemClick}/>
            ))}
        </List>
    </Drawer>
};

export default SideMenu;
