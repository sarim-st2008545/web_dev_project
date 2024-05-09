import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "minimal" });

export async function GET(request, { params }) {
    const requestedStat = params.stat;

    let data = {};

    if (requestedStat === "most-successful-sellers") {
        data = await getMostSuccessfulSellers();
    } else if (requestedStat === "most-popular-products") {
        data = await getMostPopularProducts();
    } else if (requestedStat === "sales-over-years") {
        data = await getSalesOverYears();
    } else if (requestedStat === "top-customers") {
        data = await getTopCustomers();
    } else if (requestedStat === "average-price-per-type") {
        data = await getAveragePricePerType();
    } else if (requestedStat === "low-inventory-items") {
        data = await getLowInventoryItems();
    }

    return Response.json(data, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

async function getMostSuccessfulSellers() {
    const mostSuccessfulSellers = await prisma.seller.findMany({
        orderBy: {
            bank_account_balance: "desc",
        },
        take: 5,
        include: {
            Item: true,
        },
    });

    return mostSuccessfulSellers.map((seller) => ({
        username: seller.username,
        itemsUploaded: seller.Item.length,
        moneyMade: seller.bank_account_balance,
    }));
}

async function getMostPopularProducts() {
    const mostPopularProducts = await prisma.item.findMany({
        include: {
            Purchase: true,
        },
        take: 5,
    });

    /* Prisma does not support sorting by an aggregation result directly in the query, Therefore have to use JS  */

    mostPopularProducts.sort((a, b) => {
        const quantitySoldA = a.Purchase.reduce((total, purchase) => total + purchase.quantity, 0);
        const quantitySoldB = b.Purchase.reduce((total, purchase) => total + purchase.quantity, 0);
        return quantitySoldB - quantitySoldA;
    });

    return mostPopularProducts.map((product) => ({
        name: product.name,
        image: product.image,
        quantitySold: product.Purchase.reduce((total, purchase) => total + purchase.quantity, 0),
        moneyMade: product.Purchase.reduce((total, purchase) => total + purchase.quantity * product.price, 0),
    }));
}

async function getSalesOverYears() {
    const salesData = await prisma.purchase.findMany({
        select: {
            purchaseDate: true,
            quantity: true,
        },
        orderBy: {
            purchaseDate: "asc",
        },
    });

    // Not possible to extract year in Prisma, therefore have to use JS code

    const totalQuantitiesPerYear = {};

    salesData.forEach((data) => {
        const year = new Date(data.purchaseDate).getFullYear();

        if (!totalQuantitiesPerYear[year]) {
            totalQuantitiesPerYear[year] = 0;
        }

        totalQuantitiesPerYear[year] += data.quantity;
    });

    const formattedData = Object.keys(totalQuantitiesPerYear).map((year) => ({
        year: parseInt(year),
        totalQuantity: totalQuantitiesPerYear[year],
    }));

    return formattedData;
}

async function getTopCustomers() {
    const topCustomers = await prisma.customer.findMany({
        orderBy: {
            Purchase: {
                _count: "desc",
            },
        },
        take: 5,
        include: {
            Purchase: true,
        },
    });

    return topCustomers.map((customer) => ({
        id: customer.customerId,
        name: `${customer.name} ${customer.surname}`,
        money_balance: customer.money_balance,
        purchaseCount: customer.Purchase.length,
    }));
}

async function getAveragePricePerType() {
    const itemTypeAveragePrice = await prisma.item.groupBy({
        by: ["type"],
        _avg: {
            price: true,
        },
    });

    return itemTypeAveragePrice.map(({ type, _avg: { price } }) => ({
        itemType: type,
        averagePrice: price,
    }));
}

async function getLowInventoryItems() {
    const lowInventoryItems = await prisma.item.findMany({
        where: {
            quantity: {
                lte: 50, // get items where quantity is less than 50
            },
        },
        include: {
            Seller: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: {
            quantity: "asc",
        },
    });
    return lowInventoryItems;
}
