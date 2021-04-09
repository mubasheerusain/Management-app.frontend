import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1D2429'
        }
    }
});

const createHistory = require("history").createBrowserHistory;

const events = [
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'Other User',
        label: 'Other User',
    },
];

function User() {
    const [status, setStatus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState("");
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    function back(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    function update(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard/updateUser");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    function add(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard/addUser");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    useEffect(() => {
        fetch('/get-profile').then((resp) => resp.json().then((data) => {
            setName(data.name)
            setUsername(data.username)
            setPassword(data.password)
            setAccess(data.access)
            if (data.access === "Admin") {
                setStatus(true)
            }
        }))
    }, []);
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3em", marginRight: "3em", width: "200%" }}>
                    <div>
                        <p style={{ fontSize: "1.5em", color: "#1D2429", marginTop: "2px", paddingLeft: "2em" }}>User Information :</p>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", width: "50%" }}>
                    <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                label="Name"
                                variant="outlined"
                                size="small"
                                style={{ width: "15em", height: "1em" }}
                                value={name}
                            />
                        </ThemeProvider>
                    </div>
                    <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                label="Username"
                                variant="outlined"
                                size="small"
                                style={{ width: "15em", height: "1em" }}
                                value={username}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", paddingTop: "2em", width: "50%" }}>
                    <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                label="Password"
                                variant="outlined"
                                size="small"
                                type={showPassword ? "text" : "password"}
                                style={{ width: "15em", height: "1em" }}
                                value={password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </ThemeProvider>
                    </div>
                    <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                select
                                disabled
                                label="User Access"
                                variant="outlined"
                                size="small"
                                value={access}
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
                            >
                                {events.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </ThemeProvider>
                    </div>
                </div>
                <div style={{ margin: "20px", paddingTop: "2em", paddingLeft: "27px", display: "flex", justifyContent: "space-between", width: "35%", textTransform: "none !important" }}>
                    <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" onClick={back}>
                        Ok
                    </Button>
                    {status === true
                        ?
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" onClick={update}>
                            Update
                    </Button>
                        :
                        <div></div>
                    }
                </div>
            </div>
            {status === true
                ?
                <div style={{ marginTop: "3em", marginRight: "3em" }}>
                    <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", borderRadius: "3em", maxWidth: "3em", maxHeight: "2.85em", minWidth: "3em", minHeight: "2.85em" }} variant="contained" onClick={add}>
                        <AddIcon></AddIcon>
                    </Button>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default User;
