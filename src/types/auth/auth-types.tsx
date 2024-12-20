import { User } from "../common/common";

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
    user?:    User;
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

