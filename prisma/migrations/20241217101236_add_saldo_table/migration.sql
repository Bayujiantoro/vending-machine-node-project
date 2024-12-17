/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `saldo` (
    `idSaldo` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,

    PRIMARY KEY (`idSaldo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
