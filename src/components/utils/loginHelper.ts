import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchID from "react-native-touch-id";
import { sessionWithLogIn } from "../../services/api-services";

//true if session id exist ,false if no session
export const handleIsLogin = async (): Promise<boolean> => {
  let isValidate: boolean = false;

  const resAsyncToken = await AsyncStorage?.getItem("responseToken").then((value) => {
    const responseToken: IResponseTokenMerge = JSON.parse(value ?? "null");
    return responseToken;
  });
  const resAsyncRequestBody = await AsyncStorage?.getItem("requestBody").then((value) => {
    const responseToken: IRequestBody = JSON.parse(value ?? "null");
    return responseToken;
  });

  if (resAsyncToken !== null && resAsyncRequestBody !== null) {
    if (resAsyncToken.request_token === resAsyncRequestBody.request_token) {
      if (resAsyncToken.session_id) {
        isValidate = true;
        console.log("authenticated session received...");
      }
    } else {
      isValidate = false;
      console.log("not authenticated token received...");
    }
  } else {
    isValidate = false;
  }
  console.log("isValidate", isValidate);
  return isValidate;
};

// if true returns face id
export const handleLoginWithFaceId = async (): Promise<boolean> => {
  const valueStorage = await AsyncStorage.getItem("userLoggedIn").then((value) => {
    const storage = JSON.parse(value ?? "null");
    console.log("handleLogin storage", storage);
    return storage;
  });
  const isLogin = await handleIsLogin();
  console.log("isLogin", isLogin);
  let isLoggedIn: boolean = isLogin === true;

  if (isLogin === false && valueStorage === null) {
    const response = await sessionWithLogIn("emirfahimi", "adidas");
    await TouchID.authenticate("Authenticate with Face ID")
      .then((success) => {
        if (response === true) {
          success(true);
          isLoggedIn = true;
          return isLoggedIn;
        } else return isLoggedIn;
      })
      .catch((error: string) => {
        console.log("error", error);
      });
  } else if (isLogin === true) {
    await TouchID.authenticate("Authenticate with Face ID")
      .then((success) => {
        success(true);
        return isLoggedIn;
      })
      .catch((error: string) => {
        console.log("error", error);
      });
  } else return isLoggedIn;

  return isLoggedIn;
};
