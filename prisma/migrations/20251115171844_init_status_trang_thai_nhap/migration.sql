/*
  Warnings:

  - The `trangThai` column on the `PhieuNhapKho` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TrangThaiNhap" AS ENUM ('DRAFT', 'DONE');

-- AlterTable
ALTER TABLE "PhieuChuyenKho" ALTER COLUMN "trangThaiId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PhieuNhapKho" DROP COLUMN "trangThai",
ADD COLUMN     "trangThai" "TrangThaiNhap" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "PhieuXuatKho" ALTER COLUMN "trangThaiId" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "TrangThaiNhapEnum";
