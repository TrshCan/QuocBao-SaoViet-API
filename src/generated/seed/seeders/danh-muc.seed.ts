import { PrismaClient } from '@/generated/prisma/client';

export async function seedDanhMuc(prisma: PrismaClient) {
    const danhMucs = [
        {
            maDanhMuc: 'DM-001',
            tenDanhMuc: 'Điện tử',
            moTa: 'Các sản phẩm điện tử, linh kiện điện tử',
            thuTu: 1,
        },
        {
            maDanhMuc: 'DM-002',
            tenDanhMuc: 'Điện lạnh',
            moTa: 'Máy lạnh, tủ lạnh, quạt điện',
            thuTu: 2,
        },
        {
            maDanhMuc: 'DM-003',
            tenDanhMuc: 'Điện gia dụng',
            moTa: 'Thiết bị điện gia dụng',
            thuTu: 3,
        },
        {
            maDanhMuc: 'DM-004',
            tenDanhMuc: 'Phụ kiện',
            moTa: 'Phụ kiện điện thoại, máy tính',
            thuTu: 4,
        },
        {
            maDanhMuc: 'DM-005',
            tenDanhMuc: 'Linh kiện máy tính',
            moTa: 'Linh kiện, phụ kiện máy tính',
            thuTu: 5,
        },
        {
            maDanhMuc: 'DM-006',
            tenDanhMuc: 'Điện thoại',
            moTa: 'Điện thoại di động và phụ kiện',
            thuTu: 6,
        },
        {
            maDanhMuc: 'DM-007',
            tenDanhMuc: 'Thiết bị văn phòng',
            moTa: 'Máy in, máy scan, máy photocopy',
            thuTu: 7,
        },
        {
            maDanhMuc: 'DM-008',
            tenDanhMuc: 'Đồ gia dụng',
            moTa: 'Dụng cụ, thiết bị gia dụng',
            thuTu: 8,
        },
        {
            maDanhMuc: 'DM-009',
            tenDanhMuc: 'Thiết bị mạng',
            moTa: 'Router, switch, thiết bị mạng',
            thuTu: 9,
        },
        {
            maDanhMuc: 'DM-010',
            tenDanhMuc: 'Camera & An ninh',
            moTa: 'Camera giám sát, thiết bị an ninh',
            thuTu: 10,
        },
    ];

    for (const danhMuc of danhMucs) {
        await prisma.danhMuc.create({
            data: {
                ...danhMuc,
                createdBy: 'system',
            },
        });
    }

    console.log(`   ✓ Seeded ${danhMucs.length} categories`);
}
