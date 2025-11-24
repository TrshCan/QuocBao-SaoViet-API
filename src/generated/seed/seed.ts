import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { envConfig } from '@/configs/config-env';

import { seedUsers } from './seeders/user.seed';
import { seedDonViTinh } from './seeders/don-vi-tinh.seed';
import { seedKho } from './seeders/kho.seed';
import { seedViTriKho } from './seeders/vi-tri-kho.seed';
import { seedSanPham } from './seeders/san-pham.seed';
import { seedNhaCungCap } from './seeders/nha-cung-cap.seed';
import { seedKhachHang } from './seeders/khach-hang.seed';
import { seedDonViChuyen } from './seeders/don-vi-chuyen.seed';
import { seedChucNang } from './seeders/chuc-nang.seed';
import { seedPhanQuyen } from './seeders/phan-quyen.seed';
import { seedTrangThai } from './seeders/trang-thai.seed';
import { seedPhieuNhapKho } from './seeders/phieu-nhap-kho.seed';

const adapter = new PrismaPg({ connectionString: envConfig.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');
  console.log('='.repeat(60));

  try {
    // Clean existing data (optional - comment out if you want to keep existing data)
    console.log('\n🧹 Cleaning existing data...');
    await cleanDatabase();

    // Seed master data
    console.log('\n📦 Seeding master data...');
    await seedUsers(prisma);
    await seedDonViTinh(prisma);
    await seedKho(prisma);
    await seedViTriKho(prisma);
    await seedNhaCungCap(prisma);
    await seedKhachHang(prisma);
    await seedDonViChuyen(prisma);
    await seedChucNang(prisma);

    // Seed products
    console.log('\n📦 Seeding products...');
    await seedSanPham(prisma);

    // Seed permissions
    console.log('\n🔐 Seeding permissions...');
    await seedPhanQuyen(prisma);

    // Seed status tables
    console.log('\n📊 Seeding status data...');
    await seedTrangThai(prisma);

    // Seed transaction data
    console.log('\n📝 Seeding transaction data...');
    await seedPhieuNhapKho(prisma);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    throw error;
  }
}

async function cleanDatabase() {
  // Delete in correct order to respect foreign key constraints
  await prisma.phanQuyen.deleteMany();
  await prisma.chiTietChuyenKho.deleteMany();
  await prisma.phieuChuyenKho.deleteMany();
  await prisma.chiTietXuatKho.deleteMany();
  await prisma.phieuXuatKho.deleteMany();
  await prisma.chiTietNhapKho.deleteMany();
  await prisma.phieuNhapKho.deleteMany();
  await prisma.tonKhoKy.deleteMany();
  await prisma.tonKho.deleteMany();
  await prisma.sanPham.deleteMany();
  await prisma.viTriKho.deleteMany();
  await prisma.kho.deleteMany();
  await prisma.donViTinh.deleteMany();
  await prisma.donViChuyen.deleteMany();
  await prisma.khachHang.deleteMany();
  await prisma.nhaCungCap.deleteMany();
  await prisma.trangThaiXuat.deleteMany();
  await prisma.trangThaiChuyen.deleteMany();
  await prisma.chucNang.deleteMany();
  await prisma.keyToken.deleteMany();
  await prisma.user.deleteMany();

  console.log('   ✓ Cleaned all tables');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
