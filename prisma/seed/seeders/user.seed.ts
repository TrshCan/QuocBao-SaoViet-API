import { PrismaClient, UserStatus } from '../../../generated/prisma'
import bcrypt from 'bcrypt'

export async function seedUsers(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash('Admin@123', 10)

  const users = [
    {
      id: '01234567-89ab-cdef-0123-456789abcdef',
      username: 'admin',
      fullName: 'Quản trị viên',
      role: 'admin',
      email: 'admin@saoviet.com',
      phone: '0901234567',
      password: hashedPassword,
      status: UserStatus.active,
      createdBy: 'system',
    },
    {
      id: '01234567-89ab-cdef-0123-456789abcde1',
      username: 'kho_truong',
      fullName: 'Nguyễn Văn Kho',
      role: 'warehouse_manager',
      email: 'kho@saoviet.com',
      phone: '0901234568',
      password: hashedPassword,
      status: UserStatus.active,
      createdBy: 'admin',
    },
    {
      id: '01234567-89ab-cdef-0123-456789abcde2',
      username: 'thu_kho',
      fullName: 'Trần Thị Thu',
      role: 'warehouse_staff',
      email: 'thu@saoviet.com',
      phone: '0901234569',
      password: hashedPassword,
      status: UserStatus.active,
      createdBy: 'admin',
    },
    {
      id: '01234567-89ab-cdef-0123-456789abcde3',
      username: 'ke_toan',
      fullName: 'Lê Văn Toán',
      role: 'accountant',
      email: 'ketoan@saoviet.com',
      phone: '0901234570',
      password: hashedPassword,
      status: UserStatus.active,
      createdBy: 'admin',
    },
    {
      id: '01234567-89ab-cdef-0123-456789abcde4',
      username: 'giam_doc',
      fullName: 'Phạm Minh Đạt',
      role: 'director',
      email: 'giamdoc@saoviet.com',
      phone: '0901234571',
      password: hashedPassword,
      status: UserStatus.active,
      createdBy: 'admin',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  }

  console.log(`   ✓ Seeded ${users.length} users`)
}

