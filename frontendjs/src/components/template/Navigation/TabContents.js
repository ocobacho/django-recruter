import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import navigationComponents from "./NavigationComponents";


const TabContents = (props) => {
    const {menuItems} = props;


    return <div>
        {menuItems.map((item, index) => {
            return <TabPanel key={index} value={item.name}>{navigationComponents[item.name]}</TabPanel>
        })}
    </div>
};

export default TabContents;

