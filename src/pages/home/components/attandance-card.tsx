import { AllAttendance } from '@/types/staff-attendace-types'
import { ChevronRight } from 'lucide-react'
import { format } from "date-fns";


const AttendanceCard = ({ attendance }: { attendance: AllAttendance }) => {
  return (

    <div className="flex-col ">
      <div className="flex items-center gap-2 justify-between mb-4 ">
        <div className=" ">{format(new Date(attendance?.date), "dd MMM | EEE")}</div>

        <div className="flex items-center gap-2 justify-between ">
          {
            attendance?.punch_in && !attendance?.punch_out &&
            <div className="flex flex-col">
              <div className="text-[15px]">Present | Punch Out Pending</div>
              <div className="text-[12px] text-zinc-500 ml-auto">
                {format(new Date(attendance?.punch_in?.created_at), "hh:mm a")} - N/A
              </div>
            </div>
          }
          {
            attendance?.punch_out &&
            <div className="flex flex-col">
              <div className="text-[15px]">Present</div>
              <div className="text-[12px] text-zinc-500 ml-auto">
                {format(new Date(attendance?.punch_out?.created_at), "hh:mm a")} - {format(new Date(attendance?.punch_out?.created_at), "hh:mm a")}
              </div>
            </div>
          }
          {
            !attendance?.punch_in && !attendance?.punch_out &&
            <div className="flex flex-col">
              <div className="text-[15px]">Absent</div>
            </div>
          }
          <ChevronRight className="w-6 h-6 ml-auto text-zinc-600" />
        </div>
      </div>
      <hr className="border-zinc-300 dark:border-zinc-700" />
    </div>
  )
}

export default AttendanceCard