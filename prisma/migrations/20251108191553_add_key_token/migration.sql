/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "secretOtp" TEXT;

-- CreateTable
CREATE TABLE "KeyToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "refreshTokenUsed" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(255),
    "updatedBy" VARCHAR(255),

    CONSTRAINT "KeyToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_userId_key" ON "KeyToken"("userId");

-- AddForeignKey
ALTER TABLE "KeyToken" ADD CONSTRAINT "KeyToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
