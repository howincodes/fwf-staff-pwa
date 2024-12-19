import { UserType } from "../common/common";

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
    user?:    UserType;
}

export interface RegResp {
    message: string;
    user:    Users;
}

export interface Users {
    phone:                   string;
    unique_id:               string;
    name:                    string;
    email:                   string;
    updated_at:              Date;
    created_at:              Date;
    id:                      number;
    age:                     string;
    image_url:               null;
    feeding_mom_months:      null;
    show_live_joining_alert: boolean;
    token:                   string;
    staff_profile:           StaffProfile;
}

export interface StaffProfile {
    id:         number;
    user_id:    number;
    image:      null;
    deleted_at: null;
    created_at: Date;
    updated_at: Date;
}

export interface RegReq {
    phone: number;
    name:  string;
    email: string;
}

