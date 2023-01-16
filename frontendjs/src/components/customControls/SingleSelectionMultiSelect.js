import AutoComplete from "./AutoComplete";

const SingleSelectionMultiSelect = (props) => {
    const {onChange, value, name, ...others} = props;

    return <AutoComplete
        name={name}
        onChange={(e, value) => {
            console.log(value);
            if(e.target.value === undefined || e.target.value === null){
                e.target.value = [];
            } else {
                e.target.value = [e.target.value];
            }
            onChange(e);
        }}
        value={value[0] || ""}
        {...others}
    />
};

export default SingleSelectionMultiSelect;