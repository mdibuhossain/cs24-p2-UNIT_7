import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs/dist/bcrypt.js";

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
  const salt = bcrypt.genSaltSync(3);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", salt),
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
