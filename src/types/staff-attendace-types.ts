export interface PunchInResp {
    message:    string;
    attendance: Attendance;
}

export interface PunchOutResp {
    message:    string;
    attendance: Attendance;
}

export interface AttendanceReq{
    image:      string;
    latitude?:   string;
    longitude?:  string;
    address:    string;
    notes?:     string;
}
export interface Attendance {
    user_id:    number;
    punch_out?:  Date;
    punch_in?:   Date;
    image:      string;
    latitude:   string;
    longitude:  string;
    address:    string;
    notes?:     string;
    updated_at: Date;
    created_at: Date;
    id:         number;
}