import { categories } from '@api/models';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type TCategory = InferSelectModel<typeof categories>;

export type TCategoryRequest = InferInsertModel<typeof categories>;

export type TCategoryResponse = {
  message: string;
  data: Pick<TCategory, 'id' | 'name'>;
};

export type TCategoriesResponses = TCategory[];
