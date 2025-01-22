export interface ApplyLeaveRequest {
    start_date?: string,
    staff_id?: number
    end_date?: string
    leave_type: string
    attachment: File | null
    description: string | null
    leaves_used?: number
  }
  
  export interface ApplyLeaveResponse {
    message: string
    data: Data
  }
  
  export interface Data {
    staff_id: number
    start_date: string
    end_date: string
    type: string
    description: string | null
    attachment: File | null
    leaves_used: number
  }
  
  export interface GetStaffLeaveRecordResponse {
    [key: string]: LeaveRecord[]
  }
  
  export interface LeaveRecord {
    id: number
    staff_id: number
    type: string
    start_date: string
    end_date: string
    leaves_used: string
    description?: string
    attachment: string
    status: string
    created_at: string
    updated_at: string
  }
  