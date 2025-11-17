import { PrismaClient } from '../../../generated/prisma';

export async function seedKho(prisma: PrismaClient) {
  const khos = [
    {
      maKho: 'KHO-HN',
      tenKho: 'Kho Hà Nội',
      diaChi: '123 Đường Láng, Đống Đa, Hà Nội',
      dienTich: 1500.5,
    },
    {
      maKho: 'KHO-HCM',
      tenKho: 'Kho Hồ Chí Minh',
      diaChi: '456 Nguyễn Huệ, Quận 1, TP.HCM',
      dienTich: 2000.0,
    },
    {
      maKho: 'KHO-DN',
      tenKho: 'Kho Đà Nẵng',
      diaChi: '789 Lê Duẩn, Hải Châu, Đà Nẵng',
      dienTich: 1200.0,
    },
    {
      maKho: 'KHO-CT',
      tenKho: 'Kho Cần Thơ',
      diaChi: '321 Mậu Thân, Ninh Kiều, Cần Thơ',
      dienTich: 800.0,
    },
    {
      maKho: 'KHO-HP',
      tenKho: 'Kho Hải Phòng',
      diaChi: '555 Lạch Tray, Ngô Quyền, Hải Phòng',
      dienTich: 1000.0,
    },
  ];

  for (const kho of khos) {
    await prisma.kho.create({
      data: {
        ...kho,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${khos.length} warehouses`);
}
