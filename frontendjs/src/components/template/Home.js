import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DefaultCard from "../cards/DefaultCard";
import Grid from "@material-ui/core/Grid";
import client from "../../api/client";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import ApplyForm from "../../modules/Campaigns/Campaign/ApplyForm";


const Home = () => {
    const classes = makeStyles();
    const [rows, setRows] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const [current, setCurrent] = useState("Home");
    const [selected, setSelected] = useState([]);// id of item selected on table

    const url = '/api/v1/campaigns/r_campaings';

    const getRows = async () => {
        try {
            const response = await client.get(url);
            if (response.status === 200) {
                if (response.data.hasOwnProperty("results") === true) {
                    setRows(response.data.results);
                } else {
                    setRows([]);
                }
                setWaiting(false);

            }
        } catch (error) {
            setRows([]);
            console.log(error);
        }
    };

    useEffect(() => {
        getRows();
    }, []);

    const goBack = () =>{
        setCurrent("Home")
    };

    const renderCurrentContent = () => {
        switch (current) {
            case 'Home':
                return (<div><Typography
                    component="h1"
                    variant="nowrap"
                    className={classes.inline}
                    color="textPrimary"
                    style={{"marginBottom": 10}}
                >
                    Welcome!
                </Typography>
                    < Divider style={{"marginBottom": 10}}/>
                    {
                        waiting ? <div style={{padding: 5}}>{[...Array(10)].map((x, i) =>
                                <Skeleton key={i} style={{padding: 5}}/>
                            )}</div> :
                            <Grid container spacing={2}>
                                {rows.map((item, key) => <Grid item key={key}>
                                    <DefaultCard campaing={item} setCurrent={setCurrent} setSelected={setSelected}/>
                                </Grid>)}
                            </Grid>
                    }
                </div>);
            case 'CampaignDetail':
                return <ApplyForm goBack={goBack} selected={selected} setSelected={setSelected} url={url}/>;
            default: {
                return (<div><p>Por hacer ...</p></div>)
            }
        }
    };

    return <div>
        {renderCurrentContent()}
    </div>
};

export default Home;