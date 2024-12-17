/*
  Warnings:

  - Added the required column `quantity` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `quantity` INTEGER NOT NULL;
