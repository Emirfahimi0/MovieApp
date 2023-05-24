import Toast from "react-native-toast-message";
export const ToastMessage = (type: string, title: string, message: string) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
  });
};
