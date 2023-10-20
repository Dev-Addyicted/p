import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Category = ({ handleClick }) => {

    const [cat, setCat] = useState([]);
    const getApi = async () => {
        const result = await axios.get("http://localhost:2121/cat");
        setCat(result.data);
    };

    useEffect(() => {
        getApi();
    }, [])

    return (
        <Grid container spacing={3}>
            {
                cat.map((item) =>
                    <Grid item xs={3}>

                        <Button variant="contained" fullWidth sx={{ marginTop: 4 }} onClick={() => { handleClick(item) }} >{item}</Button>
                    </Grid>
                )
            }
        </Grid>

    )
}