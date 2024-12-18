import { sendMessageToNative } from "./web-view-utils";


export const openCamera = async () => {
  sendMessageToNative("open_camera");
};
