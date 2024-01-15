// dateUtils.ts
import { Timestamp } from "firebase/firestore";

export const calculateAge = (birthTimestamp: Timestamp): string => {
  const birthDate = new Date(birthTimestamp.seconds * 1000);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age.toString();
};
