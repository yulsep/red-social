import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (file) => {
  const storageRef = ref(storage, "photos" + file.name);
  return await uploadBytes(storageRef, file);
};

export const getImageUrl = async (fileRef) => {
  return await getDownloadURL(fileRef);
};
