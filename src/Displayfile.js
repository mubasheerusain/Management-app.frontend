import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1D2429'
        }
    }
});

const createHistory = require("history").createBrowserHistory;

function Displayfile() {
    const location = useLocation();
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [product, setProduct] = useState({});
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    function newUrl() {
        const url = "http://localhost:5001/displayfile/" + product["csd"];
        window.open(url, '_blank');
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function handleClick(e) {
        e.preventDefault();
        let history = createHistory();
        history.push("/dashboard");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }
    useEffect(() => {
        setProduct(location.state.data);
        console.log(location.state.data["label"])
    }, [location]);
    return (
        <div style={{ paddingLeft: "2.5em", paddingRight: "1.5em", paddingTop: "1em", height: "100%" }}>
            <div>
                <div style={{ marginBottom: "2em" }}>
                    <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", borderRadius: "3em", maxWidth: "3.1em", maxHeight: "2.9em", minWidth: "3.1em", minHeight: "2.9em" }} variant="contained" onClick={handleClick}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                    </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                name="product_line"
                                label="Product Line"
                                variant="outlined"
                                value={product["product_line"]}
                                size="small"
                                style={{ width: "15em", height: "1em" }}
                            />
                        </ThemeProvider>
                    </div>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                name="product_name"
                                label="Product Name"
                                value={product["product_name"]}
                                variant="outlined"
                                size="small"
                                style={{ width: "15em", height: "1em" }}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "2em", width: "50%" }}>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField
                                disabled
                                name="part_no"
                                label="Part No"
                                value={product["part_no"]}
                                variant="outlined"
                                size="small"
                                style={{ width: "15em", height: "1em" }}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <p style={{color:"#1D2429"}}>Label:</p>
                    <img src={"/displayimage/" + product["label"]} alt="test" width="500" height="500" />
                </div>
            </div>
            <div style={{ paddingTop: "1.5em" }}>
                <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", marginBottom: "15px", textTransform: "none" }} variant="contained" onClick={newUrl} >
                    CSD
                            </Button>
            </div>
        </div>
    );
}

export default Displayfile;