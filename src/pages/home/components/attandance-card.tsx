import { AllAttendance } from '@/types/staff-attendace-types'
import { ChevronRight } from 'lucide-react'


const AttendanceCard = ({attendance}:{attendance:AllAttendance}) => {
  return (
    <div className="flex-col ">
    <div className="flex items-center gap-2 justify-between mb-4 ">
       <div className=" ">{attendance?.date.toString()}</div>

       <div className="flex items-center gap-2 ">
         <div className="flex flex-col">
           <div className="text-[15px]">Present | Approval Pending</div>
           <div className="text-[12px] text-zinc-500 ml-auto">
            {attendance?.punch_in?.created_at.toString()}
           </div>
         </div>
         <ChevronRight className="w-6 h-6 ml-auto text-zinc-600" />
       </div>
     </div>
     <hr className="border-zinc-300 dark:border-zinc-700" />
    </div>
  )
}

export default AttendanceCard