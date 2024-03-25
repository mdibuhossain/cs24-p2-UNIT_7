import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

async function main() {
  const email = "admin@admin.com";
  const findUser = await prisma.user.findUnique({
    where: { email },
  });
  if (findUser) {
    return;
  }
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: "admin",
      role: Role.SYSTEM_ADMIN,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });

export default prisma;
