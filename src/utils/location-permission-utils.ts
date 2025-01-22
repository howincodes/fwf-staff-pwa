import { sendMessageToNative } from "./web-view-utils";



export const requestLocationPermission = async () => {
  sendMessageToNative("request_location");
}
