import DefaultTable from "../../../components/tables/DefaultTable";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PrintIcon from "@material-ui/icons/Print";
import * as React from "react";
import {makeStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {useState} from "react";
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFilter, } from '@fortawesome/free-solid-svg-icons';
import RefreshIcon from '@material-ui/icons/Refresh';
import Page from "../../../components/template/Page";
import ApplyForm from "./ApplyForm";


const columns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
    },
    {
        field: 'active_txt',
        headerName: 'Active',
        flex: 1,
    },
];

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
}));

export default function CampaignMain() {
    const url = '/api/v1/campaigns/r_campaings';
    const [title, setTitle] = useState("Campaigns");
    const classes = useStyles();
    const [current, setCurrent] = useState("Table");
    const [refresh, setRefresh] = useState(0);
    const [selected, setSelected] = useState([]);// id of item selected on table
    const pagesTitle = {
        "Table": "Campaigns",
        "Apply": "Apply for Campaign",
    };

    const onRefresh = () => {
        setRefresh(refresh+1)
    };

    const actions = {
        Apply: <Tooltip title="Apply">
            <IconButton disabled={selected.length == 0} color={"primary"} onClick={() => {
                onActionsClick("Apply")
            }}>
                <EditIcon/>
            </IconButton>
        </Tooltip>,
        Refresh: <Tooltip title="Cargar">
            <IconButton color={"primary"} onClick={onRefresh}>
                <RefreshIcon></RefreshIcon>
            </IconButton>
        </Tooltip>
    };

    const tableActions = [actions["Apply"], actions['Refresh']];
    const applyActions = [];

    const apply = () => {
        if (selected.length > 0) {
            return <ApplyForm goBack={goBack} selected={selected} setSelected={setSelected} url={url}/>
        } else {
            goBack();
        }
    };

    const goBack = () => {
        setCurrent("Table");
        setSelected([]);
    };


    const onActionsClick = (text) => {
        setCurrent(text)
    };

    useEffect(() => {
        setTitle(pagesTitle[current]);
    }, [current]);


    const renderCurrentContent = () => {
        switch (current) {
            case 'Table':
                return (<DefaultTable url={url} columns={columns} title={title} setSelected={setSelected} refresh={refresh}/>);
            case 'Apply':
                return apply();
            default: {
                return (<div><p>Por hacer ...</p></div>)
            }
        }
    };

    const renderTools = () => {
        switch (current) {
            case 'Table':
                return tableActions;
            case 'Apply':
                return applyActions;
            default: {
                return (<div><p>To do ...</p></div>)
            }
        }
    };

    return (
        <Page title={title} renderTools={renderTools} renderCurrentContent={renderCurrentContent}/>
    );
}
