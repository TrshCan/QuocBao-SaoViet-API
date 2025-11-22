import { PrismaClient } from '@/generated/prisma/client';

export async function seedPhanQuyen(prisma: PrismaClient) {
  const users = await prisma.user.findMany();
  const chucNangs = await prisma.chucNang.findMany();

  const admin = users.find((u) => u.username === 'admin');
  const khoTruong = users.find((u) => u.username === 'kho_truong');
  const thuKho = users.find((u) => u.username === 'thu_kho');
  const keToan = users.find((u) => u.username === 'ke_toan');
  const giamDoc = users.find((u) => u.username === 'giam_doc');

  const phanQuyens = [];

  // Admin - full permissions
  if (admin) {
    for (const chucNang of chucNangs) {
      phanQuyens.push({
        chucNangId: chucNang.id,
        nguoiDungId: admin.id,
        view: 1,
        insert: 1,
        update: 1,
        delete: 1,
      });
    }
  }

  // Kho Truong - warehouse manager permissions
  if (khoTruong) {
    const khoTruongPermissions = [
      'Quản lý kho',
      'Quản lý sản phẩm',
      'Nhập kho',
      'Xuất kho',
      'Chuyển kho',
      'Tồn kho',
      'Báo cáo',
      'Quản lý nhà cung cấp',
    ];

    for (const chucNang of chucNangs) {
      if (khoTruongPermissions.includes(chucNang.tenChucNang)) {
        phanQuyens.push({
          chucNangId: chucNang.id,
          nguoiDungId: khoTruong.id,
          view: 1,
          insert: 1,
          update: 1,
          delete:
            chucNang.tenChucNang === 'Tồn kho' ||
            chucNang.tenChucNang === 'Báo cáo'
              ? 0
              : 1,
        });
      }
    }
  }

  // Thu Kho - warehouse staff permissions
  if (thuKho) {
    const thuKhoPermissions = [
      'Quản lý kho',
      'Quản lý sản phẩm',
      'Nhập kho',
      'Xuất kho',
      'Chuyển kho',
      'Tồn kho',
    ];

    for (const chucNang of chucNangs) {
      if (thuKhoPermissions.includes(chucNang.tenChucNang)) {
        phanQuyens.push({
          chucNangId: chucNang.id,
          nguoiDungId: thuKho.id,
          view: 1,
          insert: ['Nhập kho', 'Xuất kho', 'Chuyển kho'].includes(
            chucNang.tenChucNang,
          )
            ? 1
            : 0,
          update: ['Nhập kho', 'Xuất kho', 'Chuyển kho'].includes(
            chucNang.tenChucNang,
          )
            ? 1
            : 0,
          delete: 0,
        });
      }
    }
  }

  // Ke Toan - accountant permissions
  if (keToan) {
    const keToanPermissions = [
      'Tồn kho',
      'Báo cáo',
      'Nhập kho',
      'Xuất kho',
      'Quản lý nhà cung cấp',
      'Quản lý khách hàng',
    ];

    for (const chucNang of chucNangs) {
      if (keToanPermissions.includes(chucNang.tenChucNang)) {
        phanQuyens.push({
          chucNangId: chucNang.id,
          nguoiDungId: keToan.id,
          view: 1,
          insert: 0,
          update: 0,
          delete: 0,
        });
      }
    }
  }

  // Giam Doc - director permissions (view all, no modifications)
  if (giamDoc) {
    for (const chucNang of chucNangs) {
      phanQuyens.push({
        chucNangId: chucNang.id,
        nguoiDungId: giamDoc.id,
        view: 1,
        insert: 0,
        update: 0,
        delete: 0,
      });
    }
  }

  for (const phanQuyen of phanQuyens) {
    await prisma.phanQuyen.create({
      data: phanQuyen,
    });
  }

  console.log(`   ✓ Seeded ${phanQuyens.length} permissions`);
}
