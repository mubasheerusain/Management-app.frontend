import React, { useEffect, useState } from 'react';
import Main from './Main';
import { Route } from 'react-router-dom';
import Add from './Add';
import Displayfile from './Displayfile';
import Avatar from '@material-ui/core/Avatar';
import User from './User';
import Updateuser from './Updateuser';
import Adduser from './Adduser';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const createHistory = require("history").createBrowserHistory;

function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null);

    const [name, setName] = useState();
    const [access, setAccess] = useState();
    const [avatar, setAvatar] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        fetch('/get-profile').then((resp) => resp.json().then((data) => {
            setName(data.name)
            setAccess(data.access)
            setAvatar(data.name.charAt(0))
        }))
    }, []);
    const profile = () => {
        let history = createHistory();
        history.push("/dashboard/user");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        let history = createHistory();
        history.push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    };
    return (
        <div style={{ padding: "5px", backgroundColor: "#f1f1f1" }}>
            <div style={{ width: "100%", backgroundColor: "#1D2429", height: "20%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexWrap: "wrap", padding: "1em" }}>
                    <div><p style={{ color: "red", fontSize: "4em", marginTop: "-23px", marginRight: "-45px" }}>.</p></div>
                    <div><h2 style={{ color: "#fff", padding: "25PX" }}>A P T I V</h2></div>
                    <div><p style={{ color: "red", fontSize: "4em", marginTop: "-23px", marginLeft: "-15px" }}>.</p></div>
                </div>
                <div style={{ paddingRight: "1.3em", paddingTop: "30px" }}>
                    <div dir="rtl" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ display: "flex", justifyContent: "space-between", textTransform: "none", fontStyle: "normal", fontSize: "17px", outline: "none", border: "none", backgroundColor: 'transparent' }}>
                            <div style={{ paddingLeft: "10px", marginTop: "-1em" }}>
                                <Avatar style={{ backgroundColor: "#fff", color: "#1D2429", height: '45px', width: '45px' }}>{avatar}</Avatar>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: "-2px", alignItems: "start" }}>
                                <p style={{ color: "#fff" }}>{name}</p>
                                <p style={{ color: "#fff", marginTop: "-1em" }}>Signed in as <b>{access}</b></p>
                            </div>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={profile} style={{ color: "#1D2429" }}>Profile</MenuItem>
                            <MenuItem onClick={logout} style={{ color: "#1D2429" }}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: "74vh" }}>
                <Route exact path="/dashboard" component={Main} />
                <Route path="/dashboard/add" component={Add} />
                <Route path="/dashboard/displayfile" component={Displayfile} />
                <Route path="/dashboard/user" component={User} />
                <Route path="/dashboard/updateUser" component={Updateuser} />
                <Route path="/dashboard/addUser" component={Adduser} />
            </div>
        </div >
    );
}

export default Dashboard;

