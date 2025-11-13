-- CreateEnum
CREATE TYPE "TrangThaiNhapEnum" AS ENUM ('DRAFT', 'DONE');

-- AlterTable
ALTER TABLE "PhieuNhapKho" ADD COLUMN     "trangThai" "TrangThaiNhapEnum" NOT NULL DEFAULT 'DRAFT';
