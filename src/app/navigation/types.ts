export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;

  MoodTracking: undefined;
  Activities: undefined;
  MoodTrackingSaved: undefined; 

  Analysis: undefined;

  Journal: undefined;
  Chatbot: undefined;
  
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}