import { PrismaClient } from '@/generated/prisma/client';

export async function seedChucNang(prisma: PrismaClient) {
  const chucNangs = [
    {
      tenChucNang: 'Quản lý người dùng',
      description: 'Quản lý tài khoản, phân quyền người dùng',
    },
    {
      tenChucNang: 'Quản lý kho',
      description: 'Quản lý danh sách kho, vị trí kho',
    },
    {
      tenChucNang: 'Quản lý sản phẩm',
      description: 'Quản lý danh mục sản phẩm, đơn vị tính',
    },
    {
      tenChucNang: 'Nhập kho',
      description: 'Tạo và quản lý phiếu nhập kho',
    },
    {
      tenChucNang: 'Xuất kho',
      description: 'Tạo và quản lý phiếu xuất kho',
    },
    {
      tenChucNang: 'Chuyển kho',
      description: 'Tạo và quản lý phiếu chuyển kho',
    },
    {
      tenChucNang: 'Tồn kho',
      description: 'Xem báo cáo tồn kho hiện tại',
    },
    {
      tenChucNang: 'Báo cáo',
      description: 'Xem các báo cáo thống kê',
    },
    {
      tenChucNang: 'Quản lý nhà cung cấp',
      description: 'Quản lý danh sách nhà cung cấp',
    },
    {
      tenChucNang: 'Quản lý khách hàng',
      description: 'Quản lý danh sách khách hàng',
    },
    {
      tenChucNang: 'Quản lý đơn vị vận chuyển',
      description: 'Quản lý danh sách đơn vị vận chuyển',
    },
    {
      tenChucNang: 'Cài đặt hệ thống',
      description: 'Cấu hình hệ thống, tham số',
    },
  ];

  for (const chucNang of chucNangs) {
    await prisma.chucNang.create({
      data: chucNang,
    });
  }

  console.log(`   ✓ Seeded ${chucNangs.length} functions`);
}
