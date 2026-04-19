import { PrismaClient, Role, Language, UserStatus } from '../src/generated/prisma';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding auth database (5 initial users)...');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  const usersToCreate = [
    {
      id: uuidv4(),
      email: 'admin@fairgig.com',
      phone: '+923000000001',
      name: 'System Admin',
      passwordHash,
      role: Role.admin as Role,
      language: Language.en as Language,
      status: UserStatus.active as UserStatus,
    },
    {
      id: uuidv4(),
      email: 'advocate@fairgig.com',
      phone: '+923000000002',
      name: 'Union Advocate',
      passwordHash,
      role: Role.advocate as Role,
      language: Language.ur as Language,
      status: UserStatus.active as UserStatus,
    },
    {
      id: uuidv4(),
      email: 'verifier@fairgig.com',
      phone: '+923000000003',
      name: 'Data Verifier',
      passwordHash,
      role: Role.verifier as Role,
      language: Language.en as Language,
      status: UserStatus.active as UserStatus,
    },
    {
      id: uuidv4(),
      email: 'worker1@fairgig.com',
      phone: '+923000000004',
      name: 'Ali Khan',
      passwordHash,
      role: Role.worker as Role,
      language: Language.ur as Language,
      status: UserStatus.active as UserStatus,
      categories: ['Ride-hailing']
    },
    {
      id: uuidv4(),
      email: 'worker2@fairgig.com',
      phone: '+923000000005',
      name: 'Sara Ahmed',
      passwordHash,
      role: Role.worker as Role,
      language: Language.ur as Language,
      status: UserStatus.active as UserStatus,
      categories: ['Delivery']
    }
  ];

  for (const u of usersToCreate) {
    const createdUser = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
    console.log(`Created user: ${createdUser.name} (${createdUser.email} - ${createdUser.role})`);
  }

  console.log('Seeding complete. Use password "Password123!" to sign in.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
