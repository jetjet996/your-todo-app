/*
  Warnings:

  - You are about to drop the column `categorizeId` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `TodoItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "createdByID" INTEGER,
    "assignedToID" INTEGER,
    "categoriesID" INTEGER,
    CONSTRAINT "TodoItem_createdByID_fkey" FOREIGN KEY ("createdByID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TodoItem_assignedToID_fkey" FOREIGN KEY ("assignedToID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TodoItem_categoriesID_fkey" FOREIGN KEY ("categoriesID") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TodoItem" ("assignedToID", "categoriesID", "createdAt", "createdByID", "description", "dueDate", "id", "status", "title") SELECT "assignedToID", "categoriesID", "createdAt", "createdByID", "description", "dueDate", "id", "status", "title" FROM "TodoItem";
DROP TABLE "TodoItem";
ALTER TABLE "new_TodoItem" RENAME TO "TodoItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
