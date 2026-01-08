-- CreateTable
CREATE TABLE "DanhMuc" (
    "id" TEXT NOT NULL,
    "maDanhMuc" TEXT NOT NULL,
    "tenDanhMuc" TEXT NOT NULL,
    "moTa" VARCHAR(500),
    "thuTu" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(255),
    "updatedBy" VARCHAR(255),
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DanhMuc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DanhMuc_maDanhMuc_key" ON "DanhMuc"("maDanhMuc");

-- AddForeignKey
ALTER TABLE "DanhMuc" ADD CONSTRAINT "DanhMuc_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DanhMuc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
