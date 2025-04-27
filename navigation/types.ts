// For your bottom tab navigator (inside Main)
export type TabParamList = {
  Home: undefined;
  Results: {
    category: string;
    budget: string;
    location: string;
    departure: string;
    destination: string;
    people: string;
    date: string;
  };
  Favorites: undefined;
  News: undefined;
  Chat: undefined;
};

  
  // For your root stack navigator
  export type RootStackParamList = {
    Welcome: undefined;
    Form: undefined;
    Main: {
      screen: keyof TabParamList;
      params?: TabParamList[keyof TabParamList];
    };
  };
  