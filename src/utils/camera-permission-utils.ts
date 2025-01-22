import { sendMessageToNative } from "./web-view-utils";



export const requestCameraPermission = async () => {
  sendMessageToNative("request_camera_permission");
};



