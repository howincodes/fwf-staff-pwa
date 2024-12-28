declare global {
    // interface Window {
    //   ReactNativeWebView?: {
    //     postMessage: (message: string) => void;
    //   };
    //   webkit?: {
    //     messageHandlers: {
    //       nativeApp: {
    //         postMessage: (message: string) => void;
    //       };
    //     };
    //   };
    // }

      // Define the AndroidInterface interface
    interface Window {
      AndroidInterface?: {
        receiveMessageFromWeb(message: string): void;
      };
    }
  }
  

  
  
  
  export {};
  