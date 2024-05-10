import { PrismaClient, RoleType } from "@prisma/client";
import { encryptPass } from "../utils/utils.js";

const prisma = new PrismaClient({
  log: ["error"],
});

async function main() {
  try {
    const roles = await prisma.role.findMany();
    if (!(roles?.length > 0)) {
      await prisma.role.createMany({
        data: [
          { title: RoleType.SYSTEM_ADMIN },
          { title: RoleType.STS_MANAGER },
          { title: RoleType.LANDFILL_MANAGER },
          { title: RoleType.UNASSIGNED },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
  try {
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
        password: encryptPass("admin"),
        role: RoleType.SYSTEM_ADMIN,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });

export default prisma;
