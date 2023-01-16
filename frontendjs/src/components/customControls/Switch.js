import React from "react";
import SwitchMU from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Switch = (props) => {

    const {label, name, value, onChange, ...others} = props;
    const convertOnChange = (name, value) => ({target: {name, value}});


    return <FormControlLabel
        control={<SwitchMU onChange={e => onChange(convertOnChange(name, e.target.checked))} checked={value}/>}
        label={label}
        name={name}
        labelPlacement={'start'}
        {...others}
    />

};

export default Switch;