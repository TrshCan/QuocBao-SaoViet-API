 # Hướng dẫn test API bằng Postman

## Base URL
```
http://localhost:3000/api
```

## Thứ tự test (theo dependency)

### Bước 1: Tạo Đơn vị tính (Units)
**POST** `/units`

Body (JSON):
```json
{
  "ten": "Cái",
  "moTa": "Đơn vị tính cái"
}
```

**Lưu lại `id` từ response** (ví dụ: `id: 1`)

---

### Bước 2: Tạo Kho (Warehouses)
**POST** `/warehouses`

Body (JSON):
```json
{
  "maKho": "KHO-001",
  "tenKho": "Kho chính",
  "diaChi": "123 Đường ABC, Quận 1, TP.HCM",
  "dienTich": "500.00"
}
```

**Lưu lại `id` từ response** (ví dụ: `id: 1`)

---

### Bước 3: Tạo Sản phẩm (Products)
**POST** `/products`

Body (JSON):
```json
{
  "maSanPham": "SP-001",
  "tenSanPham": "Sản phẩm mẫu",
  "nhom": "Nhóm A",
  "moTa": "Mô tả sản phẩm",
  "donViTinhId": 1,
  "quanLyLo": false,
  "quanLyHSD": false,
  "quanLySerial": false
}
```

**Lưu lại `id` từ response** (ví dụ: `id: 1`)

---

### Bước 4: Tạo Phiếu nhập kho (Receipts)
**POST** `/receipts`

Body (JSON):
```json
{
  "khoId": 1,
  "ghiChu": "Nhập hàng lần đầu",
  "items": [
    {
      "sanPhamId": 1,
      "soLuong": "10.000",
      "donGia": "100000",
      "soLo": null,
      "hanSuDung": null,
      "soSerial": null
    }
  ]
}
```

**Lưu lại `id` từ response** (ví dụ: `id: 1`)

---

### Bước 5: Xem chi tiết phiếu nhập
**GET** `/receipts/:id`

Ví dụ: `GET /receipts/1`

---

### Bước 6: Xác nhận nhập kho (Validate)
**PUT** `/receipts/:id/validate`

Ví dụ: `PUT /receipts/1/validate`

Sau khi validate, phiếu sẽ chuyển sang trạng thái `DONE` và tồn kho sẽ được cập nhật.

---

## API bổ sung (xem danh sách)

### Xem danh sách Kho
**GET** `/warehouses`

### Xem danh sách Đơn vị tính
**GET** `/units`

### Xem danh sách Sản phẩm
**GET** `/products`

### Xem danh sách Phiếu nhập kho
**GET** `/receipts`

---

## Lưu ý

1. **Thứ tự bắt buộc**: Phải tạo Units → Warehouses → Products trước khi tạo Receipts
2. **ID**: Lưu lại các `id` từ response để dùng cho các API tiếp theo
3. **Số lượng**: Dùng định dạng string với Decimal (ví dụ: `"10.000"`)
4. **Ngày tháng**: Format ISO 8601 (ví dụ: `"2025-12-31"`)

