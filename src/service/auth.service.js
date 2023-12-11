import { prisma } from '../../utils/prisma/index.js';
import AuthRepository from '../repository/auth.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthService {
  authRepository = new AuthRepository();
  signup = async (email, password, passwordConfirm, name) => {
    if (password !== passwordConfirm) {
      throw new Error('입력한 비밀번호가 서로 일치하지 않습니다.');
    }

    if (password.length < 6) {
      throw new Error('비밀번호는 최소 6자리 이상이어야 합니다.');
    }

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) {
      throw new Error('올바른 이메일 형식이 아닙니다.');
    }

    const existedUser = await this.authRepository.findUserByEmail(email);
    if (existedUser) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    // 해당 코드 hash(password, process.env.PASSWORD_HASH_SALT_ROUNDS) 오류 발생.
    // parseInt( process.env.PASSWORD_HASH_SALT_ROUNDS) or + process.env.PASSWORD_HASH_SALT_ROUNDS 사용시 문제 해결.
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.PASSWORD_HASH_SALT_ROUNDS,
    );

    const newUser = await this.authRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return newUser;
  };
  signin = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('이메일과 비밀번호는 필수 입력 사항입니다.');
      }

      const user = await this.authRepository.findUserByEmail(email);

      if (!user) {
        throw new Error('일치하는 인증 정보가 없습니다.');
      }

      const hashedPassword = user.password || '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

      if (!isPasswordMatched) {
        throw new Error('일치하는 인증 정보가 없습니다.');
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      );

      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error(' 예기치 못한 에러 발생, 관리자에게 문의하세요.');
    }
  };
}
