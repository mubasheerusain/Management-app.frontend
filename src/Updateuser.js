import React, { useReducer, useState } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';

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

function Updateuser() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            username: "",
            password: "",
            access: ""
        }
    );
    function back(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard/user");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        let data = { formInput };
        axios.post('/updateUser', data).then((res) => {
            if(res.data.msg === "Failed"){
                setError(true)
            }
        })
    };
    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <div>
                    <p style={{ fontSize: "1.5em", color: "#1D2429", marginTop: "3em", paddingLeft: "2em" }}>Update user Information :</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", width: "50%" }}>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "15em", height: "1em" }}
                                    onChange={handleInput}
                                />
                            </ThemeProvider>
                        </div>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "15em", height: "1em" }}
                                    onChange={handleInput}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", paddingTop: "2em", width: "50%" }}>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    type={showPassword ? "text" : "password"}
                                    style={{ width: "15em", height: "1em" }}
                                    onChange={handleInput}
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
                                    name="access"
                                    label="User Access"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "15em", height: "1em" }}
                                    onChange={handleInput}
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
                                        <MenuItem key={option.value} value={option.value} style={{ color: "#1D2429" }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ThemeProvider>
                        </div>
                    </div>
                    <div style={{ margin: "20px", paddingTop: "2em", paddingLeft: "27px", display: "flex", justifyContent: "space-between", width: "35%", textTransform: "none !important" }}>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" type="submit">
                            Update
                    </Button>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" onClick={back}>
                            Cancel
                    </Button>
                    </div>
                    {error === true
                        ?
                        <p style={{ color: "red",paddingLeft:"3em" }}>*Please Fill all the Fields</p>
                        :
                        <p></p>
                    }
                </form>
            </div>
        </div>
    );
}

export default Updateuser;
