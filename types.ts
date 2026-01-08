import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Job: { jobId: string; jobName: string };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type Days = {
  date: string;
  times: Time[];
};

// NEW!!!
export interface JobData {
  createdAt: Timestamp;
  name: string;
}

export interface Job extends JobData {
  id: string;
}

export interface TimeData {
  end: Timestamp | null;
  jobId: string;
  start: Timestamp;
  userId: string | null; // null for now possible since there is no auth implemented yet
  createdAt: Timestamp;
}

export interface Time extends TimeData {
  id: string;
}

export interface UserData {
  createdAt: Timestamp;
  email: string;
  name: string;
}

export interface User extends UserData {
  id: string;
}
