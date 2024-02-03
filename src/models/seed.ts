import { Pool } from 'pg';
import * as schema from '.';
import { drizzle } from 'drizzle-orm/node-postgres';
import { faker } from '@faker-js/faker';
import { TProductRequest } from '@api/entities';
const dbUrl = process.env['DATABASE_URL'] as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

const db = drizzle(dbQueryClient, {
  schema,
});

const seedCategories = async () => {
  const categoriesExist = await db
    .select({ id: schema.categories.id })
    .from(schema.categories);
  if (categoriesExist.length) {
    return;
  }
  console.log('Seeding categories... 🚀');
  await db
    .insert(schema.categories)
    .values([{ name: 'Electronic' }, { name: 'Fashion' }, { name: 'Sport' }]);
  console.log('Seeding categories done! 🎊');
};

const seedProducts = async () => {
  const data: TProductRequest[] = [];
  const categories = await db
    .select({ id: schema.categories.id })
    .from(schema.categories);
  if (!categories.length) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    const newData: TProductRequest = {
      name: faker.commerce.productName(),
      price: String(Number(faker.finance.amount({ dec: 0 })) * 1000),
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
    };
    data.push(newData);
  }

  console.log('Seeding products... ');
  data.forEach(async (data) => {
    await db.insert(schema.products).values(data).returning({
      id: schema.products.id,
    });
  });
  console.log('Seeding products done! ');
};

const main = async () => {
  try {
    await seedCategories();
    await seedProducts();
  } catch (error) {
    console.log(error);
  }
};

main();
