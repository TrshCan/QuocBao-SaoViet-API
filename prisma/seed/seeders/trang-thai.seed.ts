import { PrismaClient } from '../../../generated/prisma';

export async function seedTrangThai(prisma: PrismaClient) {
  // Trạng thái xuất
  const trangThaiXuats = [
    { ten: 'Chờ duyệt' },
    { ten: 'Đã duyệt' },
    { ten: 'Đang xuất' },
    { ten: 'Hoàn thành' },
    { ten: 'Hủy' },
  ];

  for (const trangThaiXuat of trangThaiXuats) {
    await prisma.trangThaiXuat.create({
      data: trangThaiXuat,
    });
  }

  console.log(`   ✓ Seeded ${trangThaiXuats.length} export statuses`);

  // Trạng thái chuyển
  const trangThaiChuyens = [
    { ten: 'Chờ xuất' },
    { ten: 'Đã xuất' },
    { ten: 'Đang vận chuyển' },
    { ten: 'Đã nhận' },
    { ten: 'Hoàn thành' },
    { ten: 'Hủy' },
  ];

  for (const trangThaiChuyen of trangThaiChuyens) {
    await prisma.trangThaiChuyen.create({
      data: trangThaiChuyen,
    });
  }

  console.log(`   ✓ Seeded ${trangThaiChuyens.length} transfer statuses`);
}
