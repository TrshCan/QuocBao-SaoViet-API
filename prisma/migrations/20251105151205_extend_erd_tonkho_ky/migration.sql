/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" VARCHAR(20);

-- CreateTable
CREATE TABLE "NhaCungCap" (
    "id" SERIAL NOT NULL,
    "tenNhaCungCap" TEXT NOT NULL,
    "diaChi" VARCHAR(255),
    "nguoiLienHe" VARCHAR(100),
    "soDienThoai" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NhaCungCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KhachHang" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(20),
    "ten" TEXT NOT NULL,
    "soDienThoai" VARCHAR(20),
    "soDienThoai2" VARCHAR(20),
    "email" VARCHAR(120),
    "diaChi" VARCHAR(255),
    "loaiKhach" VARCHAR(50),
    "tenCongTy" VARCHAR(150),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "KhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonViChuyen" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(20),
    "tenDonVi" TEXT NOT NULL,
    "diaChi" VARCHAR(255),
    "duongDayNong" VARCHAR(100),
    "soDienThoai" VARCHAR(20),
    "website" VARCHAR(120),
    "ghiChu" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonViChuyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TonKhoKy" (
    "id" SERIAL NOT NULL,
    "ky" INTEGER NOT NULL,
    "sanPhamId" INTEGER NOT NULL,
    "viTriKhoId" INTEGER,
    "tonDauKy" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "nhapTrongKy" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "xuatTrongKy" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "tonCuoiKy" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TonKhoKy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChucNang" (
    "id" SERIAL NOT NULL,
    "tenChucNang" TEXT NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "ChucNang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhanQuyen" (
    "id" SERIAL NOT NULL,
    "chucNangId" INTEGER NOT NULL,
    "nguoiDungId" INTEGER NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 0,
    "insert" INTEGER NOT NULL DEFAULT 0,
    "update" INTEGER NOT NULL DEFAULT 0,
    "delete" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PhanQuyen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TonKhoKy_sanPhamId_viTriKhoId_idx" ON "TonKhoKy"("sanPhamId", "viTriKhoId");

-- CreateIndex
CREATE UNIQUE INDEX "PhanQuyen_chucNangId_nguoiDungId_key" ON "PhanQuyen"("chucNangId", "nguoiDungId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TonKhoKy" ADD CONSTRAINT "TonKhoKy_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TonKhoKy" ADD CONSTRAINT "TonKhoKy_viTriKhoId_fkey" FOREIGN KEY ("viTriKhoId") REFERENCES "ViTriKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_chucNangId_fkey" FOREIGN KEY ("chucNangId") REFERENCES "ChucNang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_nguoiDungId_fkey" FOREIGN KEY ("nguoiDungId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
