export interface PunchInResp {
    message:    string;
    attendance: Attendance;
}

export interface PunchOutResp {
    message:    string;
    attendance: Attendance;
}

export interface AttendanceReq{
    image:    File;
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
    date:      Date;
}

export interface DayByDayAttendance {
    attendance: AllAttendance[]
    presentDays: number
    absentDays: number
    weeklyOff: number
    message: string
  }
  
  export interface AllAttendance{
    date: string
    punch_in: PunchIn
    punch_out: PunchOut
  }
  
  export interface PunchIn {
    created_at: string
    address: string
  }
  
  export interface PunchOut {
    created_at: string
    address: string
  }
  

// export interface AllAttendance {
//     date:      Date;
//     punch_in:  Punch;
//     punch_out: Punch;
// }

// export interface Punch {
//     created_at: Date;
//     address:    string;
// }

