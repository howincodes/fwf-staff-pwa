declare global {
    interface Window {
      ReactNativeWebView?: {
        postMessage: (message: string) => void;
      };
      webkit?: {
        messageHandlers: {
          nativeApp: {
            postMessage: (message: string) => void;
          };
        };
      };
      AndroidInterface?: {
        receiveMessageFromWeb(message: string): void;
      };
    }


  }
  

  
  
  
  export {};
  