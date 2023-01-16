import React from 'react';
import clsx from 'clsx';
// import {makeStyles, useTheme} from '@material-ui/core/styles';
import {createTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import TabContext from "./Navigation/TabContext";
import navigationComponents from "./Navigation/NavigationComponents";
import client from "../../api/client";
import SideMenu from "./Navigation/SideMenu";
import {drawerWidth} from "./Values";


const theme = createTheme({
    palette: {
        primary: {main: "#2196f3"},
        secondary: {main: "#d81b60"},
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerSubheader: {
        display: "flex",
        // backgroundColor: "#2196f3",
        // color:"#fff"
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
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
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    tab: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
}));


export default function Main() {
    const classes = useStyles();
    // const theme = useTheme();

    const current_user_url = "/api/v1/security/current_user";
    const [open, setOpen] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState("Welcome");
    const [openTabs, setOpenTabs] = React.useState([]);
    const [token, setToken] = React.useState(() => {
        return localStorage.getItem("token")
    });
    const [user, setUser] = React.useState({});
    const [openUserMenu, setOpenUserMenu] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [personalOpen, setPersonalOpen] = React.useState(false);

    const [menuItems, setMenuItems] = React.useState([{"title": "Campaigns", "name": "campaigns", "description": "", "parent": null, "pos": 2, "active": true}]);




    // React.useEffect(() => {
    //         setOpenTabs([]);
    //         setCurrentTab("Welcome")
    //
    // }, [token]);
    //
    //
    // const onLogout = () => {
    //     setToken(null)
    // };

    const onUserMenuClick = () => {
        setOpenUserMenu(!openUserMenu)
    };

    const getUserInfo = async () => {
        try {
            const response = await client.get(current_user_url);
            setUser(response.data);
        } catch (e) {
            localStorage.removeItem('token');
        }
    };

    // React.useEffect(() => {
    //
    // }, [token]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const tabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const onCloseTab = (item) => {
        const pos = openTabs.indexOf(item);
        const deleted = openTabs.filter(((item2, index) => {
            return item2 !== item
        }));
        setOpenTabs(deleted);
        if (item !== undefined && currentTab === item.name) {
            if (deleted.length > 1 && pos > 0) {
                setCurrentTab(deleted[pos - 1].name);
            } else {
                if (deleted.length == 0) {
                    setCurrentTab("Welcome");
                } else {
                    setCurrentTab(deleted[0].name)
                }
            }

        }
    };



    const getTabsContent = () => {
        return <TabContext menuItems={menuItems} currentTab={currentTab} setCurrentTab={setCurrentTab}
                           openTabs={openTabs}
                           tabChange={tabChange} onCloseTab={onCloseTab}
        />
    };

    const onMenuItemClick = (item) => {
        console.log(item);
        if (item !== undefined && navigationComponents[item.name] !== undefined) {
            const pos = openTabs.indexOf(item);
            if (pos === -1) {
                setOpenTabs([...openTabs, item]);
            } else {

            }
            setCurrentTab(item.name);
        }
    };

    const onPersonalInfo = (e) => {
        setPersonalOpen(!personalOpen);
    };

    const getMainMenu = () => {
        return (<div>
            <SideMenu
                open={open}
                setOpen={setOpen}
                onMenuItemClick={onMenuItemClick}
                menuItems={menuItems}
            >
            </SideMenu>
        </div>)
    };


    return (
        <>
            <ThemeProvider theme={theme}>
            {true ?
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                        // color="secondary"
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Recruter
                            </Typography>
                            <div className={classes.grow}/>

                        </Toolbar>
                    </AppBar>
                    {getMainMenu()}
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        {/*{getMainContent()}*/}
                        <div className={classes.tab}>
                            {getTabsContent()}
                        </div>
                    </main>
                </div>
                : <div></div>}
            </ThemeProvider>
        </>
    );
}
