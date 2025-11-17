import { PrismaClient } from '../../../generated/prisma';

export async function seedNhaCungCap(prisma: PrismaClient) {
  const nhaCungCaps = [
    {
      tenNhaCungCap: 'Công ty TNHH Điện tử Việt',
      diaChi: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      nguoiLienHe: 'Nguyễn Văn A',
      soDienThoai: '0241234567',
    },
    {
      tenNhaCungCap: 'Công ty CP Văn phòng phẩm Hồng Hà',
      diaChi: '456 Lê Lợi, Quận 1, TP.HCM',
      nguoiLienHe: 'Trần Thị B',
      soDienThoai: '0281234567',
    },
    {
      tenNhaCungCap: 'Công ty TNHH Thực phẩm Sài Gòn',
      diaChi: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
      nguoiLienHe: 'Lê Văn C',
      soDienThoai: '0281234568',
    },
    {
      tenNhaCungCap: 'Công ty CP Hóa chất Việt Nam',
      diaChi: '321 Hoàng Diệu, Hải Châu, Đà Nẵng',
      nguoiLienHe: 'Phạm Thị D',
      soDienThoai: '0236123456',
    },
    {
      tenNhaCungCap: 'Công ty TNHH Dụng cụ công nghiệp',
      diaChi: '555 Lý Thường Kiệt, Ngô Quyền, Hải Phòng',
      nguoiLienHe: 'Hoàng Văn E',
      soDienThoai: '0225123456',
    },
    {
      tenNhaCungCap: 'Công ty CP Vật liệu xây dựng',
      diaChi: '888 Võ Văn Tần, Quận 3, TP.HCM',
      nguoiLienHe: 'Đỗ Thị F',
      soDienThoai: '0281234569',
    },
    {
      tenNhaCungCap: 'Công ty TNHH Đồ uống và Thực phẩm',
      diaChi: '999 Trường Chinh, Đống Đa, Hà Nội',
      nguoiLienHe: 'Vũ Văn G',
      soDienThoai: '0241234568',
    },
    {
      tenNhaCungCap: 'Công ty CP Y tế và Dược phẩm',
      diaChi: '111 Pasteur, Quận 1, TP.HCM',
      nguoiLienHe: 'Bùi Thị H',
      soDienThoai: '0281234570',
    },
  ];

  for (const nhaCungCap of nhaCungCaps) {
    await prisma.nhaCungCap.create({
      data: {
        ...nhaCungCap,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${nhaCungCaps.length} suppliers`);
}
