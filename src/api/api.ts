import axios, { AxiosError } from "axios";
import { SignInSchemaType, SignUpSchemaType } from "../lib/schemas/auth.schema";
import {
  BASE_API_URL,
  CHAT_PARAMS,
  PROFILE_PARAMS,
  SIGN_IN_PARAMS,
  SIGN_UP_PARAMS,
  USERS_PARAMS,
} from "./constants";
import { CreateNewChat, UpdateProfile } from "./types";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handlerError = async (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data || error.message);
  }
  throw new Error("An expected error occurred");
};

// auth endpoints
export const signUp = async (data: SignUpSchemaType) => {
  try {
    return await api.post(SIGN_UP_PARAMS, data, { withCredentials: true });
  } catch (error) {
    await handlerError(error);
  }
};

export const signIn = async (data: SignInSchemaType) => {
  try {
    return await api.post(SIGN_IN_PARAMS, data, { withCredentials: true });
  } catch (error) {
    await handlerError(error);
  }
};

// profile endpoints
export const getMe = async () => {
  try {
    return await api.get(`${PROFILE_PARAMS}/me`, { withCredentials: true });
  } catch (error) {
    await handlerError(error);
  }
};

export const updateProfile = async (id: string, data: UpdateProfile) => {
  try {
    return await api.patch(`${PROFILE_PARAMS}/${id}`, data, {
      params: id,
      withCredentials: true,
    });
  } catch (error) {
    await handlerError(error);
  }
};

// users endpoint
export const searchUserByName = async (search: string) => {
  try {
    return await api.get(USERS_PARAMS, {
      withCredentials: true,
      params: { search },
    });
  } catch (error) {
    await handlerError(error);
  }
};

// chats endpoits

export const addNewChat = async (data: CreateNewChat) => {
  try {
    return await api.post(`${CHAT_PARAMS}/create`, data, {
      withCredentials: true,
    });
  } catch (error) {
    await handlerError(error);
  }
};

export const getChatRoom = async (id: string) => {
  try {
    return await api.get(`${CHAT_PARAMS}/${id}`, { withCredentials: true });
  } catch (error) {
    await handlerError(error);
  }
};
