type TodoState = {
  isLoading: boolean;
  error: boolean;
  data: TodoResponse[];
  blocked: number[];
};

type Todo = {
  title: string;
  isDone: boolean;
};

type TodoResponse = Todo & { id: number; createdAt: string };

type TodoUpdate = Omit<Partial<TodoResponse>, 'id'>;

type TodoActionPayload = {
  id: number;
  update: TodoUpdate;
};

type PaginationQuery = {
  limit?: number;
  page?: number;
};

export {
  Todo,
  TodoState,
  PaginationQuery,
  TodoUpdate,
  TodoActionPayload,
  TodoResponse,
};
