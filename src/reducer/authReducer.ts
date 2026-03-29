type User = {
  name: string;
  email: string;
  role: string;
};
type UserState = {
  user: User | null;
  isAuthenticated: boolean;
};

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
