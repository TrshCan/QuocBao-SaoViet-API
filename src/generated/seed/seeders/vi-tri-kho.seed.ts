import { PrismaClient } from '@/generated/prisma/client';

export async function seedViTriKho(prisma: PrismaClient) {
  const khos = await prisma.kho.findMany();

  const viTriKhos = [];

  for (const kho of khos) {
    // Tạo 5 khu vực (A-E) cho mỗi kho
    for (let khu = 0; khu < 5; khu++) {
      const khuName = String.fromCharCode(65 + khu); // A, B, C, D, E

      // Mỗi khu có 3 dãy
      for (let day = 1; day <= 3; day++) {
        // Mỗi dãy có 10 kệ
        for (let ke = 1; ke <= 10; ke++) {
          viTriKhos.push({
            khoId: kho.id,
            maViTri: `${kho.maKho}-${khuName}${day}${ke.toString().padStart(2, '0')}`,
            moTa: `Khu ${khuName}, Dãy ${day}, Kệ ${ke} - ${kho.tenKho}`,
            createdBy: 'system',
          });
        }
      }
    }
  }

  for (const viTriKho of viTriKhos) {
    await prisma.viTriKho.create({
      data: viTriKho,
    });
  }

  console.log(`   ✓ Seeded ${viTriKhos.length} warehouse locations`);
}
