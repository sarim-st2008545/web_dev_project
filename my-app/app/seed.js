import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sellersPath = path.join(process.cwd(), "app/data/seller.json");
const itemsPath = path.join(process.cwd(), "app/data/item.json");
const purchasePath = path.join(process.cwd(), "app/data/purchase.json");
const customersPath = path.join(process.cwd(), "app/data/customer.json");

async function main() {
    try {
        const sellers = await fs.readJSON(sellersPath);
        const items = await fs.readJSON(itemsPath);
        const purchases = await fs.readJSON(purchasePath);
        const customers = await fs.readJSON(customersPath);

        for (const seller of sellers) await prisma.seller.create({ data: seller });
        for (const item of items) await prisma.item.create({ data: item });
        for (const customer of customers) await prisma.customer.create({ data: customer });
        for (const purchase of purchases) await prisma.purchase.create({ data: purchase });
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
