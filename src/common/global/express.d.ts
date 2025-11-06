import 'express';
import { RoleType, RoleScope } from '@/types/role';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        fullName: string;
        role: RoleType;
        roleScope: RoleScope;
        permissions: string[];
      };
      resource?: any; // For resource ownership validation
      changeReason?: string; // For audit trail
      auditAction?: string; // For audit logging

      // For file
      file?: Express.Multer.File;
    }
  }
}
