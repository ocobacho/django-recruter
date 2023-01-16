import Grid from "@material-ui/core/Grid";
import Controls from "../../../components/customControls/Controls";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import LabelledOutline from "../../../components/utils/LabelledOutline";
import {DataGrid} from "@mui/x-data-grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import client from "../../../api/client";

let nextId = 0;
const url = '/api/v1/campaigns/r_technologies';
export default function CandidateExperience(props) {
    const {parentData, setParentData, ...others} = props;
    const [technologies, setTechnologies] = useState([]);
    const [data, setData] = useState({"years_xp": 16}, {"technology": ""});
    const [serverTech, setServerTech] = useState([]);
    const params = {};

    const getTechnologies = async () => {
        try {
            const response = await client.get(url, {params: params});
            if (response.status === 200) {
                if (response.data.hasOwnProperty("results") === true) {
                    setServerTech(response.data.results);
                } else {
                    setServerTech([]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fieldChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const onExperienceAdd = (e) => {
        setData({...data, ['id']: nextId++});
        let found = technologies.find((item) => {
            return item.technology == data.technology;
        });
        if (found == undefined) {
            setTechnologies([...technologies, data])
        }
    };

    useEffect(() => {
        setParentData({...parentData, ['technologies']: technologies})
    }, [technologies]);

    useEffect(() => {
        getTechnologies()
    }, []);

    return <div>
        <LabelledOutline label={"Technology Experience"}>
            {technologies.map((item, key) => (
                <Grid container key={key}>
                    <Grid item sm={4} justifyContent={"center"}>
                        <Controls.TextField
                            select
                            label="Technology"
                            value={item.technology}
                            onChange={(e) => {
                                                setTechnologies(
                                                    [...technologies.filter(a =>
                                                        a.id !== item.id
                                                    ), {
                                                        "id": item.id,
                                                        "technology": e.target.value,
                                                        "years_xp": item.years_xp
                                                    }]
                                                );
                                            }}
                            name={'technology'}
                            // error={errors.hasOwnProperty('sex')}
                            // helperText={getErrors('sex')}
                        >

                            {serverTech.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Controls.TextField>
                    </Grid>
                    <Grid item sm={4} justifyContent={"center"}>

                        <Controls.TextField name={"years_xp"} label={"Years of Experience"} required
                                            value={item.years_xp} onChange={(e) => {
                            setTechnologies(
                                [...technologies.filter(a =>
                                    a.id !== item.id
                                ), {"id": item.id, "years_xp": e.target.value, 'technology': item.technology}]
                            );
                        }}/>
                    </Grid>
                    <Grid item sm={4} justifyContent={"center"}>
                        <IconButton style={{"marginTop": 10}} edge="end" aria-label="delete" onClick={() => {
                            setTechnologies(
                                technologies.filter(a =>
                                    a.id !== item.id
                                )
                            );
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}


            <Grid container>

                <Grid item sm={4} justifyContent={"center"}>
                    <Controls.TextField
                        select
                        label="Technology"
                        value={data.technology}
                        onChange={fieldChange}
                        // variant="outlined"
                        name={'technology'}
                        // error={errors.hasOwnProperty('sex')}
                        // helperText={getErrors('sex')}
                    >

                        {serverTech.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Controls.TextField>

                </Grid>
                <Grid item sm={4} justifyContent={"center"}>
                    <Controls.TextField name={"years_xp"} label={"Years of Experience"} type={'number'} required
                                        value={data.years_xp} inputProps={{min: 16, max: 65}}
                                        onChange={fieldChange}/>
                </Grid>
                <Grid item sm={4} justifyContent={"center"}>
                    <Tooltip title="Add">
                        <IconButton color={"primary"} onClick={onExperienceAdd} style={{"marginTop": 10}}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </LabelledOutline>

    </div>;
}