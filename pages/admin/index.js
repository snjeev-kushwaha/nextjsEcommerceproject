import { Grid } from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/AllProducts";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import Product from '../../models/Product';
import mongoose from 'mongoose';

export default function Index({ products }) {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
         display: none;
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerfomance products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let products = await Product.find()
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}