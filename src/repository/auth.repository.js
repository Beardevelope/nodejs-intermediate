import { prisma } from '../../utils/prisma/index.js';

export default class AuthRepository {
  findUserByEmail = async (email) => {
    const existedUser = await prisma.User.findUnique({ where: { email } });
    return existedUser;
  };

  createUser = async ({ email, password, name }) => {
    return prisma.User.create({
      data: { email, password, name },
    });
  };
}
