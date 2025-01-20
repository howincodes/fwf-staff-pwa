import { sendMessageToNative } from "./web-view-utils";



export const requestCameraPermission = async () => {
  sendMessageToNative("request_camera_permission");
};


export const requestLocationPermission = async () => {
  if (window.AndroidInterface) {
    // Send a message to request location permission
    window.AndroidInterface.receiveMessageFromWeb("REQUEST_LOCATION_PERMISSION");
  } else {
    console.error("AndroidInterface is not available.");
  }
};

