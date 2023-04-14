import React, { useState } from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { ToastContainer, toast } from 'react-toastify';

import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import axios from 'axios'

const Add = () => {
    const [form, setForm] = useState({
        title: '',
        type: '',
        size: '',
        color: '',
        slug: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const configs = {
            'Content-Type': 'application/json'
        }
        const api = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, form, configs)
        if (api.status == 200) {
            toast.success("You are successfully add product!")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
         display: none;
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="All a Products">
                            <Stack spacing={3}>
                                <TextField value={form.title} onChange={handleChange}
                                    id="tite"
                                    name='title'
                                    label="Title"
                                    variant="outlined"
                                />
                                <TextField name='type' value={form.type} onChange={handleChange} id="type" label="Type" variant="outlined" />
                                <TextField name='size' value={form.size} onChange={handleChange} id="size" label="Size" variant="outlined" />
                                <TextField name='color' value={form.color} onChange={handleChange} id="color" label="Color" variant="outlined" />
                                <TextField name='slug' value={form.slug} onChange={handleChange} id="slug" label="Slug" variant="outlined" />
                                <TextField name='description' value={form.description} onChange={handleChange}
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />
                            </Stack>
                            <br />
                            <Button variant="outlined" mt={2} onClick={submitForm}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Add