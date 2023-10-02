/*
  Warnings:

  - Added the required column `count` to the `order_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `address` LONGTEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_detail` ADD COLUMN `count` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` LONGTEXT NOT NULL DEFAULT '';
