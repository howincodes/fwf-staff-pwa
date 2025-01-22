import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLazyGetStaffLeaveRecordQuery } from "@/store/api/staffLeavesApi";
import { useEffect } from "react";

export default function ManageLeavePage() {
    const navigate = useNavigate();
    // const user = useAppSelector((state) => state?.auth?.user);
    const [getLeaveData, { data: staffLeaveData }] = useLazyGetStaffLeaveRecordQuery();

    useEffect(() => {
        getLeaveData();
    }, [])
    const isUpcoming = (startDate: string) => new Date(startDate) >= new Date();

    return (
        <div>
            <div className="h-screen bg-background pb-32 relative overflow-y-scroll">
                <div className="flex items-center p-4 bg-background border-b">
                    <button className="mr-2">
                        <ArrowLeft className="h-6 w-6" onClick={() => navigate("/")} />
                    </button>
                    <h1 className="text-xl font-semibold flex-1 text-center">Leave Summary</h1>
                </div>

                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-gray-500 mb-4">Upcoming Leaves</h3>
                        {staffLeaveData &&
                            Object.entries(staffLeaveData).map(([month, records]) => {
                                const upcomingLeaves = records.filter((leave) =>
                                    isUpcoming(leave.start_date)
                                );
                                return upcomingLeaves.length ? (
                                    <div key={month}>
                                        <h4 className="font-semibold mb-2">{month}</h4>
                                        {upcomingLeaves.map((leave) => (
                                            <Card className="mb-3" key={leave.id}>
                                                <div className="p-4 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold">
                                                            {new Date(leave.start_date).toLocaleDateString(
                                                                "en-US",
                                                                { day: "numeric", month: "short", weekday: "short" }
                                                            )}
                                                        </p>
                                                        <p className="text-gray-500">
                                                            {Number(leave.leaves_used) === 1
                                                                ? `${Number(leave.leaves_used)} Day`
                                                                : `${Number(leave.leaves_used)} Days`}{" "}
                                                            | {leave.type}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`${leave?.status === "approved" &&
                                                                "bg-green-100 text-green-500"
                                                                } ${leave?.status === "pending" &&
                                                                "bg-orange-100 text-orange-500"
                                                                } ${leave?.status === "rejected" &&
                                                                "bg-red-100 text-red-500"
                                                                } px-4 rounded-lg py-0.5 text-sm font-semibold`}
                                                        >
                                                            {leave?.status}
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm">No upcoming leaves</div>
                                );
                            })}
                    </div>

                    <div>
                        <h3 className="text-gray-500 mb-2">Leave History</h3>
                        {staffLeaveData &&
                            Object.entries(staffLeaveData).map(([month, records]) => {
                                const pastLeaves = records.filter(
                                    (leave) => !isUpcoming(leave.start_date)
                                );
                                return pastLeaves.length ? (
                                    <div key={month}>
                                        <h4 className="font-semibold mb-2">{month}</h4>
                                        {pastLeaves.map((leave) => (
                                            <Card className="mb-3" key={leave.id}>
                                                <div className="p-4 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold">
                                                            {new Date(leave.start_date).toLocaleDateString(
                                                                "en-US",
                                                                { day: "numeric", month: "short", weekday: "short" }
                                                            )}
                                                        </p>
                                                        <p className="text-gray-500">
                                                            {Number(leave.leaves_used) === 1
                                                                ? `${Number(leave.leaves_used)} Day`
                                                                : `${Number(leave.leaves_used)} Days`}{" "}
                                                            | {leave.type}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`${leave?.status === "approved" &&
                                                                "bg-green-100 text-green-500"
                                                                } ${leave?.status === "pending" &&
                                                                "bg-orange-100 text-orange-500"
                                                                } ${leave?.status === "rejected" &&
                                                                "bg-red-100 text-red-500"
                                                                } px-4 rounded-lg py-0.5 text-sm font-semibold`}
                                                        >
                                                            {leave?.status}
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : null;
                            })}
                    </div>
                </div>

                {/* Fixed button */}

            </div>
            <div className=" fixed bottom-16 left-0 w-full z-50  p-4">
                <Button
                    className="bg-[#FED272] text-background py-6 w-full"
                    onClick={() => navigate("/apply-leave")}
                >
                    Apply New Leave
                </Button>
            </div>
        </div>
    );
}
