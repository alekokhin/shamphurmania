import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      hashedPassword,
      name: 'Admin',
    },
  });

  console.log(`Admin user created/found: ${admin.email}`);

  // Create default site settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        siteName: 'შამფურმანია',
        siteDescription:
          'შამფურები, გრილები და ბარბექიუს აქსესუარები საქართველოში',
        contactEmail: email,
        heroTitle: 'პრემიუმ შამფურები და გრილები',
        heroSubtitle:
          'აღმოაჩინეთ საუკეთესო შამფურები, გრილები და ბარბექიუს აქსესუარები',
      },
    });
    console.log('Default site settings created');
  }

}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
