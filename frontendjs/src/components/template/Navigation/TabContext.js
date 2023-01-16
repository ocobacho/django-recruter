import Context from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CloseIcon from "@material-ui/icons/Close";
import TabPanel from "@material-ui/lab/TabPanel";
import Home from "../Home";
import React from "react";
import TabContents from "./TabContents";
import IconButton from "@material-ui/core/IconButton";

const TabContext = (props) => {
    const {currentTab, setCurrentTab, openTabs, tabChange, onCloseTab, menuItems} = props;
    // const menuItems = [];

    return (<div>
            <Context value={currentTab}>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Home" value="Welcome" onClick={() => {
                        setCurrentTab("Welcome")
                    }}/>
                    {openTabs.map((item, index) => (<Tab label={
                        <span>

                            <span style={{padding: 10}} onClick={(e) => {
                                tabChange(e, item.name)
                            }}>{item.title}</span>
                                <span onClick={() => {
                                    onCloseTab(item)
                                }}>
                                    {"   "}
                                    <IconButton >
                                    <CloseIcon style={{fontSize: 15, color: 'red'}}/>
                                </IconButton>
                                </span>
                        </span>
                    } value={item.name} key={index}/>))}
                </Tabs>
                <TabContents menuItems={menuItems}/>
                <TabPanel value="Welcome">
                    <Home/>
                </TabPanel>
            </Context>
        </div>
    )
};

export default TabContext