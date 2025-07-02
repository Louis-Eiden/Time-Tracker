export type RootStackParamList = {
  Home: undefined;
  Job: { jobName: string };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface TimeEntry {
  start: string;
  end: string;
  id: string;
}

export interface DayEntry {
  date: string;
  timeEntries: TimeEntry[];
}
