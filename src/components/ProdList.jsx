import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, TextField, Rating } from "@mui/material";
import { ProdItem } from "./ProdItem";
import { Category } from "./Category";

export const ProdList = () => {

    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([])
    const [txt, setTxt] = useState("")
    const [rate, setRate] = useState("")

    const getApi = async () => {
        const result = await axios.get("http://localhost:2121/");
        setData(result.data);
        setDataCopy(result.data);
    };

    useEffect(() => {
        getApi()
    }, [])

    const handleClick = (item) => {
        const filt = dataCopy.filter((elem) => elem.category === item);
        setData(filt);
    }

    useEffect(() => {
        const search = dataCopy.filter((item) => item.name.toUpperCase().includes(txt.toUpperCase()));
        setData(search);
    }, [txt])

    useEffect(() => {

        const filt = dataCopy.filter((elem) => elem.rating === Number(rate));
        setData(filt);
    }, [rate])


    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <TextField variant="outlined" fullWidth label="Search Product..." sx={{ marginTop: 2 }} onChange={(e) => setTxt(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <Rating onChange={(e) => setRate(e.target.value)} />
            </Grid>
            <Category handleClick={handleClick} />
            {
                data.map((item) =>
                    <ProdItem item={item} />
                )
            }
        </Grid>
    )
}