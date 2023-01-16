import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import {KeyboardDateTimePicker as DateTimePickerMU, MuiPickersUtilsProvider} from "@material-ui/pickers";
import config from "./ShareConfigs";

const DateTimePicker = (props) => {
    const {label, name, value, size, onChange, ...others} = props;
    const convertOnChange = (name, value) => ({target: {name, value}});
    return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <DateTimePickerMU
            clearable
            InputLabelProps={{shrink: true}}
            size={'small' || size}
            label={label}
            name={name}
            value={value}
            inputVariant={config.variant}
            onChange={date => onChange(convertOnChange(name, date))}
            {...others}
        />
    </MuiPickersUtilsProvider>
};

export default DateTimePicker;