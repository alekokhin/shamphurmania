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
        siteName: 'BBQ Store Georgia',
        siteDescription:
          'საქართველოში ბარბექიუ გრილების ყველაზე დიდი არჩევანი',
        contactEmail: email,
        heroTitle: 'პრემიუმ ბარბექიუ გრილები',
        heroSubtitle:
          'აღმოაჩინეთ საუკეთესო გრილები თქვენი გარე სამზარეულოსთვის',
      },
    });
    console.log('Default site settings created');
  }

  // Create default categories
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    const categories = [
      {
        name: 'გაზის გრილები',
        nameEn: 'Gas Grills',
        slug: 'gas-grills',
        order: 1,
      },
      {
        name: 'ნახშირის გრილები',
        nameEn: 'Charcoal Grills',
        slug: 'charcoal-grills',
        order: 2,
      },
      {
        name: 'ელექტრო გრილები',
        nameEn: 'Electric Grills',
        slug: 'electric-grills',
        order: 3,
      },
      {
        name: 'პელეტის გრილები',
        nameEn: 'Pellet Grills',
        slug: 'pellet-grills',
        order: 4,
      },
      {
        name: 'აქსესუარები',
        nameEn: 'Accessories',
        slug: 'accessories',
        order: 5,
      },
    ];

    for (const cat of categories) {
      await prisma.category.create({ data: cat });
    }
    console.log(`Created ${categories.length} default categories`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
