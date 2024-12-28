
export interface User {
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
    is_punched_in_today:     boolean;
    is_punched_out_today:     boolean;
    staff_profile:           StaffProfile;
}

export interface StaffProfile {
    id:         number;
    user_id:    number;
    image:      null;
    is_active:  number;
    deleted_at: null;
    created_at: Date;
    updated_at: Date;
}

export interface LiveLocationResp{
    message: string;
    live_location_data: LiveLocationData;
}

export interface LiveLocationData{ 
    latitude: number;
    longitude: number;
    address: string;
}

export interface LiveLocationReq{
    latitude: number;
    longitude: number;
    address: string;
}