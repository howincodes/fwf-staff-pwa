import { useGetWorkUpdatesQuery } from '@/store/api/attendanceApi';
import { ChevronLeft, CircleUserRound, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
const AttendanceDetailPage = () => {
     
    const { data: workUpdatesData } = useGetWorkUpdatesQuery()
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(new Date());

    const navigate=useNavigate()
    return (
        <div className='min-h-screen flex flex-col  bg-zinc-100 dark:bg-zinc-900 gap-4 w-screen overflow-x-hidden overflow-y-scroll'>
            <div className='flex w-full justify-center px-4 pt-6 pb-1'>
                <ChevronLeft onClick={() => navigate(-1)}/>
                <h1 className='mx-auto'>Attendance Details</h1>
                <div className='flex justify-end'><Plus/></div>
            </div>

            <div className='flex justify-between w-full bg-white dark:bg-zinc-800 px-4 text-md py-6'>
                <h1 className='font-medium'>Faris Basha TM</h1>
                <h2 className='text-zinc-500'>{formattedDate}</h2>
            </div>
            <div className='flex justify-between items-center w-full bg-white dark:bg-zinc-800 px-4 text-md py-6'>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-medium'>Regular Shift New</h1>
                    <h2 className='text-zinc-500 text-sm'>09-28 AM - 05-00 PM</h2>
                </div>
                <h2 className='font-medium'>Present</h2>
            </div>
            <div className='flex flex-col w-full bg-white dark:bg-zinc-800 px-4 text-md pt-6'>
                <h1 className='font-medium mb-4'>Logs</h1>
                {
                    workUpdatesData?.map((item, index) => (
                        <div className='w-full flex flex-col mb-4' key={item?.id}>
                            <div className='w-full flex gap-3 items-center'>
                                <div>
                                    <CircleUserRound className='w-7 h-7' />
                                </div>
                                <div className='flex-col text-sm'>
                                    <h1>Punched Out at 05:00 PM | Regular Shift New</h1>
                                    <h2 className='text-zinc-500 w-[85%] truncate mt-0.5 text-xs'>By HOWINCLOUD SOLUTIONS PRIVATE LIMITED on 16 Dec,2024</h2>
                                </div>
                            </div>
                            {index < workUpdatesData.length - 1 && <div className='border-b w-full border-gray-500 my-3'></div>}
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default AttendanceDetailPage

