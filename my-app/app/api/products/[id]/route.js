import ProductsRepo from "@/app/repo/products-repo";

const productsRepo = new ProductsRepo();

import express from "express";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

export async function GET(request, { params }) {
    const productId = params.id;
    let product = await productsRepo.getProduct(productId);

    const { searchParams } = new URL(request.url);
    const requestedStat = searchParams.get("stat");

    if (requestedStat === "quantity") {
        const quantitySold = await productsRepo.getProductQuantitySold(productId);
        product = quantitySold;
    } else if (requestedStat === "customers") {
        const customersList = await productsRepo.getProductCustomersList(productId);
        product = customersList;
    }

    return new Response(JSON.stringify(product), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

export async function POST(request, { params }) {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const updatedItem = await productsRepo.updateProduct(id, updatedData);

    return new Response(JSON.stringify(updatedItem), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow requests from all origins
            "Access-Control-Allow-Methods": "PUT", // Allow PUT method
            "Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
        },
        status: 200,
    });
}
