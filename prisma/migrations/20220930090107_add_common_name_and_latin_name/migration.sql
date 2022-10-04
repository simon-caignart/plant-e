/*
  Warnings:

  - Added the required column `commonName` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latinName` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "commonName" TEXT NOT NULL,
ADD COLUMN     "latinName" TEXT NOT NULL;
