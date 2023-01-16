import React from "react";
import TextFieldUI from "@material-ui/core/TextField";
import config from "./ShareConfigs";

const TextField = (props) => {

    const {label, name, value, type, InputProps, rows, multiline, variant, onChange, ...others} = props;

    const getVariant = (variant) => {
        if(variant==="inline"){
            return false
        }
        return variant;
    };

    return <TextFieldUI InputLabelProps={{shrink: true}}
                                             size={'small'}
                                             label={label}
                                             name={name}
                                             value={value}
                                             type={type}
                                             multiline={multiline}
                                             rows={rows}
                                             InputProps={InputProps}
                                             onChange={onChange}
                                             variant={getVariant(config.variant)}
                                             style={{"width":others.width}}
                                             {...others}
    />

};

export default TextField;