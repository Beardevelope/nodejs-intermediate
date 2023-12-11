import { prisma } from '../../utils/prisma/index.js';

export default class ProductsRepository {
  createProduct = async ({ title, description, userId }) => {
    const product = await prisma.Product.create({
      data: { title, description, userId },
    });
    return product;
  };
  getProducts = async (sort) => {
    const products = await prisma.Product.findMany({
      orderBy: {
        createdAt: sort === 'ASC' ? 'asc' : 'desc',
      },
    });
    return products;
  };

  getProductById = async (productId) => {
    return prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });
  };

  updatedProduct = async ({
    productId,
    userId,
    title,
    description,
    status,
  }) => {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        status,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return updatedProduct;
  };

  deleteProduct = async ({ productId, userId, title, description, status }) => {
    const deleteProduct = await prisma.Product.delete({
      where: {
        id: productId,
        userId: userId,
      },
    });
    return deleteProduct;
  };
}
