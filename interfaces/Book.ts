export interface Book {
  '@id'?: string;
  id?: string;
  isbn?: string;
  title?: string;
  description?: string;
  author?: string;
  publicationDate?: Date;
  reviews?: any;
}
