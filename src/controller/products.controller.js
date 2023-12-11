import ProductsService from '../service/products.service.js';

export default class ProductController {
  productsService = new ProductsService();

  createProduct = async (req, res) => {
    try {
      const { title, description } = req.body;
      const { id: userId, name: userName } = res.locals.user;
      if (!title) {
        return res.status(400).json({
          success: false,
          message: '제목을 입력하세요.',
        });
      }

      if (!description) {
        return res.status(400).json({
          success: false,
          message: '설명 입력이 필요합니다.',
        });
      }
      const product = await this.productsService.createProduct({
        title,
        description,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: '게시글 업로드 성공.',
        data: { ...product, userName },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러 발생, 관리자 문의요망.',
      });
    }
  };

  getProducts = async (req, res) => {
    try {
      const { sort } = req.query;
      const products = await this.productsService.getProducts(sort);

      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공하였습니다.',
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러 발생, 관리자 문의요망',
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.getProductById(
        parseInt(productId, 10),
      );
      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의.',
      });
    }
  };

  updatedProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { title, description, status } = req.body;
      const { id: userId } = res.locals.user;

      const updatedProduct = await this.productsService.updatedProduct({
        productId: Number(productId),
        userId,
        title,
        description,
        status,
      });

      return res.status(200).json({
        success: true,
        message: '상품 수정 성공',
        data: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { id: userId } = res.locals.user;

      const deleteProduct = await this.productsService.deleteProduct(
        Number(productId),
        userId,
      );
      return res.status(200).json({
        success: true,
        message: '상품 삭제 성공',
        data: deleteProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
