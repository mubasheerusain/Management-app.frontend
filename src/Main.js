import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import { MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1D2429'
        }
    }
});
const createHistory = require("history").createBrowserHistory;

function Main() {
    const [add, setAdd] = useState(false);
    const [productline, setProductline] = useState([]);
    const [productname, setProductname] = useState([]);
    const [final_productline, setFinal_productline] = useState("")
    const [final_productname, setFinal_productname] = useState("")
    const [productlist, setProductlist] = useState({});
    const [status, setStatus] = useState(false);
    function handleClick(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard/add");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    function moveTo(e) {
        let data = {
            "product_line": final_productline,
            "product_name": final_productname
        }
        console.log(data)
        fetch('/productdisplay', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((resp) => resp.json().then((data) => {
            if (data.msg === "Not found") {
                setStatus(true)
            }
            else {
                let history = createHistory();
                history.push({
                    pathname: '/dashboard/displayfile',
                    state: { data: data }
                });
                let pathUrl = window.location.href;
                window.location.href = pathUrl;
            }
        }))
    }
    function changeName(e) {
        setProductname(productlist[e.target.value])
        setFinal_productline(e.target.value)
    }
    useEffect(() => {
        fetch('/get-profile').then((resp) => resp.json().then((data) => {
            console.log(data.access)
            if (data.access === "Admin") {
                setAdd(true)
            }
        }))
        fetch('/productlist').then((resp) => resp.json().then((data) => {
            setProductlist(data)
            setProductline(Object.keys(data))
            console.log(productline)
        }))
    }, []);

    return (
        <div >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", paddingTop: "2em", width: "50%" }}>
                        <ThemeProvider theme={theme}>
                            <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                                <TextField
                                    select
                                    label="Product Line"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "15em", height: "1em" }}
                                    SelectProps={{
                                        MenuProps: {
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            getContentAnchorEl: null
                                        }
                                    }}
                                    onChange={changeName}
                                >
                                    {productline.map((option) => (
                                        <MenuItem key={option} value={option} style={{ color: "#1D2429" }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                                <TextField
                                    select
                                    label="Product Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "15em", height: "1em" }}
                                    SelectProps={{
                                        MenuProps: {
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            getContentAnchorEl: null
                                        }
                                    }}
                                    onChange={(e) => setFinal_productname(e.target.value)}
                                >
                                    {productname.map((option) => (
                                        <MenuItem key={option} value={option} style={{ color: "#1D2429" }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </ThemeProvider>
                    </div>
                    <div style={{ margin: "20px", paddingTop: "2em", paddingLeft: "27px", display: "flex", justifyContent: "space-between", width: "20%", textTransform: "none !important" }}>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" onClick={moveTo}>
                            Generate
                    </Button>
                    </div>
                </div>
                {add === true
                    ?
                    <div style={{ marginTop: "3em", marginRight: "3em" }}>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", borderRadius: "3em", maxWidth: "3em", maxHeight: "2.85em", minWidth: "3em", minHeight: "2.85em" }} variant="contained" onClick={handleClick}>
                            <AddIcon></AddIcon>
                        </Button>
                    </div>
                    :
                    <div></div>
                }
            </div>
            {status === true
                ?
                <p style={{ color: "red", paddingTop: "10px",paddingLeft:"3em" }}>Please select all the fields.</p>
                :
                <p></p>
            }
        </div>
    );
}

export default Main;