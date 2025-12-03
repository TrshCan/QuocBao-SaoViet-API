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

---

## Quản lý Users (Người dùng)

### Tạo User mới

**POST** `/users`

Body (JSON):

```json
{
  "username": "nhanvien01",
  "fullName": "Nguyễn Văn A",
  "email": "nhanvien01@company.com",
  "phone": "0901234567",
  "password": "123456",
  "role": "staff",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Xem danh sách Users (có phân trang & tìm kiếm)

**GET** `/users?page=1&limit=10&search=nguyen&sortBy=createdAt&sortOrder=desc`

Query params:

| Param     | Mô tả                          | Mặc định    |
| --------- | ------------------------------ | ----------- |
| page      | Số trang                       | 1           |
| limit     | Số bản ghi/trang (max 100)     | 10          |
| search    | Tìm kiếm (username, fullName, email, phone) | |
| sortBy    | Sắp xếp theo trường            | createdAt   |
| sortOrder | Thứ tự sắp xếp (asc/desc)      | desc        |
| status    | Lọc theo trạng thái (active/inactive/banned) | |

### Xem chi tiết User

**GET** `/users/:userId`

### Cập nhật User

**PATCH** `/users/:userId`

Body (JSON):

```json
{
  "fullName": "Nguyễn Văn B",
  "email": "updated@company.com",
  "phone": "0909999999",
  "status": "inactive"
}
```

### Xóa User (soft delete)

**DELETE** `/users/:userId`

### Khôi phục User đã xóa

**PATCH** `/users/:userId/restore`

---

## Quản lý Customers (Khách hàng)

### Tạo Khách hàng mới

**POST** `/customers`

Body (JSON):

```json
{
  "code": "KH-001",
  "ten": "Công ty ABC",
  "soDienThoai": "0281234567",
  "soDienThoai2": "0909876543",
  "email": "contact@abc.com",
  "diaChi": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "loaiKhach": "Doanh nghiệp",
  "tenCongTy": "Công ty TNHH ABC"
}
```

### Xem danh sách Khách hàng (có phân trang & tìm kiếm)

**GET** `/customers?page=1&limit=10&search=abc&sortBy=createdAt&sortOrder=desc`

Query params:

| Param     | Mô tả                          | Mặc định    |
| --------- | ------------------------------ | ----------- |
| page      | Số trang                       | 1           |
| limit     | Số bản ghi/trang (max 100)     | 10          |
| search    | Fulltext search (tên, mã, sđt, email, địa chỉ, công ty) | |
| sortBy    | Sắp xếp theo trường            | createdAt   |
| sortOrder | Thứ tự sắp xếp (asc/desc)      | desc        |
| loaiKhach | Lọc theo loại khách hàng       |             |

### Xem chi tiết Khách hàng

**GET** `/customers/:customerId`

### Cập nhật Khách hàng

**PATCH** `/customers/:customerId`

Body (JSON):

```json
{
  "ten": "Công ty XYZ",
  "soDienThoai": "0281111111",
  "diaChi": "456 Lê Lợi, Quận 1, TP.HCM"
}
```

### Xóa Khách hàng (soft delete)

**DELETE** `/customers/:customerId`

### Khôi phục Khách hàng đã xóa

**PATCH** `/customers/:customerId/restore`

---

## Quản lý Suppliers (Nhà cung cấp)

### Tạo Nhà cung cấp mới

**POST** `/suppliers`

Body (JSON):

```json
{
  "tenNhaCungCap": "Công ty Cung ứng ABC",
  "diaChi": "789 Trần Hưng Đạo, Quận 5, TP.HCM",
  "nguoiLienHe": "Nguyễn Văn C",
  "soDienThoai": "0287654321"
}
```

### Xem danh sách Nhà cung cấp (có phân trang & tìm kiếm)

**GET** `/suppliers?page=1&limit=10&search=cung%20ung&sortBy=createdAt&sortOrder=desc`

Query params:

| Param     | Mô tả                          | Mặc định    |
| --------- | ------------------------------ | ----------- |
| page      | Số trang                       | 1           |
| limit     | Số bản ghi/trang (max 100)     | 10          |
| search    | Fulltext search (tên, địa chỉ, người liên hệ, sđt) | |
| sortBy    | Sắp xếp theo trường            | createdAt   |
| sortOrder | Thứ tự sắp xếp (asc/desc)      | desc        |

### Xem chi tiết Nhà cung cấp

**GET** `/suppliers/:supplierId`

### Cập nhật Nhà cung cấp

**PATCH** `/suppliers/:supplierId`

Body (JSON):

```json
{
  "tenNhaCungCap": "Công ty Cung ứng XYZ",
  "nguoiLienHe": "Trần Văn D",
  "soDienThoai": "0289999999"
}
```

### Xóa Nhà cung cấp (soft delete)

**DELETE** `/suppliers/:supplierId`

### Khôi phục Nhà cung cấp đã xóa

**PATCH** `/suppliers/:supplierId/restore`

---

## Response Format

### Thành công (Success)

```json
{
  "message": "Operation successful",
  "metadata": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Lỗi (Error)

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## Lưu ý

1. **Thứ tự bắt buộc**: Phải tạo Units → Warehouses → Products trước khi tạo Receipts
2. **ID**: Lưu lại các `id` từ response để dùng cho các API tiếp theo
3. **Số lượng**: Dùng định dạng string với Decimal (ví dụ: `"10.000"`)
4. **Ngày tháng**: Format ISO 8601 (ví dụ: `"2025-12-31"`)
5. **Phân trang**: Tất cả API list đều hỗ trợ pagination với `page`, `limit`
6. **Tìm kiếm**: Sử dụng `search` param để fulltext search (case-insensitive)
7. **Soft Delete**: Xóa mềm - dữ liệu không bị xóa vĩnh viễn, có thể khôi phục bằng API restore
