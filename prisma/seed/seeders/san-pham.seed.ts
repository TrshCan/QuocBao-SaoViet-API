import { PrismaClient } from '../../../generated/prisma';

export async function seedSanPham(prisma: PrismaClient) {
  const donViTinhs = await prisma.donViTinh.findMany();

  // Get specific units
  const cai = donViTinhs.find((d) => d.ten === 'Cái');
  const hop = donViTinhs.find((d) => d.ten === 'Hộp');
  const thung = donViTinhs.find((d) => d.ten === 'Thùng');
  const kg = donViTinhs.find((d) => d.ten === 'Kg');
  const lit = donViTinhs.find((d) => d.ten === 'Lít');
  const bao = donViTinhs.find((d) => d.ten === 'Bao');
  const bo = donViTinhs.find((d) => d.ten === 'Bộ');

  const sanPhams = [
    // Thiết bị điện tử
    {
      maSanPham: 'SP-0001',
      tenSanPham: 'Laptop Dell Latitude 5520',
      nhom: 'Thiết bị điện tử',
      moTa: 'Laptop văn phòng, CPU i5, RAM 8GB',
      donViTinhId: cai!.id,
      quanLySerial: true,
    },
    {
      maSanPham: 'SP-0002',
      tenSanPham: 'Màn hình Samsung 24 inch',
      nhom: 'Thiết bị điện tử',
      moTa: 'Màn hình Full HD, tần số 75Hz',
      donViTinhId: cai!.id,
      quanLySerial: true,
    },
    {
      maSanPham: 'SP-0003',
      tenSanPham: 'Bàn phím cơ Logitech',
      nhom: 'Thiết bị điện tử',
      moTa: 'Bàn phím cơ RGB, switch blue',
      donViTinhId: cai!.id,
    },

    // Văn phòng phẩm
    {
      maSanPham: 'SP-0004',
      tenSanPham: 'Giấy A4 Double A',
      nhom: 'Văn phòng phẩm',
      moTa: 'Giấy A4 70gsm, 500 tờ/ram',
      donViTinhId: thung!.id,
      quanLyLo: true,
    },
    {
      maSanPham: 'SP-0005',
      tenSanPham: 'Bút bi Thiên Long',
      nhom: 'Văn phòng phẩm',
      moTa: 'Bút bi TL-079, mực xanh',
      donViTinhId: hop!.id,
      quanLyLo: true,
    },
    {
      maSanPham: 'SP-0006',
      tenSanPham: 'Sổ tay bìa da',
      nhom: 'Văn phòng phẩm',
      moTa: 'Sổ tay A5, 200 trang',
      donViTinhId: cai!.id,
    },

    // Nguyên liệu thực phẩm
    {
      maSanPham: 'SP-0007',
      tenSanPham: 'Gạo ST25',
      nhom: 'Thực phẩm',
      moTa: 'Gạo thơm đặc sản Sóc Trăng, bán theo kg',
      donViTinhId: kg!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
    {
      maSanPham: 'SP-0008',
      tenSanPham: 'Dầu ăn Neptune',
      nhom: 'Thực phẩm',
      moTa: 'Dầu đậu nành, bán theo lít',
      donViTinhId: lit!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
    {
      maSanPham: 'SP-0009',
      tenSanPham: 'Đường trắng Biên Hòa',
      nhom: 'Thực phẩm',
      moTa: 'Đường tinh luyện, bán theo kg',
      donViTinhId: kg!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },

    // Hóa chất
    {
      maSanPham: 'SP-0010',
      tenSanPham: 'Nước rửa tay diệt khuẩn',
      nhom: 'Hóa chất',
      moTa: 'Gel rửa tay khô, bán theo lít',
      donViTinhId: lit!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
    {
      maSanPham: 'SP-0011',
      tenSanPham: 'Nước tẩy rửa đa năng',
      nhom: 'Hóa chất',
      moTa: 'Tẩy rửa bề mặt, bán theo lít',
      donViTinhId: lit!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },

    // Dụng cụ
    {
      maSanPham: 'SP-0012',
      tenSanPham: 'Bộ dụng cụ sửa chữa',
      nhom: 'Dụng cụ',
      moTa: 'Bộ 25 món vặn vít, kìm, búa',
      donViTinhId: bo!.id,
    },
    {
      maSanPham: 'SP-0013',
      tenSanPham: 'Thang nhôm 6 bậc',
      nhom: 'Dụng cụ',
      moTa: 'Thang gấp đa năng, chịu tải 150kg',
      donViTinhId: cai!.id,
    },

    // Vật liệu xây dựng
    {
      maSanPham: 'SP-0014',
      tenSanPham: 'Xi măng PCB40',
      nhom: 'Vật liệu xây dựng',
      moTa: 'Xi măng xây dựng, bao 50kg',
      donViTinhId: bao!.id,
      quanLyLo: true,
    },
    {
      maSanPham: 'SP-0015',
      tenSanPham: 'Sơn nước Dulux',
      nhom: 'Vật liệu xây dựng',
      moTa: 'Sơn nước nội thất, thùng 18 lít',
      donViTinhId: thung!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },

    // Đồ uống
    {
      maSanPham: 'SP-0016',
      tenSanPham: 'Nước suối Aquafina',
      nhom: 'Đồ uống',
      moTa: 'Nước tinh khiết, chai 500ml',
      donViTinhId: thung!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
    {
      maSanPham: 'SP-0017',
      tenSanPham: 'Cà phê Trung Nguyên G7',
      nhom: 'Đồ uống',
      moTa: 'Cà phê hòa tan 3in1, hộp 21 gói',
      donViTinhId: hop!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },

    // Y tế
    {
      maSanPham: 'SP-0018',
      tenSanPham: 'Khẩu trang y tế',
      nhom: 'Y tế',
      moTa: 'Khẩu trang 4 lớp kháng khuẩn',
      donViTinhId: hop!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
    {
      maSanPham: 'SP-0019',
      tenSanPham: 'Nhiệt kế điện tử',
      nhom: 'Y tế',
      moTa: 'Nhiệt kế đo trán, không tiếp xúc',
      donViTinhId: cai!.id,
      quanLySerial: true,
    },
    {
      maSanPham: 'SP-0020',
      tenSanPham: 'Băng gạc vô trùng',
      nhom: 'Y tế',
      moTa: 'Băng gạc y tế, cuộn 5cm x 5m',
      donViTinhId: hop!.id,
      quanLyLo: true,
      quanLyHSD: true,
    },
  ];

  for (const sanPham of sanPhams) {
    await prisma.sanPham.create({
      data: {
        ...sanPham,
        createdBy: 'system',
      },
    });
  }

  console.log(`   ✓ Seeded ${sanPhams.length} products`);
}
