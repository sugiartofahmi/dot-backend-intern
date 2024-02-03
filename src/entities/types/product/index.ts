import { products } from '@api/models';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type TProduct = Omit<InferSelectModel<typeof products>, 'categoryId'> & {
  categoryId?: string | null;
} & {
  category?: {
    id: string;
    name: string;
  } | null;
};

export type TProductRequest = InferInsertModel<typeof products>;

export type TProductResponses = {
  message: string;
  data: Pick<TProduct, 'id' | 'name'>;
};

export type TProductsResponses = TProduct[];
