import { MeUser } from '@core/interfaces/user/me-user';

export interface ChangeUsernameResponse {
  user: MeUser;
  refreshToken: string;
}
