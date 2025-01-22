import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, Loader2, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApplyLeaveMutation } from "@/store/api/staffLeavesApi"
import { useAppSelector } from "@/hooks/redux-hook"
import { errorToast, successToast } from "@/utils/common-utils"
import { getErrorMessage } from "@/config/base-api"
import { useNavigate } from "react-router-dom"

export default function ApplyLeavePage() {
    const [leaveType, setLeaveType] = useState<string>("casual")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [leaveDuration, setLeaveDuration] = useState<number>()
    const [description, setDescription] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const user = useAppSelector((state) => state.auth.user)
    const [isDescriptionMandatory, setIsDescriptionMandatory] = useState(false)
    const navigate = useNavigate()
    const [applyLeave, { isLoading }] = useApplyLeaveMutation()

    useEffect(() => {
        if (startDate && endDate) {
            const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            setLeaveDuration(duration)
        }
    }, [startDate, endDate])

    return (
        <div className="max-w-md mx-auto bg-background min-h-screen overflow-y-scroll pb-20">
            <div className="flex items-center p-4 border-b">
                <button className="mr-2">
                    <ArrowLeft className="h-6 w-6" onClick={() => navigate("/")} />
                </button>
                <h1 className="text-xl font-semibold flex-1 text-center mr-8">Mark Leave</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* <RadioGroup
                    defaultValue="full"
                    onValueChange={(value) => setLeaveType(value as "full" | "half")}
                    className="flex gap-4"
                >
                    <div className={`flex-1 border rounded-lg p-4 ${leaveType === "full" ? "border-[#FED272] bg-[#FED272]ry/5" : ""}`}>
                        <RadioGroupItem value="full" id="full" className="peer" />
                        <Label htmlFor="full" className="pl-2">
                            Full Day
                        </Label>
                    </div>
                    <div className={`flex-1 border rounded-lg p-4 ${leaveType === "half" ? "border-[#FED272] bg-[#FED272]/5" : ""}`}>
                        <RadioGroupItem value="half" id="half" className="peer" />
                        <Label htmlFor="half" className="text-base pl-2">
                            Half Day
                        </Label>
                    </div>
                </RadioGroup> */}

                <div className="space-y-4">
                    <Label className="text-muted-foreground">Leave start date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between text-left font-normal">
                                {startDate ? format(startDate, "MMM dd, yyyy") : "Select date"}
                                <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-4">
                    <Label className="text-muted-foreground">Leave End Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between text-left font-normal">
                                {endDate ? format(endDate, "MMM dd, yyyy") : "Select date"}
                                <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                {leaveDuration &&
                    <div className="space-y-4">
                        <Label className="text-muted-foreground">Leave Duration</Label>
                        <div className="text-sm font-semibold pl-0.5">{Math.abs(leaveDuration)} days</div>
                    </div>
                }


                <div className="space-y-4">
                    <Label className="text-muted-foreground">Leave Type</Label>
                    <Select onValueChange={(value) => {
                        if (value === "casual") {
                            setLeaveType("Casual")
                            setIsDescriptionMandatory(false)
                        }
                        if (value === "sick") {
                            setLeaveType("Sick")
                            setIsDescriptionMandatory(false)
                        }
                        if (value === "other") {
                            setLeaveType("Other")
                            setIsDescriptionMandatory(true)
                        }
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Leave Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="sick">Sick</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>

                    </Select>
                </div>

                <div className="space-y-4">
                    <Label className="text-muted-foreground">Description</Label>
                    <Textarea placeholder="Enter leave description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                {
                    isDescriptionMandatory && !description &&
                    <p className="text-red-500 text-xs">This field is required.</p>
                }


                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Attachments</h3>
                        </div>
                        <div className="relative">
                            <Input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                onChange={(e) => setFile(e.target?.files?.[0] || null)}
                                accept="image/*,.pdf"
                            />
                            <Label htmlFor="file-upload" className="flex items-center text-primary cursor-pointer">
                                <Paperclip className="h-4 w-4 mr-2" />
                                Add
                            </Label>
                        </div>
                    </div>

                    {file && (
                        <div>{file.name}</div>
                    )}
                </div>

                <Button className="w-full bg-[#FED272]" size="lg" type="submit" disabled={isDescriptionMandatory && !description}
                    onClick={async () => {
                        try {
                            if (!startDate || !endDate) return
                            await applyLeave({
                                staff_id: user?.id,
                                start_date: format(startDate, "yyyy-MM-dd"),
                                end_date: format(endDate, "yyyy-MM-dd"),
                                leave_type: leaveType,
                                description: description,
                                attachment: file ?? null,
                                leaves_used: leaveDuration
                            }).unwrap()
                            successToast("Leave applied successfully")
                            navigate("/manage-leave")
                        } catch (error) {
                            errorToast(getErrorMessage(error, "Failed to apply leave"))
                        }
                    }}
                >
                    {
                        isLoading ? <div className="animate-spin"><Loader2 /></div> : "Send for Approval"
                    }
                </Button>
            </div>
        </div>
    )
}