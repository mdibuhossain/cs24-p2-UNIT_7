import { PrismaClient, RoleList } from "@prisma/client";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

async function main() {
  const roles = await prisma.role.findMany();
  if (!(roles.length > 0)) {
    await prisma.role.createMany({
      data: [
        { title: RoleList.SYSTEM_ADMIN },
        { title: RoleList.STS_MANAGER },
        { title: RoleList.LANDFILL_MANAGER },
        { title: RoleList.UNASSIGNED },
      ],
    });
  }

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
      role: RoleList.SYSTEM_ADMIN,
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
