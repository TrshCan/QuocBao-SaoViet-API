import { PrismaClient } from '../../../generated/prisma';

export async function seedDonViChuyen(prisma: PrismaClient) {
  const donViChuyens = [
    {
      code: 'DVC-001',
      tenDonVi: 'Giao Hàng Nhanh (GHN)',
      diaChi: '123 Đường 3/2, Quận 10, TP.HCM',
      duongDayNong: '1900 0092',
      soDienThoai: '0281234567',
      website: 'https://ghn.vn',
      ghiChu: 'Đơn vị vận chuyển hàng đầu',
    },
    {
      code: 'DVC-002',
      tenDonVi: 'Giao Hàng Tiết Kiệm (GHTK)',
      diaChi: '456 Lê Văn Việt, Quận 9, TP.HCM',
      duongDayNong: '1900 0083',
      soDienThoai: '0287654321',
      website: 'https://giaohangtietkiem.vn',
      ghiChu: 'Giá cả cạnh tranh',
    },
    {
      code: 'DVC-003',
      tenDonVi: 'Viettel Post',
      diaChi: '789 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      duongDayNong: '1900 8095',
      soDienThoai: '0241111222',
      website: 'https://viettelpost.vn',
      ghiChu: 'Mạng lưới rộng khắp',
    },
    {
      code: 'DVC-004',
      tenDonVi: 'Vietnam Post (Bưu điện Việt Nam)',
      diaChi: '321 Lê Duẩn, Quận 1, TP.HCM',
      duongDayNong: '1900 545481',
      soDienThoai: '0283333444',
      website: 'https://vnpost.vn',
      ghiChu: 'Đơn vị bưu chính quốc gia',
    },
    {
      code: 'DVC-005',
      tenDonVi: 'J&T Express',
      diaChi: '555 Nguyễn Gia Trí, Bình Thạnh, TP.HCM',
      duongDayNong: '1900 1088',
      soDienThoai: '0285555666',
      website: 'https://jtexpress.vn',
      ghiChu: 'Giao hàng nhanh chóng',
    },
    {
      code: 'DVC-006',
      tenDonVi: 'Ninja Van',
      diaChi: '888 Võ Văn Ngân, Thủ Đức, TP.HCM',
      duongDayNong: '1900 886688',
      soDienThoai: '0287777888',
      website: 'https://ninjavan.co',
      ghiChu: 'Công nghệ hiện đại',
    },
    {
      code: 'DVC-007',
      tenDonVi: 'Kerry Express Vietnam',
      diaChi: '999 Quang Trung, Gò Vấp, TP.HCM',
      duongDayNong: '1900 0079',
      soDienThoai: '0289999000',
      website: 'https://kerryexpress.com/vn',
      ghiChu: 'Dịch vụ chuyên nghiệp',
    },
  ];

  for (const donViChuyen of donViChuyens) {
    await prisma.donViChuyen.create({
      data: {
        ...donViChuyen,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${donViChuyens.length} shipping units`);
}
