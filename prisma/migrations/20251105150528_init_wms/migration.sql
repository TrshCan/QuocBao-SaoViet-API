-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonViTinh" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,
    "moTa" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonViTinh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kho" (
    "id" SERIAL NOT NULL,
    "maKho" TEXT NOT NULL,
    "tenKho" TEXT NOT NULL,
    "diaChi" VARCHAR(255),
    "dienTich" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViTriKho" (
    "id" SERIAL NOT NULL,
    "khoId" INTEGER NOT NULL,
    "maViTri" TEXT NOT NULL,
    "moTa" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ViTriKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanPham" (
    "id" SERIAL NOT NULL,
    "maSanPham" TEXT NOT NULL,
    "tenSanPham" TEXT NOT NULL,
    "nhom" VARCHAR(100),
    "moTa" VARCHAR(255),
    "donViTinhId" INTEGER NOT NULL,
    "quanLyLo" BOOLEAN NOT NULL DEFAULT false,
    "quanLyHSD" BOOLEAN NOT NULL DEFAULT false,
    "quanLySerial" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SanPham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TonKho" (
    "id" SERIAL NOT NULL,
    "khoId" INTEGER NOT NULL,
    "viTriKhoId" INTEGER,
    "sanPhamId" INTEGER NOT NULL,
    "soLo" VARCHAR(100),
    "hanSuDung" TIMESTAMP(3),
    "soSerial" VARCHAR(100),
    "soLuong" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TonKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrangThaiChuyen" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,

    CONSTRAINT "TrangThaiChuyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrangThaiXuat" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,

    CONSTRAINT "TrangThaiXuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuNhapKho" (
    "id" SERIAL NOT NULL,
    "soPhieu" TEXT NOT NULL,
    "khoId" INTEGER NOT NULL,
    "ngayNhap" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ghiChu" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PhieuNhapKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietNhapKho" (
    "id" SERIAL NOT NULL,
    "phieuId" INTEGER NOT NULL,
    "sanPhamId" INTEGER NOT NULL,
    "soLuong" DECIMAL(18,3) NOT NULL,
    "donGia" DECIMAL(18,2),
    "soLo" VARCHAR(100),
    "hanSuDung" TIMESTAMP(3),
    "soSerial" VARCHAR(100),

    CONSTRAINT "ChiTietNhapKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuXuatKho" (
    "id" SERIAL NOT NULL,
    "soPhieu" TEXT NOT NULL,
    "khoId" INTEGER NOT NULL,
    "ngayXuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trangThaiId" INTEGER,
    "ghiChu" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PhieuXuatKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietXuatKho" (
    "id" SERIAL NOT NULL,
    "phieuId" INTEGER NOT NULL,
    "sanPhamId" INTEGER NOT NULL,
    "soLuong" DECIMAL(18,3) NOT NULL,
    "soLo" VARCHAR(100),
    "hanSuDung" TIMESTAMP(3),
    "soSerial" VARCHAR(100),

    CONSTRAINT "ChiTietXuatKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuChuyenKho" (
    "id" SERIAL NOT NULL,
    "soPhieu" TEXT NOT NULL,
    "khoXuatId" INTEGER NOT NULL,
    "khoNhapId" INTEGER NOT NULL,
    "ngayChuyen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trangThaiId" INTEGER,
    "ghiChu" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PhieuChuyenKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietChuyenKho" (
    "id" SERIAL NOT NULL,
    "phieuId" INTEGER NOT NULL,
    "sanPhamId" INTEGER NOT NULL,
    "soLuong" DECIMAL(18,3) NOT NULL,
    "soLo" VARCHAR(100),
    "hanSuDung" TIMESTAMP(3),
    "soSerial" VARCHAR(100),

    CONSTRAINT "ChiTietChuyenKho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Kho_maKho_key" ON "Kho"("maKho");

-- CreateIndex
CREATE UNIQUE INDEX "ViTriKho_maViTri_key" ON "ViTriKho"("maViTri");

-- CreateIndex
CREATE UNIQUE INDEX "SanPham_maSanPham_key" ON "SanPham"("maSanPham");

-- CreateIndex
CREATE INDEX "TonKho_khoId_viTriKhoId_sanPhamId_idx" ON "TonKho"("khoId", "viTriKhoId", "sanPhamId");

-- CreateIndex
CREATE INDEX "TonKho_sanPhamId_soLo_soSerial_idx" ON "TonKho"("sanPhamId", "soLo", "soSerial");

-- CreateIndex
CREATE UNIQUE INDEX "PhieuNhapKho_soPhieu_key" ON "PhieuNhapKho"("soPhieu");

-- CreateIndex
CREATE INDEX "ChiTietNhapKho_phieuId_idx" ON "ChiTietNhapKho"("phieuId");

-- CreateIndex
CREATE UNIQUE INDEX "PhieuXuatKho_soPhieu_key" ON "PhieuXuatKho"("soPhieu");

-- CreateIndex
CREATE INDEX "ChiTietXuatKho_phieuId_idx" ON "ChiTietXuatKho"("phieuId");

-- CreateIndex
CREATE UNIQUE INDEX "PhieuChuyenKho_soPhieu_key" ON "PhieuChuyenKho"("soPhieu");

-- CreateIndex
CREATE INDEX "ChiTietChuyenKho_phieuId_idx" ON "ChiTietChuyenKho"("phieuId");

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
