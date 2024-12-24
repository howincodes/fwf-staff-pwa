import { AllAttendance } from '@/types/staff-attendace-types'
import { ChevronRight } from 'lucide-react'


const AttandanceCard = ({attandance}:{attandance:AllAttendance}) => {
  return (
    <div className="flex-col ">
    <div className="flex items-center gap-2 justify-between mb-4 ">
       <div className=" ">{attandance?.date.toString()}</div>

       <div className="flex items-center gap-2 ">
         <div className="flex flex-col">
           <div className="text-[15px]">Present | Approval Pending</div>
           <div className="text-[12px] text-zinc-500 ml-auto">
             09:03 AM - 05:04 PM Hrs
           </div>
         </div>
         <ChevronRight className="w-6 h-6 ml-auto text-zinc-600" />
       </div>
     </div>
     <hr className="border-zinc-300 dark:border-zinc-700" />
    </div>
  )
}

export default AttandanceCard