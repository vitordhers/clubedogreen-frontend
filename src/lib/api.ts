import { RegisterProps } from "@/pages/register";
import axios from "axios";
// import { getCookie } from "cookies-next";

export const baseURL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL,
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const myId = getCookie("UserId");
// const token = getCookie("accessToken");

export interface CreateUser {
  role: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateDate {
  userId: any;
}

export interface recoveryPassword {
  email: string;
}

export type BidStatus =
  | "SENT"
  | "ACCEPTED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "DENIED"
  | "AWAITING_PAYMENT"
  | "CANCELLED";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth", data);
  return response.data;
};

export const getUser = async (token: string) => {
  console.log(token);
  const response = await api.get("/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const registerApi = async (data: RegisterProps) => {
  const response = await api.post("/user", data);
  return response.data;
};

export const newReturnDate = async (data: UpdateDate) => {
  const response = await api.patch("/user/create-check", data);
  return response.data;
};

export const recoveryPasswordByEmail = async (data: recoveryPassword) => {
  const response = await api.patch("user/recovery-password", data);
  return response.data;
};

export const getValueBase = async () => {
  const response = await axios
    .create({ baseURL: "https://blockchain.info/" })
    .get("tobtc?currency=USD&value=500");
  return response.data;
};

export const getLossValueBase = async (): Promise<any> => {
  const response = await axios
    .create({ baseURL: "https://blockchain.info/" })
    .get("tobtc?currency=BRL&value=500");
  return response.data;
};
