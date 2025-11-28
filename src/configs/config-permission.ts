import { RolesType } from '@/types/role';
import { Roles as RolesEnum } from '@/common/enums/roles';
// Permission definitions for granular access control based on use case matrix
export const PERMISSIONS = {
  // Cost Reports (Báo cáo chi phí) - asc_manager should NOT have access
  'reports.cost.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'reports.cost.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Model Error Reports (Báo cáo Model nhiều lỗi) - More accessible than cost reports
  'reports.model_error.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'reports.model_error.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],

  // Category Error Reports (Báo cáo lỗi theo danh mục) - RESTRICTED ACCESS ONLY
  'reports.category_error.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'reports.category_error.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],

  // Department Error Reports (Báo cáo lỗi theo nơi mua) - RESTRICTED ACCESS ONLY
  'reports.department_error.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'reports.department_error.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  // AS Service Reports (Báo cáo dịch vụ AS)
  'reports.as_service.read': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'reports.as_service.export': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Accessory Reports (Báo cáo linh kiện)
  'reports.accessory.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'reports.accessory.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Total Warehouse stock export (Kho tổng)
  'reports.total_warehouse.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],

  // Sub-warehouse (ASC) stock export
  'reports.sub_warehouse.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  // New permission name aligned with ascCenter export route
  'reports.asc_center.export': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // User management (Người dùng)
  'users.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'users.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'users.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'users.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'users.assign_roles': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Repair case management (Phiếu sửa chữa) - Enhanced granular permissions
  'repair_cases.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'repair_cases.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
  ],
  'repair_cases.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'repair_cases.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'repair_cases.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'repair_cases.assign': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'repair_cases.status_change': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'repair_cases.history': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
  ],
  'repair_cases.parts_supply': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'repair_cases.parts_update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'repair_cases.images_upload': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'repair_cases.images_update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'repair_cases.cost_view': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
  ],
  'repair_cases.cost_edit': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'repair_cases.warranty_cost_override': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],

  // Customer management (Khách hàng)
  'customers.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'customers.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
  ],
  'customers.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
  ],
  'customers.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // General Warehouse Management (Quản lý kho tổng) - Company level only
  'warehouse.general.parts.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],
  'warehouse.general.parts.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warehouse.general.parts.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],
  'warehouse.general.parts.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],

  // ASC Warehouse Management (Quản lý kho ASC) - Center level
  'warehouse.asc.inventory.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warehouse.asc.inventory.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.transfer.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.transfer.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.return.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.stock_adjust': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],

  // Legacy inventory permissions (for backward compatibility)
  'inventory.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'inventory.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'inventory.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'inventory.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'inventory.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'inventory.stock_adjust': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],

  // Purchase orders
  'purchase_orders.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'purchase_orders.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'purchase_orders.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'purchase_orders.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Accessory requests
  'accessory_requests.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'accessory_requests.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'accessory_requests.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'accessory_requests.bulk_create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'accessory_requests.partial_approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],

  // Broadcast notifications
  'broadcasts.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'broadcasts.read': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'broadcasts.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'broadcasts.stats': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Warranty Centers (Trung tâm bảo hành) - Distinct from warranty operations
  'warranty_centers.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'warranty_centers.read': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'warranty_centers.update': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'warranty_centers.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Warranty management (operations)
  'warranty.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warranty.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warranty.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warranty.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'warranty.register': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warranty.transfer': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'warranty.void': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'warranty.escalate': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],

  // Financial operations
  'finance.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'finance.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
  ],
  'finance.approve': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Appointments
  'appointments.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'appointments.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'appointments.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'appointments.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // System administration
  'system.configure': [RolesEnum.SUPER_ADMIN],
  'system.backup': [RolesEnum.SUPER_ADMIN],
  'system.logs': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'system.users_manage': [RolesEnum.SUPER_ADMIN],

  // Product Categories (Sản phẩm) - Separate from models
  'products.categories.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'products.categories.read': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'products.categories.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'products.categories.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],

  // Models - Enhanced with proper role access
  'models.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'models.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'models.update': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'models.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Legacy admin data management (for backward compatibility)
  'admin.categories.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.categories.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.categories.update': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.categories.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.models.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.models.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'admin.models.update': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.models.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.error_phenomena.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.error_phenomena.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.error_phenomena.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.error_phenomena.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.reasons.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.reasons.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.reasons.update': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.reasons.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.purchase_locations.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.purchase_locations.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
  ],
  'admin.purchase_locations.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.purchase_locations.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.solutions.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.solutions.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.solutions.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.solutions.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Admin repair case management permissions
  'admin.repair_cases.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.CALL_CENTER,
  ],
  'admin.repair_cases.transfer': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.repair_cases.quotation': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.repair_cases.satisfaction': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'admin.repair_cases.assessment': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'admin.repair_cases.assign': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Admin technician management permissions
  'admin.technicians.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.technicians.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.technicians.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.technicians.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],

  // Admin area management permissions
  'admin.areas.create': [RolesEnum.SUPER_ADMIN],
  'admin.areas.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.areas.update': [RolesEnum.SUPER_ADMIN],
  'admin.areas.delete': [RolesEnum.SUPER_ADMIN],

  // Admin employee management permissions
  'admin.employees.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.employees.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.employees.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.employees.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.asc_centers.create': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.asc_centers.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'admin.asc_centers.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.asc_centers.delete': [RolesEnum.SUPER_ADMIN, RolesEnum.COMPANY_ADMIN],
  'admin.inventory.purchase_orders': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.inventory.distributions': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
  ],
  'admin.inventory.returns': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.system.analytics': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],
  'admin.system.reports': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Add new permissions to PERMISSIONS object:

  // Sub-Warehouse Management - More granular
  'warehouse.asc.sub_warehouses.create': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.sub_warehouses.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warehouse.asc.sub_warehouses.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.sub_warehouses.delete': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
  ],

  // Sub-Warehouse Accessory Management
  'warehouse.asc.sub_warehouses.accessories.add': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.sub_warehouses.accessories.update': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],
  'warehouse.asc.sub_warehouses.accessories.remove': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_WAREHOUSE,
  ],

  // Sub-Warehouse Stock Operations
  'warehouse.asc.sub_warehouses.stock.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.ASC_TECHNICIAN,
  ],
  'warehouse.asc.sub_warehouses.stock.transactions': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_WAREHOUSE,
  ],

  // Common data access - Updated with new role structure
  'common.read': [
    RolesEnum.SUPER_ADMIN,
    RolesEnum.COMPANY_ADMIN,
    RolesEnum.GENERAL_WAREHOUSE_MANAGER,
    RolesEnum.ADMIN_LEVEL_1,
    RolesEnum.ASC_ADMIN,
    RolesEnum.ASC_MANAGER,
    RolesEnum.ASC_COORDINATOR,
    RolesEnum.ASC_TECHNICIAN,
    RolesEnum.ASC_WAREHOUSE,
    RolesEnum.COMPANY_CUSTOMER_SERVICE,
    RolesEnum.CALL_CENTER,
  ],
} as const satisfies Record<string, RolesType[]>;
