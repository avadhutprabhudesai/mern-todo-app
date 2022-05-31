import { JwtPayload } from 'jsonwebtoken';

export type User = {
  _id?: string;
  username: string;
  salt: string;
  hash: string;
};

export type Pagination = {
  limit: number;
  page: number;
  skip: number;
};

export type PaginationInput = Omit<Pagination, 'skip'>;
export type PaginationOutput = Omit<Pagination, 'page'>;

export enum SERVERS {
  TEST,
  PROD,
}

export type Todo = {
  _id: string;
  id: number;
  title: string;
  isDone: boolean;
  createdAt: Date;
};

export type TodoUpdate = Pick<Todo, 'title' | 'isDone'>;

export type Payload = Pick<JwtPayload, 'sub' | 'iat'>;
