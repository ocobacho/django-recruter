import Autocomplete from "./AutoComplete";

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const MultiSelectCheckbox = (props) => {

    return <Autocomplete
        multiple
        autoSelect={false}
        disableCloseOnSelect
        renderOption={(option, { selected }) => {
            return (<React.Fragment>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option[props.optionLabel]}
            </React.Fragment>)
        }}
        {...props}/>
};

export default MultiSelectCheckbox;