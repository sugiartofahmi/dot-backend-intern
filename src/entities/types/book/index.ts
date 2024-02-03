export type TBookResponse = {
  title?: string;
  author?: string | null;
  createdAt?: Date;
  message?: string;
};

export type TBookByIdRequest = {
  id?: string;
};

export type TBookUpdateRequest = {
  id?: string;
  title?: string;
  authorId: string;
};

export type TBookCreateRequest = {
  title: string;
  authorId: string;
};

export type TBooksResponse = {
  id: string;
  title: string;
  createdAt: Date;
  author: string | null;
};

export type TBookCreateResponse = {
  message: string;
};
