import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import client from "../../../api/client";
import Grid from "@material-ui/core/Grid";
import Controls from "../../../components/customControls/Controls";
import BaseForm from "../../../components/customControls/BaseForm";
import LabelledOutline from "../../../components/utils/LabelledOutline";
import CandidateExperience from "./CandidateExpierience";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import config from "../../../components/customControls/ShareConfigs";
import AutocompleteMU from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


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
    },
    error: {
        color: "red"
    },
    grow: {
        flexGrow: 1,

    },
    auto: {
        marginRight: theme.spacing(4),
        flexGrow: 1
    }
}));

const initialData = {
    'first_name': '',
    'last_name': '',
    'personal_id': '',
    'current_address': '',
    'edad': 16,
    'sex': 'f',
    'technologies': [
        // {'technology': tech1.id, 'years_xp': 12,},
        // {'technology': tech2.id, 'years_xp': 10,},
    ]
};

const sexes = [{"id": "m", "name": "M"}, {"id": "f", "name": "F"}];

export default function ApplyForm({goBack, selected, url, setSelected}) {

    const classes = useStyles();
    const [data, setData] = useState(initialData);
    const [campaign, setCampaign] = useState({});
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severety, setSeverety] = useState("info");
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});



    const fieldChange = (e) => {
        console.log(e.target)
        setData({...data, [e.target.name]: e.target.value});
    };

    const getErrors = (field) => {
        if (!errors.hasOwnProperty(field)) {
            return <></>
        }
        return (<div>
            {errors[field].map((error, index) => <p className={classes.error} key={index}>{error}</p>)}
        </div>)
    };


    const getSelectedData = async () => {
        try {
            const response = await client.get(url + "/" + (selected[0]));
            setCampaign(response.data);
        } catch (e) {

        }
    };


    useEffect(() => {
        if (selected) {
            console.log(selected);
            getSelectedData();
        }
    }, []);

    const submitdata = async () => {
        try {
            let response;
            setErrors({});
            setError(false);
            if (selected) {
                response = await client.post(url + "/" + selected[0] + "/apply", data);
            }
            if (response.status === 200 || response.status === 201) {
                setMessageOpen(true);
                setMessage("Data Submited Successfully!");
                setSeverety('success');
                goBack();
            }
        } catch (e) {
            setMessageOpen(true);
            setMessage("An error has ocurred");
            setSeverety('error');
            if (e.response.status === 400) {
                setErrors(e.response.data);
                setError(true);
            }
        }
    };

    const onAccept = (e) => {
        e.preventDefault();
        submitdata();
    };

    const onCancel = (e) => {
        setData(initialData);
    };

    return (<div>
            <BaseForm url={url} data={data} setData={setData} getErrors={getErrors} onAccept={onAccept}
                      initialData={initialData}
                      selected={selected}
                      setError={setError} setErrors={setErrors} setMessageOpen={setMessageOpen}
                      setMessage={setMessage} setSeverety={setSeverety} goBack={goBack}>

                <Grid container justifyContent="center" alignItems="center">

                    <Grid item sm={12} justifyContent={"center"}>
                        <LabelledOutline label={"Campaign"}>
                            <Typography
                                component="h1"
                                variant="nowrap"
                                className={classes.inline}
                                color="textPrimary"
                                style={{"marginBottom": 10}}
                            >
                                {campaign.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {campaign.description}
                            </Typography>
                        </LabelledOutline>
                    </Grid>
                    <Grid item sm={12} justifyContent={"center"}>
                        <LabelledOutline label={"Personal Information"}>
                            <Grid container justifyContent="center" alignItems="center">

                                <Grid item sm={6} justifyContent={"center"}>
                                    <Controls.TextField name={"first_name"} label={"First name"} required
                                                        value={data.first_name}
                                                        onChange={fieldChange}
                                                        error={errors.hasOwnProperty('first_name')}
                                                        helperText={getErrors('first_name')}/>
                                </Grid>
                                <Grid item sm={6} justifyContent={"center"}>
                                    <Controls.TextField name={"last_name"} label={"Last name"} required
                                                        value={data.last_name}
                                                        error={errors.hasOwnProperty('last_name')}
                                                        helperText={getErrors('last_name')}
                                                        onChange={fieldChange}/>
                                </Grid>
                                <Grid item sm={6} justifyContent={"center"}>
                                    <Controls.TextField name={"personal_id"} label={"ID"} required
                                                        value={data.personal_id}
                                                        onChange={fieldChange}
                                                        error={errors.hasOwnProperty('personal_id')}
                                                        helperText={getErrors('personal_id')}/>
                                </Grid>
                                <Grid item sm={6} justifyContent={"center"}>
                                    <Controls.TextField name={"current_address"} label={"Current address"} required
                                                        value={data.current_address}
                                                        onChange={fieldChange}
                                                        error={errors.hasOwnProperty('current_address')}
                                                        helperText={getErrors('current_address')}
                                    />
                                </Grid>
                                <Grid item sm={6} justifyContent={"center"}>
                                    <Controls.TextField name={"edad"} label={"Age"} type={'number'} required
                                                        value={data.edad}
                                                        onChange={fieldChange}
                                                        error={errors.hasOwnProperty('edad')}
                                                        inputProps={{min: 16, max: 65}}
                                                        helperText={getErrors('edad')}/>
                                </Grid>
                                <Grid item sm={6} justifyContent={"center"}>
                                   <Controls.TextField
                                      select
                                      label="Sex"
                                      value={data.sex}
                                      onChange={fieldChange}
                                      variant="outlined"
                                      name={'sex'}
                                      error={errors.hasOwnProperty('sex')}
                                      helperText={getErrors('sex')}
                                   >

                                      {sexes.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                          {option.name}
                                        </MenuItem>
                                      ))}
                                    </Controls.TextField>
                                </Grid>

                            </Grid>
                        </LabelledOutline>
                    </Grid>
                    <Grid item sm={12} justifyContent={"center"}>
                        <CandidateExperience setParentData={setData} parentData={data}/>
                        {getErrors('technologies')}
                    </Grid>
                </Grid>

            </BaseForm>
        </div>
    )
        ;
};