export type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  id: number;
};

export type UserResult = {
  me: User;
};
