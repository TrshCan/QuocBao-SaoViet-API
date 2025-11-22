import { PrismaClient } from '@/generated/prisma/client';

export async function seedKhachHang(prisma: PrismaClient) {
  const khachHangs = [
    {
      code: 'KH-001',
      ten: 'Nguyễn Văn An',
      soDienThoai: '0912345678',
      email: 'nva@email.com',
      diaChi: '123 Phố Huế, Hai Bà Trưng, Hà Nội',
      loaiKhach: 'Cá nhân',
    },
    {
      code: 'KH-002',
      ten: 'Trần Thị Bích',
      soDienThoai: '0923456789',
      soDienThoai2: '0243456789',
      email: 'ttb@email.com',
      diaChi: '456 Nguyễn Huệ, Quận 1, TP.HCM',
      loaiKhach: 'Cá nhân',
    },
    {
      code: 'KH-003',
      ten: 'Lê Minh Công',
      soDienThoai: '0934567890',
      email: 'lmc@email.com',
      diaChi: '789 Lê Lợi, Hải Châu, Đà Nẵng',
      loaiKhach: 'Cá nhân',
      tenCongTy: 'Công ty TNHH MTV Minh Công',
    },
    {
      code: 'KH-004',
      ten: 'Phạm Thị Dung',
      soDienThoai: '0945678901',
      email: 'ptd@email.com',
      diaChi: '321 Trần Phú, Ninh Kiều, Cần Thơ',
      loaiKhach: 'Cá nhân',
    },
    {
      code: 'KH-005',
      ten: 'Công ty ABC',
      soDienThoai: '0241111111',
      soDienThoai2: '0242222222',
      email: 'contact@abc.com.vn',
      diaChi: '100 Láng Hạ, Đống Đa, Hà Nội',
      loaiKhach: 'Doanh nghiệp',
      tenCongTy: 'Công ty Cổ phần ABC',
    },
    {
      code: 'KH-006',
      ten: 'Công ty XYZ',
      soDienThoai: '0283333333',
      email: 'info@xyz.com.vn',
      diaChi: '200 Điện Biên Phủ, Bình Thạnh, TP.HCM',
      loaiKhach: 'Doanh nghiệp',
      tenCongTy: 'Công ty TNHH XYZ Việt Nam',
    },
    {
      code: 'KH-007',
      ten: 'Hệ thống siêu thị DEF',
      soDienThoai: '1900123456',
      email: 'support@def.vn',
      diaChi: '300 Nguyễn Văn Linh, Long Biên, Hà Nội',
      loaiKhach: 'Đại lý',
      tenCongTy: 'Hệ thống phân phối DEF',
    },
    {
      code: 'KH-008',
      ten: 'Hoàng Minh Tuấn',
      soDienThoai: '0956789012',
      email: 'hmt@email.com',
      diaChi: '400 Hai Bà Trưng, Bến Nghé, TP.HCM',
      loaiKhach: 'VIP',
    },
    {
      code: 'KH-009',
      ten: 'Vũ Thị Hương',
      soDienThoai: '0967890123',
      soDienThoai2: '0236111222',
      email: 'vth@email.com',
      diaChi: '500 Phan Chu Trinh, Hải Châu, Đà Nẵng',
      loaiKhach: 'Cá nhân',
    },
    {
      code: 'KH-010',
      ten: 'Công ty GHI',
      soDienThoai: '0292444444',
      email: 'order@ghi.vn',
      diaChi: '600 Mậu Thân, Ninh Kiều, Cần Thơ',
      loaiKhach: 'Doanh nghiệp',
      tenCongTy: 'Công ty Cổ phần Thương mại GHI',
    },
  ];

  for (const khachHang of khachHangs) {
    await prisma.khachHang.create({
      data: {
        ...khachHang,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${khachHangs.length} customers`);
}
