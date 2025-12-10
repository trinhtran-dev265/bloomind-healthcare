export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  MoodTracking: undefined;
  Chatbot: undefined;
  ChatHistory: undefined;
  Journal: undefined;
  JournalDetail: undefined;
  JournalCreate: undefined;
  JournalEdit: undefined;
  

  // có thêm thì thêm dô nha mng 
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}