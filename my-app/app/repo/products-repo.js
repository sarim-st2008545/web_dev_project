// import fs from 'fs-extra'
// import path from 'path'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class productsRepo {
    async getPurchaseHistory(customerId) {
        customerId = parseInt(customerId);
        const result = await prisma.purchase.findMany({
            where: {
                customerId,
            },
            include: {
                Item: true,
            },
        });

        return result.map((purchase) => ({
            itemName: purchase.Item.name,
            quantity: purchase.quantity,
            image: purchase.Item.image,
        }));
    }

    async getProductQuantitySold(productId) {
        productId = parseInt(productId);

        const totalQuantitySold = await prisma.purchase.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                itemId: productId,
            },
        });

        return totalQuantitySold._sum.quantity || 0;
    }

    async getProductCustomersList(productId) {
        productId = parseInt(productId); // Convert productId to an integer

        // First, get the distinct customerIds for the product
        const customerIds = await prisma.purchase.findMany({
            select: {
                customerId: true,
            },
            where: {
                itemId: productId,
            },
            distinct: ["customerId"],
        });

        // Then, fetch the customer names for each customerId
        const customerNames = await prisma.customer.findMany({
            where: {
                customerId: {
                    in: customerIds.map(({ customerId }) => customerId),
                },
            },
            select: {
                name: true,
            },
        });

        // Return an array of customer names
        return customerNames.map(({ name }) => name);
    }

    async getProducts(type) {
        if (type) {
            return prisma.item.findMany({
                where: {
                    type: {
                        equals: type.toLowerCase(),
                    },
                },
            });
        }
        return prisma.item.findMany();
    }

    async getProduct(id) {
        return prisma.item.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

    async addProduct(product) {
        product.quantity = parseInt(product.quantity);
        return prisma.item.create({
            data: {
                ...product,
            },
        });
    }

    async addTransaction(transaction) {
        transaction.itemId = parseInt(transaction.itemId);

        // Calculate total price of the transaction
        const item = await prisma.item.findUnique({
            where: { id: transaction.itemId },
            select: { price: true, sellerId: true },
        });
        const totalPrice = transaction.quantity * item.price;

        // Update seller's bank account balance
        await prisma.seller.update({
            where: { sellerId: item.sellerId },
            data: {
                bank_account_balance: {
                    increment: totalPrice, // Increment seller's balance by the total price
                },
            },
        });

        // Create the new transaction record
        return prisma.purchase.create({
            data: {
                ...transaction,
            },
        });
    }

    async updateProduct(id, item) {
        id = parseInt(id);
        const existingItem = await prisma.item.findUnique({
            where: { id: id },
        });

        if (!existingItem) {
            return "Unable to update item because it does not exist";
        }

        const updatedItem = {
            ...item,
            quantity: parseInt(item.quantity, 10), // Convert quantity to an integer
        };

        return prisma.item.update({
            where: { id: id },
            data: updatedItem,
        });
    }

    async getUsers() {
        const customers = await prisma.customer.findMany();
        const sellers = await prisma.seller.findMany();

        return { customers, sellers };
    }

    async updateCustomerMoney(customerId, newMoneyBalance) {
        customerId = parseInt(customerId);
        try {
            const updatedCustomer = await prisma.customer.update({
                where: {
                    customerId: customerId,
                },
                data: {
                    money_balance: newMoneyBalance,
                },
            });
            console.log(`Money balance updated for customer ${customerId}`);
            return updatedCustomer;
        } catch (error) {
            console.error(`Error updating money balance for customer ${customerId}:`, error);
            throw error;
        }
    }
}
