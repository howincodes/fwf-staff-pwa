import { useCreateWorkUpdateMutation, useLazyGetWorkUpdatesQuery } from "@/store/api/attendanceApi";
import { ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/redux-hook";

const WorkUpdates = () => {
  const [getWorkUpdates, { data: workUpdatesData }] = useLazyGetWorkUpdatesQuery();
  const [createWorkUpdate] = useCreateWorkUpdateMutation();
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Enable AM/PM format
      timeZone: "UTC", // Parse as UTC
    }).format(new Date(dateString));
  };

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [remarks, setRemarks] = useState(""); // State to hold remarks
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const handleImageCapture = () => {
    fileInputRef.current?.click();
  };
  const handleSubmit = async () => {
    if (!remarks.trim() || !selectedImage) {
      // Show an error if required fields are not filled
      alert("Please provide both remarks and an image.");
      return;
    }
    try {
      // Call the createWorkUpdate mutation
      await createWorkUpdate({
        remarks,
        imageFile: selectedImage,
      }).unwrap(); // Unwrap the promise to handle any API success or error
      setIsOpen(false); // Close the drawer
      setRemarks(""); // Reset the form
      setSelectedImage(null); // Reset the image
      getWorkUpdates().refetch();
      // Optionally, you may want to refetch work updates or show a success message
    } catch (error) {
      console.error("Failed to submit work update:", error);
      alert("Failed to submit work update. Please try again.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setIsOpen(true);
    }
  };

  const handleRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(event.target.value); // Update remarks state
  };

  useEffect(() => {
    getWorkUpdates().refetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900 gap-4 w-screen overflow-x-hidden overflow-y-scroll">
      <div className="flex w-full justify-center px-4 pt-6 pb-1">
        <ChevronLeft onClick={() => navigate(-1)} />
        <h1 className="mx-auto">WorkUpdates</h1>
        <div className="flex justify-end">
          <Plus onClick={() => handleImageCapture()} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="flex justify-between w-full bg-white dark:bg-zinc-800 px-4 text-md py-6">
        <h1 className="font-medium">{user?.name}
        </h1>
        {/* <h2 className="text-zinc-500">{formatDate}</h2> */}
      </div>
      {/* <div className="flex justify-between items-center w-full bg-white dark:bg-zinc-800 px-4 text-md py-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Regular Shift New</h1>
          <h2 className="text-zinc-500 text-sm">09-28 AM - 05-00 PM</h2>
        </div>
        <h2 className="font-medium">Present</h2>
      </div> */}
      <div className="flex flex-col w-full bg-white dark:bg-zinc-800 px-4 text-md pt-6">
        <h1 className="font-medium mb-4">Logs</h1>
        {workUpdatesData?.map((item, index) => (
          <div className="w-full flex flex-col mb-4" key={item?.id}>
            <div className="w-full flex gap-3 items-center">
              <div>
                <img
                  src={item?.image_url}
                  alt="User"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </div>
              <div className="flex-col text-sm">
                <h1>{item?.created_at ? formatDate(item.created_at) : "N/A"}</h1>

                <h2 className="text-zinc-500 w-[85%] truncate mt-0.5 text-xs">
                  {item?.remarks}
                </h2>
              </div>
            </div>
            {index < workUpdatesData.length - 1 && (
              <div className="border-b w-full border-gray-500 my-3"></div>
            )}
          </div>
        ))}
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[80vh] flex flex-col justify-between p-4 bg-white dark:bg-zinc-900">
          <div>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            <Textarea
              placeholder="Remarks"
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-400"
              rows={4}
              value={remarks}
              onChange={handleRemarksChange}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleSubmit} className="w-full p-3">
              Submit
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default WorkUpdates;
