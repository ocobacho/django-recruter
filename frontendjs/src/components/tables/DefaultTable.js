import * as React from 'react';
import {DataGrid, esES, GridToolbar} from '@mui/x-data-grid';
import {makeStyles} from "@material-ui/core";
import client from "../../api/client";
import {useState} from "react";
import {useEffect} from "react";
import Skeleton from "@material-ui/lab/Skeleton";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    tableContainer: {
        boxShadow: "none"
    }
}));

export default function DefaultTable({columns, url, title, setSelected, refresh}) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [waiting, setWaiting] = useState(true);
    // const [limit, setLimit] = useState(25);
    // const [ordering, setOrdering] = useState("");
    const [params, setParams] = useState({limit: 25, ordering: "", offset: 0});

    // const [loading, setLoading] = useState(false);
    const onPageChange = (page, e) => {
        setLoading(true);
        setParams({...params, offset: page * params.limit})
    };

    const onPageSizeChange = async (pageSize) => {
        // setLimit(pageSize);
        setParams({...params, limit: pageSize})
    };

    const getRows = async (page = 0) => {
        setLoading(true);
        // let data = {
        //     limit: limit,
        //     offset: page * limit,
        //     ordering: ordering
        // };
        try {
            const response = await client.get(url, {params: params});
            console.log("response", response)
            if (response.status === 200) {
                if(response.data.hasOwnProperty("results")===true){
                    setRowCount(response.data.count);
                    setRows(response.data.results);
                }else {
                    setRowCount(0);
                    setRows([]);
                }
                setLoading(false);
                setWaiting(false);

            }
        } catch (error) {
            setRows([]);
            setRowCount(0);
            console.log(error);
        }
        // setLoading(false)
    };

    useEffect(() => {
        getRows()
    }, [params,url, refresh]);

    const onSorting = (model) => {
        let temp = "";
        model.map((field, i) => {
            if (field.sort == "asc") {
                temp += field.field + ","
            } else {
                temp += "-" + field.field + ","
            }
        });
        setParams({...params, ordering: temp});
    };
    const onFilter = (model) => {
        model.items.map((field, i) => {
            let filter = {};
            filter["limit"] = params.limit;
            filter["ordering"] = params.ordering;
            filter["offset"] = params.offset;
            if (field.value) {
                const formated = getFormatedFilter(field);
                filter[field.columnField + "__" + formated.operator] = formated.value;
            }
            setParams(filter);
        });
    };

    const getFormatedFilter = (field) => {
        const operator = field.operatorValue.toLowerCase();
        const value = field.value;
        let formated = {operator: operator, value: value};
        switch (operator) {
            case "equals":
                console.log("equals");
                formated["operator"] = "exact";
                break;
            case "isempty":
                formated["operator"] = "exact";
                formated["value"] = "None";
                break;
            case "isnotempty":
                formated["operator"] = "exact!";
                formated["value"] = "None";
                break;
        }
        return formated
    };

    return (
        <div style={{height: 600, width: '100%'}}>
            {waiting ? <div style={{padding: 5}}>{[...Array(10)].map((x, i) =>
                <Skeleton key={i} style={{padding:5}}/>
            )}</div> : <DataGrid
                rows={rows}
                columns={columns}
                // disableColumnFilter={true}
                pageSize={params.limit}
                rowCount={rowCount}
                density={"compact"}
                rowsPerPageOptions={[25, 50, 100]}
                filterMode={'server'}
                // filterModel={filterModel}
                onFilterModelChange={onFilter}
                localeText={esES.props.MuiDataGrid.localeText}
                // checkboxSelection
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                paginationMode={'server'}
                loading={loading}
                // sortModel={sortModel}
                onSortModelChange={onSorting}
                onSelectionModelChange={(newSelectionModel) => {
                    // setSelectionModel(newSelectionModel);
                    console.log(newSelectionModel)
                    setSelected(newSelectionModel);
                }}
                // selectionModel={selectionModel}
                // autoHeight
                TabIndicatorProps={{
                    style: {
                        display: "none",
                    },
                }}
                // components={{
                //     Toolbar: GridToolbar,
                // }}
                sortingMode={"server"}
                className={classes.tableContainer}
                // disableSelectionOnClick
            />}

        </div>
    );
}
