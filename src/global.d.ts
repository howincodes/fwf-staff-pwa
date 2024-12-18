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
    }
  }
  
  export {};
  