export type TProfileResponse = {
  id: string;
  email: string;
  fullname: string;
};

export type TProfileRequest = {
  email: string;
};

export type TUsersResponse = {
  data: Array<{
    email: string;
    fullname: string;
    password: string;
  }>;
};
