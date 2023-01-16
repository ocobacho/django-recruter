import React, {useEffect, useState} from "react";
import AutocompleteMU from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import config from "./ShareConfigs";
import client from "../../api/client";

const useStyles = makeStyles((theme) => ({
    auto: {
        marginRight: theme.spacing(4),
        flexGrow: 1
    }
}));


const AutoComplete = (props) => {
    const {label, optionLabel,placeholder, className, value, name, url, onChange, ...others} = props;
    const [options, setOptions] = useState([]);
    const classes = useStyles();
    const getOptions = async () => {
        try {
            const response = await client.get(url);
            if (response.status === 200) {
                setOptions(response.data.results);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const convertOnChange = (name, value) => ({target: {name, value}});

    useEffect(() => {
        getOptions();
    }, [url]);

    return <AutocompleteMU
        size={'small'}
        autoSelect
        options={options}
        getOptionLabel={(option) => option[optionLabel]||""}
        getOptionSelected={(option, value) => {
            const y = option[optionLabel] === value[optionLabel];
            return y;
        }}
        className={className || classes.auto}
        onChange={(e, value) => {
            console.log("el padre", e, value);
            onChange( convertOnChange(name, value));
        }}
        value={value}
        renderInput={(params) => <TextField {...params}
                                            label={label}
                                            required={props.required||false}
                                            variant={config.variant}
                                            placeholder={placeholder}
                                            style={{width:props.width}}
                                            InputLabelProps={{shrink: true}}
        />}
        {...others}
    />
};


export default AutoComplete;