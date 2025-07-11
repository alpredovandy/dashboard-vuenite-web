export interface AuthLoginRequestType {
  email: string;
  password: string;
  keepMeLogged?: boolean;
}

export interface AuthRegisterRequestType {
  name: string;
  email: string;
  password: string;
}

export interface AuthLoginResponseType {
  access_token: string;
  refresh_token: string;
}

export interface AuthRegisterResponseType {
  email: string;
  password: string;
  name: string;
  avatar: string;
}
