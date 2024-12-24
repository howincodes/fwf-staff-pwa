import { User } from "./common";


export interface LoginReq{
    phone:string
}

export interface LoginRes{
    messgae: string;
}

export interface OtpReq {
    phone: string;
    otp: string;
}


export interface OTPResp {
    message: string;
    user?:    User
}

export interface RegResp {
    message: string;
    user:    User;
}

export interface RegReq {
    phone: string;
    name:  string;
    email: string;
}

export interface AuthSliceState {
    user?: User;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    currentPhone: string;
  }
  

  export interface GetUserDataResp{
    message: string;
    user:    User
  }