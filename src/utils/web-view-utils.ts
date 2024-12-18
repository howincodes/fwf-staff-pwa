export const sendMessageToNative = (
  type: string,
  data: unknown = null
): void => {
  const message = JSON.stringify({ type, data });

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(message);
    return;
  }

  if (window.webkit?.messageHandlers?.nativeApp) {
    window.webkit.messageHandlers.nativeApp.postMessage(message);
    return;
  }

  console.warn("Unable to find native webview messaging interface.");
};

export const isWebview = (): boolean => {
  return (
    typeof window.ReactNativeWebView!== "undefined" ||
    typeof window.webkit?.messageHandlers?.nativeApp !== "undefined"
  );
};
