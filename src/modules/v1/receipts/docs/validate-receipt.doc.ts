import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const ValidateReceiptApiOperation = () => {
  return ApiOperation({
    summary: 'Validate Receipt',
    description: `
          * Xác nhận phiếu nhập kho
          * Cập nhật trạng thái từ DRAFT sang DONE
          * Cập nhật tồn kho: tăng số lượng nếu đã tồn tại, tạo mới nếu chưa có
          * Nếu phiếu đã được xác nhận (DONE) thì trả về luôn không cập nhật lại
          * Return if successful:
          * - thông tin phiếu nhập kho đã được xác nhận (bao gồm chi tiết)
          * If failed:
          * - error message (e.g., không tìm thấy phiếu nhập)
          * - error code
          * - error status
        `,
    externalDocs: {
      url: 'https://example.com',
      description: 'Xác nhận phiếu nhập kho',
    },
  });
};

export const ValidateReceiptApiParam = () => {
  return ApiParam({
    name: 'id',
    type: String,
    description: 'ID phiếu nhập kho cần xác nhận',
    example: '01234567-89ab-cdef-0123-456789abcdef',
  });
};

export const ValidateReceiptApiResponse = () => {
  return ApiResponse({
    status: 200,
    description: 'Phiếu nhập kho đã được xác nhận thành công',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Phiếu nhập kho đã được xác nhận thành công',
        },
        metadata: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            soPhieu: { type: 'string' },
            khoId: { type: 'string' },
            ngayNhap: { type: 'string', format: 'date-time' },
            ghiChu: { type: 'string', nullable: true },
            trangThai: { type: 'string', enum: ['DONE'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            chiTiet: {
              type: 'array',
              description: 'Danh sách chi tiết nhập kho',
              items: { type: 'object' },
            },
          },
        },
      },
    },
  });
};
