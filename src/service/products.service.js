import ProductsRepository from '../repository/products.repository.js';

export default class ProductService {
  productsRepository = new ProductsRepository();

  createProduct = async ({ title, description, userId }) => {
    return this.productsRepository.createProduct({
      title,
      description,
      userId,
    });
  };

  getProducts = async (sort) => {
    return await this.productsRepository.getProducts(sort);
  };

  getProductById = async (productId) => {
    return this.productsRepository.getProductById(productId);
  };

  updatedProduct = async ({
    productId,
    userId,
    title,
    description,
    status,
  }) => {
    // 데이터베이스에서 상품 조회
    const product = await this.productsRepository.getProductById(productId);

    if (!product) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }

    // 작성자 확인
    const isProductOwner = product.userId === userId;
    if (!isProductOwner) {
      return {
        success: false,
        message: '상품 수정 권한이 없습니다',
      };
    }

    // 수정 정보 확인
    if (!title && !description && !status) {
      return {
        success: false,
        message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
      };
    }

    const updatedProduct = await this.productsRepository.updatedProduct({
      productId: Number(productId),
      userId,
      title,
      description,
      status,
    });
    return {
      success: true,
      data: updatedProduct,
    };
  };

  deleteProduct = async (productId, userId) => {
    const product = await this.productsRepository.getProductById(productId);

    if (!product) {
      return {
        success: false,
        message: '이미 삭제된 상품입니다.',
      };
    }
    // 작성자 확인
    const isProductOwner = product.userId === userId;
    if (!isProductOwner) {
      return {
        success: false,
        message: '상품 수정 권한이 없습니다',
      };
    }

    const deleteProduct = await this.productsRepository.deleteProduct({
      productId: Number(productId),
      userId,
    });
    return {
      success: true,
      data: deleteProduct,
    };
  };
}
