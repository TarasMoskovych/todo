export interface Category {
  id: string;
  name: string;
}

export interface CategoryEntity {
  [key: string]: Category;
}
