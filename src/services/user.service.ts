import type { RegisterUserReqDto, UserResDto } from '../types/user.types';
import BaseHttpService from './base-http.service';

const PATH = 'users';

class UserService extends BaseHttpService {
  async login(email: string, password: string): Promise<UserResDto> {
    const body = await this.post<UserResDto>(`${PATH}/login`, { email, password });
    return body;
  }

  async register(payload: RegisterUserReqDto): Promise<UserResDto> {
    const body = await this.post<UserResDto>(`${PATH}/register`, payload);
    return body;
  }

  async logout(): Promise<void> {
    await this.post<void>(`${PATH}/logout`);
  }
}

export const userService = new UserService();
