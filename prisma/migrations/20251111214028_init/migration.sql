-- DropForeignKey
ALTER TABLE "KeyToken" DROP CONSTRAINT "KeyToken_userId_fkey";

-- DropIndex
DROP INDEX "KeyToken_userId_key";
