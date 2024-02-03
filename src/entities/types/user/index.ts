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
}>;

export type TUserByIdRequest = {
  id: string;
};

export type TUserByIdResponse = TProfileResponse;

export type TUserUpdateRequest = {
  id?: string | null;
  role_id?: number;
  fullname: string;
  password: string;
  email: string;
};
