import { PrismaClient } from '../../../generated/prisma';

export async function seedDonViTinh(prisma: PrismaClient) {
  const donViTinhs = [
    { ten: 'Cái', moTa: 'Đơn vị tính cho sản phẩm đếm được' },
    { ten: 'Chiếc', moTa: 'Đơn vị tính cho sản phẩm riêng lẻ' },
    { ten: 'Hộp', moTa: 'Đơn vị tính cho sản phẩm đóng hộp' },
    { ten: 'Thùng', moTa: 'Đơn vị tính cho sản phẩm đóng thùng' },
    { ten: 'Kg', moTa: 'Kilogram - đơn vị khối lượng' },
    { ten: 'Gram', moTa: 'Đơn vị khối lượng nhỏ' },
    { ten: 'Lít', moTa: 'Đơn vị thể tích' },
    { ten: 'Mét', moTa: 'Đơn vị chiều dài' },
    { ten: 'M2', moTa: 'Mét vuông - đơn vị diện tích' },
    { ten: 'M3', moTa: 'Mét khối - đơn vị thể tích' },
    { ten: 'Tấn', moTa: 'Đơn vị khối lượng lớn' },
    { ten: 'Bao', moTa: 'Đơn vị tính cho sản phẩm đóng bao' },
    { ten: 'Gói', moTa: 'Đơn vị tính cho sản phẩm đóng gói nhỏ' },
    { ten: 'Viên', moTa: 'Đơn vị tính cho dược phẩm' },
    { ten: 'Lọ', moTa: 'Đơn vị tính cho sản phẩm đóng lọ' },
    { ten: 'Chai', moTa: 'Đơn vị tính cho sản phẩm đóng chai' },
    { ten: 'Bộ', moTa: 'Đơn vị tính cho sản phẩm combo' },
    { ten: 'Cuộn', moTa: 'Đơn vị tính cho sản phẩm dạng cuộn' },
    { ten: 'Tờ', moTa: 'Đơn vị tính cho giấy tờ' },
    { ten: 'Quyển', moTa: 'Đơn vị tính cho sách vở' },
  ];

  for (const donViTinh of donViTinhs) {
    await prisma.donViTinh.create({
      data: {
        ...donViTinh,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${donViTinhs.length} units`);
}
