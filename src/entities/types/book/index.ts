export type TBookResponse = {
  title: string;
  author: string;
  created_at: Date;
};

export type TBookByIdRequest = {
  id: string;
  author_id: string;
};

export type TBookUpdateRequest = {
  id: string;
  title?: string;
  author_id: string;
};

export type TBookCreateRequest = {
  title: string;
  author_id: string;
};

export type TBooksRequest = {
  author_id: string;
  role: string;
};

export type TBooksResponse = {
  id: string;
  title: string;
  created_at: Date;
  author: {
    fullname: string;
  };
};

export type TBookCreateResponse = {
  message: string;
};
