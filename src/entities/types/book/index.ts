export type TBookResponse = {
  title: string;
  author: string;
  created_at: Date;
};

export type TBookByIdRequest = {
  id: string;
};

export type TBookCreateRequest = {
  title: string;
  author_email: string;
};

export type TBooksResponse = {
  title: string;
  created_at: Date;
  author: {
    fullname: string;
  };
};

export type TBookCreateResponse = {
  message: string;
};
