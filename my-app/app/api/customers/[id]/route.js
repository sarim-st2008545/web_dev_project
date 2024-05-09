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
    const customerId = params.id;
    let response = {};

    const { searchParams } = new URL(request.url);
    const requestedStat = searchParams.get("stat");

    if (requestedStat == "purchaseHistory") {
        response = await productsRepo.getPurchaseHistory(customerId);
    } else {
        response = await productsRepo.updateCustomerMoney(customerId, parseInt(requestedStat));
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

export async function POST(request, { params }) {
    const customerId = params.id;
    let response = {};

    const { searchParams } = new URL(request.url);
    const requestedStat = searchParams.get("stat");

    if (requestedStat == "purchaseHistory") {
        response = await productsRepo.getPurchaseHistory(customerId);
    } else {
        response = await productsRepo.updateCustomerMoney(customerId, parseInt(requestedStat));
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}
