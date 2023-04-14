import React from 'react';
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/AllProducts";
import Product from '../../models/Product';
import mongoose from 'mongoose';

const AllProducts = ({ products }) => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
         display: none;
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerfomance products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default AllProducts

export async function getServerSideProps(context) {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let products = await Product.find()
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}