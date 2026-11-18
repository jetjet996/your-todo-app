-- CreateTable
CREATE TABLE "TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "statusId" INTEGER NOT NULL,
    "categorizeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "status" INTEGER NOT NULL,
    "createdByID" INTEGER NOT NULL,
    "assignedToID" INTEGER NOT NULL,
    "categoriesID" INTEGER NOT NULL,
    CONSTRAINT "TodoItem_createdByID_fkey" FOREIGN KEY ("createdByID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TodoItem_assignedToID_fkey" FOREIGN KEY ("assignedToID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TodoItem_categoriesID_fkey" FOREIGN KEY ("categoriesID") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
