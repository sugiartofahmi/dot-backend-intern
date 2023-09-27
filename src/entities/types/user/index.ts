export type TProfileResponse = {
  id: string;
  email: string;
  fullname: string;
};

export type TProfileRequest = {
  email: string;
};

export type TUsersResponse = Array<{
  id: string;
  email: string;
  fullname: string;
  password: string;
  role: {
    id: number;
    name: string;
  };
}>;

export type TUserByIdRequest = {
  id: string;
};

export type TUserByIdResponse = TProfileResponse;

export type TUserUpdateRequest = {
  id: string;
  data: {
    role_id?: number;
    fullname?: string;
    password?: string;
  };
};
