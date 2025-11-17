import { PrismaClient, TrangThaiNhap } from '../../../generated/prisma';

export async function seedPhieuNhapKho(prisma: PrismaClient) {
  const khos = await prisma.kho.findMany();
  const sanPhams = await prisma.sanPham.findMany();
  const viTriKhos = await prisma.viTriKho.findMany();

  if (khos.length === 0 || sanPhams.length === 0) {
    console.log('   ⚠ Skipped: No warehouses or products found');
    return;
  }

  const khoHN = khos.find((k) => k.maKho === 'KHO-HN');
  const khoHCM = khos.find((k) => k.maKho === 'KHO-HCM');

  const phieuNhaps = [];

  // Phiếu nhập 1 - Kho Hà Nội
  if (khoHN) {
    const phieu1 = await prisma.phieuNhapKho.create({
      data: {
        soPhieu: 'PN-2024-001',
        khoId: khoHN.id,
        ngayNhap: new Date('2024-01-15'),
        ghiChu: 'Nhập hàng đợt đầu năm',
        trangThai: TrangThaiNhap.DONE,
        createdBy: 'admin',
      },
    });

    // Chi tiết nhập - Laptop
    await prisma.chiTietNhapKho.create({
      data: {
        phieuId: phieu1.id,
        sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0001')!.id,
        soLuong: 50,
        donGia: 15000000,
        soSerial: 'SN-2024-001-050',
      },
    });

    // Chi tiết nhập - Giấy A4
    await prisma.chiTietNhapKho.create({
      data: {
        phieuId: phieu1.id,
        sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0004')!.id,
        soLuong: 100,
        donGia: 95000,
        soLo: 'LOT-2024-A4-001',
      },
    });

    // Update tồn kho
    const viTriKhoHN = viTriKhos.find((v) => v.khoId === khoHN.id);
    if (viTriKhoHN) {
      await prisma.tonKho.create({
        data: {
          khoId: khoHN.id,
          viTriKhoId: viTriKhoHN.id,
          sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0001')!.id,
          soLuong: 50,
          soSerial: 'SN-2024-001-050',
          createdBy: 'system',
        },
      });

      await prisma.tonKho.create({
        data: {
          khoId: khoHN.id,
          viTriKhoId: viTriKhoHN.id,
          sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0004')!.id,
          soLuong: 100,
          soLo: 'LOT-2024-A4-001',
          createdBy: 'system',
        },
      });
    }

    phieuNhaps.push(phieu1);
  }

  // Phiếu nhập 2 - Kho HCM
  if (khoHCM) {
    const phieu2 = await prisma.phieuNhapKho.create({
      data: {
        soPhieu: 'PN-2024-002',
        khoId: khoHCM.id,
        ngayNhap: new Date('2024-01-20'),
        ghiChu: 'Nhập hàng thực phẩm',
        trangThai: TrangThaiNhap.DONE,
        createdBy: 'kho_truong',
      },
    });

    // Chi tiết nhập - Gạo
    await prisma.chiTietNhapKho.create({
      data: {
        phieuId: phieu2.id,
        sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0007')!.id,
        soLuong: 200,
        donGia: 120000,
        soLo: 'LOT-2024-GAO-001',
        hanSuDung: new Date('2025-01-20'),
      },
    });

    // Chi tiết nhập - Dầu ăn
    await prisma.chiTietNhapKho.create({
      data: {
        phieuId: phieu2.id,
        sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0008')!.id,
        soLuong: 150,
        donGia: 65000,
        soLo: 'LOT-2024-DAU-001',
        hanSuDung: new Date('2025-06-20'),
      },
    });

    // Update tồn kho
    const viTriKhoHCM = viTriKhos.find((v) => v.khoId === khoHCM.id);
    if (viTriKhoHCM) {
      await prisma.tonKho.create({
        data: {
          khoId: khoHCM.id,
          viTriKhoId: viTriKhoHCM.id,
          sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0007')!.id,
          soLuong: 200,
          soLo: 'LOT-2024-GAO-001',
          hanSuDung: new Date('2025-01-20'),
          createdBy: 'system',
        },
      });

      await prisma.tonKho.create({
        data: {
          khoId: khoHCM.id,
          viTriKhoId: viTriKhoHCM.id,
          sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0008')!.id,
          soLuong: 150,
          soLo: 'LOT-2024-DAU-001',
          hanSuDung: new Date('2025-06-20'),
          createdBy: 'system',
        },
      });
    }

    phieuNhaps.push(phieu2);
  }

  // Phiếu nhập 3 - Draft
  if (khoHN) {
    const phieu3 = await prisma.phieuNhapKho.create({
      data: {
        soPhieu: 'PN-2024-003',
        khoId: khoHN.id,
        ngayNhap: new Date(),
        ghiChu: 'Phiếu nhập nháp',
        trangThai: TrangThaiNhap.DRAFT,
        createdBy: 'thu_kho',
      },
    });

    // Chi tiết nhập - Khẩu trang
    await prisma.chiTietNhapKho.create({
      data: {
        phieuId: phieu3.id,
        sanPhamId: sanPhams.find((sp) => sp.maSanPham === 'SP-0018')!.id,
        soLuong: 500,
        donGia: 150000,
        soLo: 'LOT-2024-KT-001',
        hanSuDung: new Date('2027-01-01'),
      },
    });

    phieuNhaps.push(phieu3);
  }

  console.log(`   ✓ Seeded ${phieuNhaps.length} inbound receipts with details`);
}
