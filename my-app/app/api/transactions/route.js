import ProductsRepo from "@/app/repo/products-repo";

import express from "express";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const productsRepo = new ProductsRepo();

export async function POST(request) {
    const transaction = await request.json();
    const newProduct = await productsRepo.addTransaction(transaction);

    // Add CORS headers to the response
    return new Response(JSON.stringify(newProduct), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 201,
    });
}
