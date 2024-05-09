-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PurchaseHistory" (
    "purchaseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" INTEGER NOT NULL,
    CONSTRAINT "PurchaseHistory_id_fkey" FOREIGN KEY ("id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PurchaseHistory" ("id", "purchaseId", "quantity") SELECT "id", "purchaseId", "quantity" FROM "PurchaseHistory";
DROP TABLE "PurchaseHistory";
ALTER TABLE "new_PurchaseHistory" RENAME TO "PurchaseHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
