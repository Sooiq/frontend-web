import type { RegisterUserReqDto, UserApiResponse, UserResDto } from '../types/user.types';
import BaseHttpService from './base-http.service';

const PATH = 'users';

class UserService extends BaseHttpService {
  async login(email: string, password: string): Promise<UserResDto> {
    const body = await this.post<UserApiResponse>(`${PATH}/login`, { email, password });
    return body.result;
  }

  async register(payload: RegisterUserReqDto): Promise<UserResDto> {
    const body = await this.post<UserApiResponse>(`${PATH}/register`, payload);
    return body.result;
  }

  async logout(): Promise<void> {
    await this.post<void>(`${PATH}/logout`);
  }

  async deleteUser(): Promise<void> {
    await this.delete<void>(`${PATH}`);
  }
}

export const userService = new UserService();
