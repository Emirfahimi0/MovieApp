import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("Error in Async getData", e);
  }
};

export const setStorageData = async (key: string, value: string | object | boolean | number) => {
  try {
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log("Error in Async storeData", e);
  }
};
