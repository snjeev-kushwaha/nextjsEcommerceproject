import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const AllProducts = ({ products }) => {

  return (
    <BaseCard title="Product Perfomance">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.slug}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <img alt="ecommerce" width={20} height={20} src={product.img} />
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.size}/{product.color}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ₹{product.price}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
