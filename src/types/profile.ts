export interface ProfileReqOrRespType {
  id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
  avatar?: string;
}

export interface ProfileRequestType {
  id: string;
  email: string;
  password: string;
  name: string;
}
