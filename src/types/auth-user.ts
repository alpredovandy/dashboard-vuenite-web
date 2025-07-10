export interface AuthLoginRequestType {
  username: string;
  password: string;
  keepMeLogged: boolean;
}

export interface AuthUserResponseType {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken?: string;
  refreshToken?: string;
}
