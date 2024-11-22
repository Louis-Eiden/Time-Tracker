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
