import z from 'zod/v4';

export const createReceiptItemSchema = z.object({
  sanPhamId: z.string().min(1, 'Mã sản phẩm là bắt buộc'),
  soLuong: z
    .string()
    .min(1, 'Số lượng là bắt buộc')
    .regex(/^\d+(\.\d+)?$/, 'Số lượng phải là số hợp lệ'),
  donGia: z
    .string()
    .regex(/^\d+(\.\d+)?$/, 'Đơn giá phải là số hợp lệ')
    .optional(),
  soLo: z.string().max(100, 'Số lô không được vượt quá 100 ký tự').optional(),
  hanSuDung: z
    .string()
    .datetime('Hạn sử dụng phải là định dạng datetime hợp lệ')
    .optional(),
  soSerial: z
    .string()
    .max(100, 'Số serial không được vượt quá 100 ký tự')
    .optional(),
});

export const createReceiptSchema = z.object({
  khoId: z.string().min(1, 'Mã kho là bắt buộc'),
  ghiChu: z
    .string()
    .max(255, 'Ghi chú không được vượt quá 255 ký tự')
    .optional(),
  items: z
    .array(createReceiptItemSchema)
    .min(1, 'Danh sách hàng nhập không được rỗng'),
});
