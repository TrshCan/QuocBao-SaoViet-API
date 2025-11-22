# Database Seeding

This directory contains seed data for the SAOVIET Warehouse Management System.

## Structure

```txt
seed/
├── seed.ts                          # Main seed orchestrator
├── tsconfig.json                    # TypeScript configuration
├── seeders/                         # Individual seeder modules
│   ├── user.seed.ts                 # User accounts (5 users with different roles)
│   ├── don-vi-tinh.seed.ts          # Units of measurement (20 units)
│   ├── kho.seed.ts                  # Warehouses (5 locations)
│   ├── vi-tri-kho.seed.ts           # Warehouse locations (750 positions)
│   ├── san-pham.seed.ts             # Products (20 products across categories)
│   ├── nha-cung-cap.seed.ts         # Suppliers (8 suppliers)
│   ├── khach-hang.seed.ts           # Customers (10 customers)
│   ├── don-vi-chuyen.seed.ts        # Shipping units (7 carriers)
│   ├── chuc-nang.seed.ts            # System functions (12 functions)
│   ├── phan-quyen.seed.ts           # Permissions (role-based)
│   ├── trang-thai.seed.ts           # Status tables
│   └── phieu-nhap-kho.seed.ts       # Sample inbound receipts
```

## Seeded Data Summary

### Users (5)

- **admin** - Full system access (Admin@123)
- **kho_truong** - Warehouse manager (Admin@123)
- **thu_kho** - Warehouse staff (Admin@123)
- **ke_toan** - Accountant (Admin@123)
- **giam_doc** - Director (Admin@123)

### Master Data

- **20 Units** - Cái, Hộp, Thùng, Kg, Lít, Bao, Chai, etc.
- **5 Warehouses** - Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng
- **750 Locations** - 5 areas × 3 rows × 10 shelves per warehouse
- **20 Products** - Electronics, Office supplies, Food, Chemicals, Tools, Medical
- **8 Suppliers** - Various Vietnamese suppliers
- **10 Customers** - Individual and corporate customers
- **7 Shipping Units** - GHN, GHTK, Viettel Post, VNPost, J&T, Ninja Van, Kerry

### System Configuration

- **12 Functions** - User management, Warehouse, Products, Inbound, Outbound, Transfer, Inventory, Reports, etc.
- **Role-based Permissions** - Configured for all 5 user roles
- **Status Tables** - Export statuses (5) and Transfer statuses (6)

### Transaction Data

- **3 Inbound Receipts** - 2 completed, 1 draft
- **Inventory Records** - Auto-generated from completed receipts

## Usage

### Run All Seeds

```bash
# Using npm
npm run db:seed

# Using yarn
yarn db:seed

# Using Prisma directly
npx prisma db seed
```

### Reset Database and Seed

```bash
# Reset database (WARNING: Deletes all data)
npm run db:reset

# This will automatically run migrations and seeds
```

### Development Setup

```bash
# Start services, generate Prisma client, and seed database
npm run dev:setup
```

## Features

### Data Characteristics

- ✅ **Realistic Vietnamese data** - Names, addresses, phone numbers
- ✅ **Proper relationships** - Foreign keys correctly linked
- ✅ **Product variants** - Different tracking modes (serial, lot, expiry)
- ✅ **Role-based permissions** - Realistic access control
- ✅ **Sample transactions** - Inbound receipts with inventory updates
- ✅ **Multi-warehouse** - 5 locations across Vietnam
- ✅ **Comprehensive locations** - 750 warehouse positions

### Tracking Features Demonstrated

- **Serial tracking** - Laptops, monitors, thermometers
- **Lot tracking** - Paper, pens, rice, cement
- **Expiry tracking** - Food items, chemicals, medical supplies
- **Combination** - Rice (lot + expiry), Masks (lot + expiry)

## Database Cleaning

The seed script includes automatic database cleaning before seeding. This ensures a fresh start each time. The cleaning respects foreign key constraints and deletes in the correct order:

1. Permissions
2. Transfer/Export receipts and details
3. Inbound receipts and details
4. Inventory records
5. Products
6. Warehouse locations
7. Master data (units, warehouses, suppliers, customers, etc.)
8. Users

## Customization

### Adding New Seed Data

1. Create a new seeder file in `seeders/` directory:

```typescript
// seeders/my-entity.seed.ts
import { PrismaClient } from '@prisma/client'

export async function seedMyEntity(prisma: PrismaClient) {
  const entities = [
    // your data here
  ]

  for (const entity of entities) {
    await prisma.myEntity.create({
      data: entity,
    })
  }

  console.log(`   ✓ Seeded ${entities.length} entities`)
}
```

2. Import and call in `seed.ts`:

```typescript
import { seedMyEntity } from './seeders/my-entity.seed'

// In main() function
await seedMyEntity(prisma)
```

### Modifying Existing Data

Edit the respective seeder file in the `seeders/` directory and run `npm run db:seed` again.

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"

Run Prisma client generation:

```bash
npm run db:generate
```

### Error: Foreign key constraint fails

Ensure seeders are called in the correct order in `seed.ts`. Master data must be seeded before dependent data.

### Error: Unique constraint violation

The seed script uses `upsert` for users to prevent duplicates. If you get unique constraint errors:

1. Reset the database: `npm run db:reset`
2. Or manually clean the database before seeding

## Default Login Credentials

All users have the same password: **Admin@123**

| Username   | Role               | Email                  |
|------------|--------------------|------------------------|
| admin      | admin              | <admin@saoviet.com>      |
| kho_truong | warehouse_manager  | <kho@saoviet.com>        |
| thu_kho    | warehouse_staff    | <thu@saoviet.com>        |
| ke_toan    | accountant         | <ketoan@saoviet.com>     |
| giam_doc   | director           | <giamdoc@saoviet.com>    |

⚠️ **Security Note**: Change these passwords in production!

## License

Internal use only - SAOVIET Project
