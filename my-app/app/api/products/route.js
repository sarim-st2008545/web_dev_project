import ProductsRepo from "@/app/repo/products-repo";

import express from "express";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const productsRepo = new ProductsRepo();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let products = await productsRepo.getProducts(type);

    // Add CORS headers to the response
    return new Response(JSON.stringify(products), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

export async function POST(request) {
    const product = await request.json();
    const newProduct = await productsRepo.addProduct(product);

    // Add CORS headers to the response
    return new Response(JSON.stringify(newProduct), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 201,
    });
}
