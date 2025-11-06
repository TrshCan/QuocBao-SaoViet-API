// Export role definitions for consistency - Updated with new role structure
export const ROLE_DEFINITIONS = {
  SUPER_ADMIN: 'super_admin',
  COMPANY_ADMIN: 'company_admin',
  ASC_ADMIN: 'asc_admin',
  ASC_COORDINATOR: 'asc_coordinator',
  ASC_TECHNICIAN: 'asc_technician',
  ASC_WAREHOUSE: 'asc_warehouse',
  ASC_ACCOUNTANT: 'asc_accountant',
  ASC_MANAGER: 'asc_manager',
  // Legacy roles for backward compatibility
  ASC_EMPLOYEE: 'asc_employee',
  GENERAL_WAREHOUSE_MANAGER: 'general_warehouse_manager',
  ADMIN_LEVEL_1: 'admin_level_1',
  COMPANY_CUSTOMER_SERVICE: 'company_customer_service',
  CALL_CENTER: 'call_center',
} as const;
