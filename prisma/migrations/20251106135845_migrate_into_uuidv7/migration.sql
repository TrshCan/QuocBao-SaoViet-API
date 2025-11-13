/*
  Warnings:

  - The primary key for the `ChiTietChuyenKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChiTietNhapKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChiTietXuatKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChucNang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DonViChuyen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DonViTinh` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KhachHang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Kho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `NhaCungCap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PhanQuyen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PhieuChuyenKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PhieuNhapKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PhieuXuatKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SanPham` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TonKho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TonKhoKy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TrangThaiChuyen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TrangThaiXuat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ViTriKho` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ChiTietChuyenKho" DROP CONSTRAINT "ChiTietChuyenKho_phieuId_fkey";

-- DropForeignKey
ALTER TABLE "ChiTietChuyenKho" DROP CONSTRAINT "ChiTietChuyenKho_sanPhamId_fkey";

-- DropForeignKey
ALTER TABLE "ChiTietNhapKho" DROP CONSTRAINT "ChiTietNhapKho_phieuId_fkey";

-- DropForeignKey
ALTER TABLE "ChiTietNhapKho" DROP CONSTRAINT "ChiTietNhapKho_sanPhamId_fkey";

-- DropForeignKey
ALTER TABLE "ChiTietXuatKho" DROP CONSTRAINT "ChiTietXuatKho_phieuId_fkey";

-- DropForeignKey
ALTER TABLE "ChiTietXuatKho" DROP CONSTRAINT "ChiTietXuatKho_sanPhamId_fkey";

-- DropForeignKey
ALTER TABLE "PhanQuyen" DROP CONSTRAINT "PhanQuyen_chucNangId_fkey";

-- DropForeignKey
ALTER TABLE "PhanQuyen" DROP CONSTRAINT "PhanQuyen_nguoiDungId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuChuyenKho" DROP CONSTRAINT "PhieuChuyenKho_khoNhapId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuChuyenKho" DROP CONSTRAINT "PhieuChuyenKho_khoXuatId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuNhapKho" DROP CONSTRAINT "PhieuNhapKho_khoId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuXuatKho" DROP CONSTRAINT "PhieuXuatKho_khoId_fkey";

-- DropForeignKey
ALTER TABLE "SanPham" DROP CONSTRAINT "SanPham_donViTinhId_fkey";

-- DropForeignKey
ALTER TABLE "TonKho" DROP CONSTRAINT "TonKho_khoId_fkey";

-- DropForeignKey
ALTER TABLE "TonKho" DROP CONSTRAINT "TonKho_sanPhamId_fkey";

-- DropForeignKey
ALTER TABLE "TonKho" DROP CONSTRAINT "TonKho_viTriKhoId_fkey";

-- DropForeignKey
ALTER TABLE "TonKhoKy" DROP CONSTRAINT "TonKhoKy_sanPhamId_fkey";

-- DropForeignKey
ALTER TABLE "TonKhoKy" DROP CONSTRAINT "TonKhoKy_viTriKhoId_fkey";

-- DropForeignKey
ALTER TABLE "ViTriKho" DROP CONSTRAINT "ViTriKho_khoId_fkey";

-- AlterTable
ALTER TABLE "ChiTietChuyenKho" DROP CONSTRAINT "ChiTietChuyenKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "phieuId" SET DATA TYPE TEXT,
ALTER COLUMN "sanPhamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChiTietChuyenKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChiTietChuyenKho_id_seq";

-- AlterTable
ALTER TABLE "ChiTietNhapKho" DROP CONSTRAINT "ChiTietNhapKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "phieuId" SET DATA TYPE TEXT,
ALTER COLUMN "sanPhamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChiTietNhapKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChiTietNhapKho_id_seq";

-- AlterTable
ALTER TABLE "ChiTietXuatKho" DROP CONSTRAINT "ChiTietXuatKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "phieuId" SET DATA TYPE TEXT,
ALTER COLUMN "sanPhamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChiTietXuatKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChiTietXuatKho_id_seq";

-- AlterTable
ALTER TABLE "ChucNang" DROP CONSTRAINT "ChucNang_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChucNang_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChucNang_id_seq";

-- AlterTable
ALTER TABLE "DonViChuyen" DROP CONSTRAINT "DonViChuyen_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "DonViChuyen_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DonViChuyen_id_seq";

-- AlterTable
ALTER TABLE "DonViTinh" DROP CONSTRAINT "DonViTinh_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "DonViTinh_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DonViTinh_id_seq";

-- AlterTable
ALTER TABLE "KhachHang" DROP CONSTRAINT "KhachHang_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "KhachHang_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "KhachHang_id_seq";

-- AlterTable
ALTER TABLE "Kho" DROP CONSTRAINT "Kho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Kho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Kho_id_seq";

-- AlterTable
ALTER TABLE "NhaCungCap" DROP CONSTRAINT "NhaCungCap_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "NhaCungCap_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NhaCungCap_id_seq";

-- AlterTable
ALTER TABLE "PhanQuyen" DROP CONSTRAINT "PhanQuyen_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "chucNangId" SET DATA TYPE TEXT,
ALTER COLUMN "nguoiDungId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PhanQuyen_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhanQuyen_id_seq";

-- AlterTable
ALTER TABLE "PhieuChuyenKho" DROP CONSTRAINT "PhieuChuyenKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "khoXuatId" SET DATA TYPE TEXT,
ALTER COLUMN "khoNhapId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "PhieuChuyenKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhieuChuyenKho_id_seq";

-- AlterTable
ALTER TABLE "PhieuNhapKho" DROP CONSTRAINT "PhieuNhapKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "khoId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "PhieuNhapKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhieuNhapKho_id_seq";

-- AlterTable
ALTER TABLE "PhieuXuatKho" DROP CONSTRAINT "PhieuXuatKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "khoId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "PhieuXuatKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PhieuXuatKho_id_seq";

-- AlterTable
ALTER TABLE "SanPham" DROP CONSTRAINT "SanPham_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "donViTinhId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "SanPham_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SanPham_id_seq";

-- AlterTable
ALTER TABLE "TonKho" DROP CONSTRAINT "TonKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "khoId" SET DATA TYPE TEXT,
ALTER COLUMN "viTriKhoId" SET DATA TYPE TEXT,
ALTER COLUMN "sanPhamId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "TonKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TonKho_id_seq";

-- AlterTable
ALTER TABLE "TonKhoKy" DROP CONSTRAINT "TonKhoKy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sanPhamId" SET DATA TYPE TEXT,
ALTER COLUMN "viTriKhoId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "TonKhoKy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TonKhoKy_id_seq";

-- AlterTable
ALTER TABLE "TrangThaiChuyen" DROP CONSTRAINT "TrangThaiChuyen_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TrangThaiChuyen_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TrangThaiChuyen_id_seq";

-- AlterTable
ALTER TABLE "TrangThaiXuat" DROP CONSTRAINT "TrangThaiXuat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TrangThaiXuat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TrangThaiXuat_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "ViTriKho" DROP CONSTRAINT "ViTriKho_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "khoId" SET DATA TYPE TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedBy" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "ViTriKho_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ViTriKho_id_seq";

-- AddForeignKey
ALTER TABLE "ViTriKho" ADD CONSTRAINT "ViTriKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanPham" ADD CONSTRAINT "SanPham_donViTinhId_fkey" FOREIGN KEY ("donViTinhId") REFERENCES "DonViTinh"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKho" ADD CONSTRAINT "TonKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKho" ADD CONSTRAINT "TonKho_viTriKhoId_fkey" FOREIGN KEY ("viTriKhoId") REFERENCES "ViTriKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKho" ADD CONSTRAINT "TonKho_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuNhapKho" ADD CONSTRAINT "PhieuNhapKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietNhapKho" ADD CONSTRAINT "ChiTietNhapKho_phieuId_fkey" FOREIGN KEY ("phieuId") REFERENCES "PhieuNhapKho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietNhapKho" ADD CONSTRAINT "ChiTietNhapKho_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuXuatKho" ADD CONSTRAINT "PhieuXuatKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietXuatKho" ADD CONSTRAINT "ChiTietXuatKho_phieuId_fkey" FOREIGN KEY ("phieuId") REFERENCES "PhieuXuatKho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietXuatKho" ADD CONSTRAINT "ChiTietXuatKho_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuChuyenKho" ADD CONSTRAINT "PhieuChuyenKho_khoXuatId_fkey" FOREIGN KEY ("khoXuatId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuChuyenKho" ADD CONSTRAINT "PhieuChuyenKho_khoNhapId_fkey" FOREIGN KEY ("khoNhapId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietChuyenKho" ADD CONSTRAINT "ChiTietChuyenKho_phieuId_fkey" FOREIGN KEY ("phieuId") REFERENCES "PhieuChuyenKho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietChuyenKho" ADD CONSTRAINT "ChiTietChuyenKho_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKhoKy" ADD CONSTRAINT "TonKhoKy_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKhoKy" ADD CONSTRAINT "TonKhoKy_viTriKhoId_fkey" FOREIGN KEY ("viTriKhoId") REFERENCES "ViTriKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_chucNangId_fkey" FOREIGN KEY ("chucNangId") REFERENCES "ChucNang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_nguoiDungId_fkey" FOREIGN KEY ("nguoiDungId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
