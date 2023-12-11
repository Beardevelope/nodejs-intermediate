import AuthService from '../service/auth.service.js';
import AuthRepository from '../repository/auth.repository.js';

export default class AuthController {
  authService = new AuthService();

  signup = async (req, res) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;

      if (!email || !password || !passwordConfirm || !name) {
        throw new Error(
          '이메일, 비밀번호, 비밀번호 확인, 이름은 필수 입력 항목입니다.',
        );
      }
      const newUser = await this.authService.signup(
        email,
        password,
        passwordConfirm,
        name,
      );

      return res.status(201).json({
        success: true,
        message: '회원가입에 성공했습니다.',
        data: newUser,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        success: false,
        message:
          error.message || '서버 문제가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.signin(email, password);

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '서버 문제가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
