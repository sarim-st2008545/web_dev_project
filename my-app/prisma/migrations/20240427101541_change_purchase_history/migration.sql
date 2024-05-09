/*
  Warnings:

  - You are about to drop the `PurchaseHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `purchaseId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PurchaseHistory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Purchase" (
    "purchaseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Purchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "customerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shipping_address" TEXT NOT NULL,
    "money_balance" INTEGER NOT NULL
);
INSERT INTO "new_Customer" ("customerId", "money_balance", "name", "password", "shipping_address", "surname", "username") SELECT "customerId", "money_balance", "name", "password", "shipping_address", "surname", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
