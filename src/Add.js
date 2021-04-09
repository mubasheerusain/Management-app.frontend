import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1D2429'
        }
    }
});
const createHistory = require("history").createBrowserHistory;

function Add() {
    const [productline, setProductline] = useState("");
    const [productname, setProductname] = useState("");
    const [partno, setPartno] = useState("");
    const [label, setLabel] = useState(null);
    const [csd, setCsd] = useState(null);
    function handleClick(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('product_line', productline);
        formData.append('product_name', productname);
        formData.append('part_no', partno);
        formData.append('csd', csd);
        formData.append('label', label)
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        fetch(
			'/add',
			{
				method: 'POST',
				body: formData,
			}
		).then((res) => {
            console.log(res)
        })
    };
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "2.5em", marginTop: "1.5em" }}>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", borderRadius: "3em", maxWidth: "3.1em", maxHeight: "2.9em", minWidth: "3.1em", minHeight: "2.9em" }} variant="contained" onClick={handleClick}>
                            <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        </Button>
                        <p style={{ fontSize: "1.5em", marginTop: "2px", paddingLeft: "1em",color:"#1D2429" }}>Add New Product</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", width: "50%" }}>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="product_line"
                                    label="Product Line"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => setProductline(e.target.value)}
                                    style={{ width: "15em", height: "1em" }}
                                />
                            </ThemeProvider>
                        </div>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="product_name"
                                    label="Product Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => setProductname(e.target.value)}
                                    style={{ width: "15em", height: "1em" }}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", paddingTop: "2em", width: "50%" }}>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    name="part_no"
                                    label="Part No"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => setPartno(e.target.value)}
                                    style={{ width: "15em", height: "1em" }}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", paddingTop: "2em", width: "50%" }}>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <p style={{ paddingLeft: "10px",color:"#1D2429" }}>Label :</p>
                            <Button
                                name="label"
                                style={{ color: "#1D2429", outline: "none" }}
                                containerElement='label'
                                label='Label' >
                                <input type="file" style={{ outline: "none" }} onChange={(e) => setLabel(e.target.files[0])} />
                            </Button>
                        </div>
                        <div style={{ paddingRight: "1.5em", paddingLeft: "1.5em" }}>
                            <p style={{ paddingLeft: "10px",color:"black" }}>CSD :</p>
                            <Button
                                name="csd"
                                style={{ color: "#1D2429", outline: "none" }}
                                containerElement='label'
                                label='CSD' >
                                <input type="file" style={{ outline: "none" }} onChange={(e) => setCsd(e.target.files[0])} />
                            </Button>
                        </div>
                    </div>
                    <div style={{ margin: "20px", paddingTop: "2em", paddingLeft: "27px", display: "flex", justifyContent: "space-between", width: "20%", textTransform: "none !important" }}>
                        <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", textTransform: "none" }} variant="contained" type="submit">
                            Add
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;