import { PrismaClient } from '@prisma/client';
import { categories, categoryMovie, movies } from './data';

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: {
          name: category.name,
        },
      }),
    ),
  );

  // await Promise.all(
  //   movies.map((movie) =>
  //     prisma.movie.upsert({
  //       where: {
  //         id: movie.id,
  //       },
  //       update: {},
  //       create: movie,
  //     }),
  //   ),
  // );

  await Promise.all(
    movies.map((movie) =>
      prisma.movie.create({
        data: {
          title: movie.title,
          description: movie.description,
          rating: movie.rating,
          image: movie.image,
        },
      }),
    ),
  );

  await prisma.categoriesOnMovie.createMany({
    data: categoryMovie,
  });
}

main()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });
